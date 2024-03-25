import API_URL from './config';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { NewItem } from '../types/types';

const createItemRequest = async (newItem: NewItem, userId: string) => {
    console.log('createItemRequest: ', newItem, userId)

    try {
        const response = await axios.post(
            `${API_URL}items`,
            {
                ...newItem,
                userId: userId,
            },
            {
                headers: {
                    'x-access-token': localStorage.getItem('accessToken'),
                },
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
}

export default createItemRequest;