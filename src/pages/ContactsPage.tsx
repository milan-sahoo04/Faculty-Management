// src/pages/ContactsPage.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Plus,
  ArrowLeft,
  MessageSquare,
  Star,
  Trash2,
  Edit,
  MoreVertical,
  ChevronDown,
  Mail,
  Phone,
  Briefcase,
  Users,
  Calendar,
  SquarePen,
  Clock, // For Activity timeline event
  Video, // For Video meeting activity
  ListTodo, // For Task assigned activity
  FileText, // For Note added activity
  Eye, // For View Details
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Dummy Data ---
const allContacts = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "UI/UX Designer",
    company: "Acme Inc.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 123-4567",
    tags: ["Team"],
    status: "Online 2 hours ago",
    isFavorite: true,
    notes: "Lead designer for the Figma Design System project.",
    created: "January 15, 2023",
    lastUpdated: "May 20, 2023",
    contactInfo: {
      email: "alex.morgan@example.com",
      phone: "+1 (555) 123-4567",
      company: "Acme Inc.",
      position: "UI/UX Designer",
      tags: ["Team"],
    },
    activities: [
      {
        id: 1,
        type: "Email sent",
        description:
          "Sent project update and requested feedback on the latest design mockups",
        user: "Sarah Johnson",
        date: "Jun 15, 2023",
        time: "2:30 PM",
        icon: Mail,
        iconColor: "text-blue-500",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      },
      {
        id: 2,
        type: "Video meeting",
        description: "Discussed design system implementation and timeline",
        duration: "45 minutes",
        user: "David Chen",
        date: "Jun 14, 2023",
        time: "10:00 AM",
        icon: Video,
        iconColor: "text-purple-500",
        avatar: "https://randomuser.me/api/portraits/men/50.jpg",
      },
      {
        id: 3,
        type: "Task assigned",
        description:
          "Assigned to create wireframes for the new dashboard layout",
        user: "Michael Rodriguez",
        date: "Jun 12, 2023",
        time: "9:15 AM",
        icon: ListTodo,
        iconColor: "text-green-500",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      },
      {
        id: 4,
        type: "Note added",
        description: "Added note about design preferences and brand guidelines",
        user: "Alex Morgan",
        date: "Jun 10, 2023",
        time: "4:45 PM",
        icon: FileText,
        iconColor: "text-yellow-500",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
    ],
    detailedNotes: [
      {
        id: 1,
        text: "Lead designer for the Figma Design System project.",
        author: "Sarah Johnson",
        timestamp: "over 2 years ago",
      },
      {
        id: 2,
        text: "Followed up on the design system review. Alex provided positive feedback.",
        author: "Admin",
        timestamp: "1 month ago",
      },
    ],
  },
  {
    id: 2,
    name: "Jessica Chen",
    role: "Frontend Developer",
    company: "TechCorp",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    email: "jessica.chen@example.com",
    phone: "+1 (555) 234-5678",
    tags: ["Team", "Partner"],
    status: "Online now",
    isFavorite: false,
    notes: "Works closely with the backend team on API integrations.",
    created: "February 1, 2023",
    lastUpdated: "June 1, 2023",
    contactInfo: {
      email: "jessica.chen@example.com",
      phone: "+1 (555) 234-5678",
      company: "TechCorp",
      position: "Frontend Developer",
      tags: ["Team", "Partner"],
    },
    activities: [
      {
        id: 1,
        type: "Email sent",
        description: "Shared the latest sprint progress report with the team.",
        user: "Ryan Park",
        date: "Jun 16, 2023",
        time: "10:00 AM",
        icon: Mail,
        iconColor: "text-blue-500",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      },
      {
        id: 2,
        type: "Code review",
        description:
          "Conducted a peer code review for the new authentication module.",
        user: "Jessica Chen",
        date: "Jun 15, 2023",
        time: "3:00 PM",
        icon: ListTodo,
        iconColor: "text-green-500",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      },
    ],
    detailedNotes: [
      {
        id: 1,
        text: "Collaborated on the new user interface components. Highly skilled in React.",
        author: "Admin",
        timestamp: "2 months ago",
      },
    ],
  },
  {
    id: 3,
    name: "Ryan Park",
    role: "Product Manager",
    company: "StaticMania",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    email: "ryan.park@example.com",
    phone: "+1 (555) 345-6789",
    tags: ["Client", "Lead"],
    status: "Offline since 1 day",
    isFavorite: true,
    notes: "Main point of contact for the StaticMania project.",
    created: "March 10, 2023",
    lastUpdated: "July 5, 2023",
    contactInfo: {
      email: "ryan.park@example.com",
      phone: "+1 (555) 345-6789",
      company: "StaticMania",
      position: "Product Manager",
      tags: ["Client", "Lead"],
    },
    activities: [
      {
        id: 1,
        type: "Call made",
        description: "Discussed Q3 product roadmap and feature priorities.",
        user: "Alex Morgan",
        date: "Jun 17, 2023",
        time: "11:30 AM",
        icon: Phone,
        iconColor: "text-red-500",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
    ],
    detailedNotes: [
      {
        id: 1,
        text: "Had a productive meeting about the upcoming product launch. Very responsive.",
        author: "Admin",
        timestamp: "3 weeks ago",
      },
    ],
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Backend Developer",
    company: "DataViz Corp",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 456-7890",
    tags: ["Team", "Lead"],
    status: "Offline since 2 days",
    isFavorite: false,
    notes: "Responsible for database architecture and API development.",
    created: "April 1, 2023",
    lastUpdated: "August 10, 2023",
    contactInfo: {
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 456-7890",
      company: "DataViz Corp",
      position: "Backend Developer",
      tags: ["Team", "Lead"],
    },
    activities: [], // Example of a contact with no activities
    detailedNotes: [], // Example of a contact with no notes
  },
  {
    id: 5,
    name: "David Kim",
    role: "QA Engineer",
    company: "QA Solutions",
    avatar: "https://randomuser.me/api/portraits/men/50.jpg",
    email: "david.kim@example.com",
    phone: "+1 (555) 567-8901",
    tags: ["Vendor"],
    status: "Online 5 hours ago",
    isFavorite: false,
    notes: "Manages all testing cycles for new features.",
    created: "May 1, 2023",
    lastUpdated: "September 1, 2023",
    contactInfo: {
      email: "david.kim@example.com",
      phone: "+1 (555) 567-8901",
      company: "QA Solutions",
      position: "QA Engineer",
      tags: ["Vendor"],
    },
    activities: [
      {
        id: 1,
        type: "Bug reported",
        description:
          "Submitted a critical bug report for the user authentication flow.",
        user: "David Kim",
        date: "Jun 18, 2023",
        time: "9:00 AM",
        icon: Clock,
        iconColor: "text-red-500",
        avatar: "https://randomuser.me/api/portraits/men/50.jpg",
      },
    ],
    detailedNotes: [],
  },
  {
    id: 6,
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "Marketing Experts",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    email: "emily.rodriguez@example.com",
    phone: "+1 (555) 678-9012",
    tags: ["Client", "Partner"],
    status: "Offline since 3 days",
    isFavorite: false,
    notes: "Oversees all marketing campaigns and strategies.",
    created: "June 1, 2023",
    lastUpdated: "October 1, 2023",
    contactInfo: {
      email: "emily.rodriguez@example.com",
      phone: "+1 (555) 678-9012",
      company: "Marketing Experts",
      position: "Marketing Director",
      tags: ["Client", "Partner"],
    },
    activities: [],
    detailedNotes: [],
  },
  {
    id: 7,
    name: "Michael Wong",
    role: "Financial Analyst",
    company: "FinTech Solutions",
    avatar: "https://randomuser.me/api/portraits/men/77.jpg",
    email: "michael.wong@example.com",
    phone: "+1 (555) 789-0123",
    tags: ["Personal"],
    status: "Online now",
    isFavorite: true,
    notes: "Provides financial advice and investment strategies.",
    created: "July 1, 2023",
    lastUpdated: "November 1, 2023",
    contactInfo: {
      email: "michael.wong@example.com",
      phone: "+1 (555) 789-0123",
      company: "FinTech Solutions",
      position: "Financial Analyst",
      tags: ["Personal"],
    },
    activities: [],
    detailedNotes: [],
  },
  {
    id: 8,
    name: "Olivia Martinez",
    role: "Creative Director",
    company: "Design Studio",
    avatar: "https://randomuser.me/api/portraits/women/88.jpg",
    email: "olivia.martinez@example.com",
    phone: "+1 (555) 890-1234",
    tags: ["Lead"],
    status: "Offline since 1 week",
    isFavorite: false,
    notes: "Leads the creative team for all design projects.",
    created: "August 1, 2023",
    lastUpdated: "December 1, 2023",
    contactInfo: {
      email: "olivia.martinez@example.com",
      phone: "+1 (555) 890-1234",
      company: "Design Studio",
      position: "Creative Director",
      tags: ["Lead"],
    },
    activities: [],
    detailedNotes: [],
  },
];

