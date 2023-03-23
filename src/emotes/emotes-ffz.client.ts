import fetch from 'cross-fetch';
import { FfzEmotesResponse } from './emotes.types';

const baseUrl = 'https://api.betterttv.net/3/cached/frankerfacez';

export const fetchGlobalFfzEmotes = async () => {
  const errorMsg = 'Failed to fetch FFZ global emotes:';

  try {
    const resp = await fetch(`${baseUrl}/emotes/global`);
    const data: FfzEmotesResponse = await resp.json();
    return data;
  } catch (error) {
    console.error(errorMsg, error);
    return [];
  }
};

export const fetchChannelFfzEmotes = async (channelId: string) => {
  const errorMsg = 'Failed to fetch FFZ channel emotes:';

  try {
    const resp = await fetch(`${baseUrl}/users/twitch/${channelId}`);
    const data: FfzEmotesResponse = await resp.json();
    return data;
  } catch (error) {
    console.error(errorMsg, error);
    return [];
  }
};
