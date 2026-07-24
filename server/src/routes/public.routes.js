import express from "express";
import { getPublicPage } from "../controllers/public.controller.js";

const router = express.Router();

router.get("/:slug", getPublicPage);

export default router;