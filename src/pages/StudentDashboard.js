import React, { useState, useEffect } from "react";
import StudentLayout from "../layout/StudentLayout";


function StudentDashboard() {

const [userName, setUserName] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  useEffect(() => {
  const update = () => {
    setUserName(localStorage.getItem("userName") || "");
  };

  // run once when page loads
  update();

  // listen for changes from Settings
  window.addEventListener("storageUpdate", update);

  return () => window.removeEventListener("storageUpdate", update);
}, []);

  return (
    <div>

      <div className="dashboard-header">
        Hello, {userName} !
      </div>

      <StudentLayout
        subscriptions={subscriptions}
        setSubscriptions={setSubscriptions}
      />

    </div>
  );
}

export default StudentDashboard;