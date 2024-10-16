import mongoose from 'mongoose';

// Participant schema
const participantSchema = new mongoose.Schema({
  names: {
    type: [String], // Array to store multiple participant names
    default: [],
  },
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',  // Reference to the School
    required: true,
  },
  eventId: {
    type: String, // Reference to the Event
    required: true,
  },
  category: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,  // Adds createdAt and updatedAt
});

export const Participant = mongoose.models.Participant || mongoose.model('Participant', participantSchema);
