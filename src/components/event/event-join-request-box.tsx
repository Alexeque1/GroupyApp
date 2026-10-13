"use client";

import { useRef, useState, useTransition, type ChangeEvent } from "react";
import { Clock } from "lucide-react";
import Button from "../ui/button";
import StatusAlert from "../ui/alerts/status-alert";
import { cancelJoinRequest, requestToJoin } from "@/lib/actions/event-members";
import { JOIN_REQUEST_FORM_ID } from "./event-header";

const MESSAGE_MAX_LENGTH = 300;

type EventJoinRequestBoxProps = {
    eventId: string;
    /** "pending" = the viewer already asked and is waiting for the host */
    status: "none" | "pending";
    /** What the viewer wrote in their pending request */
    sentMessage: string;
    isFull: boolean;
};

const boxClass =
    "flex flex-col gap-4 rounded-3xl border border-white/10 bg-brand-dark/95 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm";

export default function EventJoinRequestBox({ eventId, status, sentMessage, isFull }: EventJoinRequestBoxProps) {
    const [text, setText] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        setError(null);

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    const handleSend = () => {
        startTransition(async () => {
            const result = await requestToJoin(eventId, text);
            if (result.ok) {
                setText("");
                setSuccessMessage("Request sent! The host will review it soon.");
            } else {
                setError(result.error);
            }
        });
    };

    const handleCancel = () => {
        startTransition(async () => {
            const result = await cancelJoinRequest(eventId);
            if (result.ok) {
                setSuccessMessage("Your request was canceled.");
            } else {
                setError(result.error);
            }
        });
    };

    const alert = (
        <StatusAlert
            isOpen={successMessage !== null}
            onClose={() => setSuccessMessage(null)}
            description={successMessage ?? ""}
            type="success"
            duration={3000}
        />
    );

    // Already asked: show what was sent and let them take it back
    if (status === "pending") {
        return (
            <div id={JOIN_REQUEST_FORM_ID} className={boxClass}>
                {alert}
                <div className="flex items-center gap-2">
                    <Clock size={18} className="text-brand-purple" />
                    <h3 className="text-lg font-bold text-white/90">Request sent</h3>
                </div>
                <p className="text-sm text-white/70">
                    The host will review your request. You&apos;ll see the address and group link once you&apos;re accepted.
                </p>

                {sentMessage && (
                    <p className="rounded-2xl border border-white/10 bg-[#2C243B] p-4 text-sm leading-relaxed text-white/80">
                        &ldquo;{sentMessage}&rdquo;
                    </p>
                )}

                {error && <p className="text-sm text-red-400">{error}</p>}

                <Button type="button" variant="outline" tone="light" onClick={handleCancel} disabled={isPending}>
                    {isPending ? "Canceling..." : "Cancel request"}
                </Button>
            </div>
        );
    }

    if (isFull) {
        return (
            <div id={JOIN_REQUEST_FORM_ID} className={boxClass}>
                {alert}
                <h3 className="text-lg font-bold text-white/90">This event is full</h3>
                <p className="text-sm text-white/70">
                    All the spots are taken. Check back later in case someone leaves.
                </p>
            </div>
        );
    }

    return (
        <div id={JOIN_REQUEST_FORM_ID} className={boxClass}>
            {alert}
            <h3 className="text-lg font-bold text-white/90">
                Want to come?
            </h3>
            <p className="text-sm text-white/90">
                Introduce yourself to the host (optional)
            </p>

            <textarea
                ref={textareaRef}
                rows={3}
                value={text}
                maxLength={MESSAGE_MAX_LENGTH}
                onChange={handleTextChange}
                placeholder="Hi! I want to join with a friend..."
                className={`w-full resize-none overflow-hidden text-sm leading-relaxed outline-none max-h-[250px] overflow-y-auto p-4 rounded-2xl transition-colors duration-200 ${text.length > 0
                    ? "bg-white text-black border-transparent placeholder:text-black/40"
                    : "bg-[#2C243B] text-white border border-white/10 placeholder:text-white/40"
                    }`}
            />
            {text.length > MESSAGE_MAX_LENGTH - 50 && (
                <span className="-mt-2 self-end text-xs text-white/50">
                    {text.length}/{MESSAGE_MAX_LENGTH}
                </span>
            )}

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button type="button" tone="light" onClick={handleSend} disabled={isPending}>
                {isPending ? "Sending..." : "Send Request"}
            </Button>
        </div>
    );
}
