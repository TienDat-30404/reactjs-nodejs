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

export default Role
