import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

const CommentSchema = new Schema(
    {
        postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
        eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
        authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true, trim: true, maxlength: 1000 },
    },
    { timestamps: true }
);

CommentSchema.index({ postId: 1, createdAt: 1 });

export type CommentDoc = InferSchemaType<typeof CommentSchema>;

export const Comment = (models.Comment as Model<CommentDoc>) || model<CommentDoc>("Comment", CommentSchema);