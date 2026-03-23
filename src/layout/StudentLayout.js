import React, { useState } from "react";
import "./student.css";
import Dashboard from "../pages/Dashboard";
import Subscriptions from "../pages/Subscriptions";
import AllExpenses from "../pages/AllExpenses";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";

function StudentLayout({ subscriptions, setSubscriptions }) {

const [activeTab, setActiveTab] = useState("dashboard");
const [expenses, setExpenses] = useState([]);

  return (
    <div className="layout">

      <div className="sidebar">
        <h2>Student</h2>

        <ul>
          <li
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </li>

<li
  className={activeTab === "expenses" ? "active" : ""}
  onClick={() => setActiveTab("expenses")}
>
  All Expenses
</li>
          <li
            className={activeTab === "subscriptions" ? "active" : ""}
            onClick={() => setActiveTab("subscriptions")}
          >
            Subscriptions
          </li>

<li
  className={activeTab === "analytics" ? "active" : ""}
  onClick={() => setActiveTab("analytics")}
>
  Analytics
</li>      
    <li
  className={activeTab === "settings" ? "active" : ""}
  onClick={() => setActiveTab("settings")}
>
  Settings
</li>
        </ul>
      </div>

      <div className="main-content">

        {activeTab === "dashboard" && (
          <Dashboard
  expenses={expenses}
  setExpenses={setExpenses}
  subscriptions={subscriptions}
  setSubscriptions={setSubscriptions}
/>
        )}
        {activeTab === "expenses" && (
  <AllExpenses
    expenses={expenses}
    setExpenses={setExpenses}
  />
)}

        {activeTab === "subscriptions" && (
          <Subscriptions subscriptions={subscriptions} />
        )}
        {activeTab === "analytics" && (
  <Analytics
    expenses={expenses}
  />
)}
{activeTab === "settings" && (
  <Settings />
)}

      </div>

    </div>
  );
}

export default StudentLayout;