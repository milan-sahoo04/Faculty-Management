// src/App.tsx
import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import styled, { keyframes } from "styled-components"; // Import styled-components and keyframes
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

// =================================================================
// 🐹 LOADER COMPONENT DEFINITION (Included directly in App.tsx)
// =================================================================

const spokeAnimation = keyframes`
  from { transform: rotate(0); }
  to { transform: rotate(-1turn); }
`;

const hamsterAnimation = keyframes`
  from, to { transform: rotate(4deg) translate(-0.8em, 1.85em); }
  50% { transform: rotate(0) translate(-0.8em, 1.85em); }
`;

const hamsterHeadAnimation = keyframes`
  from, 25%, 50%, 75%, to { transform: rotate(0); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(8deg); }
`;

const hamsterEyeAnimation = keyframes`
  from, 90%, to { transform: scaleY(1); }
  95% { transform: scaleY(0); }
`;

const hamsterEarAnimation = keyframes`
  from, 25%, 50%, 75%, to { transform: rotate(0); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(12deg); }
`;

const hamsterBodyAnimation = keyframes`
  from, 25%, 50%, 75%, to { transform: rotate(0); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(-2deg); }
`;

const hamsterFRLimbAnimation = keyframes`
  from, 25%, 50%, 75%, to { transform: rotate(50deg) translateZ(-1px); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(-30deg) translateZ(-1px); }
`;

const hamsterFLLimbAnimation = keyframes`
  from, 25%, 50%, 75%, to { transform: rotate(-30deg); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(50deg); }
`;

const hamsterBRLimbAnimation = keyframes`
  from, 25%, 50%, 75%, to { transform: rotate(-60deg) translateZ(-1px); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(20deg) translateZ(-1px); }
`;

const hamsterBLLimbAnimation = keyframes`
  from, 25%, 50%, 75%, to { transform: rotate(20deg); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(-60deg); }
`;

const hamsterTailAnimation = keyframes`
  from, 25%, 50%, 75%, to { transform: rotate(30deg) translateZ(-1px); }
  12.5%, 37.5%, 62.5%, 87.5% { transform: rotate(10deg) translateZ(-1px); }
`;

