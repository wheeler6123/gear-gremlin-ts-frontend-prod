import API_URL from "./config";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Trip } from "../types/types";

const updateTripRequest = async (trip: Trip): Promise<Trip> => {
    try {
        const response: AxiosResponse<Trip> = await axios.put(`${API_URL}trips/${trip._id}`, trip);

        return response.data;
    } catch (error: any) {
        const axiosError: AxiosError = error;
        console.error(axiosError.response?.data || axiosError.message);
        throw axiosError;
    }
}

export default updateTripRequest;