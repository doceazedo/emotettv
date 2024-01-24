import { parseEmotes } from ".";
import { tmijsMessageWithEmotes } from "./fixtures/tmijs";

const parsedMessage = await parseEmotes(
  tmijsMessageWithEmotes.message,
  tmijsMessageWithEmotes.tags.emotes,
  {
    channelId: "98776633",
  },
);
console.log(parsedMessage.toArray());
document.body.innerHTML = `<div>${parsedMessage.toHTML()}</div>`;
