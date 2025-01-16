import { writeFile } from 'fs/promises'
import path from 'path'

export async function uploadFile(file: Buffer, filename: string) {
  const formData = new FormData()
  const blob = new Blob([file], { type: 'application/pdf' })
  formData.append('file', blob, filename)

  // Get token from localStorage
  const token = localStorage.getItem('token')

  const response = await fetch('http://localhost:3001/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })

  const data = await response.json()
  return data.url
} 