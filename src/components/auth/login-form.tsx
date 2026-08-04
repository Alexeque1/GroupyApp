"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/button";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="mt-4 flex w-full flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
      
      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="ml-1 text-sm font-medium text-white/80">Email</label>
        <input
          type="email"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-[#A9FFD7] focus:bg-white focus:text-black focus:placeholder-black focus:ring-1 focus:ring-[#A9FFD7] not-placeholder-shown:bg-white not-placeholder-shown:text-black"
          placeholder="correo@ejemplo.com"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <div className="ml-1 flex items-center justify-between">
          <label className="text-sm font-medium text-white/80">Password</label>
          <a href="#" className="text-xs text-[#8C6CFF] transition-colors hover:text-white">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            // Agregamos 'peer' y 'pr-12' para dejar espacio al ícono
            className="peer w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-4 pr-12 text-white placeholder-white/30 outline-none transition-all focus:border-[#A9FFD7] focus:bg-white focus:text-black focus:placeholder-black focus:ring-1 focus:ring-[#A9FFD7] not-placeholder-shown:bg-white not-placeholder-shown:text-black"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            // Clases dinámicas que leen el estado del input (peer) para adaptar el color del ícono
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white peer-focus:text-black/40 peer-focus:hover:text-black peer-not-placeholder-shown:text-black/40 peer-not-placeholder-shown:hover:text-black"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      {/* Botón */}
      <div className="mt-6 flex justify-center p-5">
        <Button className="w-full">
          Ingresar
        </Button>
      </div>
      
    </form>
  );
}