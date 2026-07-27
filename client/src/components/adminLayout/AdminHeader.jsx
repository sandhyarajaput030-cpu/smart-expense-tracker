import React from "react";

const AdminHeader = () => {
  return (
    <div style={styles.header}>
      <h3>Welcome Admin 👨‍💼</h3>

      <div>
        <button style={styles.btn}>Logout</button>
      </div>
    </div>
  );
};

const styles = {
  header: {
    background: "#fff",
    padding: "15px 20px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },
  btn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default AdminHeader;