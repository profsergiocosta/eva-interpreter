const assert = require("assert");

module.exports = (eva) => {
  assert.strictEqual(eva.eval(["+", ["+", 10, 5], 8]), 23);
  assert.strictEqual(eva.eval(["*", 10, 5]), 50);
};
