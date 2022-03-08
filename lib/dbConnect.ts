import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

export type MongoGlobal = {
  conn?: MongoClient;
  promise?: Promise<MongoClient>;
};

let cached: MongoGlobal = (global as any).mongo;
if (!cached) {
  cached = (global as any).mongo = {};
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const mongo = new MongoClient(MONGODB_URI!);
    cached.promise = mongo.connect().then(() => mongo);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect

export const dbCollection = async (db: string, collection: string) => {
  const mongo = await dbConnect();
  return mongo.db(db).collection(collection);
}
