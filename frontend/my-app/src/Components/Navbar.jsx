import React, { useState } from "react";
import CreateJobModal from "./CreateJobModal";

export default function Navbar() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Outer header wrapper */}
      <header className="bg-transparent py-6">
        <div className="max-w-4xl mx-auto flex justify-center">
          {/* White floating nav container */}
          <div className="flex items-center justify-between w-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-full px-8 py-4">
            
            {/* Logo - Left & Vertically Centered */}
            <div className="flex items-center justify-center ml-6">
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] rounded-md text-white font-bold text-lg shadow-sm">
                <span>J</span>
              </div>
            </div>

            {/* Centered Navigation links - Middle */}
            <nav className="hidden md:flex items-center justify-center space-x-8 text-sm font-medium text-gray-700">
              <a href="#" className="hover:text-black transition">Home</a>
              <a href="#" className="hover:text-black transition">Find Jobs</a>
              <a href="#" className="hover:text-black transition">Find Talents</a>
              <a href="#" className="hover:text-black transition">About us</a>
              <a href="#" className="hover:text-black transition">Testimonials</a>
            </nav>

            {/* Create Job Button - Right & Vertically Centered */}
            <div className="flex items-center mr-6">
              <button
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-[#8b5cf6] to-[#a855f7] text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-md hover:opacity-90 transition"
              >
                Create Jobs
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modal */}
      {showModal && <CreateJobModal onClose={() => setShowModal(false)} />}
    </>
  );
}