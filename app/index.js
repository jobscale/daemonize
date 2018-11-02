const { spawn } = require('child_process');

const data = {
  command: ['cinnamon-screensaver-command', ['-a']],
  min: 54,
};

class App {
  constructor() {
    this.logManager = console;
  }
  get logger() {
    return this.logManager;
  }
}

class Daemon extends App {
  async start(command) {
    for (;;) {
      await this.waitForNext()
      .then(() => this.spawn(...command));
    }
  }
  waitForNext() {
    const promise = this.promise();
    const check = () => {
      if (new Date().getMinutes() === data.min) {
        this.logger.info(`${new Date()} fire.`);
        promise.resolve();
        return;
      }
      setTimeout(check, 30 * 1000);
    };
    setTimeout(check, (60 - new Date().getSeconds()) * 1000);
    return promise.instance;
  }
  spawn(...argv) {
    const child = spawn(...argv);
    child.stdout.on('data', out => this.logger.info(`${out}`));
    child.stderr.on('data', out => this.logger.error(`${out}`));
    child.on('close', out => this.logger.log(`Code: ${out}`));
  }
  promise() {
    const p = {};
    p.instance = new Promise((...v) => {
      [p.resolve, p.reject] = v;
    });
    return p;
  }
}

(async () => new Daemon().start(data.command))();
