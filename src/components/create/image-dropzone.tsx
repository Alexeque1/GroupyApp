"use client";

import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent, MouseEvent } from "react";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageDropzoneProps {
    label?: string;
    className?: string;
    value?: string | null;
    onChange?: (previewUrl: string | null) => void;
}

export default function ImageDropzone({ label = "Cover Image", className, value, onChange }: ImageDropzoneProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [internalPreview, setInternalPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const preview = value !== undefined ? value : internalPreview;

    const setPreview = (url: string | null) => {
        setInternalPreview(url);
        onChange?.(url);
    };

    const handleFile = (file: File | null | undefined) => {
        if (!file || !file.type.startsWith("image/")) return;
        setPreview(URL.createObjectURL(file));
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files?.[0]);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleFile(e.target.files?.[0]);
    };

    const clearPreview = (e: MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            <label className="ml-1 text-sm font-medium text-black/70 dark:text-white/80">{label}</label>
            <div
                role="button"
                tabIndex={0}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={cn(
                    "group relative flex h-56 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed transition-all md:h-64",
                    isDragging
                        ? "border-[#8C6CFF] bg-[#8C6CFF]/10"
                        : "border-black/15 bg-black/5 hover:border-[#8C6CFF]/50 hover:bg-black/[0.07] dark:border-white/15 dark:bg-white/5 dark:hover:border-[#8C6CFF]/50 dark:hover:bg-white/10"
                )}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                />

                {preview ? (
                    <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={preview} alt="Preview" className="absolute inset-0 h-full w-full object-cover" />
                        <button
                            type="button"
                            onClick={clearPreview}
                            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                        >
                            <X size={16} />
                        </button>
                    </>
                ) : (
                    <>
                        <ImagePlus
                            size={32}
                            className="text-black/40 transition-colors group-hover:text-[#8C6CFF] dark:text-white/40"
                        />
                        <p className="px-4 text-center text-sm text-black/50 dark:text-white/50">
                            <span className="font-semibold text-[#8C6CFF]">Click to upload</span> or drag and drop an image
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
