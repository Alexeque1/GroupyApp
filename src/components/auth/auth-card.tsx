"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import OutlineButton from "../ui/outline_button"; // Ajusta la ruta de tu OutlineButton

export default function AuthCard() {
  const [mode, setMode] = useState<"login" | "register">("register");

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      
      {/* BOTÓN PARA DEVOLVERSE A HOME */}
      <div className="absolute left-6 top-6">
        <Link href="/" className="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Home
        </Link>
      </div>

      <div className="text-center">
        <h3 className="text-3xl font-bold tracking-tight">
          Welcome to <span className="text-[#A9FFD7] drop-shadow-[0_0_15px_rgba(169,255,215,0.4)]">Groupy</span>
        </h3>
        <p className="mt-2 text-sm text-white/60">
          {mode === "login" ? "Log in to your account to continue" : "Create your account and join the community"}
        </p>
      </div>

      {/* Botones para cambiar entre login y registro */}
      <div className="flex justify-center gap-4 border-b border-white/10 pb-6">
        <button
          onClick={() => setMode("login")}
          className={`px-4 py-2 font-medium transition-colors ${
            mode === "login" ? "text-[#A9FFD7] border-b-2 border-[#A9FFD7]" : "text-white/50 hover:text-white"
          }`}
        >
          Log in
        </button>
        <button
          onClick={() => setMode("register")}
          className={`px-4 py-2 font-medium transition-colors ${
            mode === "register" ? "text-[#A9FFD7] border-b-2 border-[#A9FFD7]" : "text-white/50 hover:text-white"
          }`}
        >
          Register
        </button>
      </div>

      {/* Animación de transición entre los formularios */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === "login" ? 20 : -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 top-0 w-full"
          >
            {mode === "login" ? <LoginForm /> : <RegisterForm />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}