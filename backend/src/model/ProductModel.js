const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        name: { type: String },
        image: { type: String },
        idCategory: { type: Schema.Types.ObjectId, ref: 'Category' },
        description: { type: String },
        deletedAt: { type: Date, default: null },
    
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

ProductSchema.virtual('productAttributes', {
    ref: 'ProductAttribute', 
    localField: '_id',      
    foreignField: 'idProduct', 
});

ProductSchema.virtual('discount', {
    ref: 'Discount', 
    localField: '_id',      
    foreignField: 'idProduct', 
});

ProductSchema.virtual('reviews', {
    ref : 'Review',
    localField : '_id',
    foreignField : 'idProduct'
})


const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
