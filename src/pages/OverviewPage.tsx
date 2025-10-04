import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Users,
  TrendingUp,
  TrendingDown,
  Plus,
  Filter,
  MoreHorizontal,
  Search,
  Star, // NEW ICON
  CalendarCheck, // NEW ICON
  CheckCircle, // NEW ICON
  Clock as ClockIcon, // Renamed to avoid conflict with Clock
} from "lucide-react";
import { motion } from "framer-motion";

// Helper type for sessions
interface Session {
  id: number;
  name: string;
  faculty: string;
  category: string;
  type: "In-house" | "Out-house";
  duration: string;
  date: string; // YYYY-MM-DD
  status: "Completed" | "Scheduled" | "In progress";
  participants: number;
  rating: number; // NEW FIELD: Session Rating (out of 5)
}

// Helper for date comparison
const isDateWithinPeriod = (dateStr: string, period: string): boolean => {
  const sessionDate = new Date(dateStr);
  const today = new Date();
  let comparisonDate = new Date(today);

  switch (period) {
    case "last7Days":
      comparisonDate.setDate(today.getDate() - 7);
      break;
    case "thisMonth":
      comparisonDate = new Date(today.getFullYear(), today.getMonth(), 1);
      break;
    case "lastMonth":
      comparisonDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      break;
    default:
      return true;
  }

  // Session date must be on or after the comparison date
  return sessionDate >= comparisonDate;
};

const handleViewSessionDetails = (sessionId: number) =>
  console.log(`Navigating to session details for ID: ${sessionId}`);

