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
router.use(authorize("DISPATCHER")); // Entire module restricted to Dispatcher

router
    .route("/")
    .get(getTrips)
    .post(validate(createTripSchema), createTrip);

router
    .route("/:tripId")
    .get(getTrip)
    .put(validate(updateTripSchema), updateTrip);

router
    .route("/:tripId/status")
    .patch(validate(updateTripStatusSchema), updateTripStatus);

export default router;
