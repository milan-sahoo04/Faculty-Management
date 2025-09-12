import React from "react";
import {
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Plus,
  Filter,
  MoreHorizontal,
} from "lucide-react";

const OverviewPage = () => {
  const metrics = [
    {
      title: "Sessions This Month",
      value: "156",
      change: "+12% vs last month",
      icon: Calendar,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      trend: "up",
    },
    {
      title: "Total Hours",
      value: "1,248",
      change: "+8% vs last month",
      icon: Clock,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "up",
    },
    {
      title: "Active Faculty",
      value: "89",
      change: "+5% vs last month",
      icon: Users,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      trend: "up",
    },
    {
      title: "Completion Rate",
      value: "94.2%",
      change: "+2.1% vs last month",
      icon: TrendingUp,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      trend: "up",
    },
  ];

  const recentSessions = [
    {
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
    const colors: { [key: string]: string } = {
      Mathematics: "bg-blue-100 text-blue-800",
      Physics: "bg-green-100 text-green-800",
      "Computer Science": "bg-purple-100 text-purple-800",
      Chemistry: "bg-orange-100 text-orange-800",
      English: "bg-red-100 text-red-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Monitor your faculty sessions and performance metrics
          </p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          New Session
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 ${metric.iconBg} rounded-lg flex items-center justify-center`}
              >
                <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
              <p className="text-2xl font-bold text-gray-900 mb-2">
                {metric.value}
              </p>
              <p className="text-sm text-green-600">{metric.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Sessions */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Sessions
            </h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search sessions..."
                  className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option>All Categories</option>
                <option>Mathematics</option>
                <option>Physics</option>
                <option>Computer Science</option>
              </select>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Filter className="w-5 h-5" />
              </button>
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
              {recentSessions.map((session, index) => (
                <tr key={index} className="hover:bg-gray-50">
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
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(
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
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
