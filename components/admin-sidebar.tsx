"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  ShoppingBag,
  Store,
  FileText,
  LogOut,
  ChevronLeft,
} from "lucide-react"

const sidebarLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Produk", href: "/admin/produk", icon: ShoppingBag },
  { label: "UMKM", href: "/admin/umkm", icon: Store },
  { label: "Laporan", href: "/admin/laporan", icon: FileText },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/admin/login")
  }

  return (
    <aside className="w-64 bg-[#341452] border-r border-white/10 flex flex-col min-h-screen sticky top-0">
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

      <nav className="p-3 space-y-1">
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

      <div className="mt-auto p-3 border-t border-white/10 space-y-0.5">
        <Link
          href="/"
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm text-white/30 hover:text-white/60 hover:bg-white/[0.04] transition-all"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Website
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3.5 py-2 rounded-xl text-sm text-white/30 hover:text-red-300 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </button>
      </div>
    </aside>
  )
}
