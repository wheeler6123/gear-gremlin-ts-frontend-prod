import API_URL from "./config";
import axios, { AxiosResponse } from "axios";
import { Trip } from "../types/types";

type ResponseData = Trip[];


const readTripsRequest = async (): Promise<ResponseData> => {
    try {
        const token: string = localStorage.getItem('accessToken') || '';
        const userId: string = localStorage.getItem('userId') || '';

        console.log('requesting trips for userId:', userId);

        const response: AxiosResponse<ResponseData> = await axios.get(`${API_URL}trips?userId=${userId}`, {
            headers: {
                'x-access-token': token,
            }
        });

        console.log('response:', response);
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

export default readTripsRequest;