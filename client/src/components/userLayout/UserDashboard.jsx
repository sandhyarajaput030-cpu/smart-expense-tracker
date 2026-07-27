import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";

const UserDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // ================= FETCH =================
  const handlePrevMonth = () => {
  const newDate = new Date(selectedDate);
  newDate.setMonth(newDate.getMonth() - 1);
  setSelectedDate(newDate);
};

const handleNextMonth = () => {
  const newDate = new Date(selectedDate);
  newDate.setMonth(newDate.getMonth() + 1);
  setSelectedDate(newDate);
};

  useEffect(() => {
    fetchTransactions();
  }, [selectedDate]);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

const res = await axios.get(
  "https://smart-expense-tracker-rgea.onrender.com/api/dashboard",
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);
      console.log(res.data.transactions);
      setTransactions(res.data.transactions);
    } catch (err) {
      console.log(err);
    }
  };

// ================= CALCULATIONS =================

// 🔥 USE SELECTED MONTH
const currentMonth = selectedDate.getMonth();
const currentYear = selectedDate.getFullYear();

// 🔥 FILTER DATA
const monthlyTransactions = transactions.filter((t) => {
  const d = new Date(t.date);
  return (
    d.getMonth() === currentMonth &&
    d.getFullYear() === currentYear
  );
});

// 🔥 CALCULATIONS
const realIncome = monthlyTransactions
  .filter((t) => t.type === "income")
  .reduce((a, b) => a + b.amount, 0);

const realExpense = monthlyTransactions
  .filter((t) => t.type === "expense")
  .reduce((a, b) => a + b.amount, 0);

const income = realIncome;
const expense = realExpense;

const balance = income - expense;
const monthlyExpense = expense;


  // ================= CHART DATA =================
  const categoryMap = {};

monthlyTransactions.forEach((t) => {
  if (t.type === "expense") {
    categoryMap[t.category] =
      (categoryMap[t.category] || 0) + t.amount;
  }
});

const categoryData = {
  labels: Object.keys(categoryMap),
  datasets: [
    {
      data: Object.values(categoryMap),
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
    labels: ["This Month"],
    datasets: [
      {
        label: "Income",
        data: [income],
        backgroundColor: "#16a34a",
      },
      {
        label: "Expense",
        data: [expense],
        backgroundColor: "#dc2626",
      },
    ],
  };

  return (
    <div style={styles.container}>
      <div style={styles.monthNav}>
  <button onClick={handlePrevMonth}>⬅ Prev</button>

  <h3>
    {selectedDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    })}
  </h3>

  <button onClick={handleNextMonth}>Next ➡</button>
</div>


      {/* ================= CARDS ================= */}
      <div style={styles.cards}>
        <div style={{ ...styles.card, background: "#16a34a" }}>
          <h4>Total Income</h4>
          <h1>₹{income}</h1>
        </div>

        <div style={{ ...styles.card, background: "#dc2626" }}>
          <h4>Total Expense</h4>
          <h1>₹{expense}</h1>
        </div>

        <div style={{ ...styles.card, background: "#0891b2" }}>
          <h4>Balance</h4>
          <h1>₹{balance}</h1>
        </div>

        <div style={{ ...styles.card, background: "#c21ec8" }}>
          <h4>This Month's Expense</h4>
          <h1>₹{monthlyExpense}</h1>
        </div>
      </div>

      {/* ================= CHARTS ================= */}
      <div style={styles.charts}>

        <div style={styles.chartBox}>
          <h3>📊 Expense by Category</h3>
          <div style={styles.chartInner}>
            <Pie data={categoryData} />
          </div>
        </div>

        <div style={styles.chartBox}>
          <h3>📈 Income vs Expense (Monthly)</h3>
          <div style={styles.chartInner}>
            <Bar data={barData} />
          </div>
        </div>

      </div>

      {/* ================= TABLE ================= */}
      <div style={styles.tableBox}>
        <h2 style={{ textAlign: "center" }}>Recent Transactions</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
  {monthlyTransactions.slice(0, 5).map((t) => (
    <tr key={t._id}>
      <td>{new Date(t.date).toLocaleDateString()}</td>
      <td>{t.type}</td>
      <td>{t.category}</td>
      <td>₹{t.amount}</td>
      <td>{t.title}</td>
    </tr>
  ))}
</tbody>
        </table>
      </div>

    </div>
  );
};

export default UserDashboard;


// ================= STYLES =================
const styles = {

  container: {
  background: "#f2f2f2",
  minHeight: "100vh",
  paddingBottom: "20px"
},

  navbar: {
    background: "#f97316",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  navLinks: {
    display: "flex",
    gap: "20px",
    color: "white",
    fontWeight: "500"
  },

  cards: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "15px",
  padding: "20px"
},

 card: {
  color: "white",
  padding: "20px",
  borderRadius: "30px",
  textAlign: "center",
  width: "90%",
  boxShadow: "0 6px 15px rgba(0,0,0,0.2)"
},

  charts: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "15px",
  padding: "0 15px",
  margin: "24px",
},

  chartBox: {
    background: "#fff",
    padding: "20px",
    borderRadius: "18px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },

  chartInner: {
  height: "260px",
  maxWidth: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
},

  tableBox: {
    margin: "30px",
    background: "#fff",
    padding: "20px",
    borderRadius: "18px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },

  monthNav: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  marginTop: "20px",
},

  table: {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "700px"
}
};
