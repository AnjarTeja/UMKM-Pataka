"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HeroSection() {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const onScroll = () => setOffsetY(window.scrollY * 0.3)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <section className="relative h-[500px] md:h-[540px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage:
            "url('/images/gerabah.png')",
          transform: `translateY(${offsetY}px) scale(1.1)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/60" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-48 -left-16 w-72 h-72 rounded-full bg-primary-fixed-dim/12 blur-3xl animate-float" />
        <div className="absolute top-96 -right-10 w-80 h-80 rounded-full bg-secondary-fixed-dim/8 blur-3xl animate-float-delayed" />
      </div>

      <div className="relative h-full flex flex-col justify-center items-center text-center px-6 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            UMKM Desa Patakaharja
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" as const }}
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl leading-tight"
        >
          UMKM Patakaharja:{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-fixed-dim via-secondary-fixed to-white">
            Warisan Budaya, Kualitas Modern
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as const }}
          className="text-white/75 text-lg max-w-xl mb-6"
        >
          Eksplorasi keindahan kerajinan tangan UMKM Desa Patakaharja yang
          memadukan teknik tradisional dengan estetika kontemporer.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" as const }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link
            href="/produk"
            className="bg-primary hover:bg-primary-container text-white px-10 py-3 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-primary/20 active:scale-95"
          >
            Belanja Sekarang
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
