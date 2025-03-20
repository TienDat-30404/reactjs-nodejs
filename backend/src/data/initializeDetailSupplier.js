import DetailSupplier from "../model/DetailSupplier.js";
import Supplier from "../model/SupplierModel.js";
import Product from "../model/ProductModel.js";

const createDefaultDetailSupplier = async () => {
    try {
        const detailSupplierCount = await DetailSupplier.countDocuments();
        if (detailSupplierCount === 0) {
            const suppliers = await Supplier.find();
            const products = await Product.find();

            if (suppliers.length === 0 || products.length === 0) {
                console.error("Không tìm thấy dữ liệu cần thiết để tạo DetailSupplier!");
                return;
            }

            await DetailSupplier.create([
                { idSupplier: suppliers[0]?._id, idProduct: products[0]?._id, price: 100000},
                { idSupplier: suppliers[1]?._id, idProduct: products[1]?._id, price: 200000},
                { idSupplier: suppliers[2]?._id, idProduct: products[2]?._id, price: 300000},
                { idSupplier: suppliers[3]?._id, idProduct: products[3]?._id, price: 400000},
            ]);
            console.log("Default DetailSuppliers created successfully!");
        }
    } catch (error) {
        console.error("Error creating default DetailSuppliers:", error);
    }
};

export default createDefaultDetailSupplier;
