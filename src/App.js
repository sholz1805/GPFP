import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ROUTES from "./router/routes";
import DashboardRoutes from "./router/DashboardRoutes";
import ScrollToTop from "./ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./pages/authentication/Login";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {ROUTES.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            exact={route.exact}
            element={route.element}
          />
        ))}
        <Route element={<ProtectedRoute />}>
          <Route path="/*" element={<DashboardRoutes />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;