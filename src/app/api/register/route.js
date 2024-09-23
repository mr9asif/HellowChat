import connectDB from "@/db/connect";
import User from "@/modals/userSchema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req) =>{
    const {username, email, password} = await req.json();
    console.log("user router,", username, email, password)

    // db connect
    await connectDB();

    const hashPass = await bcrypt.hash(password, 10)
     const exist = await User.findOne({email})
     if(exist){
        return NextResponse.json({messege:"user already exist"}, {status:402})
     }
     try {
        await User.create({
            username,email, password:hashPass
         })
    
        return NextResponse.json({messege:"user created"}, {status:201})
     } catch (error) {
        console.log("server err", error)
     }
}