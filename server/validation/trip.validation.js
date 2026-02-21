import { z } from "zod";

export const createTripSchema = z.object({
    vehicleId: z.string().min(1, "Vehicle ID is required"),
    driverId: z.string().min(1, "Driver ID is required"),
    cargoWeight: z.number().positive("Cargo weight must be positive"),
    startLocation: z.string().min(1, "Start location is required"),
    endLocation: z.string().min(1, "End location is required"),
    startOdometer: z.number().nonnegative("Start odometer must be non-negative"),
});

export const updateTripSchema = z.object({
    vehicleId: z.string().optional(),
    driverId: z.string().optional(),
    cargoWeight: z.number().positive().optional(),
    startLocation: z.string().optional(),
    endLocation: z.string().optional(),
    status: z.enum(["DRAFT", "DISPATCHED", "COMPLETED", "CANCELLED"]).optional(),
    startOdometer: z.number().nonnegative().optional(),
    endOdometer: z.number().nonnegative().optional(),
});

export const updateTripStatusSchema = z.object({
    status: z.enum(["DISPATCHED", "COMPLETED", "CANCELLED"]),
    endOdometer: z.number().nonnegative().optional(),
});
