import Discount from "../model/DiscountModel"


const addDiscountMiddleWare = async (req, res, next) => {
    const discounts = await Discount.find()
    const { product, discountValue, endDate } = req.body
    const errors = {}
    if(product === 0)
    {
        errors.product = 'Vui lòng chọn sản phẩm'
    }
    // else 
    // {
    //     discounts.some(discount => {
    //         if(discount.idProduct === product && discount.)
    //     })
    // }
    if(discountValue === '')
    {
        errors.discountValue = 'Vui lòng nhập phần trăm giảm giá sản phẩm'
    }
    else 
    {
        if(discountValue <= 1 || discountValue > 100)
        {
            errors.discountValue = 'Sản phẩm giảm giá chỉ từ 1% - 100%'
        }
    }
    if(endDate === '')
    {
        errors.endDate = 'Vui lòng chọn ngày kết thúc giảm giá'
    }
    else 
    {
        if(endDate <= new Date().toISOString().split('T')[0])
        {
            errors.endDate = 'Ngày kết thúc giảm giá phải sau ngày tạo'
        }
    }
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }
    next()
}
export {addDiscountMiddleWare}