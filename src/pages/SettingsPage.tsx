import React, { useState, useEffect } from "react";
import {
  Settings,
  User,
  Bell,
  Palette,
  Lock,
  Users,
  Briefcase,
  Database,
  ChevronRight,
  LogOut,
  Sun,
  Moon,
  Monitor,
  Type,
  Trash2,
  PlusCircle,
  CheckCircle,
  XCircle,
  Calendar,
  Mail,
  AlertTriangle,
  Download,
  Upload,
} from "lucide-react";

// --- Mock Data and Local Storage Utilities ---

// Mock user list structure
interface UserRecord {
  id: number;
  name: string;
  email: string;
  role: "faculty" | "admin" | "staff";
  status: "active" | "inactive";
}

const mockFaculty: UserRecord = {
  id: 101,
  name: "Dr. Elena Rodriguez",
  email: "e.rodriguez@uni.edu",
  role: "faculty",
  status: "active",
};
const mockAdmin: UserRecord = {
  id: 999,
  name: "Admin User",
  email: "admin@uni.edu",
  role: "admin",
  status: "active",
};

// Simulate getting the current logged-in user (Admin for full access)
const CURRENT_USER_ROLE = "admin";
const CURRENT_USER_ID = 999;

// Initial data for localStorage simulation
const getInitialUsers = (): UserRecord[] => {
  const stored = localStorage.getItem("mockUserList");
  if (stored) return JSON.parse(stored);
  return [
    mockFaculty,
    {
      id: 102,
      name: "Prof. Michael Chen",
      email: "m.chen@uni.edu",
      role: "faculty",
      status: "active",
    },
    {
      id: 103,
      name: "Ms. Sarah Davis",
      email: "s.davis@uni.edu",
      role: "staff",
      status: "inactive",
    },
    mockAdmin,
  ];
};

// --- Settings Page Component ---

