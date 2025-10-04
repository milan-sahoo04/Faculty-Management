import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Play,
  Users,
  Calendar,
  BarChart3,
  FileText,
  Clock,
  Plus,
  Bell,
  Activity,
  Zap,
  Briefcase,
  Shield,
  Loader, // New Icon for In Progress
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from "framer-motion";

// --- Mock Data for Dynamic Live Session Feature ---
const MOCK_LIVE_SESSION_DATA = {
  isLive: true,
  sessionTitle: "AI Fundamentals: Neural Networks",
  faculty: "Dr. Anya Sharma",
  duration: "2:34:12",
};

// --- NEW MOCK DATA for Upcoming Sessions Widget ---
const MOCK_UPCOMING_SESSIONS = [
  {
    id: 201,
    name: "Quantum Mechanics Review",
    faculty: "Prof. Li Wei",
    time: "9:00 AM",
    date: "Today",
    category: "Physics",
  },
  {
    id: 202,
    name: "Advanced CSS Layouts Workshop",
    faculty: "Mr. David Kim",
    time: "1:30 PM",
    date: "Today",
    category: "Computer Science",
  },
  {
    id: 203,
    name: "Microeconomics Case Study",
    faculty: "Dr. Sarah Johnson",
    time: "10:00 AM",
    date: "Tomorrow",
    category: "Economics",
  },
];

// --- New Component for Animated Counting Stat ---
interface AnimatedStatProps {
  from: number;
  to: number;
  duration: number;
  suffix: string;
  label: string;
  colorClass: string;
  isPercentage?: boolean; // Changed from isDecimal for clarity
}

