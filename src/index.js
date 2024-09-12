import React from "react";
import ReactDOM from "react-dom/client";
import "./input.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import ROUTES from "./router/routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([...ROUTES]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
