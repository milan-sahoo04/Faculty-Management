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
  Mail,
  Phone,
  Briefcase,
  Clock, // For Activity timeline event (general)
  Video, // For Video meeting activity
  ListTodo, // For Task assigned activity/Code review
  FileText, // For Note added activity
  Eye, // For View Details
  Calendar, // For general calendar event
  SquarePen, // ADDED: Icon for 'Add Note' button in DetailedNotes
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Type Definitions (for clarity) ---
interface Activity {
  id: number;
  type: string;
  description: string;
  user: string;
  date: string;
  time: string;
  icon: React.ElementType;
  iconColor: string;
  avatar: string;
  duration?: string;
}

interface Note {
  id: number;
  text: string;
  author: string;
  timestamp: string;
}

interface Contact {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  email: string;
  phone: string;
  tags: string[];
  status: string;
  isFavorite: boolean;
  notes: string;
  created: string;
  lastUpdated: string;
  contactInfo: {
    email: string;
    phone: string;
    company: string;
    position: string;
    tags: string[];
  };
  activities: Activity[];
  detailedNotes: Note[];
}

// --- Dummy Data (Kept as is for functionality) ---
const allContacts: Contact[] = [
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

// --- ActivityTimeline Component (Reusable - KEPT AS IS) ---
const ActivityTimeline = ({
  activities,
  limit,
}: {
  activities: Activity[];
  limit?: number;
}) => {
  const displayedActivities = limit ? activities.slice(0, limit) : activities;

  if (displayedActivities.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
        <Calendar size={24} className="mx-auto mb-2" />
        <p className="font-medium">No recent activity logged.</p>
        <p className="text-sm">
          Start a task, email, or meeting to update the timeline.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">
        {limit ? "Recent Activity" : "Activity Timeline"}
      </h3>
      <div className="relative border-l border-gray-200 ml-4 pl-6">
        {displayedActivities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="mb-8 flex">
              {/* Icon Dot */}
              <div className="absolute left-0 -ml-3.5 mt-1.5 flex items-center justify-center w-7 h-7 rounded-full bg-white ring-8 ring-white">
                <Icon size={16} className={activity.iconColor} />
              </div>

              {/* Content */}
              <div className="flex-grow">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.type}
                    {activity.duration && (
                      <span className="text-xs text-gray-500 ml-2">
                        ({activity.duration})
                      </span>
                    )}
                  </p>
                  <time className="text-xs text-gray-500 whitespace-nowrap">
                    {activity.date} at {activity.time}
                  </time>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {activity.description}
                </p>
                <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                  <img
                    src={activity.avatar}
                    alt={activity.user}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>Logged by {activity.user}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- DetailedNotes Component (Reusable - FIXED MISSING IMPORT) ---
const DetailedNotes = ({ detailedNotes }: { detailedNotes: Note[] }) => {
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim()) {
      console.log("Adding new note:", newNote);
      // In a real app, you'd add this to state/send to API
      setNewNote("");
    }
  };

  if (detailedNotes.length === 0) {
    return (
      <div className="space-y-4">
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <FileText size={24} className="mx-auto mb-2" />
          <p className="font-medium">No detailed notes recorded.</p>
        </div>
        {/* Note Input area for adding first note */}
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
          <textarea
            rows={3}
            placeholder="Add a new note..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={handleAddNote}
              disabled={!newNote.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-blue-300 transition-colors flex items-center space-x-1"
            >
              <SquarePen size={16} />
              <span>Add Note</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Note Input Area */}
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Add Note</h3>
        <textarea
          rows={3}
          placeholder="Type your new note here..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={handleAddNote}
            disabled={!newNote.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-blue-300 transition-colors flex items-center space-x-1"
          >
            <SquarePen size={16} />
            <span>Add Note</span>
          </button>
        </div>
      </div>

      {/* Existing Notes List */}
      <h3 className="text-xl font-semibold text-gray-900">All Notes</h3>
      <div className="space-y-4">
        {detailedNotes.map((note) => (
          <div
            key={note.id}
            className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm"
          >
            <p className="text-gray-700 mb-2 text-sm">{note.text}</p>
            <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-2 mt-2">
              <span>
                By{" "}
                <span className="font-medium text-gray-700">{note.author}</span>
              </span>
              <span>{note.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Contact Details Overview Tab Component (NEW/UPDATED) ---
const ContactDetailsOverview = ({ contact }: { contact: Contact }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    {/* Left Column: Profile Card & Quick Info */}
    <div className="lg:col-span-1 space-y-6">
      {/* Profile Card with Image and Main Info */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
        {/* Profile Image (ADDITION) */}
        <div className="mx-auto w-24 h-24 mb-4">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-full h-full rounded-full object-cover ring-4 ring-blue-500 ring-offset-2"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{contact.name}</h2>
        <p className="text-blue-600 font-medium mb-1">{contact.role}</p>
        <p className="text-gray-500 text-sm">{contact.company}</p>
        <p
          className={`text-xs mt-2 ${
            contact.status.includes("Online now")
              ? "text-green-500"
              : "text-gray-500"
          }`}
        >
          {contact.status}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
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
      </div>

      {/* Contact Information Section (UPDATED FOR CLARITY) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Briefcase size={20} className="mr-2 text-blue-600" />
          Contact Information
        </h3>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-center">
            <Mail size={16} className="mr-3 text-gray-400" />
            <span className="font-medium">Email:</span>
            <span className="ml-2 truncate">{contact.contactInfo.email}</span>
          </div>
          <div className="flex items-center">
            <Phone size={16} className="mr-3 text-gray-400" />
            <span className="font-medium">Phone:</span>
            <span className="ml-2">{contact.contactInfo.phone}</span>
          </div>
          <div className="flex items-center">
            <Briefcase size={16} className="mr-3 text-gray-400" />
            <span className="font-medium">Company:</span>
            <span className="ml-2 truncate">{contact.contactInfo.company}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-3 text-gray-400" />
            <span className="font-medium">Created:</span>
            <span className="ml-2">{contact.created}</span>
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-3 text-gray-400" />
            <span className="font-medium">Last Updated:</span>
            <span className="ml-2">{contact.lastUpdated}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Right Column: Short Note & Recent Activity */}
    <div className="lg:col-span-2 space-y-6">
      {/* Short Note/Description */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <FileText size={20} className="mr-2 text-blue-600" />
          Short Description
        </h3>
        <p className="text-gray-600">
          {contact.notes || "No short description available."}
        </p>
      </div>

      {/* Recent Activity Timeline (Limit to 3 for overview) */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <ActivityTimeline activities={contact.activities} limit={3} />
      </div>
    </div>
  </div>
);

// --- getTagColor Function (Moved out of component for reusability) ---
const getTagColor = (tag: string) => {
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

// --- Main ContactsPage Component (UPDATED with new rendering logic) ---
const ContactsPage = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [activeTab, setActiveTab] = useState("overview"); // overview, activity, notes
  const [dropdownOpenId, setDropdownOpenId] = useState<number | null>(null); // For individual card dropdowns
  const [headerDropdownOpen, setHeaderDropdownOpen] = useState(false); // For details view header dropdown

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
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
  const handleEditContact = (contactId: number) => {
    console.log("Edit contact:", contactId);
    setDropdownOpenId(null);
    setHeaderDropdownOpen(false);
    // You might want to navigate to an edit form or open a modal
  };

  const handleDeleteContact = (contactId: number) => {
    console.log("Delete contact:", contactId);
    setDropdownOpenId(null);
    setHeaderDropdownOpen(false);
    // Implement delete logic, e.g., filter from allContacts
  };

  const handleAddFavorite = (contactId: number) => {
    console.log("Add to favorites:", contactId);
    setDropdownOpenId(null);
    setHeaderDropdownOpen(false);
    // Implement favorite toggle logic
  };

  const handleSendMessage = (contactId: number) => {
    console.log("Send message to:", contactId);
    // Navigate to message interface
  };

  const handleViewDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setDropdownOpenId(null); // Close card dropdown
  };

  // RENDER CONTENT BASED ON ACTIVE TAB
  const renderDetailsContent = (contact: Contact) => {
    switch (activeTab) {
      case "overview":
        return <ContactDetailsOverview contact={contact} />;
      case "activity":
        return <ActivityTimeline activities={contact.activities} />;
      case "notes":
        return <DetailedNotes detailedNotes={contact.detailedNotes} />;
      default:
        return <ContactDetailsOverview contact={contact} />;
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
        {/* Contact List Grid (KEPT AS IS) */}
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

        {/* Contact Details View (UPDATED) */}
        <AnimatePresence mode="wait">
          {selectedContact && (
            <motion.div
              key="contact-details"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 absolute inset-0 md:relative md:col-span-3 lg:col-span-2 overflow-y-auto" // Added overflow-y-auto
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
                    <span>
                      {selectedContact.isFavorite ? "Remove from" : "Add to"}{" "}
                      Favorites
                    </span>
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
                            <Star size={16} className="mr-2" />{" "}
                            {selectedContact.isFavorite
                              ? "Remove from"
                              : "Add to"}
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

              {/* Details Navigation Tabs (NEW) */}
              <div className="mb-6 border-b border-gray-200">
                <nav className="flex space-x-6" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`py-2 px-1 text-sm font-medium transition-colors ${
                      activeTab === "overview"
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("activity")}
                    className={`py-2 px-1 text-sm font-medium transition-colors ${
                      activeTab === "activity"
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Activity
                  </button>
                  <button
                    onClick={() => setActiveTab("notes")}
                    className={`py-2 px-1 text-sm font-medium transition-colors ${
                      activeTab === "notes"
                        ? "border-b-2 border-blue-600 text-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Notes
                  </button>
                </nav>
              </div>

              {/* Tab Content (UPDATED) */}
              <div className="pt-2">
                {renderDetailsContent(selectedContact)}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactsPage;
