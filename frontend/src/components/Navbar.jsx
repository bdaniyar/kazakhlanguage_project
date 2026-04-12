import { NavLink } from "react-router-dom";
import "./Navbar.css";

const links = [
  { to: "/", label: "Басты бет" },
  { to: "/test", label: "Тест" },
  { to: "/advice", label: "Кеңестер" },
  { to: "/diary", label: "Күнделік", title: "Эмоциялық күнделік" },
  { to: "/help", label: "Көмек" },
];

export default function Navbar() {
  return (
    <header className="nav-header">
      <div className="nav-inner">
        <NavLink to="/" className="nav-brand" end>
          <span className="nav-brand-mark" aria-hidden />
          <span>JanSaqta</span>
        </NavLink>
        <nav className="nav-links" aria-label="Негізгі мәзір">
          {links.map(({ to, label, title: t }) => (
            <NavLink
              key={to}
              to={to}
              title={t}
              className={({ isActive }) =>
                `nav-link${isActive ? " nav-link-active" : ""}`
              }
              end={to === "/"}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
