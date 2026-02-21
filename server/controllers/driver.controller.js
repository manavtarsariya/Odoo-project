import * as driverService from "../services/driver.service.js";
import sendResponse from "../utils/sendResponse.js";

// @desc    Create new driver
// @route   POST /api/drivers
// @access  Private/Manager
export const createDriver = async (req, res, next) => {
    try {
        const driverData = {
            ...req.body,
            managerId: req.user.id,
        };

        const driver = await driverService.createDriver(driverData);
        return sendResponse(res, 201, true, "Driver created successfully", driver);
    } catch (err) {
        if (err.message === "Driver with this license number already exists") {
            return sendResponse(res, 400, false, err.message);
        }
        next(err);
    }
};

// @desc    Get all drivers
// @route   GET /api/drivers
// @access  Private (Manager/Safety Officer)
export const getDrivers = async (req, res, next) => {
    try {
        const drivers = await driverService.getAllDrivers();
        return sendResponse(res, 200, true, "Drivers retrieved successfully", drivers);
    } catch (err) {
        next(err);
    }
};

// @desc    Get single driver
// @route   GET /api/drivers/:driverId
// @access  Private (Manager/Safety Officer)
export const getDriver = async (req, res, next) => {
    try {
        const driver = await driverService.getDriverById(req.params.driverId);
        return sendResponse(res, 200, true, "Driver retrieved successfully", driver);
    } catch (err) {
        if (err.message === "Driver not found") {
            return sendResponse(res, 404, false, err.message);
        }
        next(err);
    }
};

// @desc    Update driver
// @route   PUT /api/drivers/:driverId
// @access  Private/Manager
export const updateDriver = async (req, res, next) => {
    try {
        const driver = await driverService.updateDriver(req.params.driverId, req.body);
        return sendResponse(res, 200, true, "Driver updated successfully", driver);
    } catch (err) {
        if (err.message === "Driver not found") {
            return sendResponse(res, 404, false, err.message);
        }
        next(err);
    }
};

// @desc    Update driver status
// @route   PATCH /api/drivers/:driverId/status
// @access  Private (Manager/Safety Officer)
export const updateDriverStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const driver = await driverService.updateDriver(req.params.driverId, { status });
        return sendResponse(res, 200, true, "Driver status updated successfully", driver);
    } catch (err) {
        if (err.message === "Driver not found") {
            return sendResponse(res, 404, false, err.message);
        }
        next(err);
    }
};


// @desc    Update driver safety score
// @route   PATCH /api/drivers/:driverId/safety-score
// @access  Private (Safety Officer)
export const updateSafetyScore = async (req, res, next) => {
    try {
        const { safetyScore } = req.body;
        const driver = await driverService.updateDriver(req.params.driverId, { safetyScore });
        return sendResponse(res, 200, true, "Driver safety score updated successfully", driver);
    } catch (err) {
        if (err.message === "Driver not found") {
            return sendResponse(res, 404, false, err.message);
        }
        next(err);
    }
};
// @desc    Delete driver
// @route   DELETE /api/drivers/:driverId
// @access  Private/Manager
export const deleteDriver = async (req, res, next) => {
    try {
        const driver = await driverService.deleteDriver(req.params.driverId);
        return sendResponse(res, 200, true, "Driver deleted successfully", driver);
    } catch (err) {
        if (err.message === "Driver not found") {
            return sendResponse(res, 404, false, err.message);
        }
        next(err);
    }
};
