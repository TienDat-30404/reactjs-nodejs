
const multer = require('multer');
const path = require('path');

const storageAvatar= multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './src/utils/uploads/avatar');
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + path.extname(file.originalname));
    }
});
const uploadAvatar = multer({ storage: storageAvatar });

const storageProductImage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './src/utils/uploads/images');
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + path.extname(file.originalname));
    }
});
const uploadImageProduct = multer({ storage: storageProductImage });

module.exports = {uploadAvatar, uploadImageProduct}