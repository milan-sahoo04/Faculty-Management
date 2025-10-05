// src/App.tsx

import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import { AuthProvider, useAuth } from "./components/AuthContext";
import AnimatedLandingPage from "./components/AnimatedLandingPage";
import DashboardLayout from "./components/DashboardLayout";
import HomePage from "./pages/HomePage";
import OverviewPage from "./pages/OverviewPage";
import FacultyPage from "./pages/FacultyPage";
import CategoriesPage from "./pages/CategoriesPage";
import ReportsPage from "./pages/ReportsPage";
import CalendarPage from "./pages/CalendarPage";
import ContactsPage from "./pages/ContactsPage";
import NotificationPage from "./pages/NotificationPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

// --- New: Component to handle auth check for protected routes ---
const PrivateRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // Show loading screen while Firebase checks auth status
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-lg dark:text-white">
        Checking Authentication Status...
      </div>
    );
  }

  // If there is a user, allow access by rendering the child route (DashboardLayout)
  if (user) {
    return <Outlet />;
  }

  // If no user, redirect to the login page
  return <Navigate to="/" replace />;
};

// Refactor component holding the routes
const AppRoutes = () => {
  // We use useAuth here ONLY to redirect the root path if already logged in
  const { user, loading } = useAuth();

  if (loading) {
    // Show loading screen on the initial load until auth is determined
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-lg dark:text-white">
        Initializing App...
      </div>
    );
  }

  return (
    <Routes>
      {/* Public/Login Route: Redirects to dashboard if user is logged in */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate to="/dashboard/home" replace />
          ) : (
            // No need for onLogin prop anymore, AuthContext handles the state
            <AnimatedLandingPage />
          )
        }
      />

      {/* Protected Route Wrapper: Guards the /dashboard/* paths */}
      <Route element={<PrivateRoutes />}>
        {/* The DashboardLayout and its nested routes are protected by PrivateRoutes */}
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          {/* Nested Routes */}
          <Route path="home" element={<HomePage />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="faculty" element={<FacultyPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="calender" element={<CalendarPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="notifications" element={<NotificationPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />

          {/* Redirect "/dashboard" to "/dashboard/home" */}
          <Route index element={<Navigate to="home" replace />} />
        </Route>
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// The main App component wraps everything in providers
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        {/* The BrowserRouter wrapper should be around App in your main.jsx/main.tsx */}
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
