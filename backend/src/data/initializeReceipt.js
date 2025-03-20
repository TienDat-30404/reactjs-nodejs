import Receipt from '../model/ReceiptModel.js';
import User from '../model/UserModel.js';
import Supplier from '../model/SupplierModel.js';

const createDefaultReceipt = async () => {
    try {
        const receiptCount = await Receipt.countDocuments();
        if (receiptCount === 0) {
            const users = await User.find();
            console.log("users", users)
            const suppliers = await Supplier.find();

            if (!users || !suppliers) {
                console.error("Không tìm thấy User hoặc Supplier để tạo Receipt!");
                return;
            }

            await Receipt.create([
                { idUser: users[0]?._id, name: 'Receipt 001', idSupplier: suppliers[0]?._id, totalPrice: 1000000 },
                { idUser: users[1]?._id, name: 'Receipt 002', idSupplier: suppliers[1]?._id, totalPrice: 4000000 },
                { idUser: users[2]?._id, name: 'Receipt 003', idSupplier: suppliers[2]._id, totalPrice: 9000000 },
                { idUser: users[3]?._id, name: 'Receipt 001', idSupplier: suppliers[3]?._id, totalPrice: 16000000 },

            ]);

            console.log("Default receipts created successfully!");
        }
    } catch (error) {
        console.error("Error creating default receipts:", error);
    }
};

export default createDefaultReceipt;
