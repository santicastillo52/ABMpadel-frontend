import axios from 'axios';
import type { Court } from '../models/court.model';

const courtsApi =  axios.create({
    baseURL: 'http://localhost:3000'
});

export const getCourts = async (): Promise<Court[]> => {
    const res = await courtsApi.get('/courts');
    return res.data;
}