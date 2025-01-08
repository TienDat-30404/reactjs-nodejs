import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        name: { type: String, required: true,},
        address : {type : String, default : ''},
        phone : {type : String, default : ''},
        date_of_birth : {type : String, default : ''},
        sex : {type : String, default : ''},
        avatar : {type : String, default : ''},
        idAccount : {type: Schema.Types.ObjectId, required : true, default : 1, ref: 'Account'},
        deletedAt : {type : Date, default : null}

    },
    { timestamps: true });




const User = mongoose.model('User', UserSchema);
export default User