const AnimatedStat = ({
  from,
  to,
  duration,
  suffix,
  label,
  colorClass,
  isPercentage = false,
}: AnimatedStatProps) => {
  const count = useMotionValue(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const formattedValue = useTransform(count, (latest) => {
    // Format large numbers with commas, and handle percentages
    const value = isPercentage ? latest.toFixed(1) : latest.toFixed(0);
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  });

  useEffect(() => {
    if (isInView) {
      // Use to=to/100 for percentages to get the full number for animation
      const target = isPercentage ? to : to;
      const controls = animate(count, target, { duration: duration });
      return controls.stop;
    }
  }, [isInView, count, to, duration, isPercentage]);

  return (
    <motion.div
      ref={ref}
      className="text-center p-6 rounded-lg bg-gray-50 border border-gray-200 cursor-default"
      whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
    >
      <motion.div className={`text-4xl font-extrabold ${colorClass} mb-1`}>
        <motion.span>{formattedValue}</motion.span>
        {suffix}
      </motion.div>
      <div className="text-sm text-gray-600">{label}</div>
    </motion.div>
  );
};

// --- HomePage Component ---
const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigateTo = (path: string) => {
    navigate(path);
  };

  const [liveSession] = useState(MOCK_LIVE_SESSION_DATA);

  // --- NEW: Operational Metrics (Mini-Metrics) ---
  const operationalMetrics = [
    {
      title: "Scheduled",
      value: 45, // Mock data
      change: "+5",
      icon: Calendar,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
      path: "/dashboard/calender",
    },
    {
      title: "In Progress",
      value: 3, // Mock data
      change: "+1",
      icon: Loader,
      color: "text-blue-600",
      bg: "bg-blue-100",
      path: "/dashboard/sessions?status=in-progress",
    },
    {
      title: "Completed Today",
      value: 12, // Mock data
      change: "-2",
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
      path: "/dashboard/reports?period=today",
    },
    {
      title: "Active Faculty",
      value: 85, // Mock data
      change: "+3",
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-100",
      path: "/dashboard/faculty",
    },
  ];

  // --- Data Definitions (Rest of your existing data) ---
  const steps = [
    {
      title: "Setup Your Account",
      description: "Create your profile and configure basic settings",
      completed: true,
      action: () => handleNavigateTo("/dashboard/settings"),
    },
    {
      title: "Add Faculty Members",
      description: "Import or manually add your teaching staff",
      completed: true,
      action: () => handleNavigateTo("/dashboard/faculty"),
    },
    {
      title: "Create Categories",
      description: "Organize sessions by subject or department",
      completed: true,
      action: () => handleNavigateTo("/dashboard/categories"),
    },
    {
      title: "Schedule Sessions",
      description: "Start creating and managing faculty sessions",
      completed: false,
      action: () => handleNavigateTo("/dashboard/calender"),
    },
    {
      title: "Generate Reports",
      description: "Track performance and analytics",
      completed: false,
      action: () => handleNavigateTo("/dashboard/reports"),
    },
  ];

  const quickActions = [
    {
      title: "Manage Faculty",
      description: "Add, edit, or remove teaching staff profiles.",
      icon: Users,
      path: "/dashboard/faculty",
      iconColor: "text-purple-600",
      bgClass: "bg-purple-100",
    },
    {
      title: "View Calender",
      description: "See all scheduled sessions at a glance.",
      icon: Calendar,
      path: "/dashboard/calender",
      iconColor: "text-blue-600",
      bgClass: "bg-blue-100",
    },
    {
      title: "System Settings",
      description: "Configure user roles and general application settings.",
      icon: Shield,
      path: "/dashboard/settings",
      iconColor: "text-yellow-600",
      bgClass: "bg-yellow-100",
    },
    {
      title: "Generate Report",
      description: "Quickly access performance and attendance metrics.",
      icon: BarChart3,
      path: "/dashboard/reports",
      iconColor: "text-green-600",
      bgClass: "bg-green-100",
    },
  ];

  const activityLog = [
    {
      text: "A new session on 'AI Fundamentals' has started.",
      time: "2 minutes ago",
      icon: Play,
    },
    {
      text: "Dr. Anya Sharma updated her profile.",
      time: "15 minutes ago",
      icon: Users,
    },
    {
      text: "Report 'Q3 Session Summary' was generated.",
      time: "1 hour ago",
      icon: FileText,
    },
    {
      text: "Dr. Alex Chen scheduled a new session.",
      time: "2 hours ago",
      icon: Calendar,
    },
  ];

  // Calculate completion percentage
  const completedSteps = steps.filter((step) => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-700 to-blue-600 rounded-3xl p-8 lg:p-12 mb-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-36 h-36 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between">
          <div className="flex-1 mt-6 md:mt-0">
            {/* Live Session Indicator - DYNAMICALLY RENDERED */}
            {liveSession.isLive && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center text-sm mb-4 bg-red-600 px-3 py-1 rounded-full w-fit font-semibold"
              >
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span>LIVE Session: {liveSession.sessionTitle}</span>
                <motion.button
                  onClick={() => console.log("Join Live Session")} // Action to join the live session
                  className="ml-3 flex items-center bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full transition-colors text-xs"
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-3 h-3 mr-1" />
                  Join Now
                </motion.button>
              </motion.div>
            )}

            <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight">
              Welcome Back, Admin!
              <br className="hidden md:inline" />
              <span className="text-blue-200">
                Streamline Your Faculty Management
              </span>
            </h1>
            <p className="text-lg opacity-90 mb-6 max-w-xl">
              Create, manage, and track faculty sessions with powerful
              analytics. Perfect for educational institutions and training
              organizations.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                onClick={() => handleNavigateTo("/dashboard/calender")}
                className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95, y: 0 }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Session
              </motion.button>
              <motion.button
                onClick={() => handleNavigateTo("/dashboard/reports")}
                className="border border-white border-opacity-30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:bg-opacity-10 transition-colors flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                View Reports
              </motion.button>
            </div>
          </div>
          <div className="flex-shrink-0 w-full max-w-xs md:max-w-sm ml-0 md:ml-6 mt-4 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="An illustration of a team collaborating on a dashboard"
              className="rounded-xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* NEW: Operational Metrics / Status Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {operationalMetrics.map((metric, index) => (
          <motion.div
            key={index}
            className={`bg-white rounded-xl shadow-md p-5 border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-300`}
            onClick={() => handleNavigateTo(metric.path)}
            whileHover={{ y: -3, boxShadow: "0 8px 16px rgba(0,0,0,0.05)" }}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                {metric.title}
              </p>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${metric.bg}`}
              >
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {metric.value}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span
                className={`font-semibold ${
                  metric.change.startsWith("+")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {metric.change}
              </span>{" "}
              since yesterday
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Getting Started & Upcoming Sessions */}
        <div className="lg:col-span-1 space-y-8">
          {/* Upcoming Sessions Widget - NEW FEATURE */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 text-indigo-500 mr-2" />
              Upcoming Sessions
            </h2>
            <ul className="space-y-4">
              {MOCK_UPCOMING_SESSIONS.map((session, index) => (
                <motion.li
                  key={index}
                  className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() =>
                    handleNavigateTo(`/dashboard/session/${session.id}`)
                  }
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 leading-tight">
                      {session.name}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">
                      <span className="font-medium">{session.time}</span> •{" "}
                      {session.faculty}
                    </p>
                    <span className="text-xs font-medium text-gray-500 px-2 py-0.5 rounded-full bg-gray-200 mt-1 inline-block">
                      {session.category}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
            <motion.button
              onClick={() => handleNavigateTo("/dashboard/calender")}
              className="mt-4 w-full text-sm text-indigo-600 font-medium py-2 rounded-lg border border-indigo-100 bg-indigo-50 hover:bg-indigo-100 transition-colors"
              whileTap={{ scale: 0.98 }}
            >
              View Full Calendar
            </motion.button>
          </div>

          {/* Getting Started */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Getting Started 🚀
              </h2>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {completedSteps} / {steps.length}
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div
                className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            {/* Steps */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`flex items-start space-x-4 p-4 rounded-lg transition-colors cursor-pointer ${
                    step.completed ? "bg-gray-50" : "hover:bg-gray-100"
                  }`}
                  onClick={step.action}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed ? "bg-green-100" : "bg-gray-200"
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <span className="text-md font-bold text-gray-600">
                        {index + 1}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-base font-semibold ${
                        step.completed ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Activity className="w-5 h-5 text-purple-500 mr-2" />
              Quick Actions
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleNavigateTo(action.path)}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg ${action.bgClass} text-center transition-transform duration-200`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <action.icon className={`w-6 h-6 ${action.iconColor} mb-2`} />
                  <span className="text-xs font-semibold text-gray-800">
                    {action.title}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* New Sections: What's New and Live Activity Feed */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* What's New Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Bell className="w-5 h-5 text-gray-600 mr-2" />
                What's New
              </h2>
              <ul className="space-y-4">
                {/* Simplified Feature List (using your existing data) */}
                {activityLog.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                      <item.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">
                        {item.text}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {item.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Live Activity Feed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Activity className="w-5 h-5 text-blue-500 mr-2" />
                Recent Activity Log
              </h2>
              <div className="space-y-4">
                {activityLog.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                      <activity.icon className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 text-sm">{activity.text}</p>
                      <span className="text-xs text-gray-400">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats - ANIMATED SECTION */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 text-gray-600 mr-2" />
              Organizational Stats
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <AnimatedStat
                from={0}
                to={2500}
                duration={1.5}
                suffix="+"
                label="Faculty Members"
                colorClass="text-purple-600"
              />
              <AnimatedStat
                from={0}
                to={15000}
                duration={1.5}
                suffix="+"
                label="Sessions Conducted"
                colorClass="text-blue-600"
              />
              <AnimatedStat
                from={0}
                to={98.3} // Use a decimal value to test the new formatting logic
                duration={1.5}
                suffix="%"
                label="Satisfaction Rate"
                colorClass="text-green-600"
                isPercentage={true} // Use new flag
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
