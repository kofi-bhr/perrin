import { writeFile } from 'fs/promises'
import path from 'path'

export async function uploadFile(file: Buffer, filename: string) {
  try {
    const publicDir = path.join(process.cwd(), 'public')
    const papersDir = path.join(publicDir, 'papers')
    const filePath = path.join(papersDir, filename)
    await writeFile(filePath, file)
    return `/papers/${filename}`
  } catch (error) {
    console.error('Upload error:', error)
    throw error
  }
} 