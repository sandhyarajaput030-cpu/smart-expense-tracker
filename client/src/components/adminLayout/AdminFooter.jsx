import React from "react";

const AdminFooter = () => {
  return (
    <div style={styles.footer}>
      <p>© 2026 Expense Tracker Admin Panel</p>
    </div>
  );
};

const styles = {
  footer: {
    textAlign: "center",
    padding: "10px",
    background: "#fff",
    borderTop: "1px solid #ddd"
  }
};

export default AdminFooter;