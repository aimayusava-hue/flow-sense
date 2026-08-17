import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
    },
    {
      name: "Report Flooding",
      path: "/report",
    },
    {
      name: "Safe Routes",
      path: "/routes",
    },
    {
      name: "About",
      path: "/about",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="group"
        >
          <div className="flex items-center gap-2">

            <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-900 text-xl transition group-hover:scale-105">
              🌧️
            </div>

            <div>
              <p className="text-lg font-black tracking-tight text-slate-900">
                FlowSense
              </p>

              <p className="hidden text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:block">
                Urban Flood Intelligence
              </p>
            </div>

          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 md:flex">

          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

        </div>

        {/* Report button */}
        <Link
          to="/report"
          className="hidden rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-red-600 sm:block"
        >
          🚨 Report
        </Link>

        {/* Mobile button */}
        <button
          onClick={() => setMenuOpen((value) => !value)}
          className="rounded-xl border border-slate-200 p-2 md:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden">

          <div className="space-y-1">

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-semibold ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

          </div>

        </div>
      )}

    </nav>
  );
}

export default Navbar;