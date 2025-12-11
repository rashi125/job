import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface JobListing {
  title: string;
  company: string;
  description: string;
  redirect_url: string;
}

export const JobFinderSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("Software Developer");
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4; // 👈 Show 4 jobs per page

  // ✅ Fetch jobs (either all or by query)
  const fetchJobs = async (query?: string) => {
    setError(null);
    setLoading(true);

    try {
      const url = query
        ? `http://127.0.0.1:5000/search?what=${encodeURIComponent(query)}`
        : `http://127.0.0.1:5000/search`;

      const response = await fetch(url, { method: "GET", mode: "cors" });

      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();

      const validJobs: JobListing[] = Array.isArray(data.jobs)
        ? data.jobs.filter(
          (job) =>
            job &&
            typeof job.title === "string" &&
            typeof job.company === "string" &&
            typeof job.description === "string" &&
            typeof job.redirect_url === "string"
        )
        : [];

      setJobs(validJobs);
      setCurrentPage(1); // 👈 Reset to first page when new search happens
      if (validJobs.length === 0) setError("No jobs found.");
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setJobs([]);
      setError("Failed to fetch jobs. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch default jobs automatically on load
  useEffect(() => {
    fetchJobs("Software Developer");
  }, []);

  // ✅ Manual Search
  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    fetchJobs(trimmedQuery || undefined);
  };

  // ✅ Pagination Logic
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = jobs.slice(startIndex, startIndex + jobsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <section className="flex-1 mt-12 md:mt-0">
      <h2 className="font-serif font-bold text-3xl md:text-4xl text-sidebar-foreground mb-6">
        Job Finder
      </h2>

      {/* Search Input */}
      {/* Search Input + Button */}
<div className="mb-8 flex flex-col md:flex-row items-center gap-4 w-full">
  <div className="relative w-full md:w-[80%]">
    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
    <input
      type="text"
      placeholder="Type a job title..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
    />
  </div>

  <button
    onClick={handleSearch}
    disabled={loading}
    className={`w-full md:w-auto px-3 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all ${
      loading ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {loading ? "Searching" : "Search"}
  </button>
</div>


      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Job Listings */}
      {loading && !error ? (
        <p>Loading jobs...</p>
      ) : currentJobs.length === 0 && !error ? (
        <p>No jobs found. Try searching!</p>
      ) : (
        <div className="space-y-5">
          {currentJobs.map((job, idx) => (
            <div
              key={job.redirect_url + idx}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <h3 className="font-serif font-bold text-xl text-gray-900 mb-1">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600 font-medium mb-3">
                  {job.company}
                </p>
                <p className="text-sm text-gray-700 line-clamp-3 mb-4">
                  {job.description
                    ? job.description.slice(0, 180) + "..."
                    : "No description available"}
                </p>
                <a
                  href={job.redirect_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-opacity-90 transition-all text-sm"
                >
                  View Job
                </a>
              </div>
              
            </div>
          ))}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-5 py-2 rounded-lg border border-gray-300 font-medium transition-all ${currentPage === 1
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-gray-100"
                  }`}
              >
                ← Prev
              </button>

              <span className="text-gray-700 font-semibold">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-5 py-2 rounded-lg border border-gray-300 font-medium transition-all ${currentPage === totalPages
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-gray-100"
                  }`}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
