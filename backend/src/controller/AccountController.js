// const Account = require('../model/AccountModel');
// const User = require('../model/UserModel');
// const Role = require('../model/RoleModel')
// const { hashPassword } = require('../utils/validate')
// const otpGenerator = require('otp-generator');
// const nodemailer = require('nodemailer');
// const redisClient = require('../utils/redisClient');

// const { OAuth2Client } = require("google-auth-library");
// const errorHandler = require('http-errors')
// const { generateToken, generateRefreshToken } = require('../utils/jwt')

import Account from '../model/AccountModel.js';
import User from '../model/UserModel.js';
import Role from '../model/RoleModel.js';
import { hashPassword } from '../utils/validate.js';
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import redisClient from '../utils/redisClient.js';

import { OAuth2Client } from 'google-auth-library';
import errorHandler from 'http-errors';
// import { generateToken, generateRefreshToken } from '../utils/jwt.js';
import refreshTokenJWT from '../utils/jwt.js';
export default class AccountController {

    

    // [POST] : /sign-in
    static async sendOtpForCreateAccount(req, res, next) {
        try {
            // Tạo OTP
            const { email } = req.body;

            const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });

            // Lưu OTP và thông tin tạm thời vào Redis
            await redisClient.setEx(`otp:${email}`, 300, otp); // Lưu 5 phút
            // Gửi OTP qua email
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                port: 465,
                secure: true,
                logger: true,
                debug: true,
                secureConnection: false,
                auth: {
                    user: process.env.MAIL_SEND,
                    pass: process.env.PASSWORD_MAIL_SEND
                },
                tls: {
                    rejectUnauthorized: false  // Tắt kiểm tra chứng chỉ SSL
                }
            });
            await transporter.sendMail({
                from: process.env.MAIL_SEND,
                to: email,
                subject: 'Xác nhận OTP',
                text: `Mã OTP của bạn là: ${otp}`,
            });

            res.status(200).json({ message: 'OTP đã được gửi đến email của bạn', status: 200 });


        } catch (error) {
            next(error);
            console.log("error", error)
        }
    };


    static async verifyOtpForCreateAccount(req, res, next) {
        const { userName, name, email, password, typeLogin, idRole, otp } = req.body;
        const typeOfLogin = typeLogin ? "google" : 'normal'
        const role = await Role.findOne({ name: "Customer" })
        const roleDefault = idRole ? idRole : role._id
        const otpCorrect = await redisClient.get(`otp:${email}`)
        if (otp != otpCorrect) {
            return res.status(400).json({
                message: "Otp không hợp lệ",
                status: 400
            })
        }
        const account = new Account({
            userName,
            email,
            password: hashPassword(password),
            idRole: roleDefault,
            typeLogin: typeOfLogin
        });

        const savedAccount = await account.save();
        const user = new User({
            name,
            idAccount: savedAccount._id
        })
        await user.save();

        const accounts = await Account.findById(account._id).populate('idRole');
        let accountObject = accounts.toObject();
        if (accountObject.idRole) {
            accountObject.role = accountObject.idRole;
            delete accountObject.idRole;
        }

        const userData = await User.findOne({ idAccount: savedAccount._id })
        if (userData) {
            accountObject.userInformation = userData
        }
        res.status(200).json({ account: accountObject });
    }


    static async authLoginGoogle(req, res, next) {
        try {
            const { userName, email, typeLogin = "google", name, idRole } = req.body
            const role = await Role.findOne({ name: "Customer" })
            const roleDefault = idRole ? idRole : role._id
            const account = new Account({
                userName,
                email,
                typeLogin: typeLogin,
                idRole: roleDefault
            })

            const savedAccount = await account.save();
            const user = new User({
                name,
                idAccount: savedAccount._id
            })
            await user.save();
            const accounts = await Account.findById(account._id).populate('idRole');
            let accountObject = accounts.toObject();
            if (accountObject.idRole) {
                accountObject.role = accountObject.idRole;
                delete accountObject.idRole;
            }

            const userData = await User.findOne({ idAccount: savedAccount._id })
            if (userData) {
                accountObject.userInformation = userData
            }
            res.status(200).json({ account: accountObject });
        }
        catch (error) {
            console.error("Google token verification failed:", error);
            res.status(400).json({ success: false, error: error });
        }
    }



    // [POST] : /sign-in
    static async loginUser(req, res, next) {
        const { userName } = req.body
        const isCheckAccount = await Account.findOne({ userName })
        if (isCheckAccount == null) {
            return res.status(404).json({ message: "Tài khoản không tồn tại." });
        }
        const isCheckUser = await User.findOne({ idAccount: isCheckAccount._id })
        const avatar = isCheckUser.avatar
        const payloadToken = {
            idUser: isCheckUser._id,
            name: isCheckUser.name,
            userName: isCheckAccount.userName,
            email: isCheckAccount.email,
            typeLogin: isCheckAccount.typeLogin,
            address: isCheckUser.address,
            phone: isCheckUser.phone,
            sex: isCheckUser.sex,
            date_of_birth: isCheckUser.date_of_birth,
            idRole: isCheckAccount.idRole,
            idAccount: isCheckAccount._id,
            avatar
        };

        const accessToken = refreshTokenJWT.generateToken(payloadToken)
        const refreshToken = refreshTokenJWT.generateRefreshToken(payloadToken)
        // Lưu refresh token vào cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,   // Cookie chỉ có thể được truy cập bởi server, ko thể truy cập qua client(chẳng hạn Cookies.get('refreshToken'))
            Secure: true,  // Chỉ gửi cookie qua HTTPS (bật trong môi trường production)
            sameSite: 'strict', // Chỉ cho phép gửi cookie khi đến từ cùng một site (tăng cường bảo mật)
            maxAge: 24 * 60 * 60 * 1000 // Thời gian sống của cookie (1 ngày trong ví dụ này)
        });
        return res.status(200).json({
            token: accessToken,
            message: 'Đăng nhập thành công',
            avatar: avatar,
        })
    }

    static async changePassword(req, res, next) {
        try {
            const idAccount = req.params.idAccount
            console.log(idAccount)
            const { password } = req.body
            const newPassword = hashPassword(password)
            const response = await Account.updateOne({ _id: idAccount }, { $set: { password: newPassword } })
            if (response.modifiedCount > 0) {
                return res.status(200).json({
                    message: "Change Password Successful"
                })
            }

        }
        catch (error) {
            return res.status(500).json({ message: "Error when change password : ", error })
        }
    };
}

