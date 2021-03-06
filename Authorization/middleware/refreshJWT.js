const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '../', '.env'),
});
const jwt = require('jsonwebtoken');
const REFRESH_TOKEN = process.env.TOKEN_REFRESH;

const refreshJWT = (token) => {
    const refreshToken = jwt.sign(token, REFRESH_TOKEN, {
        expiresIn: '2h',
    });
    return {
        refreshToken,
    };
};

module.exports = refreshJWT;
