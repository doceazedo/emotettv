import { getFfzBadges } from "../clients/ffz";
import type {
  BadgesLoader,
  BadgesParser,
  FfzBadge,
  FfzBadgeUsers,
  ParsedBadges,
} from "../types";

let badgesList: FfzBadge[] = [];
let badgeUsers: FfzBadgeUsers = {};

const load: BadgesLoader = async (channelId, force = false) => {
  const hasLoaded = badgesList.length > 0 || Object.keys(badgeUsers).length > 0;
  if (hasLoaded && !force) return;
  const badgesData = await getFfzBadges();
  badgesList = badgesData.badges;
  badgeUsers = badgesData.users;
};

export const ffzBadgesParser: BadgesParser = {
  provider: "ffz",
  parse: async (badges, username) => {
    await load(null);
    return Object.keys(badgeUsers)
      .map((badgeId) => {
        const users = badgeUsers[badgeId];
        if (!users.find((x) => x == username)) return null;

        const badge = badgesList.find((x) => x.id == parseInt(badgeId));
        if (!badge) return null;

        return {
          id: badge.id,
          title: badge.title,
          slot: badge.slot,
          replaces: badge.replaces,
          color: badge.color,
          images: Object.values(badge.urls),
        };
      })
      .filter((x) => !!x) as unknown as ParsedBadges;
  },
  load,
};
