"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/button";

export default function RegisterForm() {
  // Estados independientes para mostrar/ocultar cada contraseña
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form className="flex w-full flex-col gap-4">
      {/* Fila 1: Nombre y Apellido */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="ml-1 text-sm font-medium text-white/80">Nombre</label>
          <input 
            type="text" 
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-[#8C6CFF] focus:bg-white focus:text-black focus:placeholder-black focus:ring-1 focus:ring-[#8C6CFF] not-placeholder-shown:bg-white not-placeholder-shown:text-black" 
            placeholder="Your name"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="ml-1 text-sm font-medium text-white/80">Apellido</label>
          <input 
            type="text" 
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-[#8C6CFF] focus:bg-white focus:text-black focus:placeholder-black focus:ring-1 focus:ring-[#8C6CFF] not-placeholder-shown:bg-white not-placeholder-shown:text-black" 
            placeholder="Your lastname"
          />
        </div>
      </div>

      {/* Fila 2: Username y Email */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="ml-1 text-sm font-medium text-white/80">Username</label>
          <input 
            type="text" 
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-[#8C6CFF] focus:bg-white focus:text-black focus:placeholder-black focus:ring-1 focus:ring-[#8C6CFF] not-placeholder-shown:bg-white not-placeholder-shown:text-black" 
            placeholder="@yourusername"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="ml-1 text-sm font-medium text-white/80">Email</label>
          <input 
            type="email" 
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-[#8C6CFF] focus:bg-white focus:text-black focus:placeholder-black focus:ring-1 focus:ring-[#8C6CFF] not-placeholder-shown:bg-white not-placeholder-shown:text-black" 
            placeholder="email@example.com"
          />
        </div>
      </div>

      {/* Fila 3: Password y Repetir Password */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="ml-1 text-sm font-medium text-white/80">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              // Agregamos 'peer' y 'pr-12' para dejar espacio al ícono
              className="peer w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-4 pr-12 text-white placeholder-white/30 outline-none transition-all focus:border-[#8C6CFF] focus:bg-white focus:text-black focus:placeholder-black focus:ring-1 focus:ring-[#8C6CFF] not-placeholder-shown:bg-white not-placeholder-shown:text-black" 
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              // Clases dinámicas que leen el estado del input (peer) para cambiar su color cuando el fondo se vuelve blanco
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white peer-focus:text-black/40 peer-focus:hover:text-black peer-not-placeholder-shown:text-black/40 peer-not-placeholder-shown:hover:text-black"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label className="ml-1 text-sm font-medium text-white/80">Repetir Password</label>
          <div className="relative">
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              className="peer w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-4 pr-12 text-white placeholder-white/30 outline-none transition-all focus:border-[#8C6CFF] focus:bg-white focus:text-black focus:placeholder-black focus:ring-1 focus:ring-[#8C6CFF] not-placeholder-shown:bg-white not-placeholder-shown:text-black" 
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors hover:text-white peer-focus:text-black/40 peer-focus:hover:text-black peer-not-placeholder-shown:text-black/40 peer-not-placeholder-shown:hover:text-black"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Fila 4: Términos y Condiciones */}
      <div className="mt-2 flex items-center justify-center gap-3">
        <input 
          type="checkbox" 
          id="terms" 
          className="h-4 w-4 rounded border-white/20 bg-white/10 text-[#A9FFD7] focus:ring-[#A9FFD7] focus:ring-offset-0"
        />
        <label htmlFor="terms" className="cursor-pointer select-none text-sm text-white/70">
          Aceptar términos y condiciones
        </label>
      </div>

      {/* Fila 5: Botón */}
      <div className="mt-4 flex justify-center p-5">
        <Button className="w-full" onClick={() => {}}>
          Sign up
        </Button>
      </div>
    </form>
  );
}