import {
  BttvChannelEmotesResponse,
  BttvGlobalEmotesResponse,
  EmotesList,
  BttvBadgesResponse,
} from "../types";

const BASE_URL = "https://api.betterttv.net/3";

export const getBttvChannelEmotes = async (
  channelId: string | null,
): Promise<EmotesList> => {
  try {
    const resp = await fetch(`${BASE_URL}/cached/users/twitch/${channelId}`);
    if (!resp.ok) throw Error();
    const data = (await resp.json()) as BttvChannelEmotesResponse;
    return [...data.channelEmotes, ...data.sharedEmotes].map((x) => ({
      id: x.id,
      code: x.code,
      channelId,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBttvGlobalEmotes = async (): Promise<EmotesList> => {
  try {
    const resp = await fetch(`${BASE_URL}/cached/emotes/global`);
    if (!resp.ok) throw Error();
    const data = (await resp.json()) as BttvGlobalEmotesResponse;
    return data.map((x) => ({
      id: x.id,
      code: x.code,
      channelId: null,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBttvBadges = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/cached/badges/twitch`);
    if (!resp.ok) throw Error();
    const data = (await resp.json()) as BttvBadgesResponse;
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
