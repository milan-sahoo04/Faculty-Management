import React, { useState, useMemo, useCallback, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  ChevronDown,
  CheckCircle,
  Clock,
  Calendar as CalendarIcon,
  UploadCloud,
  Download,
  X,
  Trash2,
  Share2,
  Mail,
  MessageCircle,
  Copy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Type Definitions for Academic Events ---
interface AcademicEvent {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD
  category: string; // e.g., Quiz, Assignment, Exam, Meeting, Office Hour, Other
  courseId: string | null; // e.g., "CS 301" - Used for Departmental/Course Filtering
  color: string;
  isUserEvent: boolean; // Flag to denote if the current faculty member created it (for delete permissions)
}

// --- Mock Data ---
const mockEvents: AcademicEvent[] = [
  {
    id: 101,
    title: "CS 301 Quiz Grading Due",
    date: "2025-09-10",
    category: "Assignment",
    courseId: "CS 301",
    color: "bg-yellow-200 text-yellow-800 border-yellow-500",
    isUserEvent: true,
  },
  {
    id: 102,
    title: "Faculty Meeting: Curriculum",
    date: "2025-09-12",
    category: "Meeting",
    courseId: null,
    color: "bg-red-200 text-red-800 border-red-500",
    isUserEvent: false,
  },
  {
    id: 103,
    title: "EE 205 Lab Report Deadline",
    date: "2025-09-15",
    category: "Assignment",
    courseId: "EE 205",
    color: "bg-yellow-200 text-yellow-800 border-yellow-500",
    isUserEvent: true,
  },
  {
    id: 104,
    title: "Office Hours: 10:00 AM",
    date: "2025-09-20",
    category: "Office Hour",
    courseId: null,
    color: "bg-green-200 text-green-800 border-green-500",
    isUserEvent: true,
  },
  {
    id: 105,
    title: "Final Exam Start: CS 301",
    date: "2025-09-24",
    category: "Exam",
    courseId: "CS 301",
    color: "bg-blue-200 text-blue-800 border-blue-500",
    isUserEvent: false,
  },
  {
    id: 107,
    title: "New Seminar Planning",
    date: "2025-09-25",
    category: "Meeting",
    courseId: "CS 301",
    color: "bg-purple-200 text-purple-800 border-purple-500",
    isUserEvent: true,
  },
];

const allCategories = [
  "All Categories",
  "Quiz",
  "Assignment",
  "Exam",
  "Meeting",
  "Office Hour",
  "Other",
];

const allCourses = ["All Courses", "CS 301", "EE 205", "ME 410"];

// --- Utility: Get Share Text (Placeholder/Example) ---
const getShareContent = (events: AcademicEvent[]) => {
  const todayString = new Date().toISOString().split("T")[0];
  const upcomingEvents = events
    .filter((e) => e.date >= todayString)
    .slice(0, 5);

  let text = "📅 Faculty Scheduler - Upcoming Tasks:\n\n";

  if (upcomingEvents.length === 0) {
    text += "No major events scheduled soon!";
    return text;
  }

  upcomingEvents.forEach((event) => {
    const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    text += `• [${event.category}] ${event.title} (${
      event.courseId || "General"
    }) on ${formattedDate}\n`;
  });

  text += "\nAccess the full calendar here: [YOUR_APP_URL/calendar]";
  return text;
};

// --- Add Event Modal Component ---
interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    event: Omit<AcademicEvent, "id" | "color" | "isUserEvent"> & {
      color: string;
    }
  ) => void;
  defaultDate: Date;
}

