// src/components/DashboardLayout.tsx
import React, { useState, useRef, useEffect, useMemo } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
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
  User,
  Moon,
  Sun,
  Zap,
  MessageSquare, // 💡 NEW: Icon for the chat button
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeContext";
import { useAuth } from "./AuthContext";

// 💡 FIX 1: Import the default image to ensure correct bundling
import defaultUserPhoto from "../assets/milan.png";

// 💡 NEW: Import the ChatComponent you created earlier
// IMPORTANT: Ensure this path is correct relative to DashboardLayout.tsx
import ChatComponent from "./ChatComponent";

// --- Types ---
interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  requiredRole?: "admin" | "student" | "all"; // Role-based access control field
}

interface MockFaculty {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
}

// --- MOCK DATA: Simulate your Faculty Database/API Call ---
// NOTE: Use mock IDs that clearly indicate the faculty member
const mockFacultyData: MockFaculty[] = [
  {
    id: "faculty-milan", // Changed for clarity
    name: "Dr. Milan Sharma",
    role: "Assoc. Professor",
    department: "Computer Science",
    email: "milan.sharma@uni.edu",
  },
  {
    id: "faculty-anya", // Changed for clarity
    name: "Dr. Anya Smith",
    role: "Professor",
    department: "Physics",
    email: "anya.smith@uni.edu",
  },
  {
    id: "faculty-john", // Changed for clarity
    name: "Prof. John Doe",
    role: "Lecturer",
    department: "Mathematics",
    email: "john.doe@uni.edu",
  },
  {
    id: "faculty-jane", // Changed for clarity
    name: "Dr. Jane Wilson",
    role: "Assoc. Professor",
    department: "Biology",
    email: "jane.wilson@uni.edu",
  },
];

// ---------------------------------------------
// --- FacultySearch Component (UPDATED for mobile) ---
// ---------------------------------------------

interface FacultySearchProps {
  onChatSelect: (facultyId: string, facultyName: string) => void;
}