const ContactsPage = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // overview, activity, notes
  const [dropdownOpenId, setDropdownOpenId] = useState(null); // For individual card dropdowns
  const [headerDropdownOpen, setHeaderDropdownOpen] = useState(false); // For details view header dropdown

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpenId(null);
        setHeaderDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleBackToContacts = () => {
    setSelectedContact(null);
    setActiveTab("overview");
    setHeaderDropdownOpen(false);
  };

  // Action handlers (placeholders)
  const handleEditContact = (contactId) => {
    console.log("Edit contact:", contactId);
    setDropdownOpenId(null);
    setHeaderDropdownOpen(false);
    // You might want to navigate to an edit form or open a modal
  };

  const handleDeleteContact = (contactId) => {
    console.log("Delete contact:", contactId);
    setDropdownOpenId(null);
    setHeaderDropdownOpen(false);
    // Implement delete logic, e.g., filter from allContacts
  };

  const handleAddFavorite = (contactId) => {
    console.log("Add to favorites:", contactId);
    setDropdownOpenId(null);
    setHeaderDropdownOpen(false);
    // Implement favorite toggle logic
  };

  const handleSendMessage = (contactId) => {
    console.log("Send message to:", contactId);
    // Navigate to message interface
  };

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setDropdownOpenId(null); // Close card dropdown
  };

  const getTagColor = (tag) => {
    switch (tag) {
      case "Team":
        return "bg-blue-100 text-blue-800";
      case "Partner":
        return "bg-purple-100 text-purple-800";
      case "Lead":
        return "bg-red-100 text-red-800";
      case "Vendor":
        return "bg-green-100 text-green-800";
      case "Client":
        return "bg-yellow-100 text-yellow-800";
      case "Personal":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 md:p-8 font-sans bg-gray-50 min-h-screen">
      {/* Header for Contacts List */}
      <AnimatePresence mode="wait">
        {!selectedContact && (
          <motion.div
            key="list-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-between items-center mb-6"
          >
            <h1 className="text-3xl font-bold text-gray-900">Contact</h1>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm w-48 md:w-64"
                />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm font-medium">
                <Plus size={16} />
                <span>New Project</span>{" "}
                {/* Based on image, it says New Project, not New Contact */}
              </button>
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-blue-400">
                <img
                  src="https://randomuser.me/api/portraits/men/86.jpg" // Placeholder user avatar
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {/* Contact List Grid */}
        <AnimatePresence mode="wait">
          {!selectedContact && (
            <motion.div
              key="contact-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, position: "absolute" }} // Use absolute to prevent layout shift
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {allContacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  layout
                  className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col items-center text-center relative"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-20 h-20 rounded-full object-cover mb-4 ring-2 ring-blue-500 ring-offset-2"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {contact.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{contact.role}</p>
                  <p className="text-gray-500 text-sm mb-4">
                    {contact.company}
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {contact.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-medium px-3 py-1 rounded-full ${getTagColor(
                          tag
                        )}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-left w-full space-y-2 text-sm text-gray-700 mb-6">
                    <p className="flex items-center">
                      <Mail size={16} className="mr-2 text-gray-400" />
                      {contact.email}
                    </p>
                    <p className="flex items-center">
                      <Phone size={16} className="mr-2 text-gray-400" />
                      {contact.phone}
                    </p>
                    <p className="flex items-center">
                      <Briefcase size={16} className="mr-2 text-gray-400" />
                      {contact.company}
                    </p>
                  </div>

                  <div className="flex items-center justify-between w-full mt-auto pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleViewDetails(contact)}
                      className="text-blue-600 font-medium text-sm hover:underline flex items-center"
                    >
                      View Details
                    </button>
                    <div className="relative" ref={dropdownRef}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click from firing
                          setDropdownOpenId(
                            dropdownOpenId === contact.id ? null : contact.id
                          );
                        }}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical size={20} className="text-gray-500" />
                      </button>
                      <AnimatePresence>
                        {dropdownOpenId === contact.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200"
                          >
                            <button
                              onClick={() => handleViewDetails(contact)}
                              className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Eye size={16} className="mr-2" /> View Details
                            </button>
                            <button
                              onClick={() => handleEditContact(contact.id)}
                              className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Edit size={16} className="mr-2" /> Edit Contact
                            </button>
                            <button
                              onClick={() => handleAddFavorite(contact.id)}
                              className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              <Star size={16} className="mr-2" /> Add to
                              Favourites
                            </button>
                            <button
                              onClick={() => handleDeleteContact(contact.id)}
                              className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={16} className="mr-2" /> Delete
                              Contact
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Details View */}
        <AnimatePresence mode="wait">
          {selectedContact && (
            <motion.div
              key="contact-details"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 lg:col-span-2 absolute inset-0 md:relative md:col-span-3 lg:col-span-2" // Adjust col-span for responsive layout
            >
              {/* Details Header */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-6">
                <button
                  onClick={handleBackToContacts}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm"
                >
                  <ArrowLeft size={18} className="mr-2" />
                  Back to Contacts
                </button>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleEditContact(selectedContact.id)}
                    className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    <Edit size={16} />
                    <span>Edit Contact</span>
                  </button>
                  <button
                    onClick={() => handleAddFavorite(selectedContact.id)}
                    className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                  >
                    <Star size={16} />
                    <span>Add to Favorites</span>
                  </button>
                  <button
                    onClick={() => handleSendMessage(selectedContact.id)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <MessageSquare size={16} />
                    <span>Send Message</span>
                  </button>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setHeaderDropdownOpen(!headerDropdownOpen)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <MoreVertical size={20} className="text-gray-500" />
                    </button>
                    <AnimatePresence>
                      {headerDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
                        >
                          {/* These actions are duplicated from main buttons for consistency if user expects dropdown */}
                          <button
                            onClick={() =>
                              handleEditContact(selectedContact.id)
                            }
                            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Edit size={16} className="mr-2" /> Edit Contact
                          </button>
                          <button
                            onClick={() =>
                              handleAddFavorite(selectedContact.id)
                            }
                            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Star size={16} className="mr-2" /> Add to
                            Favourites
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteContact(selectedContact.id)
                            }
                            className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={16} className="mr-2" /> Delete Contact
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Contact Details Overview */}
              <div className="flex items-center space-x-4 mb-8">
                <img
                  src={selectedContact.avatar}
                  alt={selectedContact.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500 ring-offset-2"
                />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedContact.name}
                  </h2>
                  <p className="text-gray-600">
                    {selectedContact.role} at {selectedContact.company}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedContact.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTagColor(
                          tag
                        )}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`
                      whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm
                      ${
                        activeTab === "overview"
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }
                    `}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("activity")}
                    className={`
                      whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm
                      ${
                        activeTab === "activity"
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }
                    `}
                  >
                    Activity
                  </button>
                  <button
                    onClick={() => setActiveTab("notes")}
                    className={`
                      whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm
                      ${
                        activeTab === "notes"
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }
                    `}
                  >
                    Notes
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {activeTab === "overview" && (
                  <motion.div
                    key="overview-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-8"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Contact Information
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Basic information about the contact
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                        <div>
                          <p className="font-medium text-gray-800">Email</p>
                          <p className="text-blue-600 hover:underline cursor-pointer">
                            {selectedContact.contactInfo.email}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Company</p>
                          <p>{selectedContact.contactInfo.company}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Phone</p>
                          <p className="text-blue-600 hover:underline cursor-pointer">
                            {selectedContact.contactInfo.phone}
                          </p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Position</p>
                          <p>{selectedContact.contactInfo.position}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="font-medium text-gray-800">Tags</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedContact.contactInfo.tags.map((tag) => (
                            <span
                              key={tag}
                              className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTagColor(
                                tag
                              )}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="font-medium text-gray-800">Notes</p>
                        <p className="text-gray-700 mt-1">
                          {selectedContact.notes}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm text-gray-700">
                        <div>
                          <p className="font-medium text-gray-800">Created</p>
                          <p>{selectedContact.created}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            Last Updated
                          </p>
                          <p>{selectedContact.lastUpdated}</p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity in Overview */}
                    {selectedContact.activities &&
                      selectedContact.activities.length > 0 && (
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            Recent Activity
                          </h3>
                          <p className="text-sm text-gray-500 mb-4">
                            Latest interactions with this contact
                          </p>
                          <div className="space-y-4">
                            {selectedContact.activities.slice(0, 3).map(
                              (
                                activity // Show top 3 activities
                              ) => (
                                <div
                                  key={activity.id}
                                  className="flex items-start space-x-3"
                                >
                                  <div
                                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${activity.iconColor.replace(
                                      "text-",
                                      "bg-"
                                    )} bg-opacity-20`}
                                  >
                                    <activity.icon
                                      size={16}
                                      className={activity.iconColor}
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800">
                                      {activity.description}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-500 mt-1">
                                      {activity.user && (
                                        <>
                                          <img
                                            src={activity.avatar}
                                            alt={activity.user}
                                            className="w-4 h-4 rounded-full mr-1"
                                          />
                                          <span>{activity.user}</span>
                                          <span className="mx-1">·</span>
                                        </>
                                      )}
                                      <span>{activity.date}</span>
                                      {activity.time && (
                                        <span className="ml-1">
                                          {activity.time}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                          {selectedContact.activities.length > 3 && (
                            <button
                              onClick={() => setActiveTab("activity")}
                              className="mt-4 text-blue-600 text-sm font-medium hover:underline"
                            >
                              Load More
                            </button>
                          )}
                        </div>
                      )}
                  </motion.div>
                )}

                {activeTab === "activity" && (
                  <motion.div
                    key="activity-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900">
                      Activity Timeline
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      History of interactions with this contact
                    </p>
                    <div className="space-y-6">
                      {selectedContact.activities.length > 0 ? (
                        selectedContact.activities.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-start space-x-4"
                          >
                            <div
                              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${activity.iconColor.replace(
                                "text-",
                                "bg-"
                              )} bg-opacity-20`}
                            >
                              <activity.icon
                                size={20}
                                className={activity.iconColor}
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">
                                {activity.type}
                              </p>
                              <p className="text-gray-700 mt-1">
                                {activity.description}
                              </p>
                              {activity.duration && (
                                <p className="text-sm text-gray-500">
                                  Duration: {activity.duration}
                                </p>
                              )}
                              <div className="flex items-center text-xs text-gray-500 mt-2">
                                {activity.user && (
                                  <>
                                    <img
                                      src={activity.avatar}
                                      alt={activity.user}
                                      className="w-5 h-5 rounded-full mr-1"
                                    />
                                    <span>{activity.user}</span>
                                    <span className="mx-1">·</span>
                                  </>
                                )}
                                <span>{activity.date}</span>
                                {activity.time && (
                                  <span className="ml-1">{activity.time}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-10">
                          No activity recorded for this contact.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === "notes" && (
                  <motion.div
                    key="notes-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          Notes
                        </h3>
                        <p className="text-sm text-gray-500">
                          Notes and comments about this contact
                        </p>
                      </div>
                      <button className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-gray-800 transition-colors text-sm font-medium">
                        <Plus size={16} />
                        <span>Add Note</span>
                      </button>
                    </div>
                    <div className="space-y-4">
                      {selectedContact.detailedNotes &&
                      selectedContact.detailedNotes.length > 0 ? (
                        selectedContact.detailedNotes.map((note) => (
                          <div
                            key={note.id}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                          >
                            <p className="text-sm text-gray-800 leading-relaxed mb-2">
                              {note.text}
                            </p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>
                                Added by{" "}
                                <span className="font-medium">
                                  {note.author}
                                </span>
                              </span>
                              <span>{note.timestamp}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-10">
                          No notes available for this contact.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactsPage;
