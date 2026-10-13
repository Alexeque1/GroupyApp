import { z } from "zod";
import { EVENT_CATEGORIES } from "@/lib/categories";

export const createEventSchema = z.object({
    title: z.string().trim().min(3, "Minimum 3 characters").max(80, "Maximum 80 characters"),
    description: z.string().trim().max(1000, "Maximum 1000 characters"),
    category: z.enum(EVENT_CATEGORIES, { error: "Pick a category" }),
    location: z.string().trim().min(1, "Enter a location").max(100, "Maximum 100 characters"),
    startDate: z.coerce
        .date({ error: "Pick a date and time" })
        .refine((date) => date > new Date(), "The date must be in the future"),
    capacity: z.coerce
        .number()
        .int("Must be a whole number")
        .min(2, "Minimum 2 people")
        .max(100, "Maximum 100 people"),
});

export type CreateEventField = keyof z.infer<typeof createEventSchema>;