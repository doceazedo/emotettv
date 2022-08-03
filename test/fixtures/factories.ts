import { EmoteIDs, EmotesFactory } from '../../src/emotes/emotes.types';

const customEmotes: EmoteIDs = new Map([
  ['customEmote', 'customEmoteId'],
  ['anotherCustomEmote', 'anotherCustomEmoteId'],
]);

const customEmoteUrl = (id: string, size: string) =>
  `https://via.placeholder.com/${size}.png?text=${id}`;

export const customEmotesFactory: EmotesFactory = {
  list: customEmotes,
  make: (code) => {
    const id = customEmotes.get(code) || '';
    return [
      customEmoteUrl(id, '28x28'),
      customEmoteUrl(id, '56x56'),
      customEmoteUrl(id, '112x112'),
    ];
  },
};
