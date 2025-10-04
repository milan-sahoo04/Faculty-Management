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
  X, // Added for modal close button
  ChevronDown, // Added for dropdown
  FileTextIcon, // Used for Word/PDF
  FileSpreadsheet, // Used for Excel
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Data Definitions (Moved outside component for better organization/reusability) ---

const reportMetricsData = [
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
    title: "Avg. Session Duration",
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

const categoryPerformanceData = [
  {
    category: "Computer Science",
    sessions: 128,
    hours: 384,
    completion: 96.2,
    avgRating: 4.8,
    color: "bg-purple-500",
    id: "cs",
  },
  {
    category: "Mathematics",
    sessions: 85,
    hours: 255,
    completion: 94.1,
    avgRating: 4.6,
    color: "bg-blue-500",
    id: "math",
  },
  {
    category: "Chemistry",
    sessions: 72,
    hours: 216,
    completion: 93.8,
    avgRating: 4.7,
    color: "bg-orange-500",
    id: "chemistry",
  },
  {
    category: "Physics",
    sessions: 64,
    hours: 192,
    completion: 92.5,
    avgRating: 4.5,
    color: "bg-green-500",
    id: "physics",
  },
  {
    category: "Biology",
    sessions: 58,
    hours: 174,
    completion: 95.1,
    avgRating: 4.9,
    color: "bg-teal-500",
    id: "biology",
  },
  {
    category: "English Literature",
    sessions: 45,
    hours: 135,
    completion: 89.3,
    avgRating: 4.4,
    color: "bg-red-500",
    id: "english",
  },
];

const facultyPerformanceData = [
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

const sessionTrendsData = [
  { month: "Jan", sessions: 95, completion: 91.2 },
  { month: "Feb", sessions: 108, completion: 92.5 },
  { month: "Mar", sessions: 124, completion: 94.1 },
  { month: "Apr", sessions: 132, completion: 93.8 },
  { month: "May", sessions: 145, completion: 95.2 },
  { month: "Jun", sessions: 156, completion: 94.7 },
];

const reportTemplatesData = [
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
    description: "Personal performance reports for individual faculty members",
    lastGenerated: "2024-01-05",
    size: "5.2 MB",
    icon: Users,
  },
];

// --- Export Utility Functions ---

/**
 * Handles CSV export (download immediately)
 */
const exportToCSV = (metrics, categories, period) => {
  // 1. Key Metrics Header
  let csvContent =
    "Key Metrics for " +
    period.charAt(0).toUpperCase() +
    period.slice(1) +
    " Period\n";
  csvContent += "Metric,Value,Change\n";

  // 2. Key Metrics Data
  metrics.forEach((metric) => {
    csvContent += `"${metric.title.replace(/"/g, '""')}",${metric.value},${
      metric.change
    }\n`;
  });

  csvContent += "\n\nCategory Performance Overview\n";

  // 3. Category Performance Header
  const categoryHeaders = [
    "Category",
    "Sessions",
    "Hours",
    "Completion (%)",
    "Avg. Rating",
  ];
  csvContent += categoryHeaders.join(",") + "\n";

  // 4. Category Performance Data
  categories.forEach((category) => {
    csvContent += `"${category.category.replace(/"/g, '""')}",${
      category.sessions
    },${category.hours},${category.completion},${category.avgRating}\n`;
  });

  // 5. Create Blob and Download Link
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `Faculty_Report_${period}_${new Date().toISOString().slice(0, 10)}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  console.log("Exporting report as CSV...");
};

/**
 * Placeholder for PDF export
 */
const exportToPDF = (data) => {
  console.log(
    `[PDF Export] Generating PDF report for ${data.period}. This typically requires a library (like jsPDF) or server-side processing.`
  );
  alert(`Generating PDF Report for ${data.period}. (See console for details)`);
};

/**
 * Placeholder for MS Word export
 */
const exportToWord = (data) => {
  console.log(
    `[Word Export] Generating MS Word (.docx) report for ${data.period}. This requires a specialized library or server-side processing.`
  );
  alert(
    `Generating MS Word Report for ${data.period}. (See console for details)`
  );
};

// --- Custom Components ---

/**
 * Custom Modal for viewing a report.
 */
const ReportViewModal = ({ isOpen, onClose, reportName, description }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-2xl font-bold text-indigo-700">
                Viewing: {reportName}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content - Simulated Report UI */}
            <div className="p-6 overflow-y-auto flex-grow bg-gray-50 border-b border-gray-200">
              <div className="bg-white p-8 rounded-lg shadow-inner border border-dashed border-gray-300 min-h-[500px]">
                <h3 className="text-xl font-semibold mb-4 border-b pb-2">
                  Executive Summary
                </h3>
                <p className="text-gray-600 mb-6">{description}</p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="text-4xl font-extrabold text-blue-600">
                      {reportMetricsData[0].value}
                    </p>
                    <p className="text-sm text-gray-600">Total Sessions</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg text-center">
                    <p className="text-4xl font-extrabold text-green-600">
                      {reportMetricsData[1].value}
                    </p>
                    <p className="text-sm text-gray-600">Faculty Utilization</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <p className="text-4xl font-extrabold text-purple-600">
                      {reportMetricsData[3].value}
                    </p>
                    <p className="text-sm text-gray-600">Completion Rate</p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-4 border-b pb-2">
                  Detailed Category Breakdown
                </h3>
                <ul className="space-y-3">
                  {categoryPerformanceData.slice(0, 3).map((cat, i) => (
                    <li
                      key={i}
                      className="flex justify-between border-b last:border-b-0 py-2"
                    >
                      <span className="font-medium text-gray-700">
                        {cat.category}
                      </span>
                      <span className="text-sm text-green-600 font-semibold">
                        {cat.completion}% Complete
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-400 mt-6">
                  *This is a simplified preview. The full downloaded report
                  contains more pages and charts.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 flex justify-end space-x-3 bg-white">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close Preview
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                <Download className="w-4 h-4 inline mr-2" /> Download Full
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- ReportsPage Component ---

const ReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    name: "",
    description: "",
  });

  // --- Filtering Logic Implementation ---

  // 1. Filter Category Performance Data
  const getFilteredCategoryData = (categories, categoryId) => {
    if (categoryId === "all") {
      return categories;
    }
    // We filter based on the 'id' property we added to the data
    return categories.filter((item) => item.id === categoryId);
  };

  const filteredCategoryPerformanceData = getFilteredCategoryData(
    categoryPerformanceData,
    selectedCategory
  );

  // NOTE: In a real application, reportMetricsData, facultyPerformanceData,
  // and sessionTrendsData would also be filtered/refetched based on selectedPeriod and selectedCategory.

  // --- Action Handlers ---

  const handleExportClick = (format) => {
    setIsExportDropdownOpen(false); // Close dropdown

    const dataPackage = {
      metrics: reportMetricsData,
      categories: filteredCategoryPerformanceData, // Use filtered data
      period: selectedPeriod,
    };

    if (format === "csv") {
      exportToCSV(
        dataPackage.metrics,
        dataPackage.categories,
        dataPackage.period
      );
    } else if (format === "excel") {
      exportToExcel(dataPackage);
    } else if (format === "pdf") {
      exportToPDF(dataPackage);
    } else if (format === "word") {
      exportToWord(dataPackage);
    }
  };

  const handleFilter = () => console.log("Opening advanced filter options...");

  const handleViewReport = (template) => {
    setModalState({
      isOpen: true,
      name: template.name,
      description: template.description,
    });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, name: "", description: "" });
  };

  const handleExportCategoryData = () =>
    console.log("Exporting category data...");
  const handleCreateCustomReport = () =>
    console.log("Opening custom report creation tool...");
  const handleDownloadReport = (reportName) =>
    console.log(`Downloading pre-configured report: ${reportName}`);

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans bg-gray-50 min-h-screen">
      {/* Report View Modal */}
      <ReportViewModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        reportName={modalState.name}
        description={modalState.description}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Comprehensive insights into faculty performance and session
            analytics.
          </p>
        </div>
        <div className="flex space-x-3 relative">
          <motion.button
            onClick={handleFilter}
            className="bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </motion.button>

          {/* Export Dropdown Button */}
          <motion.button
            onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
            <ChevronDown
              className={`w-4 h-4 ml-2 transition-transform ${
                isExportDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </motion.button>

          {/* Export Dropdown Menu */}
          <AnimatePresence>
            {isExportDropdownOpen && (
              <motion.div
                className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-20 border border-gray-100"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-2">
                  <button
                    onClick={() => handleExportClick("csv")}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />{" "}
                    CSV (Data Only)
                  </button>
                  <button
                    onClick={() => handleExportClick("excel")}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <FileSpreadsheet className="w-4 h-4 mr-2 text-green-600" />{" "}
                    MS Excel
                  </button>
                  <button
                    onClick={() => handleExportClick("pdf")}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <FileTextIcon className="w-4 h-4 mr-2 text-red-600" /> PDF
                    (Print Ready)
                  </button>
                  <button
                    onClick={() => handleExportClick("word")}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <FileTextIcon className="w-4 h-4 mr-2 text-blue-600" /> MS
                    Word
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Period and Category Selectors */}
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <div>
          <label
            htmlFor="period-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Time Period
          </label>
          {/* NOTE: Period change currently only affects state and export text */}
          <select
            id="period-select"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="category-select"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          {/* Filter is implemented here */}
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          >
            <option value="all">All Categories</option>
            <option value="cs">Computer Science</option>
            <option value="math">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
          </select>
        </div>
      </div>

      <hr className="mb-8 border-gray-200" />

      {/* Key Metrics */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Key Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {reportMetricsData.map((metric, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-md border border-gray-100 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between">
              <div
                className={`w-12 h-12 ${metric.iconBg} rounded-xl flex items-center justify-center`}
              >
                <metric.icon className={`w-6 h-6 ${metric.iconColor}`} />
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-1">{metric.title}</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {metric.value}
              </p>
              <div className="flex items-center space-x-1">
                {metric.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <p
                  className={`text-sm font-medium ${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {metric.change}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <hr className="mb-8 border-gray-200" />

      {/* Charts & Performance */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Session Trends Chart (Static bar representation) */}
        <div className="bg-white rounded-xl shadow-md border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Session Trends
            </h2>
            <div className="flex items-center space-x-4">
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
            {sessionTrendsData.map((trend, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 w-12">
                  {trend.month}
                </span>
                <div className="flex-1 mx-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        // Assuming 156 is the max for scaling the sessions bar
                        style={{ width: `${(trend.sessions / 156) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">
                      {trend.sessions}
                    </span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-green-600 w-16 text-right">
                  {trend.completion}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Faculty Performance */}
        <div className="bg-white rounded-xl shadow-md border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Top Faculty Performance
            </h2>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {facultyPerformanceData.map((faculty, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">
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
                <div className="flex items-center space-x-5 text-right">
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-semibold text-gray-900">
                      {faculty.sessions}
                    </p>
                    <p className="text-xs text-gray-500">Sessions</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-semibold text-green-600">
                      {faculty.completion}%
                    </p>
                    <p className="text-xs text-gray-500">Complete</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-sm font-semibold text-yellow-600">
                      {faculty.rating}
                    </p>
                    <p className="text-xs text-gray-500">Rating</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr className="mb-8 border-gray-200" />

      {/* Category Performance Table */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Category Performance Overview
      </h2>
      <div className="bg-white rounded-xl shadow-md border p-6 mb-12">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 text-sm">
            A breakdown of key metrics by subject category.
            {selectedCategory !== "all" && (
              <span className="ml-2 font-medium text-indigo-600">
                (Filtered by:{" "}
                {
                  categoryPerformanceData.find((c) => c.id === selectedCategory)
                    ?.category
                }
                )
              </span>
            )}
          </p>
          <motion.button
            onClick={handleExportCategoryData}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            Export Data
          </motion.button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3">
                  Category
                </th>
                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3">
                  Sessions
                </th>
                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3">
                  Hours
                </th>
                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3">
                  Completion
                </th>
                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3">
                  Avg. Rating
                </th>
                <th className="text-xs font-medium text-gray-500 uppercase tracking-wider py-3">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Using the filtered data here */}
              {filteredCategoryPerformanceData.map((category, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 ${category.color} rounded-full mr-3`}
                      ></div>
                      <span className="text-sm font-medium text-gray-900">
                        {category.category}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-900 whitespace-nowrap">
                    {category.sessions}
                  </td>
                  <td className="py-4 text-sm text-gray-900 whitespace-nowrap">
                    {category.hours}
                  </td>
                  <td className="py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-green-600">
                      {category.completion}%
                    </span>
                  </td>
                  <td className="py-4 whitespace-nowrap">
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
                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[150px]">
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

      <hr className="mb-8 border-gray-200" />

      {/* Report Templates */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Report Templates</h2>
      <div className="bg-white rounded-xl shadow-md border p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600 text-sm">
            Generate or download pre-configured reports.
          </p>
          <motion.button
            onClick={handleCreateCustomReport}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Custom Report
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTemplatesData.map((template, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <template.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {template.description}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2 flex-shrink-0">
                  {/* View Report Button - Opens Modal */}
                  <motion.button
                    onClick={() => handleViewReport(template)}
                    className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Eye className="w-5 h-5" />
                  </motion.button>
                  {/* Download Button */}
                  <motion.button
                    onClick={() => handleDownloadReport(template.name)}
                    className="p-2 rounded-full text-indigo-500 hover:text-indigo-700 hover:bg-indigo-100 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Download className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-4 mt-4 border-gray-100">
                <span className="font-medium">
                  Last Generated: {template.lastGenerated}
                </span>
                <span className="font-medium">Size: {template.size}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
