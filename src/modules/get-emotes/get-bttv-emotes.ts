import { getChannelBttvEmotes, getGlobalBttvEmotes } from '../../services/bttv';

export const getBttvEmotes = async (channelId: string) => {
  const global = await getGlobalBttvEmotes();
  const channel = await getChannelBttvEmotes(channelId);

  const emotes = [
    ...global,
    ...channel.channelEmotes,
    ...channel.sharedEmotes
  ];

  const emoteCodes = emotes.map((emote) => emote?.code);
  return emoteCodes;
}
