import API_URL from "./config";
import axios, { AxiosResponse } from "axios";

interface GoogleLoginResponse {
    accessToken: string;
    refreshToken: string;
    id: string;
}

const googleLoginRequest = async (code: string) => {
    try {
        const response: AxiosResponse<GoogleLoginResponse> = await axios.get(`${API_URL}oauth/google?code=${code}`);
        const { accessToken, refreshToken, id } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', id);
    } catch (error) {
        console.error('Error during Google OAuth login: ', error);
    }
};

export default googleLoginRequest;

// const googleLoginRequest = async (code: string): Promise<AxiosResponse<GoogleLoginResponse>> => {

//     try {
//         console.log('google login request received')
//         const response: AxiosResponse<GoogleLoginResponse> = await axios.post(`${API_URL}oauth/google`, { code });
//         console.log('login request response received')
//         console.log(response.data)
//         //store tokens in local storage
//         localStorage.setItem('accessToken', response.data.accessToken);
//         localStorage.setItem('refreshToken', response.data.refreshToken);
//         //store user in local storage
//         console.log(response.data.id)
//         localStorage.setItem('userId', response.data.id);

//         return response;
//     } catch (error: any) {
//         console.error(error);
//         throw error;
//     }
// }

// export default googleLoginRequest;