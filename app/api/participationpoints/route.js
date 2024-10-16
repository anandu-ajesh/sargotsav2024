import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { School } from "models/schoolSchema";

export async function POST(request) {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const { schools, event, category } = await request.json();

        // Check if all fields are provided
        if (!schools || !event || !category) {
            return NextResponse.json({ message: "All fields are required", status: 400 });
        }

        // Iterate through each school and update their participation
        for (const schoolName of schools) {
            // Find the school by name
            const school = await School.findOne({ schoolName });

            if (!school) {
                return NextResponse.json({ message: `School ${schoolName} not found`, status: 404 });
            }

            // Check if the school already participated in the event
            const eventIndex = school.eventsParticipated.findIndex(
                (e) => e.eventName === event && e.category === category
            );

            if (eventIndex > -1) {
                // If event already exists
                return  NextResponse.json({  message: `School ${schoolName} has already participated in the event "${event}" for category "${category}".`, status: 400 });// Example: 10 points for participation
            } else {
                // If event does not exist, add new event participation
                school.eventsParticipated.push({
                    eventName: event,
                    score: 0, // Example: Initial score for participation
                    category: category
                });
            }

            // Save the updated school document
            await school.save();
        }

        return NextResponse.json({ message: "Participation updated successfully", status: 200 });
    } catch (error) {
        console.error("Error updating participation points:", error);
        return NextResponse.json({ message: "Internal server error", status: 500 });
    }
}
