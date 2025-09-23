import { NavLink, useLocation } from "react-router-dom";
import { Home, BookOpen, Archive, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContexts.jsx";
import LgWhite from "../../assets/lgWhite.png";

const navItems = [
  { name: "Dashboard", href: "/user-dashboard", icon: Home },
  { name: "Kelas", href: "/kelas", icon: BookOpen },
  { name: "Modul", href: "/modul", icon: BookOpen },
  { name: "Arsip", href: "/arsip", icon: Archive },
];

export default function UserSidebar() {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 bg-blue1 text-white flex flex-col">
      <div className="flex items-center justify-center h-20 border-b border-blue-700">
        <img src={LgWhite} alt="Logo" className="h-16 w-auto" />
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.href) ? "bg-blue-700 text-white" : "text-blue-200 hover:bg-blue-600 hover:text-white"}`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="px-4 py-4 border-t border-blue-700">
        <button onClick={logout} className="flex items-center w-full px-4 py-2 rounded-md text-sm font-medium text-blue-200 hover:bg-blue-600 hover:text-white transition-colors">
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
}
