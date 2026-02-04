import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const menu = [
  { name: "Dashboard", path: "/" },
  { name: "EHR Verse", path: "/ehrverse" },
  { name: "ADR", path: "/adr" },
  { name: "Appointments", path: "/appointments" },
  { name: "Clinic Analytics", path: "/analytics" },
  { name: "Nurse Dashboard", path: "/nurse-dashboard" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ================= MOBILE TOP BAR ================= */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-black border-b border-white/10 flex items-center justify-between px-4 z-50">
        <h1 className="text-lg font-bold bg-gradient-to-r from-pinkGlow to-purpleGlow bg-clip-text text-transparent">
          AlphaTIC Verse
        </h1>

        <button onClick={() => setOpen(true)}>
          <Menu className="text-white" size={28} />
        </button>
      </div>

      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-black border-r border-white/10 p-6 z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between lg:block">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pinkGlow to-purpleGlow bg-clip-text text-transparent">
            AlphaTIC Verse
          </h1>

          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X className="text-white" size={26} />
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-10 space-y-3">
          {menu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-gradient-to-r from-pinkGlow to-purpleGlow text-black font-semibold"
                    : "hover:bg-white/10 text-white/80"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