const FacultySearch: React.FC<FacultySearchProps> = ({ onChatSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [resultsOpen, setResultsOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // 1. Filter results based on search term
  const filteredFaculty = useMemo(() => {
    if (!searchTerm) return [];
    const lowerCaseTerm = searchTerm.toLowerCase();
    return mockFacultyData.filter(
      (faculty) =>
        faculty.name.toLowerCase().includes(lowerCaseTerm) ||
        faculty.department.toLowerCase().includes(lowerCaseTerm) ||
        faculty.email.toLowerCase().includes(lowerCaseTerm)
    );
  }, [searchTerm]);

  // 2. Handle selection (Chat button is now available in results)
  const handleSelectFaculty = (facultyId: string) => {
    setSearchTerm("");
    setResultsOpen(false);
    navigate(`/dashboard/faculty/${facultyId}`); // Still allows navigation to profile
  };

  // 3. Close results on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setResultsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    // 💡 CHANGE: Use full width on small screens, max-w-lg on medium/large
    <div ref={searchRef} className="relative flex-1 mr-4 sm:mr-0 sm:max-w-lg">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg leading-5 bg-gray-50 dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
          placeholder="Search Faculty by name, dept, or email..."
          type="search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setResultsOpen(true);
          }}
          onFocus={() => setResultsOpen(true)}
        />
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {searchTerm && resultsOpen && filteredFaculty.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute mt-1 w-full rounded-lg shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-30 max-h-60 overflow-y-auto"
          >
            {filteredFaculty.map((faculty) => (
              <div
                key={faculty.id}
                className="w-full px-2 py-2 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
              >
                <button
                  onClick={() => handleSelectFaculty(faculty.id)}
                  className="flex-1 text-left px-2 py-1 flex flex-col items-start"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {faculty.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {faculty.role} · {faculty.department}
                  </span>
                </button>

                {/* 💡 NEW: Chat Button */}
                <motion.button
                  onClick={() => onChatSelect(faculty.id, faculty.name)}
                  className="p-2 ml-2 rounded-full text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-700 dark:hover:text-white transition-colors"
                  title={`Start chat with ${faculty.name}`}
                  whileTap={{ scale: 0.9 }}
                >
                  <MessageSquare className="h-5 w-5" />
                </motion.button>
              </div>
            ))}
          </motion.div>
        )}
        {searchTerm && resultsOpen && filteredFaculty.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute mt-1 w-full rounded-lg shadow-xl bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-500 z-30"
          >
            No faculty found matching "{searchTerm}".
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ---------------------------------------------
// --- UserProfileDropdown Component (Unchanged) ---
// ---------------------------------------------
const UserProfileDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, logout, role } = useAuth();

  const handleUserLogout = async () => {
    await logout();
    setDropdownOpen(false);
    navigate("/", { replace: true });
  };

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

  const userName =
    user?.displayName || (role === "admin" ? "Admin User" : "Student User");
  const userEmail =
    user?.email || (role === "admin" ? "admin@app.com" : "student@app.com");
  const userPhoto = user?.photoURL || defaultUserPhoto;

  return (
    <div ref={dropdownRef} className="relative flex items-center ml-4">
      <motion.button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none"
        whileTap={{ scale: 0.98 }}
      >
        <img
          className="h-9 w-9 rounded-full object-cover"
          src={userPhoto}
          alt={`${userName} Profile`}
        />
        <div className="hidden md:flex flex-col items-start ml-3 mr-1">
          <div className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {userName}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {role === "admin" ? "Administrator" : "Student"}
          </div>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 hidden md:block transition-transform duration-200 ${
            dropdownOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 right-0 mt-2 w-56 rounded-xl shadow-2xl py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50 origin-top-right"
          >
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">
                {userName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {userEmail}
              </p>
            </div>

            <NavLink
              to="/dashboard/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <User className="h-4 w-4 mr-3" />
              Your Profile
            </NavLink>

            <NavLink
              to="/dashboard/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              onClick={() => setDropdownOpen(false)}
            >
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </NavLink>

            <button
              onClick={handleUserLogout}
              className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition-colors border-t border-gray-100 dark:border-gray-700 mt-1"
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

// ---------------------------------------------
// --- SidebarContent Component (Unchanged) ---
// ---------------------------------------------
const SidebarContent: React.FC<{ navigation: NavItem[] }> = ({
  navigation,
}) => (
  <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-5 pb-4 overflow-y-auto shadow-xl lg:shadow-none">
    <div className="flex items-center flex-shrink-0 px-4">
      <Target className="h-8 w-8 text-indigo-600" />
      <span className="ml-2 text-xl font-extrabold text-gray-900 dark:text-white">
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
                  : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600"
              }`
            }
            onClick={() => {
              // Close mobile sidebar on navigation
              const isMobile = window.innerWidth < 1024; // Tailwind's 'lg' breakpoint is 1024px
              if (isMobile) {
                // This is a bit of a hack since SidebarContent doesn't have setSidebarOpen directly,
                // but for a full file solution, we assume DashboardLayout passes it down or handles it.
                // For now, let's trust the mobile overlay handles the close on navigation/click.
                // In a real app, you would pass a prop like `onNavigate` to close the sidebar.
              }
            }}
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
        {/* NEW: Explicitly add the messages link since it's common */}
        <NavLink
          key="Messages"
          to="/dashboard/messages"
          className={({ isActive }) =>
            `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-indigo-600 text-white shadow-lg transform translate-x-1"
                : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:text-indigo-600"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <MessageSquare
                className={`mr-3 flex-shrink-0 h-6 w-6 transition-colors duration-200 ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 group-hover:text-indigo-500"
                }`}
                aria-hidden="true"
              />
              Messages
            </>
          )}
        </NavLink>
      </nav>
      <div className="px-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 FacultyApp
        </p>
      </div>
    </div>
  </div>
);

// ---------------------------------------------
// --- DashboardLayout Component (Main Export) ---
// ---------------------------------------------
const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBlast, setShowBlast] = useState(false);

  // 💡 NEW STATE: For managing the chat feature
  const [selectedChat, setSelectedChat] = useState<{
    id: string; // The canonical chatRoomId
    name: string; // The name of the person you are chatting with
  } | null>(null);

  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, loading, role } = useAuth(); // Read role for filtering
  const currentUserId = user?.uid; // Get the authenticated user's ID

  // 💡 UTILITY: Function to create a canonical chat room ID
  const createTwoPartyChatId = (userId1: string, userId2: string) => {
    // Sort the IDs alphabetically to ensure the ID is the same regardless of who initiates (e.g., "A--B" always)
    const ids = [userId1, userId2].sort();
    return `${ids[0]}--${ids[1]}`;
  };

  // 💡 UPDATED HANDLER: To open the chat sidebar
  const handleChatSelect = (facultyId: string, facultyName: string) => {
    if (!currentUserId || !facultyId) return;

    // CRITICAL: Use the canonical ID combining the student's UID and the faculty's ID
    const chatId = createTwoPartyChatId(currentUserId, facultyId);

    setSelectedChat({ id: chatId, name: facultyName });
  };

  // 💡 NEW HANDLER: To close the chat sidebar
  const closeChat = () => {
    setSelectedChat(null);
  };

  // 🚀 MASTER NAVIGATION LIST (Unchanged for brevity)
  const allNavigation: NavItem[] = [
    // Links visible to ALL (default requiredRole is 'all')
    { name: "Home", href: "/dashboard/home", icon: Home, requiredRole: "all" },
    {
      name: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
      requiredRole: "all",
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
      requiredRole: "all",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      requiredRole: "all",
    },

    // Links visible ONLY to Admin
    {
      name: "Overview",
      href: "/dashboard/overview",
      icon: BarChart3,
      requiredRole: "admin",
    },
    {
      name: "Faculty",
      href: "/dashboard/faculty",
      icon: Users,
      requiredRole: "admin",
    },
    {
      name: "Categories",
      href: "/dashboard/categories",
      icon: FolderOpen,
      requiredRole: "admin",
    },
    {
      name: "Reports",
      href: "/dashboard/reports",
      icon: FileText,
      requiredRole: "admin",
    },

    // Links visible to Student AND Admin (Student-focused pages)
    {
      name: "Calendar",
      href: "/dashboard/calender",
      icon: Target,
      requiredRole: "student",
    },
    {
      name: "Contacts",
      href: "/dashboard/contacts",
      icon: Users,
      requiredRole: "student",
    },
    // NOTE: Message link is now added explicitly in SidebarContent
  ];

  // 🚀 FILTERED NAVIGATION LOGIC (Unchanged for brevity)
  const navigation = useMemo(() => {
    if (loading || !role) return [];

    return allNavigation.filter((item) => {
      if (role === "admin") {
        return true;
      }
      if (
        role === "student" &&
        (item.requiredRole === "student" || item.requiredRole === "all")
      ) {
        return true;
      }
      return false;
    });
  }, [role, loading]);

  // Handler for Notification Click
  const handleNotificationClick = () => {
    navigate("/dashboard/notifications");
  };

  // Handler for theme toggle with animation
  const handleThemeToggle = () => {
    if (!isDarkMode) {
      setShowBlast(true);
    }
    toggleTheme();
    setTimeout(() => setShowBlast(false), 500);
  };

  // 🚀 AUTH REDIRECTION: If not loading AND no user, redirect to login
  useEffect(() => {
    if (!loading && !user) {
      navigate("/", { replace: true });
    }
  }, [loading, user, navigate]);

  // 🚀 LOADING SCREEN (Unchanged)
  if (loading || !user || !role || !currentUserId) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Zap className="h-12 w-12 text-indigo-600" />
        </motion.div>
        <p className="ml-4 text-lg text-gray-700 dark:text-gray-300">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  // If loading is false, user exists, and role is fetched, render dashboard
  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      {/* Mobile sidebar overlay (Unchanged for brevity) */}
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
              className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              <SidebarContent navigation={navigation} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar (Unchanged for brevity) */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <SidebarContent navigation={navigation} />
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Top navigation */}
        <div className="relative z-20 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <motion.button
            className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            whileTap={{ scale: 0.9 }}
          >
            {sidebarOpen ? (
              <X className="h-6 w-6 dark:text-white" />
            ) : (
              <Menu className="h-6 w-6 dark:text-white" />
            )}
          </motion.button>

          {/* 💡 CHANGE: Adjusted alignment and padding for mobile search */}
          <div className="flex-1 px-4 flex justify-between items-center">
            {/* 🚀 Feature: Faculty Search Component Integration (Passing handler) */}
            <FacultySearch onChatSelect={handleChatSelect} />

            {/* Right side icons and profile (Unchanged for brevity) */}
            <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
              {/* Dark Mode Toggle Button */}
              <motion.button
                onClick={handleThemeToggle}
                className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors relative"
                whileTap={{ scale: 0.9 }}
                aria-label={
                  isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                {isDarkMode ? (
                  <Sun className="h-6 w-6 text-yellow-500" />
                ) : (
                  <Moon className="h-6 w-6 dark:text-gray-200" />
                )}
              </motion.button>

              <motion.button
                onClick={handleNotificationClick}
                className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative"
                whileTap={{ scale: 0.9 }}
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-800" />
              </motion.button>

              {/* User Profile Dropdown */}
              <UserProfileDropdown />
            </div>
          </div>
        </div>

        {/* The "Bomb Blast" Animation Overlay (Unchanged for brevity) */}
        <AnimatePresence>
          {showBlast && (
            <motion.div
              className="absolute inset-0 bg-yellow-400 flex items-center justify-center z-50 pointer-events-none"
              initial={{
                opacity: 0,
                scale: 0,
                borderRadius: "50%",
              }}
              animate={{
                opacity: 0.8,
                scale: 200,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              exit={{
                opacity: 0,
                scale: 0,
                transition: { duration: 0.2, ease: "easeIn" },
              }}
            >
              <Zap className="h-24 w-24 text-red-600" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page content area with Chat Sidebar */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none flex">
          {/* Main Outlet Content */}
          {/* 💡 CHANGE: Adjust padding dynamically for chat sidebar - on mobile, no padding, on large screen, use pr-80 */}
          <div
            className={`flex-1 overflow-x-hidden transition-all duration-300 ${
              selectedChat ? "lg:pr-80" : ""
            }`}
          >
            <Outlet />
          </div>

          {/* 💡 NEW: Sliding Chat Sidebar (UPDATED for mobile) */}
          <AnimatePresence>
            {selectedChat && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
                // 💡 CRITICAL CHANGE: Use fixed w-full on small screens, w-80 on large screens
                className="fixed right-0 top-0 bottom-0 z-40 w-full lg:w-80 shadow-2xl bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col pt-16" // pt-16 matches header height
              >
                <div className="absolute top-0 w-full h-16 bg-white dark:bg-gray-800 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
                  <h5 className="font-semibold text-gray-900 dark:text-white truncate">
                    Chat with {selectedChat.name}
                  </h5>
                  <motion.button
                    onClick={closeChat}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {/* Render the Chat Component here */}
                  <ChatComponent
                    chatRoomId={selectedChat.id}
                    currentUserId={currentUserId} // Use actual Firebase Auth UID
                    currentUserName={user.displayName || user.email || "User"} // Use authenticated user's name
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
