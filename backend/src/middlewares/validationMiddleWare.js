const {validateEmail, validatePassword} = require('../utils/validate')
const User = require('../model/UserModel')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/jwt')
const validateSignIn = async (req, res, next) => {
    try 
    {
        const {name, email, password, confirm_password} = req.body
        const existUser = await User.findOne({name})
        const existEmail = await User.countDocuments({email}) // i chang User.findOne, chỉ khác kiểu trả về
        if(existUser)
        {
            return res.status(400).json({message : "Tên người dùng đã tồn tại"})
        }
        if(existEmail > 0)
        {
            return res.status(400).json({message : "Email đã tồn tại"})
        }
        if(!validateEmail(email)) 
        {
            return res.status(400).json({message : "Email không hợp lệ"})
        }
        if(!validatePassword(password))
        {
            return res.status(400).json({message : "Mật khẩu tối thiểu 6 kí tự"})
        }
        if(password !== confirm_password)
        {
            return res.status(400).json({message : "Mật khẩu không trùng khớp"})
        }
        next()
    }
    catch(error)
    {
        next(error)
    }
}

const validateLogin = async (req, res, next) => {
    const {email, password} = req.body  
    const isCheckUser = await User.findOne({email})
    if(isCheckUser == null)
    {
        return res.status(200).json({
            "status" : "Successfully",
            "message" : "Email is not defined"
        })
    }
    const comparePassword = bcrypt.compareSync(password, isCheckUser.password); 
    if(!comparePassword)
    {
        return res.status(400).json({
            "status" : "Successfully",
            "message" : "Incorrect Password"
        })
    }
    const accessToken = generateToken(isCheckUser.id, isCheckUser.name)
    console.log(accessToken)
    return res.status(200).json({
        "status" : "Successfully",
        token : accessToken
    })
}
module.exports = {validateSignIn, validateLogin}