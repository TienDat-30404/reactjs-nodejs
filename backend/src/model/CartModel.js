const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CartSchema = new Schema(
    {
        idUser : {type: Schema.Types.ObjectId, ref : 'User', required : true},
        idAttribute : {type: Schema.Types.ObjectId, ref : 'ProductAttribute', required : true},
        quantity : {type : Number, default : 1, required : true},
        deletedAt : {type : Date, default : null}

    },
    { timestamps: true });



const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
