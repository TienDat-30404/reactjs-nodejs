const validateEditVoucher = async (req, res, next) => {
    const { discountVoucher, description, endDate } = req.body
    const errors = {}
    discountVoucher === '' && (errors.discountVoucher = 'Discount voucher is required')

    description === '' && (errors.description = 'Description is required')
    
    endDate === '' ? (errors.endDate = 'End date is required') : 
    endDate <= new Date().toISOString().split("T")[0] &&(errors.endDate = "Ngày kết thúc giảm giá phải sau ngày tạo");
    return Object.keys(errors).length > 0 ? res.status(400).json({ errors }) : next()
}
export {validateEditVoucher}