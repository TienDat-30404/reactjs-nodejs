

// const Voucher = require('../model/VoucherModel');
import Voucher from '../model/VoucherModel.js'
export default class VoucherController {

    static async getVoucherOfUser(req, res, next) {
        try {

            const idUser = req.user.idUser;

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const startPage = (page - 1) * limit;

            const vouchers = await Voucher.find({ idUser, status: 1 })
                .skip(startPage)
                .limit(limit);
            const totalVoucher = await Voucher.countDocuments({ idUser, status: 1 });
            const totalPage = Math.ceil(totalVoucher / limit);

            return res.status(200).json({
                vouchers,
                page,
                limit,
                totalPage,
                totalVoucher,
                status: 200,
            });
        } catch (err) {
            next(err);
        }
    };


    static async updateVoucher(req, res, next) {
        try {
            const idVoucher = req.params._id
            console.log(idVoucher)
            const voucher = await Voucher.updateOne({ _id: idVoucher }, {
                status: 0
            })
            if (voucher.modifiedCount > 0) {
                return res.status(200).json({ voucher })
            }
        }
        catch (err) {
            next(err)
        }
    }
}

