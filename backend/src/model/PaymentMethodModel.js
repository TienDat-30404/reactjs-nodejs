import mongoose from "mongoose";
const Schema = mongoose.Schema
const PaymentMethodSchema = Schema(
    {
        name: { type: String },
        code : {type : String},
        deletedAt: { type: Date, default: null }
    },
    {
        timestamps : true
    }
)

const PaymentMethod = mongoose.model('PaymentMethod', PaymentMethodSchema)
const createDefaultPaymentMethod = async() => {
    try 
    {
        const paymentMethodCount = await PaymentMethod.countDocuments()
        if(paymentMethodCount === 0)
        {
            await PaymentMethod.create([
                {name : 'Thanh toán khi nhận hàng', code : 'payLater'},
                {name : 'Thanh toán bằng momo', code : 'momo'},
                {name : 'Thanh toán bằng vnpay', code : 'vnpay'},
                {name : 'Thanh toán bằng zalopay', code : 'zalopay'}
            ])
        }
    }
    catch(err)
    {
        console.log(`Fail when create default role : ${err}`)
    }
}
createDefaultPaymentMethod()
export default PaymentMethod