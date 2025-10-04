import React, { useState, useMemo } from "react";
import {
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Clock,
  Calendar,
  Filter,
  Globe,
  CheckCircle,
  XCircle,
} from "lucide-react";

// --- Data Structures (Same as yours, included for context) ---
interface Contact {
  id: number;
  name: string;
  title: string;
  department: string;
  role: "Faculty" | "Admin" | "Staff";
  email: string;
  phoneExtension: string;
  officeLocation: string;
  researchInterests: string[];
  isAvailable: boolean;
  officeHours?: string;
}

// --- Dummy Data (Indian Faculty/Staff - Same as yours, truncated for brevity) ---
const allContacts: Contact[] = [
  {
    id: 101,
    name: "Dr. Sanjay Verma",
    title: "Professor & Head of Department (HOD)",
    department: "Computer Science",
    role: "Faculty",
    email: "sanjay.verma@uni.edu",
    phoneExtension: "401",
    officeLocation: "CS Block, Room 305",
    researchInterests: ["AI Ethics", "Distributed Systems", "Cloud Security"],
    isAvailable: true,
    officeHours: "Mon: 10:00 AM - 12:00 PM",
  },
  {
    id: 102,
    name: "Prof. (Dr.) Apoorva Deshmukh",
    title: "Associate Professor",
    department: "Electrical Engineering",
    role: "Faculty",
    email: "a.deshmukh@uni.edu",
    phoneExtension: "522",
    officeLocation: "EE Lab, Annex 10",
    researchInterests: ["VLSI Design", "Renewable Energy", "Power Electronics"],
    isAvailable: true,
    officeHours: "Tues/Thurs: 2:00 PM - 3:30 PM",
  },
  {
    id: 103,
    name: "Smt. Leena Nair",
    title: "Academic Administrator",
    department: "Registrar's Office",
    role: "Admin",
    email: "leena.nair@uni.edu",
    phoneExtension: "105",
    officeLocation: "Main Admin Building, Ground Flr",
    researchInterests: [],
    isAvailable: true,
    officeHours: "Mon-Fri: 9:00 AM - 5:00 PM",
  },
  {
    id: 104,
    name: "Mr. Rohan Singh",
    title: "Lecturer",
    department: "Mathematics",
    role: "Faculty",
    email: "r.singh@uni.edu",
    phoneExtension: "612",
    officeLocation: "New Block, Room 201",
    researchInterests: ["Applied Statistics", "Numerical Methods"],
    isAvailable: false,
    officeHours: "No office hours scheduled this week.",
  },
  {
    id: 105,
    name: "Dr. Priya Patel",
    title: "Assistant Professor",
    department: "Mechanical Engineering",
    role: "Faculty",
    email: "p.patel@uni.edu",
    phoneExtension: "703",
    officeLocation: "Workshop Block A",
    researchInterests: ["Thermodynamics", "Materials Science"],
    isAvailable: true,
    officeHours: "Wed: 11:00 AM - 1:00 PM",
  },
  {
    id: 106,
    name: "Shri. Dev Sharma",
    title: "IT Support Head",
    department: "Information Technology",
    role: "Staff",
    email: "dev.sharma@uni.edu",
    phoneExtension: "900",
    officeLocation: "Central IT Office",
    researchInterests: [],
    isAvailable: true,
    officeHours: "Mon-Fri: 9:00 AM - 6:00 PM",
  },
];

const uniqueDepartments = Array.from(
  new Set(allContacts.map((c) => c.department))
).sort();
const uniqueRoles = Array.from(new Set(allContacts.map((c) => c.role))).sort();

// --- Helper Components ---

// Basic Avatar component for display
const ContactAvatar: React.FC<{ name: string }> = ({ name }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const bgColor = "bg-indigo-600";
  return (
    <div
      className={`h-14 w-14 rounded-full flex items-center justify-center font-bold text-white text-xl ${bgColor} flex-shrink-0 border-2 border-white ring-2 ring-indigo-300`}
    >
      {initials}
    </div>
  );
};

