const { validateEmail } = require('../utils/validate')
const User = require('../model/UserModel')
const bcrypt = require('bcrypt')
const { generateToken, generateRefreshToken } = require('../utils/jwt')
// validate for sign in
const validateSignIn = async (req, res, next) => {
    try {
        const { name, email, password, confirm_password, idRole } = req.body
        const existUser = await User.findOne({ name })
        const errors = {};
        const existEmail = await User.countDocuments({ email }) // i chang User.findOne, chỉ khác kiểu trả về
        if (name == "") {
            errors.name = "Tên người dùng không được để trống";
        }
        else if (existUser && name != "") {
            errors.name = "Tên người dùng đã tồn tại";
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
        if (password !== confirm_password) {
            errors.confirm_password = "Mật khẩu không trùng khớp";
        }
        if(idRole == -1)
        {
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
        const regexHashPassword = /^\$2[ayb]\$[0-9]{2}\$.{53}$/;
        if (!regexHashPassword.test(password)) {
            const comparePassword = bcrypt.compareSync(password, isCheckUser.password);
            if (!comparePassword) {
                errors.password = "Mật khẩu không chính xác"
            }
        }
    }
    if (email == "") {
        errors.email = "Email không được để trống"
    }
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors })
    }
    console.log(errors)
    next()
}

// validate update user
const validateUpdateUser = async (req, res, next) => {
    try {
        const { name, email, password, phone, date_of_birth, oldPassword, confirmPassword } = req.body
        const idUser = req.params.idUser
        const phoneRegex = /^09\d{8,9}$/;
        const countNameUser = await User.countDocuments({ name })
        const countEmailUser = await User.countDocuments({ email })
        const isCheckUser = await User.findOne({ _id: idUser })
        const errors = {}

        if (name == "") {
            errors.name = "Tên không được để trống"
        }
        if (countNameUser == 1 && name !== isCheckUser.name) {
            errors.name = "Tên người dùng đã tồn tại"
        }
        if (countEmailUser == 1 && email !== isCheckUser.email) {
            errors.email = "Email đã tồn tại"
        }
        if (!validateEmail(email)) {
            errors.email = "Email không hợp lệ"
        }
        if (date_of_birth) {
            const today = new Date();
            const birthDate = new Date(date_of_birth);
            if (birthDate > today) {
                errors.date_of_birth = "Ngày sinh không được vượt quá ngày hiện tại";
            }
        }
        if (!phoneRegex.test(phone) && phone != "") {
            errors.phone = "Số điện thoại không hợp lệ"
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
    const { email, oldPassword, password, confirmPassword } = req.body
    const isCheckUser = await User.findOne({ email })
    
    const errors = {}

    if (password == "") {
        errors.password = "Mật khẩu không được để trống"
    }

    if (isCheckUser == null) {
        errors.email = "Email không chính xác"
    }
    else {
        const regexHashPassword = /^\$2[ayb]\$[0-9]{2}\$.{53}$/;
        if (!regexHashPassword.test(password)) {
            const comparePassword = bcrypt.compareSync(oldPassword, isCheckUser.password);
            if (!comparePassword) {
                errors.oldPassword = "Mật khẩu cũ không chính xác"
            }
        }
    }
    if (confirmPassword === "") {
        errors.confirmPasswrd = "Mật khẩu xác nhận không được để trống"
    }
    if(password !== confirmPassword)
    {
        errors.confirmPassword = "Mật khẩu xác nhận không chính xác"
    }
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors })
    }
    console.log(errors)
    next()
}


const authLoginGoogle = async (req, res, next) => {
    try {
        const {email} = req.body
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
module.exports = { validateSignIn, validateLogin, validateUpdateUser, validateChangePassword, authLoginGoogle }