import express from 'express';
import FavoriteController from '../controller/FavoriteController.js';
import { addFavoriteMiddleWare } from '../middlewares/FavoriteMiddleWare.js';

const router = express.Router();

router.get('/get-favorite-user', FavoriteController.getFavoriteOfUser)
router.post('/add-favorite', addFavoriteMiddleWare, FavoriteController.addFavorite)
router.delete('/delete-favorite/:idFavorite', FavoriteController.deleteFavorite)
export default router