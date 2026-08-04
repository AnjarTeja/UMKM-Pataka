"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  ShoppingBag,
  Store,
  FileText,
  X,
} from "lucide-react"

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Produk", href: "/admin/produk", icon: ShoppingBag },
  { label: "UMKM", href: "/admin/umkm", icon: Store },
  { label: "Laporan", href: "/admin/laporan", icon: FileText },
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function AdminSidebar({ open, onClose }: Props) {
  const pathname = usePathname()

  const content = (
    <aside className="w-64 bg-[#341452] flex flex-col h-full">
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2" onClick={onClose}>
          <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
            <Store className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="font-heading text-lg font-bold text-white">Patakaharja</span>
            <p className="text-white/40 text-[10px] leading-tight -mt-0.5">Panel Admin</p>
          </div>
        </Link>
        <button
          onClick={onClose}
          className="md:hidden p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {sidebarLinks.map((link, i) => {
          const Icon = link.icon
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href + "/"))
          return (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-white/50 hover:text-white/80 hover:bg-white/[0.06]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-white/15 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  {link.label}
                </span>
              </Link>
            </motion.div>
          )
        })}
      </nav>
    </aside>
  )

  return (
    <>
      {/* Desktop: fixed sidebar */}
      <div className="hidden md:flex fixed inset-y-0 left-0 z-40 w-64">
        {content}
      </div>

      {/* Mobile: overlay drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/50 md:hidden"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64 md:hidden"
            >
              {content}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
