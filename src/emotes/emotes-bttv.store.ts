import {
  fetchGlobalBttvEmotes,
  fetchChannelBttvEmotes,
} from './emotes-bttv.client';
import { ChannelEmotes, EmoteIDs } from './emotes.types';

const channelEmotesStore: ChannelEmotes = new Map();

export const getBttvEmotes = async (channelId: string) => {
  const channelEmotes = channelEmotesStore.get(channelId);
  if (channelEmotes) return channelEmotes;

  const global = await fetchGlobalBttvEmotes();
  const channel = await fetchChannelBttvEmotes(channelId);
  const bttvEmotes = [
    ...global,
    ...channel.channelEmotes,
    ...channel.sharedEmotes,
  ];

  const emotes: EmoteIDs = new Map();
  bttvEmotes.forEach((emote) => emotes.set(emote.code, emote.id));
  channelEmotesStore.set(channelId, emotes);

  return emotes;
};
