import mongoose from "mongoose";

type MongooseCache = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as unknown as { mongoose?: MongooseCache };
const cached: MongooseCache = globalForMongoose.mongoose ?? { conn: null, promise: null };
globalForMongoose.mongoose = cached;

export async function connectDB() {
    if (cached.conn) return cached.conn;

    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("Falta MONGODB_URI en .env.local");

    if (!cached.promise) {
        cached.promise = mongoose.connect(uri, { bufferCommands: false });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null; //
        throw error;
    }

    return cached.conn;
}