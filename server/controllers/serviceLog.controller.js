import * as serviceLogService from "../services/serviceLog.service.js";
import sendResponse from "../utils/sendResponse.js";

// @desc    Create new service log
// @route   POST /api/service-logs
// @access  Private/Manager
export const createServiceLog = async (req, res, next) => {
    try {
        const logData = {
            ...req.body,
            managerId: req.user.id,
        };

        const serviceLog = await serviceLogService.createServiceLog(logData);
        return sendResponse(res, 201, true, "Service log created and vehicle moved to shop", serviceLog);
    } catch (err) {
        if (err.message === "Vehicle not found") {
            return sendResponse(res, 404, false, err.message);
        }
        if (err.message.includes("available for service")) {
            return sendResponse(res, 400, false, err.message);
        }
        next(err);
    }
};

// @desc    Get all service logs
// @route   GET /api/service-logs
// @access  Private/Manager
export const getServiceLogs = async (req, res, next) => {
    try {
        const logs = await serviceLogService.getAllServiceLogs();
        return sendResponse(res, 200, true, "Service logs retrieved successfully", logs);
    } catch (err) {
        next(err);
    }
};

// @desc    Get service logs for a vehicle
// @route   GET /api/service-logs/vehicle/:vehicleId
// @access  Private/Manager
export const getVehicleServiceLogs = async (req, res, next) => {
    try {
        const logs = await serviceLogService.getServiceLogsByVehicle(req.params.vehicleId);
        return sendResponse(res, 200, true, "Vehicle service logs retrieved successfully", logs);
    } catch (err) {
        next(err);
    }
};

// @desc    Release vehicle from shop
// @route   PATCH /api/vehicles/:vehicleId/available
// @access  Private/Manager
export const releaseFromShop = async (req, res, next) => {
    try {
        const vehicle = await serviceLogService.releaseFromShop(req.params.vehicleId);
        return sendResponse(res, 200, true, "Vehicle is now AVAILABLE", vehicle);
    } catch (err) {
        if (err.message === "Vehicle not found") {
            return sendResponse(res, 404, false, err.message);
        }
        if (err.message.includes("not IN_SHOP")) {
            return sendResponse(res, 400, false, err.message);
        }
        next(err);
    }
};
