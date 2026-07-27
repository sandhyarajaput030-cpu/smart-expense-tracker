import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getPendingUsers,
  approveUser,
  rejectUser,
  getProfile,
  updateProfile
} from "../controller/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// AUTH
router.post("/register", registerUser);
router.post("/login", loginUser);

// ADMIN ONLY (you can protect later with middleware)
router.get("/pending", getPendingUsers);
router.put("/approve/:id", approveUser);
router.put("/reject/:id", rejectUser);
router.get("/all", getAllUsers);

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

export default router;