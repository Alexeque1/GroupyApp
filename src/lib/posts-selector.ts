import { POSTS_DATA, type PostType } from "./mock_data/post-data";
import { USERS_DATA, type FeedUser } from "./mock_data/users-data";
import { COMMENTS_DATA, CommentType } from "./mock_data/comments-data";

export interface PostViewModel extends Omit<PostType, "authorId"> {
    author: FeedUser;
}

export interface CommentViewModel extends Omit<CommentType, "authorId"> {
    author: FeedUser;
}

export interface PostWithCommentsViewModel extends PostViewModel {
    comments: CommentViewModel[];
}

export function getPostsForGroup(groupId: number): PostViewModel[] {
    return POSTS_DATA
        .filter((post) => post.groupId === groupId)
        .map((post): PostViewModel | null => {
            const { authorId, ...postData } = post;

            const author = USERS_DATA.find(
                (user) => user.id === authorId
            );

            if (!author) return null;

            return {
                ...postData,
                author
            };
        })
        .filter((post): post is PostViewModel => post !== null)
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );
}

export function getCommentsForPost(postId: number): CommentViewModel[] {
    return COMMENTS_DATA
        .filter((comment) => comment.postId === postId)
        .map((comment): CommentViewModel | null => {
            const { authorId, ...commentData } = comment;

            const author = USERS_DATA.find(
                (user) => user.id === authorId
            );

            if (!author) return null;

            return {
                ...commentData,
                author
            };
        })
        .filter((comment): comment is CommentViewModel => comment !== null)
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );
}

export function getPostsWithCommentsForGroup(
    groupId: number
): PostWithCommentsViewModel[] {
    const posts = getPostsForGroup(groupId);

    return posts.map((post) => ({
        ...post,
        comments: getCommentsForPost(post.id)
    }));
}