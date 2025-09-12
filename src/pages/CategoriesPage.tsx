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
} from "lucide-react";

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
};

const CategoriesPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const categories: Category[] = [
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
    },
    {
      id: 5,
      name: "English Literature",
      description:
        "Classic and modern literature analysis and creative writing",
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
    },
  ];

  const activeCategories = categories.filter((c) => c.status === "active");
  const inactiveCategories = categories.filter((c) => c.status === "inactive");

  const getSubjectColor = (index: number) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-orange-100 text-orange-800",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">
            Organize sessions by subject areas and departments
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Category
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Categories</p>
              <p className="text-2xl font-bold text-gray-900">
                {activeCategories.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Faculty</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.reduce((sum, cat) => sum + cat.facultyCount, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Sessions</p>
              <p className="text-2xl font-bold text-gray-900">
                {categories.reduce((sum, cat) => sum + cat.sessionCount, 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search categories..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="ml-4 flex space-x-3">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            <option>Sort by Name</option>
            <option>Sort by Faculty Count</option>
            <option>Sort by Sessions</option>
            <option>Sort by Date Created</option>
          </select>
        </div>
      </div>

      {/* Active Categories */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Active Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}
                  >
                    <FolderOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {category.name}
                    </h3>
                    <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-medium rounded-full">
                      {category.status}
                    </span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {category.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {category.facultyCount}
                  </div>
                  <div className="text-xs text-gray-500">Faculty</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900">
                    {category.sessionCount}
                  </div>
                  <div className="text-xs text-gray-500">Sessions</div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Subjects:
                </p>
                <div className="flex flex-wrap gap-1">
                  {category.subjects.slice(0, 3).map((subject, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs font-medium rounded ${getSubjectColor(
                        index
                      )}`}
                    >
                      {subject}
                    </span>
                  ))}
                  {category.subjects.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-600">
                      +{category.subjects.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  Created {category.createdDate}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inactive Categories */}
      {inactiveCategories.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Inactive Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inactiveCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-sm border p-6 opacity-75"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center opacity-75`}
                    >
                      <FolderOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">
                        {category.name}
                      </h3>
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 text-xs font-medium rounded-full">
                        {category.status}
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {category.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-700">
                      {category.facultyCount}
                    </div>
                    <div className="text-xs text-gray-400">Faculty</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-700">
                      {category.sessionCount}
                    </div>
                    <div className="text-xs text-gray-400">Sessions</div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Subjects:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {category.subjects.slice(0, 3).map((subject, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-600"
                      >
                        {subject}
                      </span>
                    ))}
                    {category.subjects.length > 3 && (
                      <span className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-600">
                        +{category.subjects.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-400">
                    Created {category.createdDate}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Create/Edit Category */}
      {(showModal || editingCategory) && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => {
                setShowModal(false);
                setEditingCategory(null);
              }}
            ></div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  {editingCategory ? "Edit Category" : "Create New Category"}
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category Name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter category name"
                      defaultValue={editingCategory?.name || ""}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      rows={3}
                      placeholder="Enter category description"
                      defaultValue={editingCategory?.description || ""}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color Theme
                    </label>
                    <div className="flex space-x-2">
                      {[
                        "bg-blue-600",
                        "bg-green-600",
                        "bg-purple-600",
                        "bg-orange-600",
                        "bg-red-600",
                        "bg-teal-600",
                      ].map((color, index) => (
                        <button
                          key={index}
                          className={`w-8 h-8 ${color} rounded-full hover:scale-110 transition-transform`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCategory(null);
                  }}
                >
                  {editingCategory ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCategory(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
