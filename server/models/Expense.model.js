import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        vehicleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Vehicle",
            required: [true, "Expense must be linked to a vehicle"],
        },
        financeAdderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User who added the expense is required"],
        },
        type: {
            type: String,
            enum: ["FUEL", "MAINTENANCE"],
            required: [true, "Expense type is required"],
        },
        amount: {
            type: Number,
            required: [true, "Expense amount is required"],
        },
        referenceId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, "Reference ID to source log is required"],
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

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
