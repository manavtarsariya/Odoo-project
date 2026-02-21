import express from "express";
import { getAnalytics, exportAnalyticsCSV } from "../controllers/report.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("FINANCE", "MANAGER"));

router.get("/analytics", getAnalytics);
router.get("/export/csv", exportAnalyticsCSV);

export default router;
