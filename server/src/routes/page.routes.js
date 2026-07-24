import express from "express";

import {
  getPages,
  getPageBySlug,
  getPageById,
  createPage,
  updatePage,
  deletePage,
} from "../controllers/page.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getPages);

router.get("/id/:id", protect, getPageById);

router.get("/:slug", getPageBySlug);

router.post("/", protect, createPage);

router.put("/:id", protect, updatePage);

router.delete("/:id", protect, deletePage);
export default router;