const StyledLoaderWrapper = styled.div`
  /* Full screen wrapper for centering the loader */
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(
    --color-background,
    #f9fafb
  ); /* Use a standard light background */
  color: var(--color-text, #1f2937); /* Standard text color */
  z-index: 1000; /* Ensure it covers everything */

  .wheel-and-hamster {
    --dur: 1s;
    position: relative;
    width: 12em;
    height: 12em;
    font-size: 14px;
    margin-bottom: 2em; /* Space for the text below */
  }

  .wheel,
  .hamster,
  .hamster div,
  .spoke {
    position: absolute;
  }

  .wheel,
  .spoke {
    border-radius: 50%;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .wheel {
    background: radial-gradient(
      100% 100% at center,
      hsla(0, 0%, 60%, 0) 47.8%,
      hsl(0, 0%, 60%) 48%
    );
    z-index: 2;
  }

  .hamster {
    animation: ${hamsterAnimation} var(--dur) ease-in-out infinite;
    top: 50%;
    left: calc(50% - 3.5em);
    width: 7em;
    height: 3.75em;
    transform: rotate(4deg) translate(-0.8em, 1.85em);
    transform-origin: 50% 0;
    z-index: 1;
  }

  .hamster__head {
    animation: ${hamsterHeadAnimation} var(--dur) ease-in-out infinite;
    background: hsl(30, 90%, 55%);
    border-radius: 70% 30% 0 100% / 40% 25% 25% 60%;
    box-shadow: 0 -0.25em 0 hsl(30, 90%, 80%) inset,
      0.75em -1.55em 0 hsl(30, 90%, 90%) inset;
    top: 0;
    left: -2em;
    width: 2.75em;
    height: 2.5em;
    transform-origin: 100% 50%;
  }

  .hamster__ear {
    animation: ${hamsterEarAnimation} var(--dur) ease-in-out infinite;
    background: hsl(0, 90%, 85%);
    border-radius: 50%;
    box-shadow: -0.25em 0 hsl(30, 90%, 55%) inset;
    top: -0.25em;
    right: -0.25em;
    width: 0.75em;
    height: 0.75em;
    transform-origin: 50% 75%;
  }

  .hamster__eye {
    animation: ${hamsterEyeAnimation} var(--dur) linear infinite;
    background-color: hsl(0, 0%, 0%);
    border-radius: 50%;
    top: 0.375em;
    left: 1.25em;
    width: 0.5em;
    height: 0.5em;
  }

  .hamster__nose {
    background: hsl(0, 90%, 75%);
    border-radius: 35% 65% 85% 15% / 70% 50% 50% 30%;
    top: 0.75em;
    left: 0;
    width: 0.2em;
    height: 0.25em;
  }

  .hamster__body {
    animation: ${hamsterBodyAnimation} var(--dur) ease-in-out infinite;
    background: hsl(30, 90%, 90%);
    border-radius: 50% 30% 50% 30% / 15% 60% 40% 40%;
    box-shadow: 0.1em 0.75em 0 hsl(30, 90%, 55%) inset,
      0.15em -0.5em 0 hsl(30, 90%, 80%) inset;
    top: 0.25em;
    left: 2em;
    width: 4.5em;
    height: 3em;
    transform-origin: 17% 50%;
    transform-style: preserve-3d;
  }

  .hamster__limb--fr,
  .hamster__limb--fl {
    clip-path: polygon(0 0, 100% 0, 70% 80%, 60% 100%, 0% 100%, 40% 80%);
    top: 2em;
    left: 0.5em;
    width: 1em;
    height: 1.5em;
    transform-origin: 50% 0;
  }

  .hamster__limb--fr {
    animation: ${hamsterFRLimbAnimation} var(--dur) linear infinite;
    background: linear-gradient(hsl(30, 90%, 80%) 80%, hsl(0, 90%, 75%) 80%);
    transform: rotate(15deg) translateZ(-1px);
  }

  .hamster__limb--fl {
    animation: ${hamsterFLLimbAnimation} var(--dur) linear infinite;
    background: linear-gradient(hsl(30, 90%, 90%) 80%, hsl(0, 90%, 85%) 80%);
    transform: rotate(15deg);
  }

  .hamster__limb--br,
  .hamster__limb--bl {
    border-radius: 0.75em 0.75em 0 0;
    clip-path: polygon(
      0 0,
      100% 0,
      100% 30%,
      70% 90%,
      70% 100%,
      30% 100%,
      40% 90%,
      0% 30%
    );
    top: 1em;
    left: 2.8em;
    width: 1.5em;
    height: 2.5em;
    transform-origin: 50% 30%;
  }

  .hamster__limb--br {
    animation: ${hamsterBRLimbAnimation} var(--dur) linear infinite;
    background: linear-gradient(hsl(30, 90%, 80%) 90%, hsl(0, 90%, 75%) 90%);
    transform: rotate(-25deg) translateZ(-1px);
  }

  .hamster__limb--bl {
    animation: ${hamsterBLLimbAnimation} var(--dur) linear infinite;
    background: linear-gradient(hsl(30, 90%, 90%) 90%, hsl(0, 90%, 85%) 90%);
    transform: rotate(-25deg);
  }

  .hamster__tail {
    animation: ${hamsterTailAnimation} var(--dur) linear infinite;
    background: hsl(0, 90%, 85%);
    border-radius: 0.25em 50% 50% 0.25em;
    box-shadow: 0 -0.2em 0 hsl(0, 90%, 75%) inset;
    top: 1.5em;
    right: -0.5em;
    width: 1em;
    height: 0.5em;
    transform: rotate(30deg) translateZ(-1px);
    transform-origin: 0.25em 0.25em;
  }

  .spoke {
    animation: ${spokeAnimation} var(--dur) linear infinite;
    background: radial-gradient(
        100% 100% at center,
        hsl(0, 0%, 60%) 4.8%,
        hsla(0, 0%, 60%, 0) 5%
      ),
      linear-gradient(
          hsla(0, 0%, 55%, 0) 46.9%,
          hsl(0, 0%, 65%) 47% 52.9%,
          hsla(0, 0%, 65%, 0) 53%
        )
        50% 50% / 99% 99% no-repeat;
  }
`;

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <StyledLoaderWrapper className="bg-gray-50 dark:bg-gray-900 text-lg dark:text-white">
      <div
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        className="wheel-and-hamster"
      >
        <div className="wheel" />
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear" />
              <div className="hamster__eye" />
              <div className="hamster__nose" />
            </div>
            <div className="hamster__limb hamster__limb--fr" />
            <div className="hamster__limb hamster__limb--fl" />
            <div className="hamster__limb hamster__limb--br" />
            <div className="hamster__limb hamster__limb--bl" />
            <div className="hamster__tail" />
          </div>
        </div>
        <div className="spoke" />
      </div>
      <p>{message}</p>
    </StyledLoaderWrapper>
  );
};

// =================================================================
// 🚀 APPLICATION ROUTES (Using the new Loader Component)
// =================================================================

/**
 * Component to handle authentication check for protected routes.
 */
const PrivateRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // 🔑 Replaced static text with Loader component
    return <Loader message="Checking Authentication Status..." />;
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
    // 🔑 Replaced static text with Loader component
    return <Loader message="Initializing App..." />;
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
