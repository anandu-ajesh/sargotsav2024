import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { School } from "../../../models/schoolSchema";

export async function POST(request){
    try {
       await mongoose.connect(process.env.MONGO_URI)
       const {schoolName, schoolCode, schoolLoc} = await request.json();
       const school = await School.findOne({schoolCode})
       if(school) {
        return NextResponse.json({message: 'already added'})
       }
       const newSchool = new School({schoolName, schoolCode, schoolLoc})
       await newSchool.save()
       return  NextResponse.json({message: 'school Added'})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'Internal server error', status: 500})
    }
}