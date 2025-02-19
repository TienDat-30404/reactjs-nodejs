

import mongoose from 'mongoose';
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

    static async getAllVoucher(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const startPage = (page - 1) * limit;
            const objectFilter = { deletedAt: null };
            if (req.query.idVoucher) {
                if (!mongoose.Types.ObjectId.isValid(req.query.idVoucher)) {
                    return res.status(200).json({
                        status: 200,
                        page: 1,
                        totalPage: 1,
                        limit: 1,
                        totalVoucher: 0,
                        vouchers: []
                    })
                }
                else {
                    objectFilter._id = req.query.idVoucher
                }
            }
            if (req.query.status) {
                objectFilter.status = req.query.status
            }
            let [vouchers, totalVoucher] = await Promise.all([
                Voucher.find(objectFilter)
                    .populate('idUser')
                    .skip(startPage)
                    .limit(limit)
                    .lean(),
                Voucher.countDocuments(objectFilter)
            ])

            if (vouchers.length > 0) {
                vouchers = vouchers.map(voucher => {
                    if (voucher?.idUser) {
                        const { idUser, ...rest } = voucher
                        voucher = { ...rest, user: idUser }
                    }
                    return voucher
                })
            }
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
    }

    static async deleteVoucher(req, res, next) {
        const { _id } = req.params
        console.log(_id)
        try {
            const voucher = await Voucher.findOneAndUpdate({ _id: _id }, { deletedAt: new Date() })
            if (voucher) {
                return res.status(200).json({ status: 200, voucher })
            }
        }
        catch(error)
        {
            return res.status(500).json({ status: 500, error: `Fail when delete voucher : ${error.message}` })
        }
    }

    static async editVoucher(req, res, next) {
        const { _id } = req.params;
        const { discountVoucher, description, status, endDate } = req.body;
        try {
            const voucher = await Voucher.findOneAndUpdate({ _id }, { discountVoucher, description, status, endDate}, { new: true })
            if (voucher) {
                return res.status(200).json({ status: 200, voucher })
            }
        }
        catch(error) {
            return res.status(500).json({ status: 500, error: `Fail when edit voucher : ${error.message}` })
        }
    }F
}

