import ProductAttribute from '../model/ProductAttribute.js';
import Product from '../model/ProductModel.js';
import Size from '../model/SizeModel.js';

const createDefaultProductAttribute = async () => {
    try {
        const productAttributeCount = await ProductAttribute.countDocuments();
        if (productAttributeCount === 0) {
            const products = await Product.find();
            const sizes = await Size.find();

            if (products.length === 0 || sizes.length === 0) {
                console.error("Không tìm thấy sản phẩm hoặc size để tạo ProductAttribute!");
                return;
            }

            await ProductAttribute.create([
                { idProduct: products[0]?._id, idSize: sizes[0]?._id, priceBought: 120000, quantity: 100},
                { idProduct: products[1]?._id, idSize: sizes[1]?._id, priceBought: 259200, quantity: 200},
                { idProduct: products[2]?._id, idSize: sizes[2]?._id, priceBought: 360000, quantity: 300},
                { idProduct: products[3]?._id, idSize: sizes[3]?._id, priceBought: 480000, quantity: 400},
            ]);

            console.log("Default ProductAttributes created successfully!");
        }
    } catch (error) {
        console.error("Error creating default ProductAttributes:", error);
    }
};

export default createDefaultProductAttribute;
