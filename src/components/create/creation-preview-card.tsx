"use client";

import { ImageIcon } from "lucide-react";
import EntityCard, { type EntityCardData } from "@/components/cards/entity-card";
import { useCreateContext } from "./create-context";

export default function CreationPreviewCard() {
    const { creationType, previewData } = useCreateContext();

    if (!creationType) {
        return (
            <div className="flex h-72 w-full flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
                <ImageIcon size={28} className="text-black/20 dark:text-white/20" />
                <p className="px-6 text-center text-sm text-black/40 dark:text-white/40">
                    Choose group or community to see a live preview
                </p>
            </div>
        );
    }

    const formattedDate = previewData.startDate
        ? new Date(previewData.startDate).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
          })
        : "";

    const data: EntityCardData = {
        kind: creationType,
        title: previewData.title,
        image: previewData.imagePreview,
        category: previewData.category,
        location: previewData.city,
        members: previewData.participantsLimit ? `0/${previewData.participantsLimit}` : "No limit set",
        colorFrom: "from-[#8C6CFF]",
        colorTo: "to-[#C4B5FD]",
        startDate: formattedDate,
    };

    return <EntityCard data={data} variant="preview" />;
}
