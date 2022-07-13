require('dotenv').config({
    path: '/home/daniil/Projects-javascript/lambda-tasks/Authorization/.env',
});
const getDB = require('../middleware/database').getDB;

exports.signUp = async (req, res) => {
    try {
        const db = getDB();
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send('Email and password required!');
        }
        const oldUser = await db.collection('auth').findOne({ email });
        if (oldUser) {
            return res.status(409).send('User already exists! Please login.');
        }
        await db.collection('auth').insertOne({ email, password });
        res.send('User created!');
    } catch (err) {
        console.log(err.message);
    }
};
