import express from "express";
import {
    createDriver,
    getDrivers,
    getDriver,
    updateDriver,
    updateDriverStatus,
    deleteDriver,
} from "../controllers/driver.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
    createDriverSchema,
    updateDriverSchema,
    updateDriverStatusSchema,
} from "../validation/driver.validation.js";

const router = express.Router();

router.use(protect);

router
    .route("/")
    .get(authorize("MANAGER", "SAFETY_OFFICER"), getDrivers)
    .post(authorize("MANAGER"), validate(createDriverSchema), createDriver);

router
    .route("/:driverId")
    .get(authorize("MANAGER", "SAFETY_OFFICER"), getDriver)
    .put(authorize("MANAGER"), validate(updateDriverSchema), updateDriver)
    .delete(authorize("MANAGER"), deleteDriver);

router
    .route("/:driverId/status")
    .patch(
        authorize("MANAGER", "SAFETY_OFFICER"),
        validate(updateDriverStatusSchema),
        updateDriverStatus
    );

export default router;
