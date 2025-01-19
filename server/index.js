const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

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

// Routes
app.get('/papers', function(req, res) {
  try {
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    // Return only approved papers for public access
    const publicPapers = db.papers.filter(paper => paper.status === 'approved')
    res.json(publicPapers)
  } catch (error) {
    console.error('Error reading papers:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

app.get('/papers/:id', function(req, res) {
  try {
    const { id } = req.params
    console.log('GET /papers/:id - Requested ID:', id)
    
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    console.log('Current papers in DB:', db.papers.map(p => ({ id: p.id, status: p.status })))
    
    const paper = db.papers.find(p => p.id === id)
    console.log('Found paper:', paper)
    
    if (!paper) {
      console.log('Paper not found with ID:', id)
      return res.status(404).json({ error: 'Paper not found' })
    }

    // Only return approved papers to public
    if (paper.status !== 'approved') {
      const token = req.headers.authorization?.split(' ')[1]
      console.log('Paper is not approved, checking auth token:', token)
      if (!token) {
        console.log('No auth token provided for non-approved paper')
        return res.status(404).json({ error: 'Paper not found' })
      }
    }
    
    console.log('Successfully returning paper:', paper.id)
    res.json(paper)
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
    console.log('Upload request received:', { body: req.body, file: req.file })
    if (!req.file) {
      console.log('No file in request')
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const paper = {
      id: Date.now().toString(),
      ...req.body,
      fileName: req.file.filename,
      url: process.env.RAILWAY_PUBLIC_DOMAIN
        ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}/uploads/${req.file.filename}`
        : `http://localhost:3001/uploads/${req.file.filename}`,
      author: 'Employee Name',
      date: new Date().toISOString(),
      status: 'pending'
    }
    console.log('Generated paper URL:', paper.url)
    console.log('Creating new paper:', paper)

    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    console.log('Current DB state:', db)
    db.papers.push(paper)
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))
    console.log('Updated DB state:', db)

    res.json(paper)
  } catch (error) {
    console.error('Error uploading:', error)
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
    console.log('Sending admin papers:', db.papers)
    res.json(db.papers)
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

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001')
}) 