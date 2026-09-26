// src/layouts/RootLayout.jsx
// Built following lesson 2.8 — Layouts, Sidebar navigation and Outlet
import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar.jsx";

export default function RootLayout() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
