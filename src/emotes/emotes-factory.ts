import { getBttvEmotes } from './emotes-bttv.store';
import { getFfzEmotes } from './emotes-ffz.store';
import { getTwitchEmotesFromMessage } from './emotes-twitch.store';
import { EmotesFactory, EmotePositions } from './emotes.types';

const twitchEmoteUrl = 'https://static-cdn.jtvnw.net/emoticons/v2';
const bttvEmoteUrl = 'https://cdn.betterttv.net/emote';
const ffzEmoteUrl = 'https://cdn.frankerfacez.com/emote';

export const emotesFactory = async (
  message: string,
  emotes: EmotePositions,
  channelId: string
): Promise<EmotesFactory[]> => {
  const twitchEmotes = await getTwitchEmotesFromMessage(message, emotes);
  const bttvEmotes = await getBttvEmotes(channelId);
  const ffzEmotes = await getFfzEmotes(channelId);

  return [
    {
      list: twitchEmotes,
      make: (code) => [
        `${twitchEmoteUrl}/${twitchEmotes.get(code)}/default/dark/1.0`,
        `${twitchEmoteUrl}/${twitchEmotes.get(code)}/default/dark/2.0`,
        `${twitchEmoteUrl}/${twitchEmotes.get(code)}/default/dark/3.0`,
      ],
    },
    {
      list: bttvEmotes,
      make: (code) => [
        `${bttvEmoteUrl}/${bttvEmotes.get(code)}/1x`,
        `${bttvEmoteUrl}/${bttvEmotes.get(code)}/2x`,
        `${bttvEmoteUrl}/${bttvEmotes.get(code)}/3x`,
      ],
    },
    {
      list: ffzEmotes,
      make: (code) => [
        `${ffzEmoteUrl}/${ffzEmotes.get(code)}/1`,
        `${ffzEmoteUrl}/${ffzEmotes.get(code)}/2`,
        `${ffzEmoteUrl}/${ffzEmotes.get(code)}/4`,
      ],
    },
  ];
};
