// const jwt = require('jsonwebtoken')
// const refreshTokenJWT = require('../utils/jwt')

import jwt from 'jsonwebtoken';
import refreshTokenJWT from '../utils/jwt.js';
import { getRolePermissions } from '../utils/rolePermission.js';
const authencationMiddleWare = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({
            status: "Error",
            message: "No authorization header provided"
        });
    }

    const token = authHeader.split(' ')[1];
    console.log(token)
    if (!token) {
        return res.status(401).json({
            status: "Error",
            message: "Token not provided"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log(err.message)
            return res.status(400).json({
                status: "Error",
                message: "Authentication failed"
            });
        }

        next()
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
                try {
                    const newAccessToken = await refreshTokenJWT.refreshToken(refreshToken);
                    decoded = jwt.verify(newAccessToken, process.env.JWT_SECRET);
                    res.setHeader('Authorization', `Bearer ${newAccessToken}`);
                }
                catch (err) {
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

const checkPermissionRoleMiddleware = (requiredAction) => {
    return async (req, res, next) => {
        const authHeader = req.headers['authorization']
        const accessToken = authHeader && authHeader.split(' ')[1]
        console.log("accessToken", accessToken)
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
        const idRole = decoded.idRole
        console.log("idRole", idRole)

        if (!idRole) {
            return res.status(403).json({
                status: "Error",
                message: "User role not found"
            });
        }

        const permissions = await getRolePermissions(idRole);

        if (!permissions[requiredAction]) {
            return res.status(403).json({
                status: "Error",
                message: "You do not have permission to perform this action"
            });
        }

        next();
    }
}


const isCheckRole = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const accessToken = authHeader && authHeader.split(' ')[1]
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
    const idRole = decoded.idRole
    const role = await Role.findOne({_id : idRole})
    const nameRole = role?.name 
    if (nameRole === "Customer") {
        return res.status(403).json({
            status: "Error",
            message: "Unauthorization"
        });
    }
    next()

}

export { authencationMiddleWare, authenticateToken, checkPermissionRoleMiddleware, isCheckRole }