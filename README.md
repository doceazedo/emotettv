<h1>emoteTTV <img src="https://i.imgur.com/Qgc9fJ4.gif" height="56" width="56" align="right"></h1>

[![npm](https://badgen.net/npm/v/emotettv?ts=1706478283)](https://www.npmjs.com/package/emotettv)
[![install size](https://badgen.net/packagephobia/install/emotettv)](https://packagephobia.com/result?p=emotettv)
[![downloads](https://badgen.net/npm/dt/emotettv)](https://www.npmjs.com/package/emotettv)
[![snyk](https://snyk.io/test/npm/emotettv/badge.svg)](https://snyk.io/test/npm/emotettv)
[![snyk](https://badgen.net/github/license/doceazedo/emotettv)](/LICENSE)

- <img src="https://cdn.betterttv.net/emote/5fa8f232eca18f6455c2b2e1/2x" height="28" align="left"> Supports Twitch, BTTV, FFZ and 7TV emotes and badges
- <img src="https://cdn.7tv.app/emote/63071ba3449e6f5ff95cca6d/2x.webp" height="28" align="left"> Dead simple API — works seamlessly with <a href="https://github.com/tmijs/tmi.js">TMI.js</a> and <a href="https://twurple.js.org">Twurple</a>
- <img src="https://static-cdn.jtvnw.net/emoticons/v2/81274/default/dark/2.0" height="28" align="left"> Works out of the box — no authentication needed
- <img src="https://i.imgur.com/munRwdJ.png" height="28" align="left"> Flexible outputs to fit every need

## Demo

Checkout this [demo app](https://emotettv.gitbook.io/emotettv/examples) to see emoteTTV in action! ⛹️

## Basic usage

> [!WARNING]
> Remember to _always_ sanitize user messages! If your frontend library doesn't do that for you, you can take a look at [DOMPurify](https://github.com/cure53/DOMPurify).

```js
import { parseEmotes } from "emotettv";

const parsed = await parseEmotes("Hello emotettv! D:");
console.log(parsed.toHTML());
// > Hello emotettv! <figure><img src="..." alt="D:" /></figure>
```

If you're using [TMI.js](https://github.com/tmijs/tmi.js), you can pass your tags directly to emoteTTV:

```js
import { parseBadges, parseEmotes } from "emotettv";
import tmi from "tmi.js";

const options = {
  channelId: "98776633",
};

client.on("message", async (channel, tags, text, self) => {
  const badges = await parseBadges(tags.badges, tags.username, options);
  const message = await parseEmotes(text, tags.emotes, options);
  const htmlBadges = badges.toHTML();
  const htmlMessage = message.toHTML();
  const displayName = tags["display-name"];
  document.body.innerHTML = `${htmlBadges} ${displayName}: ${htmlMessage}`;
});
```

## Docs

Check more examples and API reference on the [emoteTTV docs](https://emotettv.gitbook.io).

## License

The emoteTTV project is licensed under the [GPLv3 License](./LICENSE).
