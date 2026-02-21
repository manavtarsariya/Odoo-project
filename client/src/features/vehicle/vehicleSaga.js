import { takeLatest, put, call } from "redux-saga/effects";
import {
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
} from "./vehicleSlice";
import { fetchVehicles, addVehicle, updateVehicle, deleteVehicle } from "../../api/vehicle.service";
import { toast } from "react-hot-toast";

function* fetchVehiclesWorker() {
    try {
        const res = yield call(fetchVehicles);
        if (res.data.success) {
            yield put(fetchVehiclesSuccess(res.data.data));
        } else {
            throw res.data.message || "Failed to fetch vehicles";
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || error.message || "Failed to fetch vehicles";
        yield put(fetchVehiclesFailure(errorMsg));
        toast.error(errorMsg);
    }
}

function* addVehicleWorker(action) {
    try {
        const res = yield call(addVehicle, action.payload);
        if (res.data.success) {
            yield put(addVehicleSuccess(res.data.data));
            toast.success("Vehicle added successfully");
        } else {
            throw res.data.message || "Failed to add vehicle";
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || error.message || "Failed to add vehicle";
        yield put(addVehicleFailure(errorMsg));
        toast.error(errorMsg);
    }
}

function* updateVehicleWorker(action) {
    try {
        const { id, data } = action.payload;
        const res = yield call(updateVehicle, id, data);
        if (res.data.success) {
            yield put(updateVehicleSuccess(res.data.data));
            toast.success("Vehicle updated successfully");
        } else {
            throw res.data.message || "Failed to update vehicle";
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || error.message || "Failed to update vehicle";
        yield put(updateVehicleFailure(errorMsg));
        toast.error(errorMsg);
    }
}

function* deleteVehicleWorker(action) {
    try {
        const id = action.payload;
        const res = yield call(deleteVehicle, id);
        if (res.data.success) {
            yield put(deleteVehicleSuccess(id));
            toast.success("Vehicle deleted successfully");
        } else {
            throw res.data.message || "Failed to delete vehicle";
        }
    } catch (error) {
        const errorMsg = error?.response?.data?.message || error.message || "Failed to delete vehicle";
        yield put(deleteVehicleFailure(errorMsg));
        toast.error(errorMsg);
    }
}

export function* vehicleSaga() {
    yield takeLatest(fetchVehiclesRequest.type, fetchVehiclesWorker);
    yield takeLatest(addVehicleRequest.type, addVehicleWorker);
    yield takeLatest(updateVehicleRequest.type, updateVehicleWorker);
    yield takeLatest(deleteVehicleRequest.type, deleteVehicleWorker);
}
