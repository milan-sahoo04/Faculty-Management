import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation, Outlet, useNavigate } from "react-router-dom";
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
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types ---
interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

// --- Placeholder for Logout Logic (Using useNavigate in DashboardLayout to trigger redirect) ---
const handleLogout = (navigate: ReturnType<typeof useNavigate>) => {
  console.log("User logged out");
  // Replace with your actual logout logic (e.g., API call, state update)

  // Example: Redirect to a login page or home page after logout
  navigate("/");
};

// --- UserProfileDropdown Component (Improved) ---
const UserProfileDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // Hook for navigation

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative flex items-center ml-4">
      <motion.button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
        whileTap={{ scale: 0.98 }}
      >
        <img
          className="h-9 w-9 rounded-full object-cover"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="User Profile"
        />
        <div className="hidden md:flex flex-col items-start ml-3 mr-1">
          <div className="text-sm font-medium text-gray-800">Admin User</div>
          <div className="text-xs text-gray-500">Administrator</div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 hidden md:block transition-transform duration-200 ${
            dropdownOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 right-0 mt-2 w-56 rounded-xl shadow-2xl py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 origin-top-right"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="font-semibold text-gray-900">Admin User</p>
              <p className="text-sm text-gray-500">admin@app.com</p>
            </div>

            {/* Redirects to /dashboard/profile */}
            <NavLink
              to="/dashboard/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <Users className="h-4 w-4 mr-3" />
              Your Profile
            </NavLink>

            {/* Redirects to /dashboard/settings */}
            <NavLink
              to="/dashboard/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </NavLink>

            {/* Triggers logout and redirects */}
            <button
              onClick={() => handleLogout(navigate)}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- SidebarContent Component ---
const SidebarContent: React.FC<{ navigation: NavItem[]; location: any }> = ({
  navigation,
  location,
}) => (
  <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto shadow-xl lg:shadow-none">
    <div className="flex items-center flex-shrink-0 px-4">
      <Target className="h-8 w-8 text-indigo-600" />
      <span className="ml-2 text-xl font-extrabold text-gray-900">
        FacultyApp
      </span>
    </div>
    <div className="mt-5 flex-grow flex flex-col">
      <nav className="flex-1 px-2 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg transform translate-x-1"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`mr-3 flex-shrink-0 h-6 w-6 transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-indigo-500"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="px-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">© 2024 FacultyApp</p>
      </div>
    </div>
  </div>
);

// --- DashboardLayout Component ---
const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate here

  const navigation: NavItem[] = [
    { name: "Home", href: "/dashboard/home", icon: Home },
    { name: "Overview", href: "/dashboard/overview", icon: BarChart3 },
    { name: "Faculty", href: "/dashboard/faculty", icon: Users },
    { name: "Categories", href: "/dashboard/categories", icon: FolderOpen },
    { name: "Reports", href: "/dashboard/reports", icon: FileText },
    { name: "Calendar", href: "/dashboard/calender", icon: Target },
    { name: "Contacts", href: "/dashboard/contacts", icon: Users },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  ];

  const isHomePage = location.pathname === "/dashboard/home";

  // Handler for Notification Click
  const handleNotificationClick = () => {
    navigate("/dashboard/notifications");
  };

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
        <div className="relative z-20 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-200">
          <motion.button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            whileTap={{ scale: 0.9 }}
          >
            {sidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>

          <div className="flex-1 px-4 flex justify-between items-center">
            {/* Search - Conditionally rendered */}
            {isHomePage && (
              <div className="flex-1 max-w-lg hidden sm:block">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
                    placeholder="Search sessions, faculty, reports..."
                    type="search"
                  />
                </div>
              </div>
            )}

            {/* Right side icons and profile */}
            <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
              <motion.button
                onClick={handleNotificationClick} // Notification click redirect
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative"
                whileTap={{ scale: 0.9 }}
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
              </motion.button>

              {/* User Profile Dropdown */}
              <UserProfileDropdown />
            </div>
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

export default DashboardLayout;
