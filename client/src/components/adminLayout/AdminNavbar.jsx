import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={styles.navbar}>

      <h2>Admin Panel</h2>

      <div style={styles.links}>

        <span onClick={() => navigate("/admin")}>Dashboard</span>

        <span onClick={() => navigate("/admin/profile")}>Profile</span>

        <span onClick={() => navigate("/admin/expenses")}>Expenses</span>

        <span onClick={() => navigate("/admin/tips")}>
          Financial Tips
        </span>

        <button onClick={logout} style={styles.logout}>
          Logout
        </button>

      </div>
    </div>
  );
};

export default AdminNavbar;

const styles = {
  navbar: {
    width: "220px",
    background: "#111827",
    color: "#fff",
    padding: "20px",
    height: "100vh"
  },
  links: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
    cursor: "pointer"
  },
  logout: {
    marginTop: "20px",
    background: "red",
    color: "white",
    border: "none",
    padding: "8px",
    cursor: "pointer"
  }
};