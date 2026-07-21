"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  ShoppingBag,
  Store,
  FileText,
} from "lucide-react"

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Produk", href: "/admin/produk", icon: ShoppingBag },
  { label: "UMKM", href: "/admin/umkm", icon: Store },
  { label: "Laporan", href: "/admin/laporan", icon: FileText },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-[#341452] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border-b border-white/10"
      >
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
            <Store className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="font-heading text-lg font-bold text-white">Patakaharja</span>
            <p className="text-white/40 text-[10px] leading-tight -mt-0.5">Panel Admin</p>
          </div>
        </Link>
      </motion.div>

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
}
