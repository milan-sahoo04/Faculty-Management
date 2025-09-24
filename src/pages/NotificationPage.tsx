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
  MessageSquare,
  Dot,
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
  category: "All" | "Tasks" | "Mentions" | "Projects" | "System";
  type:
    | "task_assigned"
    | "mentioned"
    | "project_status"
    | "task_completed"
    | "system_maintenance"
    | "project_created"
    | "account_security";
  message: string;
  user?: User; // User related to the notification event
  project?: string; // Project name if applicable
  timestamp: string; // e.g., "2 hours ago", "Yesterday"
  read: boolean;
  muted: boolean;
  commentContext?: string; // For mention notifications
  relatedDetails?: string; // For project/task details
  detailSender?: User; // For the "Sent by" in details
}

// --- Dummy Data ---
const users: { [key: string]: User } = {
  alex: { id: "alex", name: "Alex Morgan", avatar: "AM" },
  jessica: { id: "jessica", name: "Jessica Chen", avatar: "JC" },
  david: { id: "david", name: "David Kim", avatar: "DK" },
  sarah: { id: "sarah", name: "Sarah Johnson", avatar: "SJ" },
  william: { id: "william", name: "William Jack", avatar: "WJ" },
  system: { id: "system", name: "System", avatar: "SY" }, // Placeholder for system events
};

const initialNotifications: Notification[] = [
  // TODAY
  {
    id: "notif-1",
    category: "Tasks",
    type: "task_assigned",
    message: `<span class="font-semibold">${users.alex.name}</span> assigned you the task <span class="font-semibold">"Update design system"</span>`,
    user: users.alex,
    timestamp: "about 1 hour ago",
    read: false,
    muted: false,
  },
  {
    id: "notif-2",
    category: "Mentions",
    type: "mentioned",
    message: `<span class="font-semibold">${users.jessica.name}</span> mentioned you in a comment: "Can @you review this by tomorrow?"`,
    user: users.jessica,
    timestamp: "about 2 hours ago",
    read: false,
    muted: false,
    commentContext: `"Can @you review this by tomorrow?"`,
    relatedDetails: "View details of Task 'Figma Design System'",
    detailSender: users.jessica,
  },
  {
    id: "notif-3",
    category: "Projects",
    type: "project_status",
    message: `The project <span class="font-semibold">'Figma Design System'</span> status changed to <span class="font-medium text-blue-600">"In Progress"</span>`,
    user: users.system, // Conceptual system user for project updates
    project: "Figma Design System",
    timestamp: "about 6 hours ago",
    read: true,
    muted: false,
  },

  // YESTERDAY
  {
    id: "notif-4",
    category: "Tasks",
    type: "task_completed",
    message: `<span class="font-semibold">${users.david.name}</span> completed the task <span class="font-semibold">"Create wireframes for homepage"</span>`,
    user: users.david,
    timestamp: "1 day ago",
    read: true,
    muted: false,
  },

  // OLDER
  {
    id: "notif-5",
    category: "System",
    type: "system_maintenance",
    message: `Scheduled maintenance will occur on <span class="font-semibold">Sunday at 2:00 AM UTC</span>`,
    user: users.system,
    timestamp: "3 days ago",
    read: true,
    muted: false,
  },
  {
    id: "notif-6",
    category: "Mentions",
    type: "mentioned",
    message: `<span class="font-semibold">${users.sarah.name}</span> mentioned you in the task <span class="font-semibold">"Prepare Q3 report"</span>: "@you can help with the financial section?"`,
    user: users.sarah,
    timestamp: "3 days ago",
    read: true,
    muted: false,
  },
  {
    id: "notif-7",
    category: "Projects",
    type: "project_created",
    message: `<span class="font-semibold">${users.william.name}</span> created a new project <span class="font-semibold">"Mobile App Redesign"</span> and added you as a member`,
    user: users.william,
    project: "Mobile App Redesign",
    timestamp: "4 days ago",
    read: true,
    muted: false,
  },
  {
    id: "notif-8",
    category: "System",
    type: "account_security",
    message: `Your account password was changed successfully`,
    user: users.system,
    timestamp: "5 days ago",
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
  const bgColor = user?.id === "system" ? "bg-gray-400" : "bg-blue-600";
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
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1); // Set to start of yesterday

    const groups: { [key: string]: Notification[] } = {
      TODAY: [],
      YESTERDAY: [],
      OLDER: [],
    };

    notifs.forEach((notif) => {
      // Dummy timestamp logic for mock data
      if (notif.timestamp.includes("hour")) {
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

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden bg-white">
      {/* Left Panel: Notification List */}
      <div className="flex flex-col w-full lg:w-2/5 border-r border-gray-200 bg-white shadow-sm overflow-hidden">
        {/* Header and Tabs */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        <div className="flex border-b border-gray-200 bg-gray-50">
          {(["All", "Tasks", "Mentions", "Projects", "System"] as const).map(
            (tab) => (
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
            )
          )}
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
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

            {/* Details Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {selectedNotification.type === "mentioned" && (
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    You were mentioned in a comment
                  </h4>
                  <div className="flex items-start space-x-3 mb-4">
                    <UserAvatar user={selectedNotification.user} size="sm" />
                    <div>
                      <p className="font-medium text-gray-900 leading-none">
                        {selectedNotification.user?.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {selectedNotification.timestamp}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">
                    {selectedNotification.commentContext}
                  </p>
                </div>
              )}

              {selectedNotification.relatedDetails && (
                <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Related</h4>
                  <a
                    href="#"
                    className="flex items-center text-blue-600 hover:underline text-sm mb-3"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {selectedNotification.relatedDetails}
                  </a>
                  {selectedNotification.detailSender && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">Sent by</span>
                      <UserAvatar
                        user={selectedNotification.detailSender}
                        size="sm"
                      />
                      <span className="ml-2 font-medium">
                        {selectedNotification.detailSender.name}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* General notification content if not specific mention/related */}
              {selectedNotification.type !== "mentioned" &&
                !selectedNotification.relatedDetails && (
                  <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                    <p
                      className="text-gray-800 text-base"
                      dangerouslySetInnerHTML={{
                        __html: selectedNotification.message,
                      }}
                    />
                    {selectedNotification.user && (
                      <div className="flex items-center text-sm text-gray-600 mt-4">
                        <span className="mr-2">From</span>
                        <UserAvatar
                          user={selectedNotification.user}
                          size="sm"
                        />
                        <span className="ml-2 font-medium">
                          {selectedNotification.user.name}
                        </span>
                      </div>
                    )}
                  </div>
                )}

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-auto">
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Reply className="h-4 w-4 mr-2" />
                  Reply
                </button>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View Thread
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
            Select a notification to view details
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
