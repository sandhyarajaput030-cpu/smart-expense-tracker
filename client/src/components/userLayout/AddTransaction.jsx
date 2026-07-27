import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddTransaction() {
  const [form, setForm] = useState({
    type: "",
    category: "",
    amount: "",
    date: "",
    description: "",
  });

  const [categories, setCategories] = useState([]);

  // ✅ FIXED CATEGORY API
  useEffect(() => {
    axios
      .get("https://smart-expense-tracker-rgea.onrender.com/api/categories") // ✅ fixed
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ FIXED API + FIELD MAPPING
     const token = localStorage.getItem("token");
     if (!token) {
  alert("❌ Please login first");
  return;
}

await axios.post(
  "https://smart-expense-tracker-rgea.onrender.com/api/expenses/add",
  {
  title: form.description || form.type,
  amount: form.amount,
  category: form.category,
  type: form.type, // ✅ ADD THIS
  date: form.date,
},
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      alert("✅ Transaction Added");

      setForm({
        type: "",
        category: "",
        amount: "",
        date: "",
        description: "",
      });
    } catch (err) {
  console.log(err.response?.data || err.message);
}
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>➕ Add Transaction</h2>

        <form onSubmit={handleSubmit}>
          
          <div style={styles.group}>
            <label style={styles.label}>Type</label>
            <select
              style={styles.input}
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              required
            >
              <option value="">Select Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Category</label>
            <select
              style={styles.input}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              style={styles.input}
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Date</label>
            <input
              type="date"
              style={styles.input}
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />
          </div>

          <div style={styles.group}>
            <label style={styles.label}>Description</label>
            <textarea
              placeholder="Optional note..."
              style={styles.input}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <button style={styles.button}>Add Transaction</button>
        </form>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fff5f0, #ffe6d9)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "550px",
    background: "#fff",
    padding: "35px 30px",
    borderRadius: "18px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
    border: "2px solid #140a0a",
  },

  title: {
    textAlign: "center",
    color: "#c00719e7",
    marginBottom: "30px",
    fontSize: "22px",
    fontWeight: "600",
  },

  group: {
    marginBottom: "18px",
  },

  label: {
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "6px",
    display: "block",
    color: "#444",
  },

  input: {
    width: "100%",
    padding: "13px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #07c0c0e7, #6cd6f0)",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "15px",
  },
};
