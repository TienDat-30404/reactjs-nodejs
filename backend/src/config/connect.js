const mongoose = require('mongoose')
async function connectDB() {
    try {
        console.log("Connect successfully")
        await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.NAMEDB}`)
    } catch (error) {
        console.log(error)
    }
}
module.exports = { connectDB };
