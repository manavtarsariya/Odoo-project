import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
    {
        managerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Driver must be assigned to a manager"],
        },
        name: {
            type: String,
            required: [true, "Please add a name"],
            trim: true,
        },
        licenseNumber: {
            type: String,
            required: [true, "Please add a license number"],
            unique: true,
            trim: true,
        },
        licenseExpiry: {
            type: Date,
            required: [true, "Please add a license expiry date"],
        },
        status: {
            type: String,
            enum: ["ON_DUTY", "OFF_DUTY", "SUSPENDED", "ON_TRIP"],
            default: "OFF_DUTY",
        },
        category: {
            type: [String],
            enum: ["VAN", "CAR", "RIKSHOW", "TRUCK", "OTHER"],
            validate: {
                validator: function (v) {
                    return v && v.length > 0;
                },
                message: "A driver must have at least one category.",
            },
        },
        safetyScore: {
            type: Number,
            default: 100,
            min: 0,
            max: 100,
        },
    },
    {
        timestamps: true,
    }
);

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;
