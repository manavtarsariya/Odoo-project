import express from "express";
import {
    createTrip,
    getTrips,
    getTrip,
    updateTripStatus,
    updateTrip,
} from "../controllers/trip.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createTripSchema, updateTripStatusSchema, updateTripSchema } from "../validation/trip.validation.js";

const router = express.Router();

router.use(protect);

router
    .route("/")
    .get(authorize("DISPATCHER", "MANAGER"), getTrips)
    .post(authorize("DISPATCHER", "MANAGER"), validate(createTripSchema), createTrip);

router
    .route("/:tripId")
    .get(authorize("DISPATCHER", "MANAGER"), getTrip)
    .put(authorize("DISPATCHER", "MANAGER"), validate(updateTripSchema), updateTrip);

router
    .route("/:tripId/status")
    .patch(authorize("DISPATCHER", "MANAGER"), validate(updateTripStatusSchema), updateTripStatus);

export default router;
