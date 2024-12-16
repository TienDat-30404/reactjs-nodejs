const Account = require('../model/AccountModel');
const User = require('../model/UserModel');
const Role = require('../model/RoleModel')
const { hashPassword } = require('../utils/validate')
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const redisClient = require('../utils/redisClient');
// [POST] : /sign-in
const sendOtpForCreateAccount = async (req, res, next) => {
    try {
        // Tạo OTP
        const {email} = req.body;

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

        res.status(200).json({ message: 'OTP đã được gửi đến email của bạn', status : 200});


    } catch (error) {
        next(error);
        console.log("error", error)
    }
};


const verifyOtpForCreateAccount = async (req, res, next) => {
    const { userName, name, email, password, typeLogin, idRole, otp } = req.body;
    const typeOfLogin = typeLogin ? "google" : 'normal'
    const role = await Role.findOne({name : "Customer"})
    const roleDefault = idRole ? idRole : role._id
    const otpCorrect = await redisClient.get(`otp:${email}`)
    if(otp != otpCorrect)
    {
        return res.status(400).json({
            message : "Otp không hợp lệ",
            status : 400
        })
    }
    const account = new Account({
        userName,
        email,
        password: hashPassword(password),
        idRole : roleDefault,
        typeLogin : typeOfLogin
    });

    const savedAccount = await account.save();
    const user = new User({
        name,
        idAccount : savedAccount._id
    })
    await user.save();

    const accounts = await Account.findById(account._id).populate('idRole');
    let accountObject = accounts.toObject();
    if (accountObject.idRole) {
        accountObject.role = accountObject.idRole;
        delete accountObject.idRole;
    }

    const userData = await User.findOne({idAccount : savedAccount._id})
    if(userData)
    {
        accountObject.userInformation = userData
    }
    res.status(200).json({  account : accountObject });
}



module.exports = { sendOtpForCreateAccount, verifyOtpForCreateAccount }