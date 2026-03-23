import React, { useState, useMemo, useEffect  } from "react";
import ExpenseCharts from "../components/ExpenseCharts";

function Dashboard({ expenses, setExpenses, subscriptions, setSubscriptions }) {
  const handleSetAllowance = () => {
  if (!inputAllowance) return;
  setAllowance(Number(inputAllowance));
  setInputAllowance("");
};

const handleAddExpense = () => {
  addExpense();
};

const handleAddSubscription = () => {
  addSubscription();
};

  // Allowance
  const [allowance, setAllowance] = useState(
  Number(localStorage.getItem("allowance")) || 0
);
  const [inputAllowance, setInputAllowance] = useState("");

  // Expense Inputs
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [otherCategory, setOtherCategory] = useState("");

  // Subscription Inputs
  const [subName, setSubName] = useState("");
  const [subAmount, setSubAmount] = useState("");
  const [subType, setSubType] = useState("monthly");

  // Sorting
  const [showFilter, setShowFilter] = useState(false);
  const [amountSort, setAmountSort] = useState(null);
  const [dateSort, setDateSort] = useState("newest");
const defaultCategories = useMemo(() => [
  "Food",
  "Shopping",
  "Transport",
  "Subscriptions",
  "Entertainment",
  "Academics",
  "Essentials",
], []);
const [categories, setCategories] = useState(() => {
  const stored = JSON.parse(localStorage.getItem("categories")) || [];
  return [...new Set([...defaultCategories, ...stored])];
});
useEffect(() => {
  const update = () => {
    setAllowance(Number(localStorage.getItem("allowance")) || 0);
    setExpenses(JSON.parse(localStorage.getItem("expenses")) || []);
const stored = JSON.parse(localStorage.getItem("categories")) || [];
setCategories([...new Set([...defaultCategories, ...stored])]);
  };

  update();

  window.addEventListener("storageUpdate", update);

  return () => window.removeEventListener("storageUpdate", update);
}, [setExpenses, defaultCategories]);

  // Add Expense
  const addExpense = () => {
    if (!amount) return;

    const finalCategory =
      category === "Other" && otherCategory
        ? otherCategory
        : category;

    const newExpense = {
      id: Date.now(),
      amount: Number(amount),
      category: finalCategory,
      date: new Date(),
      mode: " "
    };

setExpenses(prev => {
  const updated = [...prev, newExpense];
  localStorage.setItem("expenses", JSON.stringify(updated));
  return updated;
});
    setAmount("");
    setOtherCategory("");
  };
const addSubscription = () => {
  if (!subName || !subAmount) return;

  const monthlyAmount =
    subType === "yearly"
      ? Number(subAmount) / 12
      : Number(subAmount);

  const newSubscription = {
    id: Date.now(),
    name: subName,
    amount: monthlyAmount
  };

  const newExpense = {
    id: Date.now() + 1,
    amount: monthlyAmount,
    category: "Subscriptions",
    date: new Date(),
    mode: `Subscription - ${subName}`
  };

  // save to subscriptions page
  setSubscriptions(prev => [...prev, newSubscription]);

  // also save to expenses table
  setExpenses(prev => [...prev, newExpense]);

  setSubName("");
  setSubAmount("");
};
  // Delete
  const deleteExpense = (id) => {
const updated = expenses.filter(exp => exp.id !== id);
setExpenses(updated);
localStorage.setItem("expenses", JSON.stringify(updated));
  };

  // Toggle Recent
  const toggleRecent = () => {
    setDateSort(prev => (prev === "newest" ? "oldest" : "newest"));
    setAmountSort(null);
  };

  // Sorting Logic
  const sortedExpenses = useMemo(() => {
    let sorted = [...expenses];

    if (amountSort === "high") {
      sorted.sort((a, b) => b.amount - a.amount);
    } else if (amountSort === "low") {
      sorted.sort((a, b) => a.amount - b.amount);
    } else {
      sorted.sort((a, b) =>
        dateSort === "newest"
          ? b.date - a.date
          : a.date - b.date
      );
    }

    return sorted;
  }, [expenses, amountSort, dateSort]);

  // Totals
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remaining = allowance - totalSpent;

  return (
    <div>
    

      {/* Allowance */}
      <div className="allowance-box">
<input
  type="number"
  placeholder="Set Monthly Allowance"
  value={inputAllowance}
  onChange={(e) => setInputAllowance(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") handleSetAllowance();
  }}
/>
<button className="glass-btn" onClick={handleSetAllowance}>
  Set
</button>
      </div>

      {/* Summary Cards */}
      <div className="cards">

        <div className="card">
          <h4>Add Subscription</h4>

          <div className="subscription-input">
            <input
              type="text"
              placeholder="Subscription name"
              value={subName}
              onChange={(e) => setSubName(e.target.value)}
            />
<input
  type="number"
  placeholder="Amount"
  value={subAmount}
  onChange={(e) => setSubAmount(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") handleAddSubscription();
  }}
/>
            <select
              value={subType}
              onChange={(e) => setSubType(e.target.value)}
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
<button className="glass-btn" onClick={addSubscription}>Add</button>
          </div>

          <h2>₹ {allowance}</h2>
        </div>

        <div className="card">
          <h4>Total Spent</h4>
          <h2>₹ {totalSpent.toFixed(2)}</h2>
        </div>

        <div className="card">
          <h4>Remaining</h4>
          <h2 style={{ color: remaining < 0 ? "red" : "green" }}>
            ₹ {remaining.toFixed(2)}
          </h2>
        </div>

      </div>

      {/* Add Expense */}
      <div className="add-expense-box">
<input
  type="number"
  placeholder="Enter amount"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") handleAddExpense();
  }}
