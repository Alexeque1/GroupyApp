"use server";

import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db/db";
import { User } from "@/model/User";
import { registerSchema, type RegisterField } from "@/lib/validation/auth";

export type RegisterState = {
    errors?: Partial<Record<RegisterField, string[]>>;
    message?: string;
    values?: Partial<Record<"firstName" | "lastName" | "username" | "email", string>>;
};

export async function registerUser(_prevState: RegisterState, formData: FormData): Promise<RegisterState> {
    const get = (key: string) => String(formData.get(key) ?? "");

    const values = {
        firstName: get("firstName"),
        lastName: get("lastName"),
        username: get("username"),
        email: get("email").trim().toLowerCase(),
    };

    // Zod Validation
    const parsed = registerSchema.safeParse({
        ...values,
        password: get("password"),
        confirmPassword: get("confirmPassword"),
        terms: formData.get("terms") === "on",
    });

    if (!parsed.success) {
        const errors = z.flattenError(parsed.error).fieldErrors;

        if (get("password") !== get("confirmPassword") && !errors.confirmPassword) {
            errors.confirmPassword = ["Passwords don't match"];
        }

        return { errors, values };
    }

    const { firstName, lastName, username, email, password } = parsed.data;

    try {
        await connectDB();

        const existing = await User.findOne({ $or: [{ email }, { username }] }).select("email username").lean();

        if (existing) {
            return existing.email === email
                ? { errors: { email: ["That email is already registered"] }, values }
                : { errors: { username: ["That username is already taken"] }, values };
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await User.create({ firstName, lastName, username, email, passwordHash });
    } catch (error) {
        if (error instanceof Error && "code" in error && error.code === 11000) {
            const field = error.message.includes("username") ? "username" : "email";
            return {
                errors: { [field]: [field === "username" ? "That username is already taken" : "That email is already registered"] },
                values,
            };
        }
        return { message: "We couldn't create your account. Please try again in a bit.", values };
    }

    redirect("/auth?mode=login&registered=1");
}

export type LoginState = {
    message?: string;
    email?: string;
};

export async function loginUser(_prevState: LoginState, formData: FormData): Promise<LoginState> {
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");

    try {
        // Auth.js calls YOUR authorize(). If it goes well, it creates the cookie and redirects to /home
        await signIn("credentials", { email, password, redirectTo: "/home" });
    } catch (error) {
        if (error instanceof AuthError) {
            // authorize() returned null → wrong credentials
            if (error.type === "CredentialsSignin") {
                return { message: "Incorrect email or password", email };
            }
            // Some other problem (e.g., the database went down)
            return { message: "We couldn't sign you in. Please try again in a bit.", email };
        }
        // Not an Auth.js error: it's the redirect → let it pass through
        throw error;
    }

    return {};
}