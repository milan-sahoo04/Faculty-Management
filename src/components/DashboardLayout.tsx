// src/components/DashboardLayout.tsx
import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import {
  Home,
  BarChart3,
  Users,
  FolderOpen,
  FileText,
  Search,
  Bell,
  Target,
  Menu,
  X,
  Settings,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Updated navigation paths to be relative to the parent "/dashboard" route
  const navigation: NavItem[] = [
    { name: "Home", href: "/dashboard/home", icon: Home },
    { name: "Overview", href: "/dashboard/overview", icon: BarChart3 },
    { name: "Faculty", href: "/dashboard/faculty", icon: Users },
    { name: "Categories", href: "/dashboard/categories", icon: FolderOpen },
    { name: "Reports", href: "/dashboard/reports", icon: FileText },
    { name: "Calender", href: "/dashboard/calender", icon: Target },
    { name: "Contacts", href: "/dashboard/contacts", icon: Users },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  ];

  const isHomePage = location.pathname === "/dashboard/home";

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-gray-900 bg-opacity-75"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="relative flex-1 flex flex-col max-w-xs w-full bg-white"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <SidebarContent navigation={navigation} location={location} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <SidebarContent navigation={navigation} location={location} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Top navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-200">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex-1 px-4 flex justify-between items-center">
            {/* Search - Conditionally rendered */}
            {isHomePage && (
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search sessions, faculty, reports..."
                    type="search"
                  />
                </div>
              </div>
            )}

            {/* User Profile Dropdown */}
            <UserProfileDropdown />
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const UserProfileDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    console.log("User logged out");
    // Replace with your actual logout logic (e.g., API call, state update, redirect)
    // For example, if using React Router:
    // navigate('/login');
  };

  return (
    <div
      ref={dropdownRef}
      className={`relative flex items-center space-x-3 ml-4`}
    >
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center space-x-3 focus:outline-none"
      >
        <img
          className="h-9 w-9 rounded-full bg-blue-700 flex items-center justify-center text-white"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="User Profile"
        />
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-gray-700">Admin User</div>
          <div className="text-xs text-gray-500">Administrator</div>
        </div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <NavLink
              to="/dashboard/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setDropdownOpen(false)}
            >
              <Users className="h-4 w-4 mr-2" />
              Your Profile
            </NavLink>
            <NavLink
              to="/dashboard/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setDropdownOpen(false)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </NavLink>
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SidebarContent: React.FC<{ navigation: NavItem[]; location: any }> = ({
  navigation,
  location,
}) => (
  <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
    <div className="flex items-center flex-shrink-0 px-4">
      <Target className="h-8 w-8 text-blue-700" />
      <span className="ml-2 text-xl font-bold text-gray-900">FacultyApp</span>
    </div>
    <div className="mt-5 flex-grow flex flex-col">
      <nav className="flex-1 px-2 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
              location.pathname === item.href
                ? "bg-blue-600 text-white shadow-md transform scale-[1.02] translate-x-1"
                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
            }`}
          >
            <item.icon
              className={`mr-3 flex-shrink-0 h-6 w-6 transition-colors ${
                location.pathname === item.href
                  ? "text-white"
                  : "text-gray-400 group-hover:text-blue-500"
              }`}
              aria-hidden="true"
            />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="px-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">© 2024 FacultyApp</p>
      </div>
    </div>
  </div>
);

export default DashboardLayout;
