import type {
  EmotesList,
  FfzChannelEmotesResponse,
  FfzGlobalEmotesResponse,
} from "types";

const BASE_URL = "https://api.frankerfacez.com/v1";

export const getFfzChannelEmotes = async (
  channelId: string | null,
): Promise<EmotesList> => {
  try {
    const resp = await fetch(`${BASE_URL}/room/id/${channelId}`);
    const data = (await resp.json()) as FfzChannelEmotesResponse;
    return Object.values(data.sets)
      .map((set) =>
        set.emoticons.map((emote) => ({
          id: `${emote.id}`,
          code: emote.name,
          channelId,
        })),
      )
      .flat();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getFfzGlobalEmotes = async (): Promise<EmotesList> => {
  try {
    const resp = await fetch(`${BASE_URL}/set/global`);
    const data = (await resp.json()) as FfzGlobalEmotesResponse;
    return Object.values(data.sets)
      .map((set) =>
        set.emoticons.map((emote) => ({
          id: `${emote.id}`,
          code: emote.name,
          channelId: null,
        })),
      )
      .flat();
  } catch (error) {
    console.error(error);
    return [];
  }
};
