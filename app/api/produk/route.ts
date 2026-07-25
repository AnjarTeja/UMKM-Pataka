import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const featured = searchParams.get("featured") === "true"
  const search = searchParams.get("search") || ""
  const categorySlug = searchParams.get("category") || ""

  const where: Record<string, unknown> = { isActive: true }

  if (featured) where.isFeatured = true

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { store: { name: { contains: search, mode: "insensitive" } } },
    ]
  }

  if (categorySlug) {
    where.category = { slug: categorySlug }
  }

  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        store: { select: { name: true, whatsapp: true } },
        category: { select: { name: true, slug: true } },
        images: { take: 1, where: { isPrimary: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    }),
  ])

  const mapped = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price.toString(),
    image: p.images[0]?.url || "",
    store: p.store.name,
    storeId: p.storeId,
    storeWhatsapp: p.store.whatsapp,
    category: p.category.name,
    categorySlug: p.category.slug,
  }))

  return NextResponse.json({
    products: mapped,
    categories: categories.map((c) => ({ name: c.name, slug: c.slug })),
  })
}
