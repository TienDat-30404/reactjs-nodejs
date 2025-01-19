// const User = require('../model/UserModel')
// const cloudinary = require('../config/cloudinary');
// const refreshTokenJWT = require('../utils/jwt')
// const mongoose = require('mongoose')


import User from '../model/UserModel.js';
import cloudinary from '../config/cloudinary.js';
import mongoose from 'mongoose';
import refreshTokenJWT from '../utils/jwt.js';
import Account from '../model/AccountModel.js';
import { userInfo } from 'os';
// [PUT] : /update-user/:id

export default class UserController {


    static async getAllUser(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1
            const limit = parseInt(req.query.limit) || 5
            const startPage = (page - 1) * limit
            const objectFilter = { deletedAt: null }
            if (req.query.idUser) {
                if (mongoose.Types.ObjectId.isValid(req.query.idUser)) {
                    objectFilter._id = req.query.idUser
                }
                else {
                    return res.status(200).json({
                        page: '',
                        totalPage: '',
                        limit: '',
                        totalUser: '',
                        users: [],
                        status: 200
                    })
                }
            }
            if (req.query.name) {
                objectFilter.name = req.query.name
            }

            if (req.query.phone) {
                objectFilter.phone = { $regex: req.query.phone, $options: 'i' }
            }
            const emailFilter = req.query.email ? { email: { $regex: req.query.email, $options: 'i' } } : {};

            let users = await User.find(objectFilter)
                .skip(startPage)
                .limit(limit)
                .populate({
                    path: 'idAccount',
                    match: emailFilter,
                    populate: {
                        path: 'idRole',
                        model: 'Role'
                    }
                })
                .lean()
            if (req.query.email) {
                users = users.filter(user => user.idAccount)
            }
            const totalUser = req.query.email 
                ? users.length 
                : await User.countDocuments(objectFilter);
            // const totalUser = await User.countDocuments(objectFilter)
            const totalPage = Math.ceil(totalUser / limit);
            users = users.map(user => {
                if (user?.idAccount) {
                    user.account = user.idAccount;
                    delete user.idAccount;
                }
                if (user?.account) {
                    user.account.role = user.account.idRole
                    delete user.account.idRole
                }

                return user;
            });
            return res.status(200).json({
                page,
                totalPage,
                limit,
                totalUser,
                users,
                status: 200
            })
        }
        catch (err) {
            next(err)
        }
    }


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
                const fielAvatar = await cloudinary.uploader.upload(req.file.path);
                newData.avatar = fielAvatar.secure_url
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

    static async deleteUser(req, res, next) {
        try {
            const idUser = req.params.idUser
            const user = await User.findOne({ _id: idUser })
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const [deleteUser, deleteAccount] = await Promise.all([
                User.updateOne({ _id: idUser }, { deletedAt: Date.now() }),
                Account.updateOne({ _id: user.idAccount }, { deletedAt: Date.now() })
            ])
            console.log("deleteUser", deleteUser)
            console.log("deleteAccount", deleteAccount)
            if (deleteUser.modifiedCount > 0 && deleteAccount.modifiedCount > 0) {
                return res.status(200).json({
                    message: "Delete Successfully",
                    status: 200
                })
            }
            else {
                return res.status(400).json({
                    message: "Delete User fail",
                    status: 400
                })
            }
        }
        catch (error) {
            return res.status(500).json({ message: `Fail when delete user : ${error}` })
        }
    }



    static async detailUser(req, res, next) {
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

    static async refreshToken(req, res, next) {
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
                res.status(500).json({ message: `Error Refresh Token : ${error}` })
            }
        }
    }


    static async logoutRefreshToken(req, res, next) {
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

    static async addUser(req, res, next) {
        const { userName, email, password, role, name, phone } = req.body
        try {
            var account = new Account({
                userName,
                email,
                password,
                idRole: role,
                typeLogin: "normal"
            })
            const savedAccount = await account.save()
            const user = new User({
                name,
                phone,
                idAccount: savedAccount._id
            })
            const savedUser = await user.save()
            let userInformation = await User.findOne({ _id: savedUser._id })
                .populate({
                    path: 'idAccount',
                    populate: {
                        path: 'idRole',
                        model: 'Role'
                    }
                }).lean()
            if (userInformation?.idAccount) {
                userInformation.idAccount.role = userInformation.idAccount.idRole
                userInformation.account = userInformation.idAccount
                delete userInformation.idAccount.idRole
                delete userInformation.idAccount
            }
            return res.status(201).json({
                userInformation,
                status: 201
            })
        }
        catch (err) {
            return res.status(500).json({ message: `Fail when add account : ${err}` })
        }

    }



    static async searchUser(req, res, next) {
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