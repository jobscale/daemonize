const { schedule } = require('node-cron');
const { App } = require('app');

class Daemon extends App {
  constructor(env) {
    super();
    this.env = env;
  }
  start() {
    this.build()
    .forEach(cron => this.run(cron));
  }
  schedule(cron) {
    const promise = this.promise();
    schedule(cron, promise.resolve, {
      scheduled: true,
      timezone: 'Asia/Tokyo',
    });
    return promise.instance;
  }
  build() {
    return this.env.cron.map(cron => ({
      cron,
      command: this.env.command,
    }));
  }
  fire(param) {
    this.logger.info(`${new Date()} daemon-fire`);
    this.spawn(...param.command)
    .catch(e => this.logger.error({ Error: e }));
  }
  run(param) {
    this.schedule(param.cron)
    .then(() => this.fire(param));
  }
}

module.exports = {
  Daemon,
};
