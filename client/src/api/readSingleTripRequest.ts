import API_URL from "./config";
import axios, { AxiosResponse } from "axios";
import { Trip } from "../types/types";


const readSingleTripRequest = async (tripId: string): Promise<AxiosResponse<Trip>> => {
    try {
        const token: string | null = localStorage.getItem('accessToken');

        const response: AxiosResponse<Trip> = await axios.get(`${API_URL}trips/${tripId}`, {
            headers: {
                'x-access-token': token,
            }
        });

        console.log('single trip response:', response);
        return response;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

export default readSingleTripRequest;