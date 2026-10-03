"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Calendar, MapPin, Tag } from "lucide-react";
import Image from "next/image";
import { USERS_DATA } from "@/lib/mock_data/users-data";
import Link from "next/link";
import { formatEventDate } from "@/lib/date";
import Button from "../ui/button";

type EventAsideProps = {
    event: {
        description: string;
        location: string;
        category: string;
        createdAt: string;
        ownerId: number;
        adminIds: number[];
        startDate: string;
    };
    isUserMember?: boolean;
};

export default function EventAsideSection({ event, isUserMember }: EventAsideProps) {
    const [text, setText] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const owner = USERS_DATA.find((user) => user.id === event.ownerId);
    const otherAdmins = event.adminIds
        .map((id) => USERS_DATA.find((user) => user.id === id))
        .filter((user) => user !== undefined);

    return (
        <aside className="flex h-fit flex-1 flex-col gap-5">

            {/* REQUEST TO JOIN */}
            {!isUserMember && (
                <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-brand-dark/95 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-white/90">
                        Want to come?
                    </h3>
                    <p className="text-sm text-white/90">
                        Introduce yourself to the host (optional)
                    </p>

                    {/* TEXTAREA ACTUALIZADO */}
                    <textarea
                        ref={textareaRef}
                        rows={3}
                        value={text}
                        onChange={handleTextChange}
                        placeholder="Hi! I want to join with a friend..."
                        className={`w-full resize-none overflow-hidden text-sm leading-relaxed outline-none max-h-[250px] overflow-y-auto p-4 rounded-2xl transition-colors duration-200 ${text.length > 0
                                ? "bg-white text-black border-transparent placeholder:text-black/40"
                                : "bg-[#2C243B] text-white border border-white/10 placeholder:text-white/40"
                            }`}
                    />

                    <Button type="button" tone="light">
                        Send Request
                    </Button>
                </div>
            )}

            {/* EVENT INFO */}
            <div className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm">
                <h3 className="text-lg font-bold text-black/80">
                    About Event
                </h3>

                <p className="text-sm leading-relaxed text-black/70">
                    {event.description}
                </p>

                <div className="mt-1 flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-sm text-black/70">
                        <MapPin size={16} className="text-brand-purple-deep" />
                        <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-black/70">
                        <Tag size={16} className="text-brand-purple-deep" />
                        <span>{event.category}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-black/70">
                        <Calendar size={16} className="text-brand-purple-deep" />
                        <span>Starts {formatEventDate(event.startDate)}</span>
                    </div>
                </div>
            </div>

            {/* TEAM / ADMINS */}
            <div className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm">
                <h3 className="text-lg font-bold text-black/80">
                    Team
                </h3>

                <div className="flex flex-col gap-4">
                    {owner && (
                        <Link href={`/profile/${owner.username}`}>
                            <div className="group flex items-center justify-between rounded-2xl border border-brand-purple/20 bg-brand-purple/5 p-3 transition-colors hover:bg-brand-purple/10 dark:border-brand-purple/30 dark:bg-brand-purple/10">
                                <div className="flex items-center gap-3.5">
                                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-brand-purple/20 bg-white shadow-sm">
                                        <Image
                                            src={owner.profileImage}
                                            alt={owner.firstName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[15px] font-bold text-black transition-colors group-hover:text-brand-purple dark:text-white">
                                            {owner.firstName} {owner.lastName}
                                        </span>
                                        <span className="text-[11px] font-black uppercase tracking-wider text-brand-purple">
                                            Owner
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}

                    {otherAdmins.length > 0 && (
                        <div className="flex flex-col gap-3 mt-1">
                            {otherAdmins.map((admin) => (
                                <Link key={admin!.id} href={`/profile/${admin!.username}`}>
                                    <div className="group flex cursor-pointer items-center gap-3">
                                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-black/5 bg-black/5 transition-transform group-hover:scale-105">
                                            <Image
                                                src={admin!.profileImage}
                                                alt={admin!.firstName}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col">
                                            <h4 className="text-sm font-semibold text-black/80 transition-colors group-hover:text-brand-purple-deep">
                                                {admin!.firstName} {admin!.lastName}
                                            </h4>
                                            <p className="flex items-center gap-1 text-xs text-black/50">
                                                Admin
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}