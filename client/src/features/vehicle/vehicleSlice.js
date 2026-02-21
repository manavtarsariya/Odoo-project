import { createSlice } from "@reduxjs/toolkit";

const vehicleSlice = createSlice({
    name: "vehicle",
    initialState: {
        vehicles: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchVehiclesRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchVehiclesSuccess: (state, action) => {
            state.loading = false;
            state.vehicles = action.payload;
        },
        fetchVehiclesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addVehicleRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        addVehicleSuccess: (state, action) => {
            state.loading = false;
            state.vehicles.push(action.payload);
        },
        addVehicleFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateVehicleRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateVehicleSuccess: (state, action) => {
            state.loading = false;
            const index = state.vehicles.findIndex(v => v._id === action.payload._id);
            if (index !== -1) {
                state.vehicles[index] = action.payload;
            }
        },
        updateVehicleFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteVehicleRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteVehicleSuccess: (state, action) => {
            state.loading = false;
            state.vehicles = state.vehicles.filter(v => v._id !== action.payload);
        },
        deleteVehicleFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchVehiclesRequest,
    fetchVehiclesSuccess,
    fetchVehiclesFailure,
    addVehicleRequest,
    addVehicleSuccess,
    addVehicleFailure,
    updateVehicleRequest,
    updateVehicleSuccess,
    updateVehicleFailure,
    deleteVehicleRequest,
    deleteVehicleSuccess,
    deleteVehicleFailure,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;
