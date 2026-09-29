import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        passwordHash: {
            type: String,
            required: true,
            select: false,
        },

        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
            maxlength: 30,
            match: /^[a-zA-Z0-9_]+$/,
        },
        firstName: { type: String, required: true, trim: true, maxlength: 50 },
        lastName: { type: String, required: true, trim: true, maxlength: 50 },

        profileImage: { type: String, default: "" },
        coverImage: { type: String, default: "" },
        bio: { type: String, default: "", maxlength: 300 },
        city: { type: String, default: "" },
        country: { type: String, default: "" },
        profession: { type: String, default: "" },
        languages: { type: [String], default: [] },
        interests: { type: [String], default: [] },
    },
    { timestamps: true }
);

export type UserDoc = InferSchemaType<typeof UserSchema>;

export const User = (models.User as Model<UserDoc>) || model<UserDoc>("User", UserSchema);