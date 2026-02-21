import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {
    fetchAnalyticsRequest,
    fetchAnalyticsSuccess,
    fetchAnalyticsFailure,
} from "./reportSlice";

const API_URL = "http://localhost:3000/api/reports";

function* fetchAnalyticsWorker() {
    try {
        const res = yield call(axios.get, `${API_URL}/analytics`, {
            withCredentials: true,
        });
        if (res.data.success) {
            yield put(fetchAnalyticsSuccess(res.data.data));
        } else {
            throw res.data.message || "Failed to fetch analytics";
        }
    } catch (error) {
        yield put(fetchAnalyticsFailure(error?.response?.data?.message || error.message));
    }
}

export default function* reportSaga() {
    yield takeLatest(fetchAnalyticsRequest.type, fetchAnalyticsWorker);
}
