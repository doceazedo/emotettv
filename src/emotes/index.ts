import { twitchMessageParser } from "./twitch-emotes";
import { bttvMessageParser } from "./bttv-emotes";
import { ffzMessageParser } from "./ffz-emotes";
import { stvMessageParser, stvOverlayParser } from "./7tv-emotes";
import { loadOptions } from "../utils/load-options";
import { escape } from "../utils/escape-html";
import type {
  EmotePositions,
  EmotesParser,
  ParsedEmotesMessage,
  ParserOptions,
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
  _emotePositions: EmotePositions | null = null,
  _options: Partial<ParserOptions> | null = null,
) => {
  const emotePositions: EmotePositions = _emotePositions || {};
  const options = loadOptions(_options);

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
    toHTML: (scale = 1, inlineStyles = true, escapeHTML = true) =>
      parsedMessage
        .map((message) => {
          if (!message.emote)
            return escapeHTML ? escape(message.content) : message.content;
          const emoteURL =
            message.emote.images?.[scale] || message.emote.images[0];
          const height = [24, 28, 32, 48][scale];
          const offset = [6, 8, 10, 20][scale] * -1;
          const overlays = (message.emote?.overlays || [])
            .map(
              (overlay) =>
                `<img class="emotettv-overlay" ${inlineStyles ? `style="position:absolute;top:0;left:0;height:${height}px"` : ""} src="${overlay.images?.[scale] || overlay.images[0]}" alt="${overlay.alt}" />`,
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

export const reloadEmotes = async (
  _options: Partial<ParserOptions> | null = null,
) => {
  const options = loadOptions(_options);
  emoteParsers.forEach(async (parser) => {
    if (!options.providers?.[parser.provider]) return;
    await parser.load(options.channelId, true);
  });
};
