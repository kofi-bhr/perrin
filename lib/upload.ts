import { put } from '@vercel/blob'

export async function uploadFile(file: Buffer, filename: string) {
  try {
    const blob = await put(filename, file, {
      access: 'public',
      contentType: 'application/pdf'
    })
    return blob.url
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
} 