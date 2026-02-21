import { z } from "zod";

export const createServiceLogSchema = z.object({
    vehicleId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid vehicle ID"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    cost: z.number().min(0, "Cost cannot be negative"),
    date: z.string().optional(),
});
