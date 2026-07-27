import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ for active menu

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // ✅ active link style
  const isActive = (path) => location.pathname === path;

  return (
    <div style={styles.container}>

      {/* ================= SIDEBAR ================= */}
      <div style={styles.sidebar}>
        <h2 style={{ marginBottom: "20px" }}>Admin Panel</h2>

        <p
          style={isActive("/admin") ? styles.activeLink : styles.link}
          onClick={() => navigate("/admin")}
        >
          📊 Dashboard
        </p>

        <p
          style={isActive("/admin/profile") ? styles.activeLink : styles.link}
          onClick={() => navigate("/admin/profile")}
        >
          👤 Profile
        </p>

        <p
          style={isActive("/admin/expenses") ? styles.activeLink : styles.link}
          onClick={() => navigate("/admin/expenses")}
        >
          💰 Expenses
        </p>

        {/* ✅ NEW: Financial Tips */}
        <p
          style={isActive("/admin/tips") ? styles.activeLink : styles.link}
          onClick={() => navigate("/admin/tips")}
        >
          💡 Financial Tips
        </p>

        <button onClick={logout} style={styles.logout}>
          Logout
        </button>
      </div>

      {/* ================= MAIN AREA ================= */}
      <div style={styles.main}>

        {/* HEADER */}
        <div style={styles.header}>
          <h3 style={{ margin: 0 }}>
            👋 Welcome Admin
          </h3>
        </div>

        {/* CONTENT */}
        <div style={styles.content}>
          <Outlet />
        </div>

        {/* FOOTER */}
        <div style={styles.footer}>
          © 2026 Expense Tracker Admin Panel
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;

// ================= STYLES =================
const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial"
  },

  sidebar: {
    width: "220px",
    background: "#111827",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  link: {
    cursor: "pointer",
    padding: "8px",
    borderRadius: "5px",
    transition: "0.3s"
  },

  // ✅ highlight active menu
  activeLink: {
    cursor: "pointer",
    padding: "8px",
    borderRadius: "5px",
    background: "#374151",
    color: "#60a5fa"
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },

  header: {
    background: "linear-gradient(135deg, #57575b, #565658)",
    padding: "15px",
    color: "white",
    borderBottom: "2px solid #474a4f",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },

  content: {
    flex: 1,
    padding: "20px",
    background: "#f4f6f9"
  },

  footer: {
    background: "linear-gradient(135deg, #111827, #1f2937)",
    padding: "12px",
    textAlign: "center",
    color: "white",
    borderTop: "2px solid #374151"
  },

  logout: {
    marginTop: "20px",
    background: "red",
    color: "#fff",
    border: "none",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "5px"
  }
};