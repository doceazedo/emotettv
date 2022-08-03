import { GLOBAL_CHANNEL_KEY } from '../helpers';
import { fetchChannelBadges, fetchGlobalBadges } from './badges.client';
import { BadgeVersions, ChannelBadges } from './badges.types';

const channelBadgesStore: ChannelBadges = new Map();

export const getBadges = async (channelId?: string) => {
  const badgesKey = channelId || GLOBAL_CHANNEL_KEY;
  const channelBadges = channelBadgesStore.get(badgesKey);
  if (channelBadges) return channelBadges;

  const global = await fetchGlobalBadges();
  let twitchBadges = { ...global.badge_sets };

  if (channelId) {
    const channel = await fetchChannelBadges(channelId);
    twitchBadges = {
      ...twitchBadges,
      ...channel.badge_sets,
    };
  }

  const badges: BadgeVersions = new Map();
  for (const code in twitchBadges) {
    badges.set(code, twitchBadges[code].versions);
  }
  channelBadgesStore.set(badgesKey, badges);

  return badges;
};
