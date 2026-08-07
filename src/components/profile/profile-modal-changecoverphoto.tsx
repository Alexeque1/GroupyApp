"use client";

import { useCallback, useRef, useState } from "react";
import type { ChangeEvent, DragEvent, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, Images, RotateCcw, X, ZoomIn, ZoomOut } from "lucide-react";
import Cropper, { type Area } from "react-easy-crop";
import { toast } from "sonner";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProfileModalChangeCoverPhotoProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (imageUrl: string) => void;
    currentImage?: string | null;
}

const COVER_ASPECT_RATIO = 16 / 9;

export default function ProfileModalChangeCoverPhoto({
    isOpen,
    onClose,
    onSave,
    currentImage = null,
}: ProfileModalChangeCoverPhotoProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [rawImage, setRawImage] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    // Reseteamos el estado interno cada vez que el modal pasa de cerrado a abierto
    const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
    if (isOpen !== prevIsOpen) {
        setPrevIsOpen(isOpen);
        if (isOpen) {
            setRawImage(null);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setCroppedAreaPixels(null);
            setIsDragging(false);
            setIsSaving(false);
        }
    }

    const handleFile = (file: File | null | undefined) => {
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("That file isn't an image", {
                description: "Please choose a PNG, JPG or GIF file.",
            });
            return;
        }

        const imageUrl = URL.createObjectURL(file);

        // Las portadas se ven mejor en horizontal, avisamos si la imagen es vertical
        const img = new Image();
        img.onload = () => {
            if (img.height > img.width) {
                toast.error("Vertical images aren't supported", {
                    description: "Please upload a horizontal (landscape) image for the cover.",
                });
                URL.revokeObjectURL(imageUrl);
                return;
            }

            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setRawImage(imageUrl);
        };
        img.onerror = () => {
            toast.error("We couldn't read that image", {
                description: "Try a different file.",
            });
            URL.revokeObjectURL(imageUrl);
        };
        img.src = imageUrl;
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files?.[0]);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleFile(e.target.files?.[0]);
        // Reseteamos el input para permitir volver a subir el mismo archivo si se canceló
        if (inputRef.current) inputRef.current.value = "";
    };

    const onCropComplete = useCallback((_: Area, pixels: Area) => {
        setCroppedAreaPixels(pixels);
    }, []);

    const handleChooseDifferent = (e: MouseEvent) => {
        e.stopPropagation();
        setRawImage(null);
        setCroppedAreaPixels(null);
    };

    const handleSave = async () => {
        if (!rawImage || !croppedAreaPixels || isSaving) return;

        try {
            setIsSaving(true);
            const croppedImage = await getCroppedImg(rawImage, croppedAreaPixels);
            onSave(croppedImage);
            onClose();
        } catch (error) {
            console.error("Error cropping image:", error);
            toast.error("We couldn't save your cover photo", {
                description: "Please try again.",
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 py-8">
                    {/* OVERLAY */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#0a0514]/40 backdrop-blur-sm"
                    />

                    {/* CONTENEDOR DEL MODAL */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative flex max-h-[85vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:border-white/5 dark:bg-brand-dark"
                    >
                        {/* HEADER */}
                        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-black/10 p-6 dark:border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-purple/15 text-brand-purple">
                                    <Images size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#1a0f2e] dark:text-white">
                                        Change cover photo
                                    </h3>
                                    <p className="text-xs text-black/50 dark:text-white/50">
                                        {rawImage
                                            ? "Drag to reposition and use the slider to zoom."
                                            : "Upload a new banner for your profile."}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-black/5 text-black/50 transition-colors hover:bg-black/10 hover:text-black dark:border-white/10 dark:bg-white/5 dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
                            {rawImage ? (
                                <div className="flex flex-col gap-4">
                                    {/* CROPPER: permite mover y hacer zoom sobre la portada */}
                                    <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-black/90 sm:h-64">
                                        <Cropper
                                            image={rawImage}
                                            crop={crop}
                                            zoom={zoom}
                                            aspect={COVER_ASPECT_RATIO}
                                            onCropChange={setCrop}
                                            onZoomChange={setZoom}
                                            onCropComplete={onCropComplete}
                                        />
                                    </div>

                                    {/* ZOOM CONTROL */}
                                    <div className="flex items-center gap-4">
                                        <ZoomOut size={16} className="shrink-0 text-black/40 dark:text-white/40" />
                                        <input
                                            type="range"
                                            value={zoom}
                                            min={1}
                                            max={3}
                                            step={0.1}
                                            aria-label="Zoom"
                                            onChange={(e) => setZoom(Number(e.target.value))}
                                            className="h-1 flex-1 cursor-pointer appearance-none rounded-lg bg-black/10 accent-brand-purple dark:bg-white/10"
                                        />
                                        <ZoomIn size={16} className="shrink-0 text-black/40 dark:text-white/40" />
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleChooseDifferent}
                                        className="flex cursor-pointer items-center justify-center gap-2 self-center rounded-xl px-4 py-2 text-xs font-semibold text-brand-purple transition-colors hover:bg-brand-purple/10"
                                    >
                                        <RotateCcw size={14} />
                                        Choose a different photo
                                    </button>
                                </div>
                            ) : (
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
                                        "group relative flex h-48 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed transition-all sm:h-56",
                                        isDragging
                                            ? "border-brand-purple bg-brand-purple/10"
                                            : "border-black/15 bg-black/5 hover:border-brand-purple/50 hover:bg-black/[0.07] dark:border-white/15 dark:bg-white/5 dark:hover:border-brand-purple/50 dark:hover:bg-white/10"
                                    )}
                                >
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleChange}
                                    />

                                    {currentImage && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={currentImage}
                                            alt="Current cover"
                                            className="absolute inset-0 h-full w-full object-cover opacity-30 transition-opacity group-hover:opacity-15"
                                        />
                                    )}

                                    <ImagePlus
                                        size={28}
                                        className="relative z-10 text-black/40 transition-colors group-hover:text-brand-purple dark:text-white/40"
                                    />
                                    <p className="relative z-10 px-6 text-center text-sm text-black/50 dark:text-white/50">
                                        <span className="font-semibold text-brand-purple">Click to upload</span> or
                                        drag and drop a horizontal image
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* FOOTER */}
                        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-black/10 p-6 dark:border-white/10">
                            <span className="text-xs font-medium text-black/50 dark:text-white/50">
                                PNG, JPG up to 5MB · Recommended 1600×900
                            </span>
                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="cursor-pointer rounded-xl px-5 py-2.5 text-sm font-semibold text-black/60 transition-colors hover:bg-black/5 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
                                >
                                    Cancel
                                </button>
                                <Button
                                    type="button"
                                    tone="dark"
                                    onClick={handleSave}
                                    className={cn(
                                        "px-6 py-2.5",
                                        (!rawImage || isSaving) && "pointer-events-none opacity-50"
                                    )}
                                >
                                    {isSaving ? "Saving..." : "Save photo"}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

// ---------------------------------------------------------------------------
// UTILITY: crea la imagen recortada final usando Canvas HTML5
// ---------------------------------------------------------------------------
const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.src = url;
    });

async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<string> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("No 2d context");
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return new Promise((resolve) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    console.error("Canvas is empty");
                    return;
                }
                resolve(URL.createObjectURL(blob));
            },
            "image/jpeg",
            0.92
        );
    });
}
