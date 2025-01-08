import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const CategorySchema = new Schema(
    {
        name: { type: String, required: true,},
        image : {type : String, require : true},
        deletedAt : {type : Date, default : null}

    },
    { timestamps: true });

const Category = mongoose.model('Category', CategorySchema);
export default Category
