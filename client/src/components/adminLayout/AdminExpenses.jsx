import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function AdminExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  

  // ================= FETCH =================
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://smart-expense-tracker-rgea.onrender.com/api/expenses/admin/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setExpenses(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= MONTH FILTER =================
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  const monthlyExpenses = expenses.filter((e) => {
    const d = new Date(e.date);
    return (
      d.getMonth() === currentMonth &&
      d.getFullYear() === currentYear
    );
  });

  // ================= SUMMARY (FIXED) =================
  const totalExpenses = monthlyExpenses
    .filter((e) => e.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const totalIncome = monthlyExpenses
    .filter((e) => e.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const balance = totalIncome - totalExpenses;

  const totalUsers = new Set(
    expenses.map((e) => e.userId?._id).filter(Boolean)
  ).size;

  // ================= CHART DATA =================

  const categoryMap = {};

  monthlyExpenses.forEach((e) => {
    if (e.type === "expense") {
      categoryMap[e.category] =
        (categoryMap[e.category] || 0) + e.amount;
    }
  });

  const pieData = {
    labels: Object.keys(categoryMap).length
      ? Object.keys(categoryMap)
      : ["No Data"],
    datasets: [
      {
        data: Object.values(categoryMap).length
          ? Object.values(categoryMap)
          : [1],
        backgroundColor: [
          "#3b82f6",
          "#ef4444",
          "#f97316",
          "#eab308",
          "#14b8a6",
        ],
      },
    ],
  };

  const barData = {
    labels: ["Selected Month"],
    datasets: [
      {
        label: "Income",
        data: [totalIncome],
        backgroundColor: "#16a34a",
      },
      {
        label: "Expense",
        data: [totalExpenses],
        backgroundColor: "#dc2626",
      },
    ],
  };

  return (
    <div style={container}>
      <h2 style={{ textAlign: "center", color: "#161313" }}>
        Admin Dashboard
      </h2>

      {/* ================= MONTH NAV ================= */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={() => {
            const d = new Date(selectedDate);
            d.setMonth(d.getMonth() - 1);
            setSelectedDate(d);
          }}
        >
          ⬅ Prev
        </button>

        <h3>
          {selectedDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h3>

        <button
          onClick={() => {
            const d = new Date(selectedDate);
            d.setMonth(d.getMonth() + 1);
            setSelectedDate(d);
          }}
        >
          Next ➡
        </button>
      </div>

      {/* ================= CARDS ================= */}
      <div style={cardGrid}>
        <div style={{ ...card, background: "#3498db" }}>
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>

        <div style={{ ...card, background: "#e74c3c" }}>
          <h3>Total Expenses</h3>
          <p>₹ {totalExpenses}</p>
        </div>

        <div style={{ ...card, background: "#2ecc71" }}>
          <h3>Total Income</h3>
          <p>₹ {totalIncome}</p>
        </div>

        <div style={{ ...card, background: "#9b59b6" }}>
          <h3>Balance</h3>
          <p>₹ {balance}</p>
        </div>
      </div>

      {/* ================= CHARTS ================= */}
      <div style={charts}>
        <div style={chartBox}>
          <h3>📊 Expense by Category</h3>
          <div style={chartInner}>
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div style={chartBox}>
          <h3>📈 Income vs Expense</h3>
          <div style={chartInner}>
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div style={tableBox}>
        <h3 style={{ textAlign: "center" }}>All User Expenses</h3>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#667eea", color: "#fff" }}>
              <th style={thStyle}>User</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Date</th>
            </tr>
          </thead>

          <tbody>
            {monthlyExpenses.length > 0 ? (
              monthlyExpenses.map((exp) => (
                <tr key={exp._id}>
                  <td style={tdStyle}>{exp.userId?.name || "N/A"}</td>
                  <td style={tdStyle}>{exp.userId?.email || "N/A"}</td>
                  <td style={tdStyle}>{exp.title}</td>
                  <td style={tdStyle}>₹ {exp.amount}</td>
                  <td style={tdStyle}>{exp.category}</td>
                  <td style={tdStyle}>{exp.type}</td>
                  <td style={tdStyle}>
                    {new Date(exp.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ padding: "20px" }}>
                  No expenses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ================= STYLES =================

const container = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #f3f4f8, #c6ebf6)",
  padding: "30px",
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  marginBottom: "30px",
};

const card = {
  padding: "20px",
  borderRadius: "12px",
  color: "#fff",
  textAlign: "center",
};

const charts = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
  marginBottom: "30px",
};

const chartBox = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
};

const chartInner = {
  height: "300px",
};

const tableBox = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
};

const thStyle = {
  padding: "10px",
  border: "1px solid #ddd",
};

const tdStyle = {
  padding: "10px",
  border: "1px solid #ddd",
};