// The Contact Card component (UI Enhancement)
const ContactCard: React.FC<{ contact: Contact }> = ({ contact }) => {
  // Determine the current availability status
  const isCurrentlyAvailable =
    contact.isAvailable &&
    contact.officeHours &&
    contact.officeHours.includes(
      new Date().toLocaleDateString("en-US", { weekday: "short" })
    );

  return (
    <div className="bg-white rounded-xl shadow-xl border-l-4 border-indigo-500 p-6 flex flex-col transition-all duration-300 hover:shadow-2xl hover:bg-indigo-50">
      <div className="flex items-center pb-4 mb-4">
        <ContactAvatar name={contact.name} />
        <div className="ml-4 flex-1">
          <h3 className="text-2xl font-extrabold text-gray-900">
            {contact.name}
          </h3>
          <p className="text-sm text-indigo-700 font-medium flex items-center mt-1">
            <Briefcase className="h-4 w-4 mr-1" />
            {contact.title}
          </p>
        </div>
      </div>

      {/* Availability and Department Tags */}
      <div className="flex justify-between items-center text-xs mb-4">
        <span className="px-3 py-1 rounded-full font-semibold text-gray-700 bg-gray-200">
          {contact.department}
        </span>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full font-bold ${
            contact.isAvailable
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {contact.isAvailable ? (
            <>
              <CheckCircle className="h-4 w-4 mr-1" /> Available for Queries
            </>
          ) : (
            <>
              <XCircle className="h-4 w-4 mr-1" /> Currently Unavailable
            </>
          )}
        </span>
      </div>

      {/* Core Contact Details */}
      <div className="space-y-2 text-sm text-gray-700 border-t pt-4">
        <p className="flex items-center">
          <Mail className="h-4 w-4 mr-2 text-blue-500" />
          <a
            href={`mailto:${contact.email}`}
            className="text-blue-600 hover:text-blue-800 transition"
          >
            {contact.email}
          </a>
        </p>
        <p className="flex items-center">
          <Phone className="h-4 w-4 mr-2 text-green-500" />
          <span className="font-semibold">
            Internal Extension: {contact.phoneExtension}
          </span>
        </p>
        <p className="flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-red-500" />
          {contact.officeLocation}
        </p>
        {contact.officeHours && (
          <p
            className={`flex items-center pt-2 ${
              isCurrentlyAvailable ? "text-yellow-700" : "text-gray-500"
            }`}
          >
            <Clock className="h-4 w-4 mr-2" />
            Office Hours:{" "}
            <span className="font-medium ml-1">{contact.officeHours}</span>
          </p>
        )}
      </div>

      {/* Action Buttons and Research Tags */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          <button
            className="flex items-center px-4 py-2 text-xs font-medium text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition"
            onClick={() =>
              alert(
                `Scheduling a meeting with ${contact.name} via University Calendar...`
              )
            }
          >
            <Calendar className="h-4 w-4 mr-1" /> Book Meeting
          </button>
          {/* NEW: View on Campus Map Feature */}
          <button
            className="flex items-center px-4 py-2 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-lg shadow-md hover:bg-indigo-200 transition"
            onClick={() =>
              alert(`Showing ${contact.officeLocation} on Campus Map...`)
            }
          >
            <Globe className="h-4 w-4 mr-1" /> View on Map
          </button>
        </div>
      </div>

      {/* Research Interests Tags (Better Visual Separation) */}
      {contact.researchInterests.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-500 mb-2">
            Research Focus:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {contact.researchInterests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Main Contact Page Component ---
const ContactPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDepartment, setActiveDepartment] = useState("All");
  const [activeRole, setActiveRole] = useState("All");
  const [showFacultyOnly, setShowFacultyOnly] = useState(false);

  // Filter and Search Logic (useMemo remains for performance)
  const filteredContacts = useMemo(() => {
    let list = allContacts;

    if (activeDepartment !== "All") {
      list = list.filter((c) => c.department === activeDepartment);
    }
    if (activeRole !== "All") {
      list = list.filter((c) => c.role === activeRole);
    }
    if (showFacultyOnly) {
      list = list.filter((c) => c.role === "Faculty");
    }

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(lowerSearch) ||
          c.title.toLowerCase().includes(lowerSearch) ||
          c.department.toLowerCase().includes(lowerSearch) ||
          c.researchInterests.some((interest) =>
            interest.toLowerCase().includes(lowerSearch)
          )
      );
    }

    return list;
  }, [searchTerm, activeDepartment, activeRole, showFacultyOnly]);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto font-sans bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-8 p-6 bg-white rounded-xl shadow-lg border-b-4 border-indigo-600">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
          <Users className="h-8 w-8 mr-4 text-indigo-600" />
          University Directory: Connect with Staff 🤝
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Find contact information, availability, and research focus for all
          academic and administrative personnel.
        </p>
      </header>

      {/* Search and Filters Block */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Search className="h-5 w-5 mr-2 text-indigo-600" /> Quick Search &
          Filter
        </h3>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Name, Title, Department, or Research Interest..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-base shadow-sm transition"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-t pt-4">
          {/* Department Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              value={activeDepartment}
              onChange={(e) => setActiveDepartment(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
            >
              <option value="All">All Departments</option>
              {uniqueDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Role Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role Type
            </label>
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value)}
              className="w-full border-gray-300 rounded-lg shadow-sm p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
            >
              <option value="All">All Roles</option>
              {uniqueRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Toggle Filter */}
          <div className="flex items-end justify-start sm:justify-end">
            <button
              onClick={() => setShowFacultyOnly(!showFacultyOnly)}
              className={`flex items-center px-4 py-3 rounded-lg font-semibold transition-all shadow-md w-full sm:w-auto ${
                showFacultyOnly
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-white text-indigo-600 border border-indigo-300 hover:bg-indigo-50"
              }`}
            >
              <Filter className="h-5 w-5 mr-2" />
              {showFacultyOnly ? "Showing Faculty Only" : "Show Faculty Only"}
            </button>
          </div>
        </div>
      </div>

      {/* Results Display */}
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        Directory Results ({filteredContacts.length})
      </h2>

      {filteredContacts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredContacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      ) : (
        <div className="p-16 text-center bg-white rounded-xl shadow-lg text-gray-500 border-2 border-dashed border-gray-300">
          <Search className="h-12 w-12 mx-auto mb-4 text-indigo-400" />
          <p className="font-bold text-xl text-gray-800">
            No matching contacts found.
          </p>
          <p className="text-md mt-2">
            Your current filters are too restrictive. Please try a different
            search term or select "All" for departments and roles.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
