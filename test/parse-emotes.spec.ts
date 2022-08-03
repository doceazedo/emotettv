import * as cheerio from 'cheerio';
import { parseEmotes } from '../src';
import { customEmotesFactory } from './fixtures/factories';
import { msgWithCustomEmotes, msgWithTwitchEmotes } from './fixtures/messages';

const getTwitchEmotesMsg = async () =>
  await parseEmotes(
    msgWithTwitchEmotes.message,
    msgWithTwitchEmotes.tags.emotes,
    {
      channelId: msgWithTwitchEmotes.channelId,
    }
  );

const getCustomEmotesMsg = async () =>
  await parseEmotes(msgWithCustomEmotes.message, null, {
    customEmotes: customEmotesFactory,
  });

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

  it('should parse message with custom emotes', async () => {
    const parsed = await getCustomEmotesMsg();
    const words = parsed.toWords();
    const emotesCount = words.filter((word) => !!word.emote).length;
    expect(emotesCount).toBe(2);
  });
});

// TODO: test parser without channelId
// TODO: write more/better tests in general
