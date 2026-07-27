import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://smart-expense-tracker-rgea.onrender.com/api/users/login",
        form
      );

      setSuccess("Login successful ✅");
      setError("");

      // Save token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;

      // 🔥 ROLE BASED REDIRECT
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      setSuccess("");
    }
  };

  return (
    <div style={container}>
      <div style={card}>

        {/* HEADER */}
        <div style={header}>
          <div style={icon}>🔐</div>
          <h1 style={title}>Welcome Back</h1>
          <p style={subtitle}>Login to continue</p>
        </div>

        {/* SUCCESS */}
        {success && <div style={successBox}>{success}</div>}

        {/* ERROR */}
        {error && <div style={errorBox}>{error}</div>}

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            style={input}
            value={form.email}
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
            Login
          </button>
        </form>

        {/* FOOTER */}
        <p style={footer}>
          Don’t have an account?{" "}
          <span style={link} onClick={() => navigate("/register")}>
            Register
          </span>
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
  width: "440px",
  padding: "40px",
  borderRadius: "18px",
  background: "#ffffff",
  boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
  textAlign: "center",
};

const header = { marginBottom: "25px" };

const icon = { fontSize: "50px", marginBottom: "10px" };

const title = { fontSize: "26px", marginBottom: "5px" };

const subtitle = { fontSize: "14px", color: "#6b7280" };

const input = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
};

const button = {
  width: "100%",
  padding: "14px",
  background: "linear-gradient(to right, #4f46e5, #6366f1)",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const successBox = {
  background: "#dcfce7",
  color: "#166534",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "15px",
};

const errorBox = {
  background: "#fee2e2",
  color: "#991b1b",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "15px",
};

const footer = { marginTop: "20px" };

const link = {
  color: "#4f46e5",
  cursor: "pointer",
  fontWeight: "600",
};
