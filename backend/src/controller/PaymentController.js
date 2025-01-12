import querystring from 'qs';
import crypto from 'crypto';
import moment from 'moment'
import CryptoJS from 'crypto-js'
import { sortObjectVnpay } from '../utils/vnpayUntil.js';
import axios from 'axios'
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


    static paymentVnpReturn(req, res, next) {
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
                    vnpUrlReturn: returnUrl,
                    message: "Thanh toán thành công",
                    totalPrice: vnp_Params['vnp_Amount'],
                    createdAt: vnp_Params['vnp_PayDate'],
                    content: vnp_Params['vnp_OrderInfo'],
                    bank: vnp_Params['vnp_BankCode'],
                    paymentReferenceId: vnp_Params['vnp_TxnRef'],
                    statusTransaction: vnp_Params['vnp_ResponseCode'],
                    status: 200,
                    paymentMethod: '222222'
                }
            )
        } else {
            res.status(400).json(
                {
                    message: 'Thanh toán thất bại',
                    status: 400
                }
            )
        }

    }

    static async processPaymentZalopay(req, res, next) {
        const embed_data = {
            redirectUrl: process.env.ZALOPAY_RETURN_REDICT
        };
        const amount = req.body.amount
        const items = [{}];
        const transID = Math.floor(Math.random() * 1000000);
        const order = {
            app_id: process.env.ZALOPAY_APP_ID,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
            app_user: "user123",
            app_time: Date.now(),
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount,
            description: `Lazada - Payment for the order #${transID}`,
            // bank_code: "zalopayapp",
        };

        // appid|app_trans_id|appuser|amount|apptime|embeddata|item
        const data = process.env.ZALOPAY_APP_ID + "|" + order.app_trans_id + "|" + order.app_user + "|" +
            order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;

        order.mac = CryptoJS.HmacSHA256(data, process.env.ZALOPAY_KEY_1).toString();
        console.log("orderMac", order.mac)
        const result = await axios.post(process.env.ZALOPAY_ENDPOINT, null, { params: order })
        return res.status(200).json({ result: result.data })
    }

    static async callbackPaymentZaloPay(req, res, next) {
        // let result = {};
        // try {
        //     let dataStr = req.body.data;
        //     let reqMac = req.body.mac;

        //     let mac = CryptoJS.HmacSHA256(dataStr, process.env.ZALOPAY_KEY_2).toString();
        //     console.log("mac =", mac);
        //     if (reqMac !== mac) {
        //         result.returncode = -1;
        //         result.returnmessage = "mac not equal";
        //     }
        //     else {
        //         let dataJson = JSON.parse(dataStr, process.env.ZALOPAY_KEY_2);
        //         console.log("update order's status = success where apptransid =", dataJson["apptransid"]);

        //         result.returncode = 1;
        //         result.returnmessage = "success";
        //     }
        // } catch (ex) {
        //     result.returncode = 0; 
        //     result.returnmessage = ex.message;
        // }
        // res.json(result);
    }

    static async checkTranSactionZaloPay(req, res, next) {
        const {apptransid} = req.body
        let postData = {
            appid: process.env.ZALOPAY_APP_ID,
            apptransid
        }
        
        let data = postData.appid + "|" + postData.apptransid + "|" + process.env.ZALOPAY_KEY_1;
        postData.mac = CryptoJS.HmacSHA256(data, process.env.ZALOPAY_KEY_1).toString();
        
        console.log("Data", data)
        let postConfig = {
            method: 'post',
            url: process.env.ZALO_ENDPOINT_TRANSACTION,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: querystring.stringify(postData)
        };
        const result = await axios(postConfig)
        try 
        {
            return res.status(200).json({result : result.data})
        }
        catch(err)
        {
            return res.status(500).json({messge : `Fail when check status zalopay : ${err}`})
        }
    }

    static async processPaymentMomo(req, res, next) {
        const { amount, orderInfo } = req.body
        var accessKey = process.env.ACCESS_KEY_MOMO
        var secretKey = process.env.SECRET_KEY_MOMO
        var partnerCode = 'MOMO';
        var redirectUrl = process.env.MOMO_RETURN_URL
        var ipnUrl = process.env.MOMO_IPN_URL
        var requestType = "payWithMethod";
        var orderId = partnerCode + new Date().getTime();

        var requestId = orderId;
        var extraData = '';
        var orderGroupId = '';
        var autoCapture = true;
        var lang = 'vi';

        var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;

        var signature = crypto.createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');

        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            partnerName: "Test",
            storeId: "MomoTestStore",
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            lang: lang,
            requestType: requestType,
            autoCapture: autoCapture,
            extraData: extraData,
            orderGroupId: orderGroupId,
            signature: signature
        });

        const options = {
            method: "POST",
            url: "https://test-payment.momo.vn/v2/gateway/api/create",
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody)
            },
            data: requestBody
        }
        try {
            let result = await axios(options)
            return res.status(200).json({ result: result.data })
        }
        catch (err) {
            res.status(500).json(err)
        }
    }

    static async callbackPaymentMomo(req, res, next) {
        console.log("Received callback:", req.body);
        // res.status(200).send("OK");
    }

    static async checkTranSactionMomo(req, res, next) {
        const { orderId } = req.body
        const stringNeedHash = `accessKey=${process.env.ACCESS_KEY_MOMO}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`
        const signature = crypto.createHmac("sha256", process.env.SECRET_KEY_MOMO)
            .update(stringNeedHash)
            .digest("hex")
        const requestBody = JSON.stringify({
            partnerCode: "MOMO",
            requestId: orderId,
            orderId: orderId,
            signature,
            lang: "en",
        })
        // console.log("requestBody", requestBody)
        let result = await axios({
            method: "POST",
            url: "https://test-payment.momo.vn/v2/gateway/api/query",
            headers: {
                "Content-Type": "application/json"
            },
            data: requestBody
        })
        // console.log("result", result)
        return res.status(200).json({ result: result.data })
    }

}
/*
    - VNPAY : 
        NCB
        9704198526191432198
        NGUYEN VAN A   
        07/15
        123456 

    - MOMO : 
        name : NGUYEN VAN A
        stk : 5200 0000 0000 1096 (số thể đúng) , 5200 0000 0000 1104 (số thẻ sai)
        05/25	
        cvc : 111
        otp : 1234

    - ZALO pay : 
        Số thẻ : 4111111111111111
        Tên : 	NGUYEN VAN A
        Ngày hết hạn : 	01/25
        Mã CVV	123


*/




