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
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Category type definition
type Category = {
  id: number;
  name: string;
  description: string;
  color: string;
  facultyCount: number;
  sessionCount: number;
  subjects: string[];
  status: "active" | "inactive";
  createdDate: string;
  // React.ElementType is the correct type for a component (like a Lucide icon)
  image: React.ElementType;
};

const initialCategories: Category[] = [
  {
    id: 1,
    name: "Mathematics",
    description:
      "Advanced mathematical concepts including calculus, algebra, and statistics",
    color: "bg-blue-600",
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
  },
  {
    id: 2,
    name: "Physics",
    description:
      "Theoretical and applied physics covering mechanics, thermodynamics, and quantum physics",
    color: "bg-green-600",
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
  },
  {
    id: 3,
    name: "Computer Science",
    description:
      "Programming, algorithms, data structures, and software engineering principles",
    color: "bg-purple-600",
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
  },
  {
    id: 4,
    name: "Chemistry",
    description:
      "Organic, inorganic, and biochemistry with laboratory components",
    color: "bg-orange-600",
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
  },
  {
    id: 5,
    name: "English Literature",
    description: "Classic and modern literature analysis and creative writing",
    color: "bg-red-600",
    facultyCount: 6,
    sessionCount: 45,
    subjects: [
      "Classical Literature",
      "Modern Poetry",
      "Creative Writing",
      "Linguistics",
    ],
    status: "inactive",
    createdDate: "2024-01-05",
    image: Globe,
  },
  {
    id: 6,
    name: "Biology",
    description:
      "Life sciences including molecular biology, genetics, and ecology",
    color: "bg-teal-600",
    facultyCount: 9,
    sessionCount: 58,
    subjects: ["Molecular Biology", "Genetics", "Ecology", "Anatomy"],
    status: "active",
    createdDate: "2024-01-18",
    image: Dna,
  },
];

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
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

    // **FIX APPLIED HERE:** Ensure that all non-form fields (especially 'image')
    // are correctly carried over or initialized to prevent 'undefined' in render.
    const newCategory: Category = {
      id: editingCategory ? editingCategory.id : categories.length + 1,
      name: formData.get("name") as string,
      description: formData.get("description") as string,

      // Preserve existing data for fields not in the simple modal form
      color: editingCategory ? editingCategory.color : "bg-blue-600",
      facultyCount: editingCategory ? editingCategory.facultyCount : 0,
      sessionCount: editingCategory ? editingCategory.sessionCount : 0,
      subjects: editingCategory ? editingCategory.subjects : [],
      status: editingCategory
        ? editingCategory.status
        : ("active" as "active" | "inactive"),
      createdDate: editingCategory
        ? editingCategory.createdDate
        : new Date().toISOString().slice(0, 10),
      // Crucial: Use the existing icon or the default FolderOpen icon
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
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">
            Organize sessions by subject areas and departments
          </p>
        </div>
        <motion.button
          onClick={() => {
            setShowModal(true);
            setEditingCategory(null); // Ensure no category is being edited when clicking Create
          }}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Category
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          className="bg-white rounded-xl shadow-md border border-gray-200 p-6 relative overflow-hidden"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
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
          <div className="flex items-center justify-between z-10 relative">
            <div>
              <p className="text-sm text-gray-600">Total Sessions</p>
              <p className="text-4xl font-extrabold text-gray-900 mt-1">
                {categories.reduce((sum, cat) => sum + cat.sessionCount, 0)}
              </p>
            </div>
            <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-7 h-7 text-orange-600" />
            </div>
          </div>
          <div className="absolute inset-0 bg-orange-50/50 -bottom-10 -right-10 rounded-full w-24 h-24 blur-2xl opacity-75" />
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
            <option>Sort by Date Created</option>
          </select>
        </div>
      </div>

      {/* Active Categories - NEW STYLE */}
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
                {/* Colored Accent Stripe */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-2 ${category.color} transition-all duration-300 group-hover:w-3`}
                ></div>

                <div className="p-4 pl-6 flex justify-between items-center transition-all duration-300 group-hover:shadow-lg">
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Category Icon/Image */}
                    <div
                      className={`w-12 h-12 ${category.color} bg-opacity-10 rounded-lg flex items-center justify-center shrink-0`}
                    >
                      {/* Using category.image is safe now as it's guaranteed to be a component */}
                      <category.image
                        className={`w-6 h-6 ${category.color.replace(
                          "bg-",
                          "text-"
                        )}`}
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

                    {/* Stats */}
                    <div className="hidden sm:flex space-x-6 text-center text-sm ml-4 shrink-0">
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-gray-900">
                          {category.facultyCount}
                        </span>
                        <span className="text-xs text-gray-500">Faculty</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-gray-900">
                          {category.sessionCount}
                        </span>
                        <span className="text-xs text-gray-500">Sessions</span>
                      </div>
                    </div>

                    {/* Subjects - Visible on larger screens */}
                    <div className="hidden lg:flex flex-wrap gap-2 ml-4 shrink-0 max-w-sm">
                      {category.subjects.slice(0, 2).map((subject, index) => (
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

      {/* Inactive Categories - Original Card Style Maintained with Opacity */}
      {inactiveCategories.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Inactive Categories ({inactiveCategories.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inactiveCategories.map((category) => (
              <motion.div
                key={category.id}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 flex flex-col justify-between opacity-60 hover:opacity-100 transition-opacity duration-300"
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover="hover"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-14 h-14 ${category.color} rounded-lg flex items-center justify-center`}
                    >
                      <category.image className="w-7 h-7 text-white" />{" "}
                      {/* Use specific icon */}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {category.name}
                      </h3>
                      <span className="bg-gray-200 text-gray-800 px-2 py-0.5 text-xs font-medium rounded-full mt-1 inline-block">
                        {category.status}
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {category.description}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {category.facultyCount}
                    </div>
                    <div className="text-xs text-gray-500">Faculty</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900">
                      {category.sessionCount}
                    </div>
                    <div className="text-xs text-gray-500">Sessions</div>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Subjects:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.subjects.slice(0, 3).map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600"
                      >
                        {subject}
                      </span>
                    ))}
                    {category.subjects.length > 3 && (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                        +{category.subjects.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                  <div className="text-xs text-gray-500">
                    Created: {category.createdDate}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditClick(category)}
                      className="p-2 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Edit Category"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setCategoryToDelete(category)}
                      className="p-2 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete Category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Create/Edit Category */}
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

      {/* Confirmation Modal for Deletion */}
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
