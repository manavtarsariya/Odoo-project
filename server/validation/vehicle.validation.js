import { z } from "zod";

export const createVehicleSchema = z.object({
    name: z.string().min(1, "Name is required"),
    model: z.string().min(1, "Model is required"),
    licensePlate: z.string().min(1, "License plate is required"),
    maxCapacity: z.number().positive("Max capacity must be positive"),
    odometer: z.number().nonnegative("Odometer must be non-negative").default(0),
    status: z.enum(["AVAILABLE", "ON_TRIP", "IN_SHOP", "RETIRED"]).optional(),
});

export const updateVehicleSchema = z.object({
    name: z.string().min(1).optional(),
    model: z.string().min(1).optional(),
    licensePlate: z.string().min(1).optional(),
    maxCapacity: z.number().positive().optional(),
    odometer: z.number().nonnegative().optional(),
    status: z.enum(["AVAILABLE", "ON_TRIP", "IN_SHOP", "RETIRED"]).optional(),
});
