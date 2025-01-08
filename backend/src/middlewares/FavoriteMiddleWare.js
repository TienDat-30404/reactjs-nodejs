// const Favorite = require('../model/FavoriteModel')
import Favorite from '../model/FavoriteModel.js'
const addFavoriteMiddleWare = async (req, res, next) => {
    try {
        const { idUser, idProduct } = req.body
        const response = await Favorite.countDocuments({ idUser, idProduct })
        console.log(response)
        if (response > 0) {
            return res.status(400).json({ 
                message: "Sản phẩm yêu thích đã thêm vào trước đó",
                status : 400
             })
        }

        next()
    }
    catch (err) {
        next(err)
    }
}

export { addFavoriteMiddleWare }