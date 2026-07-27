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
      const pw = doc.internal.pageSize.getWidth()
      const ph = doc.internal.pageSize.getHeight()
      const clr = { primary: [52, 20, 82] as [number, number, number], accent: [16, 185, 129] as [number, number, number], dark: [30, 30, 30] as [number, number, number], muted: [120, 120, 120] as [number, number, number], light: [245, 245, 250] as [number, number, number] }

      const addFooter = () => {
        const pageCount = doc.getNumberOfPages()
        for (let i = 1; i <= pageCount; i++) {
          doc.setPage(i)
          doc.setDrawColor(...clr.primary)
          doc.setLineWidth(0.3)
          doc.line(14, ph - 14, pw - 14, ph - 14)
          doc.setFontSize(7)
          doc.setTextColor(...clr.muted)
          doc.text(`Laporan UMKM Patakaharja — Halaman ${i} dari ${pageCount}`, 14, ph - 9)
          doc.text(`Dicetak: ${new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}`, pw - 14, ph - 9, { align: "right" })
        }
      }

      // ── COVER / HEADER ──
      doc.setFillColor(...clr.primary)
      doc.rect(0, 0, pw, 52, "F")
      doc.setFillColor(...clr.accent)
      doc.rect(0, 52, pw, 3, "F")
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(24)
      doc.text("LAPORAN UMKM", pw / 2, 26, { align: "center" })
      doc.setFontSize(10)
      doc.text("DESA PATAKAHARJA — KECAMATAN RANCAH — KABUPATEN CIAMIS", pw / 2, 36, { align: "center" })
      doc.setFontSize(8)
      doc.text("Laporan data UMKM, produk, dan statistik", pw / 2, 43, { align: "center" })
      doc.setFillColor(255, 255, 255)
      const dateStr = startDate || endDate ? `${startDate || "—"} s/d ${endDate || "—"}` : "Semua waktu"
      doc.text(`Periode: ${dateStr}`, pw / 2, 48, { align: "center" })

      // ── INFO BAR ──
      let yPos = 66
      doc.setFillColor(...clr.light)
      doc.roundedRect(14, yPos, pw - 28, 14, 2, 2, "F")
      doc.setFontSize(8)
      doc.setTextColor(...clr.muted)
      doc.text(`Tanggal Cetak: ${new Date().toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" })}`, 20, yPos + 6)
      doc.text(`Filter UMKM: ${stores.find((s) => s.id === selectedStoreId)?.name || "Semua UMKM"}`, 20, yPos + 11)
      doc.text(`Periode: ${dateStr}`, pw / 2 + 10, yPos + 6)
      doc.text(`Total Data: ${data.stores?.length || 0} UMKM, ${data.products?.length || 0} Produk`, pw / 2 + 10, yPos + 11)

      // ── SECTION: RINGKASAN ──
      yPos = 91
      doc.setFillColor(...clr.primary)
      doc.roundedRect(14, yPos, pw - 28, 9, 2, 2, "F")
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(11)
      doc.text("RINGKASAN", 20, yPos + 6.5)
      yPos += 15

      const ringkasanData: string[][] = [
        ["Total UMKM Aktif", String(data.stats?.totalStores || 0)],
        ["Total Produk Aktif", String(data.stats?.totalProducts || 0)],
        ["Total Kategori Aktif", String(data.stats?.totalCategories || 0)],
        ["Produk dalam Laporan", String(data.products?.length || 0)],
      ]
      autoTable(doc, {
        startY: yPos,
        head: [["Indikator", "Jumlah"]],
        body: ringkasanData,
        theme: "grid",
        headStyles: { fillColor: [...clr.primary], textColor: 255, fontSize: 9, fontStyle: "bold", halign: "center" },
        bodyStyles: { fontSize: 9, textColor: [...clr.dark] },
        columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 30, halign: "center", fontStyle: "bold" } },
        margin: { left: 20, right: 20 },
        tableWidth: 130,
      })
      yPos = (doc as any).lastAutoTable.finalY + 14

      // ── SECTION: DAFTAR UMKM ──
      if (data.stores?.length > 0) {
        if (yPos > 240) { doc.addPage(); yPos = 30 }
        doc.setFillColor(...clr.primary)
        doc.roundedRect(14, yPos, pw - 28, 9, 2, 2, "F")
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(11)
        doc.text("DAFTAR UMKM", 20, yPos + 6.5)
        yPos += 15

        const storeRows: string[][] = data.stores.map((s: { name: string; _count?: { products: number }; whatsapp?: string }) => [
          s.name,
          String(s._count?.products || 0),
          s.whatsapp ? `+${s.whatsapp}` : "—",
        ])
        autoTable(doc, {
          startY: yPos,
          head: [["Nama UMKM", "Jumlah Produk", "Kontak WhatsApp"]],
          body: storeRows,
          theme: "grid",
          headStyles: { fillColor: [...clr.primary], textColor: 255, fontSize: 8, fontStyle: "bold", halign: "center" },
          bodyStyles: { fontSize: 8, textColor: [...clr.dark] },
          alternateRowStyles: { fillColor: [248, 248, 253] },
          columnStyles: { 1: { halign: "center" }, 2: { halign: "center" } },
          margin: { left: 20, right: 20 },
        })
        yPos = (doc as any).lastAutoTable.finalY + 14
      }

      // ── SECTION: DAFTAR PRODUK ──
      if (data.products?.length > 0) {
        if (yPos > 240) { doc.addPage(); yPos = 30 }
        doc.setFillColor(...clr.primary)
        doc.roundedRect(14, yPos, pw - 28, 9, 2, 2, "F")
        doc.setTextColor(255, 255, 255)
        doc.setFontSize(11)
        doc.text("DAFTAR PRODUK", 20, yPos + 6.5)
        yPos += 15

        const productRows: string[][] = data.products.map((p: { name: string; store?: { name: string }; category?: { name: string }; price: { toString: () => string }; stock: number; isActive: boolean }) => [
          p.name,
          p.store?.name || "—",
          p.category?.name || "—",
          `Rp ${Number(p.price).toLocaleString("id-ID")}`,
          String(p.stock),
          p.isActive ? "Aktif" : "Nonaktif",
        ])
        autoTable(doc, {
          startY: yPos,
          head: [["Produk", "UMKM", "Kategori", "Harga", "Stok", "Status"]],
          body: productRows,
          theme: "grid",
          headStyles: { fillColor: [...clr.primary], textColor: 255, fontSize: 7, fontStyle: "bold", halign: "center" },
          bodyStyles: { fontSize: 7, textColor: [...clr.dark] },
          alternateRowStyles: { fillColor: [248, 248, 253] },
          columnStyles: { 3: { halign: "right" }, 4: { halign: "center" }, 5: { halign: "center", cellWidth: 16 } },
          margin: { left: 20, right: 20 },
        })
      }

      // ── PAGE NUMBERS & FOOTER ──
      addFooter()

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
