import React from "react";
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
} from "lucide-react";

const FacultyPage = () => {
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

  const activeFaculty = facultyMembers.filter((f) => f.status === "active");
  const inactiveFaculty = facultyMembers.filter((f) => f.status === "inactive");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Faculty Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage faculty members, their profiles, and subject assignments
          </p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Faculty
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search faculty by name, email, or department..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="ml-4">
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            <option>All Departments</option>
            <option>Mathematics</option>
            <option>Physics</option>
            <option>Computer Science</option>
            <option>Chemistry</option>
          </select>
        </div>
      </div>

      {/* Active Faculty */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Active Faculty
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeFaculty.map((faculty) => (
            <div
              key={faculty.id}
              className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 ${faculty.color} rounded-full flex items-center justify-center`}
                  >
                    <span className="text-white font-medium">
                      {faculty.initials}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {faculty.name}
                    </h3>
                    <p className="text-sm text-gray-600">{faculty.title}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-medium rounded-full">
                    active
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {faculty.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {faculty.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {faculty.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {faculty.joinDate}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Subjects:
                </p>
                <div className="flex flex-wrap gap-1">
                  {faculty.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs font-medium rounded ${getSubjectColor(
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
                    <div className="text-sm font-semibold text-gray-900">
                      {faculty.sessions}
                    </div>
                    <div className="text-xs text-gray-500">Sessions</div>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-900 ml-1">
                      {faculty.rating}
                    </span>
                  </div>
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

      {/* Inactive Faculty */}
      {inactiveFaculty.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Inactive Faculty
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inactiveFaculty.map((faculty) => (
              <div
                key={faculty.id}
                className="bg-white rounded-lg shadow-sm border p-6 opacity-75"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 ${faculty.color} rounded-full flex items-center justify-center opacity-75`}
                    >
                      <span className="text-white font-medium">
                        {faculty.initials}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">
                        {faculty.name}
                      </h3>
                      <p className="text-sm text-gray-500">{faculty.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 text-xs font-medium rounded-full">
                      inactive
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="w-4 h-4 mr-2" />
                    {faculty.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="w-4 h-4 mr-2" />
                    {faculty.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    {faculty.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    {faculty.joinDate}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Subjects:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {faculty.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-600"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-gray-700">
                        {faculty.sessions}
                      </div>
                      <div className="text-xs text-gray-400">Sessions</div>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-gray-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700 ml-1">
                        {faculty.rating}
                      </span>
                    </div>
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
    </div>
  );
};

export default FacultyPage;
