import React, { useMemo, useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import FilterBar from "./Components/FilterBar";
import JobGrid from "./Components/JobGrid";
import CreateJobModal from "./Components/CreateJobModal";
import { Toaster } from 'react-hot-toast';

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Preferred Location");
  const [jobType, setJobType] = useState("Job type");
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(0);
  const [salaryBounds, setSalaryBounds] = useState({ min: 0, max: 0 });
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const API_URL = import.meta.env.API_URL;


  <Toaster position="top-right" />

  // 🎯 Fetch all jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setJobs(data);

        if (data.length > 0) {
          const allSalaries = data.flatMap(j => [j.minSalary || 0, j.maxSalary || 0]);
          const min = Math.min(...allSalaries);
          const max = Math.max(...allSalaries);
          setSalaryBounds({ min, max });
          setMinSalary(min);
          setMaxSalary(max);
        }
      } catch (err) {
        console.error("❌ Failed to fetch jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  // 🔍 Filter logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const query = search.toLowerCase().trim();

      if (
        query &&
        !(
          job.role?.toLowerCase().includes(query) ||
          job.company?.toLowerCase().includes(query) ||
          job.description?.toLowerCase().includes(query)
        )
      ) {
        return false;
      }

      if (location !== "Preferred Location" && job.location !== location)
        return false;

      if (jobType !== "Job type" && job.type !== jobType)
        return false;

      const avgSalary =
        (Number(job.minSalary) + Number(job.maxSalary)) / 2 ||
        Number(job.maxSalary) ||
        0;
      if (avgSalary < minSalary || avgSalary > maxSalary) return false;

      return true;
    });
  }, [jobs, search, location, jobType, minSalary, maxSalary]);

  const handleJobCreated = (newJob) => {
  setJobs((prev) => [newJob, ...prev]);
  setShowCreateJobModal(false);
};

  return (
    <div>
      <Navbar onOpenCreateJob={() => setShowCreateJobModal(true)} />

      <main className="pb-12">
        <FilterBar
          search={search}
          setSearch={setSearch}
          location={location}
          setLocation={setLocation}
          jobType={jobType}
          setJobType={setJobType}
          minSalary={minSalary}
          setMinSalary={setMinSalary}
          maxSalary={maxSalary}
          setMaxSalary={setMaxSalary}
          salaryBounds={salaryBounds}
        />

        <div className="max-w-7xl mx-auto px-4 mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-600">
              {filteredJobs.length} jobs found
            </div>
            <div className="text-sm text-gray-500">
              Sort: <span className="font-medium">Recent</span>
            </div>
          </div>
        </div>

        <JobGrid jobs={filteredJobs} />

      {showCreateJobModal && (
  <CreateJobModal
    onClose={() => setShowCreateJobModal(false)}
    onJobCreated={handleJobCreated}
  />
)}

      </main>
    </div>
  );
}
