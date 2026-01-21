import BlueprintsPage from "./pages/BlueprintsPage";
import ContractsPage from "./pages/ContractsPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Contract Management Platform</h1>

      <BlueprintsPage />
      <hr />

      <ContractsPage />
      <hr />

      <DashboardPage />
    </div>
  );
}

export default App;
