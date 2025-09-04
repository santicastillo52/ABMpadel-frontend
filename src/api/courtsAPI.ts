import axios from 'axios';
import type { Court } from '../models/court.model';
import { environment } from '../environment/environment';
const courtsApi =  axios.create({
    baseURL: environment.apiUrl
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

export const updateCourt = async (id: number, court: FormData): Promise<Court> => {
    const res = await courtsApi.put(`/court/${id}`, court, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
}

export const deleteCourt = async (id: number): Promise<void> => {
    await courtsApi.delete(`/court/${id}`);
}