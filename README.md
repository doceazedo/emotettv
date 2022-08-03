<h1>emoteTTV <img src="https://i.imgur.com/Qgc9fJ4.gif" height="56" width="56" align="right"></h1>

[![npm](https://badgen.net/npm/v/emotettv)](https://www.npmjs.com/package/emotettv)
[![install size](https://badgen.net/packagephobia/install/emotettv)](https://packagephobia.com/result?p=emotettv)
[![downloads](https://badgen.net/npm/dt/emotettv)](https://www.npmjs.com/package/emotettv)
[![snyk](https://snyk.io/test/npm/emotettv/badge.svg)](https://snyk.io/test/npm/emotettv)
[![snyk](https://badgen.net/github/license/doceazedo/emotettv)](/LICENSE)

- <img src="https://cdn.betterttv.net/emote/5fa8f232eca18f6455c2b2e1/1x" height="28" align="left"> Works with Twitch, BTTV and FFZ emotes
- <img src="https://static-cdn.jtvnw.net/emoticons/v2/81274/default/dark/1.0" height="28" align="left"> Dead simple API - works seamlessly with <a href="https://github.com/tmijs/tmi.js">TMI.js</a>
- <img src="https://static-cdn.jtvnw.net/emoticons/v2/304486301/default/dark/1.0" height="28" align="left"> Flexible results to fit every need

> ### ⚠ This is still in development, breaking changes and bugs are expected until the 1.0.0 release.

## Demo

Checkout this [demo app](https://codesandbox.io/s/6efhse?file=/src/index.js) to see emoteTTV in action ⛹️

## Installation

```bash
npm install emotettv
# or with yarn
yarn add emotettv
```

```js
import { parseBadges, parseEmotes } from 'emotettv';
```

## Basic usage

**🚨 Remember to always sanitize user messages! If your frontend library doesn't do that for you, I recommend using [DOMPurify](https://github.com/cure53/DOMPurify).**

```js
import tmi from 'tmi.js';
import { parseBadges, parseEmotes } from 'emotettv';

const channelId = '98776633';
const client = new tmi.Client({
  channels: ['doceazedo911'],
});
client.connect();

const options = {
  channelId,
};

client.on('message', async (channel, tags, message) => {
  const parsedMessage = await parseEmotes(message, tags.emotes, options);
  const parsedBadges = await parseBadges(tags.badges, options);
  const htmlMessage = parsedMessage.toHtml();
  const htmlBadges = parsedBadges.toHtml();

  document.body.innerHTML += `${htmlBadges} ${tags['display-name']}: ${htmlMessage}`;
});
```

## Methods

### parseEmotes(...)

**Parameters**

- message: Message string to parse
- emotes: List of emote positions, like tmi.js [`tags.emotes`](/src/badges/badges.types.ts#L1)
- options: Optional parser settings
  ```js
  {
    channelId: '', // Twitch ID of the channel the message is from
    thirdPartyProviders: {
      bttv: true, // Parse BTTV emotes
      ffz: true, // Parse FFZ emotes
    };
    customEmotes: {
      list: new Map(); // Map of <emote code, emote ID>
      make: (code) => []; // Function that returns array of emote URLs
    },
  }
  ```

**Usage**

```js
const parsed = await parseEmotes(message, emotes, {
  channelId: '98776633',
});

const html = parsed.toHtml();
// hello world! <img src="..." alt="VoHiYo" />

const words = parsed.toWords();
// [
//   { text: 'hello' },
//   { text: 'world!' },
//   { text: 'VoHiYo', emote: { url: ['1x', '2x', '3x'] } }
// ]
```

### parseBadges(...)

**Parameters**

- badgesData: List of the user badges, like tmi.js [`tags.badges`](/src/badges/badges.types.ts#L28)
- options: Optional parser settings
  ```js
  {
    channelId: '', // Twitch ID of the channel the message is from
  }
  ```

**Usage**

```js
const parsed = await parseBadges(badges, {
  channelId: '98776633',
});

const html = parsed.toHtml();
// <img src="..." alt="premium" /> <img src="..." alt="subscriber" />

const minimal = parsed.toMinimalArray();
// [
//   [ '1x', '2x', '4x' ],
//   [ '1x', '2x', '4x' ]
// ]

const basic = parsed.toBasicArray();
// [
//   { ... },
//   { ... },
// ]
```

## Building

```bash
git clone https://github.com/doceazedo/emotettv.git
cd emotettv
npm install # or yarn
npm run build # or yarn build
```

## License

The emoteTTV project is licensed under the [GPLv3 License](./LICENSE).
