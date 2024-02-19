import API_URL from "./config";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Item } from "../types/types";

const updateItemRequest = async ({ itemId, updatedValues }: { itemId: string; updatedValues: Item }): Promise<Item> => {
    try {
        const response: AxiosResponse = await axios.put(`${API_URL}items/${itemId}`, updatedValues);
        
        return response.data;
    } catch (error: any) {
        const axiosError: AxiosError = error;
        console.error(axiosError.response?.data || axiosError.message);
        throw axiosError;
    }
}

export default updateItemRequest;