import { makeEmoteParser } from "./make-emote-parser";
import { get7tvGlobalEmotes } from "../clients/7tv";
import type { EmotesParser } from "types";

export const stvMessageParser = makeEmoteParser(
  "seventv",
  [get7tvGlobalEmotes],
  (emoteId: string) =>
    ["1x", "2x", "3x", "4x"].map(
      (scale) => `https://cdn.7tv.app/emote/${emoteId}/${scale}.webp`,
    ),
);

export const stvOverlayParser: EmotesParser = {
  provider: "seventv",
  parse: async (message) => {
    return message.reduce(async (messagePromise, word, i, arr) => {
      const message = await messagePromise;

      if (word.emote && !word.emote.isZeroWidth) {
        if (!word.emote.overlays) {
          word.emote.overlays = [];
        }

        arr.slice(i + 1).some((nextWord) => {
          if (nextWord.emote && nextWord.emote.isZeroWidth) {
            console.log(word.content, nextWord.content);
            word?.emote?.overlays?.push({
              images: nextWord.emote.images,
              alt: nextWord.content,
            });
            arr.splice(i + 1, 1);
          } else {
            return true;
          }
        });

        return message;
      }
      return message;
    }, Promise.resolve(message));
  },
  load: async () => {},
};
