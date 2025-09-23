import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Star,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MoreHorizontal,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";

// Placeholder functions for your navigation and data handlers
const handleAddFaculty = () => console.log("Navigating to Add Faculty form...");
const handleEditFaculty = (id) =>
  console.log(`Editing faculty member with ID: ${id}`);
const handleDeleteFaculty = (id) =>
  console.log(`Deleting faculty member with ID: ${id}`);
const handleViewFacultyProfile = (id) =>
  console.log(`Navigating to profile for faculty ID: ${id}`);
const handleMoreOptions = (id) =>
  console.log(`Showing more options for faculty ID: ${id}`);

const FacultyPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");

  const facultyMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Professor",
      email: "sarah.johnson@university.edu",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      joinDate: "Joined 2018-08-15",
      status: "active",
      subjects: ["Advanced Calculus", "Linear Algebra", "Statistics"],
      sessions: 45,
      rating: 4.8,
      initials: "SJ",
      color: "bg-blue-600",
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      title: "Associate Professor",
      email: "michael.chen@university.edu",
      phone: "+1 (555) 234-5678",
      location: "Boston, MA",
      joinDate: "Joined 2020-01-10",
      status: "active",
      subjects: ["Quantum Physics", "Thermodynamics"],
      sessions: 32,
      rating: 4.6,
      initials: "MC",
      color: "bg-green-600",
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      title: "Assistant Professor",
      email: "emily.davis@university.edu",
      phone: "+1 (555) 345-6789",
      location: "San Francisco, CA",
      joinDate: "Joined 2021-09-01",
      status: "active",
      subjects: ["Data Structures", "Algorithms", "Machine Learning"],
      sessions: 28,
      rating: 4.9,
      initials: "ED",
      color: "bg-purple-600",
    },
    {
      id: 4,
      name: "Dr. Robert Wilson",
      title: "Professor",
      email: "robert.wilson@university.edu",
      phone: "+1 (555) 456-7890",
      location: "Chicago, IL",
      joinDate: "Joined 2017-03-20",
      status: "inactive",
      subjects: ["Organic Chemistry", "Biochemistry"],
      sessions: 52,
      rating: 4.7,
      initials: "RW",
      color: "bg-indigo-600",
    },
  ];

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      "Advanced Calculus": "bg-blue-100 text-blue-800",
      "Linear Algebra": "bg-blue-100 text-blue-800",
      Statistics: "bg-blue-100 text-blue-800",
      "Quantum Physics": "bg-green-100 text-green-800",
      Thermodynamics: "bg-green-100 text-green-800",
      "Data Structures": "bg-purple-100 text-purple-800",
      Algorithms: "bg-purple-100 text-purple-800",
      "Machine Learning": "bg-purple-100 text-purple-800",
      "Organic Chemistry": "bg-orange-100 text-orange-800",
      Biochemistry: "bg-orange-100 text-orange-800",
    };
    return colors[subject] || "bg-gray-100 text-gray-800";
  };

  const filteredFaculty = facultyMembers.filter((faculty) => {
    const matchesSearch =
      faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.subjects.some((subject) =>
        subject.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesDepartment =
      selectedDepartment === "All Departments" ||
      faculty.subjects.some((subject) => subject === selectedDepartment);

    return matchesSearch && matchesDepartment;
  });

  const activeFaculty = filteredFaculty.filter((f) => f.status === "active");
  const inactiveFaculty = filteredFaculty.filter(
    (f) => f.status === "inactive"
  );

  return (
    <div className="p-6 max-w-7xl mx-auto font-sans bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Faculty Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage faculty members, their profiles, and subject assignments.
          </p>
        </div>
        <motion.button
          onClick={handleAddFaculty}
          className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Faculty
        </motion.button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search faculty by name, email, or subject..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div>
          <select
            className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all w-full md:w-auto"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option>All Departments</option>
            <option>Mathematics</option>
            <option>Physics</option>
            <option>Computer Science</option>
            <option>Chemistry</option>
            <option>English</option>
          </select>
        </div>
      </div>

      {/* Active Faculty */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Active Faculty ({activeFaculty.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeFaculty.map((faculty) => (
            <motion.div
              key={faculty.id}
              className="bg-white rounded-xl shadow-md border p-6 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleViewFacultyProfile(faculty.id)}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-14 h-14 ${faculty.color} rounded-full flex items-center justify-center flex-shrink-0`}
                  >
                    <span className="text-white text-lg font-bold">
                      {faculty.initials}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                      {faculty.name}
                    </h3>
                    <p className="text-sm text-gray-600">{faculty.title}</p>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <span className="bg-green-100 text-green-800 px-3 py-1 text-xs font-semibold rounded-full">
                    Active
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-gray-600 mb-5">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  {faculty.email}
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  {faculty.phone}
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  {faculty.location}
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  {faculty.joinDate}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Subjects
                </p>
                <div className="flex flex-wrap gap-2">
                  {faculty.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getSubjectColor(
                        subject
                      )}`}
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-900">
                      {faculty.sessions}
                    </div>
                    <div className="text-xs text-gray-500">Sessions</div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-900 ml-1">
                      {faculty.rating}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditFaculty(faculty.id);
                    }}
                    className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Edit className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFaculty(faculty.id);
                    }}
                    className="p-2 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100 transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Inactive Faculty */}
      {inactiveFaculty.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Inactive Faculty ({inactiveFaculty.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inactiveFaculty.map((faculty) => (
              <motion.div
                key={faculty.id}
                className="bg-white rounded-xl shadow-md border p-6 flex flex-col justify-between opacity-70 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                onClick={() => handleViewFacultyProfile(faculty.id)}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-14 h-14 ${faculty.color} rounded-full flex items-center justify-center flex-shrink-0 opacity-75`}
                    >
                      <span className="text-white text-lg font-bold">
                        {faculty.initials}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 leading-tight">
                        {faculty.name}
                      </h3>
                      <p className="text-sm text-gray-500">{faculty.title}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 text-xs font-semibold rounded-full">
                      Inactive
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-gray-500 mb-5">
                  <div className="flex items-center text-sm">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    {faculty.email}
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    {faculty.phone}
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {faculty.location}
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {faculty.joinDate}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-600 mb-2">
                    Subjects
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {faculty.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm font-bold text-gray-700">
                        {faculty.sessions}
                      </div>
                      <div className="text-xs text-gray-400">Sessions</div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-gray-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-700 ml-1">
                        {faculty.rating}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditFaculty(faculty.id);
                      }}
                      className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Edit className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteFaculty(faculty.id);
                      }}
                      className="p-2 rounded-full text-red-400 hover:text-red-600 hover:bg-red-100 transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyPage;
