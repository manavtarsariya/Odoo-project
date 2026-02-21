import { z } from "zod";

export const createDriverSchema = z.object({
    name: z.string().min(1, "Name is required"),
    licenseNumber: z.string().min(1, "License number is required"),
    licenseExpiry: z.string().pipe(z.coerce.date()),
    category: z.array(z.enum(["VAN", "CAR", "RIKSHOW", "TRUCK", "OTHER"])).min(1, "At least one category is required"),
    safetyScore: z.number().min(0).max(100).optional(),
    status: z.enum(["ON_DUTY", "OFF_DUTY", "SUSPENDED"]).optional(),
});

export const updateDriverSchema = z.object({
    name: z.string().min(1).optional(),
    licenseNumber: z.string().min(1).optional(),
    licenseExpiry: z.string().pipe(z.coerce.date()).optional(),
    category: z.array(z.enum(["VAN", "CAR", "RIKSHOW", "TRUCK", "OTHER"])).min(1).optional(),
    safetyScore: z.number().min(0).max(100).optional(),
    status: z.enum(["ON_DUTY", "OFF_DUTY", "SUSPENDED"]).optional(),
});

export const updateDriverStatusSchema = z.object({
    status: z.enum(["ON_DUTY", "OFF_DUTY", "SUSPENDED"]),
});

export const updateSafetyScoreSchema = z.object({
    safetyScore: z.number().min(0, "Safety score cannot be less than 0").max(100, "Safety score cannot exceed 100"),
});