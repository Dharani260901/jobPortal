import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import jobRoutes from "./routes/jobRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: ["https://job-portal-mu-silk.vercel.app/"],
}));

app.use(express.json());

// Routes
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.send("API is working!");
});

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
