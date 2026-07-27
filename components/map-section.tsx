"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const CENTER_LAT = -7.164536
const CENTER_LNG = 108.509298

export default function MapSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const mapSrc =
    `https://www.google.com/maps?q=${CENTER_LAT},${CENTER_LNG}&t=k&z=16&output=embed&hl=id`

  if (!mounted) {
    return (
      <section className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="font-heading text-3xl font-semibold text-primary">Peta Lokasi UMKM</h2>
          <p className="text-on-surface-variant mt-1">Temukan lokasi UMKM di Desa Patakaharja</p>
        </div>
        <div className="h-[400px] rounded-2xl bg-surface-container animate-pulse flex items-center justify-center">
          <span className="text-on-surface-variant">Memuat peta...</span>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-[1400px] mx-auto px-6">
      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl font-semibold text-primary">Peta Lokasi UMKM</h2>
        <p className="text-on-surface-variant mt-1">
          Temukan dan kunjungi langsung UMKM di Desa Patakaharja
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl overflow-hidden clay-shadow border border-outline-variant/20"
      >
        <div className="h-[450px] w-full bg-surface-container-low relative">
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

          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-xs">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              Mode Satelit
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
