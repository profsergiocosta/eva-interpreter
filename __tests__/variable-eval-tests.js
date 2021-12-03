const assert = require("assert");

module.exports = (eva) => {
  assert.strictEqual(eva.eval(["var", "x", 15]), 15);
  assert.strictEqual(eva.eval("x"), 15);
  assert.strictEqual(eva.eval("VERSION"), "0.1");
  assert.strictEqual(eva.eval("true"), true);

  assert.strictEqual(eva.eval(["var", "a", ["+", 10, 5]]), 15);

  assert.strictEqual(eva.eval(["var", "isUser", "true"]), true);
};
