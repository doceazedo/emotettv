import { getFfzEmotes as getEmotes } from '../../services/ffz';
import type { Emotes } from './';

export const getFfzEmotes = async (channelId: string) => {
  const emotesData = await getEmotes(channelId);

  const emotes: Emotes = {};
  emotesData.forEach((item) => (emotes[item.code] = `${item.id}`));
  return emotes;
};
