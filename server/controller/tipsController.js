import Tip from "../models/Tip.js";

// ➕ Add Tip
export const addTip = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const newTip = new Tip({
      title,
      description,
      category,
      user: req.user.id, // from auth middleware
    });

    await newTip.save();

    res.status(201).json({ message: "Tip added successfully", tip: newTip });
  } catch (error) {
    res.status(500).json({ message: "Error adding tip", error });
  }
};

// 📥 Get All Tips (Admin)
export const getAllTips = async (req, res) => {
  try {
    const tips = await Tip.find().populate("user", "name email");
    res.json(tips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tips", error });
  }
};

// 👤 Get User Tips
export const getMyTips = async (req, res) => {
  try {
    const tips = await Tip.find({
      $or: [
        { targetUsers: { $size: 0 } }, // visible to all
        { targetUsers: req.user.id }   // visible to selected user
      ]
    });

    res.json(tips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user tips", error });
  }
};

// ❌ Delete Tip
export const deleteTip = async (req, res) => {
  try {
    await Tip.findByIdAndDelete(req.params.id);
    res.json({ message: "Tip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting tip", error });
  }
};

export const updateTip = async (req, res) => {
  try {
    const updatedTip = await Tip.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTip);
  } catch (error) {
    res.status(500).json({ message: "Error updating tip" });
  }
};

export const getDailyTip = async (req, res) => {
  try {
    const tip = await Tip.findOne({ isDailyTip: true });
    res.json(tip);
  } catch (error) {
    res.status(500).json({ message: "Error fetching daily tip" });
  }
};

export const likeTip = async (req, res) => {
  try {
    const tip = await Tip.findById(req.params.id);

    const userId = req.user.id;

    if (tip.likes.includes(userId)) {
      // Unlike
      tip.likes = tip.likes.filter(id => id.toString() !== userId);
    } else {
      // Like
      tip.likes.push(userId);
    }

    await tip.save();
    res.json({ message: "Like updated" });

  } catch (error) {
    res.status(500).json({ message: "Error liking tip" });
  }
};

