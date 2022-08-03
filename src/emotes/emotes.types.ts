export type BttvEmote = {
  id: string;
  code: string;
  imageType: string;
  userId?: string;
  user?: {
    id: string;
    name: string;
    displayName: string;
    providerId: string;
  };
};

export type BttvGlobalEmotesResponse = {
  id: string;
  code: string;
  imageType: string;
  userId: string;
}[];

export type BttvChannelEmotesResponse = {
  id?: string;
  bots?: unknown[];
  avatar?: string;
  channelEmotes: BttvEmote[];
  sharedEmotes: BttvEmote[];
};

export type FfzEmotesResponse = {
  id: number;
  user: {
    id: number;
    name: string;
    displayName: string;
  };
  code: string;
  images: {
    '1x': string;
    '2x': string;
    '4x': string;
  };
  imageType: string;
}[];

export type EmoteIDs = Map<string, string>;

export type ChannelEmotes = Map<string, EmoteIDs>;

export type EmotePositions = {
  [code: string]: string[];
};

export type EmotesFactory = {
  list: EmoteIDs;
  make: (code: string) => string[];
};

export type Word = {
  text: string;
  emote?: {
    url: string[];
  };
};

export type ParseEmotesOptions = {
  channelId?: string;
  thirdPartyProviders: {
    bttv: boolean;
    ffz: boolean;
  };
  customEmotes: EmotesFactory | EmotesFactory[];
};
