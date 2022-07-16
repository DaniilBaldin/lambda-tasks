import path from 'path';
require('dotenv').config({
    path: path.join(__dirname, '../', '../', '.env'),
});
const DB_URL: any = process.env.DB_URL;
import * as mongodb from 'mongodb';

export const collections: { jsonCollection?: mongodb.Collection } = {};

export async function connectToDatabase() {
    const client: mongodb.MongoClient = new mongodb.MongoClient(DB_URL);
    await client.connect();
    const db: mongodb.Db = client.db('database2');
    const jsonCollection: mongodb.Collection = db.collection('jsondata');
    collections.jsonCollection = jsonCollection;
    console.log('Successfully connected to database!');
}
