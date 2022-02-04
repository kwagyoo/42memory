import { resData } from './auth';
import client from './client';

export interface FetchMessage {
  [key: string]: [];
}

export const getUserClusterName = async (userID: string): Promise<resData> => await client.get(`/name/${userID}`);

export const getMessageNickname = async (userClusterName: string): Promise<FetchMessage> => {
  const res = await client.get(`/${userClusterName}/message/simple`);
  return res.data;
};

export const getMessage = async (userClusterName: string): Promise<FetchMessage> => {
  const res = await client.get(`/${userClusterName}/message`);
  return res.data;
};
