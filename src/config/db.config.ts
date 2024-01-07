import mongoose from "mongoose"


const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://chaurasiyapardeep001:e-commerce-2024@cluster0.4484r16.mongodb.net/e_commerce_2024";
export const connectDB = () => {
    
    mongoose.connect(MONGO_URL)
    .then(()=>console.log("DB connected successfully"))
    .catch((e)=> console.log("Error in connecting DB",e))
}
