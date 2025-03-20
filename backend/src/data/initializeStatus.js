
import Status from "../model/StatusModel.js";
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
export default createDefaultStatus
