const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

// Constants
const DOMAIN = 'perrin-production.up.railway.app'
const PROTOCOL = 'https'

// Use Railway volume for storage
const uploadsDir = process.env.RAILWAY_VOLUME_MOUNT_PATH 
  ? path.join(process.env.RAILWAY_VOLUME_MOUNT_PATH, 'uploads')
  : path.join(__dirname, 'uploads')

// Ensure uploads directory exists
fs.mkdirSync(uploadsDir, { recursive: true })

const app = express()

// Enable CORS
app.use(cors())
app.use(express.json())

// Serve files from Railway volume
app.use('/uploads', express.static(uploadsDir))

// Configure multer to store files in Railway volume
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

// Environment logging
console.log('Server configuration:', {
  DOMAIN,
  PROTOCOL,
  uploadsPath: uploadsDir,
  dataPath: process.env.RAILWAY_VOLUME_MOUNT_PATH ? path.join(process.env.RAILWAY_VOLUME_MOUNT_PATH, 'data') : path.join(__dirname, 'data'),
  railwayVolume: process.env.RAILWAY_VOLUME_MOUNT_PATH
})

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

// Simple file-based DB
const DB_FILE = path.join(process.env.RAILWAY_VOLUME_MOUNT_PATH ? path.join(process.env.RAILWAY_VOLUME_MOUNT_PATH, 'data') : path.join(__dirname, 'data'), 'db.json')
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ papers: [] }))
}

// KILL ALL LOCALHOST REFERENCES
const RAILWAY_URL = 'https://perrin-production.up.railway.app'

// Override the response before it's sent
app.use((req, res, next) => {
  // Store the original json method
  const originalJson = res.json

  // Override the json method
  res.json = function(data) {
    // If we're sending paper data, force the URLs
    if (data && (data.papers || data.url || Array.isArray(data))) {
      // Handle array of papers
      if (Array.isArray(data)) {
        data = data.map(paper => ({
          ...paper,
          url: `${RAILWAY_URL}/uploads/${paper.fileName}`,
          fileUrl: paper.fileName
        }))
      }
      // Handle single paper
      else if (data.url) {
        data.url = `${RAILWAY_URL}/uploads/${data.fileName}`
        data.fileUrl = data.fileName
      }
      // Handle papers array in object
      else if (data.papers) {
        data.papers = data.papers.map(paper => ({
          ...paper,
          url: `${RAILWAY_URL}/uploads/${paper.fileName}`,
          fileUrl: paper.fileName
        }))
      }
    }
    
    // Call the original json method
    return originalJson.call(this, data)
  }
  
  next()
})

// Remove all other URL generation functions
// Remove getPaperUrl, forceRailwayUrl, etc.

// Simplify paper creation
app.post('/upload', auth, upload.single('file'), function(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const paper = {
      id: Date.now().toString(),
      ...req.body,
      fileName: req.file.filename,
      author: 'Employee Name',
      date: new Date().toISOString(),
      status: 'pending'
    }

    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    db.papers.push(paper)
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))

    // The middleware will handle URL generation
    res.json(paper)
  } catch (error) {
    console.error('Error in upload:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

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
    const papers = db.papers
      .filter(paper => paper.status === 'approved')
      .map(paper => ({
        ...paper,
        url: `${RAILWAY_URL}/uploads/${paper.fileName}`,
        fileUrl: paper.fileName
      }))
    res.json(papers)
  } catch (error) {
    console.error('Error:', error)
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
      url: `${RAILWAY_URL}/uploads/${paper.fileUrl}`,
      fileUrl: paper.fileUrl
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
      url: `${RAILWAY_URL}/uploads/${paper.fileUrl}`,
      fileUrl: paper.fileUrl
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
  const testUrl = `${RAILWAY_URL}/uploads/test.pdf`
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

app.get('/check-file/:filename', (req, res) => {
  const filePath = path.join(uploadsDir, req.params.filename)
  try {
    fs.accessSync(filePath)
    res.json({
      exists: true,
      path: filePath,
      size: fs.statSync(filePath).size
    })
  } catch (error) {
    res.json({
      exists: false,
      error: error.message,
      path: filePath
    })
  }
})

app.get('/fix-papers', function(req, res) {
  try {
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    const fixedPapers = db.papers.map(paper => {
      // Extract filename from any URL format
      const fileName = paper.url?.split('/').pop() || paper.fileName || paper.fileUrl
      return {
        ...paper,
        fileUrl: fileName,
        fileName: fileName
      }
    })
    
    fs.writeFileSync(DB_FILE, JSON.stringify({ papers: fixedPapers }, null, 2))
    res.json({ message: 'Papers fixed', count: fixedPapers.length })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fix papers' })
  }
})

// At startup, verify volume
console.log('=== Volume Check ===')
console.log('Volume path:', process.env.RAILWAY_VOLUME_MOUNT_PATH)
console.log('Uploads directory:', uploadsDir)
console.log('Files in uploads:', fs.readdirSync(uploadsDir))

app.listen(3001, () => {
  console.log(`Server running on ${PROTOCOL}://${DOMAIN}`)
})

// Add a force-fix endpoint
app.get('/force-fix', function(req, res) {
  try {
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    const fixed = db.papers.map(paper => ({
      ...paper,
      url: `${RAILWAY_URL}/uploads/${paper.fileName}`,
      fileUrl: paper.fileName
    }))
    fs.writeFileSync(DB_FILE, JSON.stringify({ papers: fixed }, null, 2))
    res.json({ message: 'All papers forced to Railway URLs', count: fixed.length })
  } catch (error) {
    res.status(500).json({ error: 'Failed to force fix' })
  }
}) 