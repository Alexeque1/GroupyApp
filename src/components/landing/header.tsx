"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="p-2 bg-white shadow-blue-500/50">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-6">
        <Link href="/">
          <Image src="/logo.png" alt="Logo de Groupy" width={80} height={80} />
        </Link>

        {/* NAVIGATION */}
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-4 text-lg">
            <Link href="/quienes-somos">Quienes somos</Link>
            <Link href="/promocionar">Promocionar</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>

          {/* ACCOUNT MENU */}
          <div className="relative" ref={accountRef}>
            <button onClick={() => setIsAccountOpen(!isAccountOpen)}>
              <Image src="/account_icon.svg" alt="User Icon" width={32} height={32} />
            </button>

            <div
              className={`absolute z-10 right-0 mt-2 w-48 whitespace-nowrap bg-white border rounded shadow p-4 flex flex-col gap-3
                origin-top-right transition-all duration-150 ease-out
                ${isAccountOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
              <Link href="/login">Iniciar sesión</Link>
              <Link href="/registro">Registrarse</Link>
            </div>
          </div>

          {/* BURGER MENU */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <nav className="md:hidden flex flex-col gap-4 px-6 py-4 border-t">
          <Link href="/quienes-somos">Quienes somos</Link>
          <Link href="/promocionar">Promocionar</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>
      )}
    </header>
  );
}