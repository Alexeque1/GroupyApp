"use client";

import { useRef, useState, useCallback } from "react";
import type { ChangeEvent, DragEvent, MouseEvent } from "react";
import { ImagePlus, X, ZoomIn, ZoomOut } from "lucide-react";
import Cropper, { type Area } from "react-easy-crop";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button"; // Asegúrate de que esta ruta sea correcta
import Portal from "@/components/ui/portal";

interface ImageDropzoneProps {
    label?: string;
    className?: string;
    value?: string | null;
    onChange?: (previewUrl: string | null) => void;
    aspectRatio?: number; // Por defecto 16/9 para portadas
}

export default function ImageDropzone({ 
    label = "Cover Image", 
    className, 
    value, 
    onChange,
    aspectRatio = 16 / 9 
}: ImageDropzoneProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [internalPreview, setInternalPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Estados para el Cropper (Recortador)
    const [rawImage, setRawImage] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [isCropping, setIsCropping] = useState(false);

    const preview = value !== undefined ? value : internalPreview;

    const setPreview = (url: string | null) => {
        setInternalPreview(url);
        onChange?.(url);
    };

    const handleFile = (file: File | null | undefined) => {
        if (!file || !file.type.startsWith("image/")) return;

        const imageUrl = URL.createObjectURL(file);

        const img = new Image();
        img.onload = () => {
            if (img.height > img.width) {
                toast.error("Vertical images aren't supported", {
                    description: "Please upload a horizontal (landscape) image for the cover.",
                });
                URL.revokeObjectURL(imageUrl);
                return;
            }

            // En lugar de guardar el preview directo, guardamos la imagen cruda y abrimos el cropper
            setRawImage(imageUrl);
            setIsCropping(true);
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
        // Reseteamos el input para que permita subir la misma imagen si el usuario canceló
        if (inputRef.current) inputRef.current.value = "";
    };

    const clearPreview = (e: MouseEvent) => {
        e.stopPropagation();
        setPreview(null);
        setRawImage(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    // Función para procesar el corte cuando el usuario le da a "Save"
    const handleSaveCrop = async () => {
        if (!rawImage || !croppedAreaPixels) return;

        try {
            const croppedImage = await getCroppedImg(rawImage, croppedAreaPixels);
            setPreview(croppedImage);
            setIsCropping(false);
        } catch (e) {
            console.error("Error cropping image:", e);
            toast.error("We couldn't save that image", {
                description: "Please try again.",
            });
        }
    };

    return (
        <>
            <div className={cn("flex flex-col gap-1.5", className)}>
                <label className="ml-1 text-sm font-medium text-black/70 dark:text-white/80">{label}</label>
                <div
                    role="button"
                    tabIndex={0}
                    onClick={() => !preview && inputRef.current?.click()}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && !preview && inputRef.current?.click()}
                    onDragOver={(e) => {
                        e.preventDefault();
                        if (!preview) setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                        if (!preview) handleDrop(e);
                    }}
                    className={cn(
                        "group relative flex h-56 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed transition-all md:h-64",
                        isDragging
                            ? "border-[#8C6CFF] bg-[#8C6CFF]/10"
                            : preview 
                                ? "border-transparent bg-transparent cursor-default" 
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
                            <img src={preview} alt="Preview" className="absolute inset-0 h-full w-full object-cover rounded-2xl" />
                            <button
                                type="button"
                                onClick={clearPreview}
                                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                            >
                                <X size={16} />
                            </button>
                            
                            {/* Opcional: Botón para volver a editar/recortar la misma foto */}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsCropping(true);
                                }}
                                className="absolute bottom-3 right-3 z-10 rounded-full bg-black/60 px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-black/80"
                            >
                                Adjust Crop
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

            {/* MODAL DE RECORTADO (CROPPER) */}
            {isCropping && rawImage && (
                <Portal>
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="relative flex h-[70vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-[#0a0514] border border-white/10 shadow-2xl">
                        
                        {/* Header del Modal */}
                        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                            <h3 className="text-lg font-bold text-white">Adjust Image</h3>
                            <button onClick={() => setIsCropping(false)} className="text-white/50 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Área del Cropper */}
                        <div className="relative flex-1 bg-black w-full">
                            <Cropper
                                image={rawImage}
                                crop={crop}
                                zoom={zoom}
                                aspect={aspectRatio}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>

                        {/* Controles y Botones */}
                        <div className="flex flex-col gap-4 border-t border-white/10 bg-[#0a0514] p-6">
                            <div className="flex items-center gap-4">
                                <ZoomOut size={18} className="text-white/50" />
                                <input
                                    type="range"
                                    value={zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    aria-labelledby="Zoom"
                                    onChange={(e) => setZoom(Number(e.target.value))}
                                    className="h-1 flex-1 cursor-pointer appearance-none rounded-lg bg-white/20 accent-[#8C6CFF]"
                                />
                                <ZoomIn size={18} className="text-white/50" />
                            </div>

                            <div className="flex justify-end gap-3 mt-2">
                                <button 
                                    onClick={() => setIsCropping(false)}
                                    className="px-6 py-2 rounded-xl text-sm font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <Button onClick={handleSaveCrop}>
                                    Apply & Save
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
                </Portal>
            )}
        </>
    );
}

// ---------------------------------------------------------------------------
// UTILITY FUNCTION: Crea la imagen real recortada usando Canvas HTML5
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

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                console.error("Canvas is empty");
                reject(new Error("Canvas is empty"));
                return;
            }
            const previewUrl = URL.createObjectURL(blob);
            resolve(previewUrl);
        }, "image/jpeg", 0.9);
    });
}