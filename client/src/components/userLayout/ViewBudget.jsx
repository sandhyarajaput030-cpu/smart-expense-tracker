import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewBudget() {
  const [budgets, setBudgets] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  // ================= FETCH =================
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `https://smart-expense-tracker-rgea.onrender.com/api/budgets?month=${selectedDate.getMonth()}&year=${selectedDate.getFullYear()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setBudgets(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBudgets();
  }, [selectedDate]);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://smart-expense-tracker-rgea.onrender.com/api/budgets/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBudgets((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  // ================= EDIT =================
  const handleEdit = async (id) => {
  const newAmount = prompt("Enter new budget amount");

  if (!newAmount || isNaN(newAmount)) {
    alert("Please enter a valid number");
    return;
  }

  try {
    const token = localStorage.getItem("token");

    const res = await axios.put(
      `https://smart-expense-tracker-rgea.onrender.com/api/budgets/${id}`,
      {
        budgetAmount: Number(newAmount), // ✅ FIXED
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("UPDATED:", res.data);

    // ✅ Update UI
    setBudgets((prev) =>
      prev.map((b) =>
        b._id === id
          ? { ...b, budgetAmount: Number(newAmount) }
          : b
      )
    );

  } catch (error) {
    console.error("Edit Error:", error.response?.data || error.message);
    alert("Edit failed: " + (error.response?.data?.message || "Server error"));
  }
};

  // ================= STATUS =================
  const getStatus = (spent, budget) => {
    const percentage = (spent / budget) * 100;

    if (percentage >= 100) {
      return { text: "Over Budget", color: "#dc2626" };
    }

    if (percentage >= 80) {
      return { text: "Warning", color: "#f59e0b" };
    }

    return { text: "Safe", color: "#16a34a" };
  };

  return (
    <div style={styles.page}>
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

        <h2 style={styles.title}>📊 View Budget</h2>

        <div style={styles.grid}>
          {budgets.map((budget) => {
            const spent = budget.spent || 0;
            const remaining = budget.budgetAmount - spent;

            const percentage = Math.min(
              (spent / budget.budgetAmount) * 100,
              100
            );

            const status = getStatus(spent, budget.budgetAmount);

            return (
              <div key={budget._id} style={styles.card}>
                <h3 style={styles.category}>{budget.category}</h3>

                <div style={styles.info}>
                  <p><strong>Budget:</strong> ₹{budget.budgetAmount}</p>
                  <p><strong>Spent:</strong> ₹{spent}</p>
                  <p><strong>Remaining:</strong> ₹{remaining}</p>
                </div>

                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${percentage}%`,
                      background: status.color,
                    }}
                  ></div>
                </div>

                <p style={{ ...styles.status, color: status.color }}>
                  {status.text}
                </p>

                <div style={styles.buttonRow}>
                  <button
                    style={styles.editBtn}
                    onClick={() => handleEdit(budget._id)}
                  >
                    Edit
                  </button>

                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDelete(budget._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e0f2fe, #dbeafe, #ede9fe)",
    padding: "30px",
  },

  container: {
    maxWidth: "1200px",
    margin: "auto",
  },

  title: {
    textAlign: "center",
    color: "#2563eb",
    marginBottom: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "18px",
    padding: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  monthNav: {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
  marginBottom: "20px",
},

  category: {
    color: "#2563eb",
    marginBottom: "15px",
  },

  info: {
    lineHeight: "1.8",
  },

  progressBar: {
    width: "100%",
    height: "12px",
    background: "#e5e7eb",
    borderRadius: "20px",
    overflow: "hidden",
    marginTop: "15px",
  },

  progressFill: {
    height: "100%",
    borderRadius: "20px",
  },

  status: {
    marginTop: "12px",
    fontWeight: "600",
  },

  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  editBtn: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },

  deleteBtn: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#dc2626",
    color: "#fff",
    cursor: "pointer",
  },
};
