import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, storeId, customerName, customerPhone, quantity, notes } = body

    if (!productId || !storeId) {
      return NextResponse.json({ error: "productId dan storeId wajib diisi" }, { status: 400 })
    }

    const order = await prisma.order.create({
      data: {
        productId,
        storeId,
        customerName: customerName || null,
        customerPhone: customerPhone || null,
        quantity: quantity || 1,
        notes: notes || null,
      },
    })

    return NextResponse.json({ success: true, order })
  } catch {
    return NextResponse.json({ error: "Gagal mencatat pesanan" }, { status: 500 })
  }
}
