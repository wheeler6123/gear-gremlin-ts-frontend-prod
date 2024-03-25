import API_URL from "./config";
import axios, { AxiosResponse } from "axios";
import { CategoryTag } from "../types/types";


const readCategoryTagsRequest = async (): Promise<CategoryTag[]> => {
    const token: string | null = localStorage.getItem('accessToken');
    const userId: string | null = localStorage.getItem('userId');

    if (!token || !userId) {
        throw new Error('User is not authenticated');
    }

    try {
        const response: AxiosResponse<CategoryTag[]> = await axios.get(`${API_URL}/categoryTags/user/${userId}`, {
            headers: {
                'x-access-token': token,
            }
        });

        const categoryTags = response.data;

        console.log('response:', categoryTags);
        return categoryTags;
    } catch (error: any) {
        console.error('Error:', error);
        if (error.response) {
            console.error('Server responded with:', error.response.data);
        }
        throw error;
    }
}

export default readCategoryTagsRequest;