// Sidebar Navigation Items
const navItems = [
  { id: "profile", label: "Profile & Account", icon: User, role: "standard" },
  { id: "notifications", label: "Notifications", icon: Bell, role: "standard" },
  { id: "appearance", label: "Appearance", icon: Palette, role: "standard" },
  {
    id: "security",
    label: "Security & Activity",
    icon: Lock,
    role: "standard",
  },
  // Admin Sections (visible only to Admins)
  {
    id: "user_management",
    label: "User Management",
    icon: Users,
    role: "admin",
  },
  {
    id: "system_config",
    label: "System Configuration",
    icon: Briefcase,
    role: "admin",
  },
  {
    id: "data_maintenance",
    label: "Data & Maintenance",
    icon: Database,
    role: "admin",
  },
];

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState(
    CURRENT_USER_ROLE === "admin" ? "user_management" : "profile"
  );
  const [theme, setTheme] = useState(
    localStorage.getItem("appTheme") || "system"
  );
  const [fontSize, setFontSize] = useState(
    localStorage.getItem("appFontSize") || "medium"
  );
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  // Admin state
  const [mockUsers, setMockUsers] = useState<UserRecord[]>(getInitialUsers);
  const isAdmin = CURRENT_USER_ROLE === "admin";

  // Persist theme/font changes immediately
  useEffect(() => {
    localStorage.setItem("appTheme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("appFontSize", fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("mockUserList", JSON.stringify(mockUsers));
  }, [mockUsers]);

  // Simple Alert/Toast Function (simulated)
  const showSuccess = (message: string) => alert(`✅ Success: ${message}`);
  const showError = (message: string) => alert(`❌ Error: ${message}`);

  // --- Utility Component for Settings Rows ---
  const SettingRow: React.FC<{
    title: string;
    description: string;
    children: React.ReactNode;
  }> = ({ title, description, children }) => (
    <div className="flex justify-between items-center py-4 border-b last:border-b-0">
      <div className="flex flex-col">
        <span className="font-semibold text-gray-800">{title}</span>
        <span className="text-sm text-gray-500 max-w-lg">{description}</span>
      </div>
      <div className="ml-4">{children}</div>
    </div>
  );

  // --- Component Implementations (Sections) ---

  const ProfileSection: React.FC = () => {
    const [profile, setProfile] = useState({
      name: mockFaculty.name,
      department: "Computer Science",
      bio: "Teaching AI & ML.",
    });

    const handleSave = () => {
      // In a real app: API call to update profile
      showSuccess("Profile information saved!");
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
          Profile Information
        </h2>

        <label className="block">
          <span className="text-gray-700 font-medium">Full Name</span>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">Department</span>
          <input
            type="text"
            value={profile.department}
            onChange={(e) =>
              setProfile({ ...profile, department: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">
            Bio / Research Focus
          </span>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows={3}
          />
        </label>

        <button
          onClick={handleSave}
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Save Profile Changes
        </button>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <SettingRow
            title="Profile Picture Upload"
            description="Upload a new photo (Max 1MB). Using local storage for demo."
          >
            <input
              type="file"
              accept="image/*"
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </SettingRow>

          <SettingRow
            title="Change Password"
            description="Change your account password securely."
          >
            <button className="text-indigo-600 hover:text-indigo-800 font-medium">
              Update Password
            </button>
          </SettingRow>
        </div>
      </div>
    );
  };

  const NotificationsSection: React.FC = () => {
    const [settings, setSettings] = useState({
      emailAssignment: true,
      inAppMessages: true,
      digestFrequency: "daily",
    });

    const toggleSetting = (key: keyof typeof settings) => {
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
      showSuccess("Notification setting updated!");
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
          Notification Preferences
        </h2>

        <SettingRow
          title="Email: New Assignment Submission"
          description="Receive an email notification every time a student submits an assignment."
        >
          <button
            onClick={() => toggleSetting("emailAssignment")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              settings.emailAssignment
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {settings.emailAssignment ? "Enabled" : "Disabled"}
          </button>
        </SettingRow>

        <SettingRow
          title="In-App: Direct Messages"
          description="Show real-time pop-up alerts for new student/colleague messages."
        >
          <button
            onClick={() => toggleSetting("inAppMessages")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              settings.inAppMessages
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {settings.inAppMessages ? "Enabled" : "Disabled"}
          </button>
        </SettingRow>

        <SettingRow
          title="Digest Frequency"
          description="Choose how often you receive a summary of non-urgent activities."
        >
          <select
            value={settings.digestFrequency}
            onChange={(e) =>
              setSettings({
                ...settings,
                digestFrequency: e.target.value as "daily" | "weekly",
              })
            }
            className="p-2 border rounded-md"
          >
            <option value="immediate">Immediate</option>
            <option value="daily">Daily Summary</option>
            <option value="weekly">Weekly Digest</option>
          </select>
        </SettingRow>
      </div>
    );
  };

  const AppearanceSection: React.FC<{
    theme: string;
    setTheme: (t: string) => void;
    fontSize: string;
    setFontSize: (f: string) => void;
  }> = ({ theme, setTheme, fontSize, setFontSize }) => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
        Application Preferences
      </h2>

      <SettingRow
        title="Application Theme"
        description="Control the overall light or dark appearance of the portal."
      >
        <div className="flex space-x-2">
          <button
            onClick={() => setTheme("light")}
            className={`p-2 rounded-full transition-colors ${
              theme === "light"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <Sun className="h-5 w-5" />
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`p-2 rounded-full transition-colors ${
              theme === "dark"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <Moon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setTheme("system")}
            className={`p-2 rounded-full transition-colors ${
              theme === "system"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <Monitor className="h-5 w-5" />
          </button>
        </div>
      </SettingRow>

      <SettingRow
        title="Font Size"
        description="Adjust text size for better readability."
      >
        <div className="flex space-x-2">
          <button
            onClick={() => setFontSize("small")}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              fontSize === "small"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            A-
          </button>
          <button
            onClick={() => setFontSize("medium")}
            className={`px-3 py-1 rounded-md text-base transition-colors ${
              fontSize === "medium"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            A
          </button>
          <button
            onClick={() => setFontSize("large")}
            className={`px-3 py-1 rounded-md text-lg transition-colors ${
              fontSize === "large"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            A+
          </button>
        </div>
      </SettingRow>

      <SettingRow
        title="Default View on Login"
        description="Select the landing page after successful sign-in."
      >
        <select className="p-2 border rounded-md">
          <option>My Dashboard</option>
          <option>Course List</option>
          <option>Today's Schedule</option>
        </select>
      </SettingRow>

      <SettingRow
        title="Time Format"
        description="Display times using 12-hour or 24-hour clock."
      >
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded-md bg-indigo-500 text-white">
            12-Hour
          </button>
          <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700">
            24-Hour
          </button>
        </div>
      </SettingRow>
    </div>
  );

  const SecuritySection: React.FC<{
    is2FAEnabled: boolean;
    setIs2FAEnabled: (b: boolean) => void;
  }> = ({ is2FAEnabled, setIs2FAEnabled }) => {
    const toggle2FA = () => {
      setIs2FAEnabled((prev) => !prev);
      showSuccess(
        `Two-Factor Authentication is now ${
          !is2FAEnabled ? "ENABLED" : "DISABLED"
        }.`
      );
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
          Security & Activity
        </h2>

        <SettingRow
          title="Two-Factor Authentication (2FA)"
          description="Add an extra layer of security by requiring a code from your phone."
        >
          <button
            onClick={toggle2FA}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              is2FAEnabled
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {is2FAEnabled ? "Enabled" : "Disabled"}
          </button>
        </SettingRow>

        <SettingRow
          title="Active Sessions"
          description="See where you are currently logged in."
        >
          <button className="text-indigo-600 hover:text-indigo-800 font-medium">
            Review & Log Out All <LogOut className="inline h-4 w-4 ml-1" />
          </button>
        </SettingRow>

        <div className="pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Recent Login History
          </h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p className="flex justify-between">
              <span>
                <CheckCircle className="inline h-4 w-4 mr-2 text-green-500" />
                Today, 10:45 AM (Chrome, Campus LAN)
              </span>
              <span>Successful</span>
            </p>
            <p className="flex justify-between">
              <span>
                <XCircle className="inline h-4 w-4 mr-2 text-red-500" />
                Yesterday, 7:02 PM (Firefox, Home WiFi)
              </span>
              <span>Failed (Bad Password)</span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const UserManagementSection: React.FC<{
    mockUsers: UserRecord[];
    setMockUsers: React.Dispatch<React.SetStateAction<UserRecord[]>>;
  }> = ({ mockUsers, setMockUsers }) => {
    // Function to add a new mock user
    const handleAddUser = () => {
      const name = prompt("Enter new faculty name:");
      if (!name) return;

      const newUser: UserRecord = {
        id: Date.now(),
        name: name,
        email: `${name.toLowerCase().replace(/\s/g, ".")}@uni.edu`,
        role: "faculty",
        status: "active",
      };
      setMockUsers((prev) => [...prev, newUser]);
      showSuccess(`User ${name} added!`);
    };

    // Function to delete a user
    const handleDeleteUser = (id: number, name: string) => {
      if (id === CURRENT_USER_ID) {
        showError("Cannot delete the current active admin user.");
        return;
      }
      if (window.confirm(`Are you sure you want to delete ${name}?`)) {
        setMockUsers((prev) => prev.filter((u) => u.id !== id));
        showSuccess(`User ${name} deleted.`);
      }
    };

    // Function to toggle role/status (simulated)
    const handleRoleChange = (
      id: number,
      newRole: "faculty" | "admin" | "staff"
    ) => {
      setMockUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
      );
      showSuccess(`User role updated.`);
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
          User Management
        </h2>

        <button
          onClick={handleAddUser}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center"
        >
          <PlusCircle className="h-5 w-5 mr-2" /> Add/Invite New Faculty
        </button>

        <div className="overflow-x-auto bg-gray-50 rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockUsers.map((user) => (
                <tr
                  key={user.id}
                  className={user.id === CURRENT_USER_ID ? "bg-yellow-50" : ""}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}{" "}
                    {user.id === CURRENT_USER_ID && (
                      <span className="text-xs text-indigo-500">(You)</span>
                    )}
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value as any)
                      }
                      className="p-1 border rounded-md text-sm"
                      disabled={user.id === CURRENT_USER_ID}
                    >
                      <option value="admin">Admin</option>
                      <option value="faculty">Faculty</option>
                      <option value="staff">Staff</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteUser(user.id, user.name)}
                      className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      disabled={user.id === CURRENT_USER_ID}
                    >
                      <Trash2 className="h-4 w-4 inline" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const SystemConfigSection: React.FC = () => {
    // Mock state for configs
    const [academicYear, setAcademicYear] = useState("2025-2026");
    const [departments, setDepartments] = useState([
      "CS",
      "Math",
      "Physics",
      "History",
    ]);

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
          System Configuration
        </h2>

        <SettingRow
          title="Academic Term Setup"
          description="Define the current active academic year and semester dates."
        >
          <div className="flex space-x-2 items-center">
            <Calendar className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="p-1 border rounded-md w-32"
            />
            <button
              onClick={() => showSuccess("Academic year updated")}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Update
            </button>
          </div>
        </SettingRow>

        <div className="pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Department Management (CRUD)
          </h3>
          <ul className="space-y-2 text-sm">
            {departments.map((dept, index) => (
              <li
                key={dept}
                className="flex justify-between items-center bg-gray-50 p-2 rounded-md border"
              >
                <span>{dept}</span>
                <button
                  onClick={() => {
                    const newDept = prompt(`Rename ${dept} to:`);
                    if (newDept)
                      setDepartments((prev) =>
                        prev.map((d, i) => (i === index ? newDept : d))
                      );
                  }}
                  className="text-blue-500 hover:text-blue-700 mr-4"
                >
                  Edit
                </button>
              </li>
            ))}
            <li className="text-center">
              <button
                onClick={() => {
                  const newDept = prompt("Enter new department name:");
                  if (newDept) setDepartments((prev) => [...prev, newDept]);
                }}
                className="text-green-600 hover:text-green-800 font-medium"
              >
                <PlusCircle className="inline h-4 w-4 mr-1" /> Add Department
              </button>
            </li>
          </ul>
        </div>

        <SettingRow
          title="Announcement Templates"
          description="Manage and pre-configure standard email and system announcement templates."
        >
          <button className="text-indigo-600 hover:text-indigo-800 font-medium">
            <Mail className="inline h-4 w-4 mr-1" /> Edit Templates
          </button>
        </SettingRow>
      </div>
    );
  };

  const DataMaintenanceSection: React.FC = () => {
    // Function to simulate exporting all data to JSON
    const handleExport = () => {
      const allLocalData: { [key: string]: any } = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          allLocalData[key] = localStorage.getItem(key);
        }
      }

      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(allLocalData, null, 2));
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "faculty_portal_backup.json");
      document.body.appendChild(downloadAnchorNode); // Required for Firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();

      showSuccess("All local data exported as JSON.");
    };

    // Function to wipe all local data
    const handleClearLocalData = () => {
      if (
        window.confirm(
          "⚠️ WARNING: This will permanently DELETE ALL local data (users, settings, everything) for this demo. Continue?"
        )
      ) {
        localStorage.clear();
        alert(
          "All local storage data cleared. Please refresh the page to see the effect."
        );
        // You might want to force a page reload here: window.location.reload();
      }
    };

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
          Data & Maintenance
        </h2>

        <SettingRow
          title="Data Backup (Simulated)"
          description="Export all application data stored in your browser's local storage to a JSON file."
        >
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Download className="h-5 w-5 mr-2" /> Export JSON
          </button>
        </SettingRow>

        <SettingRow
          title="System Audit Log"
          description="View a log of all critical administrative actions (simulated log)."
        >
          <button className="text-indigo-600 hover:text-indigo-800 font-medium">
            View Logs
          </button>
        </SettingRow>

        <SettingRow
          title="Clear Local Data"
          description={
            <span className="text-red-500 font-bold">
              DANGER ZONE: Deletes ALL demo data in your browser.
            </span>
          }
        >
          <button
            onClick={handleClearLocalData}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center"
          >
            <AlertTriangle className="h-5 w-5 mr-2" /> Clear All Data
          </button>
        </SettingRow>
      </div>
    );
  };

  // --- Main Settings Layout Component ---

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSection />;
      case "notifications":
        return <NotificationsSection />;
      case "appearance":
        return (
          <AppearanceSection
            theme={theme}
            setTheme={setTheme}
            fontSize={fontSize}
            setFontSize={setFontSize}
          />
        );
      case "security":
        return (
          <SecuritySection
            is2FAEnabled={is2FAEnabled}
            setIs2FAEnabled={setIs2FAEnabled}
          />
        );
      case "user_management":
        return (
          <UserManagementSection
            mockUsers={mockUsers}
            setMockUsers={setMockUsers}
          />
        );
      case "system_config":
        return <SystemConfigSection />;
      case "data_maintenance":
        return <DataMaintenanceSection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Settings className="h-7 w-7 mr-3 text-indigo-600" />
            Portal Settings
          </h1>
          <p className="text-gray-500 mt-1">
            Personalize your experience or manage the entire system.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Sidebar Navigation */}
          <nav className="w-full lg:w-64 bg-gray-50 p-6 border-b lg:border-r lg:border-b-0">
            <ul className="space-y-1">
              {navItems
                .filter(
                  (item) =>
                    item.role === "standard" ||
                    (item.role === "admin" && isAdmin)
                )
                .map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full text-left flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                        activeSection === item.id
                          ? "bg-indigo-500 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-200"
                      } ${
                        item.role === "admin"
                          ? "border-t border-gray-200 pt-4 mt-2"
                          : ""
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.label}
                      {activeSection === item.id && (
                        <ChevronRight className="h-4 w-4 ml-auto" />
                      )}
                    </button>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Content Area */}
          <main className="flex-1 p-6 md:p-10">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
