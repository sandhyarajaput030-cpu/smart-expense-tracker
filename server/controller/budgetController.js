import Budget from "../models/Budget.js";
import Expense from "../models/Expense.js";

// ================= CREATE BUDGET =================
export const createBudget = async (req, res) => {
  try {
    const start = new Date(req.body.startDate);

    const budget = await Budget.create({
      user: req.user.id,
      category: req.body.category,
      budgetAmount: req.body.budgetAmount,

      // ✅ FIXED
      month: start.getMonth(),        // 0–11
      year: start.getFullYear(),      // 2026

      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });

    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET ALL BUDGETS =================
export const getBudgets = async (req, res) => {
  try {
    const { month, year } = req.query;

    const budgets = await Budget.find({
      user: req.user.id,
      month: Number(month),
      year: Number(year),
    });

    const budgetsWithSpent = await Promise.all(
      budgets.map(async (budget) => {

        const expenses = await Expense.find({
          userId: req.user.id,
          category: budget.category,
          type: "expense",
        });

        const filteredExpenses = expenses.filter((e) => {
          const d = new Date(e.date);
          return (
            d.getMonth() === Number(month) &&
            d.getFullYear() === Number(year)
          );
        });

        const spent = filteredExpenses.reduce(
          (total, item) => total + item.amount,
          0
        );

        return {
          ...budget._doc,
          spent,
        };
      })
    );

    res.json(budgetsWithSpent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE BUDGET =================
export const deleteBudget = async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);

    res.json({ message: "Budget deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE BUDGET =================
export const updateBudget = async (req, res) => {
  try {
    const { budgetAmount } = req.body;

    const updated = await Budget.findByIdAndUpdate(
      req.params.id,
      { budgetAmount },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};