export type EmotePositions = {
  [emoteId: string]: string[];
};

export type EmoteParserOptions = {
  channelId?: string;
  providers: {
    twitch: boolean;
    bttv: boolean;
    ffz: boolean;
    [provider: string]: boolean;
  };
};

export type ParsedEmotesMessage = {
  content: string;
  position: string;
  emote?: {
    images: string[];
  };
}[];

export type EmotesParser = (
  message: ParsedEmotesMessage,
  emotePositions?: EmotePositions,
) => Promise<ParsedEmotesMessage>;

export type EmotesParserItem = {
  provider: string;
  parse: EmotesParser;
};
