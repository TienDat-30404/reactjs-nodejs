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

const createDefaultRoles = async () => {
    try {
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

createDefaultRoles();

export default Role
