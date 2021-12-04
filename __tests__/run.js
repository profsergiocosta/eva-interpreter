const tests = [
  require("./self-eval-tests.js"),
  require("./math-eval-tests.js"),
  require("./variable-eval-tests.js"),
  require("./block-tests.js"),
  require("./if-test.js"),
  require("./while-test.js"),
  require("./buit-in-function-test.js"),
];

const Eva = require("../Eva");
const Environment = require("../Environment");

const eva = new Eva();

tests.forEach((test) => test(eva));

console.log("All assertions passed!");
