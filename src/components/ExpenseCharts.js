import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function ExpenseCharts({ expenses = [], subscriptions = [] }) {

const mergedData = expenses;
  // Dynamically collect all categories
  const categories = [...new Set(mergedData.map(item => item.category))];

  // Calculate totals
  const categoryTotals = categories.map(cat =>
    mergedData
      .filter(item => item.category === cat)
      .reduce((sum, item) => sum + item.amount, 0)
  );

  const barData = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: categoryTotals,
        backgroundColor: "#ff80bf"
      }
    ]
  };

  const pieData = {
    labels: categories,
    datasets: [
      {
        data: categoryTotals,
        backgroundColor: [
            "#ff2e8a",
  "#ff4da6",
  "#ff66b3",
  "#ff80bf",
  "#ff99cc",
  "#ffb3d9",
  "#ffcce6",
  "#ffe0f0",
  "#fff0f7"
        ]
      }
    ]
  };

  return (
    <div className="charts">
      <div className="chart-box">
        <h3>Category Expenses</h3>
        <Bar data={barData} />
      </div>

      <div className="chart-box">
        <h3>Top Categories</h3>
        <Pie data={pieData} />
      </div>
    </div>
  );
}

export default ExpenseCharts;