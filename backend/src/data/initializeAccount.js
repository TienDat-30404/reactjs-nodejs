import Account from '../model/AccountModel.js';
import Role from '../model/RoleModel.js';
import { hashPassword } from '../utils/validate.js';
const createDefaultAccount = async () => {
    try {
        const roles = await Role.find();
        if (roles.length === 0) {
            console.log('Not all role, ignore create account.');
            return;
        }

        const accountCount = await Account.countDocuments();
        if (accountCount === 0) {
            await Account.create([
                { userName: '1', email: '1@gmail.com', password: hashPassword('123456'), typeLogin: 'local', idRole: roles[0]?._id },
                { userName: '2', email: '2@gmail.com', password : hashPassword('123456'), typeLogin: 'local', idRole: roles[1]?._id  },
                { userName: '3', email: '3@gmail.com', password: hashPassword('123456'), typeLogin: 'local', idRole: roles[2]?._id },
                { userName: '4', email: '4@gmail.com', password: hashPassword('123456'), typeLogin: 'local', idRole: roles[3]?._id }
            ]);
            

            console.log('Default accounts created successfully!');
        } else {
            console.log('Default accounts already exist, skipping initialization.');
        }
    } catch (error) {
        console.error('Error creating default account:', error);
    }
};

export default createDefaultAccount;
