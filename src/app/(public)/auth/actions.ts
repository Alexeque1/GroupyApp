"use server";

import bcrypt from "bcryptjs";
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

    // Zed Validation
    const parsed = registerSchema.safeParse({
        ...values,
        password: get("password"),
        confirmPassword: get("confirmPassword"),
        terms: formData.get("terms") === "on",
    });

    if (!parsed.success) {
        const errors = z.flattenError(parsed.error).fieldErrors;

        if (get("password") !== get("confirmPassword") && !errors.confirmPassword) {
            errors.confirmPassword = ["Las contraseñas no coinciden"];
        }

        return { errors, values };
    }

    const { firstName, lastName, username, email, password } = parsed.data;

    try {
        await connectDB();

        const existing = await User.findOne({ $or: [{ email }, { username }] }).select("email username").lean();

        if (existing) {
            return existing.email === email
                ? { errors: { email: ["Ese email ya está registrado"] }, values }
                : { errors: { username: ["Ese username ya está en uso"] }, values };
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await User.create({ firstName, lastName, username, email, passwordHash });
    } catch (error) {
        if (error instanceof Error && "code" in error && error.code === 11000) {
            const campo = error.message.includes("username") ? "username" : "email";
            return {
                errors: { [campo]: [campo === "username" ? "Ese username ya está en uso" : "Ese email ya está registrado"] },
                values,
            };
        }
        return { message: "No pudimos crear tu cuenta. Probá de nuevo en un rato.", values };
    }

    redirect("/auth?mode=login&registered=1");
}