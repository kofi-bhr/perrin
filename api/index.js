console.log('=== STARTUP DEBUG ===')
console.log('Current directory:', __dirname)
console.log('Process working directory:', process.cwd())
console.log('Files in current directory:', require('fs').readdirSync('.'))
console.log('Environment variables:', {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  PWD: process.env.PWD,
  PATH: process.env.PATH
})

require('dotenv').config({ path: '.env.local' })

const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { Server } = require('socket.io')
const http = require('http')
const sgMail = require('@sendgrid/mail')

// Use environment variable only
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// First, declare all constants
const RAILWAY_DOMAIN = process.env.NODE_ENV === 'production' 
  ? (process.env.RAILWAY_PUBLIC_DOMAIN || 'perrin-production.up.railway.app')
  : 'http://localhost:3001'
const port = process.env.PORT || 3001  // Railway will provide PORT env variable

// Update volume mount path configuration
const VOLUME_PATH = process.env.RAILWAY_VOLUME_MOUNT_PATH || '/data'

// Update data and uploads directories
const dataDir = path.join(VOLUME_PATH, 'data')
const uploadsDir = path.join(VOLUME_PATH, 'uploads')

// Create directories if they don't exist
fs.mkdirSync(dataDir, { recursive: true })
fs.mkdirSync(uploadsDir, { recursive: true })

// Update DB_FILE path
const DB_FILE = path.join(dataDir, 'db.json')

// Add this near your other constants
const CHAT_FILE = path.join(dataDir, 'chat.json')

// Initialize chat file if it doesn't exist
if (!fs.existsSync(CHAT_FILE)) {
  fs.writeFileSync(CHAT_FILE, JSON.stringify({ messages: [], users: [] }))
}

// Track connected users and messages
const connectedUsers = new Map()
let chatHistory = JSON.parse(fs.readFileSync(CHAT_FILE, 'utf-8')).messages || []

const app = express()
const server = http.createServer(app)

// Configure Socket.IO with proper CORS
const io = new Server(server, {
  cors: {
    origin: [
      'https://perrin-production.up.railway.app',
      'https://perrininstitution.org',
      'https://perrinsite.netlify.app',
      'http://localhost:3000'
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    transports: ['websocket', 'polling']
  },
  allowEIO3: true // Allow Engine.IO version 3 clients
})

io.on('connection', (socket) => {
  console.log('New client connected')
  
  // Send chat history to new connections
  socket.emit('chatHistory', chatHistory)
  
  socket.on('join', (userData) => {
    console.log('User joined:', userData)
    
    // Load profile from DB
    try {
      const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
      const userProfile = db.profiles[userData.email] || null
      
      // Store in connected users with profile from DB
      connectedUsers.set(socket.id, {
        email: userData.email,
        profile: userProfile
      })
      
      io.emit('userList', Array.from(connectedUsers.values()))
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  })

  socket.on('message', (message) => {
    const userData = connectedUsers.get(socket.id)
    if (!userData) return
    
    // Load latest profile from DB
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    const profile = db.profiles[userData.email] || null
    
    const newMessage = {
      user: userData.email,
      text: message,
      time: new Date().toISOString(),
      profile: profile
    }
    
    chatHistory.push(newMessage)
    fs.writeFileSync(CHAT_FILE, JSON.stringify({ 
      messages: chatHistory,
      users: Array.from(connectedUsers.values())
    }))
    
    io.emit('message', newMessage)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
    connectedUsers.delete(socket.id)
    io.emit('userList', Array.from(connectedUsers.values()))
  })
})

// Update CORS middleware to allow Socket.IO and PATCH requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Credentials', 'true')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }
  next()
})

// Remove all other CORS middleware
app.use(express.json())

