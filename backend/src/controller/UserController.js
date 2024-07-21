const User = require('../model/UserModel')
const {hashPassword} = require('../utils/validate')
// [GET] : /sign-in
const createUser = async (req, res, next) => {
    try {
        const { name, email, password, confirm_password } = req.body;
        const newUser = new User({ name, email, password : hashPassword(password), confirm_password, idRole : 0 });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        next(error);

    }
}

// [GET] : /sign-up
const loginUser = async(req, res, next) => {
    const {email, password } = req.body
}

// [PUT] : /update-user/:id
const updateUser = async (req, res, next) => {
    try
    {
        const idUser = req.params.id
        const newData = req.body
        newData.password = hashPassword(newData.password)
        await User.updateOne({id : idUser}, newData)
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
        const idUser = req.params.id
        const delUser = await User.deleteOne({id : idUser}) 
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

const refreshToken = (req, res, nexxt) => {
    const token = req.headers['authorization']
    console.log(token)
}

module.exports = { createUser, loginUser, updateUser, deleteUser, getAllUser, refreshToken }