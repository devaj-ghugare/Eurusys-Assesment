import { useEffect, useState } from "react";

function DashboardPage() {
  const [contracts, setContracts] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("contracts")) || [];
    setContracts(stored);
  }, []);

  const filteredContracts = contracts.filter((c) => {
    if (filter === "All") return true;
    if (filter === "Active")
      return ["Created", "Approved", "Sent"].includes(c.status);
    if (filter === "Pending")
      return ["Created", "Approved"].includes(c.status);
    if (filter === "Signed")
      return ["Signed", "Locked"].includes(c.status);
    return true;
  });

  return (
    <div className="section">
      <h2>Contract Dashboard</h2>

      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Pending">Pending</option>
        <option value="Signed">Signed</option>
      </select>

      <table border="1" cellPadding="8" style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>Contract Name</th>
            <th>Blueprint ID</th>
            <th>Status</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredContracts.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.blueprintId}</td>
              <td>{c.status}</td>
              <td>{c.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardPage;
