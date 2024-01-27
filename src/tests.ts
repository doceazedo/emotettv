import { parseBadges, parseEmotes } from ".";
import { tmijsMessageWithEmotes as msg } from "./fixtures/tmijs";

const options = {
  channelId: "98776633",
};
const parsedBadges = await parseBadges(
  msg.tags.badges,
  msg.tags.username,
  options,
);
const parsedMessage = await parseEmotes(msg.message, msg.tags.emotes, options);
console.log(parsedMessage.toArray());
document.body.innerHTML = `<div>${parsedBadges.toHTML(1)} <b style="color:${msg.tags.color}">${msg.tags["display-name"]}</b>: ${parsedMessage.toHTML(1)}</div>`;
