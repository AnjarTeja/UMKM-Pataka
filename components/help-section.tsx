"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HelpCircle, MessageCircle, ChevronDown, ShoppingBag, MapPin, Phone } from "lucide-react"
import Image from "next/image"

const faqs = [
  {
    q: "Bagaimana cara memesan produk?",
    a: "Klik tombol 'Pesan WA' pada produk yang Anda minati. Anda akan langsung terhubung ke WhatsApp penjual dengan pesan otomatis berisi detail produk.",
    icon: ShoppingBag,
  },
  {
    q: "Apakah ada pembayaran online?",
    a: "Saat ini UMKM Patakaharja menggunakan sistem pemesanan via WhatsApp tanpa pembayaran online. Pembayaran dilakukan secara langsung (COD) atau transfer via info dari penjual.",
    icon: MessageCircle,
  },
  {
    q: "Bisa kunjungi langsung lokasi UMKM?",
    a: "Tentu! Silakan lihat Peta Lokasi Desa untuk menemukan alamat dan mengunjungi langsung para pengrajin di Desa Patakaharja.",
    icon: MapPin,
  },
  {
    q: "Bagaimana cara menghubungi penjual?",
    a: "Setiap produk memiliki tombol 'Pesan WA' yang akan menghubungkan Anda langsung ke WhatsApp penjual. Anda bisa menanyakan stok, harga, atau custom order.",
    icon: Phone,
  },
]

export default function HelpSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="max-w-[1400px] mx-auto px-6">
      <div className="text-center mb-10">
        <div className="h-14 w-14 rounded-full bg-primary-fixed flex items-center justify-center text-primary mx-auto mb-4">
          <HelpCircle className="h-7 w-7" />
        </div>
        <h2 className="font-heading text-3xl font-semibold text-primary">
          Bantuan
        </h2>
        <p className="text-on-surface-variant mt-1 max-w-xl mx-auto">
          Pertanyaan yang sering diajukan seputar belanja di UMKM Patakaharja
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        {faqs.map((faq, i) => {
          const Icon = faq.icon
          const isOpen = openIndex === i

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-xl border transition-all duration-200 ${
                isOpen
                  ? "border-primary-fixed-dim bg-surface-container-lowest shadow-sm"
                  : "border-outline-variant/30 bg-surface hover:bg-surface-container-lowest"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex items-center gap-3 w-full px-5 py-4 text-left"
              >
                <div className="h-10 w-10 rounded-full bg-primary-fixed/50 flex items-center justify-center text-primary shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="flex-1 text-sm font-semibold text-on-surface">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-on-surface-variant transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm text-on-surface-variant leading-relaxed pl-[4.25rem]">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      <div className="text-center mt-8 p-6 rounded-xl bg-primary-fixed/20 border border-primary-fixed-dim/30 max-w-lg mx-auto">
        <p className="text-sm text-on-surface-variant mb-3">
          Masih punya pertanyaan? Hubungi kami langsung
        </p>
        <a
          href="https://wa.me/6282316627926?text=Halo%20saya%20butuh%20bantuan"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-green-500 text-white text-sm font-semibold hover:bg-green-600 transition-all active:scale-95 shadow-sm"
        >
          <Image src="/whatsapp-logo.png" alt="WhatsApp" width={16} height={16} className="h-4 w-4" />
          Hubungi via WhatsApp
        </a>
      </div>
    </section>
  )
}
