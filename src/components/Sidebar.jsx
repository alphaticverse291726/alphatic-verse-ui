import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/" },
  { name: "EHR", path: "/ehr" },
  { name: "Appointments", path: "/appointments" },
  { name: "ADR Reporting", path: "/fda-reporting" }, // ✅ NEW
  { name: "Clinic Analytics", path: "/analytics" },
  
];


export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-white/10 p-6 z-50">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-pinkGlow to-purpleGlow bg-clip-text text-transparent">
        AlphaTIC Verse
      </h1>

      <nav className="mt-10 space-y-3">
        {menu.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-gradient-to-r from-pinkGlow to-purpleGlow text-black font-semibold"
                  : "hover:bg-white/10"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
