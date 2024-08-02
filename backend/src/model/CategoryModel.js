const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
const CategorySchema = new Schema(
    {
        name: { type: String, required: true,},
        image : {type : String, require : true},
    },
    { timestamps: true });


// Thêm plugin AutoIncrement để tự động tăng giá trị của 'id'
CategorySchema.plugin(AutoIncrement, { inc_field: 'idCategory' });

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;
