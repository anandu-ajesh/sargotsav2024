import mongoose from 'mongoose';

// Define the schema for the events participated
const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0  // Ensuring the score is a non-negative number
  },
  category:{
    type: String,
  }
});

// Define the schema for the school data
const schoolSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: true,

  },
  schoolCode: {
    type: String,
    required: true,
    unique: true,  // Ensures no duplicate school codes
    uppercase: true, // Stores school code in uppercase format

  },
  schoolLoc: {
    type: String,
    required: true,

  },
  eventsParticipated: {
    type: [eventSchema],  // List of events, using eventSchema
    default: []
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt fields
});

// Export the model
export const School = mongoose.models.School || mongoose.model('School', schoolSchema);

