import {
  getTwitchChannelBadges,
  getTwitchGlobalBadges,
} from "../clients/unttv";
import type {
  TwitchBadgesList,
  ParsedBadges,
  BadgesParser,
  BadgesLoader,
} from "../types";

let badgesList: TwitchBadgesList = [];

const load: BadgesLoader = async (channelId, force = false) => {
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

export const twitchBadgesParser: BadgesParser = {
  provider: "twitch",
  parse: async (badges, username, channelId) => {
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
        if (!badge) return null;
        return {
          id: badge.id,
          title: badge.title,
          images: badge.images,
        };
      })
      .filter((x) => !!x) as ParsedBadges;
  },
  load,
};
