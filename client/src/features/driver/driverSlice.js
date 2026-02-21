import { createSlice } from "@reduxjs/toolkit";

const driverSlice = createSlice({
    name: "driver",
    initialState: {
        drivers: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchDriversRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchDriversSuccess: (state, action) => {
            state.loading = false;
            state.drivers = action.payload;
        },
        fetchDriversFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addDriverRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        addDriverSuccess: (state, action) => {
            state.loading = false;
            state.drivers.push(action.payload);
        },
        addDriverFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateDriverRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateDriverSuccess: (state, action) => {
            state.loading = false;
            const index = state.drivers.findIndex((d) => d._id === action.payload._id);
            if (index !== -1) {
                state.drivers[index] = action.payload;
            }
        },
        updateDriverFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateDriverStatusRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateDriverStatusSuccess: (state, action) => {
            state.loading = false;
            const index = state.drivers.findIndex((d) => d._id === action.payload._id);
            if (index !== -1) {
                state.drivers[index].status = action.payload.status;
            }
        },
        updateDriverStatusFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteDriverRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteDriverSuccess: (state, action) => {
            state.loading = false;
            state.drivers = state.drivers.filter((d) => d._id !== action.payload);
        },
        deleteDriverFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchDriversRequest,
    fetchDriversSuccess,
    fetchDriversFailure,
    addDriverRequest,
    addDriverSuccess,
    addDriverFailure,
    updateDriverRequest,
    updateDriverSuccess,
    updateDriverFailure,
    updateDriverStatusRequest,
    updateDriverStatusSuccess,
    updateDriverStatusFailure,
    deleteDriverRequest,
    deleteDriverSuccess,
    deleteDriverFailure,
} = driverSlice.actions;

export default driverSlice.reducer;
