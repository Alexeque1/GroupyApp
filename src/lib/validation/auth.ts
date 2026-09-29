import { z } from "zod";

export const registerSchema = z
    .object({
        firstName: z.string().trim().min(1, "Ingresá tu nombre").max(50, "Máximo 50 caracteres"),
        lastName: z.string().trim().min(1, "Ingresá tu apellido").max(50, "Máximo 50 caracteres"),
        username: z
            .string()
            .trim()
            .min(3, "Mínimo 3 caracteres")
            .max(30, "Máximo 30 caracteres")
            .regex(/^[a-zA-Z0-9_]+$/, "Solo letras, números y guion bajo"),
        email: z.email("Email inválido"),
        password: z.string().min(8, "Mínimo 8 caracteres").max(72, "Máximo 72 caracteres"),
        confirmPassword: z.string(),
        terms: z.literal(true, { error: "Tenés que aceptar los términos" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        error: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

export type RegisterField = keyof z.infer<typeof registerSchema>;