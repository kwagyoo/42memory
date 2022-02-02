import client from './client';

interface resData {
  data: {
    [key: string]: string;
  };
}

interface signUpData {
  userClusterName: string;
  userDeadline: string;
  userEmail?: string;
  userPassword?: string;
  accessToken: string;
}

interface signInData {
  userClusterName: string;
  userPassword: string;
}

export const startRegister = async (code: string): Promise<any> => {
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

export const signUp = async (data: signUpData): Promise<any> =>
  await client.post(`/${data.userClusterName}`, {
    accessToken: data.accessToken,
    userPassword: data.userPassword,
    userDeadline: data.userDeadline,
    userEmail: data.userEmail,
  });

export const signIn = async (data: signInData): Promise<any> =>
  await client.get(`/${data.userClusterName}`, {
    params: {
      userPassword: data.userPassword,
    },
  });