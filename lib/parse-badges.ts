import { getBadges } from '../src/badges/badges.store';
import { BadgeIDs, BadgeVersion } from '../src/badges/badges.types';

const toMinimalArray = (versions: BadgeVersion[]): string[][] =>
  versions.map((version) => [
    version.image_url_1x,
    version.image_url_2x,
    version.image_url_4x,
  ]);

const toHtml = (versions: BadgeVersion[], size: number) => {
  // map size 0 to 1 and 3 to 4 for convenience
  size = size == 0 ? 1 : size == 3 ? 4 : size;

  return versions
    .map(
      (version) =>
        `<img src="${version[`image_url_${size}x`]}" alt="${version.title}" />`
    )
    .join(' ');
};

export const parseBadges = async (badges: BadgeIDs, channelId: string) => {
  const badgeVersions = await getBadges(channelId);
  const userBadges: BadgeVersion[] = [];

  for (const code in badges) {
    const versions = badgeVersions.get(code);
    const version = badges[code];
    const badge = versions?.[version];
    if (badge) userBadges.push(badge);
  }

  return {
    toBasicArray: () => userBadges,
    toMinimalArray: () => toMinimalArray(userBadges),
    toHtml: (size = 1) => toHtml(userBadges, size),
  };
};
