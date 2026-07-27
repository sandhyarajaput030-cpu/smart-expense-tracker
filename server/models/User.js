import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  // ⭐ ADD THIS
  status: {
    type: String,
    enum: ["pending", "active", "rejected"],
    default: "pending"
  }
});

export default mongoose.model("User", userSchema);