const tests = [
  require("./self-eval-tests.js"),
  require("./math-eval-tests.js"),
  require("./variable-eval-tests.js"),
  require("./block-eval-tests.js"),
];

const Eva = require("../Eva");
const Environment = require("../Environment");

const eva = new Eva(
  new Environment({
    null: null,
    true: true,
    false: false,
    VERSION: "0.1",
  })
);

tests.forEach((test) => test(eva));

console.log("All assertions passed!");
