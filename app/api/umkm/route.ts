import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  const stores = await prisma.store.findMany({
    where: { isActive: true },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      address: true,
      whatsapp: true,
      user: { select: { name: true } },
      _count: { select: { products: true } },
    },
    orderBy: { name: "asc" },
  })

  return NextResponse.json(stores)
}
