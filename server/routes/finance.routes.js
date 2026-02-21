import express from "express";
import {
    createFuelLog,
    getFuelLogs,
    getVehicleTotalCost,
    getExpenseSummary,
} from "../controllers/finance.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createFuelLogSchema } from "../validation/finance.validation.js";

const router = express.Router();

router.use(protect);
router.use(authorize("MANAGER", "FINANCE")); // Finance module restricted to Manager and Finance roles

router.post("/fuel", validate(createFuelLogSchema), createFuelLog);
router.get("/fuel", getFuelLogs);
router.get("/summary", getExpenseSummary);
router.get("/vehicle/:vehicleId/total-cost", getVehicleTotalCost);

export default router;
