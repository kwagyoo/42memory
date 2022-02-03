import { resData } from './auth';
import client from './client';

export const getUserClusterName = async (userID: string): Promise<resData> => await client.get(`/name/${userID}`);
