import { GENERIC_CHANNEL_KEY, GLOBAL_CHANNEL_KEY } from '../helpers';
import {
  fetchChannelFfzEmotes,
  fetchGlobalFfzEmotes,
} from './emotes-ffz.client';
import { ChannelEmotes, EmoteIDs } from './emotes.types';

const $EMOTES: ChannelEmotes = new Map();

export const getFfzEmotes = async (
  channelId?: string,
  enabled = true,
): Promise<EmoteIDs> => {
  if (!enabled) return new Map();

  channelId = channelId || GENERIC_CHANNEL_KEY;

  let storedGlobalEmotes = $EMOTES.get(GLOBAL_CHANNEL_KEY);
  let storedChannelEmotes = $EMOTES.get(channelId);

  if (!storedGlobalEmotes) {
    const globalEmotes = await fetchGlobalFfzEmotes();
    $EMOTES.set(
      GLOBAL_CHANNEL_KEY,
      new Map(globalEmotes.map((x) => [x.code, x.id.toString()])),
    );
  }

  if (!storedChannelEmotes) {
    const channelEmotes = await fetchChannelFfzEmotes(channelId);
    $EMOTES.set(
      channelId,
      new Map(channelEmotes.map((x) => [x.code, x.id.toString()])),
    );
  }

  storedGlobalEmotes = $EMOTES.get(GLOBAL_CHANNEL_KEY);
  storedChannelEmotes = $EMOTES.get(channelId);
  if (!storedGlobalEmotes || !storedChannelEmotes) {
    console.error('Could not retrieve stored FFZ emotes');
    return new Map();
  }

  return new Map([...storedGlobalEmotes, ...storedChannelEmotes]);
};
