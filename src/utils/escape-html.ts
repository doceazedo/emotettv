const characters: { [char: string]: string } = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};

export const escape = (str: string) => {
  Object.keys(characters).map((char) => {
    const escaped = characters[char];
    str = str.replaceAll(char, escaped);
  });
  return str;
};
