import { MongoClient, ServerApiVersion } from 'mongodb';

// Replace this with your MongoDB Atlas connection string
// Set this in your Netlify environment variables
const uri = process.env.MONGODB_URI || "";

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local or Netlify environment variables');
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 10000, // 10 seconds
  socketTimeoutMS: 45000, // 45 seconds
});

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = client.connect().catch(err => {
      console.error('MongoDB connection error in development:', err);
      throw err;
    });
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = client.connect().catch(err => {
    console.error('MongoDB connection error in production:', err);
    throw err;
  });
}

// Test the connection
clientPromise
  .then(() => {
    console.log('MongoDB connection successful');
  })
  .catch(err => {
    console.error('MongoDB connection test failed:', err);
  });

export default clientPromise; 