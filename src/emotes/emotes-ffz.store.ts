import { fetchFfzEmotes } from './emotes-ffz.client';
import { ChannelEmotes, EmoteIDs } from './emotes.types';

const channelEmotesStore: ChannelEmotes = new Map();

export const getFfzEmotes = async (channelId: string, enabled: boolean) => {
  const emotes: EmoteIDs = new Map();
  if (!enabled) return emotes;

  const channelEmotes = channelEmotesStore.get(channelId);
  if (channelEmotes) return channelEmotes;

  const ffzEmotes = await fetchFfzEmotes(channelId);
  ffzEmotes.forEach((emote) => emotes.set(emote.code, emote.id.toString()));
  channelEmotesStore.set(channelId, emotes);

  return emotes;
};
