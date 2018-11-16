const { spawn } = require('child_process');

class App {
  constructor() {
    this.logManager = console;
  }
  get logger() {
    return this.logManager;
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

module.exports = {
  App,
};
