import { Schema, model, models, type Model, type InferSchemaType } from "mongoose";

export const MEMBER_ROLES = ["pending", "member", "admin", "owner"] as const;
export type MemberRole = (typeof MEMBER_ROLES)[number];

export const ACTIVE_ROLES: MemberRole[] = ["member", "admin", "owner"];

const EventMemberSchema = new Schema(
    {
        eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        role: { type: String, enum: MEMBER_ROLES, required: true, default: "pending" },
    },
    { timestamps: true }
);

EventMemberSchema.index({ eventId: 1, userId: 1 }, { unique: true });

EventMemberSchema.index(
    { eventId: 1 },
    { unique: true, partialFilterExpression: { role: "owner" } }
);

EventMemberSchema.index({ userId: 1, role: 1 });

export type EventMemberDoc = InferSchemaType<typeof EventMemberSchema>;

export const EventMember =
    (models.EventMember as Model<EventMemberDoc>) ||
    model<EventMemberDoc>("EventMember", EventMemberSchema);