"use server"

import prisma from "@/lib/prisma"

export async function getReportData(params: {
  storeId?: string
  startDate?: string
  endDate?: string
}) {
  const productWhere: Record<string, unknown> = {}
  const storeWhere: Record<string, unknown> = {}

  if (params.storeId) {
    productWhere.storeId = params.storeId
    storeWhere.id = params.storeId
  }

  const [products, stores, totalStores, totalProducts, totalCategories] = await Promise.all([
    prisma.product.findMany({
      where: {
        ...productWhere,
        createdAt: {
          gte: params.startDate ? new Date(params.startDate) : undefined,
          lte: params.endDate ? new Date(params.endDate + "T23:59:59.999Z") : undefined,
        },
      },
      include: { store: true, category: true, images: { take: 1, where: { isPrimary: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.store.findMany({
      where: storeWhere,
      include: { _count: { select: { products: true } } },
      orderBy: { name: "asc" },
    }),
    prisma.store.count({ where: { isActive: true } }),
    prisma.product.count({ where: { isActive: true } }),
    prisma.category.count({ where: { isActive: true } }),
  ])

  return {
    products,
    stores,
    stats: {
      totalStores,
      totalProducts,
      totalCategories,
    },
  }
}
