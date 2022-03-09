export type Badges = {
  [code: string]: string;
};

export type BadgeVersion = {
  image_url_1x: string;
  image_url_2x: string;
  image_url_4x: string;
  description: string;
  title: string;
  click_action: string;
  click_url: string;
  last_updated: Date;
};

export type ParsedBadges = {
  [code: string]: BadgeVersion;
};

export * from './parse-badges';
