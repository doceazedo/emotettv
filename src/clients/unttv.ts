import type { BadgesList, UnttvBadgesResponse } from "../types";

const BASE_URL = "https://unttv.vercel.app";

export const getTwitchChannelBadges = async (
  channelId: string | null,
): Promise<BadgesList> => {
  if (!channelId) return [];
  try {
    const resp = await fetch(`${BASE_URL}/badges/channel/${channelId}`);
    if (!resp.ok) throw Error();
    const data = (await resp.json()) as UnttvBadgesResponse;
    return formatBadgesList(data, channelId);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTwitchGlobalBadges = async (): Promise<BadgesList> => {
  try {
    const resp = await fetch(`${BASE_URL}/badges/global`);
    if (!resp.ok) throw Error();
    const data = (await resp.json()) as UnttvBadgesResponse;
    return formatBadgesList(data, null);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const formatBadgesList = (
  data: UnttvBadgesResponse,
  channelId: string | null,
): BadgesList =>
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
