// src/pages/CalendarPage.tsx
import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Bell,
  Plus,
  Filter,
  Users,
  User,
  ChevronDown,
} from "lucide-react";

// Dummy data for project and assignee avatars
const assigneeAvatars = {
  "Alex Morgan": "https://randomuser.me/api/portraits/men/32.jpg",
  "Jessica Chen": "https://randomuser.me/api/portraits/women/44.jpg",
  "Ryan Park": "https://randomuser.me/api/portraits/men/4.jpg",
  "Sarah Johnson": "https://randomuser.me/api/portraits/women/66.jpg",
  "David Kim": "https://randomuser.me/api/portraits/men/50.jpg",
};

const allEvents = [
  {
    id: 1,
    title: "Design System Review",
    date: "2025-09-10",
    project: "Design",
    assignee: "Jessica Chen",
    color: "bg-purple-200 text-purple-800",
  },
  {
    id: 2,
    title: "Client Meeting",
    date: "2025-09-12",
    project: "Sales",
    assignee: "Alex Morgan",
    color: "bg-orange-200 text-orange-800",
  },
  {
    id: 3,
    title: "Mobile App Sprint Plan",
    date: "2025-09-15",
    project: "Development",
    assignee: "Ryan Park",
    color: "bg-blue-200 text-blue-800",
  },
  {
    id: 4,
    title: "Website Launch",
    date: "2025-09-20",
    project: "Development",
    assignee: "Sarah Johnson",
    color: "bg-green-200 text-green-800",
  },
  {
    id: 5,
    title: "Team Building",
    date: "2025-09-24",
    project: "HR",
    assignee: "Jessica Chen",
    color: "bg-red-200 text-red-800",
  },
  {
    id: 6,
    title: "Quarterly Review",
    date: "2025-09-25",
    project: "HR",
    assignee: "David Kim",
    color: "bg-red-200 text-red-800",
  },
];

const allProjects = ["All Projects", "Design", "Sales", "Development", "HR"];
const allAssignees = [
  "All Assignees",
  "Alex Morgan",
  "Jessica Chen",
  "Ryan Park",
  "Sarah Johnson",
  "David Kim",
];

