import { useEffect, useState } from "react";

const allowedTransitions = {
  Created: ["Approved", "Revoked"],
  Approved: ["Sent"],
  Sent: ["Signed", "Revoked"],
  Signed: ["Locked"],
};

function ContractsPage() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("contracts")) || [];
    setContracts(stored);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = contracts.map((c) => {
      if (c.id !== id) return c;

      if (
        !allowedTransitions[c.status] ||
        !allowedTransitions[c.status].includes(newStatus)
      ) {
        return c;
      }

      return { ...c, status: newStatus };
    });

    setContracts(updated);
    localStorage.setItem("contracts", JSON.stringify(updated));
  };

  return (
    <div>
      <h2>Contracts</h2>

      {contracts.map((contract) => (
        <div
          key={contract.id}
          style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}
        >
          <p>
            <strong>Name:</strong> {contract.name}
          </p>
          <p>
            <strong>Status:</strong> {contract.status}
          </p>

          {allowedTransitions[contract.status] &&
            allowedTransitions[contract.status].map((status) => (
              <button
                key={status}
                onClick={() => updateStatus(contract.id, status)}
                style={{ marginRight: 5 }}
              >
                {status}
              </button>
            ))}
        </div>
      ))}
    </div>
  );
}

export default ContractsPage;
