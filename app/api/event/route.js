// pages/api/events.js

import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Event } from "models/eventsSchema";

export async function POST(request) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    // Parse the request body
    const { eventTitle,eventDate,eventTime } = await request.json();

    // Validate input
    if (!eventTitle|| !eventDate || !eventTime) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check for duplicate event by title, date, and time
    const existingEvent = await Event.findOne({ eventTitle,eventDate,eventTime });
    if (existingEvent) {
      return NextResponse.json({ message: 'Event already added' }, { status: 409 });
    }

    // Create a new event
    const newEvent = new Event({ title: eventTitle,date:eventDate,time:eventTime });
    await newEvent.save();

    // Return success response
    return NextResponse.json({ message: 'Event Added' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
