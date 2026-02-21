import * as fuelLogService from "../services/fuelLog.service.js";
import * as expenseService from "../services/expense.service.js";
import sendResponse from "../utils/sendResponse.js";

// @desc    Create new fuel log
// @route   POST /api/finance/fuel
// @access  Private/Manager
export const createFuelLog = async (req, res, next) => {
    try {
        const fuelData = {
            ...req.body,
            financerId: req.user.id
        };
        const fuelLog = await fuelLogService.createFuelLog(fuelData);
        return sendResponse(res, 201, true, "Fuel log created and expense recorded", fuelLog);
    } catch (err) {
        if (err.message === "Vehicle not found") {
            return sendResponse(res, 404, false, err.message);
        }
        next(err);
    }
};

// @desc    Get all fuel logs
// @route   GET /api/finance/fuel
// @access  Private/Manager
export const getFuelLogs = async (req, res, next) => {
    try {
        const logs = await fuelLogService.getAllFuelLogs();
        return sendResponse(res, 200, true, "Fuel logs retrieved successfully", logs);
    } catch (err) {
        next(err);
    }
};

// @desc    Get vehicle total operational cost
// @route   GET /api/finance/vehicle/:vehicleId/total-cost
// @access  Private/Manager
export const getVehicleTotalCost = async (req, res, next) => {
    try {
        const totalCost = await expenseService.getVehicleTotalCost(req.params.vehicleId);
        return sendResponse(res, 200, true, "Total cost retrieved successfully", { totalCost });
    } catch (err) {
        next(err);
    }
};

// @desc    Get global expense summary
// @route   GET /api/finance/summary
// @access  Private/Manager
export const getExpenseSummary = async (req, res, next) => {
    try {
        const summary = await expenseService.getExpenseSummary();
        return sendResponse(res, 200, true, "Expense summary retrieved successfully", summary);
    } catch (err) {
        next(err);
    }
};
