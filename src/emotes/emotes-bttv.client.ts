import {
  BttvChannelEmotesResponse,
  BttvGlobalEmotesResponse,
} from './emotes.types';

const baseUrl = 'https://api.betterttv.net/3/cached';

export const fetchGlobalBttvEmotes = async () => {
  const errorMsg = 'Failed to fetch BTTV global emotes:';

  try {
    const resp = await fetch(`${baseUrl}/emotes/global`);
    const data: BttvGlobalEmotesResponse = await resp.json();
    return data;
  } catch (error) {
    console.error(errorMsg, error);
    return [];
  }
};

export const fetchChannelBttvEmotes = async (channelId: string) => {
  const errorMsg = 'Failed to fetch BTTV channel emotes:';
  const emptyResp: BttvChannelEmotesResponse = {
    channelEmotes: [],
    sharedEmotes: [],
  };

  try {
    const resp = await fetch(`${baseUrl}/users/twitch/${channelId}`);
    const data: BttvChannelEmotesResponse = await resp.json();
    if (!data?.id) {
      console.error(errorMsg, 'unknown channel');
      return emptyResp;
    }
    return data;
  } catch (error) {
    console.error(errorMsg, error);
    return emptyResp;
  }
};
