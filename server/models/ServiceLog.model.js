import mongoose from "mongoose";

const serviceLogSchema = new mongoose.Schema(
    {
        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Service log must be assigned to a manager"],
        },
        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: [true, "Service log must be linked to a vehicle"],
        },
        description: {
            type: String,
            required: [true, "Please add a description of the service"],
            trim: true,
        },
        cost: {
            type: Number,
            required: [true, "Please add the service cost"],
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

const ServiceLog = mongoose.model("ServiceLog", serviceLogSchema);

export default ServiceLog;
