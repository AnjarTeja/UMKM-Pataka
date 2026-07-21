import type { Metadata } from "next"
import { Manrope, Work_Sans } from "next/font/google"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "UMKM Patakaharja — Warisan Budaya, Kualitas Modern",
  description:
    "Eksplorasi keindahan kerajinan tangan UMKM Desa Patakaharja. Marketplace kerajinan tradisional Indonesia yang memadukan teknik turun-temurun dengan estetika kontemporer.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="id"
      className={`${manrope.variable} ${workSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-on-surface font-sans">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
