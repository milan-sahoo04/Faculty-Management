import React, { useState } from "react";
import {
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  BarChart3,
  PieChart,
  FileText,
  Filter,
  Eye,
} from "lucide-react";

const ReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const reportMetrics = [
    {
      title: "Total Sessions",
      value: "1,248",
      change: "+12.5%",
      trend: "up",
      icon: Calendar,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Faculty Utilization",
      value: "87.3%",
      change: "+3.2%",
      trend: "up",
      icon: Users,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Average Session Duration",
      value: "2h 15m",
      change: "-5.1%",
      trend: "down",
      icon: Clock,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Completion Rate",
      value: "94.7%",
      change: "+2.8%",
      trend: "up",
      icon: TrendingUp,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ];

  const categoryPerformance = [
    {
      category: "Computer Science",
      sessions: 128,
      hours: 384,
      completion: 96.2,
      avgRating: 4.8,
      color: "bg-purple-500",
    },
    {
      category: "Mathematics",
      sessions: 85,
      hours: 255,
      completion: 94.1,
      avgRating: 4.6,
      color: "bg-blue-500",
    },
    {
      category: "Chemistry",
      sessions: 72,
      hours: 216,
      completion: 93.8,
      avgRating: 4.7,
      color: "bg-orange-500",
    },
    {
      category: "Physics",
      sessions: 64,
      hours: 192,
      completion: 92.5,
      avgRating: 4.5,
      color: "bg-green-500",
    },
    {
      category: "Biology",
      sessions: 58,
      hours: 174,
      completion: 95.1,
      avgRating: 4.9,
      color: "bg-teal-500",
    },
    {
      category: "English Literature",
      sessions: 45,
      hours: 135,
      completion: 89.3,
      avgRating: 4.4,
      color: "bg-red-500",
    },
  ];

  const facultyPerformance = [
    {
      name: "Dr. Emily Davis",
      sessions: 28,
      hours: 84,
      completion: 98.2,
      rating: 4.9,
      category: "Computer Science",
    },
    {
      name: "Dr. Sarah Johnson",
      sessions: 25,
      hours: 75,
      completion: 96.8,
      rating: 4.8,
      category: "Mathematics",
    },
    {
      name: "Prof. Amanda Brown",
      sessions: 22,
      hours: 66,
      completion: 94.5,
      rating: 4.7,
      category: "English Literature",
    },
    {
      name: "Prof. Michael Chen",
      sessions: 18,
      hours: 54,
      completion: 95.6,
      rating: 4.6,
      category: "Physics",
    },
    {
      name: "Dr. Robert Wilson",
      sessions: 15,
      hours: 45,
      completion: 93.3,
      rating: 4.7,
      category: "Chemistry",
    },
  ];

  const sessionTrends = [
    { month: "Jan", sessions: 95, completion: 91.2 },
    { month: "Feb", sessions: 108, completion: 92.5 },
    { month: "Mar", sessions: 124, completion: 94.1 },
    { month: "Apr", sessions: 132, completion: 93.8 },
    { month: "May", sessions: 145, completion: 95.2 },
    { month: "Jun", sessions: 156, completion: 94.7 },
  ];

  const reportTemplates = [
    {
      name: "Monthly Faculty Report",
      description:
        "Comprehensive monthly overview of faculty performance and session statistics",
      lastGenerated: "2024-01-15",
      size: "2.4 MB",
      icon: FileText,
    },
    {
      name: "Category Performance Analysis",
      description:
        "Detailed breakdown of performance metrics by subject category",
      lastGenerated: "2024-01-10",
      size: "1.8 MB",
      icon: PieChart,
    },
    {
      name: "Session Utilization Report",
      description:
        "Analysis of session scheduling efficiency and resource utilization",
      lastGenerated: "2024-01-08",
      size: "3.1 MB",
      icon: BarChart3,
    },
    {
      name: "Faculty Individual Reports",
      description:
        "Personal performance reports for individual faculty members",
      lastGenerated: "2024-01-05",
      size: "5.2 MB",
      icon: Users,
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Comprehensive insights into faculty performance and session
            analytics
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Period and Category Selectors */}
      <div className="flex items-center space-x-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time Period
          </label>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="cs">Computer Science</option>
            <option value="math">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {reportMetrics.map((metric, index) => (
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
              <div className="flex items-center">
                {metric.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <p
                  className={`text-sm ${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {metric.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Session Trends Chart */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Session Trends
            </h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Sessions</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Completion %</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {sessionTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <span className="text-sm font-medium text-gray-700 w-8">
                    {trend.month}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-500 h-2 rounded-full"
                          style={{ width: `${(trend.sessions / 156) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {trend.sessions}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <span className="text-sm font-medium text-green-600">
                    {trend.completion}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Faculty Performance */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Top Faculty Performance
            </h2>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {facultyPerformance.map((faculty, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {faculty.name}
                    </p>
                    <p className="text-xs text-gray-500">{faculty.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">
                        {faculty.sessions}
                      </p>
                      <p className="text-xs text-gray-500">Sessions</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">
                        {faculty.completion}%
                      </p>
                      <p className="text-xs text-gray-500">Complete</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900">
                        {faculty.rating}
                      </p>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Category Performance Overview
          </h2>
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            Export Data
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">
                  Category
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">
                  Sessions
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">
                  Hours
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">
                  Completion
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">
                  Avg Rating
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categoryPerformance.map((category, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 ${category.color} rounded-full mr-3`}
                      ></div>
                      <span className="text-sm font-medium text-gray-900">
                        {category.category}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-900">
                    {category.sessions}
                  </td>
                  <td className="py-4 text-sm text-gray-900">
                    {category.hours}
                  </td>
                  <td className="py-4">
                    <span className="text-sm font-medium text-green-600">
                      {category.completion}%
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900 mr-1">
                        {category.avgRating}
                      </span>
                      <div className="flex text-yellow-400">
                        {"★".repeat(Math.floor(category.avgRating))}
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                      <div
                        className={`h-2 rounded-full ${category.color}`}
                        style={{ width: `${category.completion}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Report Templates
          </h2>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            Create Custom Report
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTemplates.map((template, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <template.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {template.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {template.description}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-indigo-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Last generated: {template.lastGenerated}</span>
                <span>Size: {template.size}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
