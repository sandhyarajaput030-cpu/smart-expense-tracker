import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
 const [tab, setTab] = useState("all");

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://smart-expense-tracker-rgea.onrender.com/api/users/all"); 
      // ⚠️ IMPORTANT: backend should return ALL users
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ================= ACTIONS =================
  const approveUser = async (id) => {
    try {
      await axios.put(`https://smart-expense-tracker-rgea.onrender.com/api/users/approve/${id}`);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  const rejectUser = async (id) => {
    try {
      await axios.put(`https://smart-expense-tracker-rgea.onrender.com/api/users/reject/${id}`);
      fetchUsers();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FILTER LOGIC =================
  const filteredUsers = users
  .filter((u) => tab === "all" ? true : u.status === tab)
  .filter((u) => {
    const name = u.name?.toLowerCase() || "";
    const email = u.email?.toLowerCase() || "";
    const phone = u.phone || "";

    const query = search.toLowerCase();

    return (
      name.includes(query) ||
      email.includes(query) ||
      phone.includes(query)
    );
  });
  // ================= STATS =================
  const totalUsers = users.length;
  const pendingUsers = users.filter(u => u.status === "pending").length;
  const approvedUsers = users.filter(u => u.status === "active").length;
  const rejectedUsers = users.filter(u => u.status === "rejected").length;

  return (
    <div style={styles.container}>

      <h2 style={{ marginBottom: "20px" }}>Admin Dashboard</h2>

      {/* ================= CARDS ================= */}
      <div style={styles.cardContainer}>

        <div style={{ ...styles.card, background: "#6366f1" }}>
          <h3>{totalUsers}</h3>
          <p>Total Users</p>
        </div>

        <div style={{ ...styles.card, background: "#f59e0b" }}>
          <h3>{pendingUsers}</h3>
          <p>Pending</p>
        </div>

        <div style={{ ...styles.card, background: "#22c55e" }}>
          <h3>{approvedUsers}</h3>
          <p>Approved</p>
        </div>

        <div style={{ ...styles.card, background: "#ef4444" }}>
          <h3>{rejectedUsers}</h3>
          <p>Rejected</p>
        </div>

      </div>

      {/* ================= TABS ================= */}
      <div style={styles.tabs}>

  <button
    onClick={() => setTab("all")}
    style={tab === "all" ? styles.activeTab : styles.tab}
  >
    All Users
  </button>

  <button
    onClick={() => setTab("pending")}
    style={tab === "pending" ? styles.activeTab : styles.tab}
  >
    Pending
  </button>

  <button
    onClick={() => setTab("active")}
    style={tab === "active" ? styles.activeTab : styles.tab}
  >
    Approved
  </button>

  <button
    onClick={() => setTab("rejected")}
    style={tab === "rejected" ? styles.activeTab : styles.tab}
  >
    Rejected
  </button>

</div>

      {/* ================= SEARCH ================= */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchBox}
      />

      {/* ================= TABLE ================= */}
      <div style={styles.tableContainer}>
        <h3 style={{ marginBottom: "10px", textTransform: "capitalize" }}>
          {tab} Users
        </h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>
  <span style={getStatusStyle(u.status)}>
    {u.status}
  </span>
</td>

                <td>
  {u.status === "pending" ? (
    <>
      <button
        onClick={() => approveUser(u._id)}
        style={styles.approveBtn}
      >
        Approve
      </button>

      <button
        onClick={() => rejectUser(u._id)}
        style={styles.rejectBtn}
      >
        Reject
      </button>
    </>
  ) : (
    <span style={{ fontWeight: "bold", color: "#646262" }}>
      —
    </span>
  )}
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminDashboard;

// ================= STYLES =================
const styles = {
  container: {
    padding: "20px",
    background: "#f4f6f9",
    minHeight: "100vh"
  },

  cardContainer: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "15px",
  marginBottom: "20px"
},

  card: {
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center"
  },

 tabs: {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginBottom: "15px"
},

  tab: {
    padding: "10px 15px",
    border: "none",
    cursor: "pointer",
    background: "#ddd",
    borderRadius: "5px"
  },

  activeTab: {
    padding: "10px 15px",
    border: "none",
    cursor: "pointer",
    background: "#111827",
    color: "white",
    borderRadius: "5px"
  },

  searchBox: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },

  tableContainer: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px"
  },

 table: {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "600px" // important for scroll
},

 approveBtn: {
  background: "green",
  color: "white",
  border: "none",
  padding: "6px 10px",
  marginRight: "5px",
  marginBottom: "5px",
  cursor: "pointer"
},

rejectBtn: {
  background: "red",
  color: "white",
  border: "none",
  padding: "6px 10px",
  marginRight: "8px",
  marginBottom: "8px",
  cursor: "pointer"
},
};

const getStatusStyle = (status) => {
  switch (status) {
    case "active":
      return {
        display: "inline-block",
        minWidth: "90px",      // ⭐ SAME WIDTH
        textAlign: "center",
        background: "#22c55e",
        color: "white",
        padding: "5px 10px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: "bold"
      };

    case "pending":
      return {
        display: "inline-block",
        minWidth: "90px",      // ⭐ SAME WIDTH
        textAlign: "center",
        background: "#f59e0b",
        color: "white",
        padding: "5px 10px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: "bold"
      };

    case "rejected":
      return {
        background: "#ef4444",
        color: "white",
        padding: "5px 10px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: "bold"
      };

    default:
      return {
        background: "#6b7280",
        color: "white",
        padding: "5px 10px",
        borderRadius: "6px",
        fontSize: "12px"
      };
  }
};
