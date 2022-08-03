import { getBttvEmotes } from './emotes-bttv.store';
import { getFfzEmotes } from './emotes-ffz.store';
import { getTwitchEmotesFromMessage } from './emotes-twitch.store';
import {
  EmotesFactory,
  EmotePositions,
  ParseEmotesOptions,
} from './emotes.types';

const twitchEmoteUrl = 'https://static-cdn.jtvnw.net/emoticons/v2';
const bttvEmoteUrl = 'https://cdn.betterttv.net/emote';
const ffzEmoteUrl = 'https://cdn.frankerfacez.com/emote';

export const emotesFactory = async (
  message: string,
  emotePositions: EmotePositions | null,
  options: ParseEmotesOptions
): Promise<EmotesFactory[]> => {
  const twitchEmotes = await getTwitchEmotesFromMessage(
    message,
    emotePositions
  );
  const bttvEmotes = await getBttvEmotes(
    options.channelId,
    options.thirdPartyProviders.bttv
  );
  const ffzEmotes = await getFfzEmotes(
    options.channelId,
    options.thirdPartyProviders.ffz
  );

  const customFactories = Array.isArray(options.customEmotes)
    ? options.customEmotes
    : [options.customEmotes];

  return [
    {
      list: twitchEmotes,
      make: (code) => [
        // TODO: who allowed me to get the same fucking value 3 times
        // do something like test/fixtures/factories.ts
        `${twitchEmoteUrl}/${twitchEmotes.get(code)}/default/dark/1.0`,
        `${twitchEmoteUrl}/${twitchEmotes.get(code)}/default/dark/2.0`,
        `${twitchEmoteUrl}/${twitchEmotes.get(code)}/default/dark/3.0`,
      ],
    },
    {
      list: bttvEmotes,
      make: (code) => [
        // TODO: who allowed me to get the same fucking value 3 times
        // do something like test/fixtures/factories.ts
        `${bttvEmoteUrl}/${bttvEmotes.get(code)}/1x`,
        `${bttvEmoteUrl}/${bttvEmotes.get(code)}/2x`,
        `${bttvEmoteUrl}/${bttvEmotes.get(code)}/3x`,
      ],
    },
    {
      list: ffzEmotes,
      make: (code) => [
        // TODO: who allowed me to get the same fucking value 3 times
        // do something like test/fixtures/factories.ts
        `${ffzEmoteUrl}/${ffzEmotes.get(code)}/1`,
        `${ffzEmoteUrl}/${ffzEmotes.get(code)}/2`,
        `${ffzEmoteUrl}/${ffzEmotes.get(code)}/4`,
      ],
    },
    ...customFactories,
  ];
};
