"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Smile, LayoutGrid, ChevronDown } from "lucide-react";
import type { FeedUser } from "@/lib/mock_data/users-data";
import SendButton from "@/components/ui/send-button";

type GroupFeedProps = {
    user: FeedUser;
};

export default function GroupFeedTextBox({ user }: GroupFeedProps) {
    const [text, setText] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleOpenPostTypeModal = () => {
        // TODO: Lógica para abrir el modal de tipos de publicación
        console.log("Abrir modal de tipo de publicación");
    };

    const handleSendPost = () => {
        if (!text.trim()) return;
        // TODO: Lógica para enviar el post al backend
        console.log("Enviando post:", text);
        setText(""); // Limpiamos la caja después de enviar
        if (textareaRef.current) textareaRef.current.style.height = "auto";
    };

    // Función para manejar el cambio de texto y el auto-ajuste de altura
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        
        // Magia para auto-expandir el textarea
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    // El botón se habilitará solo si hay texto (ignorando espacios en blanco)
    const hasText = text.trim().length > 0;

    return (
        <div className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-4 shadow-[0_2px_15px_rgba(0,0,0,0.03)] dark:border-white/10 dark:bg-[#0a0514]">
            
            {/* FILA SUPERIOR: Avatar e Input */}
            <div className="flex items-start gap-3">
                {/* Avatar del usuario actual */}
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-black/5 dark:border-white/10">
                    <Image
                        src={user.profileImage}
                        alt={`${user.firstName} ${user.lastName}`}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Caja de texto (auto-expandible) */}
                <div className="flex flex-1 items-end gap-2 rounded-3xl bg-black/5 px-4 py-3 transition-all focus-within:ring-1 focus-within:ring-[#8C6CFF] dark:bg-white/5">
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

            {/* FILA INFERIOR: Botón de tipo de publicación y Botón de Enviar */}
            {/* Usamos justify-between para separar ambos botones a los extremos */}
            <div className="flex items-center justify-between pl-[56px]">
                <button
                    type="button"
                    onClick={handleOpenPostTypeModal}
                    className="group flex cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-transparent px-4 py-1.5 text-sm font-semibold text-black/60 transition-all hover:border-[#8C6CFF]/30 hover:bg-[#8C6CFF]/5 hover:text-black dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
                >
                    <LayoutGrid size={16} className="text-[#8C6CFF] transition-transform group-hover:scale-110" />
                    <span>Post Type</span>
                    <ChevronDown size={14} className="ml-1 opacity-50 transition-transform group-hover:translate-y-0.5" />
                </button>

                <SendButton 
                    isDisabled={!hasText} 
                    onClick={handleSendPost} 
                />
            </div>
            
        </div>
    );
}