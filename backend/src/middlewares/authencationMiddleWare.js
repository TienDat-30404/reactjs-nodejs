const jwt = require('jsonwebtoken')
const authencationMiddleWare = (req, res, next) => {
    // Kiểm tra sự tồn tại của tiêu đề Authorization
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({
            status: "Error",
            message: "No authorization header provided"
        });
    }

    // Tách token từ tiêu đề Authorization
    const token = authHeader.split(' ')[1];
    console.log(token)
    if (!token) {
        return res.status(401).json({
            status: "Error",
            message: "Token not provided"
        });
    }

    // Xác thực token
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
            console.log(err.message)
            return res.status(400).json({
                status: "Error",    
                message: "Authentication failed"
            });
        }

        // Kiểm tra vai trò của người dùng
        if (user.idRole === 0) {
            req.user = user; // Lưu thông tin người dùng vào req để sử dụng sau
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
module.exports = authencationMiddleWare