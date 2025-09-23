import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Users,
  GraduationCap,
  Zap,
  ArrowRight,
  X,
  BarChart,
  FileText,
} from "lucide-react";
import LoginPage from "../pages/LoginPage";

interface AnimatedLandingPageProps {
  onLogin?: () => void; // optional callback
}

const AnimatedLandingPage: React.FC<AnimatedLandingPageProps> = ({
  onLogin,
}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    if (onLogin) onLogin();
  };

  // Animations
  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 5, -5, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const slideVariants = {
    animate: {
      x: [0, 10, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const shapeDanceVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 90, 180, 270, 360],
      scale: [1, 1.2, 1],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-50"
        />
        <motion.div
          variants={pulseVariants}
          animate="animate"
          className="absolute top-32 left-1/4 w-10 h-10 bg-teal-300 rounded opacity-60"
        />
        <motion.div
          variants={slideVariants}
          animate="animate"
          className="absolute top-40 right-1/3 w-12 h-12 bg-cyan-200 rounded-lg opacity-40"
        />
        <motion.div
          variants={shapeDanceVariants}
          animate="animate"
          className="absolute bottom-20 left-10 w-8 h-8 bg-purple-200 rounded-md opacity-40"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-2"
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                },
              }}
            >
              <GraduationCap className="w-7 h-7 text-blue-600" />
            </motion.div>
            <span className="text-xl font-bold text-gray-800">
              Faculty Portal
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex space-x-4"
          >
            <button
              onClick={() => setShowLogin(true)}
              className="px-6 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Sign In
            </button>
            <motion.button
              onClick={() => setShowLogin(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6 md:px-8">
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight"
                >
                  Empowering <span className="text-blue-600">Education</span>
                  <br />
                  for Faculty & Students
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="text-lg text-gray-600 max-w-md"
                >
                  A modern portal to connect{" "}
                  <span className="font-semibold text-blue-600">
                    faculty, students, and admin
                  </span>
                  . Manage classes, track progress, and collaborate — all in one
                  place.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex space-x-4"
              >
                <motion.button
                  onClick={() => setShowLogin(true)}
                  className="px-8 py-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2 group"
                  whileHover={{
                    y: -2,
                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
                  }}
                  whileTap={{ y: 0, scale: 0.98 }}
                >
                  <span>Join Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:border-gray-400 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Section with Student Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative lg:h-[600px] flex items-center justify-center"
            >
              {/* Student Image */}
              <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl border-8 border-white relative z-10">
                <img
                  src="/src/assets/student.png"
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Icons */}
              <motion.div
                variants={pulseVariants}
                animate="animate"
                className="absolute top-8 -right-10"
              >
                <div className="w-14 h-14 bg-teal-500 rounded-lg shadow-lg flex items-center justify-center">
                  <Users className="w-7 h-7 text-white" />
                </div>
              </motion.div>

              <motion.div
                variants={slideVariants}
                animate="animate"
                className="absolute -top-6 left-16"
              >
                <div className="w-12 h-12 bg-orange-400 rounded shadow-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute bottom-10 -left-10"
              >
                <div className="w-16 h-16 bg-blue-500 rounded-full shadow-lg flex items-center justify-center">
                  <BarChart className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              <motion.div
                variants={pulseVariants}
                animate="animate"
                className="absolute bottom-40 right-10"
              >
                <div className="w-12 h-12 bg-pink-400 rounded-lg shadow-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowLogin(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLogin(false)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center z-10 hover:bg-gray-50 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              <LoginPage onLogin={handleLogin} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedLandingPage;
