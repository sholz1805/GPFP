import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ROUTES from "./router/routes"; 
import DashboardRoutes from "./router/DashboardRoutes"; 

const App = () => {
  return (
    <Router>
      <Routes>
        {ROUTES.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            exact={route.exact}
            element={route.element}
          />
        ))}

        <Route path="/*" element={<DashboardRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
