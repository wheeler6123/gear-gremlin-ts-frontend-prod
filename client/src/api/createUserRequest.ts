import API_URL from "./config";
import axios, { AxiosResponse } from "axios";
import { User } from "../types/types";


const createUserRequest = async (email: string, password: string): Promise<AxiosResponse<User>> => {
    const lowerCaseEmail: string = email.toLowerCase();
    console.log('Creating user with email: ', lowerCaseEmail);

    try {
        const response: AxiosResponse<User> = await axios.post(`${API_URL}register`, { email: lowerCaseEmail, password });

        console.log('User created successfully')

        return response;
    } catch (error: any) {
        console.error(error);
        throw error;
    }
}

export default createUserRequest;