"use client";

import LiquidButton from "@/components/ui/liquid_button";

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-5 w-full mt-4" onSubmit={(e) => e.preventDefault()}>
      
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-white/80 ml-1">Email</label>
        <input 
          type="email" 
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-[#A9FFD7] focus:bg-white/10 focus:ring-1 focus:ring-[#A9FFD7]" 
          placeholder="correo@ejemplo.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center ml-1">
          <label className="text-sm font-medium text-white/80">Password</label>
          <a href="#" className="text-xs text-[#8C6CFF] hover:text-white transition-colors">¿Olvidaste tu contraseña?</a>
        </div>
        <input 
          type="password" 
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-[#A9FFD7] focus:bg-white/10 focus:ring-1 focus:ring-[#A9FFD7]" 
          placeholder="••••••••"
        />
      </div>

      <div className="mt-6 flex justify-center">
        <LiquidButton className="w-full">
          Ingresar
        </LiquidButton>
      </div>
    </form>
  );
}