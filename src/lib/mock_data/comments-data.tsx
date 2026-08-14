export interface CommentType {
    id: number;
    postId: number;
    authorId: number;
    content: string;
    createdAt: string;
    likeCount: number;
}

export const COMMENTS_DATA: CommentType[] = [
    {
        id: 1,
        postId: 1,       // FK -> PostType.id (el post "Reminder: bring your laptop...")
        authorId: 2,     // FK -> UserType.id (Maria Garcia)
        content: "Awesome, see you there!",
        createdAt: "2026-08-05T15:00:00Z",
        likeCount: 1,
    },
    {
        id: 2,
        postId: 1,
        authorId: 9,
        content: "Is there parking nearby?",
        createdAt: "2026-08-05T16:10:00Z",
        likeCount: 0,
    },
];