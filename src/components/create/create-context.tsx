"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type CreateType = "group" | "community" | null;

export interface CreatePreviewData {
    imagePreview: string | null;
    title: string;
    description: string;
    category: string;
    city: string;
    location: string;
    startDate: string;
    startTime: string;
    participantsLimit: string;
}

const EMPTY_PREVIEW_DATA: CreatePreviewData = {
    imagePreview: null,
    title: "",
    description: "",
    category: "",
    city: "",
    location: "",
    startDate: "",
    startTime: "",
    participantsLimit: "",
};

interface CreateContextValue {
    creationType: CreateType;
    setCreationType: (type: CreateType) => void;
    previewData: CreatePreviewData;
    updatePreviewData: (patch: Partial<CreatePreviewData>) => void;
}

const CreateContext = createContext<CreateContextValue | null>(null);

export function CreateProvider({ children }: { children: ReactNode }) {
    const [creationType, setCreationTypeState] = useState<CreateType>(null);
    const [previewData, setPreviewData] = useState<CreatePreviewData>(EMPTY_PREVIEW_DATA);

    const setCreationType = (type: CreateType) => {
        setPreviewData(EMPTY_PREVIEW_DATA);
        setCreationTypeState(type);
    };

    const updatePreviewData = (patch: Partial<CreatePreviewData>) => {
        setPreviewData((prev) => ({ ...prev, ...patch }));
    };

    const value = useMemo(
        () => ({ creationType, setCreationType, previewData, updatePreviewData }),
        [creationType, previewData]
    );

    return <CreateContext.Provider value={value}>{children}</CreateContext.Provider>;
}

export function useCreateContext() {
    const ctx = useContext(CreateContext);
    if (!ctx) throw new Error("useCreateContext must be used within a CreateProvider");
    return ctx;
}
