import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= REGISTER =================
export const registerUser = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  try {
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || "user",
      status: (role === "admin") ? "active" : "pending"  // ⭐ IMPORTANT
    });

    res.status(201).json({
      message: "Registered successfully. Wait for admin approval.",
      user
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= LOGIN =================
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // ⭐ FIXED APPROVAL LOGIC
    if (user.role === "user" && user.status !== "active") {
      return res.status(403).json({
        message: "Admin approval required. Wait for admin approval."
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
  message: "Login successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status
  }
});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({ status: "pending" });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approveUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      status: "active"
    });

    res.json({ message: "User approved" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const rejectUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      status: "rejected"
    });

    res.json({ message: "User rejected" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }); 
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= GET PROFILE =================
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({ user });   // ✅ make response consistent

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE PROFILE =================
export const updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, phone },
      { new: true }
    ).select("-password");

    res.json({ user: updatedUser });   // ✅ FIXED (important)

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};