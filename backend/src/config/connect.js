import initializeData from "../data/initializeData.js";
import mongoose from "mongoose";
async function connectDB() {
    try {
        console.log("Connect successfully")
        await mongoose.connect(`mongodb://mongo:27017/mydatabase`)
        .then(() => {
            initializeData()
        })


    } catch (error) {
        console.log(error)
    }
}
export default connectDB;
