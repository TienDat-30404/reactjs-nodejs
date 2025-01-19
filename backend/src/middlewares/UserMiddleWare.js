// const { validateEmail } = require('../utils/validate')
// const User = require('../model/UserModel')
// const Account = require('../model/AccountModel')
// const bcrypt = require('bcrypt')
// const { generateToken, generateRefreshToken } = require('../utils/jwt')

import { validateEmail } from '../utils/validate.js';
import User from '../model/UserModel.js';
import Account from '../model/AccountModel.js';
import bcrypt from 'bcrypt';

// validate for sign in
const validateSignIn = async (req, res, next) => {
    try {
        const { userName, name, email, password, confirm_password, idRole } = req.body
        const errors = {};
        const existEmail = await Account.countDocuments({ email, deletedAt: null, typeLogin: "normal" })
        console.log(existEmail)
        const existUserName = await Account.countDocuments({ userName, deletedAt: null })
        if (userName == "") {
            errors.userName = "Tên tài khoản không được để trống";
        }
        if (existUserName > 0) {
            errors.userName = "Tên tài khoản đã tồn tại";
        }
        if (name == "") {
            errors.name = "Tên người dùng không được để trống"
        }


        if (email == "") {
            errors.email = "Email không được để trống"
        }
        else if (!validateEmail(email) && email != "") {
            errors.email = "Email không hợp lệ";
        }
        else if (existEmail > 0) {
            errors.email = "Email đã tồn tại";
        }
        if (password == "") {
            errors.password = "Mật khẩu không được để trống"
        }
        else if (password.length < 6 && password != "") {
            errors.password = "Mật khẩu tối thiểu 6 kí tự";
        }
        if (confirm_password == "") {
            errors.confirm_password = "Xác nhận mật khẩu không được để trống"
        }
        else if (password !== confirm_password) {
            errors.confirm_password = "Mật khẩu không trùng khớp";
        }
        if (idRole == -1) {
            errors.idRole = "Vui lòng chọn loại tài khoản"
        }
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }
        next()
    }
    catch (error) {
        next(error)
    }
}

// validate for login
const validateLogin = async (req, res, next) => {
    const { userName, password } = req.body
    const isCheckAccount = await Account.findOne({ userName })
    console.log(isCheckAccount)
    const errors = {}

    if (password == "") {
        errors.password = "Mật khẩu không được để trống"
    }

    if (isCheckAccount == null) {
        errors.userName = "Tên tài khoản không chính xác"
    }
    else {
        const regexHashPassword = /^\$2[ayb]\$[0-9]{2}\$.{53}$/;
        if (!regexHashPassword.test(password)) {
            const comparePassword = bcrypt.compareSync(password, isCheckAccount.password);
            if (!comparePassword) {
                errors.password = "Mật khẩu không chính xác"
            }
        }
    }
    if (userName == "") {
        errors.userName = "Vui lòng nhập tên tài khoản"
    }
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors })
    }
    console.log(errors)
    next()
}

// validate update user
const updateUserMiddleware = async (req, res, next) => {
    try {
        const { name, address, phone, date_of_birth } = req.body
        const phoneRegex = /^09\d{8,9}$/;
        const errors = {}

        if (name == "") {
            errors.name = "Tên không được để trống"
        }
        if (address == "") {
            errors.address = "Địa chỉ không được để trống"
        }
        if (date_of_birth) {
            const today = new Date();
            const birthDate = new Date(date_of_birth);
            if (birthDate > today) {
                errors.date_of_birth = "Ngày sinh không được vượt quá ngày hiện tại";
            }
        }
        if (phone == "") {
            errors.phone = "Số điện thoại không được để trống"
        }
        else {
            if (!phoneRegex.test(phone)) {
                errors.phone = "Số điện thoại không hợp lệ"
            }
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors })
        }

        next()
    } catch (error) {
        next(error)
    }
}

const validateChangePassword = async (req, res, next) => {
    try {

        const { email, oldPassword, password, confirmPassword } = req.body

        const isCheckAccount = await Account.findOne({ email })
        const errors = {}

        if (!oldPassword) {
            errors.oldPassword = "Mật khẩu hiện tại không được để trống"
        }
        if (!password) {
            errors.password = "Mật khẩu không được để trống"
        }
        if (!confirmPassword) {
            errors.confirmPassword = "Mật khẩu xác nhận không được để trống"
        }
        if (!email) {
            errors.email = "Email không được để trống"
        }
        else {
            if (isCheckAccount == null) {
                errors.email = "Email không chính xác"
            }
            else {

                console.log(oldPassword)
                const comparePassword = bcrypt.compareSync(oldPassword, isCheckAccount.password);
                console.log(comparePassword)
                if (!comparePassword) {
                    errors.oldPassword = "Mật khẩu cũ không chính xác";
                }
            }
        }


        if (password !== confirmPassword) {
            errors.confirmPassword = "Mật khẩu xác nhận không chính xác"
        }
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors })
        }
        next()
    }
    catch (error) {
        next(error)
    }
}


const authLoginGoogle = async (req, res, next) => {
    try {
        const { email } = req.body
        const errors = {};
        const existEmail = await User.countDocuments({ email })

        if (existEmail > 0) {
            errors.email = "Email đã tồn tại";
        }
        if (Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }
        next()
    }
    catch (error) {
        next(error)
    }
}

const addUserMiddleWare = async (req, res, next) => {
    const { userName, email, password, role, name, phone } = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^09\d{8,9}$/;
    const isCheckUserName = await Account.countDocuments({ userName })
    const isCheckEmail = await Account.countDocuments({ email })
    const errors = {}
    if (userName === "") {
        errors.userName = "Tên tài khoản không được để trống"
    }
    else {
        if (isCheckUserName > 0) {
            errors.userName = "Tên tài khoản đã tồn tại"
        }
    }
    if (email === "") {
        errors.email = "Email không được để trống"
    }
    else {
        if (!emailRegex.test(email)) {
            errors.email = "Email không hợp lệ"
        }
        else {
            if (isCheckEmail > 0) {
                errors.email = "Email đã tồn tại"
            }
        }
    }

    if (password === "") {
        errors.password = "Mật khẩu không được để trống"
    }
    else {
        if (password.length < 6) {
            errors.password = "Mật khẩu tối thiểu 6 kí tự"
        }
    }
    if (role === "") {
        errors.role = "Vui lòng chọn loại tài khoản"
    }
    if (name === "") {
        errors.name = "Tên không được để trống"
    }
    if (phone === "") {
        errors.phone = "Số điện thoại không được để trống"
    }
    else 
    {
        if(!phoneRegex.test(phone))
        {
            errors.phone = "Số điện thoại không hợp lệ"
        }
    }
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors })
    }
    next()
}
export { validateSignIn, validateLogin, updateUserMiddleware, validateChangePassword, authLoginGoogle, addUserMiddleWare }