import Job from "../models/JobModel.js";

// Create new job
export const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all published jobs
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "published" }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get drafts (optional)
export const getDrafts = async (req, res) => {
  try {
    const drafts = await Job.find({ status: "draft" });
    res.json(drafts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
