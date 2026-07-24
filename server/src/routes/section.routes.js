import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
  createSection,
  getSections,
  getSectionById,
  updateSection,
  deleteSection,
} from "../controllers/section.controller.js";

const router = express.Router();

// Get all sections
router.get("/", protect, getSections);

// Get single section
router.get("/:id", protect, getSectionById);

// Create section
router.post("/", protect, createSection);

// Update section
router.put("/:id", protect, updateSection);

// Delete section
router.delete("/:id", protect, deleteSection);

export default router;