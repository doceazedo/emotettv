import {
  getChannelBadges,
  getGlobalBadges,
} from '../../services/twitch-badges';

export const getBadges = async (channelId: string) => {
  const channelBadges = await getChannelBadges(channelId);
  const globalBadges = await getGlobalBadges();
  return { ...globalBadges.badge_sets, ...channelBadges.badge_sets };
};
