import { getChannelBttvEmotes, getGlobalBttvEmotes } from '../../services/bttv';
import type { Emotes } from './';

export const getBttvEmotes = async (channelId: string) => {
  const global = await getGlobalBttvEmotes();
  const channel = await getChannelBttvEmotes(channelId);
  const emotesData = [
    ...global,
    ...channel.channelEmotes,
    ...channel.sharedEmotes,
  ];

  const emotes: Emotes = {};
  emotesData.forEach((item) => (emotes[item.code] = item.id));

  return emotes;
};
