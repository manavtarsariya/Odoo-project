import { takeLatest, put, call } from "redux-saga/effects";
import {
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
    updateSafetyScoreRequest,
    updateSafetyScoreSuccess,
    updateSafetyScoreFailure,
    deleteDriverRequest,
    deleteDriverSuccess,
    deleteDriverFailure,
} from "./driverSlice";
import {
    fetchDrivers,
    addDriver,
    updateDriver,
    updateDriverStatus,
    updateSafetyScore,
    deleteDriver,
} from "../../api/driver.service";
import { toast } from "react-hot-toast";

function* fetchDriversWorker() {
    try {
        const res = yield call(fetchDrivers);
        if (res.data.success) {
            yield put(fetchDriversSuccess(res.data.data));
        } else {
            throw res.data.message || "Failed to fetch drivers";
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || error.message || "Failed to fetch drivers";
        yield put(fetchDriversFailure(errorMsg));
        toast.error(errorMsg);
    }
}

function* addDriverWorker(action) {
    try {
        const res = yield call(addDriver, action.payload);
        if (res.data.success) {
            yield put(addDriverSuccess(res.data.data));
            toast.success("Driver added successfully");
        } else {
            throw res.data.message || "Failed to add driver";
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || error.message || "Failed to add driver";
        yield put(addDriverFailure(errorMsg));
        toast.error(errorMsg);
    }
}

function* updateDriverWorker(action) {
    try {
        const { id, data } = action.payload;
        const res = yield call(updateDriver, id, data);
        if (res.data.success) {
            yield put(updateDriverSuccess(res.data.data));
            toast.success("Driver updated successfully");
        } else {
            throw res.data.message || "Failed to update driver";
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || error.message || "Failed to update driver";
        yield put(updateDriverFailure(errorMsg));
        toast.error(errorMsg);
    }
}

function* updateDriverStatusWorker(action) {
    try {
        const { id, status } = action.payload;
        const res = yield call(updateDriverStatus, id, status);
        if (res.data.success) {
            yield put(updateDriverStatusSuccess(res.data.data));
            toast.success("Status updated successfully");
        } else {
            throw res.data.message || "Failed to update status";
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || error.message || "Failed to update status";
        yield put(updateDriverStatusFailure(errorMsg));
        toast.error(errorMsg);
    }
}

function* updateSafetyScoreWorker(action) {
    try {
        const { id, safetyScore } = action.payload;
        const res = yield call(updateSafetyScore, id, safetyScore);
        if (res.data.success) {
            yield put(updateSafetyScoreSuccess(res.data.data));
            toast.success("Safety score updated successfully");
        } else {
            throw res.data.message || "Failed to update safety score";
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || error.message || "Failed to update safety score";
        yield put(updateSafetyScoreFailure(errorMsg));
        toast.error(errorMsg);
    }
}

function* deleteDriverWorker(action) {
    try {
        const id = action.payload;
        const res = yield call(deleteDriver, id);
        if (res.data.success) {
            yield put(deleteDriverSuccess(id));
            toast.success("Driver deleted successfully");
        } else {
            throw res.data.message || "Failed to delete driver";
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || error.message || "Failed to delete driver";
        yield put(deleteDriverFailure(errorMsg));
        toast.error(errorMsg);
    }
}

export function* driverSaga() {
    yield takeLatest(fetchDriversRequest.type, fetchDriversWorker);
    yield takeLatest(addDriverRequest.type, addDriverWorker);
    yield takeLatest(updateDriverRequest.type, updateDriverWorker);
    yield takeLatest(updateDriverStatusRequest.type, updateDriverStatusWorker);
    yield takeLatest(updateSafetyScoreRequest.type, updateSafetyScoreWorker);
    yield takeLatest(deleteDriverRequest.type, deleteDriverWorker);
}
