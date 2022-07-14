const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '../', '.env'),
});
const DB_URL = process.env.DB_URL;
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let db;

exports.database = mongoClient
    .connect(DB_URL)
    .then((client) => {
        console.log('Connected!');
        db = client.db('database1');
    })
    .catch((err) => {
        console.log(err);
    });

exports.getDB = () => {
    return db;
};
