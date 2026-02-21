import axios from "axios";

export const fetchDrivers = () => {
    return axios.get("http://localhost:3000/api/drivers", {
        withCredentials: true,
    });
};

export const addDriver = (driverData) => {
    return axios.post("http://localhost:3000/api/drivers", driverData, {
        withCredentials: true,
    });
};

export const updateDriver = (id, driverData) => {
    return axios.put(`http://localhost:3000/api/drivers/${id}`, driverData, {
        withCredentials: true,
    });
};

export const updateDriverStatus = (id, status) => {
    return axios.patch(`http://localhost:3000/api/drivers/${id}/status`, { status }, {
        withCredentials: true,
    });
};

export const deleteDriver = (id) => {
    return axios.delete(`http://localhost:3000/api/drivers/${id}`, {
        withCredentials: true,
    });
};
