import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null); // ✅ better than {}
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // ================= FETCH PROFILE =================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("No token found");
          return;
        }

        const res = await axios.get(
          "http://localhost:8000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("PROFILE DATA:", res.data); // ✅ DEBUG

        const data = res.data.user || res.data;

        setUser(data);

        setForm({
          name: data?.name || "",
          email: data?.email || "",
          phone: data?.phone || "",
        });

      } catch (err) {
        console.error("ERROR:", err.response?.data || err.message);
      }
    };

    fetchProfile();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:8000/api/users/profile",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = res.data.user || res.data;

      setUser(updatedUser); // ✅ FIXED
      setEditMode(false);

    } catch (err) {
      console.error("UPDATE ERROR:", err.response?.data || err.message);
    }
  };

  // ================= LOADING FIX =================
  if (!user) {
    return <h2 style={{ textAlign: "center" }}>Loading profile...</h2>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {user.role === "admin"
            ? "👑 Admin Profile"
            : "👤 User Profile"}
        </h2>

        {!editMode ? (
          <>
           <div style={styles.row}>
  <span style={styles.label}>Name:</span>
  <span>{user.name}</span>
</div>

<div style={styles.row}>
  <span style={styles.label}>Email:</span>
  <span>{user.email}</span>
</div>

<div style={styles.row}>
  <span style={styles.label}>Phone:</span>
  <span>{user.phone}</span>
</div>

<div style={styles.row}>
  <span style={styles.label}>Role:</span>
  <span>{user.role}</span>
</div>

            <button
              style={styles.button}
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Name"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="Email"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              style={styles.input}
              placeholder="Phone"
            />

            <button style={styles.saveBtn} onClick={handleUpdate}>
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "80px",
    display: "flex",
    justifyContent: "center",
     background: "linear-gradient(135deg, #e0f2fe, #fedbea, #ede9fe)",
  },

  card: {
    width: "100%",
    maxWidth: "500px",
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  title: {
    textAlign: "center",
    color: "#2563eb",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  button: {
    width: "100%",
    padding: "10px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  saveBtn: {
    width: "100%",
    padding: "10px",
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  row: {
  display: "flex",
  marginBottom: "10px",
},

label: {
  width: "100px",   // 🔥 FIXED WIDTH (important)
  fontWeight: "bold",
  color: "#333",
},
};