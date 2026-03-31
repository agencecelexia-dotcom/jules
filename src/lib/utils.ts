import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInMinutes, differenceInHours, differenceInDays, format } from "date-fns"
import { fr } from "date-fns/locale"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date in French relative style.
 * - Less than 60 min  → "il y a Xmin"
 * - Less than 24 h    → "il y a Xh"
 * - Less than 7 days  → "il y a Xj"
 * - Otherwise          → "15 mars 2026"
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date
  const now = new Date()

  const mins = differenceInMinutes(now, d)
  if (mins < 1) return "à l'instant"
  if (mins < 60) return `il y a ${mins}min`

  const hours = differenceInHours(now, d)
  if (hours < 24) return `il y a ${hours}h`

  const days = differenceInDays(now, d)
  if (days < 7) return `il y a ${days}j`

  return format(d, "d MMMM yyyy", { locale: fr })
}

/** Format cents to French currency string, e.g. 4500 → "45,00 €" */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100)
}

/** Return the first two initials of a name. "Sophie Martin" → "SM" */
export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("")
}

/** Generate a simple unique ID suitable for mock / client-side data. */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 10)
}

/** Truncate text to `maxLength` characters, adding "..." if truncated. */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + "..."
}
