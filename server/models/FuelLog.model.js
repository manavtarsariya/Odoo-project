import mongoose from "mongoose";

const fuelLogSchema = new mongoose.Schema(
    {
        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: [true, "Fuel log must be linked to a vehicle"],
        },
        liters: {
            type: Number,
            required: [true, "Please add the number of liters"],
        },
        cost: {
            type: Number,
            required: [true, "Please add the fuel cost"],
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const FuelLog = mongoose.model("FuelLog", fuelLogSchema);

export default FuelLog;
