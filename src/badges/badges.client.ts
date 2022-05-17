import fetch from 'cross-fetch';
import { BadgesResponse } from './badges.types';

const baseUrl = 'https://badges.twitch.tv/v1/badges';
const emptyResp: BadgesResponse = {
  badge_sets: {},
};

export const fetchGlobalBadges = async () => {
  const errorMsg = 'Failed to fetch global badges:';

  try {
    const resp = await fetch(`${baseUrl}/global/display`);
    const data: BadgesResponse = await resp.json();
    return data;
  } catch (error) {
    console.error(errorMsg, error);
    return emptyResp;
  }
};

export const fetchChannelBadges = async (channelId: string) => {
  const errorMsg = 'Failed to fetch channel badges:';

  try {
    const resp = await fetch(`${baseUrl}/channels/${channelId}/display`);
    const data: BadgesResponse = await resp.json();
    return data;
  } catch (error) {
    console.error(errorMsg, error);
    return emptyResp;
  }
};
