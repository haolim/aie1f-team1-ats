import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter lets every child component read and change the current URL.
        Link, NavLink, useParams, and useNavigate only work inside it. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
