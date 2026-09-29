import { z } from "zod";

export const registerSchema = z
    .object({
        firstName: z.string().trim().min(1, "Enter your first name").max(50, "Maximum 50 characters"),
        lastName: z.string().trim().min(1, "Enter your last name").max(50, "Maximum 50 characters"),
        username: z
            .string()
            .trim()
            .min(3, "Minimum 3 characters")
            .max(30, "Maximum 30 characters")
            .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscores"),
        email: z.email("Invalid email"),
        password: z.string().min(8, "Minimum 8 characters").max(72, "Maximum 72 characters"),
        confirmPassword: z.string(),
        terms: z.literal(true, { error: "You must accept the terms" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        error: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type RegisterField = keyof z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
});