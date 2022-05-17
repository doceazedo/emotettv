import { FfzEmotesResponse } from './emotes.types';

const baseUrl = 'https://api.betterttv.net/3/cached/frankerfacez';

export const fetchFfzEmotes = async (channelId: string) => {
  const errorMsg = 'Failed to fetch BTTV global emotes:';

  try {
    const resp = await fetch(`${baseUrl}/users/twitch/${channelId}`);
    const data: FfzEmotesResponse = await resp.json();
    return data;
  } catch (error) {
    console.error(errorMsg, error);
    return [];
  }
};
