import client from './client';
import { infoData, resData, signData, signInFetch, signUpData } from '../types/types';

export const startRegister = async (code: string): Promise<{ info: infoData; accessToken: string }> => {
  const res: resData = await client.post('https://api.intra.42.fr/oauth/token', {
    grant_type: 'authorization_code',
    client_id: process.env.REACT_APP_REGISTER_CLIENT_UID,
    client_secret: process.env.REACT_APP_REGISTER_CLIENT_SERECT,
    code: code,
    redirect_uri: 'http://localhost:3000/register',
  });
  const info42 = await client.get('https://api.intra.42.fr/v2/me', {
    headers: {
      Authorization: `Bearer ${res.data.access_token}`,
    },
  });

  return { info: info42, accessToken: res.data.access_token };
};

export const checkUser = async (code: string): Promise<{ ClusterName: string; accessToken: string }> => {
  const res: resData = await client.post('https://api.intra.42.fr/oauth/token', {
    grant_type: 'authorization_code',
    client_id: process.env.REACT_APP_MESSAGE_CLIENT_UID,
    client_secret: process.env.REACT_APP_MESSAGE_CLIENT_SERECT,
    code: code,
    redirect_uri: 'http://localhost:3000/redirect',
  });
  const info42 = await client.get('https://api.intra.42.fr/v2/me', {
    headers: {
      Authorization: `Bearer ${res.data.access_token}`,
    },
  });
  return { ClusterName: info42.data.login, accessToken: res.data.access_token };
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
