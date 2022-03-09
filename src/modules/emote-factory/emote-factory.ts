import { getBttvEmotes, getFfzEmotes } from '../get-emotes';
import type { EmoteFactory } from '.';
import type { Emotes } from '../get-emotes';

let bttvEmotes: Emotes;
let ffzEmotes: Emotes;

export const getThirdPartyEmotes = async (channelId: string) => {
  if (bttvEmotes != null && ffzEmotes != null) return;
  bttvEmotes = await getBttvEmotes(channelId);
  ffzEmotes = await getFfzEmotes(channelId);
};

const twitchEmoteUrl = 'https://static-cdn.jtvnw.net/emoticons/v2';
const bttvEmoteUrl = 'https://cdn.betterttv.net/emote';
const ffzEmoteUrl = 'https://cdn.frankerfacez.com/emote';

export const emoteFactory = (twitchEmotes: Emotes): EmoteFactory[] => [
  {
    list: twitchEmotes,
    make: (code) => [
      `${twitchEmoteUrl}/${twitchEmotes[code]}/default/dark/1.0`,
      `${twitchEmoteUrl}/${twitchEmotes[code]}/default/dark/2.0`,
      `${twitchEmoteUrl}/${twitchEmotes[code]}/default/dark/3.0`,
    ],
  },
  {
    list: bttvEmotes,
    make: (code) => [
      `${bttvEmoteUrl}/${bttvEmotes[code]}/1x`,
      `${bttvEmoteUrl}/${bttvEmotes[code]}/2x`,
      `${bttvEmoteUrl}/${bttvEmotes[code]}/3x`,
    ],
  },
  {
    list: ffzEmotes,
    make: (code) => [
      `${ffzEmoteUrl}/${ffzEmotes[code]}/1`,
      `${ffzEmoteUrl}/${ffzEmotes[code]}/2`,
      `${ffzEmoteUrl}/${ffzEmotes[code]}/4`,
    ],
  },
];
