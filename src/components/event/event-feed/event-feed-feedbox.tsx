"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, SearchX, User } from "lucide-react";
import { getPostsForEvent } from "@/lib/posts-selector";
import { getPostCategoryInfo, POST_CATEGORY_DATA } from "@/lib/post-category";
import type { PostCategory } from "@/lib/mock_data/post-data";

const POST_CATEGORIES = Object.keys(POST_CATEGORY_DATA) as PostCategory[];
import FeedPostCard from "@/components/cards/post-card";
import { FeedUser } from "@/lib/mock_data/users-data";
import { FilterEmptyState, FilterPopover, FilterSearch, FilterSelect } from "@/components/ui/filter-popover";

type SortBy = "newest" | "oldest";

interface EventFeedFeedBoxProps {
    eventId: number;
    user: FeedUser
}

export default function EventFeedFeedBox({ eventId, user }: EventFeedFeedBoxProps) {
    const posts = useMemo(() => getPostsForEvent(eventId), [eventId]);

    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    // "all" | "me" | an author's username
    const [authorFilter, setAuthorFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<SortBy>("newest");

    // Los autores salen de la data; los tipos no, porque son una lista fija
    // (si salieran de la data, un evento sin posts de "Media" no ofrecería esa opción).
    const otherAuthors = useMemo(() => {
        const byUsername = new Map(
            posts
                .filter((p) => p.author.username !== user.username)
                .map((p) => [p.author.username, `${p.author.firstName} ${p.author.lastName}`])
        );
        return Array.from(byUsername, ([username, name]) => ({ value: username, label: name }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, [posts, user.username]);

    const filteredPosts = useMemo(() => {
        return posts
            .filter((post) => {
                const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
                const matchesAuthor =
                    authorFilter === "all" ||
                    (authorFilter === "me" ? post.author.username === user.username : post.author.username === authorFilter);

                return matchesSearch && matchesCategory && matchesAuthor;
            })
            .sort((a, b) => {
                const diff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                return sortBy === "newest" ? diff : -diff;
            });
    }, [posts, searchQuery, categoryFilter, authorFilter, sortBy, user.username]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setCategoryFilter("all");
        setAuthorFilter("all");
        setSortBy("newest");
    };

    const hasActiveFilters = searchQuery !== "" || categoryFilter !== "all" || authorFilter !== "all" || sortBy !== "newest";

    if (posts.length === 0) {
        return <p className="text-center text-black/50">No posts yet.</p>;
    }

    return (
        <div className="flex flex-col gap-6">
            {/* CONTADOR + BOTÓN DE FILTROS */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-semibold text-black/60">
                    {hasActiveFilters
                        ? `${filteredPosts.length} of ${posts.length} posts`
                        : `${posts.length} posts`}
                </span>

                <FilterPopover hasActiveFilters={hasActiveFilters} onClear={handleClearFilters}>
                    <FilterSearch value={searchQuery} onChange={setSearchQuery} placeholder="Search posts..." />
                    <FilterSelect
                        value={categoryFilter}
                        onChange={setCategoryFilter}
                        ariaLabel="Filter by type"
                        options={[
                            { value: "all", label: "All types" },
                            ...POST_CATEGORIES.map((c) => ({ value: c, label: getPostCategoryInfo(c).label })),
                        ]}
                    />
                    <FilterSelect
                        value={authorFilter}
                        onChange={setAuthorFilter}
                        icon={User}
                        ariaLabel="Filter by author"
                        options={[
                            { value: "all", label: "Posted by anyone" },
                            { value: "me", label: "Posted by me" },
                            ...otherAuthors,
                        ]}
                    />
                    <FilterSelect
                        value={sortBy}
                        onChange={setSortBy}
                        icon={ArrowUpDown}
                        ariaLabel="Sort by"
                        options={[
                            { value: "newest", label: "Newest first" },
                            { value: "oldest", label: "Oldest first" },
                        ]}
                    />
                </FilterPopover>
            </div>

            {filteredPosts.length === 0 ? (
                <FilterEmptyState
                    icon={SearchX}
                    title="No posts found"
                    description="Try adjusting your search query or filters."
                />
            ) : (
                filteredPosts.map((post) => (
                    <FeedPostCard key={post.id} post={post} user={user}/>
                ))
            )}
        </div>
    );
}
