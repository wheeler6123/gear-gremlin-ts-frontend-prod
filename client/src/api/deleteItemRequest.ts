import API_URL from "./config";
import axios, { AxiosResponse } from "axios";


const deleteItemRequest = async (itemId: string): Promise<void> => {
    try {
        console.log('delete item request received')
        const response: AxiosResponse = await axios.delete(`${API_URL}items/${itemId}`);

        if(response) {
            console.log('delete item request successful')
            return;
        }

    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

export default deleteItemRequest;