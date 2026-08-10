"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Plus, Search, Package, Edit3, Trash2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { PageTransition, SlideIn, StaggerRow, ModalBackdrop } from "@/components/admin-page-transition"
import { AnimatePresence } from "framer-motion"
import { toast } from "sonner"

interface Product {
  id: string
  name: string
  slug: string
  price: { toString: () => string }
  stock: number
  isActive: boolean
  isFeatured: boolean
  store: { name: string }
  category: { name: string }
  images: { url: string }[]
  createdAt: string
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const fetchingRef = useRef(0)

  useEffect(() => {
    const id = ++fetchingRef.current
    const params = new URLSearchParams({ page: String(page), limit: "10" })
    if (search) params.set("search", search)

    fetch(`/api/admin/produk?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (id === fetchingRef.current) {
          setProducts(data.products)
          setTotal(data.total)
          setPages(data.pages)
          setLoading(false)
        }
      })
      .catch(() => { if (id === fetchingRef.current) setLoading(false) })
  }, [page, search, refreshKey])

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/produk/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Produk berhasil dihapus")
        setDeleteId(null)
        if (products.length === 1 && page > 1) {
          setPage((p) => p - 1)
        }
        setRefreshKey((k) => k + 1)
      } else {
        toast.error("Gagal menghapus produk")
      }
    } catch {
      toast.error("Terjadi kesalahan")
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  return (
    <PageTransition>
      <div className="p-6 lg:p-8">
        <SlideIn>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h1 className="text-2xl font-heading font-bold text-[#1a1a1a]">Produk</h1>
              <p className="text-gray-500 text-sm mt-1">Total {total} produk</p>
            </div>
            <Link
              href="/admin/produk/tambah"
              className="flex items-center justify-center gap-2 bg-[#341452] hover:bg-[#4b2c69] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-lg shadow-violet-200/50 hover:shadow-violet-300/50"
            >
              <Plus className="h-4 w-4" />
              Tambah Produk
            </Link>
          </div>
        </SlideIn>

        <SlideIn>
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Cari produk atau UMKM..."
                className="w-full bg-white border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none transition-all"
              />
            </div>
          </form>
        </SlideIn>

        <SlideIn>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    {["Produk", "UMKM", "Kategori", "Harga", "Stok", "Status", "Aksi"].map((h, i) => (
                      <th
                        key={h}
                        className={`px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider ${
                          i <= 2 ? "text-left" : i >= 4 && i <= 5 ? "text-center" : i === 6 ? "text-right" : ""
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={7}>
                        <div className="flex items-center justify-center py-12">
                          <Loader2 className="h-6 w-6 animate-spin text-violet-600" />
                          <span className="ml-2 text-gray-400 text-sm">Memuat data...</span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {!loading && products.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-gray-400">Belum ada produk</td>
                    </tr>
                  )}
                  {!loading && products.map((product, idx) => (
                    <StaggerRow key={product.id} index={idx} className="border-b border-gray-50 hover:bg-gradient-to-r hover:from-violet-50/40 hover:to-transparent transition-all">
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden ring-1 ring-gray-200">
                            {product.images[0] ? (
                              <img src={product.images[0].url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <Package className="h-4 w-4 text-gray-400 m-auto mt-2.5" />
                            )}
                          </div>
                          <span className="font-medium text-[#1a1a1a] truncate max-w-[200px]">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-gray-600">{product.store.name}</td>
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-600 text-xs font-medium">
                          {product.category.name}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right font-medium text-[#1a1a1a]">
                        Rp {Number(product.price).toLocaleString("id-ID")}
                      </td>
                      <td className="px-4 py-3.5 text-center text-gray-600">{product.stock}</td>
                      <td className="px-4 py-3.5 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
                        }`}>
                          {product.isActive ? "Aktif" : "Nonaktif"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/produk/${product.id}/edit`}
                            className="p-2 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteId(product.id)}
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
              {!loading && products.length === 0 && (
                <p className="text-center py-12 text-gray-400 text-sm">Belum ada produk</p>
              )}
              {!loading && products.map((product) => (
                <div key={product.id} className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden ring-1 ring-gray-200">
                      {product.images[0] ? (
                        <img src={product.images[0].url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Package className="h-5 w-5 text-gray-400 m-auto mt-[9px]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#1a1a1a] truncate">{product.name}</p>
                      <p className="text-xs text-gray-400 truncate">{product.store.name}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0 ${
                      product.isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {product.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-violet-50 text-violet-600 text-[10px] font-medium">
                        {product.category.name}
                      </span>
                      <span className="text-xs text-gray-400">Stok {product.stock}</span>
                    </div>
                    <span className="text-sm font-semibold text-[#1a1a1a]">
                      Rp {Number(product.price).toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-1 pt-1 border-t border-gray-50">
                    <Link
                      href={`/admin/produk/${product.id}/edit`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      Edit
                    </Link>
                    <button
                      onClick={() => setDeleteId(product.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {pages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50/30">
                <p className="text-sm text-gray-500">Halaman {page} dari {pages}</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 disabled:opacity-30 transition-all"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(pages, p + 1))}
                    disabled={page === pages}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 disabled:opacity-30 transition-all"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </SlideIn>

        <AnimatePresence>
          {deleteId && (
            <ModalBackdrop>
              <h3 className="font-heading font-semibold text-lg text-[#1a1a1a] mb-2">Hapus Produk?</h3>
              <p className="text-gray-500 text-sm mb-6">Produk beserta gambarnya akan dihapus permanen dari website dan database. Tindakan ini tidak dapat dibatalkan.</p>
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
