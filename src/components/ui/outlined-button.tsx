"use client";

import { ReactNode } from "react";

interface OutlineButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function OutlineButton({ children, onClick, className = "" }: OutlineButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-6 py-3 rounded-2xl border border-white/60 text-white transition-all duration-300 hover:scale-110 hover:bg-white/10 ${className}`}
    >
      {children}
    </button>
  );
}