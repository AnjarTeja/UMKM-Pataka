import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { getStores, createStore } from "@/lib/actions/store"

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search") || ""

  const stores = await getStores(search)
  return NextResponse.json(stores)
}

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const data = await request.json()
    const store = await createStore(data)
    return NextResponse.json(store, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Gagal membuat UMKM" },
      { status: 500 }
    )
  }
}
