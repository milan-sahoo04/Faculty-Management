// src/components/AnimatedLandingPage.tsx

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  animate,
  Variants,
} from "framer-motion";
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
  Heart,
  ChevronUp, // New icon for 'Back to Top'
  ChevronDown, // New icon for 'Scroll Down' in Hero
} from "lucide-react";
import LoginPage from "../pages/LoginPage";
import landingPhoto from "../assets/landingphoto.png"; // Ensure this path is correct

// --- QuickStats Component with Counter Animation ---
interface StatItem {
  value: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  endValue: number;
  format: (val: number) => string;
}

const QuickStats: React.FC = () => {
  const stats: StatItem[] = [
    {
      value: "2,500+",
      label: "Faculty Members",
      icon: Users,
      color: "text-blue-600",
      endValue: 2500,
      format: (val: number) => Math.round(val / 10) * 10 + "+",
    },
    {
      value: "15,000+",
      label: "Sessions Conducted",
      icon: BookOpen,
      color: "text-teal-600",
      endValue: 15000,
      format: (val: number) =>
        (Math.round(val / 100) * 100).toLocaleString() + "+",
    },
    {
      value: "98%",
      label: "Satisfaction Rate",
      icon: Heart,
      color: "text-red-600",
      endValue: 98,
      format: (val: number) => Math.round(val) + "%",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const Counter: React.FC<{ stat: StatItem }> = ({ stat }) => {
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
      if (isInView) {
        const controls = {
          start: 0,
          end: stat.endValue,
          duration: 2,
        };

        const animation = animate(controls.start, controls.end, {
          duration: controls.duration,
          onUpdate: (latest) => {
            setCurrentValue(latest);
          },
        });

        return () => animation.stop();
      }
    }, [isInView, stat.endValue]);

    return (
      <motion.div
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {stat.format(currentValue)}
      </motion.div>
    );
  };

  return (
    <div className="bg-white py-16 md:py-24 shadow-inner-top" ref={ref}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
            Our Impact at a Glance
          </span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl shadow-xl border-t-4 border-blue-600 flex flex-col items-center text-center space-y-4 transition-transform duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.2 + 0.5,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div
                className={`p-4 rounded-full bg-opacity-10 ${stat.color.replace(
                  "text",
                  "bg"
                )} bg-blue-100`}
              >
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <Counter stat={stat} />
              <p className="text-lg font-medium text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
// --- End QuickStats Component ---

// --- AboutUs Section ---
const AboutUsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const featureVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Curriculum Management",
      description:
        "Easily plan, organize, and update course materials and syllabi in a centralized location.",
    },
    {
      icon: Users,
      title: "Enhanced Student Engagement",
      description:
        "Foster a collaborative learning environment with forums, announcements, and integrated communication tools.",
    },
    {
      icon: BarChart,
      title: "Robust Performance Analytics",
      description:
        "Track student and faculty progress with detailed, insightful reports and visual dashboards.",
    },
    {
      icon: Zap,
      title: "Seamless Administrative Workflow",
      description:
        "Automate routine tasks like grading, attendance, and reporting to save valuable time.",
    },
  ];

  return (
    <section id="about" className="bg-blue-50 py-16 md:py-24" ref={ref}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          About <span className="text-blue-600">Faculty Portal</span>
        </motion.h2>
        <motion.p
          className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We are committed to building the future of higher education by
          providing an intuitive and powerful platform for academic excellence.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-teal-500 hover:shadow-blue-300/50 transition-shadow duration-300 transform hover:scale-[1.02]"
              variants={featureVariants}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
            >
              <feature.icon className="w-10 h-10 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// --- LocationMap Section ---
const LocationMap: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  // Placeholder Google Maps Embed URL for a university (e.g., Stanford University)
  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3167.3147817454254!2d-122.1748286846985!3d37.42747427982269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbb2c552554e9%3A0x628e9b6a71e89b25!2sStanford%20University!5e0!3m2!1sen!2sin!4v1633512000000!5m2!1sen!2sin";

  return (
    <section id="map" className="bg-white py-16 md:py-24" ref={ref}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Our <span className="text-blue-600">Campus Location</span>
        </motion.h2>
        <motion.p
          className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Visit us at our main campus to experience our vibrant academic
          community first-hand.
        </motion.p>
        <motion.div
          className="aspect-video w-full h-96 lg:h-[600px] rounded-2xl shadow-2xl overflow-hidden border-4 border-blue-200"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          whileHover={{
            scale: 1.01,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Campus Location Map"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};
// --- End LocationMap Section ---

const AnimatedLandingPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showContent, setShowContent] = useState(false); // New state for content toggle

  // Reference for scrolling to the new content section
  const contentRef = useRef<HTMLDivElement>(null);

  const handleLogin = () => {
    setShowLogin(false);
  };

  const handleLearnMore = () => {
    setShowContent(true);
    // Smooth scroll to the content after a short delay for animation
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const floatVariants: Variants = {
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 relative overflow-x-hidden flex flex-col">
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

        {/* Hero Section (Always visible) */}
        <main className="flex-1 flex items-center justify-center p-6 md:p-12 min-h-[calc(100vh-100px)]">
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
                  onClick={handleLearnMore} // Use the new handler
                  className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:border-blue-400 hover:text-blue-700 transition-colors shadow-sm flex items-center space-x-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>Learn More</span>
                  <ChevronDown className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Section with Image and Floating Icons - IMPROVED STRUCTURE */}
            <div className="relative flex justify-center items-center lg:h-[600px] mt-8 lg:mt-0">
              <motion.div
                className="w-full max-w-xl lg:max-w-none h-auto lg:h-5/6 relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-blue-300/50 border-4 border-white/50 cursor-pointer"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                whileHover={{ opacity: 0.95 }}
              >
                <img
                  src={landingPhoto}
                  alt="Faculty Portal Dashboard"
                  className="w-full h-full object-cover" // object-cover ensures aspect ratio is maintained
                />
              </motion.div>

              {/* Floating Icons around the image (unchanged) */}
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

      {/* Scroll Indicator */}
      {!showContent && (
        <motion.div
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 cursor-pointer p-3 rounded-full bg-blue-600/10 text-blue-600 animate-bounce"
          onClick={handleLearnMore}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      )}

      {/* CONDITIONAL CONTENT SECTIONS */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
            className="flex-shrink-0"
            ref={contentRef} // Reference for scrolling
          >
            {/* About Us */}
            <AboutUsSection />
            <hr className="border-gray-200" />

            {/* Quick Stats */}
            <QuickStats />
            <hr className="border-gray-200" />

            {/* Location Map */}
            <LocationMap />
            <hr className="border-gray-200" />

            {/* Back to Top Button */}
            <div className="text-center py-10 bg-white">
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="px-8 py-3 bg-teal-500 text-white font-medium rounded-full hover:bg-teal-600 transition-colors flex items-center space-x-2 mx-auto shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronUp className="w-5 h-5" />
                <span>Back to Top</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal (unchanged) */}
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

// Modernized Footer Component (No functional changes, added a small style detail)
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
                href="#about"
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
