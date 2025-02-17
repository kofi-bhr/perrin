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

// Initialize SendGrid right after requiring it
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// First, declare all constants
const RAILWAY_DOMAIN = process.env.NODE_ENV === 'production' 
  ? (process.env.RAILWAY_PUBLIC_DOMAIN || 'perrin-production.up.railway.app')
  : 'http://localhost:3001'
const PORT = process.env.PORT || 3001  // Railway will provide PORT env variable

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
      const db = getDB()
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
    const db = getDB()
    const profile = db.profiles[userData.email] || null
    
    const newMessage = {
      user: userData.email,
      text: message,
      time: new Date().toISOString(),
      profile: profile
    }
    
    chatHistory.push(newMessage)
    const saved = saveDB({ 
      messages: chatHistory,
      users: Array.from(connectedUsers.values())
    })
    if (!saved) {
      throw new Error('Failed to save chat history')
    }
    
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
  destination: uploadsDir,  // This is /data/uploads
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

// Add this near the top with other initialization code
function initDB() {
  try {
    let db
    if (!fs.existsSync(DB_FILE)) {
      // Create new DB with default admin
      db = {
        papers: [],
        profiles: [],
        accessRequests: [],
        users: [{
          id: Date.now().toString(),
          name: 'Default Admin',
          email: 'employee@perrin.org',
          pin: '000000',
          role: 'admin',
          status: 'active',
          createdAt: new Date().toISOString()
        }]
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))
    } else {
      // Load existing DB
      const data = fs.readFileSync(DB_FILE, 'utf-8')
      db = JSON.parse(data)
      
      // Ensure all collections exist without overwriting
      db.users = db.users || [{
        id: Date.now().toString(),
        name: 'Default Admin',
        email: 'employee@perrin.org',
        pin: '000000',
        role: 'admin',
        status: 'active',
        createdAt: new Date().toISOString()
      }]
      db.profiles = db.profiles || []
      db.papers = db.papers || []
      db.accessRequests = db.accessRequests || []
      
      // Save back with any missing collections added
      fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))
    }
    return db
  } catch (error) {
    console.error('Error initializing DB:', error)
    throw error
  }
}

// Update getDB function to use initDB
function getDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      return initDB()
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading DB:', error)
    return initDB() // Try to reinitialize if read fails
  }
}

// Call initDB when server starts
initDB()

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
      url: `${RAILWAY_DOMAIN}/uploads/${req.file.filename}`
    }

    const db = getDB()
    db.papers.push(paper)
    const saved = saveDB(db)
    if (!saved) {
      throw new Error('Failed to save paper')
    }

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
    // Accept either test-token or any token that matches the format
    if (token === 'test-token' || token === 'user-token') {
      next()
    } else {
      console.log('Auth failed:', { token })
      res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (error) {
    console.error('Auth error:', error)
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
    const db = getDB()
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
    
    const db = getDB();
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
    const db = getDB()
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
    const saved = saveDB(db)
    if (!saved) {
      throw new Error('Failed to save paper')
    }
    
    res.json(updatedPaper)
  } catch (error) {
    console.error('Error updating paper:', error)
    res.status(500).json({ error: 'Server error' })
  }
})

