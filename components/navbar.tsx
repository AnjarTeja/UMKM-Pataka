"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home, Store, Package, MapPin, HelpCircle } from "lucide-react"

const navLinks = [
  { label: "Beranda", href: "/", icon: Home },
  { label: "Profil Toko", href: "/profil", icon: Store },
  { label: "Produk", href: "/produk", icon: Package },
  { label: "Peta Lokasi", href: "/peta", icon: MapPin },
  { label: "Bantuan", href: "/bantuan", icon: HelpCircle },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${
        scrolled
          ? "bg-primary/80 backdrop-blur-xl shadow-lg border-b border-white/10"
          : "bg-primary border-b border-white/5"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-heading text-xl font-bold text-white">
            Patakaharja
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/20"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/10">
            <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center text-[10px] font-bold text-white/60">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <span className="text-xs font-medium text-white/80 leading-tight">
              <span className="block">Desa</span>
              <span className="block -mt-0.5">Patakaharja</span>
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-all"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 pt-2 bg-primary border-t border-white/10 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "text-white bg-white/20"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
