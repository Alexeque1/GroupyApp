export type PostCategory = "Announcement" | "Media";

export interface PostType {
    id: number;
    groupId: number;
    authorId: number;
    category: PostCategory;
    content: string;
    createdAt: string;
    viewCount: number;
    likeCount: number;
    likedByUserIds: number[];
    commentCount: number;
    imageUrl?: string;
}

export const POSTS_DATA: PostType[] = [
    {
        id: 1,
        groupId: 1,
        authorId: 1,
        category: "Announcement",
        content: "Reminder: bring your laptop charged, we're prototyping live this Saturday!",
        createdAt: "2026-08-05T14:30:00Z",
        viewCount: 42,
        likeCount: 3,
        likedByUserIds: [2, 9],
        commentCount: 2,
    },
    {
        id: 2,
        groupId: 1,
        authorId: 10,
        category: "Media",
        content: "What tools are we using for the wireframes, Figma or Excalidraw?",
        createdAt: "2026-08-06T09:15:00Z",
        viewCount: 18,
        likeCount: 1,
        likedByUserIds: [1],
        commentCount: 0,
        imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"
    },
];