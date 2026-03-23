import React, { useMemo, useState } from "react";
import ExpenseCharts from "../components/ExpenseCharts";

function Analytics({ expenses = [], allowance = 0 }) {

  const [filter, setFilter] = useState("all");

  const filteredExpenses = useMemo(() => {
    const now = new Date();

    if (filter === "7days") {
      return expenses.filter(e => {
        const d = new Date(e.date);
        return (now - d) / (1000 * 60 * 60 * 24) <= 7;
      });
    }

    if (filter === "30days") {
      return expenses.filter(e => {
        const d = new Date(e.date);
        return (now - d) / (1000 * 60 * 60 * 24) <= 30;
      });
    }

    if (filter === "month") {
      return expenses.filter(e => {
        const d = new Date(e.date);
        return d.getMonth() === now.getMonth();
      });
    }

    return expenses;
  }, [expenses, filter]);

  const totalSpent = useMemo(() => {
    return filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
  }, [filteredExpenses]);

  const days = new Date().getDate();
  const dailyAverage = totalSpent / days || 0;

  const highestExpense = useMemo(() => {
    if (filteredExpenses.length === 0) return null;
    return filteredExpenses.reduce((max, e) =>
      e.amount > max.amount ? e : max
    );
  }, [filteredExpenses]);

  const categoryCount = {};
  filteredExpenses.forEach(e => {
    categoryCount[e.category] = (categoryCount[e.category] || 0) + 1;
  });

  const mostUsedCategory =
    Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";

  const remaining = allowance - totalSpent;
  const usagePercent = allowance ? (totalSpent / allowance) * 100 : 0;

  return (
    <div className="analytics-container">

        <h2>Analytics</h2>

        {/* FILTER BUTTONS */}
        <div className="analytics-filters">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("7days")}>7 Days</button>
          <button onClick={() => setFilter("30days")}>30 Days</button>
          <button onClick={() => setFilter("month")}>This Month</button>
        </div>

        {/* METRIC CARDS */}
        <div className="analytics-cards">

          <div className="analytics-card">
            <h4>Total Spent</h4>
            <p>₹ {totalSpent.toFixed(2)}</p>
          </div>

          <div className="analytics-card">
            <h4>Daily Average</h4>
            <p>₹ {dailyAverage.toFixed(2)}</p>
          </div>

          <div className="analytics-card">
            <h4>Highest Expense</h4>
            <p>
              {highestExpense
                ? `₹ ${highestExpense.amount} (${highestExpense.category})`
                : "None"}
            </p>
          </div>

          <div className="analytics-card">
            <h4>Most Used Category</h4>
            <p>{mostUsedCategory}</p>
          </div>

        </div>

        {/* ALLOWANCE PROGRESS */}
        <div className="analytics-progress">

          <h4>Allowance Usage</h4>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${usagePercent}%` }}
            ></div>
          </div>

          <p>
            Allowance ₹{allowance} | Remaining ₹{remaining.toFixed(2)}
          </p>

        </div>

        {/* CHARTS */}
        <ExpenseCharts expenses={filteredExpenses} />

        {/* CATEGORY TABLE */}
        <div className="analytics-table">

          <h3>Category Breakdown</h3>

          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
                <th>%</th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(
                filteredExpenses.reduce((acc, e) => {
                  acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
                  return acc;
                }, {})
              ).map(([cat, amt]) => (
                <tr key={cat}>
                  <td>{cat}</td>
                  <td>₹ {amt}</td>
                  <td>{((amt / totalSpent) * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

        {/* INSIGHTS */}
        <div className="analytics-insights">

          <h3>Insights</h3>

          <ul>
            <li>Your most frequent category is {mostUsedCategory}</li>
            <li>Daily average spending is ₹ {dailyAverage.toFixed(2)}</li>
            <li>Total spent is ₹ {totalSpent.toFixed(2)}</li>
          </ul>

        </div>

      </div>
  );
}

export default Analytics;