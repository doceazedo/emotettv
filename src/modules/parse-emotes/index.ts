export type Word = {
  text: string;
  emote?: {
    url: string[];
  };
};

export * from './parse-emotes';
