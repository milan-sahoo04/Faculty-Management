import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Briefcase,
  Calendar,
  MapPin,
  Edit,
  Save,
  Clock,
  Phone,
  BookOpen,
  GraduationCap,
  Link,
  Heart,
  BarChart,
  Download,
  Users,
  Zap,
  Lock,
  FileText,
  ArrowLeftRight,
} from "lucide-react";

// --- Local Storage Initialization and Data Types ---

interface ProfileData {
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  office: string;
  officeHours: string;
  bio: string;
  imageUrl: string;

  // Academic Data
  researchInterests: string[];
  publications: { id: number; title: string; journal: string; year: number }[];
  externalLinks: { label: string; url: string }[];

  // Private Data
  emergencyContact: { name: string; relationship: string; phone: string };
  personalAddress: string;

  // Activity Stats (Simulated)
  totalStudents: number;
  avgCourseRating: number;
  assignmentsGraded: number;
}

const defaultProfile: ProfileData = {
  name: "Dr. Anya Sharma",
  role: "Associate Professor",
  department: "Computer Science",
  email: "a.sharma@uni.edu",
  phone: "+1 (555) 987-6543",
  office: "ENG-304",
  officeHours: "Tues/Thurs: 2:00 PM - 4:00 PM",
  bio: "Specializing in Artificial Intelligence and Machine Learning. Dedicated to fostering critical thinking and hands-on experience in students.",
  imageUrl:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Mock photo

  researchInterests: [
    "Artificial Intelligence",
    "Neural Networks",
    "Ethics in Tech",
  ],
  publications: [
    {
      id: 1,
      title: "Ethics in Autonomous Systems",
      journal: "Tech Journal",
      year: 2024,
    },
    {
      id: 2,
      title: "Deep Learning for Beginners",
      journal: "Journal of AI Education",
      year: 2023,
    },
  ],
  externalLinks: [
    { label: "LinkedIn", url: "https://linkedin.com/dranya" },
    { label: "ResearchGate", url: "https://researchgate.net/dranya" },
  ],

  emergencyContact: {
    name: "Raj Sharma",
    relationship: "Husband",
    phone: "+1 (555) 111-2222",
  },
  personalAddress: "123 University Ave, Campus Town, CA 90210",

  totalStudents: 145,
  avgCourseRating: 4.6,
  assignmentsGraded: 98,
};

const getInitialProfile = (): ProfileData => {
  const stored = localStorage.getItem("facultyProfile");
  if (stored) return JSON.parse(stored);
  return defaultProfile;
};

// --- Helper Components ---

// Data Display Block
const DetailBlock: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
}> = ({ icon, label, value }) => (
  <div className="flex flex-col border-l-4 border-indigo-100 pl-4 py-2">
    <span className="text-sm font-medium text-gray-500 flex items-center">
      {icon}
      {label}
    </span>
    <span className="text-gray-800 font-semibold mt-1">{value}</span>
  </div>
);

