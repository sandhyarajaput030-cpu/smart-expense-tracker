import Expense from "../models/Expense.js";

export const getDashboard = async (req, res) => {
  try {
    const data = await Expense.find({
      userId: req.user.id
    }).sort({ createdAt: -1 });

    const income = data
      .filter(d => d.type === "income")
      .reduce((a, b) => a + b.amount, 0);

    const expense = data
      .filter(d => d.type === "expense")
      .reduce((a, b) => a + b.amount, 0);

    res.json({
      income,
      expense,
      balance: income - expense,
      transactions: data
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};