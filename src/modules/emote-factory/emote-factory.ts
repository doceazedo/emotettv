import { getBttvEmotes, getFfzEmotes } from '../get-emotes';

type EmoteFactory = {
  list: string[];
  make: (code: string) => string[];
};

let bttvEmotes: string[];
let ffzEmotes: string[];

export const getThirdPartyEmotes = async (channelId: string) => {
  if (bttvEmotes != null && ffzEmotes != null) return;
  bttvEmotes = await getBttvEmotes(channelId);
  ffzEmotes = await getFfzEmotes(channelId);
}

const twitchEmoteUrl = 'https://static-cdn.jtvnw.net/emoticons/v2';
const bttvEmoteUrl = 'https://cdn.betterttv.net/emote';
const ffzEmoteUrl = 'https://cdn.frankerfacez.com/emote';

export const emoteFactory = (twitchEmotes: string[]): EmoteFactory[] => [
  {
    list: twitchEmotes,
    make: (code) => [
      `${twitchEmoteUrl}/${code}/default/dark/1.0`,
      `${twitchEmoteUrl}/${code}/default/dark/2.0`,
      `${twitchEmoteUrl}/${code}/default/dark/3.0`,
    ]
  },
  {
    list: bttvEmotes,
    make: (code) => [
      `${bttvEmoteUrl}/${code}/1x`,
      `${bttvEmoteUrl}/${code}/2x`,
      `${bttvEmoteUrl}/${code}/3x`,
    ]
  },
  {
    list: ffzEmotes,
    make: (code) => [
      `${ffzEmoteUrl}/${code}/1`,
      `${ffzEmoteUrl}/${code}/2`,
      `${ffzEmoteUrl}/${code}/4`,
    ]
  }
];
