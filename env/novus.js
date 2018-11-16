const Env = {
  command: ['cinnamon-screensaver-command', ['-a']],
  cron: [
    '54 2 * * *',
    '54 6 * * *',
    '54 10 * * *',
    '54 14 * * *',
    '54 18 * * *',
    '54 22 * * *',
  ],
};

module.exports = {
  Env,
};
