import React, { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { HiChevronDoubleRight } from 'react-icons/hi';
import {toast} from 'react-hot-toast'

export default function CreateJobModal({ onClose, onJobCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    role: "", // ✅ added
    exp:"",
    location: "",
    type: "",
    minSalary: "",
    maxSalary: "",
    deadline: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("✅ handleSubmit triggered"); // 🧠 Step 1: Check if this fires

  setLoading(true);
  console.log("⏳ Sending request to backend...", formData);

  try {
    const res = await fetch(`${API_URL}/api/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, status: "published" }),
    });

    console.log("📨 Response received:", res);

    const newJob = await res.json();
    console.log("📦 Parsed job response:", newJob);

    if (!res.ok) throw new Error(newJob.message || "Failed to create job");

    console.log("🎉 Job creation success! Calling onJobCreated...");
    if (onJobCreated) onJobCreated(newJob);

    toast.success("🎉 Job published successfully!");

    // ✅ Optional: close modal directly (for debugging)
    onClose();
  } catch (err) {
    console.error("❌ Error in handleSubmit:", err);
    toast.error("Failed to publish job. Please try again.");
  } finally {
    setLoading(false);
    console.log("🔚 handleSubmit finished");
  }
};

 

  const handleSaveDraft = async () => {
    const draftData = { ...formData, status: "draft" };

    try {
      const res = await fetch(`${API_URL}/api/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draftData),
      });

      if (!res.ok) throw new Error("Failed to save draft");
      const data = await res.json();
      console.log("📝 Draft Saved:", data);
        onClose();
      toast.success("📝 Draft saved successfully!");
    } catch (err) {
      console.error("❌ Error saving draft:", err);
      toast.error("Error saving draft");
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-8 relative" 
       onClick={(e) => e.stopPropagation()}>
        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-6">
          Create Job Opening
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Job Title
              </label>
              <input
                type="text"
                name="role"
                placeholder="Full Stack Developer"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                placeholder="Amazon,Swiggy,Tesla"
                value={formData.company}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>


          {/* ✅ Added role input */}
          {/* <div>
            <label className="block text-sm text-gray-600 mb-1">Job Role / Title</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Frontend Developer"
              required
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div> */}

          {/* ✅ Added experience input */}
          {/* <div>
            <label className="block text-sm text-gray-600 mb-1">Experience</label>
            <input
              type="text"
              name="exp"
              value={formData.exp}
              onChange={handleChange}
              placeholder="e.g. 2–4 years"
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div> */}

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-5">
            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">
                Location
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="" disabled>
                  Choose your preferred location
                </option>
                <option value="Chennai">Chennai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Remote">Remote</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3 top-9 text-gray-400 pointer-events-none"
              />
            </div>
            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">
                Job Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full appearance-none border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500 `}
              >
                <option value="" disabled>
                  Choose job type
                </option>
                <option value="FullTime">Full Time</option>
                <option value="Internship">Internship</option>
                <option value="PartTime">Part Time</option>
                <option value="Contract">Contract</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3 top-9 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Salary Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="minSalary"
                  placeholder="₹0"
                  value={formData.minSalary}
                  onChange={handleChange}
                  className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="maxSalary"
                  placeholder="₹12,00,000"
                  value={formData.maxSalary}
                  onChange={handleChange}
                  className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Application Deadline
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Job Description
            </label>
            <textarea
              name="description"
              placeholder="Please share a description to let the candidate know more about the job role"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Buttons */}
           <div className="flex justify-between mt-6">
            <button
              type="button"
              disabled={loading}
              onClick={handleSaveDraft}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
            >
              Save Draft <HiChevronDoubleDown size={16} className="inline ml-1" />
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition"
            >
              {loading ? "Publishing..." : "Publish"}{" "}
              <HiChevronDoubleRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
