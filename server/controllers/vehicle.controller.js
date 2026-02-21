import * as vehicleService from "../services/vehicle.service.js";
import sendResponse from "../utils/sendResponse.js";

// @desc    Create new vehicle
// @route   POST /api/vehicles
// @access  Private/Manager
export const createVehicle = async (req, res, next) => {
    try {
        // Assign managerId from authenticated user
        const vehicleData = {
            ...req.body,
            managerId: req.user.id,
        };

        const vehicle = await vehicleService.createVehicle(vehicleData);
        return sendResponse(res, 201, true, "Vehicle created successfully", vehicle);
    } catch (err) {
        if (err.message === "Vehicle with this license plate already exists") {
            return sendResponse(res, 400, false, err.message);
        }
        next(err);
    }
};

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Private
export const getVehicles = async (req, res, next) => {
    try {
        const vehicles = await vehicleService.getAllVehicles();
        return sendResponse(res, 200, true, "Vehicles retrieved successfully", vehicles);
    } catch (err) {
        next(err);
    }
};

// @desc    Get single vehicle
// @route   GET /api/vehicles/:id
// @access  Private
export const getVehicle = async (req, res, next) => {
    try {
        const vehicle = await vehicleService.getVehicleById(req.params.vehicleId);
        return sendResponse(res, 200, true, "Vehicle retrieved successfully", vehicle);
    } catch (err) {
        if (err.message === "Vehicle not found") {
            return sendResponse(res, 404, false, err.message);
        }
        next(err);
    }
};

// @desc    Update vehicle
// @route   PUT /api/vehicles/:id
// @access  Private/Manager
export const updateVehicle = async (req, res, next) => {
    try {
        const vehicle = await vehicleService.updateVehicle(req.params.vehicleId, req.body);
        return sendResponse(res, 200, true, "Vehicle updated successfully", vehicle);
    } catch (err) {
        if (err.message === "Vehicle not found") {
            return sendResponse(res, 404, false, err.message);
        }
        next(err);
    }
};

// @desc    Delete vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private/Manager
export const deleteVehicle = async (req, res, next) => {
    try {
        const vehicle = await vehicleService.deleteVehicle(req.params.vehicleId);
        return sendResponse(res, 200, true, "Vehicle deleted successfully", vehicle);
    } catch (err) {
        if (err.message === "Vehicle not found") {
            return sendResponse(res, 404, false, err.message);
        }
        next(err);
    }
};
