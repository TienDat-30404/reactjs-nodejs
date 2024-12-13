const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        idCategory: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, // Thay đổi ở đây
        description: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
