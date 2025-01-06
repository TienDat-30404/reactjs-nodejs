const mongoose = require('mongoose')
const Schema = mongoose.Schema
const FavoriteSchema = new Schema(
    {
        idUser : {type : Schema.Types.ObjectId, ref : 'User'},
        idProduct : {type : Schema.Types.ObjectId, ref : 'Product'}
    }, 
    {
        timestamps : true
    }
)
const Favorite = mongoose.model('Favorite', FavoriteSchema)
module.exports = Favorite