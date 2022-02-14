import { AxiosResponse } from 'axios';
import { MessageData, resData, SendMessageData, SimpleMessageData } from '../types/types';
import client from './client';

export const getUserClusterName = async (userID: string): Promise<resData> => await client.get(`/user/${userID}/name`);

export const getMessageNickname = async (userID: string): Promise<SimpleMessageData[]> => {
  const res = await client.get(`/user/${userID}/message/simple`);
  return res.data.messages;
};

export const getMessage = async (userID: string): Promise<MessageData[]> => {
  const res = await client.get(`/user/${userID}/message`);
  return res.data.messages;
};

interface MessageCount {
  sendMessageCount: Number;
}

export const sendMessage = async (data: SendMessageData): Promise<Number> => {
  if (data.userID !== undefined) {
    const res: AxiosResponse<MessageCount> = await client.post(`/user/${data.userID}/message`, {
      code: data.code,
      senderNickname: data.senderNickname,
      messageTitle: data.messageTitle,
      messageText: data.messageText,
    });
    return res.data.sendMessageCount;
  }
  return 0;
};
