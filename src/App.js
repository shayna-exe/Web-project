import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome_temp";
import Dashboard from "./pages/Dashboard";
import StudentDashboard from "./pages/StudentDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import Subscriptions from "./pages/Subscriptions";
import Analytics from "./pages/Analytics";
<Route path="/analytics" element={<Analytics />} />

function App() {

  // 🔹 Global expenses state
  const [expenses, setExpenses] = useState([]);

  return (
    <Router>
      <Routes>

        {/* Welcome Page */}
        <Route path="/" element={<Welcome />} />

        {/* Main Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Dashboard
              expenses={expenses}
              setExpenses={setExpenses}
            />
          }
        />

        {/* Student Dashboard */}
        <Route
          path="/student"
          element={
            <StudentDashboard
              expenses={expenses}
              setExpenses={setExpenses}
            />
          }
        />

        {/* Worker Dashboard */}
        <Route
          path="/worker"
          element={
            <WorkerDashboard
              expenses={expenses}
              setExpenses={setExpenses}
            />
          }
        />

        {/* Subscriptions Page */}
        <Route
          path="/subscriptions"
          element={<Subscriptions expenses={expenses} />}
        />

      </Routes>
    </Router>
  );
}

export default App;