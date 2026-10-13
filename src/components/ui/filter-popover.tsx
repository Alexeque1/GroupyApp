"use client";

import { ReactNode } from "react";
import { ChevronDown, Filter, Search, X, type LucideIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

/**
 * "Filter" button + popover used across list sections (profile events/friends/communities,
 * event feed, join requests). Put <FilterSearch /> and <FilterSelect /> inside as children.
 */
export function FilterPopover({
    hasActiveFilters,
    onClear,
    children,
}: {
    hasActiveFilters: boolean;
    onClear: () => void;
    children: ReactNode;
}) {
    return (
        <Popover>
            <PopoverTrigger className="relative flex cursor-pointer items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-black/70 shadow-sm transition-colors hover:bg-black/5">
                <Filter size={15} />
                Filter
                {hasActiveFilters && (
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-purple-deep" />
                )}
            </PopoverTrigger>

            <PopoverContent align="end" className="w-[min(20rem,calc(100vw-2rem))] border border-black/10 bg-white p-4 shadow-xl">
                <div className="flex flex-col gap-3">
                    {children}

                    {hasActiveFilters && (
                        <button
                            type="button"
                            onClick={onClear}
                            className="cursor-pointer rounded-2xl border border-black/10 py-2 text-xs font-semibold text-brand-purple-deep hover:bg-black/5"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export function FilterSearch({
    value,
    onChange,
    placeholder,
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}) {
    return (
        <div className="relative w-full">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full rounded-2xl border border-black/10 bg-black/[0.02] pl-10 pr-4 py-2.5 text-sm text-black outline-none transition-all placeholder:text-black/40 focus:border-brand-purple-deep/40 focus:bg-white focus:ring-2 focus:ring-brand-purple-deep/10"
            />
            {value && (
                <button
                    type="button"
                    onClick={() => onChange("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black/40 hover:text-black"
                >
                    <X size={15} />
                </button>
            )}
        </div>
    );
}

export function FilterSelect<T extends string>({
    value,
    onChange,
    options,
    icon: Icon = ChevronDown,
    ariaLabel,
}: {
    value: T;
    onChange: (value: T) => void;
    options: { value: T; label: string }[];
    icon?: LucideIcon;
    ariaLabel?: string;
}) {
    return (
        <div className="relative w-full">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value as T)}
                aria-label={ariaLabel}
                className="w-full cursor-pointer appearance-none rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-2.5 pr-8 text-sm text-black outline-none transition-all focus:border-brand-purple-deep/40 focus:bg-white"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            <Icon size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/40" />
        </div>
    );
}

/** Shared "nothing matched" box for filtered lists. */
export function FilterEmptyState({ title, description, icon: Icon }: { title: string; description: string; icon: LucideIcon }) {
    return (
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-black/10 bg-black/5 p-6 text-center">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                <Icon size={32} className="text-black/40" />
            </div>
            <h3 className="text-sm font-semibold text-black/60">{title}</h3>
            <p className="mt-1 text-xs text-black/50">{description}</p>
        </div>
    );
}
