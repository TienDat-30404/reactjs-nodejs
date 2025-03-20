import Account from "../model/AccountModel.js";
import User from "../model/UserModel.js"
const createDefaultUser = async () => {
    try {
        const accounts = await Account.find();
        if (accounts.length === 0) {
            console.log('Not all account, ignore create user.');
            return;
        }

        const userCount = await User.countDocuments();
        if (userCount === 0) {
            await User.create([
                { name: 'User 1', address: '123 Admin Street', phone: '0923456789', date_of_birth: '1990-01-01', sex: 'Nam', avatar: '', idAccount: accounts[0]?._id },
                { name: 'User 2', address: '456 User Lane', phone: '0987654321', date_of_birth: '1995-05-10', sex: 'Nữ', avatar: '', idAccount: accounts[1]?._id },
                { name: 'User 3', address: '789 VVK', phone: '0987654322', date_of_birth: '1998-06-10', sex: 'Nữ', avatar: '', idAccount: accounts[2]?._id },
                { name: 'User 4', address: 'TPHCM', phone: '0981254322', date_of_birth: '1992-06-10', sex: 'Nam', avatar: '', idAccount: accounts[3]?._id }

            ]);
            

            console.log('Default users created successfully!');
        } else {
            console.log('Default users already exist, skipping initialization.');
        }
    } catch (error) {
        console.error('Error creating default user:', error);
    }
};

export default createDefaultUser;
