import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
    name: "report",
    initialState: {
        analytics: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchAnalyticsRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchAnalyticsSuccess: (state, action) => {
            state.loading = false;
            state.analytics = action.payload;
        },
        fetchAnalyticsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchAnalyticsRequest,
    fetchAnalyticsSuccess,
    fetchAnalyticsFailure,
} = reportSlice.actions;

export default reportSlice.reducer;
