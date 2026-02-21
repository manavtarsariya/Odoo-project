import express from "express";
import {
    createVehicle,
    getVehicles,
    getVehicle,
    updateVehicle,
    deleteVehicle,
} from "../controllers/vehicle.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createVehicleSchema, updateVehicleSchema } from "../validation/vehicle.validation.js";

const router = express.Router();

// All routes are protected
router.use(protect);

router
    .route("/")
    .get(authorize("MANAGER"), getVehicles)
    .post(authorize("MANAGER"), validate(createVehicleSchema), createVehicle);

router
    .route("/:vehicleId")
    .get(authorize("MANAGER"), getVehicle)
    .put(authorize("MANAGER"), validate(updateVehicleSchema), updateVehicle)
    .delete(authorize("MANAGER"), deleteVehicle);

export default router;
