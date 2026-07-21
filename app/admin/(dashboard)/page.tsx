"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ShoppingBag,
  Store,
  Tag,
  Package,
  ArrowUpRight,
  TrendingUp,
  Loader2,
} from "lucide-react"
import { PageTransition, SlideIn } from "@/components/admin-page-transition"
import { motion } from "framer-motion"

interface DashboardData {
  stats: { totalStores: number; totalProducts: number; totalCategories: number }
  recentProducts: {
    id: string
    name: string
    price: { toString: () => string }
    store: { name: string }
    images: { url: string }[]
  }[]
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[80vh]">
        <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
      </div>
    )
  }

  const stats = [
    { label: "Total UMKM", value: data?.stats.totalStores ?? 0, icon: Store, color: "bg-violet-100 text-violet-700", accent: "from-violet-500 to-purple-600" },
    { label: "Total Produk", value: data?.stats.totalProducts ?? 0, icon: Package, color: "bg-blue-100 text-blue-700", accent: "from-blue-500 to-indigo-600" },
    { label: "Kategori", value: data?.stats.totalCategories ?? 0, icon: Tag, color: "bg-emerald-100 text-emerald-700", accent: "from-emerald-500 to-teal-600" },
    { label: "Pesanan (WA)", value: "—", icon: ShoppingBag, color: "bg-amber-100 text-amber-700", accent: "from-amber-500 to-orange-600" },
  ]

  return (
    <PageTransition>
      <div className="p-6 lg:p-8">
        <SlideIn>
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-200">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-[#1a1a1a]">Dashboard</h1>
                <p className="text-gray-500 text-sm mt-0.5">Ringkasan data UMKM Patakaharja</p>
              </div>
            </div>
          </div>
        </SlideIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <SlideIn key={s.label}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 12px 32px -8px rgba(52,20,82,0.12)" }}
                  className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl ${s.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
                      className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${s.accent} opacity-30`}
                    />
                  </div>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                    className="text-2xl font-bold text-[#1a1a1a]"
                  >
                    {s.value}
                  </motion.p>
                  <p className="text-gray-500 text-sm mt-0.5">{s.label}</p>
                </motion.div>
              </SlideIn>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SlideIn>
            <motion.div
              whileHover={{ boxShadow: "0 8px 30px -6px rgba(52,20,82,0.08)" }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-violet-600" />
                  <h2 className="font-heading font-semibold text-[#1a1a1a]">Produk Terbaru</h2>
                </div>
                <Link
                  href="/admin/produk"
                  className="text-sm text-violet-600 hover:text-violet-700 font-medium transition-colors"
                >
                  Lihat Semua →
                </Link>
              </div>
              <div className="space-y-2">
                {!data?.recentProducts?.length && (
                  <p className="text-gray-400 text-sm text-center py-8">Belum ada produk</p>
                )}
                {data?.recentProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-violet-50/50 hover:to-transparent transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 overflow-hidden">
                      {product.images[0] ? (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="h-5 w-5 text-gray-400 m-auto mt-[10px]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1a1a1a] truncate">{product.name}</p>
                      <p className="text-xs text-gray-400 truncate">{product.store.name}</p>
                    </div>
                    <span className="text-sm font-semibold text-violet-700 bg-violet-50 px-2.5 py-1 rounded-lg">
                      Rp {Number(product.price).toLocaleString("id-ID")}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </SlideIn>

          <SlideIn>
            <motion.div
              whileHover={{ boxShadow: "0 8px 30px -6px rgba(52,20,82,0.08)" }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-violet-600" />
                <h2 className="font-heading font-semibold text-[#1a1a1a]">Aksi Cepat</h2>
              </div>
              <div className="space-y-3">
                  {[
                    { href: "/admin/produk/tambah", label: "Tambah Produk Baru", desc: "Masukkan produk UMKM terbaru", icon: Package, color: "violet" as const },
                    { href: "/admin/umkm/tambah", label: "Tambah UMKM Baru", desc: "Daftarkan UMKM ke website", icon: Store, color: "emerald" as const },
                    { href: "/admin/laporan", label: "Cetak Laporan", desc: "Download laporan UMKM dalam PDF", icon: ShoppingBag, color: "blue" as const },
                  ].map((item, i) => {
                    const Icon = item.icon
                    const colorMap = {
                      violet: { bg: "bg-violet-50", icon: "bg-violet-100 text-violet-700", iconColor: "text-violet-400 group-hover:text-violet-700" },
                      emerald: { bg: "bg-emerald-50", icon: "bg-emerald-100 text-emerald-700", iconColor: "text-emerald-400 group-hover:text-emerald-700" },
                      blue: { bg: "bg-blue-50", icon: "bg-blue-100 text-blue-700", iconColor: "text-blue-400 group-hover:text-blue-700" },
                    }
                    const c = colorMap[item.color]
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 p-3.5 rounded-xl ${c.bg} hover:brightness-95 transition-all group`}
                      >
                        <div className={`p-2 rounded-lg ${c.icon}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#1a1a1a]">{item.label}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                        <ArrowUpRight className={`h-4 w-4 ${c.iconColor} transition-colors`} />
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </SlideIn>
        </div>
      </div>
    </PageTransition>
  )
}
