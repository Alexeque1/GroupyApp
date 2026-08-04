"use client";

import CreationPreviewCard from "./creation-preview-card";

export default function CreateAsideSection() {
    return (
        <aside className="flex w-full lg:sticky lg:top-24 justify-center">
            <div className="flex flex-col gap-3 m-w-[500px]">
                <h3 className="text-sm font-bold uppercase tracking-wider text-black/40 dark:text-white/40">
                    Live Preview
                </h3>
                <CreationPreviewCard />
            </div>
        </aside>
    );
}
