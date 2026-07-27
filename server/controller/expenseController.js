import Expense from "../models/Expense.js";


// ================= ADD EXPENSE =================
export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date, type } = req.body;

    const expense = await Expense.create({
  userId: req.user.id,
  title,
  amount,
  category,
  type,
  date: date || new Date()
});

    res.status(201).json({
      message: "Expense added successfully",
      expense
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= GET ALL EXPENSES (USER ONLY) =================
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });

    res.json(expenses);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= GET SINGLE EXPENSE =================
export const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(expense);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= UPDATE EXPENSE =================
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({
      message: "Expense updated successfully",
      expense
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ================= DELETE EXPENSE =================
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= ADMIN: GET ALL EXPENSES =================
export const getAllExpensesAdmin = async (req, res) => {
  try {
    // 🔐 ADMIN PROTECTION
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied - Admin only" });
    }

    const expenses = await Expense.find()
      .populate("userId", "name email");

    res.json(expenses);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= ADMIN: MONTHLY DASHBOARD =================
export const getAdminDashboard = async (req, res) => {
  try {
    // 🔐 Admin check
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied - Admin only" });
    }

    // ✅ Get all transactions
    const transactions = await Expense.find();

    res.json({
      transactions
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};