// --- Main Profile Page Component ---

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData>(getInitialProfile);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false); // State for Private Info access

  // Function to handle saving/editing mode
  const handleSave = () => {
    if (isEditing) {
      localStorage.setItem("facultyProfile", JSON.stringify(profile));
      alert("✅ Profile changes saved successfully!");
    }
    setIsEditing(!isEditing);
  };

  // Simulate password check for private info access
  const handleAccessPrivate = () => {
    if (!passwordRequired) {
      const password = prompt(
        "Enter portal password to view sensitive information:"
      );
      if (password === "demo123") {
        // Mock check
        setPasswordRequired(true);
      } else {
        alert("❌ Incorrect password. Access denied.");
      }
    }
  };

  // Function to update any field in the profile state
  const handleFieldChange = (field: keyof ProfileData, value: any) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  // --- Tab Content Renderers ---

  const OverviewTab: React.FC = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Basic & Contact Information
      </h3>
      <div className="grid sm:grid-cols-2 gap-6">
        <DetailBlock
          icon={<Mail className="h-4 w-4 mr-1 text-gray-400" />}
          label="Official Email"
          value={
            <span className="bg-gray-50 p-1 rounded font-normal">
              {profile.email}
            </span>
          }
        />
        <DetailBlock
          icon={<Phone className="h-4 w-4 mr-1 text-gray-400" />}
          label="Office Phone"
          value={
            isEditing ? (
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => handleFieldChange("phone", e.target.value)}
                className="w-full border-gray-300 rounded p-1 text-base"
              />
            ) : (
              profile.phone
            )
          }
        />
        <DetailBlock
          icon={<MapPin className="h-4 w-4 mr-1 text-gray-400" />}
          label="Office Location"
          value={
            isEditing ? (
              <input
                type="text"
                value={profile.office}
                onChange={(e) => handleFieldChange("office", e.target.value)}
                className="w-full border-gray-300 rounded p-1 text-base"
              />
            ) : (
              profile.office
            )
          }
        />
        <DetailBlock
          icon={<Clock className="h-4 w-4 mr-1 text-gray-400" />}
          label="Office Hours"
          value={
            isEditing ? (
              <input
                type="text"
                value={profile.officeHours}
                onChange={(e) =>
                  handleFieldChange("officeHours", e.target.value)
                }
                className="w-full border-gray-300 rounded p-1 text-base"
              />
            ) : (
              profile.officeHours
            )
          }
        />
      </div>

      <h3 className="text-xl font-semibold text-gray-800 pt-4 mb-4 border-b pb-2">
        Professional Bio
      </h3>
      {isEditing ? (
        <textarea
          value={profile.bio}
          onChange={(e) => handleFieldChange("bio", e.target.value)}
          className="w-full border-gray-300 rounded-lg p-3"
          rows={5}
        />
      ) : (
        <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
      )}

      <h3 className="text-xl font-semibold text-gray-800 pt-4 mb-4 border-b pb-2">
        Current Courses
      </h3>
      <div className="space-y-2">
        <p className="flex items-center text-indigo-700 font-medium">
          <BookOpen className="h-5 w-5 mr-2 text-indigo-500" /> CS 401: Advanced
          AI (Fall 2025)
        </p>
        <p className="flex items-center text-indigo-700 font-medium">
          <BookOpen className="h-5 w-5 mr-2 text-indigo-500" /> CS 101: Intro to
          Programming (Fall 2025)
        </p>
        <p className="text-sm text-gray-500 ml-7">
          3 Active Courses this term.{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Go to Course Management
          </a>
        </p>
      </div>
    </div>
  );

  const ResearchTab: React.FC = () => (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Research & Interests
      </h3>
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          Research Interests (Tags)
        </p>
        <div className="flex flex-wrap gap-2">
          {profile.researchInterests.map((interest, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800"
            >
              {interest}
            </span>
          ))}
          {isEditing && (
            <button className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
              <PlusCircle className="h-4 w-4 mr-1" /> Add Interest
            </button>
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Publications & Honors
      </h3>
      <ul className="space-y-3">
        {profile.publications.map((pub) => (
          <li key={pub.id} className="p-3 bg-gray-50 rounded-lg border">
            <p className="font-semibold text-gray-800">{pub.title}</p>
            <p className="text-sm text-gray-600 italic">
              {pub.journal} ({pub.year})
            </p>
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-semibold text-gray-800 pt-4 mb-4 border-b pb-2">
        External Profiles
      </h3>
      <div className="space-y-2">
        {profile.externalLinks.map((link) => (
          <p key={link.label} className="flex items-center text-gray-700">
            <Link className="h-4 w-4 mr-2 text-gray-500" />
            <span className="font-medium mr-2">{link.label}:</span>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              {link.url}
            </a>
          </p>
        ))}
      </div>
    </div>
  );

  const PrivateInfoTab: React.FC = () => {
    if (!passwordRequired) {
      return (
        <div className="text-center p-12 bg-red-50 rounded-lg border border-red-200 space-y-4">
          <Lock className="h-10 w-10 text-red-500 mx-auto" />
          <p className="text-lg font-semibold text-red-700">
            Access Restricted
          </p>
          <p className="text-sm text-red-600">
            Sensitive personal and administrative data is protected.
          </p>
          <button
            onClick={handleAccessPrivate}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center mx-auto"
          >
            <ArrowLeftRight className="h-4 w-4 mr-2" /> Verify Identity to
            Access
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-red-700 mb-4 border-b pb-2 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" /> Emergency Contact &
          Personal Data
        </h3>

        <div className="grid sm:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg border">
          <DetailBlock
            icon={<User className="h-4 w-4 mr-1 text-gray-400" />}
            label="Emergency Name"
            value={profile.emergencyContact.name}
          />
          <DetailBlock
            icon={<Heart className="h-4 w-4 mr-1 text-gray-400" />}
            label="Relationship"
            value={profile.emergencyContact.relationship}
          />
          <DetailBlock
            icon={<Phone className="h-4 w-4 mr-1 text-gray-400" />}
            label="Emergency Phone"
            value={profile.emergencyContact.phone}
          />
        </div>

        <h3 className="text-xl font-semibold text-gray-800 pt-4 mb-4 border-b pb-2">
          Home Address
        </h3>
        <DetailBlock
          icon={<MapPin className="h-4 w-4 mr-1 text-gray-400" />}
          label="Private Address"
          value={profile.personalAddress}
        />

        <div className="flex justify-between items-center pt-4 border-t">
          <DetailBlock
            icon={<FileText className="h-4 w-4 mr-1 text-gray-400" />}
            label="Employee ID"
            value="EID-7890"
          />
          <button className="text-indigo-600 hover:text-indigo-800 font-medium">
            Reset Password
          </button>
        </div>
      </div>
    );
  };

  const PerformanceTab: React.FC = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Teaching & Engagement Statistics
      </h3>

      <div className="grid sm:grid-cols-3 gap-6">
        <div className="p-4 bg-indigo-50 rounded-lg shadow-sm border-l-4 border-indigo-500">
          <p className="text-3xl font-bold text-indigo-700">
            {profile.totalStudents}
          </p>
          <p className="text-sm text-indigo-600">Total Enrolled Students</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg shadow-sm border-l-4 border-green-500">
          <p className="text-3xl font-bold text-green-700 flex items-center">
            {profile.avgCourseRating}
            <span className="text-base font-normal ml-1">/ 5.0</span>
          </p>
          <p className="text-sm text-green-600">Avg. Course Rating</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg shadow-sm border-l-4 border-yellow-500">
          <p className="text-3xl font-bold text-yellow-700">
            {profile.assignmentsGraded}%
          </p>
          <p className="text-sm text-yellow-600">Assignments Graded</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 pt-4 mb-4 border-b pb-2">
        Recent Activity Feed
      </h3>
      <ul className="space-y-3 text-sm text-gray-700">
        <li className="flex items-center">
          <Zap className="h-4 w-4 mr-2 text-blue-500" /> Graded "Final Paper"
          for CS 401 (30 submissions remaining).
        </li>
        <li className="flex items-center">
          <Zap className="h-4 w-4 mr-2 text-blue-500" /> New announcement
          posted: "Midterm Review Session."
        </li>
        <li className="flex items-center">
          <Zap className="h-4 w-4 mr-2 text-blue-500" /> Last system login: 10
          minutes ago.
        </li>
      </ul>

      <h3 className="text-xl font-semibold text-gray-800 pt-4 mb-4 border-b pb-2">
        Data Management
      </h3>
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border">
        <p className="text-gray-700 flex items-center">
          <BarChart className="h-5 w-5 mr-2 text-gray-500" /> Storage Usage
        </p>
        <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{ width: "45%" }}
          ></div>
        </div>
        <span className="text-sm text-gray-600">45% Used (450MB / 1GB)</span>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "research":
        return <ResearchTab />;
      case "private":
        return <PrivateInfoTab />;
      case "performance":
        return <PerformanceTab />;
      case "overview":
      default:
        return <OverviewTab />;
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto font-sans bg-gray-50 min-h-screen">
      <header className="mb-8 border-b border-gray-200 pb-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <User className="h-7 w-7 mr-3 text-indigo-600" />
          Faculty Profile: {profile.name}
        </h1>
        <div className="flex space-x-3">
          <button
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md text-sm"
            onClick={() => alert("Simulating PDF download...")}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Profile
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-colors shadow-md text-sm ${
              isEditing
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={handleSave}
          >
            {isEditing ? (
              <Save className="h-4 w-4 mr-2" />
            ) : (
              <Edit className="h-4 w-4 mr-2" />
            )}
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </header>

      <div className="bg-white rounded-xl shadow-2xl overflow-hidden p-6 md:p-10">
        {/* Header Section (Image, Role) */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start border-b pb-8">
          <img
            className="h-28 w-28 rounded-full object-cover shadow-lg ring-4 ring-indigo-100"
            src={profile.imageUrl}
            alt={`${profile.name} Profile`}
          />
          <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900">
              {profile.name}
            </h2>
            <p className="text-xl text-gray-600 font-medium flex items-center justify-center sm:justify-start">
              <GraduationCap className="h-6 w-6 mr-2 text-indigo-600" />
              {profile.role}, {profile.department}
            </p>
            <button
              className="mt-2 text-sm text-gray-500 hover:text-indigo-600 flex items-center mx-auto sm:mx-0"
              onClick={() => alert("Photo upload logic needed here.")}
            >
              <Edit className="h-4 w-4 mr-1" /> Change Photo
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {[
              { id: "overview", label: "Overview", icon: User },
              { id: "research", label: "Academic & Research", icon: BookOpen },
              { id: "performance", label: "Activity & Stats", icon: BarChart },
              { id: "private", label: "Private Info", icon: Lock },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                                    ${
                                      activeTab === tab.id
                                        ? "border-indigo-500 text-indigo-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    } 
                                    whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center transition-colors
                                `}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
