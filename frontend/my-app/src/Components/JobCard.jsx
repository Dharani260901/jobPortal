import React from 'react';
import { FaUserTie, FaBuilding } from 'react-icons/fa';
import { GiTakeMyMoney } from 'react-icons/gi';
import amazon from '../assets/amazon.png';
import swiggy from '../assets/swiggy.png';
import tesla from '../assets/tesla.png';
import defaults from '../assets/default.png'

export default function JobCard({ job }) {

const companyLogos = {
    Amazon: amazon,
    Swiggy: swiggy,
    Tesla: tesla,
  };

  // Pick the correct logo (case-insensitive)
  const logo =
    companyLogos[
      Object.keys(companyLogos).find(
        key => key.toLowerCase() === job.company?.toLowerCase()
      )
    ] || defaults;
 

   const avgSalary = ((job.minSalary || 0) + (job.maxSalary || 0)) / 2;

  return (
    <div className="bg-white shadow-card rounded-xl p-5 flex flex-col justify-between transition-all hover:shadow-lg duration-200 animate-fadeIn">
      <div>
        {/* Logo and Time Badge */}
        <div className="flex items-start justify-between">
          <div className="bg-white rounded-xl p-1.5 shadow-card border border-gray-100">
           <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border border-gray-100 bg-white shadow-sm">
  <img
    src={logo}
    alt={`${job.company} logo`}
    className="object-cover w-full h-full"
  />
</div>
          </div>
          <span className="text-xs bg-sky-200 px-2.5 py-1 rounded-lg font-medium">{job.posted}</span>
        </div>

        {/* Job Title */}
        <h3 className="mt-4 text-lg font-semibold text-gray-900">{job.role}</h3>

        {/* Icons Row - Experience, Onsite, Salary */}
        <div className="flex items-center gap-4 text-gray-600 text-sm mt-3">
          <div className="flex items-center gap-1.5">
                      <FaUserTie className="w-3.5 h-3.5" />

            <span className="text-xs">2-4 yrs</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FaBuilding className="w-3.5 h-3.5" />
            <span className="text-xs">{job.type}</span>
          </div>
          <div className="flex items-center gap-1.5">
           <GiTakeMyMoney className="w-3.5 h-3.5" />
            <span className="text-xs">₹{(avgSalary / 100000).toFixed(1)} LPA</span>
          </div>
        </div>

       {/* Dynamic Bullet-point Job Description */}
<div className="mt-4 text-gray-600 text-xs leading-relaxed">
  <ul className="space-y-1.5">
    {job.description.split('. ').filter(point => point.trim() !== '').map((point, index) => (
      <li key={index} className="flex items-start">
        <span className="mr-2 mt-0.5 ">•</span>
        <span>{point.replace(/\.$/, '')}</span>
      </li>
    ))}
  </ul>
</div>
</div>

      {/* Apply Button */}
      <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-3 rounded-lg transition-colors w-full">
        Apply Now
      </button>
    </div>
  );
}