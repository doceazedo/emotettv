import { getBadges } from '../get-badges';
import type { Badges, ParsedBadges } from '.';

export const parseBadges = async (badgesData: Badges, channelId: string) => {
  const badges = await getBadges(channelId);
  const parsedBadges: ParsedBadges = {};

  for (const code in badgesData) {
    const version = badgesData[code];
    parsedBadges[code] = badges[code].versions[version];
  }

  return parsedBadges;
};
