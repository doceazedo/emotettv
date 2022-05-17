import * as cheerio from 'cheerio';
import { parseEmotes } from '../lib';
import { msgWithTwitchEmotes } from './fixtures/messages';

const getTwitchEmotesMsg = async () =>
  await parseEmotes(
    msgWithTwitchEmotes.message,
    msgWithTwitchEmotes.tags.emotes,
    msgWithTwitchEmotes.channelId
  );

describe('parse twitch emotes', () => {
  it('should parse message to words', async () => {
    const parsed = await getTwitchEmotesMsg();
    const words = parsed.toWords();
    const emotesCount = words.filter((word) => !!word.emote).length;
    expect(emotesCount).toBe(1);
  });

  it('should parse message to html', async () => {
    const parsed = await getTwitchEmotesMsg();
    const html = parsed.toHtml();
    const $ = cheerio.load(html);
    const emotesCount = $('img').length;
    expect(emotesCount).toBe(1);
  });
});
