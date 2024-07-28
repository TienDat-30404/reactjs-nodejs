const User = require('../model/UserModel')
const { generateToken, generateRefreshToken } = require('../utils/jwt')
const {hashPassword} = require('../utils/validate')
const refreshTokenJWT = require('../utils/jwt')
// [POST] : /sign-in
const createUser = async (req, res, next) => {
    try {
        const { name, email, password, confirm_password } = req.body;
        const newUser = new User({ name, email, password : hashPassword(password), confirm_password, idRole : 0 });
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        next(error);

    }
}

// [POST] : /sign-up
const loginUser = async(req, res, next) => {
    const {email } = req.body
    const isCheckUser = await User.findOne({ email })
    const payloadToken = {
        idUser: isCheckUser.idUser,
        name: isCheckUser.name,
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
        token: accessToken
    })
}

// [PUT] : /update-user/:id
const updateUser = async (req, res, next) => {
    try
    {
        const idUser = req.params.idUser
        const newData = req.body
        newData.password = hashPassword(newData.password)
        await User.updateOne({idUser : idUser}, newData)
        res.status(200).json({
            message : "Update successfully",
            newData
        })
    }
    catch(error)
    {
        next(error)
    }
};

const deleteUser = async (req, res, next) => {
    try 
    {
        const idUser = req.params.idUser
        const delUser = await User.deleteOne({idUser : idUser}) 
        if(delUser.deletedCount > 0)
        {
            return res.status(200).json({
                message : "Delete Successfully",
            })
        }
        else 
        {
            return res.status(400).json({
                message : "Delete Fail",
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
    catch(error)
    {
        next(error)
    }
}

const getAllUser = async (req, res, next) => {
    const getAllUser = await User.find({})
    return res.status(200).json(getAllUser)
}


const detailUser = async (req, res, next) => {
    try 
    {
        const idUser = await User.findOne({idUser : req.params.idUser})
        if(idUser == null)
        {
            return res.status(400).json({
                mesage : "Fail Detail User"
            })
        }
        return res.status(200).json({
            idUser
        })
    }
    catch(error)
    {
        next(error)
    }
}

const refreshToken = async (req, res, next) => {
    try
    {
        const token = req.cookies.refreshToken
        if(!token)
        {
            return res.status(401)
        }
        const tokenNew = await refreshTokenJWT.refreshToken(token)
        return res.status(200).json({
            success : "Success",
            tokenNew
        })
    }
    catch(error)
    {
        console.log(error);
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: "Token has expired" });
        } else {
            res.status(400).json({ message: "Error Refresh Token" });
        }
    }
}


const logoutRefreshToken = (req, res, next) => {
    try 
    {
        res.clearCookie('refreshToken', { httpOnly: true, secure: true, sameSite: 'Strict' });
        return res.status(200).json({
            message : "Success"
        })
    }
    catch(error)
    {
        next(error)
    }

}
module.exports = { createUser, loginUser, updateUser, deleteUser, getAllUser, refreshToken, detailUser, logoutRefreshToken}