class Environment {
  constructor(record = {}) {
    this.record = record;
  }
  define(name, value) {
    this.record[name] = value;
    return value;
  }
  lookup(name) {
    if (!this.record.hasOwnProperty(name)) {
      throw new ReferenceError(`variable "${name}" is not defined`);
    }
    return this.record[name];
  }
}

module.exports = Environment;
