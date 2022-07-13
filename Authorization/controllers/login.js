require('dotenv').config({
    path: '/home/daniil/Projects-javascript/lambda-tasks/Authorization/.env',
});
const generateJWT = require('../middleware/createJWT');
const getDB = require('../middleware/database').getDB;

exports.login = async (req, res) => {
    try {
        const db = getDB();
        const email = req.query.email;
        const findUser = await db.collection('auth').findOne({ email });
        const { accessToken } = generateJWT({ email });
        switch (true) {
            case findUser.email === email:
                db.collection('auth').updateOne(findUser, { $set: { accessToken: accessToken } });
                res.status(201).send(accessToken);
            case findUser !== email:
                res.status(404).send('User not found! Please register.');
        }
    } catch (err) {
        console.log(err.message);
    }
};
