// src/pages/NotificationPage.tsx
import React, { useState } from "react";
import {
  Bell,
  Search,
  MoreHorizontal,
  Mail,
  Trash2,
  VolumeX,
  Reply,
  Dot,
  Calendar, // New Icon for Meetings/Classes
  FileText, // New Icon for Submissions
  Clock, // New Icon for Time
  Users, // New Icon for class enrollment
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// --- Data Structures ---
interface User {
  id: string;
  name: string;
  avatar: string; // URL or initial for placeholder
}

interface Notification {
  id: string;
  // Updated Categories
  category: "All" | "Classes" | "Meetings" | "Submissions" | "Admin";
  // Updated Types
  type:
    | "meeting_invite" // e.g., Department Meeting
    | "class_update" // e.g., class cancelled
    | "new_submission" // e.g., assignment submitted
    | "class_enrollment" // e.g., new student added to a class
    | "admin_announcement"; // e.g., HR policy change
  message: string;
  user?: User; // User related to the notification event (e.g., student, colleague)
  context?: string; // e.g., Class Name, Meeting Topic
  timestamp: string; // e.g., "2 hours ago", "Yesterday"
  read: boolean;
  muted: boolean;
  // Specific details for the new types
  dateTime?: string; // For meeting invites or class times
  fileName?: string; // For submissions
  senderRole?: string; // Role of the sender, if applicable
}

// --- Dummy Data ---
const users: { [key: string]: User } = {
  alex: { id: "alex", name: "Alex Morgan (Student)", avatar: "AM" },
  jessica: { id: "jessica", name: "Jessica Chen (Faculty)", avatar: "JC" },
  david: { id: "david", name: "David Kim (Admin)", avatar: "DK" },
  sarah: { id: "sarah", name: "Sarah Johnson (Student)", avatar: "SJ" },
  william: { id: "william", name: "Dr. Jack (Dept. Head)", avatar: "WJ" },
  system: { id: "system", name: "System", avatar: "SY" },
};

const initialNotifications: Notification[] = [
  // TODAY
  {
    id: "notif-1",
    category: "Meetings",
    type: "meeting_invite",
    message: `<span class="font-semibold">${users.william.name}</span> invited you to the <span class="font-semibold">"Department Strategy Review"</span> meeting.`,
    user: users.william,
    context: "Department Strategy Review",
    timestamp: "about 30 minutes ago",
    read: false,
    muted: false,
    dateTime: "Today, 3:00 PM - Room 301",
    senderRole: "Department Head",
  },
  {
    id: "notif-2",
    category: "Submissions",
    type: "new_submission",
    message: `<span class="font-semibold">${users.alex.name}</span> submitted a new file: <span class="font-semibold">"Final_Project_Report.pdf"</span> for CS 401.`,
    user: users.alex,
    context: "CS 401: Advanced Algorithms",
    timestamp: "about 1 hour ago",
    read: false,
    muted: false,
    fileName: "Final_Project_Report.pdf",
  },
  // YESTERDAY
  {
    id: "notif-3",
    category: "Classes",
    type: "class_update",
    message: `Your class <span class="font-semibold">"ENG 101: Intro to Lit"</span> on Tuesday has been <span class="font-medium text-red-600">cancelled</span>.`,
    user: users.system,
    context: "ENG 101: Intro to Lit",
    timestamp: "1 day ago",
    read: true,
    muted: false,
    dateTime: "Tuesday, October 7th, 10:00 AM",
  },
  {
    id: "notif-4",
    category: "Admin",
    type: "admin_announcement",
    message: `<span class="font-semibold">${users.david.name}</span> posted a new announcement: <span class="font-semibold">"Mandatory Safety Training Schedule"</span>.`,
    user: users.david,
    context: "Mandatory Safety Training Schedule",
    timestamp: "1 day ago",
    read: true,
    muted: false,
  },
  // OLDER
  {
    id: "notif-5",
    category: "Classes",
    type: "class_enrollment",
    message: `A new student was <span class="font-semibold">enrolled</span> in your course <span class="font-semibold">"BIO 205: Cell Biology"</span>.`,
    user: users.system,
    context: "BIO 205: Cell Biology",
    timestamp: "3 days ago",
    read: true,
    muted: false,
  },
];

// --- Helper Components ---

const UserAvatar: React.FC<{ user: User | undefined; size?: "sm" | "md" }> = ({
  user,
  size = "md",
}) => {
  const avatarSize = size === "sm" ? "h-6 w-6 text-xs" : "h-8 w-8 text-sm";
  // Updated colors for context
  const bgColor =
    user?.id === "system"
      ? "bg-gray-400"
      : user?.name.includes("Student")
      ? "bg-teal-600"
      : "bg-blue-600";
  return (
    <div
      className={`flex-shrink-0 rounded-full flex items-center justify-center font-semibold text-white ${avatarSize} ${bgColor}`}
    >
      {user
        ? user.avatar === user.name
          ? user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
          : user.avatar
        : "UN"}
    </div>
  );
};

const NotificationOptionsDropdown: React.FC<{
  onMarkAsRead: () => void;
  onMute: () => void;
  onRemove: () => void;
}> = ({ onMarkAsRead, onMute, onRemove }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 rounded-full p-1"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              <button
                onClick={() => {
                  onMarkAsRead();
                  setIsOpen(false);
                }}
                className="text-gray-700 flex px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
              >
                <Mail className="h-5 w-5 mr-2" /> Mark as read
              </button>
              <button
                onClick={() => {
                  onMute();
                  setIsOpen(false);
                }}
                className="text-gray-700 flex px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
                role="menuitem"
                tabIndex={-1}
              >
                <VolumeX className="h-5 w-5 mr-2" /> Mute this type
              </button>
              <button
                onClick={() => {
                  onRemove();
                  setIsOpen(false);
                }}
                className="text-red-700 flex px-4 py-2 text-sm w-full text-left hover:bg-red-50"
                role="menuitem"
                tabIndex={-1}
              >
                <Trash2 className="h-5 w-5 mr-2" /> Remove
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Notification Page Component ---
const NotificationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Notification["category"]>("All");
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(notifications[1]); // Pre-select for initial view

  const filteredNotifications = notifications
    .filter((notif) => {
      if (activeTab === "All") return true;
      return notif.category === activeTab;
    })
    .filter((notif) => !notif.muted); // Also filter out muted ones

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
    if (selectedNotification?.id === id) {
      setSelectedNotification((prev) =>
        prev ? { ...prev, read: true } : null
      );
    }
  };

  const muteNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, muted: !notif.muted } : notif
      )
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    if (selectedNotification?.id === id) {
      setSelectedNotification(null); // Clear details if removed
    }
  };

  const groupNotificationsByTime = (notifs: Notification[]) => {
    // Reusing the simple time grouping based on dummy data timestamp strings
    const groups: { [key: string]: Notification[] } = {
      TODAY: [],
      YESTERDAY: [],
      OLDER: [],
    };

    notifs.forEach((notif) => {
      if (
        notif.timestamp.includes("hour") ||
        notif.timestamp.includes("minutes")
      ) {
        groups["TODAY"].push(notif);
      } else if (notif.timestamp.includes("1 day ago")) {
        groups["YESTERDAY"].push(notif);
      } else {
        groups["OLDER"].push(notif);
      }
    });

    return groups;
  };

  const grouped = groupNotificationsByTime(filteredNotifications);

  // --- New Helper Component for Notification Details based on Type ---
  const FacultyNotificationDetails: React.FC<{ notif: Notification }> = ({
    notif,
  }) => {
    return (
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <h4 className="text-xl font-bold text-gray-900 mb-3">
            {notif.context || "General Notification"}
          </h4>

          {/* Core Message */}
          <p
            className="text-gray-800 text-base mb-4"
            dangerouslySetInnerHTML={{ __html: notif.message }}
          />

          {/* Contextual Details */}
          {notif.type === "meeting_invite" && (
            <div className="space-y-2 text-sm text-gray-700 pt-3 border-t border-gray-100">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                <span className="font-semibold">Time & Location:</span>{" "}
                {notif.dateTime}
              </div>
              {notif.user && (
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="font-semibold">Organizer:</span>{" "}
                  {notif.user.name} ({notif.senderRole})
                </div>
              )}
            </div>
          )}

          {notif.type === "new_submission" && (
            <div className="space-y-2 text-sm text-gray-700 pt-3 border-t border-gray-100">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-teal-500" />
                <span className="font-semibold">File Submitted:</span>{" "}
                {notif.fileName}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-teal-500" />
                <span className="font-semibold">Student:</span>{" "}
                {notif.user?.name}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-teal-500" />
                <span className="font-semibold">Received:</span>{" "}
                {notif.timestamp}
              </div>
            </div>
          )}

          {notif.type === "class_update" && (
            <div className="space-y-2 text-sm text-gray-700 pt-3 border-t border-gray-100">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-red-500" />
                <span className="font-semibold">Scheduled Time:</span>{" "}
                {notif.dateTime}
              </div>
              <p className="text-red-600 font-semibold mt-2">
                Action Required: Please notify your students of the
                cancellation.
              </p>
            </div>
          )}

          {notif.type === "class_enrollment" && (
            <div className="space-y-2 text-sm text-gray-700 pt-3 border-t border-gray-100">
              <p className="font-medium">
                You may need to update your student roster and learning
                management system access.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-auto">
          {notif.type === "meeting_invite" && (
            <button className="flex items-center px-4 py-2 border border-green-300 rounded-md text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100">
              <Calendar className="h-4 w-4 mr-2" />
              Accept Invite
            </button>
          )}
          {notif.type === "new_submission" && (
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
              <FileText className="h-4 w-4 mr-2" />
              View Submission
            </button>
          )}
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Reply className="h-4 w-4 mr-2" />
            Archive
          </button>
        </div>
      </div>
    );
  };
  // --- End of New Helper Component ---

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden bg-white">
      {/* Left Panel: Notification List */}
      <div className="flex flex-col w-full lg:w-2/5 border-r border-gray-200 bg-white shadow-sm overflow-hidden">
        {/* Header and Tabs */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Faculty Notifications
          </h2>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        <div className="flex border-b border-gray-200 bg-gray-50">
          {(
            ["All", "Classes", "Meetings", "Submissions", "Admin"] as const
          ).map((tab) => (
            <button
              key={tab}
              className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab
                  ? "text-blue-600 bg-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                />
              )}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search academic alerts..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Notification List Items */}
        <div className="flex-1 overflow-y-auto">
          {Object.entries(grouped).map(
            ([timeGroup, notifs]) =>
              notifs.length > 0 && (
                <div key={timeGroup} className="mb-4 last:mb-0">
                  <h3 className="text-xs font-semibold uppercase text-gray-500 px-6 py-3 bg-gray-50 sticky top-0 z-10">
                    {timeGroup}
                  </h3>
                  {notifs.map((notif) => (
                    <motion.div
                      key={notif.id}
                      layout
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.2 }}
                      className={`flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                        selectedNotification?.id === notif.id
                          ? "bg-blue-50"
                          : ""
                      } ${
                        notif.read
                          ? "text-gray-500"
                          : "text-gray-800 font-medium"
                      }`}
                      onClick={() => setSelectedNotification(notif)}
                    >
                      <UserAvatar user={notif.user} />
                      <div className="flex-1 ml-3 mr-2">
                        <p
                          className="text-sm line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: notif.message }}
                        />
                        <p className="text-xs text-gray-400 mt-0.5">
                          {notif.timestamp}
                        </p>
                      </div>
                      {!notif.read && (
                        <Dot className="text-blue-500 h-5 w-5 flex-shrink-0" />
                      )}
                      <NotificationOptionsDropdown
                        onMarkAsRead={() => markAsRead(notif.id)}
                        onMute={() => muteNotification(notif.id)}
                        onRemove={() => removeNotification(notif.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              )
          )}
          {filteredNotifications.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No notifications for this category.
            </div>
          )}
        </div>
      </div>

      {/* Right Panel: Notification Details */}
      <div className="flex-1 flex flex-col w-full lg:w-3/5 bg-gray-50 lg:border-l border-gray-200 overflow-hidden">
        {selectedNotification ? (
          <>
            {/* Details Header */}
            <div className="px-6 py-4 border-b border-gray-200 bg-white flex items-center justify-between shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">
                Notification Details
              </h3>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500">
                  {selectedNotification.timestamp}
                </span>
                <NotificationOptionsDropdown
                  onMarkAsRead={() => markAsRead(selectedNotification.id)}
                  onMute={() => muteNotification(selectedNotification.id)}
                  onRemove={() => removeNotification(selectedNotification.id)}
                />
              </div>
            </div>

            {/* Render Contextual Details */}
            <FacultyNotificationDetails notif={selectedNotification} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
            Select an alert to view details
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
