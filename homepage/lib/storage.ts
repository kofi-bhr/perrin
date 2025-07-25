import fs from 'fs'
import path from 'path'
import { Paper } from './db'

const STORAGE_FILE = path.join(process.cwd(), 'data', 'papers.json')

// Ensure the data directory exists
if (!fs.existsSync(path.dirname(STORAGE_FILE))) {
  fs.mkdirSync(path.dirname(STORAGE_FILE), { recursive: true })
}

// Initialize storage file if it doesn't exist
if (!fs.existsSync(STORAGE_FILE)) {
  fs.writeFileSync(STORAGE_FILE, JSON.stringify([]))
}

export const readStorage = (): Paper[] => {
  try {
    const data = fs.readFileSync(STORAGE_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading storage:', error)
    return []
  }
}

export const writeStorage = (papers: Paper[]) => {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(papers, null, 2))
    return true
  } catch (error) {
    console.error('Error writing storage:', error)
    return false
  }
} 