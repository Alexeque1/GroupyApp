export const EVENT_CATEGORIES = ["Party", "Concerts", "Nature", "Meetings", "Hobbies", "Fitness"] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];