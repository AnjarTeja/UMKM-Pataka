"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Plus, StoreIcon, Edit3, Trash2, Loader2, Package } from "lucide-react"
import { PageTransition, SlideIn, StaggerRow, ModalBackdrop } from "@/components/admin-page-transition"
import { AnimatePresence } from "framer-motion"
import { toast } from "sonner"

interface Store {
  id: string
  name: string
  slug: string
  whatsapp: string | null
  isActive: boolean
  user: { id: string; name: string; email: string }
  _count: { products: number }
  createdAt: string
}

export default function AdminStoresPage() {
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const fetchingRef = useRef(0)

  useEffect(() => {
    const id = ++fetchingRef.current
    fetch(`/api/admin/umkm`)
      .then((r) => r.json())
      .then((data) => { if (id === fetchingRef.current) { setStores(data); setLoading(false) } })
      .catch(() => { if (id === fetchingRef.current) setLoading(false) })
  }, [refreshKey])

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/umkm/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("UMKM berhasil dihapus")
        setDeleteId(null)
        setRefreshKey((k) => k + 1)
      } else {
        toast.error("Gagal menghapus UMKM")
      }
    } catch { toast.error("Terjadi kesalahan") }
  }

  return (
    <PageTransition>
      <div className="p-6 lg:p-8">
        <SlideIn>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h1 className="text-2xl font-heading font-bold text-[#1a1a1a]">UMKM</h1>
              <p className="text-gray-500 text-sm mt-1">Total {stores.length} UMKM terdaftar</p>
            </div>
            <Link
              href="/admin/umkm/tambah"
              className="flex items-center justify-center gap-2 bg-[#341452] hover:bg-[#4b2c69] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-lg shadow-violet-200/50"
            >
              <Plus className="h-4 w-4" />
              Tambah UMKM
            </Link>
          </div>
        </SlideIn>

        <SlideIn>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    {["UMKM", "Kontak", "Produk", "Status", "Aksi"].map((h, i) => (
                      <th key={h} className={`px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider ${
                        i === 0 ? "text-left" : i === 4 ? "text-right" : "text-center"
                      }`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={5}>
                        <div className="flex items-center justify-center py-12">
                          <Loader2 className="h-6 w-6 animate-spin text-violet-600" />
                          <span className="ml-2 text-gray-400 text-sm">Memuat data...</span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {!loading && stores.length === 0 && (
                    <tr><td colSpan={5} className="text-center py-12 text-gray-400">Belum ada UMKM</td></tr>
                  )}
                  {!loading && stores.map((store, idx) => (
                    <StaggerRow key={store.id} index={idx} className="border-b border-gray-50 hover:bg-gradient-to-r hover:from-violet-50/40 hover:to-transparent transition-all">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-violet-100 flex-shrink-0 flex items-center justify-center ring-1 ring-violet-200">
                            <StoreIcon className="h-4 w-4 text-violet-600" />
                          </div>
                          <div>
                            <p className="font-medium text-[#1a1a1a]">{store.name}</p>
                            <p className="text-xs text-gray-400">{store.user.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        {store.whatsapp ? (
                          <span className="text-xs text-green-600 font-medium">{store.whatsapp}</span>
                        ) : (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-violet-50 text-violet-600 text-xs font-semibold">
                          {store._count.products}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          store.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
                        }`}>
                          {store.isActive ? "Aktif" : "Nonaktif"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/umkm/${store.id}/edit`}
                            className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteId(store.id)}
                            className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </StaggerRow>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-50">
              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-violet-600" />
                  <span className="ml-2 text-gray-400 text-sm">Memuat data...</span>
                </div>
              )}
              {!loading && stores.length === 0 && (
                <p className="text-center py-12 text-gray-400 text-sm">Belum ada UMKM</p>
              )}
              {!loading && stores.map((store) => (
                <div key={store.id} className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-violet-100 flex-shrink-0 flex items-center justify-center ring-1 ring-violet-200">
                      <StoreIcon className="h-5 w-5 text-violet-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#1a1a1a] truncate">{store.name}</p>
                      <p className="text-xs text-gray-400 truncate">{store.user.name}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0 ${
                      store.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {store.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3 text-gray-500">
                      {store.whatsapp && (
                        <span className="text-green-600 font-medium">{store.whatsapp}</span>
                      )}
                      <span className="flex items-center gap-1">
                        <Package className="h-3.5 w-3.5" />
                        {store._count.products} produk
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-1 pt-1 border-t border-gray-50">
                    <Link
                      href={`/admin/umkm/${store.id}/edit`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      Edit
                    </Link>
                    <button
                      onClick={() => setDeleteId(store.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-red-600 hover:text-red-600 hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SlideIn>

        <AnimatePresence>
          {deleteId && (
            <ModalBackdrop>
              <h3 className="font-heading font-semibold text-lg text-[#1a1a1a] mb-2">Hapus UMKM?</h3>
              <p className="text-gray-500 text-sm mb-6">UMKM beserta produk, galeri, dan seluruh datanya akan dihapus permanen dari website dan database. Tindakan ini tidak dapat dibatalkan.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                >
                  Batal
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 text-sm font-medium text-white hover:bg-red-700 transition-all"
                >
                  Hapus
                </button>
              </div>
            </ModalBackdrop>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
