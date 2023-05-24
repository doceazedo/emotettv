import { GENERIC_CHANNEL_KEY, GLOBAL_CHANNEL_KEY } from '../helpers';
import { fetchChannelBadges, fetchGlobalBadges } from './badges.client';
import { ChannelBadges } from './badges.types';

const $BADGES: ChannelBadges = new Map();

export const getBadges = async (channelId?: string) => {
  channelId = channelId || GENERIC_CHANNEL_KEY;

  let storedGlobalBadges = $BADGES.get(GLOBAL_CHANNEL_KEY);
  let storedChannelBadges = $BADGES.get(channelId);

  if (!storedGlobalBadges) {
    const globalBadges = await fetchGlobalBadges();
    $BADGES.set(
      GLOBAL_CHANNEL_KEY,
      new Map(
        Object.keys(globalBadges.badge_sets).map((code) => [
          code,
          globalBadges.badge_sets[code].versions,
        ]),
      ),
    );
  }

  if (!storedChannelBadges) {
    const channelBadges = await fetchChannelBadges(channelId);
    $BADGES.set(
      channelId,
      new Map(
        Object.keys(channelBadges.badge_sets).map((code) => [
          code,
          channelBadges.badge_sets[code].versions,
        ]),
      ),
    );
  }

  storedGlobalBadges = $BADGES.get(GLOBAL_CHANNEL_KEY);
  storedChannelBadges = $BADGES.get(channelId);
  if (!storedGlobalBadges || !storedChannelBadges) {
    console.error('Could not retrieve stored badges');
    return new Map();
  }

  return new Map([...storedGlobalBadges, ...storedChannelBadges]);
};
