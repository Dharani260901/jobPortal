import React from "react";
import { FiSearch, FiMapPin, FiUser } from "react-icons/fi";

export default function FilterBar({
  search,
  setSearch,
  location,
  setLocation,
  jobType,
  setJobType,
  minSalary,
  setMinSalary,
  maxSalary,
  setMaxSalary,
  salaryBounds
}) {
  const locations = ["Preferred Location", "Bengaluru", "Hyderabad", "Chennai", "Remote"];
  const jobTypes = ["Job type", "Onsite", "Remote", "Hybrid"];

  return (
    <div className="w-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] mt-6">
      <div className="max-w-7xl mx-auto flex items-center justify-center px-8 py-4 gap-8 flex-wrap">

        {/* Search Input */}
        <div className="flex items-center gap-3 flex-[1.2] min-w-[220px] max-w-sm">
          <FiSearch className="text-gray-400 w-5 h-5 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search By Job Title, Role"
             value={search}
             onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
          />
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200"></div>

        {/* Location Selector */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiMapPin className="text-gray-400 w-5 h-5" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent outline-none text-gray-600 cursor-pointer py-1 pr-6"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200"></div>

        {/* Job Type Selector */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiUser className="text-gray-400 w-5 h-5" />
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="bg-transparent outline-none text-gray-600 cursor-pointer py-1 pr-8"
          >
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200"></div>

        {/* Salary Range */}
        <div className="flex flex-col justify-center items-start w-60 min-w-[220px]">
          <div className="flex justify-between w-full text-xs font-medium whitespace-nowrap">
            <span className="text-gray-600">Salary Per Month</span>
            <span className="text-gray-800">
              ₹{Math.round(minSalary / 1000)}k - ₹{Math.round(maxSalary / 1000)}k
            </span>
          </div>

          {/* Slider track */}
          <div className="relative w-full mt-2 h-[2px] bg-gray-200 rounded-full">
            <div
              className="absolute h-[2px] bg-black rounded-full"
              style={{
                left: `${((minSalary - salaryBounds.min) / (salaryBounds.max - salaryBounds.min)) * 100}%`,
                right: `${100 - ((maxSalary - salaryBounds.min) / (salaryBounds.max - salaryBounds.min)) * 100}%`,
              }}
            ></div>

            {/* Left knob */}
            <div
              className="absolute w-4 h-4 bg-black rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer flex items-center justify-center"
              style={{
                left: `${((minSalary - salaryBounds.min) / (salaryBounds.max - salaryBounds.min)) * 100}%`,
              }}
            >
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>

            {/* Right knob */}
            <div
              className="absolute w-4 h-4 bg-black rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer flex items-center justify-center"
              style={{
                left: `${((maxSalary - salaryBounds.min) / (salaryBounds.max - salaryBounds.min)) * 100}%`,
              }}
            >
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>

            {/* Hidden range inputs */}
            <input
              type="range"
              min={salaryBounds.min}
              max={salaryBounds.max}
              value={minSalary}
              onChange={(e) =>
                setMinSalary(Math.min(Number(e.target.value), maxSalary - 50000))
              }
              className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer opacity-0"
            />
            <input
              type="range"
              min={salaryBounds.min}
              max={salaryBounds.max}
              value={maxSalary}
              onChange={(e) =>
                setMaxSalary(Math.max(Number(e.target.value), minSalary + 50000))
              }
              className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer opacity-0"
            />
          </div>
        </div>

      </div>
    </div>
  );
}