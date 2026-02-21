import Vehicle from "../models/Vehicle.model.js";

/**
 * Create a new vehicle
 * @param {Object} vehicleData 
 * @returns {Promise<Vehicle>}
 */
export const createVehicle = async (vehicleData) => {
    // Check if license plate unique (though mongoose enforces it, good to check)
    const existingVehicle = await Vehicle.findOne({ licensePlate: vehicleData.licensePlate });
    if (existingVehicle) {
        throw new Error("Vehicle with this license plate already exists");
    }

    const vehicle = await Vehicle.create(vehicleData);
    return vehicle;
};

/**
 * Get all vehicles
 * @returns {Promise<Vehicle[]>}
 */
export const getAllVehicles = async () => {
    return await Vehicle.find().populate("managerId", "name email");
};

/**
 * Get vehicle by ID
 * @param {string} id 
 * @returns {Promise<Vehicle>}
 */
export const getVehicleById = async (id) => {
    const vehicle = await Vehicle.findById(id).populate("managerId", "name email");
    if (!vehicle) {
        throw new Error("Vehicle not found");
    }
    return vehicle;
};

/**
 * Update vehicle
 * @param {string} id 
 * @param {Object} updateData 
 * @returns {Promise<Vehicle>}
 */
export const updateVehicle = async (id, updateData) => {
    const vehicle = await Vehicle.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });

    if (!vehicle) {
        throw new Error("Vehicle not found");
    }

    return vehicle;
};

/**
 * Delete vehicle
 * @param {string} id 
 * @returns {Promise<void>}
 */
export const deleteVehicle = async (id) => {
    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) {
        throw new Error("Vehicle not found");
    }
    return vehicle;
};
