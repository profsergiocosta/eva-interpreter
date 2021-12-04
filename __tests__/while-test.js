const assert = require("assert");

module.exports = (eva) => {
  assert.strictEqual(
    eva.eval([
      "begin",
      ["var", "counter", 0],
      ["var", "result", 0],
      [
        "while",
        ["<", "counter", 10],
        [
          "begin",
          //result++
          ["set", "counter", ["+", "counter", 1]],
          ["set", "result", ["+", "result", "counter"]],
        ],
      ], // while
      "result",
    ]),
    55
  );
};
/*
        [("set", "result", ['+', 'result', 1] )], 
        ["set", "y", 30]],

        */
