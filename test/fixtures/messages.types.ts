import { EmotePositions } from '../../src/emotes/emotes.types';

type badgeIDs = {
  [code: string]: string;
};

export type MessageFixture = {
  message: string;
  tags: {
    badges: badgeIDs;
    emotes: EmotePositions | null;
  };
  channelId: string;
};
