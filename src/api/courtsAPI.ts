import axios from 'axios';
import type { Court } from '../models/court.model';

const courtsApi =  axios.create({
    baseURL: 'http://localhost:3000'
});

export const getCourts = async (): Promise<Court[]> => {
    const res = await courtsApi.get('/courts');
    return res.data;
}

export const getCourt = async(id: number): Promise<Court> => {
    const res = await courtsApi.get(`/court/${id}`);
    return res.data;
}

export const createCourt = async (court: FormData): Promise<Court> => {
    const res = await courtsApi.post('/court', court, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
}