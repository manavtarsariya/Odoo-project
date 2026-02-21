import * as tripService from "../services/trip.service.js";
import sendResponse from "../utils/sendResponse.js";

// @desc    Create new trip
// @route   POST /api/trips
// @access  Private/Dispatcher
export const createTrip = async (req, res, next) => {
    try {
        const tripData = {
            ...req.body,
            dispatcherId: req.user.id,
        };

        const trip = await tripService.createTrip(tripData);
        return sendResponse(res, 201, true, "Trip created successfully", trip);
    } catch (err) {
        if (err.message.includes("available") || err.message.includes("capacity") || err.message.includes("found") || err.message.includes("OFF_DUTY")) {
            return sendResponse(res, 400, false, err.message);
        }
        next(err);
    }
};

// @desc    Get all trips
// @route   GET /api/trips
// @access  Private/Dispatcher
export const getTrips = async (req, res, next) => {
    try {
        const trips = await tripService.getAllTrips();
        return sendResponse(res, 200, true, "Trips retrieved successfully", trips);
    } catch (err) {
        next(err);
    }
};

// @desc    Get single trip
// @route   GET /api/trips/:tripId
// @access  Private/Dispatcher
export const getTrip = async (req, res, next) => {
    try {
        const trip = await tripService.getTripById(req.params.tripId);
        return sendResponse(res, 200, true, "Trip retrieved successfully", trip);
    } catch (err) {
        if (err.message === "Trip not found") {
            return sendResponse(res, 404, false, err.message);
        }
        next(err);
    }
};

// @desc    Update trip status
// @route   PATCH /api/trips/:tripId/status
// @access  Private/Dispatcher
export const updateTripStatus = async (req, res, next) => {
    try {
        const trip = await tripService.updateTripStatus(req.params.tripId, req.body);
        return sendResponse(res, 200, true, "Trip status updated successfully", trip);
    } catch (err) {
        if (err.message === "Trip not found") {
            return sendResponse(res, 404, false, err.message);
        }
        if (err.message.includes("Invalid") || err.message.includes("required") || err.message.includes("less")) {
            return sendResponse(res, 400, false, err.message);
        }
        next(err);
    }
};

// @desc    Update trip details
// @route   PUT /api/trips/:tripId
// @access  Private/Dispatcher
export const updateTrip = async (req, res, next) => {
    try {
        const trip = await tripService.updateTrip(req.params.tripId, req.body);
        return sendResponse(res, 200, true, "Trip updated successfully", trip);
    } catch (err) {
        if (err.message === "Trip not found") {
            return sendResponse(res, 404, false, err.message);
        }
        if (err.message.includes("Cannot update") || err.message.includes("exceeds") || err.message.includes("available") || err.message.includes("OFF_DUTY")) {
            return sendResponse(res, 400, false, err.message);
        }
        next(err);
    }
};
