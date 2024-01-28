import {
  EmotesList,
  StvChannelEmotesResponse,
  StvGlobalEmotesResponse,
} from "../types";

const BASE_URL = "https://7tv.io/v3";

export const get7tvChannelEmotes = async (
  channelId: string | null,
): Promise<EmotesList> => {
  if (!channelId) return [];
  try {
    const resp = await fetch(`${BASE_URL}/users/twitch/${channelId}`);
    if (!resp.ok) throw Error();
    const data = (await resp.json()) as StvChannelEmotesResponse;
    return data.emote_set.emotes.map((x) => ({
      id: x.id,
      code: x.name,
      isZeroWidth: (x.flags || 0 & 256) !== 0,
      channelId,
    }));
  } catch (error) {
    return [];
  }
};

export const get7tvGlobalEmotes = async (): Promise<EmotesList> => {
  try {
    const resp = await fetch(`${BASE_URL}/emote-sets/global`);
    if (!resp.ok) throw Error();
    const data = (await resp.json()) as StvGlobalEmotesResponse;
    return data.emotes.map((x) => ({
      id: x.id,
      code: x.name,
      isZeroWidth: (x.flags || 0 & 256) !== 0,
      channelId: null,
    }));
  } catch (error) {
    return [];
  }
};
