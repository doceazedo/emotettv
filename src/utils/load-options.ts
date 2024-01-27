import type { ParserOptions } from "../types";

export const loadOptions = (
  options: Partial<ParserOptions> | null,
): ParserOptions => ({
  channelId: null,
  ...options,
  providers: {
    twitch: true,
    bttv: true,
    ffz: true,
    seventv: true,
    ...options?.providers,
  },
});