const OverviewPage = () => {
  const initialSessions: Session[] = [
    {
      id: 101,
      name: "Advanced Mathematics",
      faculty: "Dr. Sarah Johnson",
      category: "Mathematics",
      type: "In-house",
      duration: "2h 30m",
      date: "2025-10-01", // Updated for recency
      status: "Completed",
      participants: 25,
      rating: 4.5, // Added rating
    },
    {
      id: 102,
      name: "Introduction to Physics",
      faculty: "Prof. Michael Chen",
      category: "Physics",
      type: "Out-house",
      duration: "1h 45m",
      date: "2025-10-04", // Updated for recency
      status: "Scheduled",
      participants: 18,
      rating: 0,
    },
    {
      id: 103,
      name: "Data Structures",
      faculty: "Dr. Emily Davis",
      category: "Computer Science",
      type: "In-house",
      duration: "3h 00m",
      date: "2025-09-28", // Older session
      status: "In progress",
      participants: 32,
      rating: 0,
    },
    {
      id: 104,
      name: "Organic Chemistry Lab",
      faculty: "Dr. Robert Wilson",
      category: "Chemistry",
      type: "In-house",
      duration: "4h 00m",
      date: "2025-09-15", // Older session
      status: "Completed",
      participants: 15,
      rating: 4.8,
    },
    {
      id: 105,
      name: "Literature Analysis",
      faculty: "Prof. Amanda Brown",
      category: "English",
      type: "Out-house",
      duration: "2h 00m",
      date: "2025-10-03", // Updated for recency
      status: "Completed",
      participants: 22,
      rating: 4.2,
    },
  ];

  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [filteredSessions, setFilteredSessions] =
    useState<Session[]>(initialSessions);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  // NEW STATE for time period filter
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("allTime");
  // NEW STATE for status quick filter tabs
  const [quickFilterStatus, setQuickFilterStatus] = useState<string>("All");

  // Calculate Average Rating
  const completedSessions = sessions.filter(
    (s) => s.status === "Completed" && s.rating > 0
  );
  const totalRating = completedSessions.reduce((sum, s) => sum + s.rating, 0);
  const averageRating =
    completedSessions.length > 0
      ? (totalRating / completedSessions.length).toFixed(1)
      : "N/A";
  const ratingTrend = averageRating > "4.0" ? "up" : "down"; // Simple trend logic

  const metrics = [
    {
      id: 1,
      title: "Sessions This Month",
      value: sessions
        .filter((s) => isDateWithinPeriod(s.date, "thisMonth"))
        .length.toString(),
      change: "+12%",
      changeText: "vs last month",
      icon: CalendarCheck, // Using CalendarCheck for completed sessions
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: "up",
    },
    {
      id: 2,
      title: "Total Hours",
      value: "1,248",
      change: "+8%",
      changeText: "vs last month",
      icon: Clock,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "up",
    },
    {
      id: 3,
      title: "Active Faculty",
      value: "89",
      change: "+5%",
      changeText: "vs last month",
      icon: Users,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      trend: "up",
    },
    {
      id: 4,
      title: "Avg. Session Rating", // NEW METRIC
      value: averageRating,
      change: ratingTrend === "up" ? "+0.2" : "-0.1",
      changeText: "vs last month",
      icon: Star,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      trend: ratingTrend,
    },
  ];

  // Primary filtering logic
  useEffect(() => {
    let tempSessions = [...sessions];

    // 1. Filter by Time Period (NEW)
    if (selectedTimePeriod !== "allTime") {
      tempSessions = tempSessions.filter((session) =>
        isDateWithinPeriod(session.date, selectedTimePeriod)
      );
    }

    // 2. Filter by Category
    if (selectedCategory) {
      tempSessions = tempSessions.filter(
        (session) => session.category === selectedCategory
      );
    }

    // 3. Filter by Status (NEW QUICK FILTER)
    if (quickFilterStatus !== "All") {
      tempSessions = tempSessions.filter(
        (session) => session.status === quickFilterStatus
      );
    }

    // 4. Filter by Search Term
    if (searchTerm) {
      tempSessions = tempSessions.filter(
        (session) =>
          session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.faculty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSessions(tempSessions);
  }, [
    sessions,
    searchTerm,
    selectedCategory,
    selectedTimePeriod,
    quickFilterStatus,
  ]);

  const handleNewSession = () => {
    const newSession: Session = {
      id: Date.now(),
      name: "New Scheduled Session",
      faculty: "New Faculty",
      category: "General",
      type: "In-house",
      duration: "1h 00m",
      date: new Date().toISOString().slice(0, 10),
      status: "Scheduled",
      participants: Math.floor(Math.random() * 50) + 5,
      rating: 0,
    };
    setSessions((prevSessions) => [newSession, ...prevSessions]);
  };

  const getStatusColor = (status: Session["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In progress":
        return "bg-blue-100 text-blue-800";
      case "Scheduled":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Mathematics: "bg-blue-100 text-blue-800",
      Physics: "bg-green-100 text-green-800",
      "Computer Science": "bg-purple-100 text-purple-800",
      Chemistry: "bg-orange-100 text-orange-800",
      English: "bg-red-100 text-red-800",
      General: "bg-gray-200 text-gray-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const allCategories = [
    ...new Set(sessions.map((session) => session.category)),
  ];

  const statusQuickFilters: { label: string; value: string; icon: any }[] = [
    { label: "All", value: "All", icon: Filter },
    { label: "Scheduled", value: "Scheduled", icon: Calendar },
    { label: "In Progress", value: "In progress", icon: ClockIcon },
    { label: "Completed", value: "Completed", icon: CheckCircle },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview 📊
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor your faculty sessions, performance, and key quality metrics.
          </p>
        </div>
        <motion.button
          onClick={handleNewSession}
          className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Session
        </motion.button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => (
          <motion.div
            key={metric.id}
            className="bg-white rounded-xl shadow-md border p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
            whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 ${metric.iconBg} rounded-xl flex items-center justify-center`}
              >
                <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {metric.value}
              </p>
              <div className="flex items-center text-sm font-medium">
                {metric.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span
                  className={`${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {metric.change}
                </span>
                <span className="text-gray-500 ml-1">{metric.changeText}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Sessions */}
      <div className="bg-white rounded-xl shadow-md border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
            <h2 className="text-xl font-bold text-gray-900">
              Recent Sessions Activity
            </h2>
            <div className="flex flex-wrap items-center space-x-3">
              {/* NEW: Time Period Filter */}
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={selectedTimePeriod}
                onChange={(e) => setSelectedTimePeriod(e.target.value)}
              >
                <option value="allTime">All Time</option>
                <option value="last7Days">Last 7 Days</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
              </select>

              {/* Search Input */}
              <div className="relative w-full sm:w-auto">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search sessions/faculty..."
                  className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {allCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* NEW: Status Quick Filter Tabs */}
        <div className="p-4 border-b border-gray-100 flex flex-wrap gap-2">
          {statusQuickFilters.map((filter) => (
            <motion.button
              key={filter.value}
              onClick={() => setQuickFilterStatus(filter.value)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full flex items-center transition-colors duration-200 ${
                quickFilterStatus === filter.value
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              whileTap={{ scale: 0.98 }}
            >
              <filter.icon className="w-4 h-4 mr-1.5" />
              {filter.label}
              <span
                className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-opacity-30"
                style={{
                  backgroundColor:
                    quickFilterStatus === filter.value
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(0, 0, 0, 0.05)",
                }}
              >
                {filter.value === "All"
                  ? sessions.length
                  : sessions.filter((s) => s.status === filter.value).length}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Sessions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Session
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Faculty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Participants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>{" "}
                {/* NEW COLUMN */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSessions.map((session) => (
                <motion.tr
                  key={session.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleViewSessionDetails(session.id)}
                  whileHover={{ scale: 1.01 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {session.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {session.faculty}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(
                        session.category
                      )}`}
                    >
                      {session.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{session.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {session.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{session.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        session.status
                      )}`}
                    >
                      {session.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {session.participants}
                    </div>
                  </td>
                  {/* NEW RATING CELL */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      {session.rating > 0 ? (
                        <>
                          <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />
                          {session.rating.toFixed(1)}
                        </>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(
                          `Opening menu for session ID: ${session.id}`
                        );
                      }}
                      className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filteredSessions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No sessions found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
