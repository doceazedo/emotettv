export type EmotePositions = {
  [emoteId: string]: string[];
};

export type EmoteParserOptions = {
  channelId: string | null;
  providers: {
    twitch: boolean;
    bttv: boolean;
    ffz: boolean;
    seventv: boolean;
    [provider: string]: boolean;
  };
};

export type ParsedEmotesMessage = {
  content: string;
  position: string;
  emote?: {
    images: string[];
    overlays?: {
      images: string[];
      alt: string;
    }[];
    isZeroWidth?: boolean;
  };
}[];

export type MessageParser = (
  message: ParsedEmotesMessage,
  emotePositions: EmotePositions,
  options: EmoteParserOptions,
) => Promise<ParsedEmotesMessage>;

export type EmotesLoader = (
  channelId: string | null,
  force: boolean,
) => Promise<void>;

export type EmotesParser = {
  provider: string;
  parse: MessageParser;
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
  isZeroWidth?: boolean;
  channelId: string | null;
}[];

export type FfzSet = {
  id: number;
  _type: number;
  title: string;
  emoticons: {
    id: number;
    name: string;
    height: number;
    width: number;
    public: boolean;
    hidden: boolean;
    modifier: boolean;
    modifier_flags: number;
    owner: {
      _id: number;
      name: string;
      display_name: string;
    };
    urls: {
      "1": string;
      "2": string;
      "4": string;
    };
    status: number;
    usage_count: number;
    created_at: string;
    last_updated: string;
  }[];
};

export type FfzChannelEmotesResponse = {
  room: unknown;
  sets: {
    [id: string]: FfzSet;
  };
};

export type FfzGlobalEmotesResponse = {
  default_sets: number[];
  sets: {
    [id: string]: FfzSet;
  };
  users: {
    [id: string]: string[];
  };
};

export type StvEmoteSet = {
  id: string;
  name: string;
  flags: number;
  immutable: boolean;
  privileged: boolean;
  emotes: {
    id: string;
    name: string;
    flags: number;
    timestamp: number;
    actor_id: string;
    data: {
      id: string;
      name: string;
      flags: number;
      lifecycle: number;
      state: string[];
      listed: boolean;
      animated: boolean;
      owner: {
        id: string;
        username: string;
        display_name: string;
        avatar_url?: string;
        style: {
          color?: number;
        };
        roles?: string[];
      };
      host: {
        url: string;
        files: {
          name: string;
          static_name: string;
          width: number;
          height: number;
          frame_count: number;
          size: number;
          format: string;
        }[];
      };
      tags?: string[];
    };
  }[];
  emote_count: number;
  capacity: number;
  owner: {
    id: string;
    username: string;
    display_name: string;
    avatar_url: string;
    style: {
      color: number;
    };
    roles: string[];
  };
};

export type StvGlobalEmotesResponse = StvEmoteSet;

export type StvChannelEmotesResponse = {
  id: string;
  platform: string;
  username: string;
  display_name: string;
  linked_at: number;
  emote_capacity: number;
  emote_set: StvEmoteSet;
  user: {
    id: string;
    username: string;
    display_name: string;
    created_at: number;
    avatar_url: string;
  };
};
