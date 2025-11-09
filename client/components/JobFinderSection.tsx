import React, { useState } from "react";
import { Search } from "lucide-react";

interface JobListing {
  id: number;
  company: string;
  position: string;
  location: string;
  image: string;
  bgColor: string;
}

const jobListings: JobListing[] = [
  {
    id: 1,
    company: "Tech Innovation Inc.",
    position: "Senior Software Engineer",
    location: "Chennai, India",
    image: "https://images.unsplash.com/photo-1486718860822-66db9c5e2b83?w=500&h=300&fit=crop",
    bgColor: "from-blue-100 to-blue-200",
  },
  {
    id: 2,
    company: "CodeCrafter LLC",
    position: "Data Scientist",
    location: "Pune, India",
    image: "https://images.unsplash.com/photo-1486718860822-66db9c5e2b83?w=500&h=300&fit=crop",
    bgColor: "from-purple-100 to-purple-200",
  },
  {
    id: 3,
    company: "Design Dynamics LLC",
    position: "UI/UX Designer",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1486718860822-66db9c5e2b83?w=500&h=300&fit=crop",
    bgColor: "from-orange-100 to-orange-200",
  },
];

export const JobFinderSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"recommended" | "all">("recommended");

  return (
    <section className="flex-1 mt-12 md:mt-0">
      <h2 className="font-serif font-bold text-3xl md:text-4xl text-sidebar-foreground mb-6">
        Job Finder
      </h2>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sidebar-accent-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search for jobs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-white text-sidebar-foreground placeholder-sidebar-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-8 border-b border-secondary mb-6">
        <button
          onClick={() => setActiveTab("recommended")}
          className={`pb-3 font-semibold text-lg transition-colors ${
            activeTab === "recommended"
              ? "text-primary border-b-2 border-primary"
              : "text-sidebar-accent-foreground hover:text-sidebar-foreground"
          }`}
        >
          Recommended
        </button>
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-3 font-semibold text-lg transition-colors ${
            activeTab === "all"
              ? "text-primary border-b-2 border-primary"
              : "text-sidebar-accent-foreground hover:text-sidebar-foreground"
          }`}
        >
          All Jobs
        </button>
      </div>

      {/* Job Listings */}
      <div className="space-y-5">
        {jobListings.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col md:flex-row h-auto md:h-48">
              {/* Image Section */}
              <div className={`w-full md:w-48 h-48 md:h-auto bg-gradient-to-br ${job.bgColor} flex-shrink-0`}>
                <img
                  src={job.image}
                  alt={job.company}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-xl text-sidebar-foreground mb-1">
                    {job.position}
                  </h3>
                  <p className="text-sm text-sidebar-accent-foreground font-medium mb-3">
                    {job.company}
                  </p>
                  <p className="text-sm text-sidebar-accent-foreground">
                    📍 {job.location}
                  </p>
                </div>

                {/* Apply Button */}
                <div className="mt-4 md:mt-0">
                  <button className="px-6 py-2 bg-sidebar-foreground text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all text-sm">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
