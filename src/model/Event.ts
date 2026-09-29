import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";
import { EVENT_CATEGORIES } from "@/lib/categories";

const EventSchema = new Schema(
    {
        title: { type: String, required: true, trim: true, minlength: 3, maxlength: 80 },
        description: { type: String, default: "", trim: true, maxlength: 1000 },
        category: { type: String, required: true, enum: EVENT_CATEGORIES },
        image: { type: String, default: "" },
        location: { type: String, required: true, trim: true, maxlength: 100 },
        startDate: { type: Date, required: true },
        registrationsClosed: {type: Boolean, default: false},
        capacity: {
            type: Number,
            required: true,
            min: 2,
            max: 100,
            validate: {
                validator: Number.isInteger,
                message: "Capacity must be a whole number",
            },
        },
    },
    { timestamps: true }
);

EventSchema.index({ startDate: 1 });
EventSchema.index({ category: 1, startDate: 1 });

export type EventDoc = InferSchemaType<typeof EventSchema>;

export const Event = (models.Event as Model<EventDoc>) || model<EventDoc>("Event", EventSchema);