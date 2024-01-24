import { parseTwitchEmotes } from "./twitch-emotes";
import { loadBttvEmotes, parseBttvEmotes } from "./bttv-emotes";
import type {
  EmoteParserOptions,
  EmotePositions,
  EmotesParserItem,
  ParsedEmotesMessage,
} from "../types";

const emoteParsers: EmotesParserItem[] = [
  {
    provider: "twitch",
    parse: parseTwitchEmotes,
    load: async () => {},
  },
  {
    provider: "bttv",
    parse: parseBttvEmotes,
    load: loadBttvEmotes,
  },
];

export const parseEmotes = async (
  message: string,
  _emotePositions: EmotePositions | null,
  _options: Partial<EmoteParserOptions> | null = null,
) => {
  const emotePositions: EmotePositions = _emotePositions || {};
  const options: EmoteParserOptions = {
    channelId: null,
    ..._options,
    providers: {
      twitch: true,
      bttv: true,
      ffz: true,
      ..._options?.providers,
    },
  };

  const parsedMessage = await emoteParsers.reduce(
    async (messagePromise, parser) => {
      const message = await messagePromise;
      if (!options.providers?.[parser.provider]) return message;
      return parser.parse(message, emotePositions, options);
    },
    prepare(message),
  );

  return {
    toArray: () => parsedMessage,
    toHTML: (scale = 1) =>
      parsedMessage
        .map((message) => {
          if (!message.emote) return message.content;
          const emoteURL = message.emote.images[scale];
          return `<img src="${emoteURL}" alt="${message.content}" />`;
        })
        .join(" "),
  };
};

const prepare = async (message: string): Promise<ParsedEmotesMessage> => {
  let currentPos = 0;
  return message.split(" ").map((content) => {
    const position = `${currentPos}-${currentPos + content.length - 1}`;
    currentPos += content.length + 1;
    return { content, position };
  });
};

export const reloadEmotes = async (channelId: string | null) => {
  emoteParsers.forEach(async (parser) => {
    await parser.load(channelId, true);
  });
};
