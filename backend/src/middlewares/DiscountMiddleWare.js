const addDiscountMiddleWare = async (req, res, next) => {
    const { product, discountValue, endDate } = req.body;
    const errors = {};

    product === 0 && (errors.product = "Vui lòng chọn sản phẩm");

    discountValue === ""
        ? (errors.discountValue = "Vui lòng nhập phần trăm giảm giá sản phẩm")
        : (discountValue <= 1 || discountValue > 100) &&
        (errors.discountValue = "Sản phẩm giảm giá chỉ từ 1% - 100%");

    endDate === ""
        ? (errors.endDate = "Vui lòng chọn ngày kết thúc giảm giá")
        : endDate <= new Date().toISOString().split("T")[0] &&
        (errors.endDate = "Ngày kết thúc giảm giá phải sau ngày tạo");

    return Object.keys(errors).length > 0 ? res.status(400).json({ errors }) : next();
};

const updateDiscountMiddleWare = async (req, res, next) => {
    const { discountValue, endDate } = req.body;
    const errors = {};
    discountValue === "" ? errors.discountValue = "Vui lòng nhập phẩn trăm giảm giá sản phẩm"
        : (discountValue <= 1 || discountValue > 100) && (errors.discountValue = "Sản phẩm giảm giá chỉ từ 1% - 100%");
    endDate === "" ? errors.endDate = "Vui lòng chọn ngày kết thúc giảm giá" :
        (endDate <= new Date().toISOString().split("T")[0]) && (errors.endDate = "Ngày kết thúc giảm giá phải sau ngày tạo");
    return Object.keys(errors).length > 0 ? res.status(400).json({ errors }) : next();
}

export { addDiscountMiddleWare, updateDiscountMiddleWare }