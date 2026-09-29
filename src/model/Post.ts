import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

export const POST_CATEGORIES = ["Post", "Announcement", "Media"] as const;

const PostSchema = new Schema(
    {
        eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
        authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        category: { type: String, enum: POST_CATEGORIES, default: "Post" },
        content: { type: String, required: true, trim: true, maxlength: 2000 },
        imageUrl: { type: String, default: "" },
    },
    { timestamps: true }
);

PostSchema.index({ eventId: 1, createdAt: -1 });

export type PostDoc = InferSchemaType<typeof PostSchema>;

export const Post = (models.Post as Model<PostDoc>) || model<PostDoc>("Post", PostSchema);