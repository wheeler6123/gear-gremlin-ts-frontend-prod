import API_URL from "./config";
import axios, { AxiosResponse } from "axios";
import { UsageTag } from "../types/types";


const readUsageTagsRequest = async (): Promise<UsageTag[]> => {
    const token: string | null = localStorage.getItem('accessToken');
    const userId: string | null = localStorage.getItem('userId');

    if (!token || !userId) {
        throw new Error('User is not authenticated');
    }

    try {
        const response: AxiosResponse<UsageTag[]> = await axios.get(`${API_URL}/usageTags/user/${userId}`, {
            headers: {
                'x-access-token': token,
            }
        });

        const usageTags = response.data;

        console.log('response:', usageTags);
        return usageTags;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

export default readUsageTagsRequest;