import { fetchFfzEmotes } from './emotes-ffz.client';
import { ChannelEmotes, EmoteIDs } from './emotes.types';

const channelEmotesStore: ChannelEmotes = new Map();

export const getFfzEmotes = async (channelId: string) => {
  const channelEmotes = channelEmotesStore.get(channelId);
  if (channelEmotes) return channelEmotes;

  const ffzEmotes = await fetchFfzEmotes(channelId);
  const emotes: EmoteIDs = new Map();
  ffzEmotes.forEach((emote) => emotes.set(emote.code, emote.id.toString()));
  channelEmotesStore.set(channelId, emotes);

  return emotes;
};
