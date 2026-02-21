import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
    {
        dispatcherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Trip must be assigned to a dispatcher"],
        },
        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: [true, "Trip must have a vehicle"],
        },
        driverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Driver",
            required: [true, "Trip must have a driver"],
        },
        cargoWeight: {
            type: Number,
            required: [true, "Please add cargo weight"],
            min: [0, "Cargo weight cannot be negative"],
        },
        startLocation: {
            type: String,
            required: [true, "Please add a start location"],
            trim: true,
        },
        endLocation: {
            type: String,
            required: [true, "Please add an end location"],
            trim: true,
        },
        status: {
            type: String,
            enum: ["DRAFT", "DISPATCHED", "COMPLETED", "CANCELLED"],
            default: "DRAFT",
        },
        startOdometer: {
            type: Number,
            required: [true, "Please add starting odometer reading"],
        },
        endOdometer: {
            type: Number,
        },
        fuelConsumed: {
            type: Number,
            default: 0,
        },
        fuelCost: {
            type: Number,
            default: 0,
        },
        maintenanceCost: {
            type: Number,
            default: 0,
        },
        revenue: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
