import React from "react";import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

function Subscriptions({ subscriptions  }) {

  const COLORS = [
    "#ff4da6",
    "#ff80bf",
    "#ff99cc",
    "#ffb3d9",
    "#ffcce6"
  ];

  return (
    <div>
      <h2 style={{ marginBottom: "30px" }}>
        Subscriptions Overview
      </h2>

      {subscriptions.length === 0 ? (
        <p>No subscriptions added yet</p>
      ) : (
        <div style={{
          display: "flex",
          gap: "40px",
          alignItems: "flex-start"
        }}>

          {/* PIE CHART */}
          <div style={{ flex: 1 }}>
            <PieChart width={400} height={400}>
              <Pie
                data={subscriptions}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                label
              >
                {subscriptions.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* TABLE */}
          <div style={{ flex: 1 }}>
            <table
              width="100%"
              border="1"
              cellPadding="10"
              style={{ background: "white" }}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {subscriptions.map(sub => (
                  <tr key={sub.id}>
                    <td>{sub.name}</td>
                    <td>₹ {sub.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>
      )}
    </div>
  );
}

export default Subscriptions;