const CalendarPage = () => {
  const [view, setView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date("2025-09-01")); // Starting with September 2025
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [selectedAssignee, setSelectedAssignee] = useState("All Assignees");
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isAssigneesOpen, setIsAssigneesOpen] = useState(false);

  const currentMonthYear = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(currentDate);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday

  const getCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth(); // 0-indexed
    const numDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month); // Day of week for 1st of month

    const days = [];
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }
    // Add actual days of the month
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
    setCurrentDate(new Date()); // Sets to current actual date
  };

  const filteredEvents = useMemo(() => {
    return allEvents.filter((event) => {
      const projectMatch =
        selectedProject === "All Projects" || event.project === selectedProject;
      const assigneeMatch =
        selectedAssignee === "All Assignees" ||
        event.assignee === selectedAssignee;
      return projectMatch && assigneeMatch;
    });
  }, [selectedProject, selectedAssignee]);

  // Function to get events for a specific day
  const getEventsForDay = (day) => {
    if (!day) return [];
    const dayString = day.toISOString().split("T")[0]; // Format to YYYY-MM-DD
    return filteredEvents.filter((event) => event.date === dayString);
  };

  return (
    <div className="p-4 md:p-8 font-sans bg-gray-50 min-h-screen">
      {/* Top Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm mb-6">
        {/* Left Section: Calendar Title and Navigation */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900 hidden md:block">
            Calendar
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
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* View Selection Buttons */}
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

          {/* Projects Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsProjectsOpen(!isProjectsOpen);
                setIsAssigneesOpen(false); // Close other dropdown
              }}
              className="flex items-center space-x-2 bg-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <Filter size={16} />
              <span className="hidden sm:inline">{selectedProject}</span>
              <ChevronDown
                size={16}
                className={`transform transition-transform ${
                  isProjectsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isProjectsOpen && (
              <div className="absolute top-12 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {allProjects.map((project) => (
                  <button
                    key={project}
                    onClick={() => {
                      setSelectedProject(project);
                      setIsProjectsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {project}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Assignees Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsAssigneesOpen(!isAssigneesOpen);
                setIsProjectsOpen(false); // Close other dropdown
              }}
              className="flex items-center space-x-2 bg-white px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <Users size={16} />
              <span className="hidden sm:inline">{selectedAssignee}</span>
              <ChevronDown
                size={16}
                className={`transform transition-transform ${
                  isAssigneesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isAssigneesOpen && (
              <div className="absolute top-12 right-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <p className="px-4 py-2 text-xs text-gray-500 font-semibold uppercase">
                  Filter by Assignee
                </p>
                {allAssignees.map((assignee) => (
                  <button
                    key={assignee}
                    onClick={() => {
                      setSelectedAssignee(assignee);
                      setIsAssigneesOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                  >
                    {assignee !== "All Assignees" ? (
                      <img
                        src={assigneeAvatars[assignee]}
                        alt={assignee}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    ) : (
                      <User size={24} className="text-gray-400" />
                    )}
                    <span>{assignee}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="relative p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
            <Plus size={16} />
            <span>New Project</span>
          </button>

          {/* User Avatar */}
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-blue-400">
            <img
              src="https://randomuser.me/api/portraits/men/86.jpg" // Placeholder user avatar
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Main Calendar Content */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Calendar Navigation for Mobile/Smaller Screens (if desired, currently hidden) */}
        <div className="flex justify-between items-center mb-4 lg:hidden">
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

        {/* Calendar Grid (Mock) */}
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
                    className={`min-h-[100px] p-2 border border-gray-200 rounded-lg relative ${
                      day ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    {day && (
                      <span
                        className={`absolute top-2 right-2 text-xs font-medium ${
                          isCurrentDay
                            ? "text-blue-600 font-bold"
                            : "text-gray-800"
                        }`}
                      >
                        {day.getDate()}
                      </span>
                    )}
                    <div className="mt-6 space-y-1">
                      {dayEvents.slice(0, 2).map(
                        (
                          event // Show up to 2 events, more sophisticated handling needed for real cal
                        ) => (
                          <div
                            key={event.id}
                            className={`text-xs px-2 py-1 rounded-md truncate ${event.color}`}
                          >
                            {event.title}
                          </div>
                        )
                      )}
                      {dayEvents.length > 2 && (
                        <div className="text-xs text-gray-500 mt-1">
                          +{dayEvents.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {view === "week" && (
          <div className="text-center text-xl font-semibold text-gray-700 min-h-[500px] flex items-center justify-center">
            Week view for {currentMonthYear} is a work in progress.
            <div className="mt-4 w-full max-w-md">
              <h3 className="text-lg font-medium mb-2">Filtered Events:</h3>
              <ul className="space-y-2">
                {filteredEvents.map((event) => (
                  <li
                    key={event.id}
                    className="bg-gray-100 p-3 rounded-md border border-gray-200"
                  >
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.date}</p>
                    <p className="text-sm text-blue-600">{event.project}</p>
                    <p className="text-sm text-gray-500">
                      Assigned to: {event.assignee}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {view === "day" && (
          <div className="text-center text-xl font-semibold text-gray-700 min-h-[500px] flex items-center justify-center">
            Day view for {currentMonthYear} is a work in progress.
            <div className="mt-4 w-full max-w-md">
              <h3 className="text-lg font-medium mb-2">Filtered Events:</h3>
              <ul className="space-y-2">
                {filteredEvents.map((event) => (
                  <li
                    key={event.id}
                    className="bg-gray-100 p-3 rounded-md border border-gray-200"
                  >
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.date}</p>
                    <p className="text-sm text-blue-600">{event.project}</p>
                    <p className="text-sm text-gray-500">
                      Assigned to: {event.assignee}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Placeholder for no filtered events, visible if all filters remove events from current view */}
        {view === "month" && filteredEvents.length === 0 && (
          <div className="text-center text-gray-500 mt-4">
            No events match your filter criteria for this month.
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
