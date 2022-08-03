import { emotesFactory } from '../emotes/emotes-factory';
import {
  EmotePositions,
  ParseEmotesOptions,
  Word,
} from '../emotes/emotes.types';

const defaultOptions: ParseEmotesOptions = {
  thirdPartyProviders: {
    bttv: true,
    ffz: true,
  },
  customEmotes: [],
};

const toHtml = (words: Word[], size: number) =>
  words
    .map((word) =>
      word.emote
        ? `<img src="${word.emote.url[size]}" alt="${word.text}" />`
        : word.text
    )
    .join(' ');

export const parseEmotes = async (
  message: string,
  emotePositions: EmotePositions | null = null,
  options?: Partial<ParseEmotesOptions>
) => {
  const _options: ParseEmotesOptions = { ...defaultOptions, ...options };

  const factory = await emotesFactory(message, emotePositions, _options);
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
