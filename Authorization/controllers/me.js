require('dotenv').config({
    path: '/home/daniil/Projects-javascript/lambda-tasks/Authorization/.env',
});
const jwt = require('jsonwebtoken');
const getDB = require('../middleware/database').getDB;

exports.me = async (req, res) => {
    try {
        const db = getDB();
        const accessToken = req.headers.authorization.split(' ')[1];
        const counter = Number(req.url.split('')[3]);
        const findEmail = await db.collection('auth').findOne({ accessToken });
        const decodedEmail = jwt.verify(accessToken, process.env.TOKEN_REFRESH, {
            ignoreExpiration: true,
        });
        const tokenExp = new Date(decodedEmail.exp * 1000).toLocaleString();
        switch (true) {
            case findEmail.email === decodedEmail.decoded:
                return res.status(200).json({
                    email: decodedEmail.decoded,
                    req_num: counter,
                    token_expires: tokenExp,
                });
        }
    } catch (err) {
        if (err.message === 'invalid signature') {
            res.status(401).send('Token expired or not valid! Please refresh.');
        }
    }
};
