import { takeLatest, put, call } from "redux-saga/effects";
import {
    fetchTripsRequest,
    fetchTripsSuccess,
    fetchTripsFailure,
    createTripRequest,
    createTripSuccess,
    createTripFailure,
    updateTripStatusRequest,
    updateTripStatusSuccess,
    updateTripStatusFailure,
} from "./tripSlice";
import {
    fetchTrips,
    createTrip,
    updateTripStatus,
} from "../../api/trip.service";
import { toast } from "react-hot-toast";

function* fetchTripsWorker() {
    try {
        const res = yield call(fetchTrips);
        if (res.data.success) {
            yield put(fetchTripsSuccess(res.data.data));
        } else {
            throw res.data.message || "Failed to fetch trips";
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || error.message || "Failed to fetch trips";
        yield put(fetchTripsFailure(errorMsg));
        toast.error(errorMsg);
    }
}

function* createTripWorker(action) {
    try {
        const res = yield call(createTrip, action.payload);
        if (res.data.success) {
            yield put(createTripSuccess(res.data.data));
            toast.success("Trip created successfully");
        } else {
            throw res.data.message || "Failed to create trip";
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || error.message || "Failed to create trip";
        yield put(createTripFailure(errorMsg));
        toast.error(errorMsg);
    }
}

function* updateTripStatusWorker(action) {
    try {
        const { id, status, endOdometer } = action.payload;
        const res = yield call(updateTripStatus, id, { status, endOdometer });
        if (res.data.success) {
            yield put(updateTripStatusSuccess(res.data.data));
            toast.success(`Trip status updated to ${status}`);
        } else {
            throw res.data.message || "Failed to update trip status";
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || error.message || "Failed to update trip status";
        yield put(updateTripStatusFailure(errorMsg));
        toast.error(errorMsg);
    }
}

export function* tripSaga() {
    yield takeLatest(fetchTripsRequest.type, fetchTripsWorker);
    yield takeLatest(createTripRequest.type, createTripWorker);
    yield takeLatest(updateTripStatusRequest.type, updateTripStatusWorker);
}
