import express from "express";
import { createJob, getJobs, getDrafts } from "../controllers/jobController.js";

const router = express.Router();

router.post("/", createJob);    
router.get("/", getJobs);       
router.get("/drafts", getDrafts); 

export default router;
