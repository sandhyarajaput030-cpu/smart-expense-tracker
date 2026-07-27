import express from "express";
import {
  createBudget,
  getBudgets,
  deleteBudget,
  updateBudget,
} from "../controller/budgetController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBudget);
router.get("/", authMiddleware, getBudgets);
router.delete("/:id", authMiddleware, deleteBudget);
router.put("/:id", authMiddleware, updateBudget);
export default router;