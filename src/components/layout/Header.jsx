import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const nav = useNavigate();
  const me = JSON.parse(localStorage.getItem("me"));

  const logout = () => {
    localStorage.clear();
    nav("/login");
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/dashboard" className="text-xl font-bold text-slate-900">
          Team<span className="text-slate-500">Flow</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/projects" className={linkClass}>
            Projects
          </NavLink>
          <NavLink to="/tasks" className={linkClass}>
            Tasks
          </NavLink>
          <NavLink to="/workspace" className={linkClass}>
            Workspace
          </NavLink>
          <NavLink to="/reports" className={linkClass}>
            Reports
          </NavLink>
        </nav>

        {/* User */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">{me?.name}</span>
          <button
            onClick={logout}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm hover:bg-slate-100"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
