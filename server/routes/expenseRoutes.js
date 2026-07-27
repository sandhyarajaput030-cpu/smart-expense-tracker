import express from "express";
import {
  addExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getAllExpensesAdmin,
  getAdminDashboard,
} from "../controller/expenseController.js";

import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

// ➕ Add Expense
router.post("/add", authMiddleware, addExpense);

// 📄 User expenses
router.get("/", authMiddleware, getExpenses);

// 👨‍💼 Admin - ALL expenses (ADD THIS HERE)
router.get(
  "/admin/all",
  authMiddleware,
  getAllExpensesAdmin
);

router.get("/admin/dashboard", authMiddleware, getAdminDashboard);

// 🔍 Get single expense
router.get("/:id", authMiddleware, getExpenseById);

// ✏️ Update
router.put("/:id", authMiddleware, updateExpense);

// ❌ Delete
router.delete("/:id", authMiddleware, deleteExpense);

export default router;