import express from "express";
import {
    register,
    login,
    getMe,
    logout,
    forgotPassword,
    resetPassword,
} from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
} from "../validation/auth.validation.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/logout", logout);
router.get("/me", protect, getMe);
router.post("/forgotpassword", validate(forgotPasswordSchema), forgotPassword);
router.put("/resetpassword/:resettoken", validate(resetPasswordSchema), resetPassword);

export default router;
