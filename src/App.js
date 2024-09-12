import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ROUTES from "./router/routes"; // Import non-dashboard routes
import DashboardRoutes from "./router/DashboardRoutes"; // Import dashboard routes

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Non-Dashboard Routes */}
        {ROUTES.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            exact={route.exact}
            element={route.element}
          />
        ))}

        {/* Dashboard Routes */}
        <Route path="/*" element={<DashboardRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
