import {
  getChannelBadges,
  getGlobalBadges,
} from '../../services/twitch-badges';

export const getBadges = async (channelId: string) => {
  const channelBadges = await getChannelBadges(channelId);
  const globalBadges = await getGlobalBadges();
  return { ...channelBadges.badge_sets, ...globalBadges.badge_sets };
};
