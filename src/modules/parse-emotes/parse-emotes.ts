import { EmotePositions, getTwitchEmotes } from '../get-emotes';
import { emoteFactory, getThirdPartyEmotes } from '../emote-factory';

type Word = {
  text: string;
  emote?: {
    url: string[];
  };
};

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
      if (!match.list.includes(text)) return;
      word.emote = { url: match.make(text) };
    });
    words.push(word);
  });

  return words;
};
