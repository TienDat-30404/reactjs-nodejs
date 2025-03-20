import mongoose from "mongoose";
import Role from "./RoleModel.js";
const Schema = mongoose.Schema
const RoleDetailSchema = new Schema(
    {
        idRole: { type: Schema.Types.ObjectId, ref: 'Role' },
        action: { type: String },
        allow: { type: Boolean },
        deletedAt: { type: Date, default: null }
    },
    {
        timestamps: true
    }
)
const RoleDetail = mongoose.model('RoleDetail', RoleDetailSchema)

export default RoleDetail