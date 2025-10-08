import React, { useState, useRef } from "react";
import {
  Bell,
  Search,
  MoreHorizontal,
  Mail,
  Trash2,
  VolumeX,
  Reply,
  Dot,
  Calendar,
  FileText,
  Clock,
  Users,
  X,
  CheckCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// --- Data Structures ---
interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Notification {
  id: string;
  category: "All" | "Classes" | "Meetings" | "Submissions" | "Admin";
  type:
    | "meeting_invite"
    | "class_update"
    | "new_submission"
    | "class_enrollment"
    | "admin_announcement";
  message: string;
  user?: User;
  context?: string;
  timestamp: string;
  read: boolean;
  muted: boolean;
  dateTime?: string;
  fileName?: string;
  senderRole?: string;
}

// --- Dummy Data ---
const users: { [key: string]: User } = {
  alex: { id: "alex", name: "Alex Morgan (Student)", avatar: "AM" },
  david: { id: "david", name: "David Kim (Admin)", avatar: "DK" },
  william: { id: "william", name: "Dr. Jack (Dept. Head)", avatar: "WJ" },
  system: { id: "system", name: "System", avatar: "SY" },
};

const initialNotifications: Notification[] = [
  // TODAY - UNREAD
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
  // YESTERDAY - READ
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
  // OLDER - READ
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

const UserAvatar: React.FC<{ user: User | undefined }> = ({ user }) => {
  const bgColor =
    user?.id === "system"
      ? "bg-gray-400"
      : user?.name.includes("Student")
      ? "bg-teal-600"
      : "bg-blue-600";
  return (
    <div
      className={`flex-shrink-0 rounded-full flex items-center justify-center font-semibold text-white h-8 w-8 text-sm ${bgColor}`}
    >
      {user ? user.avatar : "UN"}
    </div>
  );
};

interface NotificationOptionsDropdownProps {
  notif: Notification;
  onMarkAsRead: () => void;
  onMute: (context: string) => void;
  onRemove: () => void;
}

const NotificationOptionsDropdown: React.FC<
  NotificationOptionsDropdownProps
> = ({ notif, onMarkAsRead, onMute, onRemove }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const muteContext = notif.context || notif.type;

  return (
    <div className="relative inline-block text-left z-20" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 rounded-full p-1"
        onClick={(e) => {
          e.stopPropagation(); // Prevent list item click
          setIsOpen(!isOpen);
        }}
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-30"
            tabIndex={-1}
          >
            <div className="py-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkAsRead();
                  setIsOpen(false);
                }}
                className="text-gray-700 flex px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
              >
                <Mail className="h-5 w-5 mr-2" />{" "}
                {notif.read ? "Mark as unread" : "Mark as read"}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMute(muteContext);
                  setIsOpen(false);
                }}
                className="text-gray-700 flex px-4 py-2 text-sm w-full text-left hover:bg-gray-100"
              >
                <VolumeX className="h-5 w-5 mr-2" /> Mute alerts for "
                {muteContext}"
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                  setIsOpen(false);
                }}
                className="text-red-700 flex px-4 py-2 text-sm w-full text-left hover:bg-red-50"
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
    useState<Notification | null>(null); // Start with null for mobile view
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [mutedContexts, setMutedContexts] = useState<string[]>([]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications
    .filter((notif) => {
      if (activeTab !== "All" && notif.category !== activeTab) return false;
      if (showUnreadOnly && notif.read) return false;
      const contextToMatch = notif.context || notif.type;
      return !mutedContexts.includes(contextToMatch);
    })
    .sort((a, b) => (a.read === b.read ? 0 : a.read ? 1 : -1));

  const markAsRead = (id: string, forceStatus?: boolean) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: forceStatus ?? !notif.read } : notif
      )
    );
    setSelectedNotification((prev) =>
      prev?.id === id ? { ...prev, read: forceStatus ?? !prev.read } : prev
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) =>
        filteredNotifications.some((fn) => fn.id === notif.id) && !notif.read
          ? { ...notif, read: true }
          : notif
      )
    );
  };

  const muteNotificationContext = (context: string) => {
    if (!mutedContexts.includes(context)) {
      setMutedContexts((prev) => [...prev, context]);
      alert(`Muted all future alerts for: ${context}`);
    } else {
      setMutedContexts((prev) => prev.filter((c) => c !== context));
      alert(`Unmuted alerts for: ${context}`);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    if (selectedNotification?.id === id) {
      setSelectedNotification(null);
    }
  };

  const groupNotificationsByTime = (notifs: Notification[]) => {
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

  // --- REFINED Helper Component for Notification Details ---
  const FacultyNotificationDetails: React.FC<{ notif: Notification }> = ({
    notif,
  }) => {
    return (
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-5 border border-gray-200">
          <div className="flex items-center space-x-2 mb-2 pb-2 border-b">
            <UserAvatar user={notif.user} />
            <div>
              <p className="font-semibold text-gray-900">
                {notif.user?.name || "System"}
              </p>
              <span className="text-xs text-gray-500">
                {notif.senderRole || notif.category}
              </span>
            </div>
          </div>

          <h4 className="text-xl font-bold text-gray-900 mb-3">
            {notif.context || "General Notification"}
          </h4>

          <p
            className="text-gray-800 text-base mb-4"
            dangerouslySetInnerHTML={{ __html: notif.message }}
          />

          {/* Contextual Details Block */}
          {notif.type === "meeting_invite" && (
            <div className="space-y-2 text-sm text-gray-700 pt-3 border-t border-gray-100">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-blue-500" />{" "}
                <span className="font-semibold">Time & Location:</span>{" "}
                {notif.dateTime}{" "}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-blue-500" />{" "}
                <span className="font-semibold">Organizer:</span>{" "}
                {notif.user?.name}
              </div>
            </div>
          )}

          {notif.type === "new_submission" && (
            <div className="space-y-2 text-sm text-gray-700 pt-3 border-t border-gray-100 bg-teal-50 p-3 rounded">
              <div className="flex items-center text-teal-700">
                <FileText className="h-4 w-4 mr-2" />
                <span className="font-semibold">File Submitted:</span>{" "}
                {notif.fileName}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-teal-700" />{" "}
                <span className="font-semibold">Received:</span>{" "}
                {notif.timestamp}
              </div>
            </div>
          )}

          {notif.type === "admin_announcement" && (
            <p className="text-sm text-gray-600 mt-3 border-t pt-3">
              <span className="font-semibold text-orange-600">Action:</span>{" "}
              Please review the full document. This often impacts policies or
              payroll.
            </p>
          )}
        </div>

        {/* Action Buttons (Refined) */}
        <div className="flex flex-wrap justify-end gap-3 pt-4 border-t border-gray-200 mt-auto bg-white p-3 rounded-lg shadow-sm">
          {notif.type === "meeting_invite" && (
            <>
              <button className="flex items-center px-4 py-2 border border-green-300 rounded-md text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 flex-1 sm:flex-initial justify-center">
                <CheckCircle className="h-4 w-4 mr-2" /> Accept Invite
              </button>
              <button className="flex items-center px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 flex-1 sm:flex-initial justify-center">
                <X className="h-4 w-4 mr-2" /> Decline
              </button>
            </>
          )}
          {notif.type === "new_submission" && (
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 flex-1 sm:flex-initial justify-center">
              <FileText className="h-4 w-4 mr-2" /> Go to Grading (
              {notif.context})
            </button>
          )}
          {notif.type === "admin_announcement" && (
            <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 flex-1 sm:flex-initial justify-center">
              <Reply className="h-4 w-4 mr-2" /> View Full Announcement
            </button>
          )}
        </div>
        {/* Mobile: Back button for details view */}
        <button
          onClick={() => setSelectedNotification(null)}
          className="lg:hidden fixed bottom-4 right-4 z-40 p-3 bg-blue-600 text-white rounded-full shadow-lg flex items-center"
          aria-label="Back to Alerts"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    );
  };
  // --- End of REFINED Helper Component ---

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Responsive Layout Control:
        - Mobile: The Notification List takes the full screen (w-full).
        - LG Screen: The Notification List takes 2/5 width.
        - When a notification is selected on mobile, the List is hidden and Details is shown.
      */}

      {/* Left Panel: Notification List */}
      <div
        className={`flex-col w-full border-r border-gray-200 bg-white shadow-lg overflow-hidden transition-transform duration-300 ease-in-out 
          ${selectedNotification && "hidden lg:flex"} 
          ${!selectedNotification && "flex lg:w-2/5"}
        `}
      >
        {/* Header and Bulk Actions */}
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center mb-2 sm:mb-0">
            <Bell className="h-6 w-6 mr-2 text-blue-600" />
            Alerts
            {unreadCount > 0 && (
              <span className="ml-3 px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
                {unreadCount} New
              </span>
            )}
          </h2>
          {/* Bulk Action Button */}
          {unreadCount > 0 && (
            <button
              className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              onClick={markAllAsRead}
            >
              <Mail className="h-4 w-4 mr-1" /> Mark All as Read
            </button>
          )}
        </div>

        {/* Tabs & Quick Filter */}
        <div className="flex overflow-x-auto whitespace-nowrap border-b border-gray-200 bg-gray-50">
          {(
            ["All", "Classes", "Meetings", "Submissions", "Admin"] as const
          ).map((tab) => (
            <button
              key={tab}
              className={`flex-shrink-0 px-4 py-3 text-sm font-medium transition-colors relative ${
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
          {/* Unread Quick Filter (Fixed width to avoid layout shift) */}
          <button
            className={`flex-shrink-0 py-3 px-4 text-xs font-medium transition-colors relative border-l border-gray-200 ${
              showUnreadOnly
                ? "text-red-600 bg-red-50"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
          >
            <Dot
              className={`h-6 w-6 absolute top-1/2 left-0 transform -translate-y-1/2 ${
                showUnreadOnly ? "text-red-500" : "text-gray-400"
              }`}
            />
            <span className="pl-4">Unread</span>
          </button>
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
                <div key={timeGroup} className="mb-0">
                  <h3 className="text-xs font-semibold uppercase text-gray-500 px-6 py-2 bg-gray-100 sticky top-0 z-10 border-t border-gray-200">
                    {timeGroup}
                  </h3>
                  <AnimatePresence>
                    {notifs.map((notif) => (
                      <motion.div
                        key={notif.id}
                        layout
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer ${
                          selectedNotification?.id === notif.id
                            ? "bg-blue-50 border-l-4 border-blue-600"
                            : "border-l-4 border-transparent"
                        } ${
                          !notif.read
                            ? "text-gray-800 font-medium"
                            : "text-gray-500"
                        }`}
                        onClick={() => {
                          setSelectedNotification(notif);
                          markAsRead(notif.id, true);
                        }}
                      >
                        <UserAvatar user={notif.user} />
                        <div className="flex-1 ml-3 mr-2 min-w-0">
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
                          notif={notif}
                          onMarkAsRead={() => markAsRead(notif.id)}
                          onMute={muteNotificationContext}
                          onRemove={() => removeNotification(notif.id)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )
          )}
          {filteredNotifications.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No active, unmuted alerts found.
            </div>
          )}
        </div>
      </div>

      {/* Right Panel: Notification Details */}
      <div
        className={`flex-col w-full bg-gray-50 overflow-hidden transition-transform duration-300 ease-in-out
          ${selectedNotification ? "flex lg:w-3/5" : "hidden"}
        `}
      >
        {selectedNotification ? (
          <>
            {/* Details Header (Mobile back button added) */}
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-white flex items-center justify-between shadow-sm">
              <button
                onClick={() => setSelectedNotification(null)}
                className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-full mr-3"
                aria-label="Back to Alerts"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-lg font-bold text-gray-900 flex-1">
                Contextual Details
              </h3>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-500 hidden sm:block">
                  {selectedNotification.timestamp}
                </span>
                <NotificationOptionsDropdown
                  notif={selectedNotification}
                  onMarkAsRead={() => markAsRead(selectedNotification.id)}
                  onMute={muteNotificationContext}
                  onRemove={() => removeNotification(selectedNotification.id)}
                />
              </div>
            </div>

            {/* Render Contextual Details */}
            <FacultyNotificationDetails notif={selectedNotification} />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 text-lg p-8">
            <Bell className="h-12 w-12 mb-4 text-blue-300" />
            Select an alert to view its details and associated actions.
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
