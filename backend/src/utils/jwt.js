const jwt = require('jsonwebtoken')
const generateToken = (id, name) => {
    return jwt.sign({ id, name}, process.env.JWT_SECRET, {
        expiresIn: '1p',
    });
};

const refreshToken = (id, name) => {
    return jwt.sign({ id, name}, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '10p',
    });
};
module.exports = {generateToken, refreshToken}