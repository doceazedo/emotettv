type Emote = {
  id: string;
  code: string;
  imageType: string;
  userId?: string;
  user?: {
    id: string;
    name: string;
    displayName: string;
    providerId: string;
  };
};

type globalEmotesResponse = {
  id: string;
  code: string;
  imageType: string;
  userId: string;
}[];

type channelEmotesResponse = {
  id: string;
  bots: unknown[];
  avatar: string;
  channelEmotes: Emote[];
  sharedEmotes: Emote[];
};

const baseUrl = 'https://api.betterttv.net/3/cached';

export const getGlobalBttvEmotes = async () => {
  const resp = await fetch(`${baseUrl}/emotes/global`);
  const data: globalEmotesResponse = await resp.json();
  return data;
};

export const getChannelBttvEmotes = async (channelId: string) => {
  const resp = await fetch(`${baseUrl}/users/twitch/${channelId}`);
  const data: channelEmotesResponse = await resp.json();
  return data;
};
