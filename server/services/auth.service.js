import User from "../models/User.model.js";
import crypto from "crypto";

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

/**
 * Generate reset token for forgot password
 * @param {string} email 
 * @returns {Promise<string>} reset token
 */
export const forgotPassword = async (email) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("User with this email not found");
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    return resetToken;
};

/**
 * Reset password using token
 * @param {string} resetToken 
 * @param {string} password 
 * @returns {Promise<User>}
 */
export const resetPassword = async (resetToken, password) => {
    // Get hashed token
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        throw new Error("Invalid or expired token");
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return user;
};
