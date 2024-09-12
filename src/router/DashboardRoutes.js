
import { Route, Routes } from "react-router-dom";
import DeveloperDashboard from "../pages/dashboard/Sidebar";
import Sidebar from "../pages/dashboard/Sidebar";

const DashboardRoutes = () => {
  return (
    <div className="flex h-screen">
      <Sidebar /> {/* Dashboard Sidebar */}
      <main className="flex-1 p-4">
        <Routes>
          <Route path="/dashboard" element={<DeveloperDashboard />} />
          {/* Add other dashboard-related routes here */}
        </Routes>
      </main>
    </div>
  );
};

export default DashboardRoutes;
