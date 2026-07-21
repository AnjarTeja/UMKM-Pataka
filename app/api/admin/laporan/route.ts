import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { getReportData } from "@/lib/actions/report"

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const storeId = searchParams.get("storeId") || undefined
  const startDate = searchParams.get("startDate") || undefined
  const endDate = searchParams.get("endDate") || undefined

  const data = await getReportData({ storeId, startDate, endDate })
  return NextResponse.json(data)
}
