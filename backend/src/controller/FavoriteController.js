const Favorite = require('../model/FavoriteModel')
const mongoose = require('mongoose')
const getFavoriteOfUser = async (req, res, next) => {
    try {
        const idUser = req.query.idUser
        // const { idUser } = req.body
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 2
        const startPage = (page - 1) * limit
        let [favorites, totalFavorite] = await Promise.all([
            Favorite.find({ idUser })
                .skip(startPage)
                .limit(limit)
                .populate('idUser')
                .populate({
                    path: 'idProduct',
                    populate: {
                        path: 'productAttributes',
                        model: 'ProductAttribute'
                    }
                })
                .lean(),
            Favorite.countDocuments({ idUser })
        ])

        favorites = favorites.map((favorite) => {
            if (favorite?.idUser) {
                favorite.user = favorite.idUser
                delete favorite.idUser
            }
            if (favorite?.idProduct) {
                favorite.product = favorite.idProduct
                delete favorite.idProduct
            }
            return favorite
        })

        const totalPage = Math.ceil(totalFavorite / limit)
        return res.status(200).json(
            {
                favorites,
                page,
                limit,
                totalFavorite,
                totalPage,
                status: 200
            }
        )
    }
    catch (err) {
        return res.status(500).json({ message: `Fail when get favorite of user : ${err}` })
    }

}

const addFavorite = async (req, res, next) => {
    try {
        const { idUser, idProduct } = req.body
        const savedFavorite = await Favorite.create({
            idUser,
            idProduct
        })
        let favorite = await Favorite.findById(savedFavorite._id)
            .populate('idUser')
            .populate({
                path: 'idProduct',
                populate: {
                    path: 'productAttributes',
                    model: 'ProductAttribute'
                }
            })
            .lean()

        if (favorite?.idUser) {
            favorite.user = favorite.idUser
            delete favorite.idUser
        }
        if (favorite?.idProduct) {
            favorite.product = favorite.idProduct
            delete favorite.idProduct
        }
        return res.status(201).json({ favorite })
    }
    catch (err) {
        return res.status(500).json({ message: `Fail when add favorite : ${err}` })
    }


}


const deleteFavorite = async (req, res, next) => {
    try {
        const idFavorite = req.params.idFavorite
        if (!mongoose.Types.ObjectId.isValid(idFavorite)) {
            return res.status(400).json({ message: 'ID không hợp lệ' });
        }
        const response = await Favorite.deleteOne({ _id: idFavorite })
        if (response.deletedCount === 0) {
            return res.status(404).json({ message: 'Không tìm thấy favorite cần xóa' });
          }
        return res.status(200).json({ message: "Xóa thành công", status : 200 })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: `Lỗi khi xóa favorite ${err}`,
        })
    }

}
module.exports = { getFavoriteOfUser, addFavorite, deleteFavorite }