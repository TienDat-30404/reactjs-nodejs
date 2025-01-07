const Product = require('../model/ProductModel')
const Size = require('../model/SizeModel')
const ProductAttribute = require('../model/ProductAttribute')
const cloudinary = require('../config/cloudinary');
const mongoose = require('mongoose')
const getAllProduct = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const startPage = (page - 1) * limit;

        const sortBy = req.query.sortBy || 'idProduct';
        const type = req.query.type === "asc" ? 1 : -1;
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
            objectFilter.name = { $regex: req.query.search, $options: 'i' };
        }

        let productIds = null;
        if (req.query.priceFrom && req.query.priceTo) {
            const priceFrom = parseFloat(req.query.priceFrom);
            const priceTo = parseFloat(req.query.priceTo);
            let query = { priceBought: { $gte: priceFrom, $lte: priceTo } }
            if (sortBy && type) {
                query = ProductAttribute.find(query).sort(objectSort)
            }
            else {
                query = ProductAttribute.find(query)
            }

            const attributes = await query.select('idProduct');
            productIds = attributes.map(attr => attr.idProduct);
        }
        else if (sortBy && type) {
            const attributes = await ProductAttribute.find({}).sort(objectSort).select('idProduct')
            productIds = attributes.map(attr => attr.idProduct);

        }

        if (productIds) {
            objectFilter._id = { $in: productIds };
        }

        let [products, totalProduct] = await Promise.all([
            Product.find(objectFilter)
                .skip(startPage)
                .limit(limit)
                .populate('idCategory')
                .populate('discount')
                .populate('reviews')
                .populate({
                    path: 'productAttributes',
                    populate: {
                        path: 'idSize',
                        model: 'Size',
                    },
                })
                .lean(),
            Product.countDocuments(objectFilter)
        ])

if (productIds) {
    const productIdsString = productIds.map(id => id.toString());
    products = products.sort((a, b) =>
        productIdsString.indexOf(a._id.toString()) - productIdsString.indexOf(b._id.toString())
    );
}

const formattedProducts = products.map(product => {
    product.productAttributes.map(item => {
        item.size = item.idSize;
        delete item.idSize;
    });
    if (product.idCategory) {
        product.category = product.idCategory;
        delete product.idCategory;
    }
    return product;
});

const totalPage = Math.ceil(totalProduct / limit);
return res.status(200).json({
    products: formattedProducts,
    page,
    totalProduct,
    totalPage,
    objectSort,
    limit,
});
    } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error: error.message });
}
};


const addProduct = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction()
    try {
        const { name, idCategory, description, sizes } = req.body
        // const result = await cloudinary.uploader.upload(req.file.path);
        // // console.log(result)
        // if (!req.file) {
        //     return res.status(400).json({ error: "File image is required." });
        // }
        const dataProduct = new Product(
            {
                name,
                // image: result.secure_url, 
                idCategory,
                description,
            }
        )
        const savedProduct = await dataProduct.save()
        const size = await Size.findOne({ name: 'L' })
        const selectedSize = sizes ? sizes : size._id;

        if (!selectedSize || !Array.isArray(selectedSize) || selectedSize.length === 0) {
            return res.status(400).json({ message: "Vui lòng chọn thuộc tính sản phẩm" });
        }
        const productAttributesPromises = selectedSize.map(async (idSize) => {
            const productAttribute = new ProductAttribute({
                idProduct: savedProduct._id,
                idSize: idSize,
                quantity: 0
            });
            await productAttribute.save();
        });

        await Promise.all(productAttributesPromises);
        let product = await Product.findOne({ _id: savedProduct._id })
            .populate('idCategory')
            .populate(
                {
                    path: 'productAttributes',
                    populate: {
                        path: 'idSize',
                        model: 'Size'
                    }
                }
            )
        product = product.toObject()
        product.productAttributes.map(item => {
            if (item.idSize) {
                item.size = item.idSize
                delete item.idSize
            }
            return item
        })
        if (product.idCategory) {
            product.category = product.idCategory;
            delete product.idCategory;
        }

        await session.commitTransaction()
        session.endSession()

        return res.status(200).json({ product })
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

// [PUT] /update-product/:_id
const updateProduct = async (req, res, next) => {
    const idProduct = req.params._id

    const { name, idCategory, description, sizes } = req.body

    await Product.updateOne({ _id: idProduct }, {
        name,
        // image : product.image,  
        idCategory,
        description
    })

    if (sizes && sizes.length > 0) {
        for (let i = 0; i < sizes.length; i++) {
            try {
                const productAttribute = new ProductAttribute({
                    idProduct,
                    idSize: sizes[i],
                    quantity: 0,
                })
                await productAttribute.save()
            }
            catch (error) {
                return res.status(400).json(
                    {
                        message: "Lỗi khi lưu productAttribute"
                    }
                )
            }
        }
    }

    let product = await Product.findOne({ _id: idProduct })
        .populate('idCategory')
        .populate(
            {
                path: 'productAttributes',
                populate: {
                    path: 'idSize',
                    model: 'Size'
                }
            }
        )
    product = product.toObject()
    product.productAttributes.map(item => {
        if (item.idSize) {
            item.size = item.idSize
            delete item.idSize
        }
        return item
    })
    if (product.idCategory) {
        product.category = product.idCategory;
        delete product.idCategory;
    }

    return res.status(200).json({
        product,
        message: "Update Successfully"
    })

}

// [DELETE] /delete-product/:idProduct
const deleteProduct = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction()
    try {
        const idProduct = req.params.idProduct
        const result = await Product.updateOne({ _id: idProduct }, {
            deletedAt: new Date()
        })

        await ProductAttribute.updateMany({ idProduct: idProduct }, {
            deletedAt: new Date()
        })
        await session.commitTransaction()
        session.endSession()
        return res.status(200).json({ message: "Xóa thành công" })
    }
    catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }

}




// [GET] /detail-product/:idProduct
const getDetailProduct = async (req, res, next) => {
    try {
        const idProduct = req.params._id
        let detailProduct = await Product.findOne({ _id: idProduct })
            .populate('idCategory')
            .populate('discount')
            .populate('reviews')
            .populate(
                {
                    path: 'productAttributes',
                    populate: {
                        path: 'idSize',
                        model: 'Size'
                    }
                }
            )

        detailProduct = detailProduct.toObject()
        detailProduct.productAttributes.map(item => {
            if (item.idSize) {
                item.size = item.idSize
                delete item.idSize
            }
            return item
        })
        if (detailProduct.idCategory) {
            detailProduct.category = detailProduct.idCategory;
            delete detailProduct.idCategory;
        }
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