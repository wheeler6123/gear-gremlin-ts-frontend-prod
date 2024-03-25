import API_URL from "./config";
import axios, { AxiosResponse } from "axios";
import { Item, Trip } from "../types/types";



const createTripRequest = async (userId: string, tripName: string, packedItems: Item[], totalWeight: number): Promise<AxiosResponse<Trip>> => {
    try {
        const response: AxiosResponse<Trip> = await axios.post(`${API_URL}trips`, { 
            name: tripName,
            items: packedItems,
            totalWeight: totalWeight,
            userId
         },
            {
                headers: {
                    'x-access-token': localStorage.getItem('accessToken'),
                }
            });

        console.log('Trip created successfully')
        console.log(response);

        return response;        
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

export default createTripRequest;