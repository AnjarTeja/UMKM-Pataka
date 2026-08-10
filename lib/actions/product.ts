"use server"

import prisma from "@/lib/prisma"
import { deleteFile } from "@/lib/supabase-storage"
import { revalidatePath } from "next/cache"

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim()
}

export async function getProducts(search = "", page = 1, limit = 10) {
  const where = search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" as const } },
          { store: { name: { contains: search, mode: "insensitive" as const } } },
        ],
      }
    : {}

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { store: true, category: true, images: { take: 1, where: { isPrimary: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ])

  return { products, total, pages: Math.ceil(total / limit) }
}

export async function getProduct(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { store: true, category: true, images: { orderBy: { sortOrder: "asc" } } },
  })
}

const DEFAULT_CATEGORIES = ["Fashion", "Kriya", "Makanan Ringan", "Makanan"]

export async function getCategories() {
  let categories = await prisma.category.findMany({ where: { isActive: true }, orderBy: { name: "asc" } })

  if (categories.length === 0) {
    for (const name of DEFAULT_CATEGORIES) {
      const cat = await prisma.category.create({
        data: { name, slug: slugify(name), isActive: true },
      })
      categories.push(cat)
    }
  }

  return categories
}

export async function getStoresList() {
  return prisma.store.findMany({ where: { isActive: true }, orderBy: { name: "asc" } })
}

export async function createProduct(data: {
  name: string
  description?: string
  price: number
  stock: number
  unit: string
  isFeatured: boolean
  storeId: string
  categoryId: string
  images: { url: string; alt?: string; isPrimary: boolean }[]
}) {
  const baseSlug = slugify(data.name)
  let slug = baseSlug
  let counter = 1
  while (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  const product = await prisma.product.create({
    data: {
      name: data.name,
      slug,
      description: data.description,
      price: data.price,
      stock: data.stock,
      unit: data.unit,
      isFeatured: data.isFeatured,
      storeId: data.storeId,
      categoryId: data.categoryId,
      images: {
        create: data.images.map((img, idx) => ({
          url: img.url,
          alt: img.alt,
          isPrimary: img.isPrimary,
          sortOrder: idx,
        })),
      },
    },
  })

  revalidatePath("/admin/produk")
  revalidatePath("/produk")
  return product
}

export async function updateProduct(
  id: string,
  data: {
    name: string
    description?: string
    price: number
    stock: number
    unit: string
    isFeatured: boolean
    isActive: boolean
    storeId: string
    categoryId: string
    images: { url: string; alt?: string; isPrimary: boolean }[]
  }
) {
  const existing = await prisma.product.findUnique({ where: { id }, include: { images: true } })
  if (!existing) throw new Error("Produk tidak ditemukan")

  const baseSlug = slugify(data.name)
  let slug = baseSlug
  if (slug !== existing.slug) {
    let counter = 1
    while (await prisma.product.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }
  } else {
    slug = existing.slug
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      slug,
      description: data.description,
      price: data.price,
      stock: data.stock,
      unit: data.unit,
      isFeatured: data.isFeatured,
      isActive: data.isActive,
      storeId: data.storeId,
      categoryId: data.categoryId,
      images: {
        deleteMany: {},
        create: data.images.map((img, idx) => ({
          url: img.url,
          alt: img.alt,
          isPrimary: img.isPrimary,
          sortOrder: idx,
        })),
      },
    },
  })

  revalidatePath("/admin/produk")
  revalidatePath("/produk")
  return product
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: { select: { url: true } } },
  })
  if (!product) throw new Error("Produk tidak ditemukan")

  await prisma.product.delete({ where: { id } })

  for (const image of product.images) {
    await deleteFile(image.url).catch(() => {})
  }

  revalidatePath("/admin/produk")
  revalidatePath("/produk")
}
