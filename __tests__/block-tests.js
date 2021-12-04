const assert = require("assert");
const testUtil = require("./test-util");

module.exports = (eva) => {
  assert.strictEqual(
    eva.eval([
      "begin",

      ["var", "x", 20],
      ["var", "y", 10],
      ["+", ["*", "x", "y"], 30],
    ]),

    230
  );

  assert.strictEqual(
    eva.eval([
      "begin",

      ["var", "x", 10],

      ["begin", ["var", "x", 20], "x"],

      ["var", "y", 20],
      ["+", ["*", "x", "y"], 30],
    ]),

    230
  );

  assert.strictEqual(
    eva.eval([
      "begin",

      ["var", "value", 10],
      ["var", "result", ["begin", ["var", "x", ["+", 40, "value"]], "x"]],

      //["var", "result", ["begin", ["var", "x", ["+", "value", 10]], "x"]],
      "result",
    ]),

    50
  );

  assert.strictEqual(
    eva.eval([
      "begin",

      ["var", "data", 10],
      ["begin", ["set", "data", 100]],

      //["var", "result", ["begin", ["var", "x", ["+", "value", 10]], "x"]],
      "data",
    ]),

    100
  );

  testUtil.test(
    eva,
    `
    (begin
      (var x 10)
      (var y 20)
      (+ (* x 10) y))
  `,
    120
  );
};
