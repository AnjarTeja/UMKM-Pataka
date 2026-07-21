"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, MessageCircle, Menu, X, Home, Store, Package, MapPin, HelpCircle } from "lucide-react"

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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-md"
          : "bg-surface/70 backdrop-blur-md"
      }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-heading text-xl font-bold text-primary">
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
                      ? "text-primary bg-primary-fixed/60"
                      : "text-on-surface-variant hover:text-primary hover:bg-primary-fixed/30"
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
          <div className="relative hidden lg:block w-48 xl:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 h-4 w-4" />
            <input
              type="text"
              placeholder="Cari produk..."
              className="w-full bg-surface-container-low border border-outline-variant rounded-full py-1.5 pl-9 pr-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-on-surface placeholder:text-on-surface-variant/50"
            />
          </div>

          <a
            href="https://wa.me/6281234567890?text=Halo%20Admin%20Patakaharja%2C%20saya%20ingin%20bertanya"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-all active:scale-95 shadow-sm"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden xl:inline">Hubungi Admin</span>
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-all"
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
        <div className="px-4 pb-4 pt-2 bg-surface border-t border-outline-variant/20 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "text-primary bg-primary-fixed"
                    : "text-on-surface-variant hover:text-primary hover:bg-primary-fixed/30"
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
