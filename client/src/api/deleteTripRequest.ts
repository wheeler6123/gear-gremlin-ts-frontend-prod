import API_URL from "./config";
import axios, { AxiosResponse } from "axios";
import { Trip } from "../types/types";

type ResponseData = Trip;

const deleteTripRequest = async (tripId: string): Promise<ResponseData> => {
    try {
        const response: AxiosResponse<ResponseData> = await axios.delete(`${API_URL}trips/${tripId}`);

        return response.data;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

export default deleteTripRequest;