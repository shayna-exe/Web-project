import React from "react";
import { useLocation } from "react-router-dom";
import ExpenseCharts from "../components/ExpenseCharts";

function WorkerDashboard() {
  const location = useLocation();
  const name = location.state?.name || "User";

  return (
    <div style={{ padding: "40px" }}>
      <h1>Hello {name}</h1>
      <h2>Professional Expense Dashboard</h2>
      <ExpenseCharts type="worker" />
    </div>
  );
}

export default WorkerDashboard;