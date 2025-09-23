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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);

  if (!isAuthenticated) {
    return <AnimatedLandingPage onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/calender" element={<CalendarPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
    </DashboardLayout>
  );
}

export default App;
