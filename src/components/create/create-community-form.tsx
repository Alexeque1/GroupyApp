"use client";

import { Globe } from "lucide-react";
import Button from "@/components/ui/button";
import ImageDropzone from "./image-dropzone";
import { useCreateContext } from "./create-context";

interface CreateCommunityFormProps {
    onBack: () => void;
}

export default function CreateCommunityForm({ onBack }: CreateCommunityFormProps) {
    const { previewData, updatePreviewData } = useCreateContext();

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-8 rounded-3xl border border-black/5 bg-white p-6 shadow-xl dark:border-white/5 dark:bg-[#0a0514] md:p-8">
            <ImageDropzone
                label="Community Image"
                className="w-full"
                value={previewData.imagePreview}
                onChange={(url) => updatePreviewData({ imagePreview: url })}
            />

            <div className="flex flex-col items-center">
                <Globe size={48} className="mb-4 text-[#A9FFD7]" />
                <h2 className="mb-2 text-2xl font-bold text-[#1a0f2e] dark:text-white">Create a New Community</h2>
                <p className="mb-8 text-center text-black/50 dark:text-white/50">
                    Community creation form will be placed here.
                </p>
                <Button onClick={onBack} tone="dark">
                    Go back
                </Button>
            </div>
        </div>
    );
}
