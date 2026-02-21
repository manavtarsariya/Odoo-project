import Trip from "../models/Trip.model.js";
import Vehicle from "../models/Vehicle.model.js";

/**
 * Get operational analytics for all vehicles
 * @returns {Promise<Object[]>}
 */
export const getOperationalAnalytics = async () => {
    // 1. Fetch all vehicles
    const vehicles = await Vehicle.find();

    // 2. Aggregate data per vehicle
    const fullReport = await Promise.all(vehicles.map(async (vehicle) => {
        const trips = await Trip.find({ vehicleId: vehicle._id, status: "COMPLETED" });

        let totalRevenue = 0;
        let totalFuelCost = 0;
        let totalMaintenance = 0;
        let totalFuelConsumed = 0;
        let totalDistance = 0;

        trips.forEach(trip => {
            totalRevenue += trip.revenue || 0;
            totalFuelCost += trip.fuelCost || 0;
            totalMaintenance += trip.maintenanceCost || 0;
            totalFuelConsumed += trip.fuelConsumed || 0;

            if (trip.endOdometer && trip.startOdometer) {
                totalDistance += (trip.endOdometer - trip.startOdometer);
            }
        });

        // Calculations
        const fuelEfficiency = totalFuelConsumed > 0 ? (totalDistance / totalFuelConsumed).toFixed(2) : 0;

        // ROI: (Revenue - (Maintenance + Fuel)) / Acquisition Cost
        const netProfit = totalRevenue - (totalMaintenance + totalFuelCost);
        const roi = vehicle.acquisitionCost > 0 ? ((netProfit / vehicle.acquisitionCost) * 100).toFixed(2) : 0;

        return {
            vehicleId: vehicle._id,
            vehicleName: `${vehicle.name} (${vehicle.licensePlate})`,
            model: vehicle.model,
            acquisitionCost: vehicle.acquisitionCost,
            totalRevenue,
            totalFuelCost,
            totalMaintenance,
            totalFuelConsumed,
            totalDistance,
            fuelEfficiency,
            roi,
            tripCount: trips.length
        };
    }));

    return fullReport;
};
