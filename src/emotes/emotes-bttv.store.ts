import { GENERIC_CHANNEL_KEY, GLOBAL_CHANNEL_KEY } from '../helpers';
import {
  fetchGlobalBttvEmotes,
  fetchChannelBttvEmotes,
} from './emotes-bttv.client';
import { ChannelEmotes, EmoteIDs } from './emotes.types';

const $EMOTES: ChannelEmotes = new Map();

export const getBttvEmotes = async (
  channelId?: string,
  enabled = true,
): Promise<EmoteIDs> => {
  if (!enabled) return new Map();

  channelId = channelId || GENERIC_CHANNEL_KEY;

  let storedGlobalEmotes = $EMOTES.get(GLOBAL_CHANNEL_KEY);
  let storedChannelEmotes = $EMOTES.get(channelId);

  if (!storedGlobalEmotes) {
    const globalEmotes = await fetchGlobalBttvEmotes();
    $EMOTES.set(
      GLOBAL_CHANNEL_KEY,
      new Map(globalEmotes.map((x) => [x.code, x.id])),
    );
  }

  if (!storedChannelEmotes) {
    const channelEmotes = await fetchChannelBttvEmotes(channelId);
    $EMOTES.set(
      channelId,
      new Map([
        ...new Map(channelEmotes.channelEmotes.map((x) => [x.code, x.id])),
        ...new Map(channelEmotes.sharedEmotes.map((x) => [x.code, x.id])),
      ]),
    );
  }

  storedGlobalEmotes = $EMOTES.get(GLOBAL_CHANNEL_KEY);
  storedChannelEmotes = $EMOTES.get(channelId);
  if (!storedGlobalEmotes || !storedChannelEmotes) {
    console.error('Could not retrieve stored BTTV emotes');
    return new Map();
  }

  return new Map([...storedGlobalEmotes, ...storedChannelEmotes]);
};
