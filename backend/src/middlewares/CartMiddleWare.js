import ProductAttribute from "../model/ProductAttribute.js"

const isCheckUpdateQuantity = async(req, res ,next) => {
    const {quantity, idProductAttribute} = req.body 
    const productAttribute = await ProductAttribute.findById({_id : idProductAttribute}).lean()
    console.log(productAttribute)
    if(quantity > productAttribute.quantity)
    {
        return res.status(400).json({
            status : 400,
            message : 'Sản phẩm đã đạt đến số lương giới hạn'
        })
    }
    next()
}
export {isCheckUpdateQuantity}