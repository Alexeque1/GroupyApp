"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { LayoutGrid, ChevronDown } from "lucide-react";
import type { FeedUser } from "@/lib/mock_data/users-data";
import type { PostCategory } from "@/lib/mock_data/post-data";
import { getPostCategoryInfo } from "@/lib/post-category";
import SendButton from "@/components/ui/send-button";
import EventFeedSelectCategoryModal from "./event-feed-selectcategorymodal";

type EventFeedProps = {
    user: FeedUser;
};

export default function EventFeedTextBox({ user }: EventFeedProps) {
    const [selectCategoryIsOpen, setSelectCategoryIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<PostCategory | null>(null);
    const [text, setText] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleOpenPostTypeModal = () => {
        setSelectCategoryIsOpen(true);
    };

    const handleCloseCategoryModal = () => {
        setSelectCategoryIsOpen(false);
    };

    const handleConfirmCategory = (category: PostCategory) => {
        setSelectedCategory(category);
    };

    const handleSendPost = () => {
        if (!text.trim()) return;
        setText(""); 
        if (textareaRef.current) textareaRef.current.style.height = "auto";
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const hasText = text.trim().length > 0;
    const categoryInfo = selectedCategory ? getPostCategoryInfo(selectedCategory) : null;
    const PostTypeIcon = categoryInfo?.icon ?? LayoutGrid;

    return (
        <>
            <EventFeedSelectCategoryModal
                isOpen={selectCategoryIsOpen}
                onClose={handleCloseCategoryModal}
                onConfirm={handleConfirmCategory}
                currentCategory={selectedCategory}
            />
            <div className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-4 shadow-[0_2px_15px_rgba(0,0,0,0.03)] dark:border-white/10 dark:bg-brand-dark">

                {/* AVATAR & INPUT */}
                <div className="flex items-start gap-3">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-black/5 dark:border-white/10">
                        <Image
                            src={user.profileImage}
                            alt={`${user.firstName} ${user.lastName}`}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* TEXT BOX */}
                    <div className="flex flex-1 items-end gap-2 rounded-3xl bg-black/5 px-4 py-3 transition-all focus-within:ring-1 focus-within:ring-brand-purple dark:bg-white/5">
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            value={text}
                            onChange={handleTextChange}
                            placeholder="Share something..."
                            className="w-full resize-none overflow-hidden bg-transparent text-sm leading-relaxed text-black outline-none placeholder:text-black/40 dark:text-white dark:placeholder:text-white/40 max-h-[250px] overflow-y-auto"
                        />
                    </div>
                </div>

                {/* POST TYPE & SEND BUTTON */}
                <div className="flex items-center gap-3 border-t border-black/5 pt-3 sm:border-0 sm:pl-14 sm:pt-0 dark:border-white/5">
                    <button
                        type="button"
                        onClick={handleOpenPostTypeModal}
                        className="group flex min-w-0 cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-transparent px-3.5 py-2 text-sm font-semibold text-black/60 transition-all hover:border-brand-purple/30 hover:bg-brand-purple/5 hover:text-black sm:px-4 sm:py-1.5 dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
                    >
                        <PostTypeIcon size={16} className="shrink-0 text-brand-purple transition-transform group-hover:scale-110" />
                        <span className="truncate">{categoryInfo?.label ?? "Post Type"}</span>
                        <ChevronDown size={14} className="shrink-0 opacity-50 transition-transform group-hover:translate-y-0.5" />
                    </button>

                    <SendButton
                        isDisabled={!hasText}
                        onClick={handleSendPost}
                        aria-label="Post"
                        className="h-9 w-9 shrink-0 justify-center p-0 sm:h-auto sm:w-auto sm:px-5 sm:py-1.5"
                    />
                </div>

            </div>
        </>
    );
}