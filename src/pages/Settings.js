import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaSun, FaMoon } from "react-icons/fa";


function Settings() {

  const [name, setName] = useState(localStorage.getItem("userName") || "");
  const [allowance, setAllowance] = useState(localStorage.getItem("allowance") || 0);
  
const [darkMode, setDarkMode] = useState(
  localStorage.getItem("darkMode") === "true"
);

useEffect(() => {
  localStorage.setItem("darkMode", darkMode);
  if (darkMode) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}, [darkMode]);

  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories")) || [
      "Food",
      "Shopping",
      "Transport",
      "Subscriptions",
      "Entertainment",
      "Other",
      "Academics",
      "Essentials"
    ]
  );

  const [newCategory, setNewCategory] = useState("");

const saveProfile = () => {
  localStorage.setItem("userName", name);
  window.dispatchEvent(new Event("storageUpdate"));
  toast.success("Profile updated");
};

  const saveAllowance = () => {
    localStorage.setItem("allowance", Number(allowance));
    window.dispatchEvent(new Event("storageUpdate"));
    toast.success("Allowance updated");
  };

  const addCategory = () => {
    if (!newCategory.trim()) return;

    const updated = [...categories, newCategory.trim()];

    setCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));

    window.dispatchEvent(new Event("storageUpdate"));
    setNewCategory("");
  };
const defaultCategories = [
  "Food",
  "Shopping",
  "Transport",
  "Subscriptions",
  "Entertainment",
  "Academics",
  "Essentials",
  "Other"
];

const deleteCategory = (catToDelete) => {
  // ❌ prevent deleting default categories
  if (defaultCategories.includes(catToDelete)) {
    return;
  }

  const updated = categories.filter(cat => cat !== catToDelete);

  setCategories(updated);
  localStorage.setItem("categories", JSON.stringify(updated));

  window.dispatchEvent(new Event("storageUpdate"));
};


  const clearExpenses = () => {
    localStorage.removeItem("expenses");
    window.dispatchEvent(new Event("storageUpdate"));
    toast.success("All expenses cleared");
  };

  const exportData = () => {
    const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    if (expenses.length === 0) {
      toast.error("No data to export");
      return;
    }

    const headers = Object.keys(expenses[0]);

    const csv = [
      headers.join(","),
      ...expenses.map(row =>
        headers.map(field => `"${row[field] ?? ""}"`).join(",")
      )
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();
  };

  return (
    <div className="settings-container">

<div className="settings-header">
  <h2>Settings</h2>

  <div
    className={`theme-toggle ${darkMode ? "active" : ""}`}
    onClick={() => setDarkMode(prev => !prev)}
  >
    <div className="toggle-circle">
      {darkMode ? <FaMoon /> : <FaSun />}
    </div>
  </div>
</div>

      <div className="settings-section">
        <h3>Profile</h3>

        <input
  value={name}
  onChange={(e) => setName(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") saveProfile();
  }}
  placeholder="Enter your name"
/>

        <button 
        className="glass-btn"
        onClick={saveProfile}>Save Profile</button>
      </div>

      <div className="settings-section">
        <h3>Monthly Allowance</h3>

        <input
  type="number"
  value={allowance}
  onChange={(e) => setAllowance(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") saveAllowance();
  }}
/>

        <button 
        className="glass-btn"
        onClick={saveAllowance}>Update Allowance</button>
      </div>

      <div className="settings-section">
        <h3>Categories</h3>

{categories.map((cat, i) => (
  <div key={i}>
    {cat}
{!defaultCategories.includes(cat) && (
  <button
   className="delete-btn-modern"
   onClick={() => deleteCategory(cat)}>✕</button>
)}  </div>
))}

        <input
  placeholder="Add new category"
  value={newCategory}
  onChange={(e) => setNewCategory(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") addCategory();
  }}
/>

        <button 
        className="glass-btn"
        onClick={addCategory}>Add Category</button>
      </div>

      <div className="settings-section">
        <h3>Data Management</h3>

        <button 
        className="glass-btn"
        onClick={exportData}>Export Data</button>
        <button 
        className="glass-btn"
        onClick={clearExpenses}>Clear All Expenses</button>
      </div>

    </div>
  );
}

export default Settings;