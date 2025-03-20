import DetailReceipt from "../model/DetailReceipt.js";
import Receipt from "../model/ReceiptModel.js";
import Product from "../model/ProductModel.js";
import Size from "../model/SizeModel.js";

const createDefaultDetailReceipt = async () => {
    try {
        const detailReceiptCount = await DetailReceipt.countDocuments();
        if (detailReceiptCount === 0) {
            const receipts = await Receipt.find();
            const products = await Product.find();
            const sizes = await Size.find();

            if (receipts.length === 0 || products.length === 0 || sizes.length === 0) {
                console.error("Không tìm thấy dữ liệu cần thiết để tạo DetailReceipt!");
                return;
            }

            await DetailReceipt.create([
                {idReceipt : receipts[0]?._id, idProduct: products[0]?._id, idAttribute: sizes[0]?._id, priceImport: 100000, quantity: 100},
                {idReceipt : receipts[1]?._id, idProduct: products[1]?._id, idAttribute: sizes[1]?._id, priceImport: 200000, quantity: 200},
                {idReceipt : receipts[2]?._id, idProduct: products[2]?._id, idAttribute: sizes[2]?._id, priceImport: 300000, quantity: 300},
                {idReceipt : receipts[3]?._id, idProduct: products[3]?._id, idAttribute: sizes[3]?._id, priceImport: 400000, quantity: 400},
            ]);

            console.log("✅ Default DetailReceipts created successfully!");
        }
    } catch (error) {
        console.error("❌ Error creating default DetailReceipts:", error);
    }
};

export default createDefaultDetailReceipt;
