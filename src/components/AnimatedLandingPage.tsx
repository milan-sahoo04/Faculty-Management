// src/components/AnimatedLandingPage.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  ArrowRight,
  X,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  BookOpen,
  Users,
  Zap,
  BarChart,
  FileText,
} from "lucide-react";
import LoginPage from "../pages/LoginPage";
import landingPhoto from "../assets/landingphoto.png";

interface AnimatedLandingPageProps {
  onLogin?: () => void;
}

const AnimatedLandingPage: React.FC<AnimatedLandingPageProps> = ({
  onLogin,
}) => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    setShowLogin(false);
    if (onLogin) onLogin();
  };

  const floatVariants = {
    initial: { y: 0, rotate: 0 },
    animate: (i: number) => ({
      y: [0, -15 - i * 5, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 8 + i * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.5,
      },
    }),
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 relative overflow-hidden flex flex-col">
      <div className="relative z-10 flex-grow flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-6 md:px-12 md:py-8 w-full max-w-screen-2xl mx-auto">
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
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </motion.div>
            <span className="text-2xl font-bold text-gray-800">
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
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center p-6 md:p-12">
          <div className="max-w-screen-2xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.2, delayChildren: 0.3 },
                },
              }}
              className="space-y-8 lg:space-y-10"
            >
              <div className="space-y-6">
                <motion.h1
                  variants={itemVariants}
                  className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-800 leading-tight"
                >
                  Empowering{" "}
                  <span className="text-blue-600 drop-shadow-md">
                    Education
                  </span>
                  <br className="hidden md:block" />
                  for Faculty & Students
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-lg md:text-xl text-gray-600 max-w-md lg:max-w-lg"
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
                variants={itemVariants}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <motion.button
                  onClick={() => setShowLogin(true)}
                  className="px-8 py-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors flex items-center space-x-2 group shadow-lg"
                  whileHover={{
                    y: -3,
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
                  }}
                  whileTap={{ y: 0, scale: 0.98 }}
                >
                  <span>Join Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:border-blue-400 hover:text-blue-700 transition-colors shadow-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Section with Image and Floating Icons */}
            <div className="relative flex justify-center items-center lg:h-[600px] mt-8 lg:mt-0">
              <motion.img
                src={landingPhoto}
                alt="Faculty Portal Dashboard"
                className="w-full max-w-xl lg:max-w-none rounded-3xl z-10"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              />

              {/* Floating Icons around the image */}
              <motion.div
                className="absolute -top-10 left-1/4 transform -translate-x-1/2"
                variants={floatVariants}
                custom={0}
                animate="animate"
              >
                <div className="p-3 bg-white rounded-full shadow-lg border border-blue-100">
                  <BookOpen className="w-6 h-6 text-blue-500" />
                </div>
              </motion.div>
              <motion.div
                className="absolute top-1/4 -right-10"
                variants={floatVariants}
                custom={1}
                animate="animate"
              >
                <div className="p-3 bg-white rounded-full shadow-lg border border-teal-100">
                  <Users className="w-6 h-6 text-teal-500" />
                </div>
              </motion.div>
              <motion.div
                className="absolute bottom-1/3 -left-10"
                variants={floatVariants}
                custom={2}
                animate="animate"
              >
                <div className="p-3 bg-white rounded-full shadow-lg border border-purple-100">
                  <BarChart className="w-6 h-6 text-purple-500" />
                </div>
              </motion.div>
              <motion.div
                className="absolute -bottom-10 right-1/4 transform translate-x-1/2"
                variants={floatVariants}
                custom={3}
                animate="animate"
              >
                <div className="p-3 bg-white rounded-full shadow-lg border border-orange-100">
                  <Zap className="w-6 h-6 text-orange-500" />
                </div>
              </motion.div>
              <motion.div
                className="absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
                variants={floatVariants}
                custom={4}
                animate="animate"
              >
                <div className="p-3 bg-white rounded-full shadow-lg border border-green-100">
                  <FileText className="w-6 h-6 text-green-500" />
                </div>
              </motion.div>
            </div>
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

      <Footer />
    </div>
  );
};

// Modernized Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Tagline */}
        <div className="col-span-1 md:col-span-1 space-y-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-blue-200" />
            <span className="text-2xl font-bold">Faculty Portal</span>
          </div>
          <p className="text-sm text-blue-100 leading-relaxed">
            Revolutionizing academic management to foster growth and
            collaboration.
          </p>
          <div className="flex space-x-4 mt-6">
            <a
              href="#"
              aria-label="Facebook"
              className="text-blue-200 hover:text-white transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-blue-200 hover:text-white transition-colors"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-blue-200 hover:text-white transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-5 text-blue-50">
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="#"
                className="text-blue-100 hover:text-white transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-100 hover:text-white transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-100 hover:text-white transition-colors"
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-100 hover:text-white transition-colors"
              >
                Testimonials
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold mb-5 text-blue-50">Resources</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="#"
                className="text-blue-100 hover:text-white transition-colors"
              >
                Blog & News
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-100 hover:text-white transition-colors"
              >
                Support Center
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-100 hover:text-white transition-colors"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-100 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="text-lg font-semibold mb-5 text-blue-50">
            Get in Touch
          </h4>
          <ul className="space-y-3 text-sm text-blue-100">
            <li className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-blue-200 mt-0.5" />
              <span>support@facultyportal.com</span>
            </li>
            <li className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-blue-200 mt-0.5" />
              <span>+1 (234) 567-8900</span>
            </li>
            <li className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-blue-200 mt-0.5" />
              <span>
                789 Innovation Drive, Suite 101, <br />
                Campus City, CA 90210
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-blue-600 text-center text-sm text-blue-200">
        © {new Date().getFullYear()} Faculty Portal. All rights reserved.
      </div>
    </footer>
  );
};

export default AnimatedLandingPage;
