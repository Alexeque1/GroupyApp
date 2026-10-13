// Mirrors an EventMember document with role "pending" (+ the optional message the user sent).
export interface JoinRequestType {
    id: number;
    eventId: number;
    userId: number;
    message?: string;
    createdAt: string;
}

export const REQUESTS_DATA: JoinRequestType[] = [
    {
        id: 1,
        eventId: 1,
        userId: 17,
        message: "Hi! I'm a product designer and I'd love to join the sprint and help with the prototypes.",
        createdAt: "2026-10-11T09:50:00Z",
    },
    {
        id: 2,
        eventId: 1,
        userId: 18,
        createdAt: "2026-10-10T18:20:00Z",
    },
    {
        id: 3,
        eventId: 3,
        userId: 14,
        message: "Hi! I love techno and I would come with a friend who is also on Groupy.",
        createdAt: "2026-10-11T09:40:00Z",
    },
    {
        id: 4,
        eventId: 3,
        userId: 19,
        message: "First time in the city, looking for good music and new people.",
        createdAt: "2026-10-09T22:05:00Z",
    },
    {
        id: 5,
        eventId: 6,
        userId: 15,
        message: "I'm building a small SaaS and would love to meet other founders.",
        createdAt: "2026-10-08T13:15:00Z",
    },
];
