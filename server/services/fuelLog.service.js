import FuelLog from "../models/FuelLog.model.js";
import Vehicle from "../models/Vehicle.model.js";
import Expense from "../models/Expense.model.js";

/**
 * Create a new fuel log and an associated expense
 * @param {Object} fuelData 
 * @returns {Promise<FuelLog>}
 */
export const createFuelLog = async (fuelData) => {
    // 1. Check if vehicle exists
    const vehicle = await Vehicle.findById(fuelData.vehicleId);
    if (!vehicle) {
        throw new Error("Vehicle not found");
    }

    // 2. Create the fuel log
    const fuelLog = await FuelLog.create(fuelData);

    // 3. Create a corresponding expense entry
    await Expense.create({
        vehicleId: fuelLog.vehicleId,
        financeAdderId: fuelLog.financerId,
        type: "FUEL",
        amount: fuelLog.cost,
        referenceId: fuelLog._id,
        date: fuelLog.date
    });

    return fuelLog;
};

/**
 * Get all fuel logs
 * @returns {Promise<Array>}
 */
export const getAllFuelLogs = async () => {
    return await FuelLog.find().populate("vehicleId", "name licensePlate");
};
