"use client"

import { MotionConfig } from "framer-motion"
import { usePathname } from "next/navigation"
import Navbar from "./navbar"
import Footer from "./footer"

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith("/admin")

  if (isAdmin) {
    return <main className="flex-1">{children}</main>
  }

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </MotionConfig>
  )
}
