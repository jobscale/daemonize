const { App } = require('app');

class Daemon extends App {
  async start(param) {
    for (;;) {
      await this.waitForNext(param)
      .then(() => this.spawn(...param.command));
    }
  }
  waitForNext(param) {
    const promise = this.promise();
    const check = () => {
      if (new Date().getMinutes() === param.min) {
        this.logger.info(`${new Date()} fire.`);
        promise.resolve();
        return;
      }
      setTimeout(check, 30 * 1000);
    };
    setTimeout(check, (60 - new Date().getSeconds()) * 1000);
    return promise.instance;
  }
}

module.exports = {
  Daemon,
};
