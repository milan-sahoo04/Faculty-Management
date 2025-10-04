// src/components/CategoriesPage.tsx

import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  FolderOpen,
  Users,
  Calendar,
  MoreHorizontal,
  BookOpen,
  X,
  AlertTriangle,
  HardHat,
  FlaskConical,
  Globe,
  Dna,
  Cpu,
  Calculator,
  Zap,
  Clock, // New icon for Time Weight
  Star, // New icon for Priority
  BarChart, // New icon for Analytics
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Helper function to convert HEX to a text color class for icons
const getColorClass = (hex: string) => {
  // Simple heuristic: if color is dark (sum of RGB < 382.5), use text-white, otherwise use text-gray-900 or text-[the-color]
  // Since we only use the HEX for the background/accent, we'll return a class for text.
  // For simplicity and adherence to Tailwind, we'll return a text class that matches the hex's general color family (e.g., text-blue-600)
  if (hex === "#2563EB") return "text-blue-600";
  if (hex === "#10B981") return "text-green-600";
  if (hex === "#9333EA") return "text-purple-600";
  if (hex === "#EA580C") return "text-orange-600";
  if (hex === "#DC2626") return "text-red-600";
  if (hex === "#0D9488") return "text-teal-600";
  return "text-gray-600";
};

// Category type definition - UPDATED
type Category = {
  id: number;
  name: string;
  description: string;
  // CHANGE: Using HEX string for true custom color
  color: string; // e.g., "#2563EB" (Tailwind indigo-600)
  facultyCount: number;
  sessionCount: number;
  subjects: string[];
  status: "active" | "inactive";
  createdDate: string;
  image: React.ElementType;
  // NEW FIELDS
  priority: "High" | "Medium" | "Low";
  defaultTimeWeightHours: number; // For Effort Load Calculation
};

const initialCategories: Category[] = [
  {
    id: 1,
    name: "Mathematics",
    description:
      "Advanced mathematical concepts including calculus, algebra, and statistics",
    color: "#2563EB", // Blue-600
    facultyCount: 12,
    sessionCount: 85,
    subjects: [
      "Calculus",
      "Linear Algebra",
      "Statistics",
      "Discrete Mathematics",
    ],
    status: "active",
    createdDate: "2024-01-10",
    image: Calculator,
    priority: "High",
    defaultTimeWeightHours: 5,
  },
  {
    id: 2,
    name: "Physics",
    description:
      "Theoretical and applied physics covering mechanics, thermodynamics, and quantum physics",
    color: "#10B981", // Green-600
    facultyCount: 8,
    sessionCount: 64,
    subjects: [
      "Mechanics",
      "Thermodynamics",
      "Quantum Physics",
      "Electromagnetism",
    ],
    status: "active",
    createdDate: "2024-01-12",
    image: Zap,
    priority: "Medium",
    defaultTimeWeightHours: 3,
  },
  {
    id: 3,
    name: "Computer Science",
    description:
      "Programming, algorithms, data structures, and software engineering principles",
    color: "#9333EA", // Purple-600
    facultyCount: 15,
    sessionCount: 128,
    subjects: [
      "Data Structures",
      "Algorithms",
      "Machine Learning",
      "Software Engineering",
    ],
    status: "active",
    createdDate: "2024-01-08",
    image: Cpu,
    priority: "High",
    defaultTimeWeightHours: 6,
  },
  {
    id: 4,
    name: "Chemistry",
    description:
      "Organic, inorganic, and biochemistry with laboratory components",
    color: "#EA580C", // Orange-600
    facultyCount: 10,
    sessionCount: 72,
    subjects: [
      "Organic Chemistry",
      "Inorganic Chemistry",
      "Biochemistry",
      "Physical Chemistry",
    ],
    status: "active",
    createdDate: "2024-01-15",
    image: FlaskConical,
    priority: "Medium",
    defaultTimeWeightHours: 4,
  },
  {
    id: 5,
    name: "English Literature",
    description: "Classic and modern literature analysis and creative writing",
    color: "#DC2626", // Red-600
    facultyCount: 6,
    sessionCount: 45,
    subjects: [
      "Classical Literature",
      "Modern Poetry",
      "Creative Writing",
      "Linguistics",
    ],
    status: "inactive", // Inactive for demo purposes
    createdDate: "2024-01-05",
    image: Globe,
    priority: "Low",
    defaultTimeWeightHours: 2,
  },
  {
    id: 6,
    name: "Biology",
    description:
      "Life sciences including molecular biology, genetics, and ecology",
    color: "#0D9488", // Teal-600
    facultyCount: 9,
    sessionCount: 58,
    subjects: ["Molecular Biology", "Genetics", "Ecology", "Anatomy"],
    status: "active",
    createdDate: "2024-01-18",
    image: Dna,
    priority: "Medium",
    defaultTimeWeightHours: 4,
  },
];

