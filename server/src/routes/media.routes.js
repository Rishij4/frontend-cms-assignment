import express from "express";
import protect from "../middleware/auth.middleware.js";

import upload from "../middleware/upload.middleware.js";

import {
  uploadMedia,
  getMedia,
  deleteMedia,
} from "../controllers/media.controller.js";

const router = express.Router();

router.get("/", protect, getMedia);

router.post(
  "/upload",
  protect,
  upload.single("image"),
  uploadMedia
);

router.delete("/:id", protect, deleteMedia);

export default router;