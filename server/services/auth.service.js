import User from "../models/User.model.js";

/**
 * Create a new user
 * @param {Object} userData 
 * @returns {Promise<User>}
 */
export const createUser = async (userData) => {
    const { name, email, password, role } = userData;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("User already exists");
    }

    // Create user
    const user = await User.create({
        name,
        email,
        password,
        role,
    });

    return user;
};

/**
 * Authenticate user
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<User>}
 */
export const authenticateUser = async (email, password) => {
    // Check for user
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new Error("Invalid credentials");
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    return user;
};

/**
 * Get user by ID
 * @param {string} id 
 * @returns {Promise<User>}
 */
export const getUserById = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};
