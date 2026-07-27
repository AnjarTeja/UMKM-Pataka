"use client"

import { Share2, Mail, Heart, MapPin, Phone, Home, Store, Package, MapPinIcon, HelpCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

const WA_NUMBER = "6281234567890"

export default function Footer() {
  const pathname = usePathname()

  if (pathname?.startsWith("/admin")) {
    return null
  }

  const navLinks = [
    { href: "/", label: "Beranda", icon: Home },
    { href: "/profil", label: "Profil Toko", icon: Store },
    { href: "/produk", label: "Produk", icon: Package },
    { href: "/peta", label: "Peta Lokasi", icon: MapPinIcon },
    { href: "/bantuan", label: "Bantuan", icon: HelpCircle },
  ]

  return (
    <footer className="w-full bg-primary mt-16">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-6">
        <div className="flex flex-col gap-4 items-center sm:items-start text-center sm:text-left">
          <span className="font-heading text-lg font-bold text-white">
            Patakaharja
          </span>
          <p className="text-primary-fixed-dim/80 text-sm max-w-xs">
            Memberdayakan UMKM lokal melalui inovasi digital dan pelestarian
            seni tradisional Indonesia.
          </p>
          <div className="flex items-start gap-2 text-primary-fixed-dim/70 text-sm">
            <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
            <span>Jl.Raya Tangkolo, Patakaharja, Kec. Rancah, Kabupaten Ciamis, Jawa Barat 46387</span>
          </div>
          <p className="text-primary-fixed-dim/60 text-xs flex items-center gap-1">
            Made with <Heart className="h-3 w-3 fill-primary-fixed-dim" /> in
            Patakaharja
          </p>
        </div>

        <div className="flex flex-col gap-2 items-center sm:items-start">
          <span className="text-sm font-semibold text-secondary-fixed mb-1">
            Navigasi
          </span>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-primary-fixed-dim/70 text-sm hover:text-white transition-colors flex items-center gap-2"
            >
              <link.icon className="h-3.5 w-3.5" />
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-2 items-center sm:items-start">
          <span className="text-sm font-semibold text-secondary-fixed mb-1">
            Layanan
          </span>
          <a
            href="/bantuan"
            className="text-primary-fixed-dim/70 text-sm hover:text-white transition-colors"
          >
            Cara Pemesanan
          </a>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=Halo%20saya%20ingin%20bertanya`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-fixed-dim/70 text-sm hover:text-white transition-colors flex items-center gap-2"
          >
            <Phone className="h-3.5 w-3.5" />
            Hubungi Artisan
          </a>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=Halo%20saya%20ingin%20memesan`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-fixed-dim/70 text-sm hover:text-white transition-colors"
          >
            Pesan Via WhatsApp
          </a>
          <span className="text-primary-fixed-dim/60 text-xs mt-1">
            Sen&ndash;Sab, 08.00&ndash;17.00 WIB
          </span>
        </div>

        <div className="flex flex-col gap-4 items-center sm:items-end">
          <div className="flex gap-3">
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full border border-primary-fixed-dim/30 flex items-center justify-center text-primary-fixed-dim hover:bg-white/10 hover:text-white transition-all active:scale-90"
            >
              <Phone className="h-4 w-4" />
            </a>
            <a
              href="mailto:umkmpataka2026@gmail.com"
              className="h-10 w-10 rounded-full border border-primary-fixed-dim/30 flex items-center justify-center text-primary-fixed-dim hover:bg-white/10 hover:text-white transition-all active:scale-90"
            >
              <Mail className="h-4 w-4" />
            </a>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: "UMKM Patakaharja", url: window.location.href })
                }
              }}
              className="h-10 w-10 rounded-full border border-primary-fixed-dim/30 flex items-center justify-center text-primary-fixed-dim hover:bg-white/10 hover:text-white transition-all active:scale-90"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
          <p className="text-primary-fixed-dim/60 text-xs text-center">
            &copy; {new Date().getFullYear()} Patakaharja UMKM. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
