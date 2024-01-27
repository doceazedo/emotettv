import type {
  EmotesList,
  FfzBadgesResponse,
  FfzChannelEmotesResponse,
  FfzGlobalEmotesResponse,
} from "types";

const BASE_URL = "https://api.frankerfacez.com/v1";

export const getFfzChannelEmotes = async (
  channelId: string | null,
): Promise<EmotesList> => {
  try {
    const resp = await fetch(`${BASE_URL}/room/id/${channelId}`);
    if (!resp.ok) throw Error();
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
    if (!resp.ok) throw Error();
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

export const getFfzBadges = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/badges`);
    if (!resp.ok) throw Error();
    const data = (await resp.json()) as FfzBadgesResponse;
    return data;
  } catch (error) {
    console.error(error);
    return {
      badges: [],
      users: {},
    };
  }
};
