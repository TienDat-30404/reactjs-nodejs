import initializeData from "../data/initializeData.js";
import mongoose from "mongoose";
async function connectDB() {
    try {
        console.log("Connect successfully")
        const connectionString = process.env.MONGODB_URL;
        // await mongoose.connect(`mongodb://mongo:27017/tiki`)
        await mongoose.connect(connectionString)

        // await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.NAMEDB}`)

        .then(() => {
            initializeData()
        })


    } catch (error) {
        console.log(error)
    }
}
export default connectDB;
