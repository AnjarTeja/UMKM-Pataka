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
  address?: string
  whatsapp?: string
  sellerName: string
}) {
  const baseSlug = slugify(data.name)
  let slug = baseSlug
  let counter = 1
  while (await prisma.store.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  const autoEmail = `${slug}@umkm.pataka`
  const autoPassword = "umkm123"
  const hashedPassword = await bcrypt.hash(autoPassword, 12)

  const store = await prisma.store.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      address: data.address,
      whatsapp: data.whatsapp,
      user: {
        create: {
          name: data.sellerName,
          email: autoEmail,
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
    address?: string
    whatsapp?: string
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
      address: data.address,
      whatsapp: data.whatsapp,
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
