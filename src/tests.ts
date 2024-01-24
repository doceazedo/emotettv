import { parseEmotes } from ".";
import { tmijsMessageWithEmotes } from "./fixtures/tmijs";

const parsedMessage = await parseEmotes(
  tmijsMessageWithEmotes.message,
  tmijsMessageWithEmotes.tags.emotes,
);
console.log(parsedMessage.toArray());
document.body.innerHTML = `<p>${parsedMessage.toHTML()}</p>`;
