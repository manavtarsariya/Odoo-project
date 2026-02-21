import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
    {
        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Vehicle must be assigned to a manager"],
        },
        name: {
            type: String,
            required: [true, "Please add a vehicle name"],
            trim: true,
        },
        model: {
            type: String,
            required: [true, "Please add a vehicle model"],
            trim: true,
        },
        licensePlate: {
            type: String,
            required: [true, "Please add a license plate"],
            unique: true,   
            uppercase: true,
            trim: true,
        },
        maxCapacity: {
            type: Number,
            required: [true, "Please add max capacity"],
        },
        odometer: {
            type: Number,
            required: [true, "Please add odometer reading"],
            default: 0,
        },
        status: {
            type: String,
            enum: ["AVAILABLE", "ON_TRIP", "IN_SHOP", "RETIRED"],
            default: "AVAILABLE",
        },
    },
    {
        timestamps: true,
    }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;
