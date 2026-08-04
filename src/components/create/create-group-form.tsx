"use client";

import { ArrowLeft, ChevronDown, Users, Calendar as CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import Button from "@/components/ui/button";
import ImageDropzone from "./image-dropzone";
import { useCreateContext } from "./create-context";
import { cn } from "@/lib/utils";

// Componentes de shadcn/ui
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Iconos para las categorías
import { PartyPopper, Mic2, Trees, Handshake, Palette, Dumbbell } from "lucide-react";

const DISCOVER_CATEGORIES = [
    { id: 1, name: "Party", icon: PartyPopper, bg: "bg-pink-500/15", text: "text-pink-600", solid: "bg-pink-500" },
    { id: 2, name: "Concerts", icon: Mic2, bg: "bg-[#8C6CFF]/15", text: "text-[#6D28D9]", solid: "bg-[#8C6CFF]" },
    { id: 3, name: "Nature", icon: Trees, bg: "bg-[#059669]/15", text: "text-[#059669]", solid: "bg-[#059669]" },
    { id: 4, name: "Meetings", icon: Handshake, bg: "bg-blue-500/15", text: "text-blue-600", solid: "bg-blue-500" },
    { id: 5, name: "Hobbies", icon: Palette, bg: "bg-[#EA580C]/15", text: "text-[#EA580C]", solid: "bg-[#EA580C]" },
    { id: 6, name: "Fitness", icon: Dumbbell, bg: "bg-rose-500/15", text: "text-rose-600", solid: "bg-rose-500" },
];

interface CreateGroupFormProps {
    onBack: () => void;
}

const inputClass =
    "w-full rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-black placeholder-black/30 outline-none transition-all focus:border-brand-purple focus:ring-1 focus:ring-brand-purple dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/30 dark:focus:bg-white dark:focus:text-black dark:not-placeholder-shown:bg-white dark:not-placeholder-shown:text-black";

const textareaClass = cn(inputClass, "resize-none");
const selectClass = cn(inputClass, "appearance-none pr-10");

export default function CreateGroupForm({ onBack }: CreateGroupFormProps) {
    const { previewData, updatePreviewData } = useCreateContext();

    return (
        <div className="mx-auto w-full max-w-3xl rounded-3xl border border-black/5 bg-white p-6 shadow-xl dark:border-white/5 dark:bg-brand-dark md:p-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <Users size={48} className="mb-4 text-brand-purple" />
                    <h2 className="mb-2 text-2xl font-bold text-[#1a0f2e] dark:text-white">Create a New Group</h2>
                    <p className="text-sm text-black/50 dark:text-white/50">
                        Fill in the details to start building your community.
                    </p>
                </div>
                <button
                    onClick={onBack}
                    className="flex cursor-pointer h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-black/5 text-black/50 transition-colors hover:bg-black/10 hover:text-black dark:border-white/10 dark:bg-white/5 dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white"
                >
                    <ArrowLeft size={18} />
                </button>
            </div>

            <form className="flex w-full flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
                {/* COVER IMAGE */}
                <ImageDropzone
                    label="Cover Image"
                    value={previewData.imagePreview}
                    onChange={(url) => updatePreviewData({ imagePreview: url })}
                />

                {/* BASIC INFORMATION */}
                <div className="flex flex-col gap-5">
                    <h3 className="border-b border-black/10 pb-2 text-sm font-bold uppercase tracking-wider text-brand-purple dark:border-white/10">
                        Basic Information
                    </h3>

                    <div className="flex flex-col gap-1.5">
                        <label className="ml-1 text-sm font-medium text-black/70 dark:text-white/80">Group Name</label>
                        <input
                            type="text"
                            className={inputClass}
                            placeholder="e.g. Weekend Hikers BA"
                            value={previewData.title || ""}
                            onChange={(e) => updatePreviewData({ title: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="ml-1 text-sm font-medium text-black/70 dark:text-white/80">Description</label>
                        <textarea
                            rows={3}
                            className={textareaClass}
                            placeholder="Briefly describe what this group is about..."
                            value={previewData.description || ""}
                            onChange={(e) => updatePreviewData({ description: e.target.value })}
                        />
                    </div>

                    {/* CATEGORY (Chips Interactivas) */}
                    <div className="flex flex-col gap-2.5">
                        <label className="ml-1 text-sm font-medium text-black/70 dark:text-white/80">Category</label>
                        <div className="flex flex-wrap gap-2.5 pt-1">
                            {DISCOVER_CATEGORIES.map((cat) => {
                                const isActive = previewData.category === cat.name;

                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => updatePreviewData({ category: cat.name })}
                                        className={cn(
                                            "group flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 transition-all duration-300",
                                            isActive
                                                ? `border-transparent ${cat.solid} text-white shadow-[0_4px_14px_rgba(0,0,0,0.1)] -translate-y-0.5`
                                                : "border-black/10 bg-black/5 hover:-translate-y-0.5 hover:border-black/20 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors",
                                                isActive ? "bg-white/20" : cat.bg
                                            )}
                                        >
                                            <cat.icon
                                                size={14}
                                                className={isActive ? "text-white" : cat.text}
                                            />
                                        </div>
                                        <span
                                            className={cn(
                                                "whitespace-nowrap text-sm font-bold",
                                                isActive ? "text-white" : "text-black/70 dark:text-white/70"
                                            )}
                                        >
                                            {cat.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* EVENT DETAILS */}
                <div className="flex flex-col gap-5">
                    <h3 className="border-b border-black/10 pb-2 text-sm font-bold uppercase tracking-wider text-brand-purple dark:border-white/10">
                        Event Details
                    </h3>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                            <label className="ml-1 text-sm font-medium text-black/70 dark:text-white/80">City</label>
                            <div className="relative">
                                <select
                                    value={previewData.city || ""}
                                    onChange={(e) => updatePreviewData({ city: e.target.value })}
                                    className={selectClass}
                                >
                                    <option value="" disabled hidden className="text-black/50">Select city</option>
                                    <option value="Buenos Aires" className="text-black">Buenos Aires</option>
                                    <option value="Córdoba" className="text-black">Córdoba</option>
                                    <option value="Rosario" className="text-black">Rosario</option>
                                </select>
                                <ChevronDown size={16} className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/40 dark:text-white/40" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="ml-1 text-sm font-medium text-black/70 dark:text-white/80">Specific Location</label>
                            <input
                                type="text"
                                className={inputClass}
                                placeholder="Address or Google Maps link"
                                value={previewData.location || ""}
                                onChange={(e) => updatePreviewData({ location: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* FECHA Y HORA SEPARADAS */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        
                        {/* FECHA (shadcn/ui) */}
                        <div className="flex flex-col gap-1.5">
                            <label className="ml-1 text-sm font-medium text-black/70 dark:text-white/80">Date</label>
                            <Popover>
                                <PopoverTrigger
                                    className={cn(
                                        inputClass,
                                        "flex items-center justify-between text-left font-normal cursor-pointer",
                                        !previewData.startDate && "text-black/40 dark:text-white/40"
                                    )}
                                >
                                    {previewData.startDate ? (
                                        format(new Date(previewData.startDate), "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    <CalendarIcon size={16} className="text-black/40 dark:text-white/40" />
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0 border-black/10 bg-white shadow-xl dark:border-white/10 dark:bg-brand-dark"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={previewData.startDate ? new Date(previewData.startDate) : undefined}
                                        onSelect={(date) => {
                                            if (date) updatePreviewData({ startDate: date.toISOString() });
                                        }}
                                        className="text-black dark:text-white"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* HORA (Input nativo ocultando el icono) */}
                        <div className="flex flex-col gap-1.5">
                            <label className="ml-1 text-sm font-medium text-black/70 dark:text-white/80">Time</label>
                            <div className="relative">
                                <input
                                    type="time"
                                    value={previewData.startTime || ""}
                                    onChange={(e) => updatePreviewData({ startTime: e.target.value })}
                                    className={cn(
                                        inputClass,
                                        "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-12 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
                                    )}
                                />
                                <Clock 
                                    size={16} 
                                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/40 transition-colors peer-focus:text-brand-purple dark:text-white/40" 
                                />
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="ml-1 text-sm font-medium text-black/70 dark:text-white/80">Participants Limit</label>
                        <input
                            type="number"
                            min="2"
                            className={inputClass}
                            placeholder="Max number of people"
                            value={previewData.participantsLimit || ""}
                            onChange={(e) => updatePreviewData({ participantsLimit: e.target.value })}
                        />
                    </div>
                </div>

                <div className="mt-4 flex justify-end border-t border-black/10 pt-4 dark:border-white/10">
                    <Button className="w-full md:w-auto md:px-12" tone="dark">
                        Create Group
                    </Button>
                </div>
            </form>
        </div>
    );
}