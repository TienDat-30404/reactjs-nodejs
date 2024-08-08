const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const CartSchema = new Schema(
    {
        idUser : {type : Number, ref : 'User', required : true},
        idProduct : {type : Number, ref : 'Product', required : true},
        quantity : {type : Number, required : true}
    },
    { timestamps: true });


// Thêm plugin AutoIncrement để tự động tăng giá trị của 'id'
CartSchema.plugin(AutoIncrement, { inc_field: 'idCart' });

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
