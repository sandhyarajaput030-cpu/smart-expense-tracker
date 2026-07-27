import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/register",
        form
      );

      setSuccess(res.data.message);
      setError("");

      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
      });

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setSuccess("");
    }
  };

  return (
    <div style={container}>
      <div style={card}>

        {/* 🔥 HEADER */}
        <div style={header}>
          <div style={icon}>👤</div>
          <h1 style={title}>Create Account</h1>
          <p style={subtitle}>Start tracking your expenses easily</p>
        </div>

        {/* ✅ SUCCESS */}
        {success && <div style={successBox}>{success}</div>}

        {/* ❌ ERROR */}
        {error && <div style={errorBox}>{error}</div>}

        {/* 🧾 FORM */}
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            style={input}
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email Address"
            style={input}
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            style={input}
            value={form.phone}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            style={input}
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit" style={button}>
            Join Now
          </button>
        </form>

        {/* 🔗 FOOTER */}
        <p style={footer}>
          Already have an account?{" "}
          <span style={login}>Login</span>
        </p>

      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #dbeafe, #fce7f3)",
};

const card = {
  width: "470px",
  padding: "40px",
  borderRadius: "18px",
  background: "#ffffff",
  boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
  textAlign: "center",
};

const header = {
  marginBottom: "25px",
};

const icon = {
  fontSize: "50px",
  marginBottom: "10px",
};

const title = {
  fontSize: "28px",
  fontWeight: "600",
  marginBottom: "5px",
};

const subtitle = {
  fontSize: "14px",
  color: "#6b7280",
};

const input = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
  fontSize: "14px",
  outline: "none",
};

const button = {
  width: "100%",
  padding: "14px",
  background: "linear-gradient(to right, #4f46e5, #6366f1)",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  fontSize: "16px",
  fontWeight: "500",
  cursor: "pointer",
  marginTop: "10px",
};

const successBox = {
  background: "#dcfce7",
  color: "#166534",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "15px",
  fontSize: "14px",
};

const errorBox = {
  background: "#fee2e2",
  color: "#991b1b",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "15px",
  fontSize: "14px",
};

const footer = {
  marginTop: "20px",
  fontSize: "14px",
};

const login = {
  color: "#4f46e5",
  fontWeight: "600",
  cursor: "pointer",
};