const { copyFileSync } = require('fs');
const path = require('path');

const main = () => copyFileSync(
  path.resolve(__dirname, '../package.json'),
  path.resolve(__dirname, '../dist/package.json')
);
main();
