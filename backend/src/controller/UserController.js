const User = require('../model/UserModel')
const cloudinary = require('../config/cloudinary');
const { generateToken, generateRefreshToken } = require('../utils/jwt')
const { hashPassword } = require('../utils/validate')
const refreshTokenJWT = require('../utils/jwt')
// [POST] : /sign-in
const createUser = async (req, res, next) => {
    try {
        const { name, email, password, confirm_password, idRole } = req.body;
        const newUser = new User({ name, email, password: hashPassword(password), confirm_password, idRole });
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        next(error);

    }
}

// [POST] : /sign-up
const loginUser = async (req, res, next) => {
    const { email } = req.body
    const isCheckUser = await User.findOne({ email })
    const avatar = isCheckUser.avatar
    const payloadToken = {
        idUser: isCheckUser.idUser,
        name: isCheckUser.name,
        email: isCheckUser.email,
        address: isCheckUser.address,
        phone: isCheckUser.phone,
        sex: isCheckUser.sex,
        date_of_birth: isCheckUser.date_of_birth,
        idRole: isCheckUser.idRole
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
        avatar: avatar
    })
}

// [PUT] : /update-user/:id
const updateUser = async (req, res, next) => {
    try {
        const idUser = req.params.idUser
        console.log(idUser)
        const { name, email, address, phone, date_of_birth, sex, idRole } = req.body
        console.log(name)
        const user = await User.findOne({ idUser: idUser })
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
        await User.updateOne({ idUser: idUser }, newData)
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
        const delUser = await User.deleteOne({ idUser: idUser })
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

const getAllUser = async (req, res, next) => {
    const getAllUser = await User.find({})
    return res.status(200).json(getAllUser)
}


const detailUser = async (req, res, next) => {
    try {
        const detailUser = await User.findOne({ idUser: req.params.idUser })
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
        await User.updateOne({ idUser: idUser }, { $set: { password: newPassword } })
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
        searchParams.email = { $regex: email};
    }
    if (phone) {
        searchParams.phone = { $regex: phone}
    }
    if (idRole) {
        searchParams.idRole = idRole
    }
    
    try 
    {
        const users = await User.find(searchParams)
        return res.status(200).json({users})
    }
    catch (error)
    {
        return res.status(400).json({message : error.message})
    }
}
module.exports = { createUser, loginUser, updateUser, deleteUser, getAllUser, refreshToken, detailUser, logoutRefreshToken, changePassword, searchUser }