import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// 💡 Import ThemeProvider from the components folder
import { ThemeProvider } from "./components/ThemeContext";
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

// Refactor component holding the routes
const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Routes>
      {/* Public/Login Route */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard/home" replace />
          ) : (
            <AnimatedLandingPage onLogin={handleLogin} />
          )
        }
      />

      {/* Protected Dashboard Route */}
      <Route
        path="/dashboard/*"
        element={
          isAuthenticated ? <DashboardLayout /> : <Navigate to="/" replace />
        }
      >
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

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// 💡 The main App component wraps the routes with ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
