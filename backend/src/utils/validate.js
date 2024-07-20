// Check email 
const validateEmail = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
};

// validate password
const validatePassword = (password) => {
    return password.length >= 6
}



module.exports = {validateEmail, validatePassword}
