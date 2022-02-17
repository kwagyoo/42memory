import client from './client';
import { resData, signData, signInFetch, signUpData } from '../types/types';

export const Fetch42 = async (code: string): Promise<any> => {
  const res: resData = await client.get(`/user/info`, {
    params: {
      code: code,
    },
  });
  console.log(res);
  return res;
};

export const signUp = async (data: signUpData): Promise<void> =>
  await client.post('/user', {
    accessToken: data.accessToken,
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