const AddEventModal: React.FC<AddEventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  defaultDate,
}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(allCategories[1]);
  const [courseId, setCourseId] = useState(allCourses[1]);
  const [date, setDate] = useState(defaultDate.toISOString().split("T")[0]);

  React.useEffect(() => {
    if (isOpen) {
      setDate(defaultDate.toISOString().split("T")[0]);
      setTitle("");
      setCategory(allCategories[1]);
      setCourseId(allCourses[1]);
    }
  }, [defaultDate, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !date) return;

    let color = "bg-gray-200 text-gray-800 border-gray-500";
    if (category === "Exam")
      color = "bg-blue-200 text-blue-800 border-blue-500";
    if (category === "Assignment")
      color = "bg-yellow-200 text-yellow-800 border-yellow-500";
    if (category === "Meeting")
      color = "bg-red-200 text-red-800 border-red-500";
    if (category === "Office Hour")
      color = "bg-green-200 text-green-800 border-green-500";
    if (category === "Quiz")
      color = "bg-orange-200 text-orange-800 border-orange-500";

    onSave({
      title,
      date,
      category,
      courseId: courseId === "All Courses" ? null : courseId,
      color,
    });
    onClose(); // Close on successful save
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-indigo-700">
            Add New Task/Event 📝
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Final Grade Submission, Thesis Review"
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {allCategories.slice(1).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Course/Dept (Optional)
              </label>
              <select
                value={courseId || allCourses[0]}
                onChange={(e) => setCourseId(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {allCourses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center"
            >
              <CheckCircle size={18} className="mr-2" /> Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Event Details and Delete Modal Component ---
interface EventDetailsModalProps {
  isOpen: boolean;
  event: AcademicEvent | null;
  onClose: () => void;
  onDelete: (id: number) => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  isOpen,
  event,
  onClose,
  onDelete,
}) => {
  if (!isOpen || !event) return null;

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete the event: ${event.title}?`
      )
    ) {
      onDelete(event.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-gray-900">{event.title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-3 p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center text-sm font-medium text-gray-700">
            <CalendarIcon size={16} className="mr-2 text-indigo-500" />
            Date:{" "}
            <span className="ml-2 font-bold">
              {new Date(event.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center text-sm font-medium text-gray-700">
            <Clock size={16} className="mr-2 text-indigo-500" />
            Type:{" "}
            <span
              className={`ml-2 font-bold px-2 py-0.5 rounded-full text-xs ${event.color}`}
            >
              {event.category}
            </span>
          </div>
          {event.courseId && (
            <div className="flex items-center text-sm font-medium text-gray-700">
              <span className="w-4 mr-2"></span>
              Course:{" "}
              <span className="ml-2 font-bold text-indigo-600">
                {event.courseId}
              </span>
            </div>
          )}
          <div className="text-sm text-gray-600 border-t pt-3 mt-3">
            <span className="font-semibold">Source:</span>{" "}
            {event.isUserEvent
              ? "Your Personal Schedule"
              : "Official University Calendar"}
          </div>
        </div>

        {event.isUserEvent && (
          <div className="flex justify-end pt-4">
            <button
              onClick={handleDelete}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium transition shadow-md"
            >
              <Trash2 size={16} />
              <span>Delete Schedule</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Share Dropdown Component ---
interface ShareDropdownProps {
  events: AcademicEvent[];
}

const ShareDropdown: React.FC<ShareDropdownProps> = ({ events }) => {
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

  const shareContent = getShareContent(events);
  const encodedContent = encodeURIComponent(shareContent);

  const handleShare = (type: "whatsapp" | "email" | "copy") => {
    setIsOpen(false);

    if (type === "whatsapp") {
      const whatsappUrl = `https://wa.me/?text=${encodedContent}`;
      window.open(whatsappUrl, "_blank");
    } else if (type === "email") {
      const subject = encodeURIComponent("Upcoming Faculty Scheduler Events");
      const emailUrl = `mailto:?subject=${subject}&body=${encodedContent}`;
      window.open(emailUrl);
    } else if (type === "copy") {
      navigator.clipboard
        .writeText(shareContent)
        .then(() => alert("Upcoming events list copied to clipboard!"))
        .catch(() => alert("Failed to copy."));
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 text-sm font-medium transition shadow-md"
      >
        <Share2 size={16} />
        <span>Share</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10 overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-1">
              <button
                onClick={() => handleShare("whatsapp")}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-green-50 rounded-md transition"
              >
                <MessageCircle size={16} className="mr-2 text-green-600" />{" "}
                Share via WhatsApp
              </button>
              <button
                onClick={() => handleShare("email")}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md transition"
              >
                <Mail size={16} className="mr-2 text-blue-600" /> Share via
                Email
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition"
              >
                <Copy size={16} className="mr-2 text-gray-600" /> Copy Link/Text
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Calendar Page Component ---
export const CalendarPage: React.FC = () => {
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [currentDate, setCurrentDate] = useState(new Date("2025-09-01"));
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCourseOpen, setIsCourseOpen] = useState(false);

  // State for events and modals
  const [events, setEvents] = useState<AcademicEvent[]>(mockEvents);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [modalDefaultDate, setModalDefaultDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<AcademicEvent | null>(
    null
  );

  // --- Core Calendar Logic ---
  const currentMonthYear = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(currentDate);
  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const getCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const numDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    const days = [];
    for (let i = 0; i < startDay; i++) days.push(null);
    for (let i = 1; i <= numDays; i++) days.push(new Date(year, month, i));
    return days;
  };

  const calendarDays = useMemo(
    () => getCalendarDays(currentDate),
    [currentDate]
  );

  const goToPreviousMonth = () =>
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  const goToNextMonth = () =>
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  const goToToday = () => setCurrentDate(new Date());

  // --- Filtering Logic ---
  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const categoryMatch =
          selectedCategory === "All Categories" ||
          event.category === selectedCategory;
        const courseMatch =
          selectedCourse === "All Courses" || event.courseId === selectedCourse;
        return categoryMatch && courseMatch;
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [selectedCategory, selectedCourse, events]);

  const getEventsForDay = (day: Date | null) => {
    if (!day) return [];
    const dayString = day.toISOString().split("T")[0];
    return filteredEvents.filter((event) => event.date === dayString);
  };

  // --- CRUD Event Handlers ---
  const handleAddEvent = useCallback(
    (
      eventData: Omit<AcademicEvent, "id" | "color" | "isUserEvent"> & {
        color: string;
      }
    ) => {
      const newEvent: AcademicEvent = {
        ...eventData,
        id: Date.now(),
        isUserEvent: true,
      };
      // API CALL: POST /api/v1/schedules
      setEvents((prev) => [...prev, newEvent]);
      setIsAddModalOpen(false); // Close the modal upon successful save
    },
    []
  );

  const handleDeleteEvent = useCallback((id: number) => {
    // API CALL: DELETE /api/v1/schedules/{id}
    setEvents((prev) => prev.filter((event) => event.id !== id));
  }, []);

  // --- UI Interaction Handlers ---

  const handleDayClick = (day: Date | null) => {
    if (!day) return;
    setModalDefaultDate(day);
    setIsAddModalOpen(true);
  };

  const handleEventClick = (event: AcademicEvent) => {
    setSelectedEvent(event);
    setIsDetailsModalOpen(true);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  const handleCourseSelect = (course: string) => {
    setSelectedCourse(course);
    setIsCourseOpen(false);
  };

  // --- Next Task Widget Logic ---
  const nextTask = useMemo(() => {
    const todayString = new Date().toISOString().split("T")[0];
    const upcomingEvents = events.filter((e) => e.date >= todayString);
    return upcomingEvents.length > 0
      ? upcomingEvents.sort((a, b) => a.date.localeCompare(b.date))[0]
      : null;
  }, [events]);

  // --- UI Structure ---
  return (
    <div className="p-4 md:p-8 font-sans bg-gray-50 min-h-screen">
      {/* Modals */}
      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddEvent}
        defaultDate={modalDefaultDate}
      />
      <EventDetailsModal
        isOpen={isDetailsModalOpen}
        event={selectedEvent}
        onClose={() => setIsDetailsModalOpen(false)}
        onDelete={handleDeleteEvent}
      />

      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white p-6 rounded-xl shadow-xl border-t-4 border-indigo-600 mb-6">
        {/* Title and Navigation */}
        <div className="flex items-center space-x-6 mb-4 lg:mb-0">
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
            <CalendarIcon size={28} className="mr-3 text-indigo-600" />
            Faculty Scheduler 🎯
          </h1>
          <div className="flex items-center space-x-1 border border-gray-300 rounded-lg p-1 bg-gray-50">
            <button
              onClick={goToPreviousMonth}
              className="p-1 hover:bg-gray-200 rounded-md transition"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <span className="font-bold text-gray-800 mx-2 w-32 text-center">
              {currentMonthYear}
            </span>
            <button
              onClick={goToNextMonth}
              className="p-1 hover:bg-gray-200 rounded-md transition"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
          <button
            onClick={goToToday}
            className="hidden sm:block px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-100 transition"
          >
            Today
          </button>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap gap-3 items-center mt-4 lg:mt-0">
          {/* View Toggle (New Addition) */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden text-sm font-medium shadow-sm">
            <button
              onClick={() => setView("month")}
              className={`px-3 py-2 transition ${
                view === "month"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView("week")}
              className={`px-3 py-2 transition border-l border-r border-gray-300 ${
                view === "week"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView("day")}
              className={`px-3 py-2 transition ${
                view === "day"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Day
            </button>
          </div>

          {/* Filter Dropdowns */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center space-x-2 bg-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100 transition w-full"
            >
              <Filter size={16} />
              <span>{selectedCategory}</span>
              <ChevronDown
                size={16}
                className={`transform transition-transform ${
                  isCategoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isCategoryOpen && (
              <div className="absolute top-12 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsCourseOpen(!isCourseOpen)}
              className="flex items-center space-x-2 bg-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100 transition w-full"
            >
              <Filter size={16} />
              <span>{selectedCourse}</span>
              <ChevronDown
                size={16}
                className={`transform transition-transform ${
                  isCourseOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isCourseOpen && (
              <div className="absolute top-12 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-10">
                {allCourses.map((course) => (
                  <button
                    key={course}
                    onClick={() => handleCourseSelect(course)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition"
                  >
                    {course}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* New Task Button */}
          <button
            onClick={() => handleDayClick(new Date())}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium transition shadow-md"
          >
            <Plus size={16} />
            <span>New Task</span>
          </button>

          {/* SHARE Dropdown */}
          <ShareDropdown events={events} />

          {/* Export Action (Still Available) */}
          <button
            onClick={() => alert("iCal/CSV Export initiated!")}
            className="p-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            title="Export Calendar"
          >
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Main Content: Calendar and Next Task Widget */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar Grid (Main Content) */}
        <div className="lg:w-3/4 bg-white rounded-xl shadow-lg p-6">
          {view === "month" && (
            <div>
              {/* Day Labels */}
              <div className="grid grid-cols-7 text-center text-sm font-bold text-indigo-600 border-b-2 border-indigo-100 pb-3 mb-3">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>
              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  const dayEvents = getEventsForDay(day);
                  const isCurrentDay =
                    day && day.toDateString() === new Date().toDateString();

                  return (
                    <div
                      key={index}
                      className={`min-h-[120px] p-2 border border-gray-200 rounded-lg relative transition-shadow duration-150 ease-in-out cursor-pointer ${
                        day
                          ? "bg-white hover:shadow-lg"
                          : "bg-gray-50 text-gray-400"
                      }`}
                      onClick={() => handleDayClick(day)}
                    >
                      {day && (
                        <span
                          className={`absolute top-2 right-2 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                            isCurrentDay
                              ? "bg-indigo-600 text-white shadow-lg border-2 border-white"
                              : "text-gray-800"
                          }`}
                        >
                          {day.getDate()}
                        </span>
                      )}
                      <div className="mt-8 space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={`text-[10px] px-2 py-1 rounded-md border-l-4 truncate font-medium cursor-pointer transition-transform hover:scale-[1.02] ${event.color}`}
                            title={`${event.title} (${event.category})`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEventClick(event);
                            }}
                          >
                            {event.courseId && (
                              <span className="font-bold mr-1">
                                [{event.courseId}]
                              </span>
                            )}
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div
                            className="text-xs text-gray-500 mt-1 pl-2 hover:text-indigo-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              alert(
                                `Viewing all ${
                                  dayEvents.length
                                } events for ${day?.toDateString()}`
                              );
                            }}
                          >
                            +{dayEvents.length - 2} more events...
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {/* No Events Placeholder */}
          {view === "month" && filteredEvents.length === 0 && (
            <div className="text-center text-gray-500 mt-4 p-12 border-t border-dashed">
              <UploadCloud className="h-10 w-10 mx-auto mb-4 text-indigo-300" />
              <p className="text-lg font-medium">
                No events match the current filter(s).
              </p>
              <p className="text-sm">
                Try selecting **"All Categories"** and **"All Courses"** to view
                the full university schedule.
              </p>
            </div>
          )}
          {/* Week/Day View Placeholder */}
          {(view === "week" || view === "day") && (
            <div className="text-center text-xl font-semibold text-gray-700 min-h-[500px] flex flex-col items-center justify-center bg-gray-50 rounded-lg">
              <p className="mb-4">
                The detailed **{view} view** is coming soon!
              </p>
              <p className="text-sm text-gray-500">
                Currently showing a filtered list of upcoming events for{" "}
                {currentMonthYear}.
              </p>
            </div>
          )}
        </div>
        {/* Right Sidebar: Next Task Widget (Sticky) */}
        <div className="lg:w-1/4">
          <div className="bg-indigo-700 text-white rounded-xl shadow-xl p-5 sticky lg:top-8">
            <h3 className="text-lg font-bold mb-3 flex items-center">
              <Clock size={20} className="mr-2" />
              Next Hard Deadline
            </h3>
            {nextTask ? (
              <div className="space-y-2">
                <p className="text-2xl font-extrabold leading-tight">
                  {nextTask.title}
                </p>
                <p className="text-sm font-medium opacity-80">
                  {nextTask.category}{" "}
                  {nextTask.courseId ? `for ${nextTask.courseId}` : ""}
                </p>
                <div className="pt-3 border-t border-indigo-500">
                  <p className="text-sm font-bold text-yellow-300">Due Date:</p>
                  <p className="text-xl font-bold">
                    {new Date(nextTask.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <button
                  onClick={() => handleEventClick(nextTask)}
                  className="w-full text-center mt-4 px-3 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium hover:bg-indigo-600 transition"
                >
                  View Details
                </button>
              </div>
            ) : (
              <div className="text-sm opacity-90 p-4 bg-indigo-600 rounded-lg">
                <p className="font-semibold mb-1">Schedule Clear! 🎉</p>
                <p>
                  No upcoming tasks or deadlines found on your filtered list.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
