"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/button";
import { registerUser, type RegisterState } from "@/app/(public)/auth/actions";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-brand-purple focus:bg-white focus:text-black focus:placeholder-black focus:ring-1 focus:ring-brand-purple not-placeholder-shown:bg-white not-placeholder-shown:text-black";

const passwordInputClass =
  "peer w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-4 pr-12 text-white placeholder-white/30 outline-none transition-all focus:border-brand-purple focus:bg-white focus:text-black focus:placeholder-black focus:ring-1 focus:ring-brand-purple not-placeholder-shown:bg-white not-placeholder-shown:text-black";

const eyeButtonClass =
  "absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white peer-focus:text-black/40 peer-focus:hover:text-black peer-not-placeholder-shown:text-black/40 peer-not-placeholder-shown:hover:text-black";

const labelClass = "ml-1 text-sm font-medium text-white/80";

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <p className="ml-1 text-xs text-red-400">{messages[0]}</p>;
}

const initialState: RegisterState = {};

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [state, formAction, pending] = useActionState(
    registerUser,
    initialState,
  );

  return (
    <form action={formAction} noValidate className="flex w-full flex-col gap-4">
      {/* Row 1: First name and Last name */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="firstName" className={labelClass}>
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            defaultValue={state.values?.firstName}
            className={inputClass}
            placeholder="Your name"
          />
          <FieldError messages={state.errors?.firstName} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="lastName" className={labelClass}>
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            defaultValue={state.values?.lastName}
            className={inputClass}
            placeholder="Your lastname"
          />
          <FieldError messages={state.errors?.lastName} />
        </div>
      </div>

      {/* Row 2: Username and Email */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="username" className={labelClass}>
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            defaultValue={state.values?.username}
            className={inputClass}
            placeholder="@yourusername"
          />
          <FieldError messages={state.errors?.username} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            defaultValue={state.values?.email}
            className={inputClass}
            placeholder="email@example.com"
          />
          <FieldError messages={state.errors?.email} />
        </div>
      </div>

      {/* Row 3: Password and Confirm Password */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className={labelClass}>
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              className={passwordInputClass}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={eyeButtonClass}
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <FieldError messages={state.errors?.password} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirmPassword" className={labelClass}>
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              className={passwordInputClass}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={eyeButtonClass}
              aria-label={
                showConfirmPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <FieldError messages={state.errors?.confirmPassword} />
        </div>
      </div>

      {/* Row 4: Terms and Conditions */}
      <div className="mt-2 flex flex-col items-center gap-1">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            className="h-4 w-4 rounded border-white/20 bg-white/10 text-brand-mint focus:ring-brand-mint focus:ring-offset-0"
          />
          <label
            htmlFor="terms"
            className="cursor-pointer select-none text-sm text-white/70"
          >
            Accept terms and conditions
          </label>
        </div>
        <FieldError messages={state.errors?.terms} />
      </div>

      {/* General error (e.g., if the database goes down) */}
      {state.message && (
        <p role="alert" className="text-center text-sm text-red-400">
          {state.message}
        </p>
      )}

      {/* Row 5: Button */}
      <div className="mt-4 flex justify-center p-5">
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Creating account..." : "Sign up"}
        </Button>
      </div>
    </form>
  );
}
