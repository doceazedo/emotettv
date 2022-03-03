export type EmotePositions = {
  [code: string]: string[];
}

export const getTwitchEmotes = (message: string, emotes: EmotePositions) => {
  const emotesList: string[] = [];

  for (const key in emotes) {
    const pos = emotes[key][0].split('-');
    const start = parseInt(pos[0]);
    const end = parseInt(pos[1]) + 1;
    const code = message.substring(start, end);
    emotesList.push(code);
  }

  return emotesList;
}