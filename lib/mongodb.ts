import { MongoClient, ServerApiVersion } from 'mongodb';

// Avoid throwing at module load so non-DB pages can render without crashing
const uri = process.env.MONGODB_URI;

let clientPromise: Promise<MongoClient>;

if (uri && uri.trim().length > 0) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });

  if (process.env.NODE_ENV === 'development') {
    // Cache in global to preserve across HMR reloads
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    clientPromise = client.connect();
  }
} else {
  // Lazily surface the configuration error only when DB is actually used
  clientPromise = Promise.reject(
    new Error('MONGODB_URI is not set in the environment')
  ) as Promise<MongoClient>;
}

export default clientPromise;