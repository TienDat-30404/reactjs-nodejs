import Supplier from '../model/SupplierModel.js';

const createDefaultSupplier = async () => {
    try {
        const supplierCount = await Supplier.countDocuments();

        if (supplierCount === 0) {
            await Supplier.create([
                { name: 'ABC Textiles', phone: '0123456789', address: '123 Fashion Street, NY', email: 'abc@textiles.com' },
                { name: 'Global Apparel', phone: '0987654321', address: '456 Clothing Ave, LA', email: 'contact@globalapparel.com' },
                { name: 'Trendy Wear', phone: '0345678912', address: '789 Trendy Blvd, TX', email: 'info@trendywear.com' },
                { name: 'Thomas Win123', phone: '0925678912', address: '789 KilGroth', email: 'evc@gmail.com' }

            ]);

            console.log('Default suppliers created successfully!');
        }
    } catch (error) {
        console.error('Error creating default suppliers:', error);
    }
};

export default createDefaultSupplier;
