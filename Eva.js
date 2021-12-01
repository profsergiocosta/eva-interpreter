const assert = require("assert");

class Eva {
  eval(exp) {
    if (isNumber(exp)) {
      return exp;
    }

    if (isString(exp)) {
      return exp.slice(1, -1);
    }

    if (exp[0] === "+") {
      return this.eval(exp[1]) + this.eval(exp[2]);
    }

    if (exp[0] === "*") {
      return this.eval(exp[1]) * this.eval(exp[2]);
    }

    throw "Unimplemented";
  }
}

function isNumber(exp) {
  return typeof exp === "number";
}

function isString(exp) {
  return typeof exp === "string" && exp[0] === '"' && exp.slice(-1) === '"';
}

// ------------------------------
// Tests:

const eva = new Eva();

assert.strictEqual(eva.eval(1), 1);
assert.strictEqual(eva.eval('"ola"'), "ola");
//assert.strictEqual(eva.eval(["+", 10, 5]), 15);
assert.strictEqual(eva.eval(["+", ["+", 10, 5], 8]), 23);
assert.strictEqual(eva.eval(["*", 10, 5]), 50);

console.log("All assertions passed!");
