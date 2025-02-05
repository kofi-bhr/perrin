import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Keep existing utils
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add new image utility
export function getImageUrl(path: string): string {
  // If it's already a full URL, return it
  if (path.startsWith('http')) {
    return path
  }
  
  // If it's a relative path, add the base URL
  const baseUrl = process.env.NEXT_PUBLIC_URL || ''
  return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`
}

// Export everything
export const utils = {
  cn,
  getImageUrl,
}

export default utils 