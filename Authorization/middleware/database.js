const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

let db;

exports.database = mongoClient
    .connect('mongodb+srv://DanielBaldin:rw8Q1JAzBITWwVKo@cluster0.b4q08.mongodb.net/?retryWrites=true&w=majority')
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
