import { getBttvChannelEmotes, getBttvGlobalEmotes } from "../clients/bttv";
import type { EmotesList, EmotesLoader, EmotesParser } from "../types";

let emotesList: EmotesList = [];

export const parseBttvEmotes: EmotesParser = async (
  message,
  emotePositions,
  options,
) => {
  await loadBttvEmotes(options.channelId, false);
  return message.map((word) => {
    const emote = emotesList.find(
      (x) =>
        x.code == word.content &&
        (x.channelId == options.channelId || x.channelId == null),
    );
    if (emote) {
      return {
        ...word,
        emote: {
          images: getEmoteURLs(emote.id, ["1x", "2x", "3x"]),
        },
      };
    }
    return word;
  });
};

export const loadBttvEmotes: EmotesLoader = async (
  channelId,
  force = false,
) => {
  const hasLoaded = emotesList.find((x) => x.channelId === channelId);
  if (hasLoaded && !force) return;
  emotesList = [
    ...emotesList,
    ...(
      await Promise.all([
        getBttvChannelEmotes(channelId),
        getBttvGlobalEmotes(),
      ])
    ).flat(),
  ];
};

const getEmoteURLs = (emoteId: string, scales: string[]) =>
  scales.map((scale) => `https://cdn.betterttv.net/emote/${emoteId}/${scale}`);
