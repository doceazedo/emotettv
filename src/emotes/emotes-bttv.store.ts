import { GLOBAL_CHANNEL_KEY } from '../helpers';
import {
  fetchGlobalBttvEmotes,
  fetchChannelBttvEmotes,
} from './emotes-bttv.client';
import { BttvEmote, ChannelEmotes, EmoteIDs } from './emotes.types';

const channelEmotesStore: ChannelEmotes = new Map();

export const getBttvEmotes = async (channelId?: string, enabled = true) => {
  const emotes: EmoteIDs = new Map();
  if (!enabled) return emotes;

  const emotesKey = channelId || GLOBAL_CHANNEL_KEY;
  const channelEmotes = channelEmotesStore.get(emotesKey);
  if (channelEmotes) return channelEmotes;

  const global = await fetchGlobalBttvEmotes();
  let bttvEmotes: BttvEmote[] = [...global];
  if (channelId) {
    const channel = await fetchChannelBttvEmotes(channelId);
    bttvEmotes = [
      ...bttvEmotes,
      ...channel.sharedEmotes,
      ...channel.channelEmotes,
    ];
  }

  bttvEmotes.forEach((emote) => emotes.set(emote.code, emote.id));
  channelEmotesStore.set(emotesKey, emotes);

  return emotes;
};
