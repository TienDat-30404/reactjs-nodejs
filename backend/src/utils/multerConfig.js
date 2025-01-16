
// const multer = require('multer');
// const path = require('path');

import multer from 'multer';
import path from 'path'

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

const storageCategoryImage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './src/utils/uploads/category');
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + path.extname(file.originalname));
    }
});
const uploadImageCategory = multer({ storage: storageCategoryImage });

export {uploadAvatar, uploadImageProduct, uploadImageCategory}