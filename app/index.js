const { Daemon } = require('daemon');
const { hostname } = require('os');
const { Env } = require(`../env/${hostname()}`);

(async () => new Daemon(Env).start())();
