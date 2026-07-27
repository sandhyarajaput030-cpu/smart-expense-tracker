import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
    phone: "", // ✅ use phone (same as backend)
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://smart-expense-tracker-rgea.onrender.com/api/users/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(res.data); // debug

      // ✅ FIX: get data from res.data.user
      const user = res.data.user;

      setProfile({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        phone: user.phone || "",
      });

    } catch (err) {
      console.log("Error fetching profile", err);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:8000/api/users/profile",
        {
          name: profile.name,
          email: profile.email,
          phone: profile.phone, // ✅ send correct field
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Profile updated successfully");
      setEditMode(false);
      fetchProfile(); // refresh data
    } catch (err) {
      console.log("Update error", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh", background: "#f5f7fa" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "420px", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-4">Admin Profile</h3>

        {/* Name */}
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={profile.name}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={profile.email}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label>Contact Number</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={profile.phone}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        {/* Role */}
        <div className="mb-3">
          <label>Role</label>
          <input
            type="text"
            className="form-control"
            value={profile.role}
            disabled
          />
        </div>

        {/* Buttons */}
        {!editMode ? (
          <button
            className="btn btn-primary w-100"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              className="btn btn-success w-100 mb-2"
              onClick={handleUpdate}
            >
              Save Changes
            </button>

            <button
              className="btn btn-secondary w-100"
              onClick={() => {
                setEditMode(false);
                fetchProfile();
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
