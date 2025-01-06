const Account = require('../model/AccountModel');
const User = require('../model/UserModel');
const Role = require('../model/RoleModel')
const { hashPassword } = require('../utils/validate')
const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const redisClient = require('../utils/redisClient');

const { OAuth2Client } = require("google-auth-library");
const errorHandler = require('http-errors')
const { generateToken, generateRefreshToken } = require('../utils/jwt')



const getAllUser = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const startPage = (page - 1) * limit
        const objectFilter = {deletedAt : null}
        if (req.query.idUser) {
            objectFilter._id = req.query.idUser
        }
        if (req.query.name) {
            objectFilter.name = req.query.name
        }
        if (req.query.email) {
            objectFilter.email = req.query.email
        }
        if (req.query.phone) {
            objectFilter.phone = req.query.phone
        }
        const totalUser = Object.keys(objectFilter).length === 0
            ? await User.countDocuments({deletedAt : null})
            : await User.countDocuments(objectFilter);
        const totalPage = Math.ceil(totalUser / limit);

        let users = await User.find(objectFilter)
            .skip(startPage)
            .limit(limit)
            .populate({
                path : 'idAccount',
                populate : {
                    path : 'idRole',
                    model : 'Role'
                }
            })
            .lean()
        users = users.map(user => {
            if (user?.idAccount) {
                user.account = user.idAccount;
                delete user.idAccount;
            }
            if(user?.account)
            {
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
            users
        })
    }
    catch (err) {
        next(err)
    }
}

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


const authLoginGoogle = async (req, res, next) => {
    try {
        const { userName, email, typeLogin="google", name, idRole } = req.body
        const role = await Role.findOne({ name: "Customer" })
        const roleDefault = idRole ? idRole : role._id
        const account = new Account({
            userName,
            email,
            typeLogin : typeLogin,
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

        const userData = await User.findOne({idAccount : savedAccount._id})
        if(userData)
        {
            accountObject.userInformation = userData
        }
        res.status(200).json({ account: accountObject });
    }
    catch (error) {
        console.error("Google token verification failed:", error);
        res.status(400).json({ success: false, error: error});
    }
}



// [POST] : /sign-in
const loginUser = async (req, res, next) => {
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
        email : isCheckAccount.email,
        typeLogin : isCheckAccount.typeLogin,
        address: isCheckUser.address,
        phone: isCheckUser.phone,
        sex: isCheckUser.sex,
        date_of_birth: isCheckUser.date_of_birth,
        idRole: isCheckAccount.idRole,
        idAccount : isCheckAccount._id,
        avatar
    };

    const accessToken = generateToken(payloadToken)
    const refreshToken = generateRefreshToken(payloadToken)
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

const changePassword = async (req, res, next) => {
    try {
        const idAccount = req.params.idAccount
        console.log(idAccount)
        const { password } = req.body
        const newPassword = hashPassword(password)
        const response = await Account.updateOne({ _id: idAccount }, { $set: { password: newPassword } })
        if(response.modifiedCount > 0)
        {
            return res.status(200).json({
                message: "Change Password Successful"
            })
        }
      
    }
    catch (error) {
        return res.status(500).json({message : "Error when change password : ", error})
    }
};

module.exports = {getAllUser, sendOtpForCreateAccount, verifyOtpForCreateAccount, authLoginGoogle, loginUser, 
    changePassword
 }