import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dollar from "../assets/dollar.png";
import "./Welcome.css";

function Welcome() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!name) return;
    localStorage.setItem("userName", name);
    navigate(role === "student" ? "/student" : "/worker");
  };

  return (
    <div className="welcome-container">
      {/* LEFT */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="title-row">
            <img src={dollar} alt="dollar icon" className="hero-icon" />
            <h1 className="hero-title">Smart Expense Tracker</h1>
          </div>

          <p className="hero-subtitle">
            Organize spending, manage budgets, and keep track of your finances
            with a simple, focused expense dashboard.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="form-section">
        <div className="form-card">
          <h2 className="welcome-title">Welcome</h2>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="name-input"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="role-select"
          >
            <option value="student">Student</option>
            <option value="worker">Working Professional</option>
          </select>

          <button className="continue-btn" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;