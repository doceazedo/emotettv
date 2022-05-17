import { EmoteIDs, EmotePositions } from './emotes.types';

export const getTwitchEmotesFromMessage = async (
  message: string,
  emotes: EmotePositions
) => {
  const emotesMap: EmoteIDs = new Map();
  for (const id in emotes) {
    const pos = emotes[id][0].split('-');
    const start = parseInt(pos[0]);
    const end = parseInt(pos[1]) + 1;
    const code = message.substring(start, end);
    emotesMap.set(code, id);
  }
  return emotesMap;
};
