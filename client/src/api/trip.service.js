import axios from "axios";

export const fetchTrips = () => {
    return axios.get("http://localhost:3000/api/trips", {
        withCredentials: true,
    });
};

export const createTrip = (tripData) => {
    return axios.post("http://localhost:3000/api/trips", tripData, {
        withCredentials: true,
    });
};

export const updateTrip = (id, tripData) => {
    return axios.put(`http://localhost:3000/api/trips/${id}`, tripData, {
        withCredentials: true,
    });
};

export const updateTripStatus = (id, statusData) => {
    return axios.patch(`http://localhost:3000/api/trips/${id}/status`, statusData, {
        withCredentials: true,
    });
};
