import mongoose from "mongoose";
import { Schema } from "mongoose";
const SchemaStatus = Schema(
    {
        name: { type: String },
        deletedAt: { type: Date, default: null }
    },
    {
        timestamps: true
    }
)
const Status = mongoose.model('Status', SchemaStatus)

export default Status