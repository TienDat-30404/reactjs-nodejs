import Size from "../model/SizeModel.js";
const createDefaultSize = async () => {
    try {
        const sizeCount = await Size.countDocuments();
        
        if (sizeCount === 0) {
            await Size.create([
                { name: 'S', sizePriceMultiplier : 5 },
                { name: 'L', sizePriceMultiplier : 10},
                { name: 'XL', sizePriceMultiplier : 15},
                {name : 'XXL', sizePriceMultiplier : 30}
            ]);
        } 
    } catch (error) {
        console.error('Error creating default sizes:', error);
    }
};
export default createDefaultSize