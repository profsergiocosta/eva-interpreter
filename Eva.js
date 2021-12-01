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
      return this.eval(exp[1]) + this.eval(exp[2]);
    }

    if (exp[0] === "*") {
      return this.eval(exp[1]) * this.eval(exp[2]);
    }

    // variables
    // declarations
    if (exp[0] === "var") {
      const [_, name, value] = exp;
      return env.define(name, value);
    }
    // access
    if (isVariableName(exp)) {
      return env.lookup(exp);
    }

    throw `Unimplemented: ${JSON.stringify(exp)}`;
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

const eva = new Eva();

assert.strictEqual(eva.eval(1), 1);
assert.strictEqual(eva.eval('"ola"'), "ola");
//assert.strictEqual(eva.eval(["+", 10, 5]), 15);
assert.strictEqual(eva.eval(["+", ["+", 10, 5], 8]), 23);
assert.strictEqual(eva.eval(["*", 10, 5]), 50);
assert.strictEqual(eva.eval(["var", "x", 15]), 15);
assert.strictEqual(eva.eval("x"), 15);

console.log("All assertions passed!");
