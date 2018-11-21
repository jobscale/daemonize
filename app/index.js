const { Daemon } = require('daemon');
const { hostname } = require('os');

/* eslint-disable import/no-dynamic-require */
const { Env } = require(`../env/${hostname()}`); /* eslint-enable import/no-dynamic-require */

(async () => new Daemon(Env).start())();
