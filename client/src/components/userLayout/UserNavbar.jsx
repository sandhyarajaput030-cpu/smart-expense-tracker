import { Link } from "react-router-dom";
import { useState } from "react";

export default function UserNavbar() {
  const [menu, setMenu] = useState(null);

  const toggleMenu = (type) => {
    setMenu(menu === type ? null : type);
  };

  return (
    <div style={styles.navbar}>
      <h2 style={styles.logo}>💼 Smart Expense Tracker</h2>

      <div style={styles.links}>

        <Link to="/user" style={styles.link}>🏠 Dashboard</Link>
        <Link to="/user/categories" style={styles.link}>📂 Categories</Link>

        {/* TRANSACTIONS */}
        <div style={styles.dropdown}>
          <span style={styles.link} onClick={() => toggleMenu("t")}>
            💰 Transactions ▾
          </span>

          {menu === "t" && (
            <div style={styles.menu}>
              
              <Link
                to="/user/add-transaction"
                style={styles.menuItem}
                onMouseOver={(e) => {
                  e.target.style.background = "#16a34a";
                  e.target.style.color = "#fff";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#333";
                }}
              >
                ➕ Add Transaction
              </Link>

              <Link
                to="/user/view-transaction"
                style={styles.menuItem}
                onMouseOver={(e) => {
                  e.target.style.background = "#3b82f6";
                  e.target.style.color = "#fff";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#333";
                }}
              >
                📄 View Transactions
              </Link>

              <Link
                to="/user/upload"
                style={styles.menuItem}
                onMouseOver={(e) => {
                  e.target.style.background = "#f97316";
                  e.target.style.color = "#fff";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#333";
                }}
              >
                📤 Upload Statement
              </Link>

            </div>
          )}
        </div>

        {/* BUDGET */}
        <div style={styles.dropdown}>
          <span style={styles.link} onClick={() => toggleMenu("b")}>
            📊 Budget ▾
          </span>

          {menu === "b" && (
            <div style={styles.menu}>

              <Link
                to="/user/set-budget"
                style={styles.menuItem}
                onMouseOver={(e) => {
                  e.target.style.background = "#eab308";
                  e.target.style.color = "#fff";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#333";
                }}
              >
                💰 Set Budget
              </Link>

              <Link
                to="/user/view-budget"
                style={styles.menuItem}
                onMouseOver={(e) => {
                  e.target.style.background = "#8b5cf6";
                  e.target.style.color = "#fff";
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#333";
                }}
              >
                📊 View Budget
              </Link>

            </div>
          )}
        </div>

         <Link to="/user/tips" style={styles.link}>💡 Financial Tips</Link>
        <Link to="/profile" style={styles.link}>👤 Profile</Link>
        <Link to="/login" style={styles.link}>🚪 Logout</Link>

      </div>
    </div>
  );
}

const styles = {
  navbar: {
    background: "#f97316",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },

  logo: {
    margin: 0,
    fontSize: "35px",
    fontWeight: "bold",
  },

  links: {
    display: "flex",
    gap: "30px",
    alignItems: "center",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },

  dropdown: {
    position: "relative",
  },

  menu: {
    position: "absolute",
    top: "100%",
    left: "0",
    background: "#fff",
    color: "#000",
    padding: "10px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    minWidth: "200px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    zIndex: 1000,
  },
   menuItem: {
    textDecoration: "none",
    padding: "10px",
    borderRadius: "6px",
    color: "#333",
    fontWeight: "500",
    transition: "0.3s",
  },
};