import { loadOptions } from "../utils/load-options";
import type { BadgeVersions, BadgesParser, ParserOptions } from "../types";
import { twitchBadgesParser } from "./twitch-badges";
import { bttvBadgesParser } from "./bttv-badges";

const badgeParsers: BadgesParser[] = [twitchBadgesParser, bttvBadgesParser];

export const parseBadges = async (
  badges: BadgeVersions | null,
  username: string | null = null,
  _options: Partial<ParserOptions> | null = null,
) => {
  const options = loadOptions(_options);
  const parsedBadges = (
    await Promise.all(
      badgeParsers.map(async (parser) => {
        if (!options.providers?.[parser.provider]) return [];
        return await parser.parse(badges || {}, username, options.channelId);
      }),
    )
  ).flat();
  return {
    toArray: () => parsedBadges,
    toHTML: (scale = 1, inlineStyles = true) =>
      parsedBadges
        .map((badge) => {
          const height = [18, 20, 22][scale];
          const offset = [4, 5, 6][scale] * -1;
          const image = badge.images?.[scale] || badge.images[0];
          return `<img class="emotettv-badge" ${inlineStyles ? `style="height:${height}px;margin-bottom:${offset}px"` : ""} src="${image}" alt="${badge.title}" />`;
        })
        .join(" "),
  };
};

export const reloadBadges = async (
  channelId: string | null,
  _options: Partial<ParserOptions> | null = null,
) => {
  const options = loadOptions(_options);
  await Promise.all(
    badgeParsers.map(async (parser) => {
      if (!options.providers?.[parser.provider]) return;
      return await parser.load(options.channelId, true);
    }),
  );
};
