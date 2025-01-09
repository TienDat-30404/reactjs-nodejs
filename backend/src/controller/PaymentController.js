import querystring from 'qs';
import crypto from 'crypto';
import moment from 'moment'
import { sortObjectVnpay } from '../utils/vnpayUntil.js';
export default class PaymentController {

    static async processPaymentVpn(req, res, next) {

        let date = new Date();
        let createDate = moment(date).format("YYYYMMDDHHmmss");

        let ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;


        let tmnCode = process.env.VNPAY_TMN_CODE;
        let secretKey = process.env.VNPAY_HASH_SECRET;
        let vnpUrl = process.env.VNPAY_URL;
        let returnUrl = process.env.VNPAY_RETURN_URL;

        let orderId = moment(date).format('DDHHmmss')

        let content = req.body.content
        let amount = req.body.amount;
        // let bankCode = req.body.bankCode

        let locale = 'vn'
        let currCode = 'VND';

        let vnp_Params = {};
        vnp_Params['vnp_Version'] = '2.1.0';
        vnp_Params['vnp_Command'] = 'pay';
        vnp_Params['vnp_TmnCode'] = tmnCode;
        vnp_Params['vnp_Locale'] = locale;
        vnp_Params['vnp_CurrCode'] = currCode;
        vnp_Params['vnp_TxnRef'] = orderId;
        vnp_Params['vnp_OrderInfo'] = content;
        vnp_Params['vnp_OrderType'] = 'order';
        vnp_Params['vnp_Amount'] = amount * 100;
        vnp_Params['vnp_ReturnUrl'] = returnUrl;
        vnp_Params['vnp_IpAddr'] = ipAddr;
        vnp_Params['vnp_CreateDate'] = createDate;
        vnp_Params = sortObjectVnpay(vnp_Params);

        var signData = querystring.stringify(vnp_Params, { encode: false });
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

        // res.redirect(vnpUrl)
        return res.status(200).json({ vnpUrl: vnpUrl })
    }


    static paymentReturn(req, res, next) {
        var vnp_Params = req.query;
        var secureHash = vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        vnp_Params = sortObjectVnpay(vnp_Params);

        let secretKey = process.env.VNPAY_HASH_SECRET;
        let returnUrl = process.env.VNPAY_RETURN_URL;



        var signData = querystring.stringify(vnp_Params, { encode: false });
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

        returnUrl += '?' + signData
        if (secureHash === signed) {
            res.status(200).json(
                {
                    vnpUrlReturn : returnUrl,
                    message : "Thanh toán thành công",
                    totalPrice : vnp_Params['vnp_Amount'],
                    createdAt : vnp_Params['vnp_PayDate'],
                    content : vnp_Params['vnp_OrderInfo'],
                    bank : vnp_Params['vnp_BankCode'],
                    paymentReferenceId : vnp_Params['vnp_TxnRef'],
                    statusTransaction : vnp_Params['vnp_ResponseCode'],
                    status : 200
                }
            )
        } else {
            res.status(400).json(
                { 
                    message: 'Thanh toán thất bại',
                    status : 400 
                }
            )
        }

    }
}
/*
    NCB
    9704198526191432198
    NGUYEN VAN A   
    07/15
    123456 
*/

