require('dotenv').config({
    path: '/home/daniil/Projects-javascript/lambda-tasks/Authorization/.env',
});
const jwt = require('jsonwebtoken');
const refreshJWT = require('../middleware/refreshJWT');
const getDB = require('../middleware/database').getDB;

exports.refresh = async (req, res) => {
    try {
        const db = getDB();
        const accessToken = req.headers.authorization.split(' ')[1];
        const findUser = await db.collection('auth').findOne({ accessToken });
        const decoded = jwt.verify(accessToken, process.env.TOKEN_KEY, {
            ignoreExpiration: true,
        }).email;
        const { refreshToken } = refreshJWT({ decoded });
        switch (true) {
            case findUser.accessToken === accessToken:
                db.collection('auth').updateOne(findUser, { $set: { accessToken: refreshToken } });
                res.status(201).send(refreshToken);
            case findUser.accessToken !== accessToken:
                res.status(404).send('Invalid token!');
        }
    } catch (err) {
        console.log(err.message);
    }
};
