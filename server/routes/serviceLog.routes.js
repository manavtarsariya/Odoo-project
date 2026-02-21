import express from "express";
import {
    createServiceLog,
    getServiceLogs,
    getVehicleServiceLogs,
    releaseFromShop
} from "../controllers/serviceLog.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createServiceLogSchema } from "../validation/serviceLog.validation.js";

const router = express.Router();

router.use(protect);
// Module restricted based on specific methods

router
    .route("/")
    .get(authorize("MANAGER", "FINANCE"), getServiceLogs)
    .post(authorize("MANAGER"), validate(createServiceLogSchema), createServiceLog);

router.get("/vehicle/:vehicleId", authorize("MANAGER", "FINANCE"), getVehicleServiceLogs);
router.patch("/:vehicleId/available", authorize("MANAGER"), releaseFromShop);

export default router;
