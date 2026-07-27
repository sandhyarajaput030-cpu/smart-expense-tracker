import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SetBudget() {
  const [form, setForm] = useState({
    category: "",
    budgetAmount: "",
    month: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  // ✅ NEW: categories state
  const [categories, setCategories] = useState([]);

  // ================= FETCH CATEGORIES =================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "https://smart-expense-tracker-rgea.onrender.com/api/categories",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("CATEGORIES:", res.data); // debug

        setCategories(res.data);

      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    fetchCategories();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://smart-expense-tracker-rgea.onrender.com/api/budgets",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Budget Saved Successfully!");

      setForm({
        category: "",
        budgetAmount: "",
        month: "",
        startDate: "",
        endDate: "",
        notes: "",
      });

    } catch (error) {
      console.error(error);
      alert("Error saving budget");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>💰 Set Budget</h2>

        <form onSubmit={handleSubmit}>
          {/* CATEGORY */}
          <div style={styles.group}>
            <label>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select Category</option>

              {/* ✅ DYNAMIC DATA */}
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <option disabled>No categories found</option>
              )}
            </select>
          </div>

          {/* AMOUNT */}
          <div style={styles.group}>
            <label>Budget Amount</label>
            <input
              type="number"
              name="budgetAmount"
              value={form.budgetAmount}
              onChange={handleChange}
              style={styles.input}
              placeholder="Enter amount"
              required
            />
          </div>

          {/* MONTH */}
          <div style={styles.group}>
            <label>Month</label>
            <input
              type="month"
              name="month"
              value={form.month}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          {/* DATES */}
          <div style={styles.row}>
            <div style={styles.half}>
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.half}>
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>

          <button type="submit" style={styles.button}>
            Save Budget
          </button>
        </form>
      </div>
    </div>
  );
}

// ================= STYLES =================
const styles = {
  page: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    background: "linear-gradient(135deg, #e0f2fe, #dbeafe, #ede9fe)",
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    background: "#ffffff",
    padding: "35px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  title: {
    textAlign: "center",
    color: "#1e24e1",
    marginBottom: "25px",
  },

  group: {
    marginBottom: "15px",
  },

  row: {
    display: "flex",
    gap: "18px",
  },

  half: {
    flex: 1,
  },

  input: {
    width: "100%",
    padding: "12px 15px",
    marginTop: "6px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
