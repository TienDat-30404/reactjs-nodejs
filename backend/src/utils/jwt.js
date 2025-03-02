import jwt from 'jsonwebtoken'
export default class refreshTokenJWT {

    static generateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '15m',
        });
    };
    
    static generateRefreshToken (payload) {
        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '30d',
        });
    };
    
    static generateAccessToken(payload)  {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '15m',
        });
    };
    
    static async refreshToken(token)  {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
                if (err) {
                    return reject(err);
                }
                
                const accessToken = refreshTokenJWT.generateAccessToken({
                    idUser : user.idUser,
                    name : user.name,
                    userName : user.userName,
                    email : user.email,
                    typeLogin : user.typeLogin,
                    address : user.address,
                    phone : user.phone,
                    sex : user.sex,
                    date_of_birth : user.date_of_birth,
                    idRole : user.idRole,
                    nameRole : user.nameRole,
                    idAccount : user.idAccount,
                    avatar : user.avatar
                })
                resolve(accessToken)
            });
        });
    }
}

