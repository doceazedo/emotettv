export type badgesResponse = {
  badge_sets: {
    [code: string]: {
      version: {
        [version: number]: {
          image_url_1x: string;
          image_url_2x: string;
          image_url_4x: string;
          description: string;
          title: string;
          click_action: string;
          click_url: string;
          last_updated: Date;
        };
      };
    };
  };
};

const baseUrl = 'https://badges.twitch.tv/v1/badges';

export const getGlobalBadges = async () => {
  const resp = await fetch(`${baseUrl}/global/display`);
  const data: badgesResponse = await resp.json();
  return data;
};

export const getChannelBadges = async (channelId: string) => {
  const resp = await fetch(`${baseUrl}/channels/${channelId}/display`);
  const data: badgesResponse = await resp.json();
  return data;
};
