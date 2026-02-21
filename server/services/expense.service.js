import mongoose from "mongoose";
import Expense from "../models/Expense.model.js";

/**
 * Get total operational cost for a vehicle
 * @param {string} vehicleId 
 * @returns {Promise<number>}
 */
export const getVehicleTotalCost = async (vehicleId) => {
    const result = await Expense.aggregate([
        { $match: { vehicleId: new mongoose.Types.ObjectId(vehicleId) } },
        { $group: { _id: "$vehicleId", totalCost: { $sum: "$amount" } } }
    ]);

    return result.length > 0 ? result[0].totalCost : 0;
};

/**
 * Get expenses report summary
 * @returns {Promise<Array>}
 */
export const getExpenseSummary = async () => {
    return await Expense.aggregate([
        {
            $group: {
                _id: "$type",
                totalAmount: { $sum: "$amount" },
                count: { $sum: 1 }
            }
        }
    ]);
};
