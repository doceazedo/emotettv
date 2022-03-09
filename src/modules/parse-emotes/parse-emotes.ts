import { EmotePositions, getTwitchEmotes } from '../get-emotes';
import { emoteFactory, getThirdPartyEmotes } from '../emote-factory';
import type { Word } from '.';

export const parseEmotes = async (
  message: string,
  emotes: EmotePositions,
  channelId: string
) => {
  await getThirdPartyEmotes(channelId);

  const twitchEmotes = getTwitchEmotes(message, emotes);
  const factory = emoteFactory(twitchEmotes);
  const words: Word[] = [];

  message.split(' ').forEach((text) => {
    const word: Word = { text };
    factory.forEach((match) => {
      if (!(text in match.list)) return;
      word.emote = { url: match.make(text) };
    });
    words.push(word);
  });

  return words;
};
