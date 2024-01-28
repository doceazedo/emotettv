import type { TwitchBadgesList, UnttvBadgesResponse } from "../types";

const BASE_URL = "https://unttv.vercel.app";

export const getTwitchChannelBadges = async (
  channelId: string | null,
): Promise<TwitchBadgesList> => {
  if (!channelId) return [];
  try {
    const resp = await fetch(`${BASE_URL}/badges/channel/${channelId}`);
    if (!resp.ok) throw Error();
    const data = (await resp.json()) as UnttvBadgesResponse;
    return formatTwitchBadgesList(data, channelId);
  } catch (error) {
    return [];
  }
};

export const getTwitchGlobalBadges = async (): Promise<TwitchBadgesList> => {
  try {
    const resp = await fetch(`${BASE_URL}/badges/global`);
    if (!resp.ok) throw Error();
    const data = (await resp.json()) as UnttvBadgesResponse;
    return formatTwitchBadgesList(data, null);
  } catch (error) {
    return [];
  }
};

const formatTwitchBadgesList = (
  data: UnttvBadgesResponse,
  channelId: string | null,
): TwitchBadgesList =>
  data
    .map((x) =>
      x.versions.map((v) => ({
        id: x.id,
        versionId: v.id,
        channelId,
        title: v.title,
        description: v.description,
        clickAction: v.clickAction,
        clickUrl: v.clickUrl,
        images: [v.image_url_1x, v.image_url_2x, v.image_url_4x],
      })),
    )
    .flat();
