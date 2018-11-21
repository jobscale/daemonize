const { spawn } = require('child_process');

class App {
  constructor() {
    this.logManager = console;
  }
  get logger() {
    return this.logManager;
  }
  spawn(...argv) {
    const promise = this.promise();
    const run = {
      success: out => this.logger.info(`${out}`),
      fail: out => this.logger.error(`${out}`),
      close: out => {
        this.logger.log(`Code: ${out}`);
        if (out) promise.reject(out);
        else promise.resolve(out);
      },
      start: () => {
        const child = spawn(...argv);
        child.stdout.on('data', run.success);
        child.stderr.on('data', run.fail);
        child.on('close', run.close);
      },
    };
    run.start();
    return promise.instance;
  }
  promise() {
    const p = {};
    p.instance = new Promise((...v) => {
      [p.resolve, p.reject] = v;
    });
    return p;
  }
}

module.exports = {
  App,
};
