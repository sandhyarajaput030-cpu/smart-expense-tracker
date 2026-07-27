import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js"; // optional

import categoryRoutes from "./routes/categoryRoutes.js";   
import dashboardRoutes from "./routes/dashboardRoutes.js"; 

import budgetRoutes from "./routes/budgetRoutes.js";
import tipsRoutes from "./routes/tipsRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes); // optional

app.use("/api/categories", categoryRoutes);   
app.use("/api/dashboard", dashboardRoutes);

app.use("/api/budgets", budgetRoutes);
app.use("/api/tips", tipsRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 8000;
const URL = process.env.MONGOURL;

// MongoDB Connection
mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");

    app.listen(PORT, () => {
      console.log("Server is running on Port: " + PORT);
    });
  })
  .catch((error) => console.log("DB error:", error));