import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");

const res = await axios.get(
  "http://localhost:8000/api/expenses",
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Delete this transaction?")) {
      const token = localStorage.getItem("token");

      await axios.delete(`https://smart-expense-tracker-rgea.onrender.com/api/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTransactions();
    }
  };

  // EDIT
  const handleEdit = async (t) => {
    const newAmount = prompt("Enter new amount", t.amount);
    if (!newAmount) return;

    const token = localStorage.getItem("token");

await axios.put(
  `https://smart-expense-tracker-rgea.onrender.com/api/expenses/${t._id}`,
  { ...t, amount: newAmount },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    fetchTransactions();
  };

  const filtered = transactions.filter((t) => {
  return (
    (type ? t.type === type : true) &&
    (category
      ? t.category.toLowerCase().includes(category.toLowerCase())
      : true)
  );
});

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>📋 Your Transactions</h2>

        {/* Filters */}
        <div style={styles.filterBox}>
          <select style={styles.input} onChange={(e) => setType(e.target.value)}>
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            style={styles.input}
            placeholder="Search Category..."
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((t, i) => (
              <tr key={t._id}>
                <td style={styles.td}>{i + 1}</td>

                <td style={styles.td}>
  <span
    style={{
      padding: "5px 10px",
      borderRadius: "10px",
      background: t.type === "income" ? "#e6f9f0" : "#ffe6e6",
      color: t.type === "income" ? "#28a745" : "#dc3545",
      fontWeight: "600",
    }}
  >
    {t.type === "income" ? "Income" : "Expense"}
  </span>
</td>

                <td style={styles.td}>{t.category}</td>
                <td style={styles.td}>₹ {t.amount}</td>
                <td style={styles.td}>{t.date}</td>

                <td style={styles.td}>
                  <button
                    style={styles.editBtn}
                    onClick={() => handleEdit(t)}
                  >
                    Edit
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(t._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ===== STYLES ===== */

const styles = {
  page: {
    minHeight: "100vh",
     background: "linear-gradient(135deg, #fff5f0, #ffe6d9)",
    padding: "30px",
    display: "flex",
    justifyContent: "center",
  },

  card: {
    width: "100%",
    maxWidth: "1000px",
    background: "#fff",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  title: {
    color: "#ff6600",
    marginBottom: "20px",
  },

  filterBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    background: "#ff6600",
    color: "#fff",
    padding: "12px",
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },

  badge: {
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "10px",
  },

  editBtn: {
    background: "#007bff",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    marginRight: "5px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#dc3545",
    color: "#fff",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
