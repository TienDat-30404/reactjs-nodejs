const jwt = require('jsonwebtoken')
const refreshTokenJWT = require('../utils/jwt')

const authencationMiddleWare = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({
            status: "Error",
            message: "No authorization header provided"
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            status: "Error",
            message: "Token not provided"
        });
    }

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
            console.log(err.message)
            return res.status(400).json({
                status: "Error",    
                message: "Authentication failed"
            });
        }

        if (user.idRole === 0) {
            req.user = user; 
            next();
        } else if (user.idRole === 1) {
            return res.status(403).json({
                message: "You do not have permission to delete"
            });
        } else {
            return res.status(403).json({
                message: "Unauthorized role"
            });
        }
    });
};


const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        let accessToken = authHeader && authHeader.split(' ')[1];
        let decoded;
        try {
            decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
            
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                const refreshToken = req.cookies.refreshToken;
                if (!refreshToken) {
                    return res.status(403).json({ message: 'Refresh token not found' });
                }
                try 
                {
                    const newAccessToken = await refreshTokenJWT.refreshToken(refreshToken);
                    decoded = jwt.verify(newAccessToken, process.env.JWT_SECRET);
                    res.setHeader('Authorization', `Bearer ${newAccessToken}`);
                }
                catch(err)
                {
                    return res.status(403).json({ message: 'Invalid refresh token' });

                }
            } else {
                return res.status(403).json({ message: 'Invalid access token' });
            }
        }
        req.user = decoded;
        next();
    } catch (err) {
        next(err); 
    }
};

module.exports = {authencationMiddleWare, authenticateToken}