var ap = Array.prototype, op = Object.prototype,
  toString = op.toString,
  nativeForEach = ap.forEach,
  nativeMap = ap.map,
  nativeReduce = ap.reduce,
  nativeIsArray = Array.isArray;

function thrw(msg) {
  throw new Error(msg);
}

function copyFn(a, b) {
  return function (prop) { a[prop] = b[prop]; };
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

var isArray = nativeIsArray || function (obj) {
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
  if (o === undefined) { return o; }
  if (nativeForEach && o.forEach === nativeForEach) {
    return o.forEach(iter, ctx);
  }
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
  if (o === undefined) { return result; }
  if (nativeMap && o.map === nativeMap) return o.map(iter, ctx);
  forEach(o, function (v, k) { result.push(iter(v, k)); }, ctx);
  return result;
}

function reduce(o, iter, memo, ctx) {
  if (o === undefined) { o = []; }
  if (nativeReduce && o.reduce === nativeReduce) {
    return o.reduce(iter, memo.bind(ctx));
  }
  forEach(o, function (value, index, list) {
    memo = iter.call(ctx, memo, value, index, list);
  });
  return memo;
}

/**
 * Description
 * @method extend
 * @param {object} obj
 * @params {object}... objects used to extend primary arg
 * @return obj
 */
function extend(o) {
  forEach(Array.prototype.slice.call(arguments, 1), function (source) {
    if (source) { forEach(source, copyFn(o, source)); }
  });
  return o;
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
  reduce: reduce,
  pick: pick,
  extend: extend,
  filter: Array.prototype.filter
};