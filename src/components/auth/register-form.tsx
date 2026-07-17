"use client";

import LiquidButton from "@/components/ui/liquid_button";

export default function RegisterForm() {
  return (
    <form className="flex flex-col gap-4 w-full">
      {/* Fila 1: Nombre y Apellido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-white/80 ml-1">Nombre</label>
          <input 
            type="text" 
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-[#8C6CFF] focus:bg-white/10 focus:ring-1 focus:ring-[#8C6CFF]" 
            placeholder="Tu nombre"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-white/80 ml-1">Apellido</label>
          <input 
            type="text" 
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-[#8C6CFF] focus:bg-white/10 focus:ring-1 focus:ring-[#8C6CFF]" 
            placeholder="Tu apellido"
          />
        </div>
      </div>

      {/* Fila 2: Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-white/80 ml-1">Email</label>
        <input 
          type="email" 
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-[#8C6CFF] focus:bg-white/10 focus:ring-1 focus:ring-[#8C6CFF]" 
          placeholder="correo@ejemplo.com"
        />
      </div>

      {/* Fila 3: Password y Repetir Password */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-white/80 ml-1">Password</label>
          <input 
            type="password" 
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-[#8C6CFF] focus:bg-white/10 focus:ring-1 focus:ring-[#8C6CFF]" 
            placeholder="••••••••"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-white/80 ml-1">Repetir Password</label>
          <input 
            type="password" 
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-[#8C6CFF] focus:bg-white/10 focus:ring-1 focus:ring-[#8C6CFF]" 
            placeholder="••••••••"
          />
        </div>
      </div>

      {/* Fila 4: Términos y Condiciones */}
      <div className="mt-2 flex items-center justify-center gap-3">
        <input 
          type="checkbox" 
          id="terms" 
          className="h-4 w-4 rounded border-white/20 bg-white/10 text-[#A9FFD7] focus:ring-[#A9FFD7] focus:ring-offset-0"
        />
        <label htmlFor="terms" className="text-sm text-white/70 cursor-pointer select-none">
          Aceptar términos y condiciones
        </label>
      </div>

      {/* Fila 5: Botón */}
      <div className="mt-4 flex justify-center">
        <LiquidButton className="w-full w-full" onClick={(e) => e.preventDefault()}>
          Registrarse
        </LiquidButton>
      </div>
    </form>
  );
}