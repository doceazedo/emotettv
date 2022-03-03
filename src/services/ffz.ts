export type emotesResponse = {
  id: number;
  user: {
    id: number;
    name: string;
    displayName: string;
  };
  code: string;
  images: {
    '1x': string;
    '2x': string;
    '4x': string;
  };
  imageType: string;
}[];

const baseUrl = 'https://api.betterttv.net/3/cached/frankerfacez';

export const getFfzEmotes = async (channelId: string) => {
  const resp = await fetch(`${baseUrl}/users/twitch/${channelId}`);
  const data: emotesResponse = await resp.json();
  return data;
};
