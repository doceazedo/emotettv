export type EmotePositions = {
  [emoteId: string]: string[];
};

export type EmoteParserOptions = {
  channelId: string | null;
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
  emotePositions: EmotePositions,
  options: EmoteParserOptions,
) => Promise<ParsedEmotesMessage>;

export type EmotesLoader = (
  channelId: string | null,
  force: boolean,
) => Promise<void>;

export type EmotesParserItem = {
  provider: string;
  parse: EmotesParser;
  load: EmotesLoader;
};

export type BttvChannelEmotesResponse = {
  id: string;
  bots: unknown[];
  avatar: string;
  channelEmotes: {
    id: string;
    code: string;
    imageType: string;
    animated: boolean;
    userId: string;
  }[];
  sharedEmotes: {
    id: string;
    code: string;
    imageType: string;
    animated: boolean;
    user: {
      id: string;
      name: string;
      displayName: string;
      providerId: string;
    };
  }[];
};

export type BttvGlobalEmotesResponse = {
  id: string;
  code: string;
  imageType: string;
  animated: boolean;
  userId: string;
  modifier: boolean;
  width?: number;
  height?: number;
}[];

export type EmotesList = {
  id: string;
  code: string;
  channelId: string | null;
}[];
