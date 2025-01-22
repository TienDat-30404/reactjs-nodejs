import PaymentMethod from "../model/PaymentMethodModel.js"

export default class PaymentMethodController {
    static async getAllPaymentMethod(req, res, next) {
        try 
        {
            const paymentMethods = await PaymentMethod.find({})
            return res.status(200).json({
                paymentMethods, 
                status : 200
            })
        }
        catch(err)
        {
            return res.status(500).json({
                message : `Fail when get all payment method : ${err}`
            })
        }
    }
}