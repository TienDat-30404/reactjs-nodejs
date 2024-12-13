const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema(
    {
        name: { type: String, required: true,},
        image : {type : String, require : true},
    },
    { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
