import API_URL from "./config";
import { UsageTag } from "../types/types";
import axios, { AxiosResponse } from "axios";

const createUsageTagRequest = async (newTag: string): Promise<UsageTag> => {
    const token: string = localStorage.getItem('accessToken') as string;
    const userId: string = localStorage.getItem('userId') as string;

    try {
        const response: AxiosResponse<UsageTag> = await axios.post(`${API_URL}/usageTags/user/${userId}`, {
            name: newTag,
            createdBy: userId,
        },
            {
                headers: {
                    'x-access-token': token,
                }
            });

        console.log('Usage Tag created successfully')
        console.log(response);

        return response.data;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

export default createUsageTagRequest;