import type {
  EmotesList,
  EmotesLoader,
  MessageParser,
  EmotesParser,
} from "../types";

export const makeEmoteParser = (
  name: string,
  loaders: ((channelId: string | null) => Promise<EmotesList>)[],
  getEmoteURLs: (emoteId: string) => string[],
): EmotesParser => {
  let emotesList: EmotesList = [];

  const load: EmotesLoader = async (channelId, force = false) => {
    const hasLoaded = emotesList.find((x) => x.channelId === channelId);
    if (hasLoaded && !force) return;
    emotesList = [
      ...emotesList,
      ...(await Promise.all(loaders.map((loader) => loader(channelId)))).flat(),
    ];
  };

  const parse: MessageParser = async (message, emotePositions, options) => {
    await load(options.channelId, false);
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
            images: getEmoteURLs(emote.id),
          },
        };
      }
      return word;
    });
  };

  return {
    provider: name,
    parse,
    load,
  };
};
