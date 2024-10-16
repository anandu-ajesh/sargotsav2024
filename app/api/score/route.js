import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { School } from "../../../models/schoolSchema";


export async function POST(request){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        const { schoolId, points, action,  eventName, category } = await request.json();

        const school = await School.findById(schoolId);

        if (!school) {
        return NextResponse.json({ message: "School not found", status: 404 });
        }
        const event = school.eventsParticipated.find(
            (e) => e.eventName === eventName && e.category === category
        );

        if (!event) {
            return NextResponse.json({ message: "Event not found", status: 404 });
        }

        if (action === 'bonus') {
            event.score += points;
        } else if (action === 'minus') {
            event.score = Math.max(0, event.score - points); // Ensure score doesn't go below 0
        } else {
            return NextResponse.json({ message: "Invalid action", status: 400 });
        }

        await school.save();

        return NextResponse.json({ message: "Score updated successfully", status: 200 });
    }catch(error){
        return NextResponse.json({ message: "Internal server error", status: 500 });
    }
}