import API_URL from "./config";
import axios, { AxiosResponse } from "axios";
import { Item } from "../types/types";


const readSingleItemRequest = async (itemId: string): Promise<AxiosResponse<Item>> => {
    try {
        const token: string | null = localStorage.getItem('accessToken');

        const response: AxiosResponse<Item> = await axios.get(`${API_URL}items/${itemId}`, {
            headers: {
                'x-access-token': token,
            }
        });

        console.log('single item response:', response);
        return response;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

export default readSingleItemRequest;