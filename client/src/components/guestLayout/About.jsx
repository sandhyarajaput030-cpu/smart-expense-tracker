import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div style={container}>

      {/* HERO */}
      <section style={hero}>
        <div style={heroContent}>
          <h1 style={title}>Take Control of Your Money 💸</h1>
          <p style={subtitle}>
            A smarter way to manage your money with simplicity and clarity.
          </p>
        </div>
      </section>

      {/* MAIN SECTION */}
      <section style={aboutSection}>
        <div style={aboutGrid}>
          
          {/* LEFT CONTENT */}
          <div>
            <h2 style={sectionTitle}>Built for Real Life</h2>

            <p style={text}>
              Managing money in daily life is not always easy. From small
              expenses like food and transport to bigger payments like rent
              and bills, it’s easy to lose track of where your money goes.
            </p>

            <p style={text}>
              Our Smart Expense Tracker simplifies this process by helping you
              record every transaction, organize your spending, and understand
              your financial habits clearly.
            </p>

            <p style={text}>
              Whether you're a student managing a budget or a professional
              handling monthly expenses, this app helps you stay organized,
              reduce unnecessary spending, and make better financial decisions.
            </p>

            <button style={primaryBtn} onClick={() => navigate("/register")}>
              Get Started
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b"
              alt="finance"
              style={image}
            />
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section style={features}>
        <h2 style={sectionTitle}>How Our System Helps You</h2>

        <div style={grid}>

  <div style={{ ...card, background: "#e3f2fd" }}>
    <h3>📅 Daily Expense Tracking</h3>
    <p>
      Record your day-to-day expenses and income in a structured way,
      so nothing is missed.
    </p>
  </div>

  <div style={{ ...card, background: "#e8f5e9" }}>
    <h3>📂 Organized Categories</h3>
    <p>
      Group your expenses like food, travel, and bills for better clarity.
    </p>
  </div>

  <div style={{ ...card, background: "#fff3e0" }}>
    <h3>📈 Financial Awareness</h3>
    <p>
      Understand where your money goes and reduce unnecessary spending.
    </p>
  </div>

  <div style={{ ...card, background: "#f3e5f5" }}>
    <h3>🧾 Better Money Habits</h3>
    <p>
      Build strong financial habits and make smarter decisions.
    </p>
  </div>

</div>
      </section>

      {/* STATS */}
      <section style={stats}>
        <div style={statsGrid}>
          <div>
            <h2>10K+</h2>
            <p>Active Users</p>
          </div>

          <div>
            <h2>50K+</h2>
            <p>Transactions</p>
          </div>

          <div>
            <h2>99%</h2>
            <p>Secure</p>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ===== STYLES ===== */

const container = {
  fontFamily: "Poppins, sans-serif",
};

/* HERO */
const hero = {
  height: "50vh",
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: "white",
};

const heroContent = {
  maxWidth: "700px",
};

const title = {
  fontSize: "3.2rem",
  fontWeight: "bold",
};

const subtitle = {
  marginTop: "15px",
  fontSize: "1.2rem",
  opacity: 0.9,
};

/* ABOUT */
const aboutSection = {
  padding: "80px 20px",
};

const aboutGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "40px",
  alignItems: "center",
};

const sectionTitle = {
  fontSize: "2.2rem",
  marginBottom: "20px",
};

const text = {
  fontSize: "1.05rem",
  color: "#555",
  marginBottom: "15px",
  lineHeight: "1.6",
};

const image = {
  width: "100%",
  borderRadius: "15px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
};

/* BUTTON */
const primaryBtn = {
  marginTop: "20px",
  padding: "12px 30px",
  background: "linear-gradient(135deg, #0072ff, #00c6ff)",
  color: "white",
  border: "none",
  borderRadius: "30px",
  cursor: "pointer",
  fontWeight: "bold",
};

/* FEATURES */
const features = {
  padding: "80px 20px",
  background: "#f5f7fa",
  textAlign: "center",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "25px",
};

const card = {
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
  transition: "0.3s",
};

/* STATS */
const stats = {
  padding: "60px 20px",
  background: "#0072ff",
  color: "white",
  textAlign: "center",
};

const statsGrid = {
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
};