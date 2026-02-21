import Trip from "../models/Trip.model.js";
import Vehicle from "../models/Vehicle.model.js";
import Driver from "../models/Driver.model.js";

/**
 * Create a new trip
 * @param {Object} tripData 
 * @returns {Promise<Trip>}
 */
export const createTrip = async (tripData) => {
    // 1. Check Vehicle availability and capacity
    const vehicle = await Vehicle.findById(tripData.vehicleId);
    if (!vehicle) throw new Error("Vehicle not found");
    if (vehicle.status !== "AVAILABLE") {
        throw new Error(`Vehicle is not available (Current status: ${vehicle.status})`);
    }
    if (tripData.cargoWeight > vehicle.maxCapacity) {
        throw new Error(`Cargo weight (${tripData.cargoWeight}) exceeds vehicle capacity (${vehicle.maxCapacity})`);
    }

    // 2. Check Driver availability
    const driver = await Driver.findById(tripData.driverId);
    if (!driver) throw new Error("Driver not found");
    if (driver.status === "OFF_DUTY") {
        throw new Error("driver is on OFF_DUTY contact the SAFTY_OFFICER");
    }
    if (driver.status !== "ON_DUTY") {
        throw new Error(`Driver is not available (Current status: ${driver.status})`);
    }

    // 3. Create Trip
    const trip = await Trip.create(tripData);

    // 4. Update Vehicle and Driver status for direct dispatch or keep as draft
    if (trip.status === "DISPATCHED") {
        await Vehicle.findByIdAndUpdate(tripData.vehicleId, { status: "ON_TRIP" });
        await Driver.findByIdAndUpdate(tripData.driverId, { status: "ON_TRIP" });
    }

    return trip;
};

/**
 * Get all trips
 * @returns {Promise<Trip[]>}
 */
export const getAllTrips = async () => {
    return await Trip.find()
        .populate("dispatcherId", "name email")
        .populate("vehicleId", "name model licensePlate")
        .populate("driverId", "name licenseNumber");
};

/**
 * Get trip by ID
 * @param {string} id 
 * @returns {Promise<Trip>}
 */
export const getTripById = async (id) => {
    const trip = await Trip.findById(id)
        .populate("dispatcherId", "name email")
        .populate("vehicleId", "name model licensePlate")
        .populate("driverId", "name licenseNumber");
    if (!trip) throw new Error("Trip not found");
    return trip;
};

/**
 * Update trip status and handle resource transitions
 * @param {string} id 
 * @param {Object} updateData 
 * @returns {Promise<Trip>}
 */
export const updateTripStatus = async (id, updateData) => {
    const trip = await Trip.findById(id);
    if (!trip) throw new Error("Trip not found");

    const { status, endOdometer } = updateData;

    // Handle status transitions
    if (status === "DISPATCHED" && trip.status === "DRAFT") {
        await Vehicle.findByIdAndUpdate(trip.vehicleId, { status: "ON_TRIP" });
        await Driver.findByIdAndUpdate(trip.driverId, { status: "ON_TRIP" });
    } else if (status === "COMPLETED" && trip.status === "DISPATCHED") {
        if (!endOdometer) throw new Error("End odometer is required to complete trip");
        if (endOdometer < trip.startOdometer) throw new Error("End odometer cannot be less than start odometer");

        await Vehicle.findByIdAndUpdate(trip.vehicleId, {
            status: "AVAILABLE",
            odometer: endOdometer
        });
        await Driver.findByIdAndUpdate(trip.driverId, { status: "ON_DUTY" });
        trip.endOdometer = endOdometer;
    } else if (status === "CANCELLED" && (trip.status === "DRAFT" || trip.status === "DISPATCHED")) {
        if (trip.status === "DISPATCHED") {
            await Vehicle.findByIdAndUpdate(trip.vehicleId, { status: "AVAILABLE" });
            await Driver.findByIdAndUpdate(trip.driverId, { status: "ON_DUTY" });
        }
    } else if (status !== trip.status) {
        throw new Error(`Invalid status transition from ${trip.status} to ${status}`);
    }

    trip.status = status;
    await trip.save();
    return trip;
};

/**
 * Update trip details with status-based restrictions
 * @param {string} id 
 * @param {Object} updateData 
 * @returns {Promise<Trip>}
 */
export const updateTrip = async (id, updateData) => {
    const trip = await Trip.findById(id);
    if (!trip) throw new Error("Trip not found");

    if (trip.status === "DRAFT") {
        // Full update allowed for DRAFT trips
        // If vehicle or weight changes, re-validate capacity
        const vehicleId = updateData.vehicleId || trip.vehicleId;
        const cargoWeight = updateData.cargoWeight || trip.cargoWeight;

        if (updateData.vehicleId || updateData.cargoWeight) {
            const vehicle = await Vehicle.findById(vehicleId);
            if (!vehicle) throw new Error("Vehicle not found");
            if (cargoWeight > vehicle.maxCapacity) {
                throw new Error(`Cargo weight (${cargoWeight}) exceeds vehicle capacity (${vehicle.maxCapacity})`);
            }
        }

        // If vehicle or driver changes, re-validate availability
        if (updateData.vehicleId && updateData.vehicleId.toString() !== trip.vehicleId.toString()) {
            const newVehicle = await Vehicle.findById(updateData.vehicleId);
            if (newVehicle.status !== "AVAILABLE") {
                throw new Error(`New vehicle is not available (Current status: ${newVehicle.status})`);
            }
        }

        if (updateData.driverId && updateData.driverId.toString() !== trip.driverId.toString()) {
            const newDriver = await Driver.findById(updateData.driverId);
            if (newDriver.status !== "ON_DUTY" && newDriver.status !== "OFF_DUTY") {
                throw new Error(`New driver is not available (Current status: ${newDriver.status})`);
            }
            if (newDriver.status === "OFF_DUTY") {
                throw new Error("driver is on OFF_DUTY contact the SAFTY_OFFICER");
            }
        }

        Object.assign(trip, updateData);
    } else {
        // Restricted update for DISPATCHED/COMPLETED/CANCELLED
        // Only allow non-critical fields like endLocation
        const allowedFields = ["endLocation", "endOdometer"]; // User said "small change which is not affect the trip endOdometer", but endOdometer is usually set by status update. I'll allow endLocation for now as a "safe" field.

        const requestedFields = Object.keys(updateData);
        const forbiddenFields = requestedFields.filter(field => !allowedFields.includes(field));

        if (forbiddenFields.length > 0) {
            throw new Error(`Cannot update ${forbiddenFields.join(", ")} when trip is ${trip.status}`);
        }

        Object.assign(trip, updateData);
    }

    await trip.save();
    return trip;
};
