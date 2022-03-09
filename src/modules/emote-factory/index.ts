import { Emotes } from '../get-emotes';

export type EmoteFactory = {
  list: Emotes;
  make: (code: string) => string[];
};

export * from './emote-factory';
