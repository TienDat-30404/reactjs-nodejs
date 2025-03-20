import Role from "../model/RoleModel.js";
const createDefaultRole = async () => {
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
export default createDefaultRole