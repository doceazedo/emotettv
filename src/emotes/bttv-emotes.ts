import { makeEmoteParser } from "./make-emote-parser";
import { getBttvChannelEmotes, getBttvGlobalEmotes } from "../clients/bttv";

export const bttvMessageParser = makeEmoteParser(
  "bttv",
  [getBttvChannelEmotes, getBttvGlobalEmotes],
  (emoteId: string) =>
    ["1x", "2x", "3x"].map(
      (scale) => `https://cdn.betterttv.net/emote/${emoteId}/${scale}`,
    ),
);
