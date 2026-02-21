import Driver from "../models/Driver.model.js";

/**
 * Create a new driver
 * @param {Object} driverData 
 * @returns {Promise<Driver>}
 */
export const createDriver = async (driverData) => {
    const existingDriver = await Driver.findOne({ licenseNumber: driverData.licenseNumber });
    if (existingDriver) {
        throw new Error("Driver with this license number already exists");
    }

    const driver = await Driver.create(driverData);
    return driver;
};

/**
 * Get all drivers
 * @returns {Promise<Driver[]>}
 */
export const getAllDrivers = async () => {
    return await Driver.find().populate("managerId", "name email");
};

/**
 * Get driver by ID
 * @param {string} id 
 * @returns {Promise<Driver>}
 */
export const getDriverById = async (id) => {
    const driver = await Driver.findById(id).populate("managerId", "name email");
    if (!driver) {
        throw new Error("Driver not found");
    }
    return driver;
};



/**
 * Update driver
 * @param {string} id 
 * @param {Object} updateData 
 * @returns {Promise<Driver>}
 */
export const updateDriver = async (id, updateData) => {
    const driver = await Driver.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });

    if (!driver) {
        throw new Error("Driver not found");
    }

    return driver;
};

/**
 * Delete driver
 * @param {string} id 
 * @returns {Promise<Driver>}
 */
export const deleteDriver = async (id) => {
    const driver = await Driver.findByIdAndDelete(id);
    if (!driver) {
        throw new Error("Driver not found");
    }
    return driver;
};
