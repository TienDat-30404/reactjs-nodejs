const { validateEmail } = require('../utils/validate')
const User = require('../model/UserModel')
const bcrypt = require('bcrypt')
const { generateToken, generateRefreshToken } = require('../utils/jwt')
// validate for sign in
const validateSignIn = async (req, res, next) => {
    try {
        const { name, email, password, confirm_password } = req.body
        const existUser = await User.findOne({ name })
        const errors = {};
        const existEmail = await User.countDocuments({ email }) // i chang User.findOne, chỉ khác kiểu trả về
        if (name == "") {
            errors.name = "Tên người dùng không được để trống";
        }
        if (existUser) {
            errors.name = "Tên người dùng đã tồn tại";
        }
        if (email == "") {
            errors.email = "Email không được để trống"
        }
        if (!validateEmail(email)) {
            errors.email = "Email không hợp lệ";
        }
        if (existEmail > 0) {
            errors.email = "Email đã tồn tại";
        }
        if (password == "") {
            errors.password = "Mật khẩu không được để trống"
        }
        if (password.length < 6) {
            errors.password = "Mật khẩu tối thiểu 6 kí tự";
        }
        if (confirm_password == "") {
            errors.confirm_password = "Xác nhận mật khẩu không được để trống"
        }
        if (password !== confirm_password) {
            errors.confirm_password = "Mật khẩu không trùng khớp";
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
    const { email, password } = req.body
    const isCheckUser = await User.findOne({ email })
    const errors = {}

    if (password == "") {
        errors.password = "Mật khẩu không được để trống"
    }

    if (isCheckUser == null) {
        errors.email = "Email không chính xác"
    }
    else {
        const comparePassword = bcrypt.compareSync(password, isCheckUser.password);
        if (!comparePassword) {
            errors.password = "Mật khẩu không chính xác"
        }
    }
    if (email == "") {
        errors.email = "Email không được để trống"
    }
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors })
    }
    next()
}

// validate update user
const validateUpdateUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        const idUser = req.params.idUser
        const countNameUser = await User.countDocuments({ name })
        const countEmailUser = await User.countDocuments({ email })
        const isCheckUser = await User.findOne({ idUser: idUser })
        if (!validateNameUser(name)) {
            return res.status(200).json({
                message: "Tên người dùng không được rỗng"
            })
        }
        if (countNameUser == 1 && name !== isCheckUser.name) {
            return res.status(400).json({ message: "Tên người dùng đã tồn tại" })
        }
        if (countEmailUser == 1 && email !== isCheckUser.email) {
            return res.status(400).json({ message: "Email đã tồn tại" })
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Email không hợp lệ" })
        }
        if (!validatePassword(password)) {
            return res.status(400).json({ message: "Mật khẩu tối thiểu 6 kí tự" })
        }
        next()
    }
    catch (error) {
        next(error)
    }
}
module.exports = { validateSignIn, validateLogin, validateUpdateUser }