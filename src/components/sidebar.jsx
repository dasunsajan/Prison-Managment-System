import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const links = [
    { path: "/dashboard", label: "Dashboard", icon: "🏠" },
    { path: "/prisoners", label: "Prisoners", icon: "🧍" },
    { path: "/staff", label: "Staff", icon: "👮" },
  ];

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      <div className="p-6 text-xl font-bold border-b border-slate-700">
        🏛️ Prison MS
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              location.pathname === link.path
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700 text-sm text-slate-400">
        Logged in as Admin
      </div>
    </div>
  );
}

export default Sidebar;