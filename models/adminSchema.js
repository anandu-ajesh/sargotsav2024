import mongoose from 'mongoose'

const AdminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    })
  
  // Export the model
 export const Admin = mongoose.models.admin || mongoose.model('admin', AdminSchema);

  