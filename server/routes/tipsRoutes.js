import express from "express";
import {
  addTip,
  getAllTips,
  getMyTips,
  deleteTip,
  updateTip,
  getDailyTip,
  likeTip,
} from "../controller/tipsController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ➕ Add Tip
router.post("/add", authMiddleware, addTip);

// 📥 Get all tips (Admin)
router.get("/admin/all", authMiddleware, getAllTips);

// 👤 Get logged-in user tips
router.get("/my", authMiddleware, getMyTips);

// ❌ Delete tip
router.delete("/:id", authMiddleware, deleteTip);

router.put("/:id", authMiddleware, updateTip);

router.get("/daily", authMiddleware, getDailyTip);

router.put("/like/:id", authMiddleware, likeTip);

export default router;