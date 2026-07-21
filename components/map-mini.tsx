"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, ArrowRight, Maximize2 } from "lucide-react"

const CENTER_LAT = -7.164536
const CENTER_LNG = 108.509298

export default function MapMini() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const mapSrc =
    `https://www.google.com/maps?q=${CENTER_LAT},${CENTER_LNG}&t=k&z=15&output=embed&hl=id`

  if (!mounted) {
    return (
      <section className="max-w-[1400px] mx-auto px-6 mt-16">
        <div className="h-[280px] rounded-2xl bg-surface-container animate-pulse" />
      </section>
    )
  }

  return (
    <section className="max-w-[1400px] mx-auto px-6 mt-16 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-end justify-between mb-4">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-widest flex items-center gap-1.5 mb-1">
              <MapPin className="h-4 w-4" />
              Eksplorasi Lokasi
            </span>
            <h2 className="font-heading text-2xl font-semibold text-primary">
              Temukan UMKM di Peta
            </h2>
          </div>
          <Link
            href="/peta"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline group"
          >
            Lihat Peta Lengkap
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative rounded-2xl overflow-hidden clay-shadow border border-outline-variant/20 group">
          <div className="h-[280px] w-full bg-surface-container-low relative">
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Satelit UMKM Patakaharja"
            />

            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />

            <Link
              href="/peta"
              className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20"
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-surface/90 backdrop-blur-md rounded-full text-sm font-semibold text-primary shadow-lg">
                <Maximize2 className="h-4 w-4" />
                Buka Peta Lengkap
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-3 text-center sm:hidden">
          <Link
            href="/peta"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline group"
          >
            Lihat Peta Lengkap
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
