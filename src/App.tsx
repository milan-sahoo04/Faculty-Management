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
import MessagePage from "./pages/MessagePage";

/**
 * Component to handle authentication check for protected routes.
 */
const PrivateRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 text-lg dark:text-white">
        Checking Authentication Status...
      </div>
    );
  }

  if (user) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

/**
 * Component holding the core application routes.
 */
const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
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
            <AnimatedLandingPage />
          )
        }
      />

      {/* Protected Route Wrapper: Guards the /dashboard/* paths */}
      <Route element={<PrivateRoutes />}>
        {/* Dashboard Layout, renders the shared navigation/structure */}
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          {/* Nested Routes (content rendered inside DashboardLayout's <Outlet />) */}
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

          {/* THE MESSAGES ROUTE: Accessible at /dashboard/messages */}
          <Route path="messages" element={<MessagePage />} />

          {/* Redirect "/dashboard" (index) to "/dashboard/home" */}
          <Route index element={<Navigate to="home" replace />} />
        </Route>
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

/**
 * The main App component wraps everything in providers.
 */
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        {/* NOTE: BrowserRouter must wrap App in your main entry file (main.jsx/main.tsx) */}
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
