const express = require('express')
const router = express.Router()
const FavoriteController = require('../controller/FavoriteController')
router.get('/get-favorite-user', FavoriteController.getFavoriteOfUser)
router.post('/add-favorite', FavoriteController.addFavorite)
router.delete('/delete-favorite/:idFavorite', FavoriteController.deleteFavorite)
module.exports = router