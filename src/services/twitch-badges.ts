import { BadgeVersion } from '../modules';

export type BadgesResponse = {
  badge_sets: {
    [code: string]: {
      versions: BadgeVersion;
    };
  };
};

const baseUrl = 'https://badges.twitch.tv/v1/badges';

export const getGlobalBadges = async () => {
  const resp = await fetch(`${baseUrl}/global/display`);
  const data: BadgesResponse = await resp.json();
  return data;
};

export const getChannelBadges = async (channelId: string) => {
  const resp = await fetch(`${baseUrl}/channels/${channelId}/display`);
  const data: BadgesResponse = await resp.json();
  return data;
};
