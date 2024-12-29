const User = require('../model/UserModel')
const Account = require('../model/AccountModel')
const Role = require('../model/RoleModel')
const cloudinary = require('../config/cloudinary');
const { generateToken, generateRefreshToken } = require('../utils/jwt')
const { hashPassword } = require('../utils/validate')
const refreshTokenJWT = require('../utils/jwt')
const { OAuth2Client } = require("google-auth-library");
const errorHandler = require('http-errors')


// [PUT] : /update-user/:id
const updateUser = async (req, res, next) => {
    try {
        const idUser = req.params.idUser
        const { name, email, address, phone, date_of_birth, sex, idRole } = req.body
        const user = await User.findOne({ _id: idUser })
        const newData = {
            name: name,
            email: email,
            address: address,
            phone: phone,
            date_of_birth: date_of_birth,
            sex: sex,
            avatar: user.avatar,
            idRole: idRole
        };
        if (req.file) {
            const fielAvatar = await cloudinary.uploader.upload(req.file.path);
            newData.avatar = fielAvatar.secure_url
        }
        await User.updateOne({ _id: idUser }, newData)
        return res.status(200).json({
            newData,
            message: "Update Successfully"
        })
    }
    catch (error) {
        next(error)
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const idUser = req.params.idUser
        const delUser = await User.deleteOne({ _id: idUser })
        if (delUser.deletedCount > 0) {
            return res.status(200).json({
                message: "Delete Successfully",
            })
        }
        else {
            return res.status(400).json({
                message: "Delete Fail",
            })
        }
        /* 
        - deleteMany : xóa nhiều trường dựa theo 1 điều kiện cụ thể( ở đây là các trường có id > 1)
            await User.deleteMany({id: {$gt: 1}})   
        -  Tìm nhiều tài liệu dựa trên điều kiện nhất định.
            await User.find({id : {$gt : 56}})
        - Tìm một tài liệu theo ID.(ở đây là _id trong database - là 1 chuỗi string)
            await User.findById(idUser)  Tìm một tài liệu theo ID.(ở đây là _id trong database - là 1 chuỗi string)
        - Tìm một tài liệu theo ID và xóa nó(tìm dựa vào _id trong db)
            await User.findByIdAndDelete(idUser)    
        - Tìm một tài liệu theo ID và cập nhật nó.(_id)
            await User.findByIdAndUpdate(idUser, {name : "123"}) 
        - Tìm một tài liệu dựa trên điều kiện nhất định.
            await User.findOne({id : idUser})  
        Tìm một tài liệu dựa trên điều kiện nhất định và xóa nó.(giống deleteOne nhưng khác nhau kiểu trả về)
            await User.findOneAndDelete({id : idUser})  
        - Tìm một tài liệu dựa trên điều kiện nhất định và thay thế nó bằng một tài liệu mới.(kết quả là trong các trường của id đấy đc thay thể
          và chỉ có 2 thuộc tính là name, password còn các thuộc tính còn lại sẽ bị xóa)
            await User.findOneAndReplace({id : idUser}, {name : "Jame", password : "1234567"})  
        - Tìm một tài liệu dựa trên điều kiện nhất định và cập nhật nó.
            await User.findOneAndUpdate({id : idUser}, {name : "Thomas"}, {new : true})
        - Thay thế một tài liệu dựa trên điều kiện nhất định.(giống findOneAndReplcae nhưng khác nhau kiểu trả về)
            await User.replaceOne({id : idUser}, {name : "123"}) 
        - Cập nhật nhiều tài liệu dựa trên điều kiện nhất định.
            await User.updateMany({id : {$lt : 62}}, {password : "11223344"})
        - Cập nhật một tài liệu dựa trên điều kiện nhất định.
            await User.updateOne({id : idUser}, {name : "Muller"})
        */
    }
    catch (error) {
        next(error)
    }
}



const detailUser = async (req, res, next) => {
    try {
        const detailUser = await User.findOne({ _id: req.params.idUser })
        if (detailUser == null) {
            return res.status(400).json({
                mesage: "Fail Detail User"
            })
        }
        return res.status(200).json({
            detailUser
        })
    }
    catch (error) {
        next(error)
    }
}

const refreshToken = async (req, res, next) => {
    try {
        const token = req.cookies.refreshToken
        if (!token) {
            return res.status(401)
        }
        const tokenNew = await refreshTokenJWT.refreshToken(token)
        return res.status(200).json({
            refreshToken : token,
            success: "Success",
            tokenNew
        })
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: "Token has expired" });
        } else {
            res.status(400).json({ message: "Error Refresh Token" });
        }
    }
}


const logoutRefreshToken = (req, res, next) => {
    try {
        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'Strict' });
        return res.status(200).json({
            message: "Success"
        })
    }
    catch (error) {
        next(error)
    }

}



const changePassword = async (req, res, next) => {
    try {
        const idUser = req.params.idUser
        const { password } = req.body
        const newPassword = hashPassword(password)
        await User.updateOne({ _id: idUser }, { $set: { password: newPassword } })
        return res.status(200).json({
            message: "Change Password Successful"
        })
    }
    catch (error) {
        next(error)
    }
};

const searchUser = async (req, res, next) => {
    const { idUser, name, email, phone, idRole } = req.query
    const searchParams = {}
    if (idUser) {
        searchParams.idUser = idUser
    }
    if (name) {
        searchParams.name = { $regex: name, $options: 'i' }; // 'i' để tìm không phân biệt chữ hoa chữ thường
    }
    if (email) {
        searchParams.email = { $regex: email };
    }
    if (phone) {
        searchParams.phone = { $regex: phone }
    }
    if (idRole) {
        searchParams.idRole = idRole
    }

    try {
        const users = await User.find(searchParams)
        return res.status(200).json({ users })
    }
    catch (error) {
        return res.status(400).json({ message: error.message })
    }
}



module.exports = {  updateUser, deleteUser, refreshToken, detailUser, logoutRefreshToken, changePassword, searchUser }