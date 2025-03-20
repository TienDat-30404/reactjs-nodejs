import Product from '../model/ProductModel.js';
import Category from '../model/CategoryModel.js';

const createDefaultProduct = async () => {
    try {
        const categories = await Category.find();
        if (categories.length === 0) {
            console.log('Không có danh mục nào, bỏ qua tạo sản phẩm.');
            return;
        }

        const productCount = await Product.countDocuments();
        if (productCount === 0) {
            await Product.create([
                { name: 'Áo sơ mi nam', price: 300, idCategory: categories[0]._id, image : "https://res.cloudinary.com/dtggoa1u7/image/upload/v1740672084/kxypgtshjrkatibtubmf.jpg" },
                { name: 'Áo thun nữ', price: 200, idCategory: categories[1]?._id || categories[0]._id, image : "https://res.cloudinary.com/dtggoa1u7/image/upload/v1740672069/jruil2cgsewba6bfpw9c.jpg" },
                { name: 'Quần jean nam', price: 500, idCategory: categories[2]?._id || categories[0]._id, image : "https://res.cloudinary.com/dtggoa1u7/image/upload/v1740672055/rpqxzt0o8qf7gqdn8kgp.jpg" },
                { name: 'Váy maxi nữ', price: 700, idCategory: categories[3]?._id || categories[0]._id, image : "https://res.cloudinary.com/dtggoa1u7/image/upload/v1740672039/rkf4miqplmewplrnlfxo.jpg" }
            ]);
            

            console.log('Default products created successfully!');
        } else {
            console.log('Default products already exist, skipping initialization.');
        }
    } catch (error) {
        console.error('Error creating default products:', error);
    }
};

export default createDefaultProduct;
