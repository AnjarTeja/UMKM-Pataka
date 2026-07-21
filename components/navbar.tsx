"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Menu, X, Home, Store, Package, MapPin, HelpCircle } from "lucide-react"

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
          <div className="relative hidden lg:block w-64 xl:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 h-4 w-4" />
            <input
              type="text"
              placeholder="Cari produk..."
              className="w-full bg-white/15 border border-white/20 rounded-full py-1.5 pl-9 pr-3 text-sm focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all outline-none text-white placeholder:text-white/40"
            />
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
