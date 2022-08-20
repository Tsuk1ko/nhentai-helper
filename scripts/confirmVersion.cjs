const yesno = require('yesno');
const { version } = require('../package.json');

(async () => {
  const ok = await yesno({
    question: `Are you sure you want to publish v${version}?`,
    defaultValue: null,
  });
  if (!ok) process.exit(1);
})();
