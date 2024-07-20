const User = require('../model/UserModel')
const bcrypt = require('bcrypt');
const createUser = async (req, res, next) => {
    try {
        const { name, email, password, confirm_password } = req.body;
        const hash = bcrypt.hashSync(password, 10); // 10 : Giá trị cao hơn có nghĩa là bảo mật tốt hơn nhưng cũng tốn nhiều thời gian hơn để xử lý.
        const newUser = new User({ name, email, password : hash, confirm_password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        next(error);

    }
}


const loginUser = async(req, res, next) => {
    const {email, password } = req.body
}

module.exports = { createUser, loginUser }