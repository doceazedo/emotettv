import * as cheerio from 'cheerio';
import { parseBadges } from '../src';
import { msgWithTwitchEmotes } from './fixtures/messages';

const getParsedBadges = async () =>
  await parseBadges(
    msgWithTwitchEmotes.tags.badges,
    msgWithTwitchEmotes.channelId
  );

describe('parse twitch badges', () => {
  it('should parse badges to basic array', async () => {
    const parsed = await getParsedBadges();
    const arr = parsed.toBasicArray();
    const isValidArr = arr.every(
      (badge) =>
        !!badge.image_url_1x &&
        !!badge.image_url_2x &&
        !!badge.image_url_4x &&
        !!badge.description &&
        !!badge.title &&
        !!badge.click_action
    );
    expect(isValidArr).toBeTruthy();
  });

  it('should parse badges to minimal array', async () => {
    const parsed = await getParsedBadges();
    const arr = parsed.toMinimalArray();
    const isValidArr = arr.every((badge) => badge.length == 3);
    expect(isValidArr).toBeTruthy();
  });

  it('should parse badges to html', async () => {
    const parsed = await getParsedBadges();
    const html = parsed.toHtml();
    const $ = cheerio.load(html);
    const badgesCount = $('img').length;
    expect(badgesCount).toBe(3);
  });
});
