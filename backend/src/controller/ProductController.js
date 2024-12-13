const Product = require('../model/ProductModel')
const cloudinary = require('../config/cloudinary');

// [GET] /add-product

const addProduct = async (req, res, next) => {
    try {
        const { name, price, quantity, idCategory, description } = req.body
        const result = await cloudinary.uploader.upload(req.file.path);
        // console.log(result)
        if (!req.file) {
            return res.status(400).json({ error: "File image is required." });
        }
        const newProduct = new Product({ name, image: result.secure_url, price, quantity, idCategory, description })
        await newProduct.save()
        return res.status(200).json({ newProduct })
    }
    catch (error) {
        next(error)
    }
}

// [PUT] /update-product/:idProduct
const updateProduct = async (req, res, next) => {
    const idProduct = req.params._id
    console.log(idProduct)

    const { name, price, quantity, idCategory, description } = req.body
    const product = await Product.findOne({ _id: idProduct })
    const newData = {
        name: name,
        image: product.image,
        price: price,
        quantity: quantity,
        idCategory: idCategory,
        description: description,
    };
    if (req.file) {
        const fileImage = await cloudinary.uploader.upload(req.file.path);
        newData.image = fileImage.secure_url
    }
    await Product.updateOne({ _id: idProduct }, newData)
    return res.status(200).json({
        newData,
        message: "Update Successfully"
    })

}

// [DELETE] /delete-product/:idProduct
const deleteProduct = async (req, res, next) => {
    try {
        const idProduct = req.params.idProduct
        const delProduct = await Product.deleteOne({ _id: idProduct })
        if (delProduct.deletedCount > 0) {
            return res.status(200).json({
                message: "Delete Product Successfully"
            })
        }
        else {
            return res.status(400).json({
                message: "Delete product Fail"
            })
        }
    }
    catch (error) {
        next(error)
    }

}
const getAllProduct = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const startPage = (page - 1) * limit;

        const sortBy = req.query.sortBy || 'idProduct';
        const type = req.query.type === "asc" ? 1 : -1; // Tăng dần hoặc giảm dần
        const objectSort = {};
        objectSort[sortBy] = type;

        const objectFilter = {};
        if (req.query.idProduct) {
            objectFilter._id = req.query.idProduct;
        }
        if (req.query.idCategory) {
            objectFilter.idCategory = req.query.idCategory;
        }

        if (req.query.search) {
            objectFilter.name = new RegExp(req.query.search, 'i');
        }

        if (req.query.priceFrom && req.query.priceTo) {
            const priceFrom = parseFloat(req.query.priceFrom);
            const priceTo = parseFloat(req.query.priceTo);
            objectFilter.price = { $gte: priceFrom, $lte: priceTo };
        }

        if (req.query.quantity) {
            const quantity = parseInt(req.query.quantity);
            objectFilter.quantity = { $lte: quantity };
        }

        const totalProduct = Object.keys(objectFilter).length === 0
            ? await Product.countDocuments({})
            : await Product.countDocuments(objectFilter);

        let products;
        if (page) {
            products = await Product.find(objectFilter)
                .skip(startPage)
                .limit(limit)
                .sort(objectSort)
                .populate('idCategory')
                .lean();
        } else {
            products = await Product.find(objectFilter)
                .sort(objectSort)
                .populate('idCategory')
                .lean();
        }

        products = products.map(product => {
            if (product.idCategory) {
                product.category = product.idCategory;
                delete product.idCategory;
            }
            return product;
        });

        const totalPage = page ? Math.ceil(totalProduct / limit) : 'all';
        return res.status(200).json({
            products,
            page,
            totalProduct,
            totalPage,
            objectSort,
            limit,
        });
    } catch (error) {
        next(error);
    }
};



// [GET] /detail-product/:idProduct
const getDetailProduct = async (req, res, next) => {
    try {
        const idProduct = req.params._id
        const detailProduct = await Product.findOne({ _id: idProduct })
        if (detailProduct == null) {
            return res.status(400).json({
                message: "Fail Detail Product"
            })
        }
        return res.status(200).json({
            detailProduct
        })
    }
    catch (error) {
        next(error)
    }
}

const getPrice = async (req, res, next) => {
    const priceFrom = req.query.priceFrom
    const priceTo = req.query.priceTo
    const result = await Product.find({ price: { $gte: priceFrom, $lte: priceTo } })
    const g = await Product.countDocuments({ price: { $gte: priceFrom, $lte: priceTo } })
    return res.status(200).json({
        result
    })
}


module.exports = { addProduct, updateProduct, deleteProduct, getAllProduct, getDetailProduct, getPrice }