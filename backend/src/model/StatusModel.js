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
const createDefaultStatus = async () => {
    try {
        const statusCount = await Status.countDocuments();

        if (statusCount === 0) {
            await Status.create([
                { name: 'pending' },
                { name: 'success' },
                { name: 'cancel' },
            ]);
        } 
    } catch (error) {
        console.error('Error creating default roles:', error);
    }
};

createDefaultStatus();
export default Status