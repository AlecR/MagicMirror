class Logger {
  constructor(prefix) {
    this.prefix = prefix
  }
}

Logger.prototype.log = function(text) {
  console.log(`[${this.prefix} ] ${text}`);
}

module.exports = Logger;