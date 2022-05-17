import { fetchChannelBadges, fetchGlobalBadges } from './badges.client';
import { BadgeVersions, ChannelBadges } from './badges.types';

const channelBadgesStore: ChannelBadges = new Map();

export const getBadges = async (channelId: string) => {
  const channelBadges = channelBadgesStore.get(channelId);
  if (channelBadges) return channelBadges;

  const global = await fetchGlobalBadges();
  const channel = await fetchChannelBadges(channelId);
  const twitchBadges = {
    ...global.badge_sets,
    ...channel.badge_sets,
  };

  const badges: BadgeVersions = new Map();
  for (const code in twitchBadges) {
    badges.set(code, twitchBadges[code].versions);
  }
  channelBadgesStore.set(channelId, badges);

  return badges;
};
