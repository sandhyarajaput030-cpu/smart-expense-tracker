import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FinancialTips() {
  const [tips, setTips] = useState([]);
  const [dailyTip, setDailyTip] = useState(null);

  useEffect(() => {
  fetchTips();
  fetchDailyTip();
  // eslint-disable-next-line
}, []);

  const token = localStorage.getItem("token");


  // 🔹 Get all tips
  const fetchTips = async () => {
    try {
      const res = await axios.get(
        "https://smart-expense-tracker-rgea.onrender.com/api/tips/my",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setTips(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Get daily tip
  const fetchDailyTip = async () => {
    try {
      const res = await axios.get(
        "https://smart-expense-tracker-rgea.onrender.com/api/tips/daily",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setDailyTip(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ❤️ Like tip
  const likeTip = async (id) => {
    try {
      await axios.put(
        `https://smart-expense-tracker-rgea.onrender.com/api/tips/like/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchTips();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="container mt-4">

      {/* ⭐ DAILY TIP */}
      {dailyTip && (
        <div className="card p-3 mb-4 shadow"
             style={{ background: "#fff3cd", borderRadius: "15px" }}>
          <h4>⭐ Tip of the Day</h4>
          <h5>{dailyTip.title}</h5>
          <p>{dailyTip.description}</p>
          <small>Category: {dailyTip.category}</small>
        </div>
      )}

      {/* ALL TIPS */}
      <h3 className="mb-3">💡 Financial Tips</h3>

      {tips.length === 0 ? (
        <p>No tips available</p>
      ) : (
        tips.map((tip) => (
          <div
            key={tip._id}
            className="card p-3 mb-3 shadow-sm"
            style={{ borderRadius: "12px" }}
          >
            <h5>{tip.title}</h5>
            <p>{tip.description}</p>

            <small className="text-muted">
              Category: {tip.category}
            </small>

            <div className="mt-2 d-flex gap-2">
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => likeTip(tip._id)}
              >
                ❤️ {tip.likes?.length || 0}
              </button>

             
            </div>
          </div>
        ))
      )}
    </div>
  );
}
