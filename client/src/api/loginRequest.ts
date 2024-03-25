import API_URL from "./config";
import axios, { AxiosResponse } from "axios";

interface LoginResponse {
    token: string;
    refreshToken: string;
    id: string;
}

const loginRequest = async (email: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
    const lowerCaseEmail: string = email.toLowerCase();

    try {
        console.log('login request received')
        const response: AxiosResponse<LoginResponse> = await axios.post(`${API_URL}login`, { email: lowerCaseEmail, password });
        console.log('login request response received')
        console.log(response.data)
        //store tokens in local storage
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        //store user in local storage
        console.log(response.data.id)
        localStorage.setItem('userId', response.data.id);

        return response;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

export default loginRequest;