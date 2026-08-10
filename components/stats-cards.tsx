"use client"

import { useEffect, useState } from "react"
import { Store, PackageSearch, Users } from "lucide-react"
import { motion } from "framer-motion"

interface StatsData {
  totalStores: number
  totalProducts: number
  totalOrders: number
}

export default function StatsCards() {
  const [data, setData] = useState<StatsData | null>(null)

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {})
  }, [])

  const stats = [
    {
      icon: Store,
      label: "UMKM Aktif",
      value: data ? `${data.totalStores} UMKM` : "—",
      bg: "bg-secondary-container",
      color: "text-on-secondary-container",
    },
    {
      icon: PackageSearch,
      label: "Total Produk",
      value: data ? `${data.totalProducts} Produk` : "—",
      bg: "bg-primary-fixed-dim",
      color: "text-on-primary-fixed",
    },
    {
      icon: Users,
      label: "Pesanan via WA",
      value: data ? `${data.totalOrders} Pesanan` : "—",
      bg: "bg-tertiary-fixed",
      color: "text-on-tertiary-fixed",
    },
  ]

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="max-w-[1400px] mx-auto px-6 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.label}
            variants={item}
            className="bg-surface-container-lowest p-6 rounded-xl clay-shadow border border-outline-variant/30 flex items-center gap-4 hover:border-primary-fixed-dim/50 transition-all duration-300"
          >
            <div
              className={`h-12 w-12 rounded-full ${stat.bg} flex items-center justify-center ${stat.color}`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-on-surface-variant text-xs font-medium">
                {stat.label}
              </p>
              <p className="font-heading text-lg font-semibold text-primary">
                {stat.value}
              </p>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
