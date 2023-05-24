import { EmoteIDs, EmotePositions } from './emotes.types';

export const getTwitchEmotesFromMessage = async (
  message: string,
  emotePositions: EmotePositions | null,
) => {
  const $EMOTES: EmoteIDs = new Map();
  if (!emotePositions) return $EMOTES;

  for (const id in emotePositions) {
    const pos = emotePositions[id][0].split('-');
    const start = parseInt(pos[0]);
    const end = parseInt(pos[1]) + 1;
    const code = message.substring(start, end);
    $EMOTES.set(code, id);
  }
  return $EMOTES;
};
