const { Daemon } = require('daemon');

const data = {
  command: ['cinnamon-screensaver-command', ['-a']],
  min: 54,
};

(async () => {
  const daemon = new Daemon();
  daemon.start(data)
  .then(daemon.logger.info)
  .catch(daemon.logger.error);
})();