// Update the static file serving middleware
app.use('/uploads', (req, res, next) => {
  // Set correct content type headers
  const filePath = path.join(uploadsDir, req.url)
  const ext = path.extname(filePath).toLowerCase()
  
  switch (ext) {
    case '.pdf':
      res.set('Content-Type', 'application/pdf')
      break
    case '.jpg':
    case '.jpeg':
      res.set('Content-Type', 'image/jpeg')
      break
    case '.png':
      res.set('Content-Type', 'image/png')
      break
    case '.gif':
      res.set('Content-Type', 'image/gif')
      break
  }

  // Enable CORS for file serving
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.set('Access-Control-Allow-Headers', '*')

  next()
}, express.static(uploadsDir, {
  setHeaders: (res, path) => {
    // Set cache control for better performance
    res.set('Cache-Control', 'public, max-age=31536000')
  }
}))

// Configure multer to store files in Railway volume
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

// Environment logging
console.log('Server configuration:', {
  DOMAIN: RAILWAY_DOMAIN,
  PROTOCOL: 'https',
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

// At the very top of the file, add debugging
console.log('=== RAILWAY CONFIGURATION CHECK ===')
console.log({
  PORT: process.env.PORT || 3001,  // Railway sets this
  PROJECT_ID: process.env.RAILWAY_PROJECT_ID,
  SERVICE_ID: process.env.RAILWAY_SERVICE_ID,
  ENVIRONMENT: process.env.RAILWAY_ENVIRONMENT,
  STATIC_URL: process.env.RAILWAY_STATIC_URL,
  PUBLIC_URL: process.env.PUBLIC_URL
})

// At the top after constants
console.log('=== URL Configuration ===')
console.log({
  RAILWAY_DOMAIN,
  env_RAILWAY_URL: process.env.RAILWAY_URL,
  NODE_ENV: process.env.NODE_ENV
})

// Add debug logging for Railway configuration
console.log('=== Railway Domain Configuration ===')
console.log({
  RAILWAY_DOMAIN,
  RAILWAY_PUBLIC_DOMAIN: process.env.RAILWAY_PUBLIC_DOMAIN,
  NODE_ENV: process.env.NODE_ENV
})

// Add this near the top where you initialize other files
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({
    papers: [],
    profiles: {},
    accessRequests: []
  }))
}

// Fix missing upload variable declaration
const upload = multer({ storage: storage })

// Update the middleware that handles URL transformations
app.use((req, res, next) => {
  // Force Railway URL in request
  req.baseUrl = RAILWAY_DOMAIN
  
  // Override res.json to force Railway URLs
  const originalJson = res.json
  res.json = function(data) {
    if (data) {
      // Force Railway URLs in all responses
      const forceUrl = (obj) => {
        if (obj.url) {
          // Ensure URL has correct protocol
          const protocol = process.env.NODE_ENV === 'production' ? 'https://' : 'http://'
          const domain = RAILWAY_DOMAIN.replace(/^https?:\/\//, '')
          
          if (obj.fileName) {
            obj.url = `${protocol}${domain}/uploads/${obj.fileName}`
          }
        }
        return obj
      }

      if (Array.isArray(data)) {
        data = data.map(forceUrl)
      } else if (data.papers) {
        data.papers = data.papers.map(forceUrl)
      } else {
        data = forceUrl(data)
      }
    }
    return originalJson.call(this, data)
  }
  next()
})

// Update the paper creation endpoint
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
      status: 'pending',
      url: `${RAILWAY_DOMAIN}/uploads/${req.file.filename}` // Add URL here
    }

    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    db.papers.push(paper)
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))

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
  DOMAIN: RAILWAY_DOMAIN,
  PROTOCOL: 'https'
})