/>

<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  {categories.map((cat, i) => (
    <option key={i}>{cat}</option>
  ))}
  <option>Other</option>
</select>

        {category === "Other" && (
          <input
            type="text"
            placeholder="Enter category name"
            value={otherCategory}
            onChange={(e) => setOtherCategory(e.target.value)}
          />
        )}

<button className="glass-btn" onClick={addExpense}>Add</button>
      </div>

      {/* Recent Section */}
      <div className="recent-wrapper">
        <div className="recent-container">

          <div className="recent-top">
            <h3>Recent Expenses</h3>

            <div className="recent-actions">
              <button
                className="glass-btn"
                onClick={() => setShowFilter(true)}
              >
                Filter
              </button>

              <button
                className="glass-btn"
                onClick={toggleRecent}
              >
                Recent
              </button>
            </div>
          </div>

          {showFilter && (
            <div className="filter-popup">
              <div className="popup-content">
                <h4>Filter By</h4>
                <button 
                className="glass-btn"
                onClick={() => {
                  setAmountSort("high");
                  setShowFilter(false);
                }}>
                  High to Low
                </button>
                <button 
                className="glass-btn"onClick={() => {
                  setAmountSort("low");
                  setShowFilter(false);
                }}>
                  Low to High
                </button>
                <button 
                className="glass-btn"
                onClick={() => setShowFilter(false)}>
                  Close
                </button>
              </div>
            </div>
          )}

          <table className="modern-table">
            <thead>
              <tr>
                <th>S.N</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Sub Category</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {sortedExpenses.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-data">
                    No expenses added yet
                  </td>
                </tr>
              ) : (
                sortedExpenses.map((exp, index) => (
                  <tr key={exp.id}>
                    <td>{index + 1}</td>
                    <td>₹{exp.amount.toFixed(2)}</td>
                    <td>{exp.category}</td>
                    <td>{new Date(exp.date).toLocaleDateString()}</td>    
                <td>{exp.mode || ""}</td>
                    <td>
                      <button
                        className="delete-btn-modern"
                        onClick={() => deleteExpense(exp.id)}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

        </div>
      </div>

<ExpenseCharts expenses={expenses} subscriptions={subscriptions} />
    </div>
  );
}

export default Dashboard;