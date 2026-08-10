import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer = null;

export const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aura_store';
    
    // Attempt connecting to the provided URI with short timeout
    try {
      const conn = await mongoose.connect(connStr, {
        serverSelectionTimeoutMS: 2500,
      });
      console.log(`[MongoDB] Connected to MongoDB host: ${conn.connection.host}`);
      return;
    } catch (err) {
      console.log(`[MongoDB] Local connection failed (${err.message}). Starting in-memory MongoMemoryServer fallback...`);
    }

    // Fallback to MongoMemoryServer
    mongoMemoryServer = await MongoMemoryServer.create();
    const uri = mongoMemoryServer.getUri();
    const conn = await mongoose.connect(uri);
    console.log(`[MongoDB] Memory Database running successfully at: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Error] ${error.message}`);
    process.exit(1);
  }
};
