const jwt = require('jsonwebtoken')
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '10s',
    });
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '10s',
    });
};
module.exports = {generateToken, generateRefreshToken}