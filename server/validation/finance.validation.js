import { z } from "zod";

export const createFuelLogSchema = z.object({
    vehicleId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid vehicle ID"),
    liters: z.number().min(0.1, "Liters must be at least 0.1"),
    cost: z.number().min(1, "Cost must be at least 1"),
    date: z.string().optional(),
});
