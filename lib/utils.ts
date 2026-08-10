import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(value: string | number): string {
  const num = typeof value === "string" ? parseFloat(value) : value
  return `Rp.${Math.round(num).toLocaleString("id-ID")}`
}

export function normalizeWaNumber(input?: string | null): string {
  if (!input) return ""
  const digits = input.replace(/[^\d]/g, "")
  if (digits.startsWith("0")) return `62${digits.slice(1)}`
  if (digits.startsWith("62")) return digits
  if (digits.startsWith("8")) return `62${digits}`
  return digits
}
