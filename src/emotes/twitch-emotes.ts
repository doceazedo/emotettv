import type { EmotesParser } from "../types";

export const parseTwitchEmotes: EmotesParser = async (
  message,
  emotePositions = {},
) => {
  return message.map((word) => {
    const emoteIdx = Object.values(emotePositions).findIndex((emotePos) =>
      emotePos.includes(word.position),
    );
    if (emoteIdx >= 0 && !word.emote) {
      const emoteId = Object.keys(emotePositions)[emoteIdx];
      return {
        ...word,
        emote: {
          images: getEmoteURLs(emoteId, ["1.0", "2.0", "3.0"]),
        },
      };
    }
    return word;
  });
};

const getEmoteURLs = (emoteId: string, scales: string[]) =>
  scales.map(
    (scale) =>
      `https://static-cdn.jtvnw.net/emoticons/v2/${emoteId}/default/dark/${scale}`,
  );
