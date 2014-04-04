(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.returnExports = factory();
  }
}(this, function () {

  function thrw(msg) {
    throw new Error(msg);
  }

  /**
   * Description
   * @method isFunction
   * @param {} obj
   * @return bool
   */
  function isFunction(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  }

  var isArray = Array.isArray || function (obj) {
    return toString.call(obj) === "[object Array]";
  };

  /**
   * Description
   * @method noop
   * @return
   */
  function noop() {}
  /**
   * Description
   * @method returns
   * @param {} arg
   * @return FunctionExpression
   */
  noop.returns = function (arg) { return function () { return arg; }; };

  /**
   * Description
   * @method forEach
   * @param {} o
   * @param {} iter
   * @param {} ctx
   * @return
   */
  function forEach(o, iter, ctx) {
    for (var k in o) { iter.call(ctx, o[k], k); }
  }

  /**
   * Description
   * @method map
   * @param {} o
   * @param {} iter
   * @param {} ctx
   * @return result
   */
  function map(o, iter, ctx) {
    var result = [];
    forEach(o, function (v, k) { result.push(iter(v, k)); }, ctx);
    return result;
  }

  /**
   * Description
   * @method copyFn
   * @param {} a
   * @param {} b
   * @return FunctionExpression
   */
  function copyFn(a, b) {
    return function (prop) { a[prop] = b[prop]; };
  }

  /**
   * Description
   * @method extend
   * @param {object} obj
   * @params {object}... objects used to extend primary arg
   * @return obj
   */
  function extend(obj) {
    forEach(Array.prototype.slice.call(arguments, 1), function (source) {
      if (source) { forEach(source, copyFn(obj, source)); }
    });
    return obj;
  }

  /**
   * Description
   * @method pick
   * @param {object} o
   * @param {array} p
   * @return result
   */
  function pick(o, p) {
    var result = {};
    if (!isArray(p)) { thrw('missing arg'); }
    forEach(o, function (v, k) {
      if (!!~p.indexOf(k)) { result[k] = v; }
    });
    return result;
  }

  return {
    isArray: isArray,
    isFunction: isFunction,
    noop: noop,
    forEach: forEach,
    map: map,
    pick: pick,
    extend: extend
  };
}));