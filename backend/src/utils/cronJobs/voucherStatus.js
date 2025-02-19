import cron from "node-cron";
import Voucher from "../../model/VoucherModel.js";
async function updateStatusVoucher() {
    try {
        const currentDate = new Date();
        const result = await Voucher.updateMany(
            { endDate: { $lt: currentDate }, status: 1 }, 
            { $set: { status: 0 } } 
        );
        console.log(`Đã cập nhật ${result.modifiedCount} voucher hết hạn.`);
    } catch (error) {
        console.error("Lỗi khi cập nhật status voucher:", error);
    }
}

cron.schedule("0 0 * * *", updateStatusVoucher, {
    timezone: "Asia/Ho_Chi_Minh",
});

