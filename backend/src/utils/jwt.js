const jwt = require('jsonwebtoken');
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '10s',
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
                idUser : user.idUser,
                name : user.name,
                email : user.email,
                password : user.password,
                idRole : user.idRole,
                sex : user.sex,
                address : user.address,
                phone : user.phone,
                date_of_birth : user.date_of_birth
            })
            resolve(accessToken)
        });
    });
}
module.exports = {generateToken, generateRefreshToken, refreshToken}