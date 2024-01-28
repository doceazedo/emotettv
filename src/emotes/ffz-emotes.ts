import { makeEmoteParser } from "./make-emote-parser";
import { getFfzChannelEmotes, getFfzGlobalEmotes } from "../clients/ffz";

export const ffzMessageParser = makeEmoteParser(
  "ffz",
  [getFfzChannelEmotes, getFfzGlobalEmotes],
  (emoteId: string) =>
    ["1", "2", "4"].map(
      (scale) => `https://cdn.frankerfacez.com/emote/${emoteId}/${scale}`,
    ),
);
