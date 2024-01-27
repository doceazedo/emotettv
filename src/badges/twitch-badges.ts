import {
  getTwitchChannelBadges,
  getTwitchGlobalBadges,
} from "../clients/unttv";
import type { BadgesList, BadgeVersions } from "../types";

let badgesList: BadgesList = [];

export const parseTwitchBadges = async (
  badges: BadgeVersions,
  channelId: string | null,
) => {
  await load(channelId);
  return Object.keys(badges)
    .map((badgeId) => {
      const version = badges[badgeId];
      const badge = badgesList.find(
        (x) =>
          x.id == badgeId &&
          x.versionId == version &&
          (x.channelId == channelId || x.channelId == null),
      );
      return badge;
    })
    .filter((x) => !!x) as BadgesList;
};

const load = async (channelId: string | null, force = false) => {
  const hasLoaded = badgesList.find((x) => x.channelId === channelId);
  if (hasLoaded && !force) return;
  badgesList = [
    ...badgesList,
    ...(
      await Promise.all([
        getTwitchChannelBadges(channelId),
        getTwitchGlobalBadges(),
      ])
    ).flat(),
  ];
};
