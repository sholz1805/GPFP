import { Route, Routes } from "react-router-dom";
import Sidebar from "../pages/admin/Sidebar";
import DashboardHome from "../pages/admin/dashboard/DashboardHome";
import Projects from "../pages/admin/dashboard/Projects";
import Messages from "../pages/admin/dashboard/Messages";
import Report from "../pages/admin/dashboard/Report";
import Investor from "../pages/admin/dashboard/Investor";
import Developer from "../pages/admin/dashboard/Developer";
import InvestmentTransaction from "../pages/admin/dashboard/InvestmentTransaction";

const DashboardRoutes = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-grow p-6 md:ml-64">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="projects" element={<Projects />} />
          <Route path="messages" element={<Messages />} />
          <Route path="investor" element={<Investor />} />
          <Route path="developer" element={<Developer />} />
          <Route path="transaction" element={<InvestmentTransaction />} />
          <Route path="report" element={<Report />} />
        </Routes>
      </main>
    </div>
  );
};

export default DashboardRoutes;