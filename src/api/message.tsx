import { AxiosResponse } from 'axios';
import { MessageData, SendMessageData, SimpleMessageData } from '../types/types';
import client from './client';

export const getUserClusterName = async (userID: string): Promise<string> => {
  const res = await client.get(`/user/${userID}/name`);
  return res.data.userClusterName;
};

export const getReceiverData = async (userID: string): Promise<string | null> => {
  try {
    const res = await client.get(`/user/${userID}/message/name`);
    return res.data.userClusterName;
  } catch (err) {
    return null;
  }
};

export const getMessageNickname = async (userID: string): Promise<SimpleMessageData[]> => {
  const res = await client.get(`/user/${userID}/message/simple`);
  return res.data.messages;
};

export const getMessage = async (userID: string): Promise<MessageData[]> => {
  const res = await client.get(`/user/${userID}/message`);
  return res.data.messages;
};

interface MessageCount {
  sendMessageCount: number;
}

export const sendMessage = async (data: SendMessageData): Promise<number> => {
  if (data.userID !== undefined) {
    const res: AxiosResponse<MessageCount> = await client.post(`/user/${data.userID}/message`, {
      //   accessToken: data.accessToken,
      senderNickname: data.senderNickname,
      messageTitle: data.messageTitle,
      messageText: data.messageText,
    });
    return res.data.sendMessageCount;
  }
  return 0;
};
