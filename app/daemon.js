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
    schedule(cron, promise.resolve);
    return promise.instance;
  }
  build() {
    return this.env.cron.map(cron => ({
      cron,
      command: this.env.command,
    }));
  }
  run(param) {
    this.schedule(param.cron)
    .then(() => this.spawn(
      ...param.command,
    ));
  }
}

module.exports = {
  Daemon,
};
