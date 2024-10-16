// pages/api/events.js

import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Event } from "models/eventsSchema";
import {School} from "models/schoolSchema"

export async function POST(request) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    // Check for duplicate event by title, date, and time
    const existingEvent = await Event.find({});
    const existingSchools= await School.find({});
   
 

    const response={
        schools: existingSchools,
        events: existingEvent,
    }

    
    // Return success response
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
