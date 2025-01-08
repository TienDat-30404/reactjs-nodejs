const validateAddOrder = async (req, res, next) => {
    try {
        const phoneRegex = /^09\d{8,9}$/;
        const { phone, address} = req.body
        const errors = {};
        if (phone == "") {
            errors.phone = "Số điện thoại không được để trống";
        }
        if (address == "") {
            errors.address = "Địa chỉ không được để trống"
        }
        if (!phoneRegex.test(phone) && phone != "") {
            errors.phone = "Số điện thoại không hợp lệ";
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
// module.exports = validateAddOrder
export default validateAddOrder