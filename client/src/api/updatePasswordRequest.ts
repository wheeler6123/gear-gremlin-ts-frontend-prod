import API_URL from "./config";
import axios, { AxiosResponse } from "axios";
import { User } from "../types/types";

const updatePasswordRequest = async (userId: string, newPassword: string): Promise<AxiosResponse<User>> => {
    try {
        console.log('sending password change request', userId, newPassword)

        const response = await axios.put(`${API_URL}changePassword`, { userId, newPassword });
        console.log('password change response', response)
        return response.data;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

export default updatePasswordRequest;