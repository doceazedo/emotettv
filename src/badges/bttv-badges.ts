import { getBttvBadges } from "../clients/bttv";
import type { BadgesLoader, BadgesParser, BttvBadgesResponse } from "../types";

let badgesList: BttvBadgesResponse = [];

const load: BadgesLoader = async (channelId, force = false) => {
  const hasLoaded = badgesList.length > 0;
  if (hasLoaded && !force) return;
  badgesList = await getBttvBadges();
};

export const bttvBadgesParser: BadgesParser = {
  provider: "bttv",
  parse: async (badges, username) => {
    await load(null);
    return badgesList
      .filter((x) => x.name == username)
      .map((x) => ({
        title: x.badge.description,
        images: [x.badge.svg],
      }));
  },
  load,
};
