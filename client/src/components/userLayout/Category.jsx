import React, { useEffect, useState } from "react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [editId, setEditId] = useState(null);

  // ================= FETCH =================
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (cat) => {
  setName(cat.name);
  setType(cat.type);
  setEditId(cat._id);
};

  useEffect(() => {
    fetchCategories();
  }, []);

  // ================= ADD =================
  const saveCategory = async () => {
  if (!name || !type) {
    alert("Enter all fields");
    return;
  }

  try {
    if (editId) {
      await axios.put(`http://localhost:8000/api/categories/${editId}`, {
        name,
        type,
      });
      setEditId(null);
    } else {
      await axios.post("http://localhost:8000/api/categories", {
        name,
        type,
      });
    }

    setName("");
    setType("");
    fetchCategories();
  } catch (err) {
    console.log(err);
  }
};

  // ================= DELETE =================
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📂 Manage Categories</h2>

      {/* ===== ADD FORM ===== */}
      <div style={styles.card}>
        <h4>➕ Add New Category</h4>

        <div style={styles.formRow}>
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={styles.input}
          >
            <option value="">Select Type</option>
            <option value="income">INCOME</option>
            <option value="expense">EXPENSE</option>
          </select>
        </div>

        <button onClick={saveCategory} style={styles.saveBtn}>
  {editId ? "✏️ Update" : "💾 Save"}
</button>
      </div>

      {/* ===== TABLE ===== */}
      <div style={styles.card}>
        <h4>📋 Existing Categories</h4>

        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat, index) => (
                <tr key={cat._id}>
                  <td>{index + 1}</td>
                  <td>{cat.name}</td>

                  <td>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "6px",
                        background:
                          cat.type === "income" ? "#16a34a" : "#dc2626",
                        color: "white",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {cat.type?.toUpperCase()}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() => handleEdit(cat)}
                      style={styles.editBtn}
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteCategory(cat._id)}
                      style={styles.deleteBtn}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Category;

//
// ================= STYLES =================
//

const styles = {
  container: {
    padding: "20px",
    background: "#f4f6f9",
    minHeight: "100vh",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "15px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "100%",
  },

  saveBtn: {
    background: "#5671f7",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "600px",
  },

  editBtn: {
    background: "#facc15",
    border: "none",
    padding: "6px 10px",
    marginRight: "5px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};