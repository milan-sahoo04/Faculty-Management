// src/pages/HomePage.tsx
import React from "react";
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
} from "lucide-react";
import { motion } from "framer-motion";

// Placeholder for your navigation logic
const handleCreateSession = () =>
  console.log("Navigating to Create Session page...");
const handleViewDashboard = () => console.log("Navigating to Dashboard...");
const handleNavigateTo = (path) => console.log(`Navigating to ${path}...`);

const HomePage = () => {
  const steps = [
    {
      title: "Setup Your Account",
      description: "Create your profile and configure basic settings",
      completed: true,
      action: () => handleNavigateTo("/settings"),
    },
    {
      title: "Add Faculty Members",
      description: "Import or manually add your teaching staff",
      completed: true,
      action: () => handleNavigateTo("/faculty"),
    },
    {
      title: "Create Categories",
      description: "Organize sessions by subject or department",
      completed: true,
      action: () => handleNavigateTo("/categories"),
    },
    {
      title: "Schedule Sessions",
      description: "Start creating and managing faculty sessions",
      completed: false,
      action: () => handleNavigateTo("/schedule"),
    },
    {
      title: "Generate Reports",
      description: "Track performance and analytics",
      completed: false,
      action: () => handleNavigateTo("/reports"),
    },
  ];

  const features = [
    {
      title: "Faculty Management",
      description: "Comprehensive faculty profiles with subjects and schedules",
      icon: Users,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Session Scheduling",
      description: "Easy-to-use calendar for planning academic sessions",
      icon: Calendar,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Analytics & Reports",
      description: "Detailed insights into faculty performance and engagement",
      icon: BarChart3,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Documentation",
      description: "Maintain records and generate automated reports",
      icon: FileText,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  const whatsNewItems = [
    {
      title: "New feature: Live Session Chat",
      description: "Real-time communication during sessions is now available.",
      icon: Zap,
    },
    {
      title: "Updated: Performance Dashboard",
      description:
        "New metrics and improved visualizations for better insights.",
      icon: BarChart3,
    },
    {
      title: "Scheduled Maintenance",
      description: "System maintenance on October 25th, 2 AM - 4 AM EST.",
      icon: Clock,
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

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center text-sm mb-4 bg-white/20 px-3 py-1 rounded-full w-fit">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span>Live Faculty Session</span>
              <span className="ml-2 flex items-center">
                <Clock className="w-3 h-3 mr-1 opacity-75" />
                2:34:12
              </span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-extrabold mb-4 leading-tight">
              Streamline Your <br className="hidden md:inline" />
              <span className="text-blue-200">Faculty Management</span>
            </h1>
            <p className="text-lg opacity-90 mb-6 max-w-xl">
              Create, manage, and track faculty sessions with powerful
              analytics. Perfect for educational institutions and training
              organizations.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                onClick={handleCreateSession}
                className="bg-white text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95, y: 0 }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Session
              </motion.button>
              <motion.button
                onClick={handleViewDashboard}
                className="border border-white border-opacity-30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:bg-opacity-10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-4 h-4 mr-2" />
                View Dashboard
              </motion.button>
            </div>
          </div>
          <div className="flex-shrink-0 w-full max-w-sm lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="An illustration of a team collaborating on a dashboard"
              className="rounded-xl shadow-lg w-full"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Getting Started */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Getting Started
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

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Everything you need section */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Everything you need for faculty management
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive tools to manage faculty, schedule sessions, and
                track performance all in one place.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col items-start hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`w-14 h-14 ${feature.iconBg} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-base">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* New Sections */}
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
                {whatsNewItems.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                      <item.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {item.description}
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
                Live Activity
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

          {/* Stats */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Quick Stats
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                className="text-center p-6 rounded-lg bg-gray-50 border border-gray-200"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-extrabold text-purple-600 mb-1">
                  2,500+
                </div>
                <div className="text-sm text-gray-600">Faculty Members</div>
              </motion.div>
              <motion.div
                className="text-center p-6 rounded-lg bg-gray-50 border border-gray-200"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-extrabold text-blue-600 mb-1">
                  15,000+
                </div>
                <div className="text-sm text-gray-600">Sessions Conducted</div>
              </motion.div>
              <motion.div
                className="text-center p-6 rounded-lg bg-gray-50 border border-gray-200"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-4xl font-extrabold text-green-600 mb-1">
                  98%
                </div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
