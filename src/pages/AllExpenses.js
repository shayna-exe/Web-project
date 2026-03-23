import React, { useState, useMemo } from "react";

function AllExpenses({ expenses, setExpenses }) {

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortType, setSortType] = useState("newest");
  const [editId, setEditId] = useState(null);
  const [editAmount, setEditAmount] = useState("");

  const categories = ["All", ...new Set(expenses.map(e => e.category))];

  const filtered = useMemo(() => {

    let data = [...expenses];

    if (search) {
      data = data.filter(e =>
        e.category.toLowerCase().includes(search.toLowerCase()) ||
        e.mode.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categoryFilter !== "All") {
      data = data.filter(e => e.category === categoryFilter);
    }

    if (sortType === "high") data.sort((a,b)=>b.amount-a.amount);
    else if (sortType === "low") data.sort((a,b)=>a.amount-b.amount);
    else if (sortType === "oldest") data.sort((a,b)=>a.date-b.date);
    else data.sort((a,b)=>b.date-a.date);

    return data;

  }, [expenses, search, categoryFilter, sortType]);

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const saveEdit = (id) => {
    setExpenses(expenses.map(e =>
      e.id === id ? { ...e, amount: Number(editAmount) } : e
    ));
    setEditId(null);
  };

  return (
    <div>

      <h2>All Expenses</h2>

      <div style={{display:"flex",gap:"10px",marginBottom:"20px"}}>

        <input
          placeholder="Search..."
          value={search}
          onChange={e=>setSearch(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={e=>setCategoryFilter(e.target.value)}
        >
          {categories.map(c=>(
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          value={sortType}
          onChange={e=>setSortType(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="high">Amount High → Low</option>
          <option value="low">Amount Low → High</option>
        </select>

      </div>

      <table className="modern-table">

        <thead>
          <tr>
            <th>S.N</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Mode</th>
            <th></th>
          </tr>
        </thead>

        <tbody>

          {filtered.map((e,i)=>(
            <tr key={e.id}>

              <td>{i+1}</td>

              <td>
                {editId === e.id ? (
                  <input
                    value={editAmount}
                    onChange={x=>setEditAmount(x.target.value)}
                  />
                ) : (
                  `₹${e.amount.toFixed(2)}`
                )}
              </td>

              <td>{e.category}</td>

<td>{new Date(e.date).toLocaleDateString()}</td>
              <td>{e.mode}</td>

              <td>

                {editId === e.id ? (
                  <button 
                  className="glass-btn"
                  onClick={()=>saveEdit(e.id)}>Save</button>
                ) : (
                  <button 
                  className="glass-btn"
                  onClick={()=>{
                    setEditId(e.id);
                    setEditAmount(e.amount);
                  }}>
                    Edit
                  </button>
                )}

                <button
                className="glass-btn"
                  onClick={()=>deleteExpense(e.id)}
                  style={{marginLeft:"5px"}}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AllExpenses;