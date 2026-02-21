import {
  LayoutDashboard,
  Truck,
  Route,
  Wrench,
  Receipt,
  ShieldCheck,
  BarChart3,
  MagnetIcon,
  X
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import { LogOut as LogOutIcon } from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/", roles: ["MANAGER", "SAFETY_OFFICER", "DISPATCHER"] },
  { name: "Vehicle Registry", icon: Truck, path: "/vehicles", roles: ["MANAGER"] },
  { name: "Driver", icon: MagnetIcon, path: "/drivers", roles: ["MANAGER", "SAFETY_OFFICER", "DISPATCHER"] },
  { name: "Trip Dispatcher", icon: Route, path: "/trips", roles: ["DISPATCHER", "MANAGER"] },
  { name: "Maintenance", icon: Wrench, path: "/maintenance", roles: ["MANAGER"] },
  { name: "Trip & Expense", icon: Receipt, path: "/expenses", roles: ["DISPATCHER"] },
  { name: "Performance", icon: ShieldCheck, path: "/performance", roles: ["SAFETY_OFFICER"] },
  { name: "Analytics", icon: BarChart3, path: "/analytics", roles: ["MANAGER", "FINANCE"] }
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/login");
    setIsOpen(false);
  };
  // Filter items based on role
  const filteredItems = navItems.filter(item =>
    !item.roles || item.roles.includes(user?.role)
  );
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static z-50 top-0 left-0 h-full w-64
          bg-zinc-950 border-r border-zinc-800 p-6
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile Header */}
        <div className="flex justify-between items-center md:hidden mb-6">
          <h1 className="text-lg font-bold text-white">
            Fleet<span className="text-amber-400">Flow</span>
          </h1>
          <button onClick={() => setIsOpen(false)}>
            <X className="text-white" />
          </button>
        </div>

        {/* Desktop Logo */}
        <div className="hidden md:block mb-10">
          <h1 className="text-xl font-black text-white">
            Fleet<span className="text-amber-400">Flow</span>
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Fleet Management System
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {filteredItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={index}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300
                  ${isActive
                    ? "bg-amber-400/10 text-amber-400"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-amber-400"
                  }`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="mt-auto pt-6 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all duration-300 w-full"
          >
            <LogOutIcon size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}