import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const [totalStores, totalProducts, totalCategories, totalOrders, recentProducts] = await Promise.all([
    prisma.store.count({ where: { isActive: true } }),
    prisma.product.count({ where: { isActive: true } }),
    prisma.category.count({ where: { isActive: true } }),
    prisma.order.count(),
    prisma.product.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { store: true, images: { take: 1, where: { isPrimary: true } } },
    }),
  ])

  return NextResponse.json({
    stats: { totalStores, totalProducts, totalCategories, totalOrders },
    recentProducts,
  })
}
