"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/button";
import { loginUser, type LoginState } from "@/app/(public)/auth/actions";

const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-brand-mint focus:bg-white focus:text-black focus:placeholder-black focus:ring-1 focus:ring-brand-mint not-placeholder-shown:bg-white not-placeholder-shown:text-black";

const passwordInputClass =
    "peer w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-4 pr-12 text-white placeholder-white/30 outline-none transition-all focus:border-brand-mint focus:bg-white focus:text-black focus:placeholder-black focus:ring-1 focus:ring-brand-mint not-placeholder-shown:bg-white not-placeholder-shown:text-black";

const eyeButtonClass =
    "absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white peer-focus:text-black/40 peer-focus:hover:text-black peer-not-placeholder-shown:text-black/40 peer-not-placeholder-shown:hover:text-black";

const initialState: LoginState = {};

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction, pending] = useActionState(loginUser, initialState);

    return (
        <form action={formAction} noValidate className="mt-4 flex w-full flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
                <label htmlFor="login-email" className="ml-1 text-sm font-medium text-white/80">
                    Email
                </label>
                <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    defaultValue={state.email}
                    className={inputClass}
                    placeholder="email@example.com"
                />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
                <div className="ml-1 flex items-center justify-between">
                    <label htmlFor="login-password" className="text-sm font-medium text-white/80">
                        Password
                    </label>
                    <a href="#" className="text-xs text-brand-purple transition-colors hover:text-white">
                        Forgot your password?
                    </a>
                </div>

                <div className="relative">
                    <input
                        id="login-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        className={passwordInputClass}
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={eyeButtonClass}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            {/* Error */}
            {state.message && (
                <p role="alert" className="text-center text-sm text-red-400">
                    {state.message}
                </p>
            )}

            {/* Button */}
            <div className="mt-6 flex justify-center p-5">
                <Button type="submit" className="w-full" disabled={pending}>
                    {pending ? "Logging in..." : "Log in"}
                </Button>
            </div>
        </form>
    );
}