import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminTips() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Saving",
    isDailyTip: false,
    targetUsers: [],
    sendTo: "all"
  });

  const [users, setUsers] = useState([]);
  const [tips, setTips] = useState([]);
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
    fetchTips();
    // eslint-disable-next-line
  }, []);

  // ================= FETCH =================
  const fetchUsers = async () => {
  try {
    const res = await axios.get("https://smart-expense-tracker-rgea.onrender.com/api/users/all", {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log("USERS:", res.data);
    setUsers(res.data);
  } catch (err) {
    console.error("USERS ERROR:", err.response?.data || err.message);
  }
};

const fetchTips = async () => {
  try {
    const res = await axios.get(
      "https://smart-expense-tracker-rgea.onrender.com/api/tips/admin/all",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    console.log("TIPS:", res.data);
    setTips(res.data);
  } catch (err) {
    console.error("TIPS ERROR:", err.response?.data || err.message);
  }
};

  // ================= FORM =================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleUserSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions, (o) => o.value);
    setForm({ ...form, targetUsers: selected });
  };

  // ================= ADD / UPDATE =================
  const handleSubmit = async () => {
    try {
      const dataToSend = {
        ...form,
        targetUsers: form.sendTo === "all" ? [] : form.targetUsers
      };

      if (editId) {
        await axios.put(
          `https://smart-expense-tracker-rgea.onrender.com/api/tips/${editId}`,
          dataToSend,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Tip updated ✅");
      } else {
        await axios.post(
          "https://smart-expense-tracker-rgea.onrender.com/api/tips/add",
          dataToSend,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Tip added ✅");
      }

      resetForm();
      fetchTips();

    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      category: "Saving",
      isDailyTip: false,
      targetUsers: [],
      sendTo: "all"
    });
    setEditId(null);
  };

  // ================= EDIT =================
  const handleEdit = (tip) => {
    setForm({
      title: tip.title,
      description: tip.description,
      category: tip.category,
      isDailyTip: tip.isDailyTip,
      targetUsers: tip.targetUsers || [],
      sendTo: tip.targetUsers?.length ? "selected" : "all"
    });
    setEditId(tip._id);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this tip?")) return;

    await axios.delete(
      `https://smart-expense-tracker-rgea.onrender.com/api/tips/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchTips();
  };

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>💡 Financial Tips</h1>
        <p style={styles.heroSub}>
          Create, manage & share smart financial advice
        </p>
      </div>

      <div style={{ padding: "20px" }}>

        {/* FORM */}
        <div style={styles.card}>
          <h4 style={styles.sectionTitle}>
            {editId ? "✏️ Edit Tip" : "➕ Add New Tip"}
          </h4>

          <input
            type="text"
            name="title"
            placeholder="Enter title..."
            className="form-control mb-3"
            value={form.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Write tip..."
            className="form-control mb-3"
            value={form.description}
            onChange={handleChange}
          />

          <select
            name="category"
            className="form-control mb-3"
            value={form.category}
            onChange={handleChange}
          >
            <option>Saving</option>
            <option>Investment</option>
            <option>Budgeting</option>
          </select>

          {/* SEND OPTION */}
          <div className="mb-3">
            <label><b>Send Tip To:</b></label><br />

            <input
              type="radio"
              name="sendTo"
              value="all"
              checked={form.sendTo === "all"}
              onChange={handleChange}
            /> All Users

            <br />

            <input
              type="radio"
              name="sendTo"
              value="selected"
              checked={form.sendTo === "selected"}
              onChange={handleChange}
            /> Selected Users
          </div>

          {/* USER SELECT */}
          {form.sendTo === "selected" && (
            <select multiple className="form-control mb-3" onChange={handleUserSelect}>
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>
          )}

          <div className="form-check mb-3">
            <input
              type="checkbox"
              name="isDailyTip"
              checked={form.isDailyTip}
              onChange={handleChange}
            />
            <label> Daily Tip ⭐</label>
          </div>

          <button style={styles.primaryBtn} onClick={handleSubmit}>
            {editId ? "Update Tip" : "Add Tip"}
          </button>
        </div>

        {/* LIST */}
        <h4 style={styles.listTitle}>📋 All Tips</h4>

        <div style={styles.grid}>
          {tips.map((tip) => (
            <div key={tip._id} style={styles.tipCard}>

              <h5>{tip.title}</h5>
              <p style={{ color: "#555" }}>{tip.description}</p>

              <div style={styles.meta}>
                <span style={styles.category}>{tip.category}</span>
                <span style={styles.likes}>
                  ❤️ {tip.likes?.length || 0}
                </span>
              </div>

              <div style={styles.actions}>
                <button style={styles.editBtn} onClick={() => handleEdit(tip)}>
                  ✏️ Edit
                </button>

                <button style={styles.deleteBtn} onClick={() => handleDelete(tip._id)}>
                  🗑 Delete
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

// STYLES
const styles = {
  page: {
    background: "#f4f6fb",
    minHeight: "100vh"
  },

  hero: {
    background: "linear-gradient(135deg, #e54683, #9d46ef)",
    color: "white",
    padding: "15px 20px",
    borderRadius: "10px",
    margin: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },

  heroTitle: {
    fontSize: "20px",
    fontWeight: "600",
    margin: 0
  },

  heroSub: {
    fontSize: "13px",
    opacity: 0.85,
    margin: 0
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    marginBottom: "20px"
  },

  sectionTitle: {
    marginBottom: "10px",
    fontWeight: "600"
  },

  primaryBtn: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    background: "#22c55e",
    color: "white",
    fontWeight: "600",
    cursor: "pointer"
  },

  listTitle: {
    marginBottom: "10px",
    fontWeight: "600"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px"
  },

  tipCard: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
  },

  meta: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px"
  },

  category: {
    background: "#e0e7ff",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px"
  },

  likes: {
    background: "#fee2e2",
    padding: "5px 10px",
    borderRadius: "20px",
    fontSize: "12px"
  },

  actions: {
    marginTop: "10px",
    display: "flex",
    gap: "10px"
  },

  editBtn: {
    flex: 1,
    background: "#facc15",
    border: "none",
    padding: "6px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  deleteBtn: {
    flex: 1,
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};
