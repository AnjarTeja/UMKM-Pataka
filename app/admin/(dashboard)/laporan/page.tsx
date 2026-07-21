"use client"

import { useState, useEffect } from "react"
import { FileText, Download, Loader2, Calendar, Store } from "lucide-react"
import { PageTransition, SlideIn } from "@/components/admin-page-transition"
import { motion } from "framer-motion"
import { toast } from "sonner"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

interface StoreOption { id: string; name: string }

export default function LaporanPage() {
  const [stores, setStores] = useState<StoreOption[]>([])
  const [selectedStoreId, setSelectedStoreId] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    fetch("/api/admin/produk/stores").then((r) => r.json()).then(setStores)
  }, [])

  const generatePDF = async () => {
    setGenerating(true)
    try {
      const params = new URLSearchParams()
      if (selectedStoreId) params.set("storeId", selectedStoreId)
      if (startDate) params.set("startDate", startDate)
      if (endDate) params.set("endDate", endDate)

      const res = await fetch(`/api/admin/laporan?${params}`)
      const data = await res.json()

      const doc = new jsPDF("portrait", "mm", "a4")

      doc.setFontSize(18)
      doc.setTextColor(52, 20, 82)
      doc.text("LAPORAN UMKM", 14, 22)
      doc.setFontSize(10)
      doc.setTextColor(100)
      doc.text("UMKM Patakaharja — Desa Patakaharja, Kec. Cilimus, Kab. Kuningan", 14, 30)

      doc.setFontSize(9)
      doc.setTextColor(130)
      const dateStr = startDate || endDate ? `${startDate || "—"} s/d ${endDate || "—"}` : "Semua waktu"
      doc.text(`Periode: ${dateStr}`, 14, 36)
      doc.text(`Tanggal cetak: ${new Date().toLocaleDateString("id-ID")}`, 14, 41)

      doc.setDrawColor(52, 20, 82)
      doc.setLineWidth(0.5)
      doc.line(14, 44, 196, 44)

      let yPos = 50
      doc.setFontSize(12)
      doc.setTextColor(52, 20, 82)
      doc.text("Ringkasan", 14, yPos)
      yPos += 6

      const ringkasanData: string[][] = [
        ["Total UMKM", String(data.stats?.totalStores || 0)],
        ["Total Produk", String(data.stats?.totalProducts || 0)],
        ["Total Kategori", String(data.stats?.totalCategories || 0)],
        ["Produk dalam laporan", String(data.products?.length || 0)],
      ]
      autoTable(doc, { startY: yPos, head: [["Item", "Jumlah"]], body: ringkasanData, theme: "striped", headStyles: { fillColor: [52, 20, 82], textColor: 255, fontSize: 9 }, bodyStyles: { fontSize: 9 }, margin: { left: 14 }, tableWidth: 80 })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      yPos = (doc as any).lastAutoTable.finalY + 12

      if (data.stores?.length > 0) {
        doc.setFontSize(12); doc.setTextColor(52, 20, 82); doc.text("Daftar UMKM", 14, yPos); yPos += 6
        const storeRows: string[][] = data.stores.map((s: { name: string; _count?: { products: number }; phone?: string }) => [s.name, s._count?.products ? String(s._count.products) : "0", s.phone || "—"])
        autoTable(doc, { startY: yPos, head: [["Nama UMKM", "Jumlah Produk", "Kontak"]], body: storeRows, theme: "striped", headStyles: { fillColor: [52, 20, 82], textColor: 255, fontSize: 9 }, bodyStyles: { fontSize: 8 }, margin: { left: 14, right: 14 } })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        yPos = (doc as any).lastAutoTable.finalY + 12
      }

      if (data.products?.length > 0) {
        if (yPos > 250) { doc.addPage(); yPos = 20 }
        doc.setFontSize(12); doc.setTextColor(52, 20, 82); doc.text("Daftar Produk", 14, yPos); yPos += 6
        const productRows: string[][] = data.products.map((p: { name: string; store?: { name: string }; category?: { name: string }; price: { toString: () => string }; stock: number; isActive: boolean }) => [p.name, p.store?.name || "—", p.category?.name || "—", `Rp ${Number(p.price).toLocaleString("id-ID")}`, String(p.stock), p.isActive ? "Aktif" : "Nonaktif"])
        autoTable(doc, { startY: yPos, head: [["Produk", "UMKM", "Kategori", "Harga", "Stok", "Status"]], body: productRows, theme: "striped", headStyles: { fillColor: [52, 20, 82], textColor: 255, fontSize: 8 }, bodyStyles: { fontSize: 7 }, margin: { left: 14, right: 14 } })
      }

      doc.save(`laporan-umkm-pataka-${new Date().toISOString().split("T")[0]}.pdf`)
      toast.success("PDF berhasil diunduh")
    } catch { toast.error("Gagal generate PDF") } finally { setGenerating(false) }
  }

  return (
    <PageTransition>
      <div className="p-6 lg:p-8 max-w-4xl">
        <SlideIn>
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-200">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-[#1a1a1a]">Laporan PDF</h1>
                <p className="text-gray-500 text-sm mt-0.5">Cetak laporan data UMKM dan produk</p>
              </div>
            </div>
          </div>
        </SlideIn>

        <SlideIn>
          <motion.div whileHover={{ boxShadow: "0 8px 30px -6px rgba(52,20,82,0.08)" }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5"><Store className="h-4 w-4 text-gray-400" /> Filter UMKM</label>
                <select value={selectedStoreId} onChange={(e) => setSelectedStoreId(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none bg-white">
                  <option value="">Semua UMKM</option>
                  {stores.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5"><Calendar className="h-4 w-4 text-gray-400" /> Dari Tanggal</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none" />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5"><Calendar className="h-4 w-4 text-gray-400" /> Sampai Tanggal</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none" />
              </div>
            </div>

            <motion.button
              onClick={generatePDF}
              disabled={generating}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-[#341452] hover:bg-[#4b2c69] text-white px-6 py-3 rounded-xl text-sm font-medium transition-all disabled:opacity-50 shadow-lg shadow-violet-200/50"
            >
              {generating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Download className="h-5 w-5" />}
              {generating ? "Menggenerate..." : "Cetak PDF"}
            </motion.button>
          </motion.div>
        </SlideIn>

        <SlideIn>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="h-5 w-5 text-violet-600" />
              <h2 className="font-heading font-semibold text-[#1a1a1a]">Pratinjau Konten Laporan</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Ringkasan", items: ["Total UMKM", "Total produk", "Total kategori"] },
                { title: "Daftar UMKM", items: ["Nama UMKM", "Jumlah produk", "Kontak"] },
                { title: "Daftar Produk", items: ["Nama produk", "UMKM", "Kategori, harga, stok"] },
              ].map((section) => (
                <div key={section.title} className="p-4 rounded-xl bg-gray-50/80 border border-gray-100">
                  <p className="font-medium text-sm text-[#1a1a1a] mb-2">{section.title}</p>
                  <ul className="space-y-1.5">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </SlideIn>
      </div>
    </PageTransition>
  )
}
