import * as cheerio from 'cheerio';
import { parseEmotes } from '../src';
import { customEmotesFactory } from './fixtures/factories';
import {
  msgWithCustomEmotes,
  msgWithThirdPartyEmotes,
  msgWithTwitchEmotes,
} from './fixtures/messages';

const getTwitchEmotesMsg = async () =>
  await parseEmotes(
    msgWithTwitchEmotes.message,
    msgWithTwitchEmotes.tags.emotes,
    {
      channelId: msgWithTwitchEmotes.channelId,
    }
  );

const getThirdPartyEmotesMsg = async (enableThirdPartyProviders = true) =>
  await parseEmotes(
    msgWithThirdPartyEmotes.message,
    msgWithThirdPartyEmotes.tags.emotes,
    {
      channelId: msgWithThirdPartyEmotes.channelId,
      thirdPartyProviders: {
        bttv: enableThirdPartyProviders,
        ffz: enableThirdPartyProviders,
      },
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

describe('parse third party emotes', () => {
  it('should parse message to words', async () => {
    const parsed = await getThirdPartyEmotesMsg();
    const words = parsed.toWords();
    const emotesCount = words.filter((word) => !!word.emote).length;
    expect(emotesCount).toBe(2);
  });

  it('should parse message to words with no emotes', async () => {
    const parsed = await getThirdPartyEmotesMsg(false);
    const words = parsed.toWords();
    const emotesCount = words.filter((word) => !!word.emote).length;
    expect(emotesCount).toBe(0);
  });
});

// TODO: test parser without channelId
// TODO: write more/better tests in general
