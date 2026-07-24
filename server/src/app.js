import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import pageRoutes from "./routes/page.routes.js";
import sectionRoutes from "./routes/section.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import uploadRoutes from "./routes/upload.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import publicRoutes from "./routes/public.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import mediaRoutes from "./routes/media.routes.js";
const app = express();

app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/sections", sectionRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/media", mediaRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "CMS Backend API Running..."
    });
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

app.use("/api/upload", uploadRoutes);

export default app;