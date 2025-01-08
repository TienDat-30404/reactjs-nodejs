import mongoose from 'mongoose';
const Schema = mongoose.Schema
const SizeSchema = new Schema(
    {
        name : {type : String },
        sizePriceMultiplier : {type : Number},
        deletedAt : {type : Date, default : null}
    },
    { timestamps: true }
)
const Size = mongoose.model('Size', SizeSchema)

const createDefaultSize = async () => {
    try {
        const sizeCount = await Size.countDocuments();
        
        if (sizeCount === 0) {
            await Size.create([
                { name: 'S', sizePriceMultiplier : 0.8 },
                { name: 'L', sizePriceMultiplier : 0.9},
                { name: 'XL', sizePriceMultiplier : 1},
                {name : 'XXL', sizePriceMultiplier : 1.2}
            ]);
        } 
    } catch (error) {
        console.error('Error creating default sizes:', error);
    }
};

createDefaultSize();

export default Size
