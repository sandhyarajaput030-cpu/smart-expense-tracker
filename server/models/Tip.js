import mongoose from "mongoose";

const tipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },

    // 👤 Admin/User who created tip
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // 🎯 Target users (for selected users feature)
    targetUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // ❤️ Likes
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // ⭐ Daily Tip flag
    isDailyTip: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Tip = mongoose.model("Tip", tipSchema);

export default Tip;