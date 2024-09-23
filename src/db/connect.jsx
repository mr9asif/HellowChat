
import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const res = await mongoose.connect("mongodb://0.0.0.0:27017/HellowChat")
      console.log("mongoose connect successfully")
         

    } catch (error) {
        console.log("mongoose connection failed", error)
    }
} 

export default connectDB;