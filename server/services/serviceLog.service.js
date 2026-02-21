import ServiceLog from "../models/ServiceLog.model.js";
import Vehicle from "../models/Vehicle.model.js";
import Expense from "../models/Expense.model.js";

/**
 * Create a new service log and update vehicle status
 * @param {Object} logData 
 * @returns {Promise<ServiceLog>}
 */
export const createServiceLog = async (logData) => {
    // 1. Check if vehicle exists and is available
    const vehicle = await Vehicle.findById(logData.vehicleId);
    if (!vehicle) {
        throw new Error("Vehicle not found");
    }

    if (vehicle.status !== "AVAILABLE") {
        throw new Error(`Vehicle is not available for service (Current status: ${vehicle.status})`);
    }

    // 2. Create the service log
    const serviceLog = await ServiceLog.create(logData);

    // 3. Update vehicle status to IN_SHOP
    await Vehicle.findByIdAndUpdate(logData.vehicleId, {
        status: "IN_SHOP"
    });

    // 4. Create a corresponding expense entry
    await Expense.create({
        vehicleId: serviceLog.vehicleId,
        type: "MAINTENANCE",
        amount: serviceLog.cost,
        referenceId: serviceLog._id,
        date: serviceLog.date
    });

    return serviceLog;
};

/**
 * Get all service logs
 * @returns {Promise<Array>}
 */
export const getAllServiceLogs = async () => {
    return await ServiceLog.find().populate("vehicleId", "name licensePlate model");
};

/**
 * Get service logs for a specific vehicle
 * @param {string} vehicleId 
 * @returns {Promise<Array>}
 */
export const getServiceLogsByVehicle = async (vehicleId) => {
    return await ServiceLog.find({ vehicleId });
};


/**
 * Release vehicle from shop
 * @param {string} id 
 * @returns {Promise<Vehicle>}
 */
export const releaseFromShop = async (id) => {
    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
        throw new Error("Vehicle not found");
    }

    if (vehicle.status !== "IN_SHOP") {
        throw new Error(`Vehicle is not IN_SHOP (Current status: ${vehicle.status})`);
    }

    vehicle.status = "AVAILABLE";
    await vehicle.save();
    return vehicle;
};