import Size from "../model/SizeModel.js"

const addSizeMiddleWare = async (req, res, next) => {
    const { name, sizePriceMultiplier } = req.body
    const isCheckSize = await Size.countDocuments({ name: name })
    const errors = {}
    name === "" ? errors.name = "Vui lòng nhập tên thuộc tính" :
        isCheckSize > 0 && (errors.name = "Thuộc tính đã tồn tại")
    sizePriceMultiplier === "" ? errors.sizePriceMultiplier = "Vui lòng nhập giá trị giá" :
        isNaN(sizePriceMultiplier) ? errors.sizePriceMultiplier = "Giá trị giá phải là số" : 
        (sizePriceMultiplier < 1 && sizePriceMultiplier > 100) ? (errors.sizePriceMultiplier = "Giá trị giá phải từ 1 - 100") : null
    return Object.keys(errors).length > 0 ? res.status(400).json({ errors }) : next()

}



export { addSizeMiddleWare }