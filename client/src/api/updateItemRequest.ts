import API_URL from "./config";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Item } from "../types/types";

const updateItemRequest = async ({ itemId, updatedValues }: { itemId: string; updatedValues: Item }): Promise<Item> => {
    try {
        const response = await axios.put(`${API_URL}items/${itemId}`, updatedValues);
        
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

export default updateItemRequest;