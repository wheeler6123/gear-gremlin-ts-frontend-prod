import API_URL from "./config";
import axios, { AxiosResponse } from "axios";

interface LogoutResponse {
    message: string;
}

const logoutRequest = async (refreshToken: string): Promise<AxiosResponse<LogoutResponse>> => {
    try {
        const response: AxiosResponse<LogoutResponse> = await axios.post(`${API_URL}logout`, {
            refreshToken
        });

        console.log(response.data.message);

        //remove tokens from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        //remove user from local storage
        localStorage.removeItem('userId');

        return response;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

export default logoutRequest;