// src/pages/CalendarPage.tsx
import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  ChevronDown,
} from "lucide-react";

// --- Type Definitions for Academic Events ---
interface AcademicEvent {
  id: number;
  title: string;
  date: string;
  category: string; // e.g., Quiz, Assignment, Exam, Meeting, Other
  courseId: string | null; // e.g., "CS 301"
  color: string;
}

// --- Placeholder/Mock Data (REPLACE with API Call) ---
const mockEvents: AcademicEvent[] = [
  {
    id: 101,
    title: "CS 301 Quiz Grading Due",
    date: "2025-09-10",
    category: "Assignment",
    courseId: "CS 301",
    color: "bg-yellow-200 text-yellow-800",
  },
  {
    id: 102,
    title: "Faculty Meeting: Curriculum",
    date: "2025-09-12",
    category: "Meeting",
    courseId: null,
    color: "bg-red-200 text-red-800",
  },
  {
    id: 103,
    title: "EE 205 Lab Report Deadline",
    date: "2025-09-15",
    category: "Assignment",
    courseId: "EE 205",
    color: "bg-yellow-200 text-yellow-800",
  },
  {
    id: 104,
    title: "Office Hours: 10:00 AM",
    date: "2025-09-20",
    category: "Other",
    courseId: null,
    color: "bg-gray-200 text-gray-800",
  },
  {
    id: 105,
    title: "Final Exam Start: CS 301",
    date: "2025-09-24",
    category: "Exam",
    courseId: "CS 301",
    color: "bg-blue-200 text-blue-800",
  },
  {
    id: 106,
    title: "HR Training Session",
    date: "2025-09-25",
    category: "Meeting",
    courseId: null,
    color: "bg-red-200 text-red-800",
  },
];

// Updated categories for academic focus
const allCategories = [
  "All Categories",
  "Quiz",
  "Assignment",
  "Exam",
  "Meeting",
  "Other",
];

const CalendarPage = () => {
  const [view, setView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date("2025-09-01"));
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  // State for the mock events - In a real app, this would be fetched from Spring Boot
  const [events, setEvents] = useState<AcademicEvent[]>(mockEvents);

  const currentMonthYear = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(currentDate);

  // --- Calendar Utilities (Kept from original) ---
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
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= numDays; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const calendarDays = useMemo(
    () => getCalendarDays(currentDate),
    [currentDate]
  );

  const goToPreviousMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // --- Filtering Logic (Modified for Category) ---
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const categoryMatch =
        selectedCategory === "All Categories" ||
        event.category === selectedCategory;
      return categoryMatch;
    });
  }, [selectedCategory, events]);

  // Function to get events for a specific day
  const getEventsForDay = (day: Date | null) => {
    if (!day) return [];
    const dayString = day.toISOString().split("T")[0];
    return filteredEvents.filter((event) => event.date === dayString);
  };

  // --- Component Functions ---
  const handleNewSchedule = () => {
    // TODO: Implement Modal logic for adding a new event
    alert("New Schedule Modal will open here!");
    // Example: Trigger Spring Boot POST /api/v1/schedule
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
    // In a real application, changing the category might trigger a *re-fetch* // from the backend if the dataset is large. For this mock, it filters locally.
  };

  return (
    <div className="p-4 md:p-8 font-sans bg-gray-50 min-h-screen">
      {/* Top Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm mb-6">
        {/* Left Section: Calendar Title and Navigation */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900 hidden md:block">
            Academic Schedule
          </h1>
          <div className="flex items-center space-x-1 border rounded-lg p-1 bg-gray-50">
            <button
              onClick={goToPreviousMonth}
              className="p-1 hover:bg-gray-200 rounded-md"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <span className="font-medium text-gray-800 mx-2 w-32 text-center">
              {currentMonthYear}
            </span>
            <button
              onClick={goToNextMonth}
              className="p-1 hover:bg-gray-200 rounded-md"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
          <button
            onClick={goToToday}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
          >
            Today
          </button>
        </div>

        {/* Right Section: View Toggles, Filters, User Actions */}
        <div className="flex items-center space-x-4">
          {/* View Selection Buttons (Kept for completeness) */}
          <div className="hidden sm:flex border border-gray-300 rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => setView("month")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                view === "month"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView("week")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                view === "week"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView("day")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                view === "day"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Day
            </button>
          </div>

          {/* Category Dropdown (Replaces Projects) */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center space-x-2 bg-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <Filter size={16} />
              <span className="hidden sm:inline">{selectedCategory}</span>
              <ChevronDown
                size={16}
                className={`transform transition-transform ${
                  isCategoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isCategoryOpen && (
              <div className="absolute top-12 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* New Schedule Button (Replaces New Project) */}
          <button
            onClick={handleNewSchedule}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
          >
            <Plus size={16} />
            <span>New Schedule</span>
          </button>

          {/* User Avatar (Kept) */}
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-blue-400">
            <img
              src="https://randomuser.me/api/portraits/men/86.jpg"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Calendar Content */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Calendar Grid (Month View) */}
        {view === "month" && (
          <div>
            <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 border-b border-gray-200 pb-2 mb-2">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => {
                const dayEvents = getEventsForDay(day);
                const isCurrentDay =
                  day && day.toDateString() === new Date().toDateString();

                return (
                  <div
                    key={index}
                    className={`min-h-[100px] p-2 border border-gray-200 rounded-lg relative transition-shadow duration-150 ease-in-out hover:shadow-md ${
                      day ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    {day && (
                      <span
                        className={`absolute top-2 right-2 text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full ${
                          isCurrentDay
                            ? "bg-blue-600 text-white font-bold"
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
                          className={`text-[10px] px-2 py-1 rounded-md truncate cursor-pointer hover:opacity-80 ${event.color}`}
                          title={`${event.title} (${event.category})`}
                          // Add onClick to open event details modal here
                        >
                          {event.courseId && (
                            <span className="font-semibold mr-1">
                              [{event.courseId}]
                            </span>
                          )}
                          {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500 mt-1 cursor-pointer hover:underline">
                          +{dayEvents.length - 2} more...
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Week/Day View Placeholder (Kept for future development) */}
        {(view === "week" || view === "day") && (
          <div className="text-center text-xl font-semibold text-gray-700 min-h-[500px] flex flex-col items-center justify-center">
            <p className="mb-4">
              {view} view for {currentMonthYear} is under construction.
            </p>
            <div className="mt-4 w-full max-w-md bg-gray-50 p-6 rounded-lg shadow-inner">
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                Current Filtered Tasks:
              </h3>
              <ul className="space-y-2 text-left text-base">
                {filteredEvents.map((event) => (
                  <li
                    key={event.id}
                    className="bg-white p-3 rounded-md border border-gray-200 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {event.courseId && `Course: ${event.courseId} | `}
                        {event.category} on {event.date}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${event.color}`}
                    >
                      {event.category}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Placeholder for no filtered events */}
        {view === "month" &&
          calendarDays.filter(getEventsForDay).length === 0 && (
            <div className="text-center text-gray-500 mt-4 p-8 border-t border-dashed">
              No academic events or meetings match your filter criteria for{" "}
              <span className="font-bold">{currentMonthYear}</span>.
            </div>
          )}
      </div>
    </div>
  );
};

export default CalendarPage;
