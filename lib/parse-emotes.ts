import { emotesFactory } from '../src/emotes/emotes-factory';
import { EmotePositions, Word } from '../src/emotes/emotes.types';

const toHtml = (words: Word[], size: number) =>
  words
    .map((word) =>
      word.emote
        ? `<img src="${word.emote.url[size]}" alt="HeyGuys" />`
        : word.text
    )
    .join(' ');

export const parseEmotes = async (
  message: string,
  emotes: EmotePositions,
  channelId: string
) => {
  const factory = await emotesFactory(message, emotes, channelId);
  const words: Word[] = message.split(' ').map((text) => {
    const word: Word = { text };
    factory.forEach((match) => {
      if (!match.list.has(text)) return;
      word.emote = { url: match.make(text) };
    });
    return word;
  });

  return {
    toWords: () => words,
    toHtml: (size = 0) => toHtml(words, size),
  };
};
