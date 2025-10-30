import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

const jobSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  company: { type: String, required: true },
  role: { type: String, required: true }, // ✅ required role field
  exp: { type: String },
  location: { type: String, required: true },
  type: { type: String, required: true },
  minSalary: { type: Number }, // ✅ added to match frontend
  maxSalary: { type: Number }, // ✅ added to match frontend
  deadline: { type: Date },

  logoLetter: { type: String },
  description: { type: String },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  createdAt: { type: Date, default: Date.now },
  postedAt: { type: Date, default: Date.now }, 
});

jobSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { id: "jobId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
  }

  if (!this.logoLetter && this.company) {
    this.logoLetter = this.company.charAt(0).toUpperCase();
  }

  next();
});

// ✅ Virtual field to return dynamic “posted” text like YouTube
jobSchema.virtual("posted").get(function () {
  if (!this.postedAt) return "Just now";

  const now = new Date();
  const diffMs = now - this.postedAt;

  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? "s" : ""} ago`;
  return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) > 1 ? "s" : ""} ago`;
});

// Ensure virtuals are included in JSON
jobSchema.set("toJSON", { virtuals: true });
jobSchema.set("toObject", { virtuals: true });

const Job = mongoose.model("Job", jobSchema);
export default Job;
