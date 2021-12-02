const assert = require("assert");
const { eventNames } = require("process");
const Environment = require("./Environment");
class Eva {
  constructor(global = new Environment()) {
    this.global = global;
  }

  eval(exp, env = this.global) {
    //literals
    if (isNumber(exp)) {
      return exp;
    }

    if (isString(exp)) {
      return exp.slice(1, -1);
    }

    // operators
    if (exp[0] === "+") {
      return this.eval(exp[1], env) + this.eval(exp[2], env);
    }

    if (exp[0] === "*") {
      return this.eval(exp[1], env) * this.eval(exp[2], env);
    }

    // block
    if (exp[0] === "begin") {
      const blockEnv = new Environment({}, env);
      return this._evalBlock(exp, blockEnv);
    }

    // variables
    // declarations
    if (exp[0] === "var") {
      const [_, name, value] = exp;
      return env.define(name, this.eval(value, env));
    }

    // update

    if (exp[0] === "set") {
      const [_, name, value] = exp;
      return env.assign(name, this.eval(value, env));
    }

    // access
    if (isVariableName(exp)) {
      return env.lookup(exp);
    }

    throw `Unimplemented: ${JSON.stringify(exp)}`;
  }

  _evalBlock(block, env) {
    let result;
    const [_tag, ...expressions] = block;
    expressions.forEach((exp) => {
      result = this.eval(exp, env);
    });
    return result;
  }
}

function isNumber(exp) {
  return typeof exp === "number";
}

function isString(exp) {
  return typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"';
}

function isVariableName(exp) {
  return typeof exp === "string" && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp);
}

// ------------------------------
// Tests:

const eva = new Eva(
  new Environment({
    null: null,
    true: true,
    false: false,
    VERSION: "0.1",
  })
);

assert.strictEqual(eva.eval(1), 1);
assert.strictEqual(eva.eval('"ola"'), "ola");
//assert.strictEqual(eva.eval(["+", 10, 5]), 15);
assert.strictEqual(eva.eval(["+", ["+", 10, 5], 8]), 23);
assert.strictEqual(eva.eval(["*", 10, 5]), 50);
assert.strictEqual(eva.eval(["var", "x", 15]), 15);
assert.strictEqual(eva.eval("x"), 15);
assert.strictEqual(eva.eval("VERSION"), "0.1");
assert.strictEqual(eva.eval("true"), true);

assert.strictEqual(eva.eval(["var", "a", ["+", 10, 5]]), 15);

assert.strictEqual(eva.eval(["var", "isUser", "true"]), true);

assert.strictEqual(
  eva.eval(["begin", ["var", "x", 20], ["+", "x", 65]]),

  85
);

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

console.log("All assertions passed!");
