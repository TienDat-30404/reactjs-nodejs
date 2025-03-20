import Category from '../model/CategoryModel.js';

const createDefaultCategory = async () => {
    try {
        const categoryCount = await Category.countDocuments();
        
        if (categoryCount === 0) {
            await Category.create([
                { name: 'Áo nam', image: 'https://res.cloudinary.com/dtggoa1u7/image/upload/v1737019915/wwcdg59prk92sk7s3mgd.jpg' },
                { name: 'Sport', image: 'https://res.cloudinary.com/dtggoa1u7/image/upload/v1737016383/yrmkzsjcvxsr7zjce7no.jpg' },
                { name: 'Home & Kitchen', image: 'https://res.cloudinary.com/dtggoa1u7/image/upload/v1737016502/wgqzgpvxkksplby3dxze.png' },
                { name: 'Work', image: 'https://res.cloudinary.com/dtggoa1u7/image/upload/v1737016697/jjgfqzwjpnaylaoaxjbf.png' },
            ]);
            console.log('Default categories created successfully!');
        } else {
            console.log('Default categories already exist, skipping initialization.');
        }
    } catch (error) {
        console.error('Error creating default categories:', error);
    }
};

export default createDefaultCategory;