// Routes
app.get('/papers', function(req, res) {
  try {
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    const papers = db.papers
      .filter(paper => paper.status === 'approved')
      .map(paper => ({
        ...paper,
        url: `${RAILWAY_DOMAIN}/uploads/${paper.fileName}`,
        fileUrl: paper.fileName
      }))
    res.json(papers)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

// Add this at the top level for debugging
let debugCounter = 0;

// Add this BEFORE all other routes
app.use((req, res, next) => {
  const requestId = ++debugCounter;
  console.log(`\n=== Request #${requestId} Start ===`);
  console.log('URL:', req.url);
  console.log('Method:', req.method);
  console.log('Headers:', req.headers);

  // Capture the original json method
  const originalJson = res.json;
  
  // Override json method to log what we're sending
  res.json = function(data) {
    console.log(`\n=== Response #${requestId} ===`);
    console.log('Sending data:', JSON.stringify(data, null, 2));
    return originalJson.call(this, data);
  };

  next();
});

// Update the papers/:id endpoint
app.get('/papers/:id', function(req, res) {
  try {
    console.log('\n=== GET /papers/:id ===');
    const { id } = req.params;
    
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    const paper = db.papers.find(p => p.id === id);
    
    if (!paper) {
      return res.status(404).json({ error: 'Paper not found' });
    }

    // Always construct a fresh URL using RAILWAY_DOMAIN
    const paperWithUrl = {
      ...paper,
      url: `${RAILWAY_DOMAIN}/uploads/${paper.fileName}`
    };
    
    console.log('Paper URL:', paperWithUrl.url);
    res.json(paperWithUrl);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fix missing catch block in login route
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
    console.error('Login error:', error)
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

// Add a test endpoint to check if the server is responding
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

// Modify your /admin/papers endpoint to add more logging
app.get('/admin/papers', auth, async (req, res) => {
  try {
    console.log('Received request for /admin/papers');
    console.log('Auth header:', req.headers.authorization);
    
    // Check if DB file exists
    if (!fs.existsSync(DB_FILE)) {
      console.log('DB file not found');
      return res.json([]);
    }

    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    console.log('Found papers:', data.papers?.length || 0);
    
    res.json(data.papers || []);
  } catch (error) {
    console.error('Error in /admin/papers:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

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
  const testUrl = `${RAILWAY_DOMAIN}/uploads/test.pdf`
  res.json({
    testUrl,
    environment: {
      isRailway: Boolean(process.env.RAILWAY_STATIC_URL || process.env.RAILWAY_SERVICE_URL || process.env.PUBLIC_URL),
      NODE_ENV: process.env.NODE_ENV,
      DOMAIN: RAILWAY_DOMAIN,
      PROTOCOL: 'https'
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

// Add nuke endpoint BEFORE other routes
app.get('/nuke-database', function(req, res) {  // Remove async since we're not using it
  try {
    console.log('=== NUKING DATABASE ===')
    
    // Read current database
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    console.log('Found papers:', db.papers.length)
    
    // Strip everything except essential data
    const fixed = db.papers.map(paper => {
      // Keep only essential fields
      return {
        id: paper.id,
        title: paper.title,
        description: paper.description,
        category: paper.category,
        abstract: paper.abstract,
        author: paper.author,
        date: paper.date,
        status: paper.status,
        fileName: paper.fileName.split('/').pop().split('\\').pop()
      }
    })
    
    // Save clean data
    fs.writeFileSync(DB_FILE, JSON.stringify({ papers: fixed }, null, 2))
    console.log('Saved clean papers:', fixed.length)
    
    res.json({ 
      message: 'Database nuked and rebuilt',
      paperCount: fixed.length,
      sample: fixed[0]
    })
  } catch (error) {
    console.error('Nuclear launch failed:', error)
    res.status(500).json({ error: 'Failed to nuke database' })
  }
})

// At startup, verify volume
console.log('=== Volume Check ===')
console.log('Volume path:', process.env.RAILWAY_VOLUME_MOUNT_PATH)
console.log('Uploads directory:', uploadsDir)
console.log('Current directory contents:', fs.readdirSync('.'))
console.log('Volume directory contents:', fs.readdirSync(VOLUME_PATH))
console.log('Files in uploads:', fs.readdirSync(uploadsDir))

// Add this after your DB initialization
function fixDatabaseUrls() {
  try {
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    const fixed = db.papers.map(paper => ({
      ...paper,
      url: `${RAILWAY_DOMAIN}/uploads/${paper.fileName}`,
      fileUrl: paper.fileName
    }))
    fs.writeFileSync(DB_FILE, JSON.stringify({ papers: fixed }, null, 2))
    console.log('Fixed database URLs:', fixed.length, 'papers updated')
  } catch (error) {
    console.error('Failed to fix database URLs:', error)
  }
}

// Run this at startup
fixDatabaseUrls()

// Start the server (keep only this one at the end of the file)
server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// Add basic error handling
server.on('error', (error) => {
  console.error('Server error:', error)
})

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error)
})

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error)
})

// Add middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

// Health check routes
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' })
})

// 1. Employee submits access request
app.post('/auth/request-access', async (req, res) => {
  try {
    const { name, email, department, reason } = req.body
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    
    if (!db.accessRequests) {
      db.accessRequests = []
    }

    const request = {
      id: Date.now().toString(),
      name,
      email,
      department,
      reason,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    db.accessRequests.push(request)
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))
    res.json({ success: true })
  } catch (error) {
    console.error('Access request error:', error)
    res.status(500).json({ error: 'Failed to submit request' })
  }
})

// 2. Admin views requests
app.get('/admin/access-requests', auth, async (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    res.json(db.accessRequests || [])
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests' })
  }
})

// 3. Admin approves request and generates PIN
app.post('/admin/approve-request/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    
    const requestIndex = db.accessRequests.findIndex(r => r.id === id)
    if (requestIndex === -1) {
      return res.status(404).json({ error: 'Request not found' })
    }

    // Generate 6-digit PIN
    const pin = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Update request
    const updatedRequest = {
      ...db.accessRequests[requestIndex],
      status: 'approved',
      pin,
      approvedAt: new Date().toISOString()
    }
    
    db.accessRequests[requestIndex] = updatedRequest

    // Send email with PIN
    const msg = {
      to: updatedRequest.email,
      from: 'cashrhilinski@gmail.com',
      subject: 'Your Perrin Institution Access PIN',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Perrin Institution!</h2>
          <p>Hello ${updatedRequest.name},</p>
          <p>Your access request has been approved!</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; font-size: 16px;">Your PIN: <strong style="font-family: monospace; font-size: 20px;">${pin}</strong></p>
          </div>
          <p>You can now log in to the employee portal using this PIN.</p>
          <p>Best regards,<br>Perrin Institution Team</p>
        </div>
      `
    }

    await sgMail.send(msg)
    
    // Add this logging:
    console.log('Before save - Request:', updatedRequest)
    console.log('Before save - Full DB:', db)
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))
    console.log('After save - DB Content:', fs.readFileSync(DB_FILE, 'utf-8'))
    
    res.json(updatedRequest)
  } catch (error) {
    console.error('Error in approve request:', error)
    res.status(500).json({ error: 'Failed to approve request' })
  }
})

// 4. Employee logs in with PIN
app.post('/auth/verify-pin', async (req, res) => {
  try {
    const { pin } = req.body
    console.log('Attempting to verify PIN:', pin)
    
    // Test PINs
    if (pin === '000000') {
      console.log('Using test PIN')
      return res.json({ 
        token: 'test-token', 
        email: 'employee@perrin.org'
      })
    }

    // Read and parse DB
    const dbContent = fs.readFileSync(DB_FILE, 'utf-8')
    console.log('Raw DB Content:', dbContent)
    
    const db = JSON.parse(dbContent)
    
    // Check DB structure
    console.log('DB Structure:', {
      hasAccessRequests: !!db.accessRequests,
      requestsCount: db.accessRequests?.length || 0,
      dbKeys: Object.keys(db)
    })
    
    if (!db.accessRequests || !Array.isArray(db.accessRequests)) {
      console.log('No access requests array found in DB')
      return res.status(401).json({ error: 'Invalid PIN' })
    }

    // Log each request for debugging
    db.accessRequests.forEach((r, index) => {
      console.log(`Request ${index}:`, {
        id: r.id,
        email: r.email,
        status: r.status,
        pin: r.pin,
        wouldMatch: r.pin === pin
      })
    })

    const request = db.accessRequests.find(r => r.status === 'approved' && r.pin === pin)

    if (request) {
      console.log('Found matching request:', request)
      return res.json({ 
        token: 'test-token', 
        email: request.email 
      })
    }

    console.log('No matching PIN found')
    res.status(401).json({ error: 'Invalid PIN' })
  } catch (error) {
    console.error('PIN verification error:', error)
    console.error('Error stack:', error.stack)
    res.status(500).json({ error: 'Server error' })
  }
})