import mongoose from "mongoose";

 const  ConnectDB = async () =>{
    try {
         await mongoose.connect(process.env.MONGODB_URI);
         console.log("MongoDB Connected")
    } catch (error) {
        console.log('Mongodb error not connect', error)
    }
}
export default ConnectDB;
