import { twitchMessageParser } from "./twitch-emotes";
import { bttvMessageParser } from "./bttv-emotes";
import { ffzMessageParser } from "./ffz-emotes";
import { stvMessageParser, stvOverlayParser } from "./7tv-emotes";
import type {
  EmoteParserOptions,
  EmotePositions,
  EmotesParser,
  ParsedEmotesMessage,
} from "../types";

const emoteParsers: EmotesParser[] = [
  twitchMessageParser,
  bttvMessageParser,
  ffzMessageParser,
  stvMessageParser,
  stvOverlayParser,
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
      seventv: true,
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
    toHTML: (scale = 1, inlineStyles = true) =>
      parsedMessage
        .map((message) => {
          if (!message.emote) return message.content;
          const emoteURL = message.emote.images[scale];
          const height = [24, 28, 32, 48][scale];
          const offset = [6, 8, 10, 20][scale] * -1;
          const overlays = (message.emote?.overlays || [])
            .map(
              (overlay) =>
                `<img class="emotettv-overlay" ${inlineStyles ? `style="position:absolute;top:0;left:0;height:${height}px"` : ""} src="${overlay.images[scale]}" alt="${overlay.alt}" />`,
            )
            .join("");
          return `<figure class="emotettv-emote" ${inlineStyles ? `style="position:relative;display:inline-block;margin:0"` : ""}><img class="emotettv-img" src="${emoteURL}" alt="${message.content}" ${inlineStyles ? `style="height:${height}px;margin-bottom:${offset}px"` : ""} />${overlays}</figure>`;
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
