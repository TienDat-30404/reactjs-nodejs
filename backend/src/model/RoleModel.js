import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RoleSchema = new Schema(
    {
        name: { type: String, required: true },
        deletedAt : {type : Date, default : null}
    },
    { timestamps: true }
);


const Role = mongoose.model('Role', RoleSchema);

// Hàm khởi tạo dữ liệu mặc định
const createDefaultRoles = async () => {
    try {
        // Kiểm tra xem collection đã có dữ liệu hay chưa
        const roleCount = await Role.countDocuments();
        
        if (roleCount === 0) {
            await Role.create([
                { name: 'Admin' },
                { name: 'Manager' },
                { name: 'Staff' },
                {name : 'Customer'}
            ]);
        } else {
            console.log('Roles already exist');
        }
    } catch (error) {
        console.error('Error creating default roles:', error);
    }
};

// Gọi hàm khởi tạo khi ứng dụng khởi động
createDefaultRoles();

export default Role
