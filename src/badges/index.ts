import { loadOptions } from "../utils/load-options";
import type { BadgeVersions, ParserOptions } from "../types";
import { parseTwitchBadges } from "./twitch-badges";

export const parseBadges = async (
  badges: BadgeVersions | null,
  username: string | null = null,
  _options: Partial<ParserOptions> | null = null,
) => {
  const options = loadOptions(_options);
  const parsedBadges = await parseTwitchBadges(badges || {}, options.channelId);
  return {
    toArray: () => parsedBadges,
    toHTML: (scale = 1, inlineStyles = true) =>
      parsedBadges
        .map((badge) => {
          const height = [18, 20, 22][scale];
          const offset = [4, 5, 6][scale] * -1;
          return `<img class="emotettv-badge" ${inlineStyles ? `style="height:${height}px;margin-bottom:${offset}px"` : ""} src="${badge.images[scale]}" alt="${badge.title}" />`;
        })
        .join(" "),
  };
};
