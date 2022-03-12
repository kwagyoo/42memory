import client from './client';
import { resData, signData, signInFetch, signUpData } from '../types/types';
import { AxiosResponse } from 'axios';

export const fetch42 = async (code: string, type: string): Promise<resData> => {
  const res: AxiosResponse<resData> = await client.get(`/user/info`, {
    params: {
      code: code,
      type: type,
    },
  });
  return res.data;
};

export const signUp = async (data: signUpData): Promise<void> =>
  await client.post('/user', {
    // accessToken: data.accessToken,
    userClusterName: data.userClusterName,
    userPassword: data.userPassword,
    userDeadline: data.userDeadline,
    userEmail: data.userEmail,
  });

export const signIn = async (data: signData): Promise<signInFetch> => {
  const res = await client.get('/user', {
    params: {
      userClusterName: data.userClusterName,
      userPassword: data.userPassword,
    },
  });
  return res.data;
};

export const resetPassword = async (userEmail: string): Promise<void> =>
  await client.post('/user/password', {
    userEmail: userEmail,
  });
