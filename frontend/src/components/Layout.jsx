import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import "./Layout.css";

export default function Layout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout-main">
        <Outlet />
      </main>
      <footer className="layout-footer">
        <p>
          © {new Date().getFullYear()} JanSaqta. Студенттер үшін психологиялық көмек.
        </p>
      </footer>
    </div>
  );
}
