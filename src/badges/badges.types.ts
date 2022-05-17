export type BadgeVersion = {
  image_url_1x: string;
  image_url_2x: string;
  image_url_4x: string;
  description: string;
  title: string;
  click_action: string;
  click_url?: string;
  last_updated?: Date;
};

export type Versions = {
  [version: string]: BadgeVersion;
};

export type BadgesResponse = {
  badge_sets: {
    [code: string]: {
      versions: Versions;
    };
  };
};

export type BadgeVersions = Map<string, Versions>;

export type ChannelBadges = Map<string, BadgeVersions>;

export type BadgeIDs = {
  [code: string]: string;
};
