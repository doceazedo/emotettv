<h1>emoteTTV <img src="https://i.imgur.com/7zlS0zX.gif" height="34" align="right"></h1>

[![npm](https://badgen.net/npm/v/emotettv)](https://www.npmjs.com/package/emotettv)
[![install size](https://badgen.net/packagephobia/install/emotettv)](https://packagephobia.com/result?p=emotettv)
[![downloads](https://badgen.net/npm/dt/emotettv)](https://www.npmjs.com/package/emotettv)
[![snyk](https://snyk.io/test/npm/emotettv/badge.svg)](https://snyk.io/test/npm/emotettv)
[![snyk](https://badgen.net/github/license/doceazedo/emotettv)](/LICENSE)

- <img src="https://cdn.betterttv.net/emote/5fa8f232eca18f6455c2b2e1/1x" height="28" align="left"> Works with Twitch, BTTV and FFZ emotes
- <img src="https://static-cdn.jtvnw.net/emoticons/v2/81274/default/dark/1.0" height="28" align="left"> Dead simple API - works seamlessly with <a href="https://github.com/tmijs/tmi.js">TMI.js</a>
- <img src="https://static-cdn.jtvnw.net/emoticons/v2/304486301/default/dark/1.0" height="28" align="left"> Flexible results to fit every need

## Demo

Checkout this Svelte [demo app](https://svelte.dev/repl/9b8bd1e644814acb85c1a3ecf439eab5?version=3.46.4) to see emoteTTV in action ⛹️

## Installation

```bash
npm install emotettv
# or with yarn
yarn add emotettv
```

```js
import { parseBadges, parseEmotes, ... } from 'emotettv';
```

## Usage

**🚨 Remember to always sanitize user messages! If your frontend library doesn't do that for you, I recommend using [DOMPurify](https://github.com/cure53/DOMPurify).**

### parseEmotes(...)

Returns the initial message as an array of words and emotes.

**Parameters**

- message `string` - Message string to parse
- emotes [`EmotePositions`](/src/modules/get-emotes/index.ts#L5) - List of emote positions, like tmi.js `tags.emotes`
- channelId `string` - Twitch ID of the channel the message is from

**Returns**: Promise<[`Word[]`](/src/modules/parse-emotes/index.ts#L1)>

### parseBadges(...)

Returns an object with the user badges

**Parameters**

- badgesData [`Badges`](/src/modules/parse-badges/index.ts#L1) - List of the user badges, like tmi.js `tags.badges`
- channelId `string` - Twitch ID of the channel the message is from

**Returns**: Promise<[`ParsedBadges`](/src/modules/parse-badges/index.ts#L16)>

## Building

```bash
git clone https://github.com/doceazedo/emotettv.git
cd emotettv
npm install # or yarn
npm run build # or yarn build
```

## License

The emoteTTV project is licensed under the [GPLv3 License](./LICENSE).
