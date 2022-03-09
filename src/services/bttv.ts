export type Emote = {
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

export type GlobalEmotesResponse = {
  id: string;
  code: string;
  imageType: string;
  userId: string;
}[];

export type ChannelEmotesResponse = {
  id: string;
  bots: unknown[];
  avatar: string;
  channelEmotes: Emote[];
  sharedEmotes: Emote[];
};

const baseUrl = 'https://api.betterttv.net/3/cached';

export const getGlobalBttvEmotes = async () => {
  const resp = await fetch(`${baseUrl}/emotes/global`);
  const data: GlobalEmotesResponse = await resp.json();
  return data;
};

export const getChannelBttvEmotes = async (channelId: string) => {
  const resp = await fetch(`${baseUrl}/users/twitch/${channelId}`);
  const data: ChannelEmotesResponse = await resp.json();
  return data;
};
