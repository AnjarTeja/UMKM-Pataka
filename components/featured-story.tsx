"use client"

import { BookOpen } from "lucide-react"
import { motion } from "framer-motion"

export default function FeaturedStory() {
  return (
    <section className="max-w-[1400px] mx-auto px-6 mt-section-gap mb-section-gap">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative rounded-3xl overflow-hidden clay-shadow"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-primary">
          <div className="p-10 lg:p-16 flex flex-col justify-center relative z-10">
            <span className="text-secondary-fixed text-xs font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Featured Artisan Story
            </span>
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              Mbah Kasidi:{" "}
              <span className="text-primary-fixed-dim">Sang Penjaga Api</span>
            </h2>
            <p className="text-primary-fixed-dim/90 text-base lg:text-lg mb-8 leading-relaxed max-w-lg">
              Telah memutar roda keramik selama lebih dari 40 tahun di
              Patakaharja. Setiap karyanya adalah napas sejarah yang dihidupkan
              kembali dalam bentuk modern yang elegan.
            </p>
            <button className="self-start px-8 py-3 bg-white text-primary rounded-full text-sm font-semibold hover:bg-primary-fixed transition-all active:scale-95 shadow-lg">
              Baca Kisah Selengkapnya
            </button>
          </div>

          <div className="relative min-h-[350px] lg:min-h-[400px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe8ef?w=800&q=80"
              alt="Artisan hands shaping clay"
              className="w-full h-full object-cover absolute inset-0"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
