import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const AccountSchema = new Schema(
    {
        userName: { type: String, required : true},
        email: { type: String, default: null}, 
        password: { type: String, default: '' },
        typeLogin: { type: String, required: true },
        idRole: { type: Schema.Types.ObjectId, ref: 'Role' },
        deletedAt : {type : Date, default : null}
    },
    { timestamps: true });


const Account = mongoose.model('Account', AccountSchema);
// module.exports = Account;
export default Account
