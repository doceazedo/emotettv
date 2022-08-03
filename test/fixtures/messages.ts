import type { MessageFixture } from './messages.types';

// this is the id for my channel, doceazedo911
// tested emotes must be available on this channel
const channelId = '98776633';

export const msgWithTwitchEmotes: MessageFixture = {
  message: 'hello world! VoHiYo',
  tags: {
    badges: {
      broadcaster: '1',
      premium: '1',
      subscriber: '9',
    },
    emotes: {
      '81274': ['13-18'],
    },
  },
  channelId,
};

export const msgWithCustomEmotes: MessageFixture = {
  message: 'text customEmote anotherCustomEmote',
  tags: {
    // TODO: custom badges
    badges: {
      broadcaster: '1',
      premium: '1',
      subscriber: '9',
    },
    emotes: null,
  },
  channelId,
};
