import { getPostsForGroup } from "@/lib/posts-selector";
import FeedPostCard from "@/components/cards/post-card";
import { FeedUser } from "@/lib/mock_data/users-data";

interface GroupFeedFeedBoxProps {
    groupId: number;
    user: FeedUser
}

export default function GroupFeedFeedBox({ groupId, user }: GroupFeedFeedBoxProps) {
    const posts = getPostsForGroup(groupId);
    console.log(`El post es ${groupId}`)
    console.log(`Hay posts: ${posts}`)

    return (
        <div className="flex flex-col gap-6">
            {posts.length === 0 ? (
                <p className="text-center text-black/50">No posts yet.</p>
            ) : (
                posts.map((post) => (
                    <FeedPostCard key={post.id} post={post} user={user}/>
                ))
            )}
        </div>
    );
}