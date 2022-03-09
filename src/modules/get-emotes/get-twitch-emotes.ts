import type { EmotePositions, Emotes } from '.';

export const getTwitchEmotes = (
  message: string,
  emotesData: EmotePositions
) => {
  const emotes: Emotes = {};

  for (const id in emotesData) {
    const pos = emotesData[id][0].split('-');
    const start = parseInt(pos[0]);
    const end = parseInt(pos[1]) + 1;
    const code = message.substring(start, end);
    emotes[code] = id;
  }

  return emotes;
};
