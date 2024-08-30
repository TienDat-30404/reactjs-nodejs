const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');
const authencationMiddleWare = require('../middlewares/authencationMiddleWare')
const ProductController = require('../controller/ProductController')
const {validateAddProduct, validateUpdateProduct} = require('../middlewares/ProductMiddleWare')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './src/routes/uploads/images');
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post('/add-product', upload.single('image'), validateAddProduct, ProductController.addProduct)
router.put('/update-product/:idProduct', validateUpdateProduct, ProductController.updateProduct)
router.delete('/delete-product/:idProduct', authencationMiddleWare, ProductController.deleteProduct)
router.get('/get-all-product', ProductController.getAllProduct)
router.get('/detail-product/:idProduct', ProductController.getDetailProduct)
router.get('/price', ProductController.getPrice)
module.exports = router
