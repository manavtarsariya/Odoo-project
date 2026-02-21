import { createSlice } from "@reduxjs/toolkit";

const tripSlice = createSlice({
    name: "trip",
    initialState: {
        trips: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchTripsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchTripsSuccess: (state, action) => {
            state.loading = false;
            state.trips = action.payload;
        },
        fetchTripsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        createTripRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        createTripSuccess: (state, action) => {
            state.loading = false;
            state.trips.unshift(action.payload);
        },
        createTripFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateTripStatusRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateTripStatusSuccess: (state, action) => {
            state.loading = false;
            const index = state.trips.findIndex((t) => t._id === action.payload._id);
            if (index !== -1) {
                state.trips[index] = action.payload;
            }
        },
        updateTripStatusFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchTripsRequest,
    fetchTripsSuccess,
    fetchTripsFailure,
    createTripRequest,
    createTripSuccess,
    createTripFailure,
    updateTripStatusRequest,
    updateTripStatusSuccess,
    updateTripStatusFailure,
} = tripSlice.actions;

export default tripSlice.reducer;
