"use server"

import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim()
}

export async function getStores(search = "") {
  const where = search
    ? { name: { contains: search, mode: "insensitive" as const } }
    : {}

  return prisma.store.findMany({
    where,
    include: {
      user: { select: { id: true, name: true, email: true } },
      _count: { select: { products: true } },
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function getStore(id: string) {
  return prisma.store.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, name: true, email: true } },
      _count: { select: { products: true } },
    },
  })
}

export async function createStore(data: {
  name: string
  description?: string
  logo?: string
  banner?: string
  address?: string
  phone?: string
  whatsapp?: string
  latitude?: number
  longitude?: number
  sellerName: string
  sellerEmail: string
  sellerPassword: string
}) {
  const baseSlug = slugify(data.name)
  let slug = baseSlug
  let counter = 1
  while (await prisma.store.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  const hashedPassword = await bcrypt.hash(data.sellerPassword, 12)

  const store = await prisma.store.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      logo: data.logo,
      banner: data.banner,
      address: data.address,
      phone: data.phone,
      whatsapp: data.whatsapp,
      latitude: data.latitude,
      longitude: data.longitude,
      user: {
        create: {
          name: data.sellerName,
          email: data.sellerEmail,
          password: hashedPassword,
          role: "SELLER",
        },
      },
    },
  })

  revalidatePath("/admin/umkm")
  revalidatePath("/profil")
  return store
}

export async function updateStore(
  id: string,
  data: {
    name: string
    description?: string
    logo?: string
    banner?: string
    address?: string
    phone?: string
    whatsapp?: string
    latitude?: number
    longitude?: number
    isActive: boolean
  }
) {
  const existing = await prisma.store.findUnique({ where: { id } })
  if (!existing) throw new Error("UMKM tidak ditemukan")

  const baseSlug = slugify(data.name)
  let slug = baseSlug
  if (slug !== existing.slug) {
    let counter = 1
    while (await prisma.store.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }
  } else {
    slug = existing.slug
  }

  const store = await prisma.store.update({
    where: { id },
    data: {
      name: data.name,
      slug,
      description: data.description,
      logo: data.logo,
      banner: data.banner,
      address: data.address,
      phone: data.phone,
      whatsapp: data.whatsapp,
      latitude: data.latitude,
      longitude: data.longitude,
      isActive: data.isActive,
    },
  })

  revalidatePath("/admin/umkm")
  revalidatePath("/profil")
  return store
}

export async function deleteStore(id: string) {
  await prisma.store.update({
    where: { id },
    data: { isActive: false },
  })

  revalidatePath("/admin/umkm")
  revalidatePath("/profil")
}
