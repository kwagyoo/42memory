import { ParsedQs } from 'qs';
import client from './client';

interface resData {
  data: {
    access_token: string;
  };
}

interface signUpData {
  userClusterName: string;
  code: string | ParsedQs | string[] | ParsedQs[] | undefined;
}
export const startRegister = async (code: string | ParsedQs | string[] | ParsedQs[] | undefined): Promise<any> => {
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

  return info42;
};

export const signUp = async (data: signUpData): Promise<any> =>
  await client.post(`/${data.userClusterName}`, {
    code: data.code,
    userPassword: '123',
    userDeadline: '2022-01-29',
    userEmail: 'kwag93@naver.com',
  });
