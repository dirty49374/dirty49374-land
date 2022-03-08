import { MongoClient } from "mongodb";

export type MongoGlobal = { conn: MongoClient, promise: Promise<MongoClient> };

declare var mongo: MongoGlobal;
