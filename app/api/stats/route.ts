import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  const [totalStores, totalProducts, totalOrders] = await Promise.all([
    prisma.store.count({ where: { isActive: true } }),
    prisma.product.count({ where: { isActive: true } }),
    prisma.order.count(),
  ])

  return NextResponse.json({ totalStores, totalProducts, totalOrders })
}
