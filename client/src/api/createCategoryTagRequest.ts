import API_URL from "./config";
import { CategoryTag } from "../types/types";
import axios, { AxiosResponse } from "axios";

const createCategoryTagRequest = async (newTag: string): Promise<CategoryTag> => {
    const token: string = localStorage.getItem('accessToken') as string;
    const userId: string = localStorage.getItem('userId') as string;

    try {
        const response: AxiosResponse<CategoryTag> = await axios.post(`${API_URL}/categoryTags/user/${userId}`, { 
            name: newTag,
            createdBy: userId,
         },
            {
                headers: {
                    'x-access-token': token,
                }
            });

        console.log('CategoryTag created successfully')
        console.log(response);

        return response.data;        
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

export default createCategoryTagRequest;