import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";

export default function JobGrid({jobs}) {

  return (
    <div className="max-w-7xl mx-auto mt-6 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {jobs.length > 0 ? (
        jobs.map((job) => <JobCard key={job._id || job.id} job={job} />)
      ) : (
        <div className="col-span-full text-center text-gray-500 py-10">
          No jobs found matching your filters.
        </div>
      )}
    </div>
  );
}
