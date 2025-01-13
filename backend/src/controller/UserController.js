// const User = require('../model/UserModel')
// const cloudinary = require('../config/cloudinary');
// const refreshTokenJWT = require('../utils/jwt')
// const mongoose = require('mongoose')


import User from '../model/UserModel.js';
import cloudinary from '../config/cloudinary.js';
import mongoose from 'mongoose';
import refreshTokenJWT from '../utils/jwt.js';
// [PUT] : /update-user/:id

export default class UserController {

    static async updateUser(req, res, next) {
        try {
            const idUser = req.params.idUser
            if (!mongoose.Types.ObjectId.isValid(idUser)) {
                return res.status(400).json({ message: "Invalid User ID" });
            }
            const { name, address, phone, date_of_birth, sex } = req.body
            const user = await User.findOne({ _id: idUser })

            const newData = {
                name: name,
                address: address,
                phone: phone,
                date_of_birth: date_of_birth,
                sex: sex,
                avatar: user.avatar,
            };

            if (req.file) {
                console.log("confid", cloudinary.config())
                
                const fielAvatar = await cloudinary.uploader.upload(req.file.path);
                newData.avatar = fielAvatar.secure_url
                console.log("123")
            }
            const dataUpdate = await User.findByIdAndUpdate(idUser, newData, {
                new: true,
                runValidators: true,
            })
            return res.status(200).json({
                message: "Update Successfully",
                newData,
                dataUpdate,
                status: 200
            })
        }
        catch (error) {
            next(error)
        }
    };

    static async deleteUser(req, res, next)  {
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
        }
        catch (error) {
            next(error)
        }
    }



    static async detailUser(req, res, next)  {
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

    static async refreshToken(req, res, next)  {
        try {
            const token = req.cookies.refreshToken
            if (!token) {
                return res.status(401)
            }
            const tokenNew = await refreshTokenJWT.refreshToken(token)
            return res.status(200).json({
                refreshToken: token,
                success: "Success",
                tokenNew
            })
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                res.status(401).json({ message: "Token has expired" });
            } else {
                res.status(500).json({ message: `Error Refresh Token : ${error}`})
            }
        }
    }


    static async logoutRefreshToken (req, res, next)  {
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





    static async searchUser(req, res, next)  {
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

}


// export { updateUser, deleteUser, refreshToken, detailUser, logoutRefreshToken, searchUser }