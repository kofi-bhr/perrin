const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Single, comprehensive environment check at startup
console.log('=== Railway Environment Check ===')
console.log({
  NODE_ENV: process.env.NODE_ENV,
  PUBLIC_URL: process.env.PUBLIC_URL,
  RAILWAY_STATIC_URL: process.env.RAILWAY_STATIC_URL,
  RAILWAY_PUBLIC_DOMAIN: process.env.RAILWAY_PUBLIC_DOMAIN,
  RAILWAY_SERVICE_URL: process.env.RAILWAY_SERVICE_URL,
  RAILWAY_PROJECT_URL: process.env.RAILWAY_PROJECT_URL,
  PORT: process.env.PORT,
  PWD: process.env.PWD
})

// Use Railway's @web service URL with proper fallbacks
const DOMAIN = 'perrin-production.up.railway.app'  // Always use Railway domain
const PROTOCOL = 'https'  // Always use HTTPS

console.log('Server configuration:', {
  DOMAIN,
  PROTOCOL,
  uploadsPath: uploadsDir,
  dataPath: dataDir
})

const app = express()
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://perrin-institute.netlify.app'  // Your actual Netlify domain
  ],
  credentials: true
}))
app.use(express.json())

// Use Railway Volume if available
const uploadsDir = process.env.RAILWAY_VOLUME_MOUNT_PATH
  ? path.join(process.env.RAILWAY_VOLUME_MOUNT_PATH, 'uploads')
  : path.join(__dirname, 'uploads')

// Move this line after uploadsDir is defined
app.use('/uploads', express.static(uploadsDir))

const dataDir = process.env.RAILWAY_VOLUME_MOUNT_PATH
  ? path.join(process.env.RAILWAY_VOLUME_MOUNT_PATH, 'data')
  : path.join(__dirname, 'data')

// Ensure directories exist
fs.mkdirSync(uploadsDir, { recursive: true })
fs.mkdirSync(dataDir, { recursive: true })

// Simple file-based DB
const DB_FILE = path.join(dataDir, 'db.json')
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ papers: [] }))
}

// Add this right after your DB_FILE initialization
function migratePapers() {
  try {
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    const migratedPapers = db.papers.map(paper => {
      if (paper.fileUrl) return paper
      
      const fileName = paper.url.split('/').pop()
      return {
        ...paper,
        fileUrl: fileName,
        url: getPaperUrl(fileName)
      }
    })
    
    fs.writeFileSync(DB_FILE, JSON.stringify({ papers: migratedPapers }, null, 2))
    console.log('Papers migrated successfully')
  } catch (error) {
    console.error('Error migrating papers:', error)
  }
}

// Run migration when server starts
migratePapers()

// File storage setup
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage })

// Auth middleware
function auth(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (token === 'test-token') {
      next()
    } else {
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' })
  }
}

// Helper function to generate paper URLs
function getPaperUrl(filename) {
  return `${PROTOCOL}://${DOMAIN}/uploads/${filename}`
}

// Add debug logging
console.log('Environment detection:', {
  isRailway: Boolean(process.env.RAILWAY_STATIC_URL || process.env.RAILWAY_SERVICE_URL || process.env.PUBLIC_URL),
  NODE_ENV: process.env.NODE_ENV,
  DOMAIN,
  PROTOCOL
})

