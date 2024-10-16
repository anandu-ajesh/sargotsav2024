import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Participant } from "../../../models/participantSchema";

export async function POST(request) {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    // Destructure request body
    const { schoolId, eventId, category, participants } = await request.json();

    // Validate input
    if (!schoolId || !eventId || !category || !participants || !participants.length) {
      return NextResponse.json({ message: "Invalid input", status: 400 });
    }

    // Check if a participant document already exists for this school/event/category
    const existingParticipant = await Participant.findOne({ schoolId, eventId, category });

    if (existingParticipant) {
      // If the document exists, update it by adding new participants to the names array
      existingParticipant.names.push(...participants);
      await existingParticipant.save();
    } else {
      // Create a new participant document
      const newParticipant = new Participant({
        names: participants, // Store all participant names in the array
        schoolId,
        eventId,
        category,
      });
      await newParticipant.save();
    }

    return NextResponse.json({ message: "Participants added successfully", status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error adding participants", status: 500 });
  }
}
