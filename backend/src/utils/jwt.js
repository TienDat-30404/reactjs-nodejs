const jwt = require('jsonwebtoken')
const generateToken = (id, name) => {
    return jwt.sign({ id, name}, process.env.JWT_SECRET, {
        expiresIn: '30s',
    });
};

const generateRefreshToken = (id, name) => {
    return jwt.sign({ id, name}, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '10s',
    });
};
module.exports = {generateToken, generateRefreshToken}