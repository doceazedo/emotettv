import { EmotesList, StvGlobalEmotesResponse } from "../types";

const BASE_URL = "https://7tv.io/v3";

export const get7tvGlobalEmotes = async (): Promise<EmotesList> => {
  try {
    const resp = await fetch(`${BASE_URL}/emote-sets/global`);
    const data = (await resp.json()) as StvGlobalEmotesResponse;
    return data.emotes.map((x) => ({
      id: x.id,
      code: x.name,
      isZeroWidth: (x.flags || 0 & 256) !== 0,
      channelId: null,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};
