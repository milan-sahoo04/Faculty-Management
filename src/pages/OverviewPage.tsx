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
} from "lucide-react";
import { motion } from "framer-motion";

// Placeholder for your navigation and data handlers
const handleViewSessionDetails = (sessionId: number) =>
  console.log(`Navigating to session details for ID: ${sessionId}`);

const OverviewPage = () => {
  const initialSessions = [
    {
      id: 101,
      name: "Advanced Mathematics",
      faculty: "Dr. Sarah Johnson",
      category: "Mathematics",
      type: "In-house",
      duration: "2h 30m",
      date: "2024-01-15",
      status: "Completed",
      participants: 25,
    },
    {
      id: 102,
      name: "Introduction to Physics",
      faculty: "Prof. Michael Chen",
      category: "Physics",
      type: "Out-house",
      duration: "1h 45m",
      date: "2024-01-16",
      status: "Scheduled",
      participants: 18,
    },
    {
      id: 103,
      name: "Data Structures",
      faculty: "Dr. Emily Davis",
      category: "Computer Science",
      type: "In-house",
      duration: "3h 00m",
      date: "2024-01-16",
      status: "In progress",
      participants: 32,
    },
    {
      id: 104,
      name: "Organic Chemistry Lab",
      faculty: "Dr. Robert Wilson",
      category: "Chemistry",
      type: "In-house",
      duration: "4h 00m",
      date: "2024-01-17",
      status: "Scheduled",
      participants: 15,
    },
    {
      id: 105,
      name: "Literature Analysis",
      faculty: "Prof. Amanda Brown",
      category: "English",
      type: "Out-house",
      duration: "2h 00m",
      date: "2024-01-17",
      status: "Completed",
      participants: 22,
    },
  ];

  const [sessions, setSessions] = useState(initialSessions);
  const [filteredSessions, setFilteredSessions] = useState(initialSessions);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const metrics = [
    {
      id: 1,
      title: "Sessions This Month",
      value: "156",
      change: "+12%",
      changeText: "vs last month",
      icon: Calendar,
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
      title: "Completion Rate",
      value: "94.2%",
      change: "+2.1%",
      changeText: "vs last month",
      icon: TrendingUp,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      trend: "up",
    },
  ];

  // This useEffect hook is the core of the fix.
  // It listens for changes in sessions, searchTerm, and selectedCategory
  // and re-runs the filtering and searching logic automatically.
  useEffect(() => {
    let tempSessions = [...sessions];

    // Filter by category first
    if (selectedCategory) {
      tempSessions = tempSessions.filter(
        (session) => session.category === selectedCategory
      );
    }

    // Then filter by search term on the results of the category filter
    if (searchTerm) {
      tempSessions = tempSessions.filter(
        (session) =>
          session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          session.faculty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSessions(tempSessions);
  }, [sessions, searchTerm, selectedCategory]);

  const handleNewSession = () => {
    const newSession = {
      id: Date.now(),
      name: "New Scheduled Session",
      faculty: "New Faculty",
      category: "General",
      type: "In-house",
      duration: "1h 00m",
      date: new Date().toISOString().slice(0, 10),
      status: "Scheduled",
      participants: Math.floor(Math.random() * 50) + 5,
    };
    // Add the new session to the beginning of the list
    setSessions((prevSessions) => [newSession, ...prevSessions]);
  };

  const getStatusColor = (status: string) => {
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
    const colors = {
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

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Monitor your faculty sessions and performance metrics.
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
        {metrics.map((metric, index) => (
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
            <h2 className="text-xl font-bold text-gray-900">Recent Sessions</h2>
            <div className="flex flex-wrap items-center space-x-2 md:space-x-3">
              <div className="relative w-full sm:w-auto">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search sessions..."
                  className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
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
