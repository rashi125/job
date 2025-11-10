import { Sidenav } from "@/components/Sidenav";
import { RoadmapSection } from "@/components/RoadmapSection";
import { JobFinderSection } from "@/components/JobFinderSection";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <Sidenav />

          {/* Main Content */}
          <div className="flex-1 space-y-12">
            {/* Roadmap Section */}
            <RoadmapSection />

            {/* Job Finder Section */}
            <JobFinderSection />
          </div>
        </div>
      </div>
    </div>
  );
}
