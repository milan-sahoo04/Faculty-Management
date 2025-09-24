import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    // This is the key change. After login, set isAuthenticated to true.
    // The router will then automatically handle the next render and navigate
    // the user to the dashboard route based on your logic.
    setIsAuthenticated(true);
  };

  return (
    <Routes>
      {/* This is the Public route for the login/landing page. 
        It only renders if the user is NOT authenticated.
      */}
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

      {/* This is the Protected route for the dashboard. 
        It only renders if the user IS authenticated. 
        If not, they are redirected to the root ("/").
      */}
      <Route
        path="/dashboard/*"
        element={
          isAuthenticated ? <DashboardLayout /> : <Navigate to="/" replace />
        }
      >
        {/* Nested Routes inside the DashboardLayout */}
        <Route path="home" element={<HomePage />} />
        <Route path="overview" element={<OverviewPage />} />
        <Route path="faculty" element={<FacultyPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="calender" element={<CalendarPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="notifications" element={<NotificationPage />} />

        {/* Redirect "/dashboard" to "/dashboard/home" */}
        <Route index element={<Navigate to="home" replace />} />
      </Route>

      {/* Catch-all route for any undefined paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
