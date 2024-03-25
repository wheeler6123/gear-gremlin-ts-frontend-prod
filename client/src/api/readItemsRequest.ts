import API_URL from './config';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Item } from '../types/types';

type ResponseData = Item[];

const readItemsRequest = async (): Promise<ResponseData> => {
    try {
        const token: string = localStorage.getItem('accessToken') || '';
        const userId: string = localStorage.getItem('userId') || '';

        const response: AxiosResponse<ResponseData> = await axios.get(`${API_URL}items?userId=${userId}`, {
            headers: {
                'x-access-token': token,
            },
        });
        console.log(response)

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default readItemsRequest;