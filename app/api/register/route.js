import { Admin } from "../../../models/adminSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";




export async function POST(request){
    try {
        await mongoose.connect(process.env.MONGO_URI)
        const { username, password } = await request.json()
        // const salt = await bcryptjs.genSalt(5);
        // const hash = await bcryptjs.hash(password, salt)
        const user = await Admin.findOne({username})
        if(user){
            return NextResponse.json({message: 'user already exists'})
        }
        const newUser = new Admin({
            username,
            password
        })

        await newUser.save();

        return NextResponse.json({
            message: "User Created",
            status: 200,
          });

    } catch (error) {
        NextResponse.json({message: "Internal server error", status: 500, error})
    }
}