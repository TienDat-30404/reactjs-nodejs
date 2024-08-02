const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AutoIncrement = require('mongoose-sequence')(mongoose)
const ProductSchema = new Schema(
    {
        name : {type : String, required : true, unique : true},
        image : {type : String, required : true},
        price : {type : Number, required : true},
        quantity : {type : Number , required : true},
        idCategory : {type : Number, ref : 'Category', required : true},
        description : {type : String, required : true}
    }, 
    {
        timestamps : true
    }
)
ProductSchema.plugin(AutoIncrement, { inc_field: 'idProduct' });
const Product = mongoose.model('Product', ProductSchema)
module.exports = Product
