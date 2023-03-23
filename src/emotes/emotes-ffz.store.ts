import { GLOBAL_CHANNEL_KEY } from '../helpers';
import {
  fetchChannelFfzEmotes,
  fetchGlobalFfzEmotes,
} from './emotes-ffz.client';
import { ChannelEmotes, EmoteIDs, FfzEmotesResponse } from './emotes.types';

const channelEmotesStore: ChannelEmotes = new Map();

export const getFfzEmotes = async (channelId?: string, enabled = true) => {
  const emotes: EmoteIDs = new Map();
  if (!enabled || !channelId) return emotes;

  const emotesKey = channelId || GLOBAL_CHANNEL_KEY;
  const channelEmotes = channelEmotesStore.get(emotesKey);
  if (channelEmotes) return channelEmotes;

  const global = await fetchGlobalFfzEmotes();
  let ffzEmotes: FfzEmotesResponse = [...global];
  if (channelId) {
    const channel = await fetchChannelFfzEmotes(channelId);
    ffzEmotes = [...ffzEmotes, ...channel];
  }

  ffzEmotes.forEach((emote) => emotes.set(emote.code, emote.id.toString()));
  channelEmotesStore.set(emotesKey, emotes);

  return emotes;
};
