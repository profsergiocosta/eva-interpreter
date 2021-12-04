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

    // comparison operators

    if (exp[0] === ">") {
      return this.eval(exp[1], env) > this.eval(exp[2], env);
    }

    if (exp[0] === "<") {
      return this.eval(exp[1], env) < this.eval(exp[2], env);
    }

    if (exp[0] === ">=") {
      return this.eval(exp[1], env) >= this.eval(exp[2], env);
    }

    if (exp[0] === "<=") {
      return this.eval(exp[1], env) >= this.eval(exp[2], env);
    }

    if (exp[0] === "=") {
      return this.eval(exp[1], env) === this.eval(exp[2], env);
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

    // if
    if (exp[0] === "if") {
      const [_tag, condition, consequent, alternate] = exp;
      if (this.eval(condition, env)) {
        return this.eval(consequent, env);
      } else {
        return this.eval(alternate, env);
      }
    }

    if (exp[0] === "while") {
      const [_tag, condition, body] = exp;
      let result;
      while (this.eval(condition, env)) {
        result = this.eval(body, env);
      }
      return result;
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

module.exports = Eva;
