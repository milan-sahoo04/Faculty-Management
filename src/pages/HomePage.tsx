import React from "react";
import {
  CheckCircle,
  Play,
  Users,
  Calendar,
  BarChart3,
  FileText,
} from "lucide-react";

const HomePage = () => {
  const steps = [
    {
      title: "Setup Your Account",
      description: "Create your profile and configure basic settings",
      completed: true,
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Add Faculty Members",
      description: "Import or manually add your teaching staff",
      completed: true,
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Create Categories",
      description: "Organize sessions by subject or department",
      completed: true,
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Schedule Sessions",
      description: "Start creating and managing faculty sessions",
      completed: false,
      icon: Calendar,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Generate Reports",
      description: "Track performance and analytics",
      completed: false,
      icon: BarChart3,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
  ];

  const features = [
    {
      title: "Faculty Management",
      description: "Comprehensive faculty profiles with subjects and schedules",
      icon: Users,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Session Scheduling",
      description: "Easy-to-use calendar for planning academic sessions",
      icon: Calendar,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Analytics & Reports",
      description: "Detailed insights into faculty performance and engagement",
      icon: BarChart3,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Documentation",
      description: "Maintain records and generate automated reports",
      icon: FileText,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 mb-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center text-sm mb-4">
            <span className="bg-red-500 w-3 h-3 rounded-full mr-2"></span>
            <span className="opacity-90">Live Faculty Session</span>
            <span className="ml-2 opacity-75">2:34:12</span>
          </div>
          <div className="absolute top-8 right-8">
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-4 transition-all">
              <Play className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-4">
            Streamline Your Faculty Management
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Create, manage, and track faculty sessions with powerful analytics.
            Perfect for educational institutions and training organizations.
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
              Create Session
              <Play className="w-4 h-4 ml-2" />
            </button>
            <button className="border border-white border-opacity-30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors">
              View Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Getting Started */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Getting Started
              </h2>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                Welcome
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Follow these steps to set up your faculty management system
            </p>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div
                    className={`flex-shrink-0 w-8 h-8 ${step.iconBg} rounded-full flex items-center justify-center`}
                  >
                    {step.completed ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-500">
                          {index + 1}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        step.completed ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Everything you need section */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Everything you need for faculty management
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive tools to manage faculty, schedule sessions, and
                track performance all in one place.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-12 h-12 ${feature.iconBg} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  2,500+
                </div>
                <div className="text-sm text-gray-600">Faculty Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  15,000+
                </div>
                <div className="text-sm text-gray-600">Sessions Conducted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  98%
                </div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
