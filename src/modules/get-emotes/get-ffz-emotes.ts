import { getFfzEmotes as getEmotes } from '../../services/ffz';

export const getFfzEmotes = async (channelId: string) => {
  const emotes = await getEmotes(channelId);
  const emoteCodes = emotes.map((emote) => emote.code);
  return emoteCodes;
};
