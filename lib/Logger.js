class Logger {
  constructor(prefix) {
    this.prefix = prefix
  }
}

Logger.prototype.log = function(text) {
  console.log(`[${this.prefix} ] ${text}`);
}

Logger.prototype.warn = function(text) {
  console.log(`\x1b[33m%s\x1b[0m`, `[${this.prefix} ] ${text}`);
}

Logger.prototype.error = function(text) {
  console.log(`\x1b[31m%s\x1b[0m`, `[${this.prefix} ] ${text}`);
}

module.exports = Logger;