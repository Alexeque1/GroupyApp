"use client";

import { useState } from "react";
import { Zap } from "lucide-react";

export default function HomeFastEvent() {
    const [isOn, setIsOn] = useState(false);

    return (
        <section className="z-10 flex shrink-0 items-center justify-between gap-3 rounded-3xl bg-brand-dark p-4">
            <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                    <Zap size={18} className="text-brand-peach" fill="currentColor" />
                </div>

                <div className="flex flex-col truncate">
                    <span className="text-sm font-bold text-white truncate">
                        Free tonight?
                    </span>
                    <span className="text-xs text-white/60 truncate">
                        12 plans starting soon near you
                    </span>
                </div>
            </div>

            <button
                type="button"
                role="switch"
                aria-checked={isOn}
                aria-label="Show plans starting soon near you"
                onClick={() => setIsOn((prev) => !prev)}
                className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors ${isOn ? "bg-brand-purple" : "bg-white/15"
                    }`}
            >
                <span
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${isOn ? "translate-x-5" : "translate-x-0"
                        }`}
                />
            </button>
        </section>
    );
}
