const jwt = require('jsonwebtoken');
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '2d',
    });
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '30d',
    });
};

const refreshToken = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
            if (err) {
                return reject(err);
            }
            const accessToken = generateRefreshToken({
                id : user.id,
                name : user.name,
                idRole : user.idRole
            })
            resolve(accessToken)
        });
    });
}
module.exports = {generateToken, generateRefreshToken, refreshToken}