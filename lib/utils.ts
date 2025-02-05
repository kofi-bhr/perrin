export function getImageUrl(path: string) {
  // If it's already a full URL, return it
  if (path.startsWith('http')) {
    return path
  }
  
  // If it's a relative path, add the base URL
  const baseUrl = process.env.NEXT_PUBLIC_URL || ''
  return `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`
} 