const priorityOptions: Category["priority"][] = ["High", "Medium", "Low"];
const colorOptions = [
  { name: "Indigo", hex: "#4F46E5" },
  { name: "Green", hex: "#10B981" },
  { name: "Purple", hex: "#9333EA" },
  { name: "Red", hex: "#DC2626" },
  { name: "Orange", hex: "#EA580C" },
];

// Mock Chart Component (To be replaced with a real charting library)
const WorkloadChart: React.FC<{ data: { name: string; effort: number }[] }> = ({
  data,
}) => {
  const totalEffort = data.reduce((sum, item) => sum + item.effort, 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <BarChart className="w-5 h-5 mr-2 text-indigo-600" /> Effort
        Distribution by Category
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Total Estimated Effort: **{totalEffort} hours**
      </p>
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage =
            totalEffort > 0 ? (item.effort / totalEffort) * 100 : 0;
          const barColor = colorOptions[index % colorOptions.length].hex; // Use mock colors for bar

          return (
            <div key={item.name}>
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="font-medium text-gray-700">{item.name}</span>
                <span className="text-gray-600">
                  {item.effort} hrs ({percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%`, backgroundColor: barColor }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [activeTab, setActiveTab] = useState<"management" | "analytics">(
    "management"
  );
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [sortOption, setSortOption] = useState("Sort by Name");
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );

  const getSubjectColor = (index: number) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-orange-100 text-orange-800",
    ];
    return colors[index % colors.length];
  };

  const handleCreateOrUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = editingCategory ? editingCategory.id : categories.length + 1;

    const newCategory: Category = {
      id: id,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      color:
        (formData.get("color") as string) ||
        editingCategory?.color ||
        colorOptions[0].hex,
      priority:
        (formData.get("priority") as Category["priority"]) ||
        editingCategory?.priority ||
        "Medium",
      defaultTimeWeightHours:
        parseInt(formData.get("defaultTimeWeightHours") as string) || 0,

      // Preserve or initialize other fields not in the simple modal form
      facultyCount: editingCategory ? editingCategory.facultyCount : 0,
      sessionCount: editingCategory ? editingCategory.sessionCount : 0,
      subjects: editingCategory ? editingCategory.subjects : [],
      status: editingCategory
        ? editingCategory.status
        : ("active" as "active" | "inactive"),
      createdDate: editingCategory
        ? editingCategory.createdDate
        : new Date().toISOString().slice(0, 10),
      image: editingCategory ? editingCategory.image : FolderOpen,
    };

    if (editingCategory) {
      setCategories(
        categories.map((cat) => (cat.id === newCategory.id ? newCategory : cat))
      );
    } else {
      setCategories([...categories, newCategory]);
    }
    setShowModal(false);
    setEditingCategory(null);
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    setCategoryToDelete(null);
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const getFilteredAndSortedCategories = () => {
    let filtered = categories.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterStatus !== "All Status") {
      filtered = filtered.filter(
        (cat) => cat.status === filterStatus.toLowerCase()
      );
    }

    if (sortOption === "Sort by Name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "Sort by Faculty Count") {
      filtered.sort((a, b) => b.facultyCount - a.facultyCount);
    } else if (sortOption === "Sort by Sessions") {
      filtered.sort((a, b) => b.sessionCount - a.sessionCount);
    } else if (sortOption === "Sort by Priority") {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      filtered.sort(
        (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
      );
    } else if (sortOption === "Sort by Date Created") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
    }

    return filtered;
  };

  const filteredCategories = getFilteredAndSortedCategories();
  const activeCategories = filteredCategories.filter(
    (c) => c.status === "active"
  );
  const inactiveCategories = filteredCategories.filter(
    (c) => c.status === "inactive"
  );

  // ------------------------------------
  // ANALYTICS DATA CALCULATION
  // ------------------------------------
  const analyticsData = activeCategories.map((cat) => ({
    name: cat.name,
    // Effort = Session Count * Time Weight (A proxy for complexity/duration)
    effort: cat.sessionCount * cat.defaultTimeWeightHours,
  }));

  const totalEffort = analyticsData.reduce((sum, item) => sum + item.effort, 0);

  // Animations
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hover: { y: -5, boxShadow: "0px 10px 20px rgba(0,0,0,0.08)" },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header and Tab Navigation */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Category Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Manage subject areas and analyze faculty workload distribution.
          </p>
        </div>
        <motion.button
          onClick={() => {
            setShowModal(true);
            setEditingCategory(null);
          }}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Category
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab("management")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "management"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          } transition-colors duration-200`}
        >
          Category Management
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`px-4 py-2 text-sm font-medium flex items-center ${
            activeTab === "analytics"
              ? "border-b-2 border-indigo-600 text-indigo-600"
              : "text-gray-500 hover:text-gray-700"
          } transition-colors duration-200`}
        >
          <BarChart className="w-4 h-4 mr-1" /> Workload Analytics
        </button>
      </div>

      {/* ------------------------------------ */}
      {/* MANAGEMENT TAB CONTENT */}
      {/* ------------------------------------ */}
      {activeTab === "management" && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 relative overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              {/* ... (Existing Stat Card Content - Total Categories) ... */}
              <div className="flex items-center justify-between z-10 relative">
                <div>
                  <p className="text-sm text-gray-600">Total Categories</p>
                  <p className="text-4xl font-extrabold text-gray-900 mt-1">
                    {categories.length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-7 h-7 text-blue-600" />
                </div>
              </div>
              <div className="absolute inset-0 bg-blue-50/50 -bottom-10 -right-10 rounded-full w-24 h-24 blur-2xl opacity-75" />
            </motion.div>
            <motion.div
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 relative overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              {/* ... (Existing Stat Card Content - Active Categories) ... */}
              <div className="flex items-center justify-between z-10 relative">
                <div>
                  <p className="text-sm text-gray-600">Active Categories</p>
                  <p className="text-4xl font-extrabold text-gray-900 mt-1">
                    {activeCategories.length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-green-600" />
                </div>
              </div>
              <div className="absolute inset-0 bg-green-50/50 -bottom-10 -right-10 rounded-full w-24 h-24 blur-2xl opacity-75" />
            </motion.div>
            <motion.div
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 relative overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              {/* ... (Existing Stat Card Content - Total Faculty) ... */}
              <div className="flex items-center justify-between z-10 relative">
                <div>
                  <p className="text-sm text-gray-600">Total Faculty</p>
                  <p className="text-4xl font-extrabold text-gray-900 mt-1">
                    {categories.reduce((sum, cat) => sum + cat.facultyCount, 0)}
                  </p>
                </div>
                <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="w-7 h-7 text-purple-600" />
                </div>
              </div>
              <div className="absolute inset-0 bg-purple-50/50 -bottom-10 -right-10 rounded-full w-24 h-24 blur-2xl opacity-75" />
            </motion.div>
            <motion.div
              className="bg-white rounded-xl shadow-md border border-gray-200 p-6 relative overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              {/* ... (NEW Stat Card Content - Total Estimated Effort) ... */}
              <div className="flex items-center justify-between z-10 relative">
                <div>
                  <p className="text-sm text-gray-600">
                    Total Est. Effort (hrs)
                  </p>
                  <p className="text-4xl font-extrabold text-gray-900 mt-1">
                    {totalEffort}
                  </p>
                </div>
                <div className="w-14 h-14 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-7 h-7 text-yellow-600" />
                </div>
              </div>
              <div className="absolute inset-0 bg-yellow-50/50 -bottom-10 -right-10 rounded-full w-24 h-24 blur-2xl opacity-75" />
            </motion.div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-6 space-y-4 md:space-y-0">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              >
                <option>Sort by Name</option>
                <option>Sort by Faculty Count</option>
                <option>Sort by Sessions</option>
                <option>Sort by Priority</option> {/* NEW SORT OPTION */}
                <option>Sort by Date Created</option>
              </select>
            </div>
          </div>

          {/* Active Categories List (Enhanced Styling) */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Active Categories ({activeCategories.length})
            </h2>
            {activeCategories.length > 0 ? (
              <div className="space-y-4">
                {activeCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Colored Accent Stripe (Uses inline style for HEX) */}
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-2 transition-all duration-300 group-hover:w-3`}
                      style={{ backgroundColor: category.color }}
                    ></div>

                    <div className="p-4 pl-6 flex justify-between items-center transition-all duration-300 group-hover:shadow-lg">
                      <div className="flex items-center space-x-4 flex-1">
                        {/* Category Icon/Image (Uses inline style for HEX transparency) */}
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0`}
                          style={{
                            backgroundColor: `${category.color}1A` /* 1A is ~10% opacity */,
                          }}
                        >
                          <category.image
                            className={`w-6 h-6`}
                            style={{ color: category.color }}
                          />
                        </div>

                        {/* Main Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 truncate">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {category.description}
                          </p>
                        </div>

                        {/* Stats & Priority */}
                        <div className="hidden sm:flex space-x-6 text-center text-sm ml-4 shrink-0">
                          {/* NEW: Priority Badge */}
                          <div className="flex flex-col items-center">
                            <span
                              className={`font-semibold text-gray-900 flex items-center`}
                            >
                              <Star
                                className={`w-4 h-4 mr-1 ${
                                  category.priority === "High"
                                    ? "text-red-500"
                                    : category.priority === "Medium"
                                    ? "text-yellow-500"
                                    : "text-green-500"
                                }`}
                                fill={
                                  category.priority === "High"
                                    ? "#EF4444"
                                    : category.priority === "Medium"
                                    ? "#F59E0B"
                                    : "#10B981"
                                }
                              />
                              {category.priority}
                            </span>
                            <span className="text-xs text-gray-500">
                              Priority
                            </span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="font-semibold text-gray-900">
                              {category.facultyCount}
                            </span>
                            <span className="text-xs text-gray-500">
                              Faculty
                            </span>
                          </div>
                          <div className="flex flex-col items-center">
                            <span className="font-semibold text-gray-900">
                              {category.sessionCount}
                            </span>
                            <span className="text-xs text-gray-500">
                              Sessions
                            </span>
                          </div>
                        </div>

                        {/* Subjects - Visible on larger screens */}
                        <div className="hidden lg:flex flex-wrap gap-2 ml-4 shrink-0 max-w-sm">
                          {category.subjects
                            .slice(0, 2)
                            .map((subject, index) => (
                              <span
                                key={index}
                                className={`px-3 py-1 text-xs font-medium rounded-full ${getSubjectColor(
                                  index
                                )}`}
                              >
                                {subject}
                              </span>
                            ))}
                          {category.subjects.length > 2 && (
                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                              +{category.subjects.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4 shrink-0">
                        <button
                          onClick={() => handleEditClick(category)}
                          className="p-2 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit Category"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => setCategoryToDelete(category)}
                          className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <MoreHorizontal className="w-5 h-5 text-gray-400 ml-2" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-10">
                No active categories found matching the filters.
              </p>
            )}
          </div>

          {/* Inactive Categories (Simplified for brevity) */}
          {inactiveCategories.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Inactive Categories ({inactiveCategories.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* ... (Inactive category cards go here) ... */}
                {inactiveCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center opacity-70 hover:opacity-100 transition-opacity"
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${category.color}1A` }}
                      >
                        <category.image
                          className="w-4 h-4"
                          style={{ color: category.color }}
                        />
                      </div>
                      <span className="font-medium text-gray-900">
                        {category.name}
                      </span>
                    </div>
                    <button
                      onClick={() => handleEditClick(category)}
                      className="p-1 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Activate/Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* ------------------------------------ */}
      {/* ANALYTICS TAB CONTENT */}
      {/* ------------------------------------ */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Workload Chart (using mock component) */}
            <WorkloadChart data={analyticsData} />
          </div>
          <div className="space-y-6">
            {/* Key Metric Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Key Performance Indicators
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm text-gray-600">
                    Avg. Faculty per Category
                  </span>
                  <span className="text-lg font-bold text-indigo-600">
                    {(
                      categories.reduce(
                        (sum, cat) => sum + cat.facultyCount,
                        0
                      ) / categories.length
                    ).toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Average Session Effort (hrs)
                  </span>
                  <span className="text-lg font-bold text-indigo-600">
                    {(
                      totalEffort /
                      categories.reduce((sum, cat) => sum + cat.sessionCount, 0)
                    ).toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
            {/* Recommendation/Insight Card (Placeholder for SLA or Trend) */}
            <div className="bg-yellow-50 p-6 rounded-xl shadow-md border border-yellow-300">
              <h3 className="text-base font-semibold text-yellow-800 flex items-center mb-2">
                <AlertTriangle className="w-5 h-5 mr-2" /> Action Required
              </h3>
              <p className="text-sm text-yellow-700">
                Physics has a High Session Count (64) but Medium Priority.
                Consider increasing Default Time Weight or faculty count for
                this category to prevent overload.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Create/Edit Category - ENHANCED */}
      <AnimatePresence>
        {(showModal || editingCategory) && (
          <motion.div
            className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowModal(false);
              setEditingCategory(null);
            }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingCategory(null);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {editingCategory ? "Edit Category" : "Create New Category"}
              </h3>
              <form onSubmit={handleCreateOrUpdate} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    placeholder="Enter category name"
                    defaultValue={editingCategory?.name || ""}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                    rows={3}
                    placeholder="Enter category description"
                    defaultValue={editingCategory?.description || ""}
                    required
                  />
                </div>

                {/* NEW ROW FOR PRIORITY AND TIME WEIGHT */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="priority"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Priority Level
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      defaultValue={editingCategory?.priority || "Medium"}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      required
                    >
                      {priorityOptions.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="defaultTimeWeightHours"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Default Effort (Hours/Session)
                    </label>
                    <input
                      type="number"
                      id="defaultTimeWeightHours"
                      name="defaultTimeWeightHours"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                      placeholder="e.g., 4"
                      defaultValue={
                        editingCategory?.defaultTimeWeightHours || 1
                      }
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* NEW ROW FOR COLOR SELECTION */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Color
                  </label>
                  <div className="flex space-x-3">
                    {colorOptions.map((color) => (
                      <label key={color.hex} className="cursor-pointer">
                        <input
                          type="radio"
                          name="color"
                          value={color.hex}
                          defaultChecked={
                            editingCategory?.color === color.hex ||
                            (!editingCategory &&
                              color.hex === colorOptions[0].hex)
                          }
                          className="hidden"
                        />
                        <div
                          className="w-8 h-8 rounded-full border-2 transition-all duration-150 flex items-center justify-center"
                          style={{
                            backgroundColor: color.hex,
                            borderColor:
                              editingCategory?.color === color.hex ||
                              (!editingCategory &&
                                color.hex === colorOptions[0].hex)
                                ? "#3730A3"
                                : "transparent", // Darker border for selected
                            transform:
                              editingCategory?.color === color.hex ||
                              (!editingCategory &&
                                color.hex === colorOptions[0].hex)
                                ? "scale(1.1)"
                                : "scale(1)",
                          }}
                        ></div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingCategory(null);
                    }}
                    className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                  >
                    {editingCategory ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal for Deletion (Existing, no changes needed) */}
      <AnimatePresence>
        {categoryToDelete && (
          <motion.div
            className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCategoryToDelete(null)}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 relative text-center"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex justify-center mb-4">
                <AlertTriangle className="w-12 h-12 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Confirm Deletion
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete the category "
                <span className="font-medium text-gray-900">
                  {categoryToDelete.name}
                </span>
                "? This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  type="button"
                  onClick={() => setCategoryToDelete(null)}
                  className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(categoryToDelete.id)}
                  className="px-5 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoriesPage;
