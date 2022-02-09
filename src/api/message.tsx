import { resData } from './auth';
import client from './client';

export interface FetchMessage {
  [key: string]: [];
}

export const getUserClusterName = async (userID: string): Promise<resData> => await client.get(`/user/${userID}/name`);

export const getMessageNickname = async (userID: string): Promise<FetchMessage> => {
  const res = await client.get(`/user/${userID}/message/simple`);
  return res.data;
};

export const getMessage = async (userID: string): Promise<FetchMessage> => {
  const res = await client.get(`/user/${userID}/message`);
  return res.data;
};

interface messageData {
  code: string;
  userID: string;
  senderNickname: string;
  messageTitle: string;
  messageText: string;
}

export const sendMessage = async (data: messageData): Promise<FetchMessage> => {
  const res = await client.post(`/user/${data.userID}/message`, {
    code: data.code,
    senderNickname: data.senderNickname,
    messageTitle: data.messageTitle,
    messageText: data.messageText,
  });
  return res.data;
};
