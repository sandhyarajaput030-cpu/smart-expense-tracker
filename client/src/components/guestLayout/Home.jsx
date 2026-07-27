import { useNavigate } from "react-router-dom";
import React from "react";

export default function Home() {
     const navigate = useNavigate();

  return (
    <div style={container}>
      
      {/* HERO SECTION */}
      <section style={hero}>
        <div style={heroContent}>
          <h1 style={title}>
            Smart Expense Tracker 💸
          </h1>

          <p style={subtitle}>
            Take control of your money. Track, analyze, and save smarter with a beautiful dashboard.
          </p>

          <div style={buttons}>
            <button 
              style={primaryBtn}
              onClick={() => navigate("/login")}
            >
              Get Started
            </button>

            <button 
              style={secondaryBtn}
              onClick={() => navigate("/register")}
            >
              Join Now
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={features}>
        <h2 style={sectionTitle}>Why Choose Us?</h2>

        <div style={grid}>
          <div style={card}>
            <h3>📊 Smart Analytics</h3>
            <p>Visualize your spending with charts and insights.</p>
          </div>

          <div style={card}>
            <h3>💰 Budget Control</h3>
            <p>Set limits and never overspend again.</p>
          </div>

          <div style={card}>
            <h3>⚡ Fast & Simple</h3>
            <p>Add and track expenses in seconds.</p>
          </div>

          <div style={card}>
            <h3>🔒 Secure</h3>
            <p>Your financial data is safe and private.</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={cta}>
        <h2>Start Managing Your Money Today 🚀</h2>
        <button style={primaryBtn}>Create Account</button>
      </section>

    </div>
  );
}

/* ===== STYLES ===== */

const container = {
  fontFamily: "Poppins, sans-serif",
};

/* HERO with Background Image + Overlay */
const hero = {
  height: "100vh",
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://thumbs.dreamstime.com/b/computer-app-money-budget-expense-tracking-223055663.jpg')",
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
  fontSize: "3.5rem",
  fontWeight: "bold",
};

const subtitle = {
  marginTop: "15px",
  fontSize: "1.2rem",
  opacity: 0.9,
};

const buttons = {
  marginTop: "30px",
  display: "flex",
  gap: "15px",
  justifyContent: "center",
};

const primaryBtn = {
  padding: "12px 25px",
  background: "#00c6ff",
  border: "none",
  borderRadius: "30px",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

const secondaryBtn = {
  padding: "12px 25px",
  background: "transparent",
  border: "1px solid white",
  borderRadius: "30px",
  color: "white",
  cursor: "pointer",
};

/* FEATURES */
const features = {
  padding: "80px 20px",
  background: "#f5f7fa",
  textAlign: "center",
};

const sectionTitle = {
  fontSize: "2.5rem",
  marginBottom: "40px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "25px",
};

const card = {
  background: "rgba(255,255,255,0.7)",
  backdropFilter: "blur(10px)",
  padding: "25px",
  borderRadius: "15px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
};

/* CTA */
const cta = {
  padding: "60px 20px",
  background: "linear-gradient(135deg, #00c6ff, #0072ff)",
  color: "white",
  textAlign: "center",
};

