"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "Siti Rahayu",
    role: "Pelanggan dari Jakarta",
    text: "Saya pesan set piring dari Gerabah Ibu Sumini via WhatsApp, responnya cepat banget. Produk sampai dengan aman dan kualitasnya luar biasa untuk harga segitu. Pasti akan order lagi!",
    rating: 5,
  },
  {
    name: "Dimas Pratama",
    role: "Dekorator Interior",
    text: "Vase dari Keramik Mbah Kasidi jadi favorit klien saya. Setiap piece unik, finishingnya halus. Sangat merekomendasikan untuk teman-teman yang cari home decor berkualitas.",
    rating: 5,
  },
  {
    name: "Rina Marlina",
    role: "Kolektor Kerajinan",
    text: "Sudah 3 kali belanja di Patakaharja. Pelayanannya personal, bisa request desain custom. Yang paling saya suka, semua harga transparan tanpa biaya tersembunyi.",
    rating: 5,
  },
  {
    name: "Asep Hidayat",
    role: "Eksportir Kerajinan",
    text: "Potensi UMKM Patakaharja sangat besar. Kualitas gerabahnya setara dengan produk impor tapi dengan harga lokal. Saya sudah kerja sama dengan 3 pengrajin di sini.",
    rating: 5,
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1))

  const t = testimonials[current]

  return (
    <section className="max-w-[1400px] mx-auto px-6 mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <span className="text-xs font-semibold text-primary uppercase tracking-widest flex items-center justify-center gap-1.5 mb-2">
          <Quote className="h-4 w-4" />
          Testimoni
        </span>
        <h2 className="font-heading text-3xl font-semibold text-primary">
          Kata Mereka
        </h2>
        <p className="text-on-surface-variant mt-1 max-w-md mx-auto">
          Pengalaman nyata dari pelanggan yang sudah belanja di UMKM Patakaharja
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto">
        <div className="relative bg-surface-container-lowest rounded-2xl p-8 md:p-14 clay-shadow border border-outline-variant/20">
          <div className="absolute top-4 right-4 text-primary-fixed-dim/15">
            <Quote className="h-28 w-28" />
          </div>

          <div className="relative z-10 min-h-[260px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: "easeOut" as const }}
                className="space-y-4"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>

                <p className="text-on-surface text-lg leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-4 pt-4">
                  <div className="h-12 w-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-heading font-bold text-base">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading text-base font-semibold text-primary">
                      {t.name}
                    </p>
                    <p className="text-sm text-on-surface-variant">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-outline-variant/20">
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-6 bg-primary"
                      : "w-2 bg-outline-variant hover:bg-outline"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                className="h-9 w-9 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-primary-fixed hover:text-primary transition-all active:scale-90"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                className="h-9 w-9 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:bg-primary-fixed hover:text-primary transition-all active:scale-90"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
