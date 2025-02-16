import cron from "node-cron";
import Discount from "../../model/DiscountModel.js";
async function updateStatusDiscount() {
    try {
        const currentDate = new Date();
        const result = await Discount.updateMany(
            { endDate: { $lt: currentDate }, status: 1 }, 
            { $set: { status: 0 } } 
        );
        console.log(`✅ Đã cập nhật ${result.modifiedCount} sản phẩm hết hạn.`);
    } catch (error) {
        console.error("❌ Lỗi khi cập nhật status discount:", error);
    }
}

cron.schedule("0 0 * * *", updateStatusDiscount, {
    timezone: "Asia/Ho_Chi_Minh",
});

