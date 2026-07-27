import React from "react";

const UserFooter = () => {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "12px",
        background: "#454647",
        color: "#f3eded",
        marginTop: "20px",
        borderTop: "1px solid #ddd",
        fontSize: "14px",
      }}
    >
      <p>© {new Date().getFullYear()} Smart Expense Tracker | User Panel</p>
    </footer>
  );
};

export default UserFooter;