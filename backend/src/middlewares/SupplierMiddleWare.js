import { validateEmail, validateNameSupplier } from '../utils/validate.js';
import Supplier from '../model/SupplierModel.js'
const middlewareAddSupplier = async (req, res, next) => {
    const { name, phone, address, email } = req.body
    console.log(name, phone, address, email)
    const errors = {}
    const phoneRegex = /^09\d{8,9}$/;
    const isCheckSupplier = await Supplier.countDocuments({ name, deletedAt: null })
    if (name === "") {
        errors.name = "Tên nhà cung cấp không được để trống"
    }
    else {
        if (req.params.idSupplier) {
            const supplier = await Supplier.find({ _id: req.params.idSupplier })
            if (name != supplier[0]?.name) {
                const isCheckExistNameSupplierWhenUpdate = await validateNameSupplier(name)
                if (!isCheckExistNameSupplierWhenUpdate) {
                    errors.name = "Tên nhà cung cấp đã tồn tại"
                }
            }
        }
        else {
            if (isCheckSupplier > 0) {
                errors.name = "Tên nhà cung cấp đã tồn tại"
            }
        }
    }
    if (phone === "") {
        errors.phone = "Số điện thoại không được để trống"
    }
    else {
        if (!phoneRegex.test(phone)) {
            errors.phone = "Số điện thoại không hợp lệ"
        }
    }
    if (address === "") {
        errors.address = "Địa chỉ không được để trống"
    }
    if (email === "") {
        errors.email = "Email không được để trống"
    }
    else {
        if (!validateEmail(email)) {
            errors.email = "Email không hợp lệ"
        }
    }
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            errors
        })
    }
    next()
}

export { middlewareAddSupplier }