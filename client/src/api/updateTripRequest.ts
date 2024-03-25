import API_URL from "./config";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Trip } from "../types/types";

const updateTripRequest = async (trip: Trip): Promise<Trip> => {
    try {
        const response: AxiosResponse<Trip> = await axios.put(`${API_URL}trips/${trip._id}`, trip);

        return response.data;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

export default updateTripRequest;