app.get('/debug', function(req, res) {
  try {
    const db = getDB()
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

    const data = getDB();
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
    const db = getDB()
    const fixedPapers = db.papers.map(paper => {
      // Extract filename from any URL format
      const fileName = paper.url?.split('/').pop() || paper.fileName || paper.fileUrl
      return {
        ...paper,
        fileUrl: fileName,
        fileName: fileName
      }
    })
    
    const saved = saveDB({ papers: fixedPapers })
    if (!saved) {
      throw new Error('Failed to fix papers')
    }
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
    const db = getDB()
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
    const saved = saveDB({ papers: fixed })
    if (!saved) {
      throw new Error('Failed to save clean data')
    }
    
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
console.log({
  volumePath: process.env.RAILWAY_VOLUME_MOUNT_PATH,
  dataDir,
  uploadsDir,
  dbFile: DB_FILE,
  volumeExists: fs.existsSync(VOLUME_PATH),
  dataDirExists: fs.existsSync(dataDir),
  dbFileExists: fs.existsSync(DB_FILE)
})

// Add this after your DB initialization
function fixDatabaseUrls() {
  try {
    const db = getDB()
    const fixed = db.papers.map(paper => ({
      ...paper,
      url: `${RAILWAY_DOMAIN}/uploads/${paper.fileName}`,
      fileUrl: paper.fileName
    }))
    const saved = saveDB({ papers: fixed })
    if (!saved) {
      throw new Error('Failed to fix database URLs')
    }
    console.log('Fixed database URLs:', fixed.length, 'papers updated')
  } catch (error) {
    console.error('Failed to fix database URLs:', error)
  }
}

// Run this at startup
fixDatabaseUrls()

// Make sure to use server.listen instead of app.listen
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Railway URL: ${RAILWAY_DOMAIN}`)
})

// Add a force-fix endpoint
app.get('/force-fix', function(req, res) {
  try {
    const db = getDB()
    const fixed = db.papers.map(paper => ({
      ...paper,
      url: `${RAILWAY_DOMAIN}/uploads/${paper.fileName}`,
      fileUrl: paper.fileName
    }))
    const saved = saveDB({ papers: fixed })
    if (!saved) {
      throw new Error('Failed to force fix')
    }
    res.json({ message: 'All papers forced to Railway URLs', count: fixed.length })
  } catch (error) {
    res.status(500).json({ error: 'Failed to force fix' })
  }
})

app.get('/test-paper/:id', function(req, res) {
  try {
    const { id } = req.params;
    const db = getDB();
    const paper = db.papers.find(p => p.id === id);
    
    res.json({
      original: paper,
      withUrl: {
        ...paper,
        url: `${RAILWAY_DOMAIN}/uploads/${paper.fileName}`
      },
      debug: {
        RAILWAY_DOMAIN,
        fileName: paper.fileName,
        constructedUrl: `${RAILWAY_DOMAIN}/uploads/${paper.fileName}`
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
})

// Add this with your other routes (near GET /papers and PATCH /papers/:id)
app.delete('/papers/:id', auth, async function(req, res) {
  try {
    const { id } = req.params
    console.log('Delete request for paper:', id)
    
    const db = getDB()
    const paperIndex = db.papers.findIndex(p => p.id === id)
    
    if (paperIndex === -1) {
      console.log('Paper not found:', id)
      return res.status(404).json({ error: 'Paper not found' })
    }

    const paper = db.papers[paperIndex]
    console.log('Found paper:', paper)

    // Remove from database
    db.papers.splice(paperIndex, 1)
    const saved = saveDB(db)
    if (!saved) {
      throw new Error('Failed to delete paper')
    }

    // Try to delete file
    if (paper.fileName) {
      const filePath = path.join(uploadsDir, paper.fileName)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }

    res.json({ success: true, message: 'Paper deleted' })
  } catch (error) {
    console.error('Delete error:', error)
    res.status(500).json({ error: 'Failed to delete paper' })
  }
})

// Add comprehensive health check
app.get('/health', (req, res) => {
  try {
    // Check if directories exist
    const dirs = {
      dataDir: fs.existsSync(dataDir),
      uploadsDir: fs.existsSync(uploadsDir),
      dbFile: fs.existsSync(DB_FILE)
    }

    // Check if we can write to directories
    try {
      fs.accessSync(dataDir, fs.constants.W_OK)
      fs.accessSync(uploadsDir, fs.constants.W_OK)
      dirs.writeable = true
    } catch (e) {
      dirs.writeable = false
    }

    res.json({
      status: 'ok',
      time: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        RAILWAY_DOMAIN,
        VOLUME_PATH
      },
      directories: dirs,
      headers: req.headers
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: error.message,
      stack: error.stack
    })
  }
})

// Update the profile endpoint to handle updates correctly
app.patch('/profile', auth, async (req, res) => {
  try {
    const { email, ...profileData } = req.body
    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    console.log('Updating profile for:', email)
    console.log('Profile data:', profileData)

    const db = getDB()
    
    // Initialize arrays if they don't exist
    if (!db.profiles) db.profiles = []
    
    // Find existing profile or create new one
    let profileIndex = db.profiles.findIndex(p => p.email === email)
    if (profileIndex === -1) {
      // Create new profile
      const newProfile = {
        id: Date.now().toString(),
        email,
        ...profileData,
        expertise: profileData.expertise || [],
        education: profileData.education || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      db.profiles.push(newProfile)
    } else {
      // Update existing profile
      db.profiles[profileIndex] = {
        ...db.profiles[profileIndex],
        ...profileData,
        updatedAt: new Date().toISOString()
      }
    }

    // Save to database
    const saved = saveDB(db)
    if (!saved) {
      throw new Error('Failed to save profile')
    }

    // Return the updated profile
    const updatedProfile = db.profiles.find(p => p.email === email)
    console.log('Updated profile:', updatedProfile)
    res.json(updatedProfile)
  } catch (error) {
    console.error('Error updating profile:', error)
    res.status(500).json({ error: 'Failed to update profile' })
  }
})

// Update the get profile endpoint
app.get('/profile', auth, async (req, res) => {
  try {
    const email = req.query.email
    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const db = getDB()
    
    // Initialize if doesn't exist
    if (!db.profiles) db.profiles = []
    
    // Find existing profile or return default
    let profile = db.profiles.find(p => p.email === email)
    if (!profile) {
      profile = {
        id: Date.now().toString(),
        email,
        name: '',
        phone: '',
        bio: '',
        expertise: [],
        education: [],
        image: null,
        createdAt: new Date().toISOString()
      }
      // Add to database
      db.profiles.push(profile)
      saveDB(db)
    }
    
    res.json(profile)
  } catch (error) {
    console.error('Error fetching profile:', error)
    res.status(500).json({ error: 'Failed to fetch profile' })
  }
})

// Add these helper functions near the top
function generatePin() {
  return Math.floor(100000 + Math.random() * 900000).toString() // 6-digit PIN
}

function isDirectoryWritable(dir) {
  try {
    fs.accessSync(dir, fs.constants.W_OK)
    return true
  } catch {
    return false
  }
}

function saveDB(db) {
  try {
    console.log('=== Saving DB ===')
    console.log({
      dbFile: DB_FILE,
      volumePath: process.env.RAILWAY_VOLUME_MOUNT_PATH,
      dataDirExists: fs.existsSync(dataDir),
      dbFileExists: fs.existsSync(DB_FILE),
      profiles: db.profiles?.length || 0,
      users: db.users?.length || 0,
      papers: db.papers?.length || 0,
      accessRequests: db.accessRequests?.length || 0
    })
    
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2))
    
    // Verify save
    const savedData = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'))
    console.log('=== Save Verification ===')
    console.log({
      profilesSaved: savedData.profiles?.length || 0,
      usersSaved: savedData.users?.length || 0,
      papersSaved: savedData.papers?.length || 0,
      requestsSaved: savedData.accessRequests?.length || 0
    })
    
    return true
  } catch (error) {
    console.error('Error saving DB:', error, {
      path: DB_FILE,
      exists: fs.existsSync(dataDir),
      writable: isDirectoryWritable(dataDir),
      error: error.message,
      stack: error.stack
    })
    return false
  }
}

// Add these endpoints
app.post('/auth/request-access', async (req, res) => {
  try {
    const { name, email, department, reason } = req.body
    console.log('Access request:', { name, email, department, reason })

    const db = getDB()
    
    // Initialize if doesn't exist
    if (!db.accessRequests) {
      db.accessRequests = []
    }
    
    // Check if request already exists
    const existingRequest = db.accessRequests.find(r => r.email === email)
    if (existingRequest) {
      return res.json({
        status: existingRequest.status,
        pin: existingRequest.status === 'approved' ? existingRequest.pin : undefined
      })
    }

    // Create new request
    const newRequest = {
      id: Date.now().toString(),
      name,
      email,
      department,
      reason,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    db.accessRequests.push(newRequest)
    
    const saved = saveDB(db)
    if (!saved) {
      throw new Error('Failed to save request')
    }

    console.log('Access request saved:', newRequest)
    res.json({ status: 'pending' })
  } catch (error) {
    console.error('Request access error:', error)
    res.status(500).json({ error: String(error) })
  }
})

app.get('/auth/request-status', async (req, res) => {
  try {
    const { email } = req.query
    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const db = getDB()
    
    const request = db.accessRequests?.find(r => r.email === email)
    if (!request) {
      return res.status(404).json({ error: 'Request not found' })
    }

    res.json({
      status: request.status,
      pin: request.status === 'approved' ? request.pin : undefined
    })
  } catch (error) {
    console.error('Check request error:', error)
    res.status(500).json({ error: String(error) })
  }
})

app.post('/auth/verify-pin', async (req, res) => {
  try {
    const { pin } = req.body
    const db = getDB()

    // Find user with this PIN in array
    const user = db.users?.find(u => u.pin === pin)
    if (!user) {
      return res.status(401).json({ error: 'Invalid PIN' })
    }

    // Find existing profile or create new one
    let profile = db.profiles?.find(p => p.email === user.email)
    if (!profile) {
      profile = {
        id: Date.now().toString(),
        email: user.email,
        name: user.name,
        phone: '',
        bio: '',
        expertise: [],
        education: [],
        image: null,
        createdAt: new Date().toISOString()
      }
      db.profiles.push(profile)
      saveDB(db)
    }

    res.json({
      token: 'user-token',
      email: user.email,
      role: user.role
    })
  } catch (error) {
    console.error('Error verifying PIN:', error)
    res.status(500).json({ error: 'Failed to verify PIN' })
  }
})

app.get('/admin/access-requests', auth, async (req, res) => {
  try {
    const db = getDB()
    
    // Initialize if doesn't exist
    if (!db.accessRequests) {
      db.accessRequests = []
    }

    // Sort by date, newest first
    const sortedRequests = db.accessRequests.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    res.json(sortedRequests)
  } catch (error) {
    console.error('Error fetching access requests:', error)
    res.status(500).json({ error: 'Failed to fetch access requests' })
  }
})

app.post('/admin/approve-request/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const db = getDB()
    
    const request = db.accessRequests?.find(r => r.id === id)
    if (!request) {
      return res.status(404).json({ error: 'Request not found' })
    }

    // Generate PIN
    const pin = generatePin()
    
    // Update request
    request.status = 'approved'
    request.pin = pin

    // Create user object similar to how papers are stored
    const user = {
      id: Date.now().toString(),
      name: request.name,
      email: request.email,
      pin,
      role: 'user',
      department: request.department,
      status: 'active',
      createdAt: new Date().toISOString()
    }
    
    // Store in array like papers (instead of object)
    if (!db.users) db.users = []
    db.users.push(user)

    // Initialize empty profile
    if (!db.profiles) db.profiles = []
    db.profiles.push({
      id: Date.now().toString(),
      email: request.email,
      name: '',
      phone: '',
      bio: '',
      expertise: [],
      education: [],
      image: null,
      createdAt: new Date().toISOString()
    })

    saveDB(db)

    // Send email...
    // ... rest of email sending code ...

    res.json(request)
  } catch (error) {
    console.error('Approve request error:', error)
    res.status(500).json({ error: String(error) })
  }
})

// Add a test endpoint
app.get('/test-email', async (req, res) => {
  try {
    await sgMail.send({
      to: 'test@example.com',
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Test Email',
      text: 'This is a test email',
      html: '<h1>This is a test email</h1>'
    })
    res.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    res.status(500).json({ error: String(error) })
  }
})

// Add this endpoint to handle profile updates
app.post('/profile/update', auth, async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const db = getDB()
    
    // Initialize profiles if doesn't exist
    if (!db.profiles) db.profiles = {}
    
    // Update profile
    db.profiles[email] = {
      ...db.profiles[email], // Keep existing data
      ...req.body, // Update with new data
      // Ensure arrays exist
      expertise: Array.isArray(req.body.expertise) ? req.body.expertise : [],
      education: Array.isArray(req.body.education) ? req.body.education : [],
      updatedAt: new Date().toISOString()
    }

    const saved = saveDB(db)
    if (!saved) {
      throw new Error('Failed to save profile')
    }

    console.log('Profile updated:', db.profiles[email])
    res.json(db.profiles[email])
  } catch (error) {
    console.error('Error updating profile:', error)
    res.status(500).json({ error: 'Failed to update profile' })
  }
})

// Add this endpoint to get profile
app.get('/profile/:email', auth, async (req, res) => {
  try {
    const { email } = req.params
    const db = getDB()
    
    // Initialize profiles if doesn't exist
    if (!db.profiles) db.profiles = {}
    
    // Get or create profile
    let profile = {
      id: Date.now().toString(),
      email: email,
      name: '',
      phone: '',
      bio: '',
      expertise: [],
      education: [],
      image: null,
      createdAt: new Date().toISOString()
    }
    
    res.json(profile)
  } catch (error) {
    console.error('Error fetching profile:', error)
    res.status(500).json({ error: 'Failed to fetch profile' })
  }
})

// Add this near the top of your file
app.use((req, res, next) => {
  console.log('Request:', {
    method: req.method,
    path: req.path,
    headers: req.headers,
    body: req.body
  })
  next()
})