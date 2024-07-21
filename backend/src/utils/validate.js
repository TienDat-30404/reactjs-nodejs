const User = require('../model/UserModel')
const bcrypt = require('bcrypt')
// Check email 
const validateEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
};

// validate password
const validatePassword = (password) => {
    return password.length >= 6
}

const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10)
}

module.exports = {validateEmail, validatePassword, hashPassword}
