import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Participant } from "../../../models/participantSchema";

export async function POST(request) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    // Destructure request body
    const { eventTitle } = await request.json();

   

    // Validate input
    if (!eventTitle ) {
      return NextResponse.json({ message: "Invalid input", status: 400 });
    }

    // Check if a participant document already exists for this school/event/category
    const existingParticipants = await Participant.find({ eventId: eventTitle });

  

    return NextResponse.json({ participants: existingParticipants, message: "participants", status: 200 });


  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error adding participants", status: 500 });
  }
}
