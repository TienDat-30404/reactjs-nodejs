const express = require('express')
const router = express.Router()
const FavoriteController = require('../controller/FavoriteController')
const {addFavoriteMiddleWare} = require('../middlewares/FavoriteMiddleWare')
router.get('/get-favorite-user', FavoriteController.getFavoriteOfUser)
router.post('/add-favorite', addFavoriteMiddleWare, FavoriteController.addFavorite)
router.delete('/delete-favorite/:idFavorite', FavoriteController.deleteFavorite)
module.exports = router