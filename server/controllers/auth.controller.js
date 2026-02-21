import jwt from "jsonwebtoken";
import * as authService from "../services/auth.service.js";
import sendResponse from "../utils/sendResponse.js";

// Get token from model, create cookie and send response 
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || "1d",
    });

    const options = {
        expires: new Date(
            Date.now() + (parseInt(process.env.JWT_COOKIE_EXPIRE) || 1) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === "production") {
        options.secure = true;
    }

    res.status(statusCode)
        .cookie("token", token, options);

    return sendResponse(res, statusCode, true, "Success", {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
    try {
        const user = await authService.createUser(req.body);
        sendTokenResponse(user, 201, res);
    } catch (err) {
        if (err.message === "User already exists") {
            return sendResponse(res, 400, false, err.message);
        }
        next(err);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authService.authenticateUser(email, password);
        sendTokenResponse(user, 200, res);
    } catch (err) {
        if (err.message === "Invalid credentials") {
            return sendResponse(res, 401, false, err.message);
        }
        next(err);
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
    try {
        const user = await authService.getUserById(req.user.id);
        return sendResponse(res, 200, true, "User retrieved successfully", user);
    } catch (err) {
        next(err);
    }
};

// @desc    Log user out / clear cookie
// @route   GET /api/auth/logout
// @access  Private
export const logout = async (req, res, next) => {
    res.cookie("token", "none", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });

    return sendResponse(res, 200, true, "User logged out successfully");
};