// Routes
app.get('/papers', function(req, res) {
  try {
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    const publicPapers = db.papers
      .filter(paper => paper.status === 'approved')
      .map(paper => ({
        ...paper,
        url: getPaperUrl(paper.fileUrl)
      }))
    res.json(publicPapers)
  } catch (error) {
    console.error('Error reading papers:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

app.get('/papers/:id', function(req, res) {
  try {
    console.log('=== Get Paper Request Start ===')
    const { id } = req.params
    console.log('Requested paper ID:', id)
    console.log('Current DOMAIN:', DOMAIN)
    console.log('Current PROTOCOL:', PROTOCOL)

    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    const paper = db.papers.find(p => p.id === id)
    
    if (!paper) {
      console.log('Paper not found:', id)
      return res.status(404).json({ error: 'Paper not found' })
    }

    console.log('Found paper in DB:', paper)
    
    const fullPaper = {
      ...paper,
      url: getPaperUrl(paper.fileUrl)
    }
    console.log('Returning paper with URL:', fullPaper)
    console.log('=== Get Paper Request End ===')
    
    res.json(fullPaper)
  } catch (error) {
    console.error('Error in GET /papers/:id:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

app.post('/login', function(req, res) {
  try {
    const { email, password } = req.body
    console.log('Login attempt:', { email, password })
    
    if (email === 'employee@perrin.org' && password === 'password') {
      res.json({ token: 'test-token' })
    } else {
      res.status(401).json({ error: 'Invalid credentials' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.post('/upload', auth, upload.single('file'), function(req, res) {
  try {
    console.log('=== Upload Request Start ===')
    console.log('File received:', req.file)
    console.log('Current DOMAIN:', DOMAIN)
    console.log('Current PROTOCOL:', PROTOCOL)

    if (!req.file) {
      console.log('No file in request')
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const paper = {
      id: Date.now().toString(),
      ...req.body,
      fileName: req.file.filename,
      fileUrl: req.file.filename,
      author: 'Employee Name',
      date: new Date().toISOString(),
      status: 'pending'
    }
    console.log('Paper object before URL:', paper)

    const fullPaper = {
      ...paper,
      url: getPaperUrl(paper.fileUrl)
    }
    console.log('Paper object with URL:', fullPaper)

    // Read current DB state
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    console.log('Current DB state:', db.papers.length, 'papers')

    // Save to DB
    db.papers.push(paper)
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))
    console.log('Paper saved to DB. New total:', db.papers.length)

    console.log('=== Upload Request End ===')
    res.json(fullPaper)
  } catch (error) {
    console.error('Error in upload:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

app.patch('/papers/:id', auth, function(req, res) {
  try {
    const { id } = req.params
    const { status } = req.body
    console.log('Attempting to update paper:', { id, status })

    // Read and log current DB state
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    console.log('Current DB state:', db)
    
    // Find and log paper
    const paperIndex = db.papers.findIndex(p => p.id === id)
    console.log('Found paper at index:', paperIndex)
    console.log('Paper being updated:', db.papers[paperIndex])

    if (paperIndex === -1) {
      console.log('Paper not found with id:', id)
      console.log('Available paper IDs:', db.papers.map(p => p.id))
      return res.status(404).json({ error: 'Paper not found' })
    }

    // Update paper status
    const updatedPaper = {
      ...db.papers[paperIndex],
      status
    }
    db.papers[paperIndex] = updatedPaper
    console.log('Updated paper:', updatedPaper)

    // Save back to file
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))
    console.log('DB saved successfully')
    
    res.json(updatedPaper)
  } catch (error) {
    console.error('Error updating paper:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

app.get('/debug', function(req, res) {
  try {
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    console.log('Current DB contents:', db)
    res.json(db)
  } catch (error) {
    console.error('Error reading DB:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

app.get('/admin/papers', auth, function(req, res) {
  try {
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    const papers = db.papers.map(paper => ({
      ...paper,
      url: getPaperUrl(paper.fileUrl)
    }))
    res.json(papers)
  } catch (error) {
    console.error('Error reading papers:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

app.get('/', function(req, res) {
  res.json({ 
    message: 'Perrin Institute API', 
    endpoints: {
      papers: '/papers',
      debug: '/debug',
      singlePaper: '/papers/:id',
      adminPapers: '/admin/papers',
      upload: '/upload',
      login: '/login'
    }
  })
})

app.use(function(req, res, next) {
  console.log(`${req.method} ${req.url}`, {
    headers: req.headers,
    body: req.body,
    query: req.query
  })
  next()
})

// Add this line to debug file paths
app.use((req, res, next) => {
  console.log('Request URL:', req.url)
  if (req.url.startsWith('/uploads')) {
    console.log('Serving file from:', path.join(uploadsDir, req.url.replace('/uploads/', '')))
  }
  next()
})

app.get('/reset-db', function(req, res) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify({ papers: [] }))
    res.json({ message: 'Database reset' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset database' })
  }
})

// Add test endpoint
app.get('/test-url', (req, res) => {
  const testUrl = getPaperUrl('test.pdf')
  res.json({
    testUrl,
    environment: {
      isRailway: Boolean(process.env.RAILWAY_STATIC_URL || process.env.RAILWAY_SERVICE_URL || process.env.PUBLIC_URL),
      NODE_ENV: process.env.NODE_ENV,
      DOMAIN,
      PROTOCOL
    }
  })
})

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001')
}) 