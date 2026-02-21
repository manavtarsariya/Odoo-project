import axios from "axios";
import api from "./axios";

export const fetchVehicles = () => {
  return axios.get(
    "http://localhost:3000/api/vehicles",
    {
      withCredentials: true, // 🔥 sends cookie automatically
    }
  );
};

export const addVehicle = (vehicleData) => {
  return axios.post(
    "http://localhost:3000/api/vehicles",
    vehicleData,
    {
      withCredentials: true, // 🔥 sends cookie automatically
    }
  );
};

export const updateVehicle = (id, vehicleData) => {
  return axios.put(`http://localhost:3000/api/vehicles/${id}`,
    vehicleData,
    {
      withCredentials: true, // 🔥 sends cookie automatically
    }
  );
};

export const deleteVehicle = (id) => {
  return axios.delete(`http://localhost:3000/api/vehicles/${id}`);
};
