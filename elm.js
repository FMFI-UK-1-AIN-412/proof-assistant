
(function() {
'use strict';

function F2(fun)
{
  function wrapper(a) { return function(b) { return fun(a,b); }; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{
  function wrapper(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  }
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  }
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  }
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  }
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  }
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e)
{
  return fun.arity === 5
    ? fun.func(a, b, c, d, e)
    : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f)
{
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g)
{
  return fun.arity === 7
    ? fun.func(a, b, c, d, e, f, g)
    : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h)
{
  return fun.arity === 8
    ? fun.func(a, b, c, d, e, f, g, h)
    : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i)
{
  return fun.arity === 9
    ? fun.func(a, b, c, d, e, f, g, h, i)
    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

function div(a, b)
{
	return (a / b) | 0;
}
function rem(a, b)
{
	return a % b;
}
function mod(a, b)
{
	if (b === 0)
	{
		throw new Error('Cannot perform mod 0. Division by zero error.');
	}
	var r = a % b;
	var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

	return m === b ? 0 : m;
}
function logBase(base, n)
{
	return Math.log(n) / Math.log(base);
}
function negate(n)
{
	return -n;
}
function abs(n)
{
	return n < 0 ? -n : n;
}

function min(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
}

function xor(a, b)
{
	return a !== b;
}
function not(b)
{
	return !b;
}
function isInfinite(n)
{
	return n === Infinity || n === -Infinity;
}

function truncate(n)
{
	return n | 0;
}

function degrees(d)
{
	return d * Math.PI / 180;
}
function turns(t)
{
	return 2 * Math.PI * t;
}
function fromPolar(point)
{
	var r = point._0;
	var t = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(x) { return x; },
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
		var n = x.ctor.slice(6) - 0;
		var err = 'cannot compare tuples with more than 6 elements.';
		if (n === 0) return EQ;
		if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
		if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
		if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
		if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
		if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
		if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
		if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
		return EQ;
	}

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(x, y)
{
	return {
		ctor: '_Tuple2',
		_0: x,
		_1: y
	};
}

function chr(c)
{
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return {
		ctor: '::',
		_0: hd,
		_1: tl
	};
}

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(moduleName, region)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function crashCase(moduleName, region, value)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
			+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
			+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function regionToString(region)
{
	if (region.start.line == region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'between lines ' + region.start.line + ' and ' + region.end.line;
}


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		return '<function>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
			  .replace(/\n/g, '\\n')
			  .replace(/\t/g, '\\t')
			  .replace(/\r/g, '\\r')
			  .replace(/\v/g, '\\v')
			  .replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$never = function (_p0) {
	never:
	while (true) {
		var _p1 = _p0;
		var _v1 = _p1._0;
		_p0 = _v1;
		continue never;
	}
};
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return A2(f, _p3._0, _p3._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$always = F2(
	function (a, _p4) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$JustOneMore = function (a) {
	return {ctor: 'JustOneMore', _0: a};
};

var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		var _p1 = maybeValue;
		if (_p1.ctor === 'Just') {
			return callback(_p1._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p2 = maybe;
		if (_p2.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p3._0._0, _p3._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}

function foldr(f, b, xs)
{
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(f, xs, ys)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]')
	{
		arr.push(A2(f, xs._0, ys._0));
		xs = xs._1;
		ys = ys._1;
	}
	return fromArray(arr);
}

function map3(f, xs, ys, zs)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
	{
		arr.push(A3(f, xs._0, ys._0, zs._0));
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map4(f, ws, xs, ys, zs)
{
	var arr = [];
	while (   ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map5(f, vs, ws, xs, ys, zs)
{
	var arr = [];
	while (   vs.ctor !== '[]'
		   && ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
		vs = vs._1;
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function sortBy(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$singleton = function (value) {
	return {
		ctor: '::',
		_0: value,
		_1: {ctor: '[]'}
	};
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return !isOkay(_p2);
			},
			list);
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (front, back) {
				return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return {ctor: '::', _0: _p10._0, _1: xs};
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, x, _p11._0),
						_1: accAcc
					};
				} else {
					return {ctor: '[]'};
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				{
					ctor: '::',
					_0: b,
					_1: {ctor: '[]'}
				},
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		{ctor: '[]'},
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: x, _1: _p16},
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: {ctor: '::', _0: x, _1: _p15}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
				_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var step = F2(
				function (x, rest) {
					return {
						ctor: '::',
						_0: sep,
						_1: {ctor: '::', _0: x, _1: rest}
					};
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				{ctor: '[]'},
				_p21._1);
			return {ctor: '::', _0: _p21._0, _1: spersed};
		}
	});
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = {ctor: '::', _0: _p22._0, _1: taken};
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				{ctor: '[]'}));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return {ctor: '[]'};
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return {
											ctor: '::',
											_0: _p23._1._0,
											_1: {
												ctor: '::',
												_0: _p23._1._1._0,
												_1: {ctor: '[]'}
											}
										};
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._1._0,
														_1: {ctor: '[]'}
													}
												}
											};
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
														}
													}
												}
											} : {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
														}
													}
												}
											};
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return {
					ctor: '::',
					_0: _p23._1._0,
					_1: {ctor: '[]'}
				};
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = {ctor: '::', _0: value, _1: result},
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			{ctor: '[]'},
			n,
			value);
	});
var _elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
				var _v30 = lo,
					_v31 = hi - 1,
					_v32 = {ctor: '::', _0: hi, _1: list};
				lo = _v30;
				hi = _v31;
				list = _v32;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var _elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(
			_elm_lang$core$List$rangeHelp,
			lo,
			hi,
			{ctor: '[]'});
	});
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(message)
{
	throw new Error(message);
}

return {
	crash: crash,
	log: F2(log)
};

}();
//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

function isEmpty(str)
{
	return str.length === 0;
}
function cons(chr, str)
{
	return chr + str;
}
function uncons(str)
{
	var hd = str[0];
	if (hd)
	{
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
}
function length(str)
{
	return str.length;
}
function map(f, str)
{
	var out = str.split('');
	for (var i = out.length; i--; )
	{
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
}
function reverse(str)
{
	return str.split('').reverse().join('');
}
function foldl(f, b, str)
{
	var len = str.length;
	for (var i = 0; i < len; ++i)
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
}
function repeat(n, str)
{
	var result = '';
	while (n > 0)
	{
		if (n & 1)
		{
			result += str;
		}
		n >>= 1, str += str;
	}
	return result;
}
function slice(start, end, str)
{
	return str.slice(start, end);
}
function left(n, str)
{
	return n < 1 ? '' : str.slice(0, n);
}
function right(n, str)
{
	return n < 1 ? '' : str.slice(-n);
}
function dropLeft(n, str)
{
	return n < 1 ? str : str.slice(n);
}
function dropRight(n, str)
{
	return n < 1 ? str : str.slice(0, -n);
}
function pad(n, chr, str)
{
	var half = (n - str.length) / 2;
	return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
}
function padRight(n, chr, str)
{
	return str + repeat(n - str.length, chr);
}
function padLeft(n, chr, str)
{
	return repeat(n - str.length, chr) + str;
}

function trim(str)
{
	return str.trim();
}
function trimLeft(str)
{
	return str.replace(/^\s+/, '');
}
function trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function words(str)
{
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
}

function toUpper(str)
{
	return str.toUpperCase();
}
function toLower(str)
{
	return str.toLowerCase();
}

function any(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return true;
		}
	}
	return false;
}
function all(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return false;
		}
	}
	return true;
}

function contains(sub, str)
{
	return str.indexOf(sub) > -1;
}
function startsWith(sub, str)
{
	return str.indexOf(sub) === 0;
}
function endsWith(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
}
function indexes(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _elm_lang$core$Native_List.fromArray(is);
}


function toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return intErr(s);
	}

	// if hex
	var c = s[0];
	if (c === '0' && s[1] === 'x')
	{
		for (var i = 2; i < len; ++i)
		{
			var c = s[i];
			if (('0' <= c && c <= '9') || ('A' <= c && c <= 'F') || ('a' <= c && c <= 'f'))
			{
				continue;
			}
			return intErr(s);
		}
		return _elm_lang$core$Result$Ok(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && c !== '-' && c !== '+'))
	{
		return intErr(s);
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return intErr(s);
		}
	}

	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function intErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int");
}


function toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return floatErr(s);
	}
	var n = +s;
	// faster isNaN check
	return n === n ? _elm_lang$core$Result$Ok(n) : floatErr(s);
}

function floatErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float");
}


function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (callback, result) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$mapError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				stepState:
				while (true) {
					var _p3 = _p2;
					var _p9 = _p3._1;
					var _p8 = _p3._0;
					var _p4 = _p8;
					if (_p4.ctor === '[]') {
						return {
							ctor: '_Tuple2',
							_0: _p8,
							_1: A3(rightStep, rKey, rValue, _p9)
						};
					} else {
						var _p7 = _p4._1;
						var _p6 = _p4._0._1;
						var _p5 = _p4._0._0;
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				{
					ctor: '::',
					_0: 'Internal red-black tree invariant violated, expected ',
					_1: {
						ctor: '::',
						_0: msg,
						_1: {
							ctor: '::',
							_0: ' and got ',
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Basics$toString(c),
								_1: {
									ctor: '::',
									_0: '/',
									_1: {
										ctor: '::',
										_0: lgot,
										_1: {
											ctor: '::',
											_0: '/',
											_1: {
												ctor: '::',
												_0: rgot,
												_1: {
													ctor: '::',
													_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
	return function (xk) {
		return function (xv) {
			return function (yk) {
				return function (yv) {
					return function (zk) {
						return function (zv) {
							return function (a) {
								return function (b) {
									return function (c) {
										return function (d) {
											return A5(
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = color;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						color,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						color,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

var _elm_tools$parser_primitives$Native_ParserPrimitives = function() {


// STRINGS

function isSubString(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var bigLength = bigString.length - offset;

	if (bigLength < smallLength)
	{
		return tuple3(-1, row, col);
	}

	for (var i = 0; i < smallLength; i++)
	{
		var char = smallString[i];

		if (char !== bigString[offset + i])
		{
			return tuple3(-1, row, col);
		}

		// if it is a two word character
		if ((bigString.charCodeAt(offset) & 0xF800) === 0xD800)
		{
			i++
			if (smallString[i] !== bigString[offset + i])
			{
				return tuple3(-1, row, col);
			}
			col++;
			continue;
		}

		// if it is a newline
		if (char === '\n')
		{
			row++;
			col = 1;
			continue;
		}

		// if it is a one word character
		col++
	}

	return tuple3(offset + smallLength, row, col);
}

function tuple3(a, b, c)
{
	return { ctor: '_Tuple3', _0: a, _1: b, _2: c };
}


// CHARS

var mkChar = _elm_lang$core$Native_Utils.chr;

function isSubChar(predicate, offset, string)
{
	if (offset >= string.length)
	{
		return -1;
	}

	if ((string.charCodeAt(offset) & 0xF800) === 0xD800)
	{
		return predicate(mkChar(string.substr(offset, 2)))
			? offset + 2
			: -1;
	}

	var char = string[offset];

	return predicate(mkChar(char))
		? ((char === '\n') ? -2 : (offset + 1))
		: -1;
}


// FIND STRING

function findSubString(before, smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);

	if (newOffset === -1)
	{
		return tuple3(-1, row, col);
	}

	var scanTarget = before ? newOffset	: newOffset + smallString.length;

	while (offset < scanTarget)
	{
		var char = bigString[offset];

		if (char === '\n')
		{
			offset++;
			row++;
			col = 1;
			continue;
		}

		if ((bigString.charCodeAt(offset) & 0xF800) === 0xD800)
		{
			offset += 2;
			col++;
			continue;
		}

		offset++;
		col++;
	}

	return tuple3(offset, row, col);
}


return {
	isSubString: F5(isSubString),
	isSubChar: F3(isSubChar),
	findSubString: F6(findSubString)
};

}();

var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

var _elm_lang$core$Tuple$mapSecond = F2(
	function (func, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: func(_p1._1)
		};
	});
var _elm_lang$core$Tuple$mapFirst = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: func(_p3._0),
			_1: _p3._1
		};
	});
var _elm_lang$core$Tuple$second = function (_p4) {
	var _p5 = _p4;
	return _p5._1;
};
var _elm_lang$core$Tuple$first = function (_p6) {
	var _p7 = _p6;
	return _p7._0;
};

//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function program(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flags !== 'undefined')
				{
					throw new Error(
						'The `' + moduleName + '` module does not need flags.\n'
						+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
					);
				}

				return initialize(
					impl.init,
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function programWithFlags(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flagDecoder === 'undefined')
				{
					throw new Error(
						'Are you trying to sneak a Never value into Elm? Trickster!\n'
						+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
						+ 'Use `program` instead if you do not want flags.'
					);
				}

				var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
				if (result.ctor === 'Err')
				{
					throw new Error(
						moduleName + '.worker(...) was called with an unexpected argument.\n'
						+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
						+ result._0
					);
				}

				return initialize(
					impl.init(result._0),
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function renderer(enqueue, _)
{
	return function(_) {};
}


// HTML TO PROGRAM

function htmlToProgram(vnode)
{
	var emptyBag = batch(_elm_lang$core$Native_List.Nil);
	var noChange = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		emptyBag
	);

	return _elm_lang$virtual_dom$VirtualDom$program({
		init: noChange,
		view: function(model) { return main; },
		update: F2(function(msg, model) { return noChange; }),
		subscriptions: function (model) { return emptyBag; }
	});
}


// INITIALIZE A PROGRAM

function initialize(init, update, subscriptions, renderer)
{
	// ambient state
	var managers = {};
	var updateView;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var model = init._0;
		updateView = renderer(enqueue, model);
		var cmds = init._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			updateView(model);
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, loop, handleMsg);
	}

	var task = A2(andThen, loop, init);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = converter(cmdList._0);
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}


// INCOMING PORTS

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(value)
	{
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	function send(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		currentSend(result._0);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,

	htmlToProgram: htmlToProgram,
	program: program,
	programWithFlags: programWithFlags,
	initialize: initialize,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(callback, task)
{
	return {
		ctor: '_Task_andThen',
		callback: callback,
		task: task
	};
}

function onError(callback, task)
{
	return {
		ctor: '_Task_onError',
		callback: callback,
		task: task
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _elm_tools$parser_primitives$ParserPrimitives$findSubString = _elm_tools$parser_primitives$Native_ParserPrimitives.findSubString;
var _elm_tools$parser_primitives$ParserPrimitives$isSubChar = _elm_tools$parser_primitives$Native_ParserPrimitives.isSubChar;
var _elm_tools$parser_primitives$ParserPrimitives$isSubString = _elm_tools$parser_primitives$Native_ParserPrimitives.isSubString;

var _elm_tools$parser$Parser_Internal$isPlusOrMinus = function ($char) {
	return _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('+')) || _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('-'));
};
var _elm_tools$parser$Parser_Internal$isZero = function ($char) {
	return _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('0'));
};
var _elm_tools$parser$Parser_Internal$isE = function ($char) {
	return _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('e')) || _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('E'));
};
var _elm_tools$parser$Parser_Internal$isDot = function ($char) {
	return _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('.'));
};
var _elm_tools$parser$Parser_Internal$isBadIntEnd = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (_elm_lang$core$Char$isUpper($char) || (_elm_lang$core$Char$isLower($char) || _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('.'))));
};
var _elm_tools$parser$Parser_Internal$chomp = F3(
	function (isGood, offset, source) {
		chomp:
		while (true) {
			var newOffset = A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, isGood, offset, source);
			if (_elm_lang$core$Native_Utils.cmp(newOffset, 0) < 0) {
				return offset;
			} else {
				var _v0 = isGood,
					_v1 = newOffset,
					_v2 = source;
				isGood = _v0;
				offset = _v1;
				source = _v2;
				continue chomp;
			}
		}
	});
var _elm_tools$parser$Parser_Internal$chompDigits = F3(
	function (isValidDigit, offset, source) {
		var newOffset = A3(_elm_tools$parser$Parser_Internal$chomp, isValidDigit, offset, source);
		return _elm_lang$core$Native_Utils.eq(newOffset, offset) ? _elm_lang$core$Result$Err(newOffset) : ((!_elm_lang$core$Native_Utils.eq(
			A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_tools$parser$Parser_Internal$isBadIntEnd, newOffset, source),
			-1)) ? _elm_lang$core$Result$Err(newOffset) : _elm_lang$core$Result$Ok(newOffset));
	});
var _elm_tools$parser$Parser_Internal$chompExp = F2(
	function (offset, source) {
		var eOffset = A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_tools$parser$Parser_Internal$isE, offset, source);
		if (_elm_lang$core$Native_Utils.eq(eOffset, -1)) {
			return _elm_lang$core$Result$Ok(offset);
		} else {
			var opOffset = A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_tools$parser$Parser_Internal$isPlusOrMinus, eOffset, source);
			var expOffset = _elm_lang$core$Native_Utils.eq(opOffset, -1) ? eOffset : opOffset;
			return (!_elm_lang$core$Native_Utils.eq(
				A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_tools$parser$Parser_Internal$isZero, expOffset, source),
				-1)) ? _elm_lang$core$Result$Err(expOffset) : (_elm_lang$core$Native_Utils.eq(
				A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_lang$core$Char$isDigit, expOffset, source),
				-1) ? _elm_lang$core$Result$Err(expOffset) : A3(_elm_tools$parser$Parser_Internal$chompDigits, _elm_lang$core$Char$isDigit, expOffset, source));
		}
	});
var _elm_tools$parser$Parser_Internal$chompDotAndExp = F2(
	function (offset, source) {
		var dotOffset = A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_tools$parser$Parser_Internal$isDot, offset, source);
		return _elm_lang$core$Native_Utils.eq(dotOffset, -1) ? A2(_elm_tools$parser$Parser_Internal$chompExp, offset, source) : A2(
			_elm_tools$parser$Parser_Internal$chompExp,
			A3(_elm_tools$parser$Parser_Internal$chomp, _elm_lang$core$Char$isDigit, dotOffset, source),
			source);
	});
var _elm_tools$parser$Parser_Internal$State = F6(
	function (a, b, c, d, e, f) {
		return {source: a, offset: b, indent: c, context: d, row: e, col: f};
	});
var _elm_tools$parser$Parser_Internal$Parser = function (a) {
	return {ctor: 'Parser', _0: a};
};
var _elm_tools$parser$Parser_Internal$Bad = F2(
	function (a, b) {
		return {ctor: 'Bad', _0: a, _1: b};
	});
var _elm_tools$parser$Parser_Internal$Good = F2(
	function (a, b) {
		return {ctor: 'Good', _0: a, _1: b};
	});

var _elm_tools$parser$Parser$changeContext = F2(
	function (newContext, _p0) {
		var _p1 = _p0;
		return {source: _p1.source, offset: _p1.offset, indent: _p1.indent, context: newContext, row: _p1.row, col: _p1.col};
	});
var _elm_tools$parser$Parser$sourceMap = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return _elm_tools$parser$Parser_Internal$Parser(
			function (_p4) {
				var _p5 = _p4;
				var _p6 = _p3._0(_p5);
				if (_p6.ctor === 'Bad') {
					return A2(_elm_tools$parser$Parser_Internal$Bad, _p6._0, _p6._1);
				} else {
					var _p7 = _p6._1;
					var subString = A3(_elm_lang$core$String$slice, _p5.offset, _p7.offset, _p5.source);
					return A2(
						_elm_tools$parser$Parser_Internal$Good,
						A2(func, subString, _p6._0),
						_p7);
				}
			});
	});
var _elm_tools$parser$Parser$source = function (parser) {
	return A2(_elm_tools$parser$Parser$sourceMap, _elm_lang$core$Basics$always, parser);
};
var _elm_tools$parser$Parser$badFloatMsg = 'The `Parser.float` parser seems to have a bug.\nPlease report an SSCCE to <https://github.com/elm-tools/parser/issues>.';
var _elm_tools$parser$Parser$floatHelp = F3(
	function (offset, zeroOffset, source) {
		if (_elm_lang$core$Native_Utils.cmp(zeroOffset, 0) > -1) {
			return A2(_elm_tools$parser$Parser_Internal$chompDotAndExp, zeroOffset, source);
		} else {
			var dotOffset = A3(_elm_tools$parser$Parser_Internal$chomp, _elm_lang$core$Char$isDigit, offset, source);
			var result = A2(_elm_tools$parser$Parser_Internal$chompDotAndExp, dotOffset, source);
			var _p8 = result;
			if (_p8.ctor === 'Err') {
				return result;
			} else {
				var _p9 = _p8._0;
				return _elm_lang$core$Native_Utils.eq(_p9, offset) ? _elm_lang$core$Result$Err(_p9) : result;
			}
		}
	});
var _elm_tools$parser$Parser$badIntMsg = 'The `Parser.int` parser seems to have a bug.\nPlease report an SSCCE to <https://github.com/elm-tools/parser/issues>.';
var _elm_tools$parser$Parser$isX = function ($char) {
	return _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('x'));
};
var _elm_tools$parser$Parser$isO = function ($char) {
	return _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('o'));
};
var _elm_tools$parser$Parser$isZero = function ($char) {
	return _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('0'));
};
var _elm_tools$parser$Parser$intHelp = F3(
	function (offset, zeroOffset, source) {
		return _elm_lang$core$Native_Utils.eq(zeroOffset, -1) ? A3(_elm_tools$parser$Parser_Internal$chompDigits, _elm_lang$core$Char$isDigit, offset, source) : ((!_elm_lang$core$Native_Utils.eq(
			A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_tools$parser$Parser$isX, zeroOffset, source),
			-1)) ? A3(_elm_tools$parser$Parser_Internal$chompDigits, _elm_lang$core$Char$isHexDigit, offset + 2, source) : (_elm_lang$core$Native_Utils.eq(
			A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_tools$parser$Parser_Internal$isBadIntEnd, zeroOffset, source),
			-1) ? _elm_lang$core$Result$Ok(zeroOffset) : _elm_lang$core$Result$Err(zeroOffset)));
	});
var _elm_tools$parser$Parser$token = F2(
	function (makeProblem, str) {
		return _elm_tools$parser$Parser_Internal$Parser(
			function (_p10) {
				var _p11 = _p10;
				var _p13 = _p11.source;
				var _p12 = A5(_elm_tools$parser_primitives$ParserPrimitives$isSubString, str, _p11.offset, _p11.row, _p11.col, _p13);
				var newOffset = _p12._0;
				var newRow = _p12._1;
				var newCol = _p12._2;
				return _elm_lang$core$Native_Utils.eq(newOffset, -1) ? A2(
					_elm_tools$parser$Parser_Internal$Bad,
					makeProblem(str),
					_p11) : A2(
					_elm_tools$parser$Parser_Internal$Good,
					{ctor: '_Tuple0'},
					{source: _p13, offset: newOffset, indent: _p11.indent, context: _p11.context, row: newRow, col: newCol});
			});
	});
var _elm_tools$parser$Parser$delayedCommitMap = F3(
	function (func, _p15, _p14) {
		var _p16 = _p15;
		var _p17 = _p14;
		return _elm_tools$parser$Parser_Internal$Parser(
			function (state1) {
				var _p18 = _p16._0(state1);
				if (_p18.ctor === 'Bad') {
					return A2(_elm_tools$parser$Parser_Internal$Bad, _p18._0, state1);
				} else {
					var _p22 = _p18._1;
					var _p19 = _p17._0(_p22);
					if (_p19.ctor === 'Good') {
						return A2(
							_elm_tools$parser$Parser_Internal$Good,
							A2(func, _p18._0, _p19._0),
							_p19._1);
					} else {
						var _p21 = _p19._0;
						var _p20 = _p19._1;
						return (_elm_lang$core$Native_Utils.eq(_p22.row, _p20.row) && _elm_lang$core$Native_Utils.eq(_p22.col, _p20.col)) ? A2(_elm_tools$parser$Parser_Internal$Bad, _p21, state1) : A2(_elm_tools$parser$Parser_Internal$Bad, _p21, _p20);
					}
				}
			});
	});
var _elm_tools$parser$Parser$delayedCommit = F2(
	function (filler, realStuff) {
		return A3(
			_elm_tools$parser$Parser$delayedCommitMap,
			F2(
				function (_p23, v) {
					return v;
				}),
			filler,
			realStuff);
	});
var _elm_tools$parser$Parser$lazy = function (thunk) {
	return _elm_tools$parser$Parser_Internal$Parser(
		function (state) {
			var _p24 = thunk(
				{ctor: '_Tuple0'});
			var parse = _p24._0;
			return parse(state);
		});
};
var _elm_tools$parser$Parser$andThen = F2(
	function (callback, _p25) {
		var _p26 = _p25;
		return _elm_tools$parser$Parser_Internal$Parser(
			function (state1) {
				var _p27 = _p26._0(state1);
				if (_p27.ctor === 'Bad') {
					return A2(_elm_tools$parser$Parser_Internal$Bad, _p27._0, _p27._1);
				} else {
					var _p28 = callback(_p27._0);
					var parseB = _p28._0;
					return parseB(_p27._1);
				}
			});
	});
var _elm_tools$parser$Parser$apply = F2(
	function (f, a) {
		return f(a);
	});
var _elm_tools$parser$Parser$map2 = F3(
	function (func, _p30, _p29) {
		var _p31 = _p30;
		var _p32 = _p29;
		return _elm_tools$parser$Parser_Internal$Parser(
			function (state1) {
				var _p33 = _p31._0(state1);
				if (_p33.ctor === 'Bad') {
					return A2(_elm_tools$parser$Parser_Internal$Bad, _p33._0, _p33._1);
				} else {
					var _p34 = _p32._0(_p33._1);
					if (_p34.ctor === 'Bad') {
						return A2(_elm_tools$parser$Parser_Internal$Bad, _p34._0, _p34._1);
					} else {
						return A2(
							_elm_tools$parser$Parser_Internal$Good,
							A2(func, _p33._0, _p34._0),
							_p34._1);
					}
				}
			});
	});
var _elm_tools$parser$Parser_ops = _elm_tools$parser$Parser_ops || {};
_elm_tools$parser$Parser_ops['|='] = F2(
	function (parseFunc, parseArg) {
		return A3(_elm_tools$parser$Parser$map2, _elm_tools$parser$Parser$apply, parseFunc, parseArg);
	});
var _elm_tools$parser$Parser_ops = _elm_tools$parser$Parser_ops || {};
_elm_tools$parser$Parser_ops['|.'] = F2(
	function (keepParser, ignoreParser) {
		return A3(_elm_tools$parser$Parser$map2, _elm_lang$core$Basics$always, keepParser, ignoreParser);
	});
var _elm_tools$parser$Parser$map = F2(
	function (func, _p35) {
		var _p36 = _p35;
		return _elm_tools$parser$Parser_Internal$Parser(
			function (state1) {
				var _p37 = _p36._0(state1);
				if (_p37.ctor === 'Good') {
					return A2(
						_elm_tools$parser$Parser_Internal$Good,
						func(_p37._0),
						_p37._1);
				} else {
					return A2(_elm_tools$parser$Parser_Internal$Bad, _p37._0, _p37._1);
				}
			});
	});
var _elm_tools$parser$Parser$succeed = function (a) {
	return _elm_tools$parser$Parser_Internal$Parser(
		function (state) {
			return A2(_elm_tools$parser$Parser_Internal$Good, a, state);
		});
};
var _elm_tools$parser$Parser$run = F2(
	function (_p38, source) {
		var _p39 = _p38;
		var initialState = {
			source: source,
			offset: 0,
			indent: 1,
			context: {ctor: '[]'},
			row: 1,
			col: 1
		};
		var _p40 = _p39._0(initialState);
		if (_p40.ctor === 'Good') {
			return _elm_lang$core$Result$Ok(_p40._0);
		} else {
			return _elm_lang$core$Result$Err(
				{row: _p40._1.row, col: _p40._1.col, source: source, problem: _p40._0, context: _p40._1.context});
		}
	});
var _elm_tools$parser$Parser$Error = F5(
	function (a, b, c, d, e) {
		return {row: a, col: b, source: c, problem: d, context: e};
	});
var _elm_tools$parser$Parser$Context = F3(
	function (a, b, c) {
		return {row: a, col: b, description: c};
	});
var _elm_tools$parser$Parser$inContext = F2(
	function (ctx, _p41) {
		var _p42 = _p41;
		return _elm_tools$parser$Parser_Internal$Parser(
			function (_p43) {
				var _p44 = _p43;
				var _p46 = _p44.context;
				var state1 = A2(
					_elm_tools$parser$Parser$changeContext,
					{
						ctor: '::',
						_0: A3(_elm_tools$parser$Parser$Context, _p44.row, _p44.col, ctx),
						_1: _p46
					},
					_p44);
				var _p45 = _p42._0(state1);
				if (_p45.ctor === 'Good') {
					return A2(
						_elm_tools$parser$Parser_Internal$Good,
						_p45._0,
						A2(_elm_tools$parser$Parser$changeContext, _p46, _p45._1));
				} else {
					return _p45;
				}
			});
	});
var _elm_tools$parser$Parser$Fail = function (a) {
	return {ctor: 'Fail', _0: a};
};
var _elm_tools$parser$Parser$fail = function (message) {
	return _elm_tools$parser$Parser_Internal$Parser(
		function (state) {
			return A2(
				_elm_tools$parser$Parser_Internal$Bad,
				_elm_tools$parser$Parser$Fail(message),
				state);
		});
};
var _elm_tools$parser$Parser$ExpectingClosing = function (a) {
	return {ctor: 'ExpectingClosing', _0: a};
};
var _elm_tools$parser$Parser$ignoreUntil = function (str) {
	return _elm_tools$parser$Parser_Internal$Parser(
		function (_p47) {
			var _p48 = _p47;
			var _p50 = _p48.source;
			var _p49 = A6(_elm_tools$parser_primitives$ParserPrimitives$findSubString, false, str, _p48.offset, _p48.row, _p48.col, _p50);
			var newOffset = _p49._0;
			var newRow = _p49._1;
			var newCol = _p49._2;
			return _elm_lang$core$Native_Utils.eq(newOffset, -1) ? A2(
				_elm_tools$parser$Parser_Internal$Bad,
				_elm_tools$parser$Parser$ExpectingClosing(str),
				_p48) : A2(
				_elm_tools$parser$Parser_Internal$Good,
				{ctor: '_Tuple0'},
				{source: _p50, offset: newOffset, indent: _p48.indent, context: _p48.context, row: newRow, col: newCol});
		});
};
var _elm_tools$parser$Parser$ExpectingVariable = {ctor: 'ExpectingVariable'};
var _elm_tools$parser$Parser$ExpectingKeyword = function (a) {
	return {ctor: 'ExpectingKeyword', _0: a};
};
var _elm_tools$parser$Parser$keyword = function (str) {
	return A2(_elm_tools$parser$Parser$token, _elm_tools$parser$Parser$ExpectingKeyword, str);
};
var _elm_tools$parser$Parser$ExpectingSymbol = function (a) {
	return {ctor: 'ExpectingSymbol', _0: a};
};
var _elm_tools$parser$Parser$symbol = function (str) {
	return A2(_elm_tools$parser$Parser$token, _elm_tools$parser$Parser$ExpectingSymbol, str);
};
var _elm_tools$parser$Parser$ExpectingEnd = {ctor: 'ExpectingEnd'};
var _elm_tools$parser$Parser$end = _elm_tools$parser$Parser_Internal$Parser(
	function (state) {
		return _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$String$length(state.source),
			state.offset) ? A2(
			_elm_tools$parser$Parser_Internal$Good,
			{ctor: '_Tuple0'},
			state) : A2(_elm_tools$parser$Parser_Internal$Bad, _elm_tools$parser$Parser$ExpectingEnd, state);
	});
var _elm_tools$parser$Parser$BadRepeat = {ctor: 'BadRepeat'};
var _elm_tools$parser$Parser$repeatExactly = F4(
	function (n, parse, revList, state1) {
		repeatExactly:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return A2(
					_elm_tools$parser$Parser_Internal$Good,
					_elm_lang$core$List$reverse(revList),
					state1);
			} else {
				var _p51 = parse(state1);
				if (_p51.ctor === 'Good') {
					var _p52 = _p51._1;
					if (_elm_lang$core$Native_Utils.eq(state1.row, _p52.row) && _elm_lang$core$Native_Utils.eq(state1.col, _p52.col)) {
						return A2(_elm_tools$parser$Parser_Internal$Bad, _elm_tools$parser$Parser$BadRepeat, _p52);
					} else {
						var _v25 = n - 1,
							_v26 = parse,
							_v27 = {ctor: '::', _0: _p51._0, _1: revList},
							_v28 = _p52;
						n = _v25;
						parse = _v26;
						revList = _v27;
						state1 = _v28;
						continue repeatExactly;
					}
				} else {
					return A2(_elm_tools$parser$Parser_Internal$Bad, _p51._0, _p51._1);
				}
			}
		}
	});
var _elm_tools$parser$Parser$repeatAtLeast = F4(
	function (n, parse, revList, state1) {
		repeatAtLeast:
		while (true) {
			var _p53 = parse(state1);
			if (_p53.ctor === 'Good') {
				var _p54 = _p53._1;
				if (_elm_lang$core$Native_Utils.eq(state1.row, _p54.row) && _elm_lang$core$Native_Utils.eq(state1.col, _p54.col)) {
					return A2(_elm_tools$parser$Parser_Internal$Bad, _elm_tools$parser$Parser$BadRepeat, _p54);
				} else {
					var _v30 = n - 1,
						_v31 = parse,
						_v32 = {ctor: '::', _0: _p53._0, _1: revList},
						_v33 = _p54;
					n = _v30;
					parse = _v31;
					revList = _v32;
					state1 = _v33;
					continue repeatAtLeast;
				}
			} else {
				var _p55 = _p53._1;
				return (_elm_lang$core$Native_Utils.eq(state1.row, _p55.row) && (_elm_lang$core$Native_Utils.eq(state1.col, _p55.col) && (_elm_lang$core$Native_Utils.cmp(n, 0) < 1))) ? A2(
					_elm_tools$parser$Parser_Internal$Good,
					_elm_lang$core$List$reverse(revList),
					state1) : A2(_elm_tools$parser$Parser_Internal$Bad, _p53._0, _p55);
			}
		}
	});
var _elm_tools$parser$Parser$repeat = F2(
	function (count, _p56) {
		var _p57 = _p56;
		var _p59 = _p57._0;
		var _p58 = count;
		if (_p58.ctor === 'Exactly') {
			return _elm_tools$parser$Parser_Internal$Parser(
				function (state) {
					return A4(
						_elm_tools$parser$Parser$repeatExactly,
						_p58._0,
						_p59,
						{ctor: '[]'},
						state);
				});
		} else {
			return _elm_tools$parser$Parser_Internal$Parser(
				function (state) {
					return A4(
						_elm_tools$parser$Parser$repeatAtLeast,
						_p58._0,
						_p59,
						{ctor: '[]'},
						state);
				});
		}
	});
var _elm_tools$parser$Parser$ignoreExactly = F8(
	function (n, predicate, source, offset, indent, context, row, col) {
		ignoreExactly:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return A2(
					_elm_tools$parser$Parser_Internal$Good,
					{ctor: '_Tuple0'},
					{source: source, offset: offset, indent: indent, context: context, row: row, col: col});
			} else {
				var newOffset = A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, predicate, offset, source);
				if (_elm_lang$core$Native_Utils.eq(newOffset, -1)) {
					return A2(
						_elm_tools$parser$Parser_Internal$Bad,
						_elm_tools$parser$Parser$BadRepeat,
						{source: source, offset: offset, indent: indent, context: context, row: row, col: col});
				} else {
					if (_elm_lang$core$Native_Utils.eq(newOffset, -2)) {
						var _v36 = n - 1,
							_v37 = predicate,
							_v38 = source,
							_v39 = offset + 1,
							_v40 = indent,
							_v41 = context,
							_v42 = row + 1,
							_v43 = 1;
						n = _v36;
						predicate = _v37;
						source = _v38;
						offset = _v39;
						indent = _v40;
						context = _v41;
						row = _v42;
						col = _v43;
						continue ignoreExactly;
					} else {
						var _v44 = n - 1,
							_v45 = predicate,
							_v46 = source,
							_v47 = newOffset,
							_v48 = indent,
							_v49 = context,
							_v50 = row,
							_v51 = col + 1;
						n = _v44;
						predicate = _v45;
						source = _v46;
						offset = _v47;
						indent = _v48;
						context = _v49;
						row = _v50;
						col = _v51;
						continue ignoreExactly;
					}
				}
			}
		}
	});
var _elm_tools$parser$Parser$ignoreAtLeast = F8(
	function (n, predicate, source, offset, indent, context, row, col) {
		ignoreAtLeast:
		while (true) {
			var newOffset = A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, predicate, offset, source);
			if (_elm_lang$core$Native_Utils.eq(newOffset, -1)) {
				var state = {source: source, offset: offset, indent: indent, context: context, row: row, col: col};
				return (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) ? A2(
					_elm_tools$parser$Parser_Internal$Good,
					{ctor: '_Tuple0'},
					state) : A2(_elm_tools$parser$Parser_Internal$Bad, _elm_tools$parser$Parser$BadRepeat, state);
			} else {
				if (_elm_lang$core$Native_Utils.eq(newOffset, -2)) {
					var _v52 = n - 1,
						_v53 = predicate,
						_v54 = source,
						_v55 = offset + 1,
						_v56 = indent,
						_v57 = context,
						_v58 = row + 1,
						_v59 = 1;
					n = _v52;
					predicate = _v53;
					source = _v54;
					offset = _v55;
					indent = _v56;
					context = _v57;
					row = _v58;
					col = _v59;
					continue ignoreAtLeast;
				} else {
					var _v60 = n - 1,
						_v61 = predicate,
						_v62 = source,
						_v63 = newOffset,
						_v64 = indent,
						_v65 = context,
						_v66 = row,
						_v67 = col + 1;
					n = _v60;
					predicate = _v61;
					source = _v62;
					offset = _v63;
					indent = _v64;
					context = _v65;
					row = _v66;
					col = _v67;
					continue ignoreAtLeast;
				}
			}
		}
	});
var _elm_tools$parser$Parser$ignore = F2(
	function (count, predicate) {
		var _p60 = count;
		if (_p60.ctor === 'Exactly') {
			return _elm_tools$parser$Parser_Internal$Parser(
				function (_p61) {
					var _p62 = _p61;
					return A8(_elm_tools$parser$Parser$ignoreExactly, _p60._0, predicate, _p62.source, _p62.offset, _p62.indent, _p62.context, _p62.row, _p62.col);
				});
		} else {
			return _elm_tools$parser$Parser_Internal$Parser(
				function (_p63) {
					var _p64 = _p63;
					return A8(_elm_tools$parser$Parser$ignoreAtLeast, _p60._0, predicate, _p64.source, _p64.offset, _p64.indent, _p64.context, _p64.row, _p64.col);
				});
		}
	});
var _elm_tools$parser$Parser$keep = F2(
	function (count, predicate) {
		return _elm_tools$parser$Parser$source(
			A2(_elm_tools$parser$Parser$ignore, count, predicate));
	});
var _elm_tools$parser$Parser$BadFloat = {ctor: 'BadFloat'};
var _elm_tools$parser$Parser$float = _elm_tools$parser$Parser_Internal$Parser(
	function (_p65) {
		var _p66 = _p65;
		var _p77 = _p66.source;
		var _p76 = _p66.row;
		var _p75 = _p66.offset;
		var _p74 = _p66.indent;
		var _p73 = _p66.context;
		var _p72 = _p66.col;
		var _p67 = A3(
			_elm_tools$parser$Parser$floatHelp,
			_p75,
			A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_tools$parser$Parser$isZero, _p75, _p77),
			_p77);
		if (_p67.ctor === 'Err') {
			var _p68 = _p67._0;
			return A2(
				_elm_tools$parser$Parser_Internal$Bad,
				_elm_tools$parser$Parser$BadFloat,
				{source: _p77, offset: _p68, indent: _p74, context: _p73, row: _p76, col: _p72 + (_p68 - _p75)});
		} else {
			var _p71 = _p67._0;
			var _p69 = _elm_lang$core$String$toFloat(
				A3(_elm_lang$core$String$slice, _p75, _p71, _p77));
			if (_p69.ctor === 'Err') {
				return _elm_lang$core$Native_Utils.crashCase(
					'Parser',
					{
						start: {line: 733, column: 9},
						end: {line: 745, column: 16}
					},
					_p69)(_elm_tools$parser$Parser$badFloatMsg);
			} else {
				return A2(
					_elm_tools$parser$Parser_Internal$Good,
					_p69._0,
					{source: _p77, offset: _p71, indent: _p74, context: _p73, row: _p76, col: _p72 + (_p71 - _p75)});
			}
		}
	});
var _elm_tools$parser$Parser$BadInt = {ctor: 'BadInt'};
var _elm_tools$parser$Parser$int = _elm_tools$parser$Parser_Internal$Parser(
	function (_p78) {
		var _p79 = _p78;
		var _p90 = _p79.source;
		var _p89 = _p79.row;
		var _p88 = _p79.offset;
		var _p87 = _p79.indent;
		var _p86 = _p79.context;
		var _p85 = _p79.col;
		var _p80 = A3(
			_elm_tools$parser$Parser$intHelp,
			_p88,
			A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, _elm_tools$parser$Parser$isZero, _p88, _p90),
			_p90);
		if (_p80.ctor === 'Err') {
			var _p81 = _p80._0;
			return A2(
				_elm_tools$parser$Parser_Internal$Bad,
				_elm_tools$parser$Parser$BadInt,
				{source: _p90, offset: _p81, indent: _p87, context: _p86, row: _p89, col: _p85 + (_p81 - _p88)});
		} else {
			var _p84 = _p80._0;
			var _p82 = _elm_lang$core$String$toInt(
				A3(_elm_lang$core$String$slice, _p88, _p84, _p90));
			if (_p82.ctor === 'Err') {
				return _elm_lang$core$Native_Utils.crashCase(
					'Parser',
					{
						start: {line: 638, column: 9},
						end: {line: 650, column: 16}
					},
					_p82)(_elm_tools$parser$Parser$badIntMsg);
			} else {
				return A2(
					_elm_tools$parser$Parser_Internal$Good,
					_p82._0,
					{source: _p90, offset: _p84, indent: _p87, context: _p86, row: _p89, col: _p85 + (_p84 - _p88)});
			}
		}
	});
var _elm_tools$parser$Parser$BadOneOf = function (a) {
	return {ctor: 'BadOneOf', _0: a};
};
var _elm_tools$parser$Parser$oneOfHelp = F3(
	function (state, problems, parsers) {
		oneOfHelp:
		while (true) {
			var _p91 = parsers;
			if (_p91.ctor === '[]') {
				return A2(
					_elm_tools$parser$Parser_Internal$Bad,
					_elm_tools$parser$Parser$BadOneOf(
						_elm_lang$core$List$reverse(problems)),
					state);
			} else {
				var _p92 = _p91._0._0(state);
				if (_p92.ctor === 'Good') {
					return _p92;
				} else {
					if (_elm_lang$core$Native_Utils.eq(state.row, _p92._1.row) && _elm_lang$core$Native_Utils.eq(state.col, _p92._1.col)) {
						var _v79 = state,
							_v80 = {ctor: '::', _0: _p92._0, _1: problems},
							_v81 = _p91._1;
						state = _v79;
						problems = _v80;
						parsers = _v81;
						continue oneOfHelp;
					} else {
						return _p92;
					}
				}
			}
		}
	});
var _elm_tools$parser$Parser$oneOf = function (parsers) {
	return _elm_tools$parser$Parser_Internal$Parser(
		function (state) {
			return A3(
				_elm_tools$parser$Parser$oneOfHelp,
				state,
				{ctor: '[]'},
				parsers);
		});
};
var _elm_tools$parser$Parser$Exactly = function (a) {
	return {ctor: 'Exactly', _0: a};
};
var _elm_tools$parser$Parser$AtLeast = function (a) {
	return {ctor: 'AtLeast', _0: a};
};
var _elm_tools$parser$Parser$zeroOrMore = _elm_tools$parser$Parser$AtLeast(0);
var _elm_tools$parser$Parser$oneOrMore = _elm_tools$parser$Parser$AtLeast(1);

var _elm_lang$core$Set$foldr = F3(
	function (f, b, _p0) {
		var _p1 = _p0;
		return A3(
			_elm_lang$core$Dict$foldr,
			F3(
				function (k, _p2, b) {
					return A2(f, k, b);
				}),
			b,
			_p1._0);
	});
var _elm_lang$core$Set$foldl = F3(
	function (f, b, _p3) {
		var _p4 = _p3;
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, _p5, b) {
					return A2(f, k, b);
				}),
			b,
			_p4._0);
	});
var _elm_lang$core$Set$toList = function (_p6) {
	var _p7 = _p6;
	return _elm_lang$core$Dict$keys(_p7._0);
};
var _elm_lang$core$Set$size = function (_p8) {
	var _p9 = _p8;
	return _elm_lang$core$Dict$size(_p9._0);
};
var _elm_lang$core$Set$member = F2(
	function (k, _p10) {
		var _p11 = _p10;
		return A2(_elm_lang$core$Dict$member, k, _p11._0);
	});
var _elm_lang$core$Set$isEmpty = function (_p12) {
	var _p13 = _p12;
	return _elm_lang$core$Dict$isEmpty(_p13._0);
};
var _elm_lang$core$Set$Set_elm_builtin = function (a) {
	return {ctor: 'Set_elm_builtin', _0: a};
};
var _elm_lang$core$Set$empty = _elm_lang$core$Set$Set_elm_builtin(_elm_lang$core$Dict$empty);
var _elm_lang$core$Set$singleton = function (k) {
	return _elm_lang$core$Set$Set_elm_builtin(
		A2(
			_elm_lang$core$Dict$singleton,
			k,
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Set$insert = F2(
	function (k, _p14) {
		var _p15 = _p14;
		return _elm_lang$core$Set$Set_elm_builtin(
			A3(
				_elm_lang$core$Dict$insert,
				k,
				{ctor: '_Tuple0'},
				_p15._0));
	});
var _elm_lang$core$Set$fromList = function (xs) {
	return A3(_elm_lang$core$List$foldl, _elm_lang$core$Set$insert, _elm_lang$core$Set$empty, xs);
};
var _elm_lang$core$Set$map = F2(
	function (f, s) {
		return _elm_lang$core$Set$fromList(
			A2(
				_elm_lang$core$List$map,
				f,
				_elm_lang$core$Set$toList(s)));
	});
var _elm_lang$core$Set$remove = F2(
	function (k, _p16) {
		var _p17 = _p16;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$remove, k, _p17._0));
	});
var _elm_lang$core$Set$union = F2(
	function (_p19, _p18) {
		var _p20 = _p19;
		var _p21 = _p18;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$union, _p20._0, _p21._0));
	});
var _elm_lang$core$Set$intersect = F2(
	function (_p23, _p22) {
		var _p24 = _p23;
		var _p25 = _p22;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$intersect, _p24._0, _p25._0));
	});
var _elm_lang$core$Set$diff = F2(
	function (_p27, _p26) {
		var _p28 = _p27;
		var _p29 = _p26;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$diff, _p28._0, _p29._0));
	});
var _elm_lang$core$Set$filter = F2(
	function (p, _p30) {
		var _p31 = _p30;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(
				_elm_lang$core$Dict$filter,
				F2(
					function (k, _p32) {
						return p(k);
					}),
				_p31._0));
	});
var _elm_lang$core$Set$partition = F2(
	function (p, _p33) {
		var _p34 = _p33;
		var _p35 = A2(
			_elm_lang$core$Dict$partition,
			F2(
				function (k, _p36) {
					return p(k);
				}),
			_p34._0);
		var p1 = _p35._0;
		var p2 = _p35._1;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Set$Set_elm_builtin(p1),
			_1: _elm_lang$core$Set$Set_elm_builtin(p2)
		};
	});

var _elm_tools$parser$Parser_LanguageKit$isChar = function ($char) {
	return true;
};
var _elm_tools$parser$Parser_LanguageKit$isTab = function ($char) {
	return _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('\t'));
};
var _elm_tools$parser$Parser_LanguageKit$isSpace = function ($char) {
	return _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr(' ')) || (_elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('\n')) || _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('\r')));
};
var _elm_tools$parser$Parser_LanguageKit$chompSpaces = A2(_elm_tools$parser$Parser$ignore, _elm_tools$parser$Parser$zeroOrMore, _elm_tools$parser$Parser_LanguageKit$isSpace);
var _elm_tools$parser$Parser_LanguageKit$revAlways = F2(
	function (_p0, keep) {
		return keep;
	});
var _elm_tools$parser$Parser_LanguageKit$ignore = F2(
	function (ignoreParser, keepParser) {
		return A3(_elm_tools$parser$Parser$map2, _elm_tools$parser$Parser_LanguageKit$revAlways, ignoreParser, keepParser);
	});
var _elm_tools$parser$Parser_LanguageKit_ops = _elm_tools$parser$Parser_LanguageKit_ops || {};
_elm_tools$parser$Parser_LanguageKit_ops['|-'] = _elm_tools$parser$Parser_LanguageKit$ignore;
var _elm_tools$parser$Parser_LanguageKit$sequenceEndMandatory = F5(
	function (end, spaces, parseItem, sep, revItems) {
		var chompRest = function (item) {
			return A5(
				_elm_tools$parser$Parser_LanguageKit$sequenceEndMandatory,
				end,
				spaces,
				parseItem,
				sep,
				{ctor: '::', _0: item, _1: revItems});
		};
		return _elm_tools$parser$Parser$oneOf(
			{
				ctor: '::',
				_0: A2(
					_elm_tools$parser$Parser$andThen,
					chompRest,
					A2(
						_elm_tools$parser$Parser_ops['|.'],
						A2(
							_elm_tools$parser$Parser_ops['|.'],
							A2(_elm_tools$parser$Parser_ops['|.'], parseItem, spaces),
							_elm_tools$parser$Parser$symbol(sep)),
						spaces)),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_tools$parser$Parser_LanguageKit_ops['|-'],
						_elm_tools$parser$Parser$symbol(end),
						_elm_tools$parser$Parser$succeed(
							_elm_lang$core$List$reverse(revItems))),
					_1: {ctor: '[]'}
				}
			});
	});
var _elm_tools$parser$Parser_LanguageKit$sequenceEndForbidden = F5(
	function (end, spaces, parseItem, sep, revItems) {
		var chompRest = function (item) {
			return A5(
				_elm_tools$parser$Parser_LanguageKit$sequenceEndForbidden,
				end,
				spaces,
				parseItem,
				sep,
				{ctor: '::', _0: item, _1: revItems});
		};
		return A2(
			_elm_tools$parser$Parser_LanguageKit$ignore,
			spaces,
			_elm_tools$parser$Parser$oneOf(
				{
					ctor: '::',
					_0: A2(
						_elm_tools$parser$Parser_LanguageKit_ops['|-'],
						A2(
							_elm_tools$parser$Parser_LanguageKit_ops['|-'],
							_elm_tools$parser$Parser$symbol(sep),
							spaces),
						A2(_elm_tools$parser$Parser$andThen, chompRest, parseItem)),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_tools$parser$Parser_LanguageKit_ops['|-'],
							_elm_tools$parser$Parser$symbol(end),
							_elm_tools$parser$Parser$succeed(
								_elm_lang$core$List$reverse(revItems))),
						_1: {ctor: '[]'}
					}
				}));
	});
var _elm_tools$parser$Parser_LanguageKit$sequenceEndOptional = F5(
	function (end, spaces, parseItem, sep, revItems) {
		var chompRest = function (item) {
			return A5(
				_elm_tools$parser$Parser_LanguageKit$sequenceEndOptional,
				end,
				spaces,
				parseItem,
				sep,
				{ctor: '::', _0: item, _1: revItems});
		};
		var parseEnd = A2(
			_elm_tools$parser$Parser$andThen,
			function (_p1) {
				return _elm_tools$parser$Parser$succeed(
					_elm_lang$core$List$reverse(revItems));
			},
			_elm_tools$parser$Parser$symbol(end));
		return A2(
			_elm_tools$parser$Parser_LanguageKit$ignore,
			spaces,
			_elm_tools$parser$Parser$oneOf(
				{
					ctor: '::',
					_0: A2(
						_elm_tools$parser$Parser_LanguageKit_ops['|-'],
						A2(
							_elm_tools$parser$Parser_LanguageKit_ops['|-'],
							_elm_tools$parser$Parser$symbol(sep),
							spaces),
						_elm_tools$parser$Parser$oneOf(
							{
								ctor: '::',
								_0: A2(_elm_tools$parser$Parser$andThen, chompRest, parseItem),
								_1: {
									ctor: '::',
									_0: parseEnd,
									_1: {ctor: '[]'}
								}
							})),
					_1: {
						ctor: '::',
						_0: parseEnd,
						_1: {ctor: '[]'}
					}
				}));
	});
var _elm_tools$parser$Parser_LanguageKit$sequenceEnd = F5(
	function (end, spaces, parseItem, sep, trailing) {
		var chompRest = function (item) {
			var _p2 = trailing;
			switch (_p2.ctor) {
				case 'Forbidden':
					return A5(
						_elm_tools$parser$Parser_LanguageKit$sequenceEndForbidden,
						end,
						spaces,
						parseItem,
						sep,
						{
							ctor: '::',
							_0: item,
							_1: {ctor: '[]'}
						});
				case 'Optional':
					return A5(
						_elm_tools$parser$Parser_LanguageKit$sequenceEndOptional,
						end,
						spaces,
						parseItem,
						sep,
						{
							ctor: '::',
							_0: item,
							_1: {ctor: '[]'}
						});
				default:
					return A2(
						_elm_tools$parser$Parser_LanguageKit_ops['|-'],
						A2(
							_elm_tools$parser$Parser_LanguageKit_ops['|-'],
							A2(
								_elm_tools$parser$Parser_LanguageKit_ops['|-'],
								spaces,
								_elm_tools$parser$Parser$symbol(sep)),
							spaces),
						A5(
							_elm_tools$parser$Parser_LanguageKit$sequenceEndMandatory,
							end,
							spaces,
							parseItem,
							sep,
							{
								ctor: '::',
								_0: item,
								_1: {ctor: '[]'}
							}));
			}
		};
		return _elm_tools$parser$Parser$oneOf(
			{
				ctor: '::',
				_0: A2(_elm_tools$parser$Parser$andThen, chompRest, parseItem),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_tools$parser$Parser_LanguageKit_ops['|-'],
						_elm_tools$parser$Parser$symbol(end),
						_elm_tools$parser$Parser$succeed(
							{ctor: '[]'})),
					_1: {ctor: '[]'}
				}
			});
	});
var _elm_tools$parser$Parser_LanguageKit$whitespaceHelp = function (parser) {
	return A2(
		_elm_tools$parser$Parser_LanguageKit$ignore,
		_elm_tools$parser$Parser_LanguageKit$chompSpaces,
		_elm_tools$parser$Parser$oneOf(
			{
				ctor: '::',
				_0: A2(
					_elm_tools$parser$Parser$andThen,
					function (_p3) {
						return _elm_tools$parser$Parser_LanguageKit$whitespaceHelp(parser);
					},
					parser),
				_1: {
					ctor: '::',
					_0: _elm_tools$parser$Parser$succeed(
						{ctor: '_Tuple0'}),
					_1: {ctor: '[]'}
				}
			}));
};
var _elm_tools$parser$Parser_LanguageKit$nestableCommentHelp = F4(
	function (isNotRelevant, start, end, nestLevel) {
		return _elm_tools$parser$Parser$lazy(
			function (_p4) {
				return A2(
					_elm_tools$parser$Parser_LanguageKit$ignore,
					A2(_elm_tools$parser$Parser$ignore, _elm_tools$parser$Parser$zeroOrMore, isNotRelevant),
					_elm_tools$parser$Parser$oneOf(
						{
							ctor: '::',
							_0: A2(
								_elm_tools$parser$Parser_LanguageKit$ignore,
								_elm_tools$parser$Parser$symbol(end),
								_elm_lang$core$Native_Utils.eq(nestLevel, 1) ? _elm_tools$parser$Parser$succeed(
									{ctor: '_Tuple0'}) : A4(_elm_tools$parser$Parser_LanguageKit$nestableCommentHelp, isNotRelevant, start, end, nestLevel - 1)),
							_1: {
								ctor: '::',
								_0: A2(
									_elm_tools$parser$Parser_LanguageKit$ignore,
									_elm_tools$parser$Parser$symbol(start),
									A4(_elm_tools$parser$Parser_LanguageKit$nestableCommentHelp, isNotRelevant, start, end, nestLevel + 1)),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_tools$parser$Parser_LanguageKit$ignore,
										A2(
											_elm_tools$parser$Parser$ignore,
											_elm_tools$parser$Parser$Exactly(1),
											_elm_tools$parser$Parser_LanguageKit$isChar),
										A4(_elm_tools$parser$Parser_LanguageKit$nestableCommentHelp, isNotRelevant, start, end, nestLevel)),
									_1: {ctor: '[]'}
								}
							}
						}));
			});
	});
var _elm_tools$parser$Parser_LanguageKit$nestableComment = F2(
	function (start, end) {
		var _p5 = {
			ctor: '_Tuple2',
			_0: _elm_lang$core$String$uncons(start),
			_1: _elm_lang$core$String$uncons(end)
		};
		if (_p5._0.ctor === 'Nothing') {
			return _elm_tools$parser$Parser$fail('Trying to parse a multi-line comment, but the start token cannot be the empty string!');
		} else {
			if (_p5._1.ctor === 'Nothing') {
				return _elm_tools$parser$Parser$fail('Trying to parse a multi-line comment, but the end token cannot be the empty string!');
			} else {
				var isNotRelevant = function ($char) {
					return (!_elm_lang$core$Native_Utils.eq($char, _p5._0._0._0)) && (!_elm_lang$core$Native_Utils.eq($char, _p5._1._0._0));
				};
				return A2(
					_elm_tools$parser$Parser_ops['|.'],
					_elm_tools$parser$Parser$symbol(start),
					A4(_elm_tools$parser$Parser_LanguageKit$nestableCommentHelp, isNotRelevant, start, end, 1));
			}
		}
	});
var _elm_tools$parser$Parser_LanguageKit$whitespace = function (_p6) {
	var _p7 = _p6;
	var multiParser = function () {
		var _p8 = _p7.multiComment;
		switch (_p8.ctor) {
			case 'NoMultiComment':
				return {ctor: '[]'};
			case 'UnnestableComment':
				return {
					ctor: '::',
					_0: A2(
						_elm_tools$parser$Parser_ops['|.'],
						_elm_tools$parser$Parser$symbol(_p8._0),
						_elm_tools$parser$Parser$ignoreUntil(_p8._1)),
					_1: {ctor: '[]'}
				};
			default:
				return {
					ctor: '::',
					_0: A2(_elm_tools$parser$Parser_LanguageKit$nestableComment, _p8._0, _p8._1),
					_1: {ctor: '[]'}
				};
		}
	}();
	var lineParser = function () {
		var _p9 = _p7.lineComment;
		if (_p9.ctor === 'NoLineComment') {
			return {ctor: '[]'};
		} else {
			return {
				ctor: '::',
				_0: A2(
					_elm_tools$parser$Parser_ops['|.'],
					_elm_tools$parser$Parser$symbol(_p9._0),
					_elm_tools$parser$Parser$ignoreUntil('\n')),
				_1: {ctor: '[]'}
			};
		}
	}();
	var tabParser = _p7.allowTabs ? {
		ctor: '::',
		_0: A2(_elm_tools$parser$Parser$ignore, _elm_tools$parser$Parser$zeroOrMore, _elm_tools$parser$Parser_LanguageKit$isTab),
		_1: {ctor: '[]'}
	} : {ctor: '[]'};
	return _elm_tools$parser$Parser_LanguageKit$whitespaceHelp(
		_elm_tools$parser$Parser$oneOf(
			A2(
				_elm_lang$core$Basics_ops['++'],
				tabParser,
				A2(_elm_lang$core$Basics_ops['++'], lineParser, multiParser))));
};
var _elm_tools$parser$Parser_LanguageKit$sequence = function (_p10) {
	var _p11 = _p10;
	var _p12 = _p11.spaces;
	return A2(
		_elm_tools$parser$Parser_LanguageKit_ops['|-'],
		A2(
			_elm_tools$parser$Parser_LanguageKit_ops['|-'],
			_elm_tools$parser$Parser$symbol(_p11.start),
			_p12),
		A5(_elm_tools$parser$Parser_LanguageKit$sequenceEnd, _p11.end, _p12, _p11.item, _p11.separator, _p11.trailing));
};
var _elm_tools$parser$Parser_LanguageKit$varHelp = F7(
	function (isGood, offset, row, col, source, indent, context) {
		varHelp:
		while (true) {
			var newOffset = A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, isGood, offset, source);
			if (_elm_lang$core$Native_Utils.eq(newOffset, -1)) {
				return {source: source, offset: offset, indent: indent, context: context, row: row, col: col};
			} else {
				if (_elm_lang$core$Native_Utils.eq(newOffset, -2)) {
					var _v6 = isGood,
						_v7 = offset + 1,
						_v8 = row + 1,
						_v9 = 1,
						_v10 = source,
						_v11 = indent,
						_v12 = context;
					isGood = _v6;
					offset = _v7;
					row = _v8;
					col = _v9;
					source = _v10;
					indent = _v11;
					context = _v12;
					continue varHelp;
				} else {
					var _v13 = isGood,
						_v14 = newOffset,
						_v15 = row,
						_v16 = col + 1,
						_v17 = source,
						_v18 = indent,
						_v19 = context;
					isGood = _v13;
					offset = _v14;
					row = _v15;
					col = _v16;
					source = _v17;
					indent = _v18;
					context = _v19;
					continue varHelp;
				}
			}
		}
	});
var _elm_tools$parser$Parser_LanguageKit$variable = F3(
	function (isFirst, isOther, keywords) {
		return _elm_tools$parser$Parser_Internal$Parser(
			function (_p13) {
				var _p14 = _p13;
				var _p20 = _p14;
				var _p19 = _p14.source;
				var _p18 = _p14.row;
				var _p17 = _p14.offset;
				var _p16 = _p14.indent;
				var _p15 = _p14.context;
				var firstOffset = A3(_elm_tools$parser_primitives$ParserPrimitives$isSubChar, isFirst, _p17, _p19);
				if (_elm_lang$core$Native_Utils.eq(firstOffset, -1)) {
					return A2(_elm_tools$parser$Parser_Internal$Bad, _elm_tools$parser$Parser$ExpectingVariable, _p20);
				} else {
					var state2 = _elm_lang$core$Native_Utils.eq(firstOffset, -2) ? A7(_elm_tools$parser$Parser_LanguageKit$varHelp, isOther, _p17 + 1, _p18 + 1, 1, _p19, _p16, _p15) : A7(_elm_tools$parser$Parser_LanguageKit$varHelp, isOther, firstOffset, _p18, _p14.col + 1, _p19, _p16, _p15);
					var name = A3(_elm_lang$core$String$slice, _p17, state2.offset, _p19);
					return A2(_elm_lang$core$Set$member, name, keywords) ? A2(_elm_tools$parser$Parser_Internal$Bad, _elm_tools$parser$Parser$ExpectingVariable, _p20) : A2(_elm_tools$parser$Parser_Internal$Good, name, state2);
				}
			});
	});
var _elm_tools$parser$Parser_LanguageKit$Mandatory = {ctor: 'Mandatory'};
var _elm_tools$parser$Parser_LanguageKit$Optional = {ctor: 'Optional'};
var _elm_tools$parser$Parser_LanguageKit$Forbidden = {ctor: 'Forbidden'};
var _elm_tools$parser$Parser_LanguageKit$list = F2(
	function (spaces, item) {
		return _elm_tools$parser$Parser_LanguageKit$sequence(
			{start: '[', separator: ',', end: ']', spaces: spaces, item: item, trailing: _elm_tools$parser$Parser_LanguageKit$Forbidden});
	});
var _elm_tools$parser$Parser_LanguageKit$record = F2(
	function (spaces, item) {
		return _elm_tools$parser$Parser_LanguageKit$sequence(
			{start: '{', separator: ',', end: '}', spaces: spaces, item: item, trailing: _elm_tools$parser$Parser_LanguageKit$Forbidden});
	});
var _elm_tools$parser$Parser_LanguageKit$tuple = F2(
	function (spaces, item) {
		return _elm_tools$parser$Parser_LanguageKit$sequence(
			{start: '(', separator: ',', end: ')', spaces: spaces, item: item, trailing: _elm_tools$parser$Parser_LanguageKit$Forbidden});
	});
var _elm_tools$parser$Parser_LanguageKit$LineComment = function (a) {
	return {ctor: 'LineComment', _0: a};
};
var _elm_tools$parser$Parser_LanguageKit$NoLineComment = {ctor: 'NoLineComment'};
var _elm_tools$parser$Parser_LanguageKit$UnnestableComment = F2(
	function (a, b) {
		return {ctor: 'UnnestableComment', _0: a, _1: b};
	});
var _elm_tools$parser$Parser_LanguageKit$NestableComment = F2(
	function (a, b) {
		return {ctor: 'NestableComment', _0: a, _1: b};
	});
var _elm_tools$parser$Parser_LanguageKit$NoMultiComment = {ctor: 'NoMultiComment'};

var _FMFI_UK_1_AIN_412$elm_formula$Formula$strArgs = function (ts) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'(',
		A2(
			_elm_lang$core$Basics_ops['++'],
			A2(
				_elm_lang$core$String$join,
				',',
				A2(_elm_lang$core$List$map, _FMFI_UK_1_AIN_412$elm_formula$Formula$strTerm, ts)),
			')'));
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$strTerm = function (t) {
	var _p0 = t;
	if (_p0.ctor === 'Var') {
		return _p0._0;
	} else {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_p0._0,
			_FMFI_UK_1_AIN_412$elm_formula$Formula$strArgs(_p0._1));
	}
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$strFormula = function (f) {
	var atomSpace = function (f) {
		var _p1 = f;
		if (_p1.ctor === 'Atom') {
			return ' ';
		} else {
			return '';
		}
	};
	var strQF = F3(
		function (q, bv, f) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				q,
				A2(
					_elm_lang$core$Basics_ops['++'],
					bv,
					A2(
						_elm_lang$core$Basics_ops['++'],
						atomSpace(f),
						_FMFI_UK_1_AIN_412$elm_formula$Formula$strFormula(f))));
		});
	var strBinF = F3(
		function (lf, c, rf) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_FMFI_UK_1_AIN_412$elm_formula$Formula$strFormula(lf),
					A2(
						_elm_lang$core$Basics_ops['++'],
						c,
						A2(
							_elm_lang$core$Basics_ops['++'],
							_FMFI_UK_1_AIN_412$elm_formula$Formula$strFormula(rf),
							')'))));
		});
	var _p2 = f;
	switch (_p2.ctor) {
		case 'FT':
			return 'True';
		case 'FF':
			return 'False';
		case 'Atom':
			if (_p2._1.ctor === '[]') {
				return _p2._0;
			} else {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					_p2._0,
					_FMFI_UK_1_AIN_412$elm_formula$Formula$strArgs(_p2._1));
			}
		case 'Neg':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'¬',
				_FMFI_UK_1_AIN_412$elm_formula$Formula$strFormula(_p2._0));
		case 'Conj':
			return A3(strBinF, _p2._0, '∧', _p2._1);
		case 'Disj':
			return A3(strBinF, _p2._0, '∨', _p2._1);
		case 'Impl':
			return A3(strBinF, _p2._0, '→', _p2._1);
		case 'ForAll':
			return A3(strQF, '∀', _p2._0, _p2._1);
		default:
			return A3(strQF, '∃', _p2._0, _p2._1);
	}
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$strSigned = function (sf) {
	var _p3 = sf;
	if (_p3.ctor === 'T') {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'T ',
			_FMFI_UK_1_AIN_412$elm_formula$Formula$strFormula(_p3._0));
	} else {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'F ',
			_FMFI_UK_1_AIN_412$elm_formula$Formula$strFormula(_p3._0));
	}
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$strSubstitution = function (s) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'(',
		A2(
			_elm_lang$core$Basics_ops['++'],
			A2(
				_elm_lang$core$String$join,
				',',
				A2(
					_elm_lang$core$List$map,
					function (_p4) {
						var _p5 = _p4;
						return A2(
							_elm_lang$core$Basics_ops['++'],
							_p5._0,
							A2(
								_elm_lang$core$Basics_ops['++'],
								'->',
								_FMFI_UK_1_AIN_412$elm_formula$Formula$strTerm(_p5._1)));
					},
					_elm_lang$core$Dict$toList(s))),
			')'));
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$spaces = A2(
	_elm_tools$parser$Parser$ignore,
	_elm_tools$parser$Parser$zeroOrMore,
	function ($char) {
		return _elm_lang$core$Native_Utils.eq(
			$char,
			_elm_lang$core$Native_Utils.chr(' '));
	});
var _FMFI_UK_1_AIN_412$elm_formula$Formula$isLetter = function ($char) {
	return _elm_lang$core$Char$isLower($char) || _elm_lang$core$Char$isUpper($char);
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$isIdentChar = function ($char) {
	return _FMFI_UK_1_AIN_412$elm_formula$Formula$isLetter($char) || (_elm_lang$core$Char$isDigit($char) || _elm_lang$core$Native_Utils.eq(
		$char,
		_elm_lang$core$Native_Utils.chr('_')));
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$oneOfSymbols = function (syms) {
	return _elm_tools$parser$Parser$oneOf(
		A2(_elm_lang$core$List$map, _elm_tools$parser$Parser$symbol, syms));
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$identifier = A3(_elm_tools$parser$Parser_LanguageKit$variable, _FMFI_UK_1_AIN_412$elm_formula$Formula$isLetter, _FMFI_UK_1_AIN_412$elm_formula$Formula$isIdentChar, _elm_lang$core$Set$empty);
var _FMFI_UK_1_AIN_412$elm_formula$Formula$errorString = function (e) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'Invalid formula: ',
		_elm_lang$core$Basics$toString(e));
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$signedGetFormula = function (sf) {
	var _p6 = sf;
	if (_p6.ctor === 'T') {
		return _p6._0;
	} else {
		return _p6._0;
	}
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$isSignedComplementary = F2(
	function (a, b) {
		var _p7 = {ctor: '_Tuple2', _0: a, _1: b};
		_v6_2:
		do {
			if (_p7.ctor === '_Tuple2') {
				if (_p7._0.ctor === 'T') {
					if (_p7._1.ctor === 'F') {
						return _elm_lang$core$Native_Utils.eq(_p7._0._0, _p7._1._0);
					} else {
						break _v6_2;
					}
				} else {
					if (_p7._1.ctor === 'T') {
						return _elm_lang$core$Native_Utils.eq(_p7._0._0, _p7._1._0);
					} else {
						break _v6_2;
					}
				}
			} else {
				break _v6_2;
			}
		} while(false);
		return false;
	});
var _FMFI_UK_1_AIN_412$elm_formula$Formula$mapResult = function (f) {
	return A2(
		_elm_lang$core$List$foldr,
		function (_p8) {
			return A2(
				_elm_lang$core$Result$map2,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				f(_p8));
		},
		_elm_lang$core$Result$Ok(
			{ctor: '[]'}));
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$freeTermA = F2(
	function (t, fvs) {
		var _p9 = t;
		if (_p9.ctor === 'Var') {
			return A2(_elm_lang$core$Set$insert, _p9._0, fvs);
		} else {
			return A3(_elm_lang$core$List$foldl, _FMFI_UK_1_AIN_412$elm_formula$Formula$freeTermA, fvs, _p9._1);
		}
	});
var _FMFI_UK_1_AIN_412$elm_formula$Formula$freeTerm = function (t) {
	return A2(_FMFI_UK_1_AIN_412$elm_formula$Formula$freeTermA, t, _elm_lang$core$Set$empty);
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$subformulas = function (f) {
	var _p10 = f;
	switch (_p10.ctor) {
		case 'Neg':
			return {
				ctor: '::',
				_0: _p10._0,
				_1: {ctor: '[]'}
			};
		case 'Disj':
			return {
				ctor: '::',
				_0: _p10._0,
				_1: {
					ctor: '::',
					_0: _p10._1,
					_1: {ctor: '[]'}
				}
			};
		case 'Conj':
			return {
				ctor: '::',
				_0: _p10._0,
				_1: {
					ctor: '::',
					_0: _p10._1,
					_1: {ctor: '[]'}
				}
			};
		case 'Impl':
			return {
				ctor: '::',
				_0: _p10._0,
				_1: {
					ctor: '::',
					_0: _p10._1,
					_1: {ctor: '[]'}
				}
			};
		case 'ForAll':
			return {
				ctor: '::',
				_0: _p10._1,
				_1: {ctor: '[]'}
			};
		case 'Exists':
			return {
				ctor: '::',
				_0: _p10._1,
				_1: {ctor: '[]'}
			};
		default:
			return {ctor: '[]'};
	}
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$isSubformulaOf = F2(
	function (a, b) {
		return A2(
			_elm_lang$core$List$member,
			a,
			_FMFI_UK_1_AIN_412$elm_formula$Formula$subformulas(b));
	});
var _FMFI_UK_1_AIN_412$elm_formula$Formula$freeFormula = function (f) {
	var freeFormulaA = F2(
		function (f, fvs) {
			var _p11 = f;
			switch (_p11.ctor) {
				case 'Atom':
					return A3(_elm_lang$core$List$foldl, _FMFI_UK_1_AIN_412$elm_formula$Formula$freeTermA, fvs, _p11._1);
				case 'ForAll':
					return A2(
						_elm_lang$core$Set$remove,
						_p11._0,
						A2(freeFormulaA, _p11._1, fvs));
				case 'Exists':
					return A2(
						_elm_lang$core$Set$remove,
						_p11._0,
						A2(freeFormulaA, _p11._1, fvs));
				default:
					return A3(
						_elm_lang$core$List$foldl,
						freeFormulaA,
						fvs,
						_FMFI_UK_1_AIN_412$elm_formula$Formula$subformulas(f));
			}
		});
	return A2(freeFormulaA, f, _elm_lang$core$Set$empty);
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$predicates = function (f) {
	var predicatesA = F2(
		function (f, ps) {
			var _p12 = f;
			if (_p12.ctor === 'Atom') {
				return A2(_elm_lang$core$Set$insert, _p12._0, ps);
			} else {
				return A3(
					_elm_lang$core$List$foldl,
					predicatesA,
					ps,
					_FMFI_UK_1_AIN_412$elm_formula$Formula$subformulas(f));
			}
		});
	return A2(predicatesA, f, _elm_lang$core$Set$empty);
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$functions = function (f) {
	var functionsTA = F2(
		function (t, fs) {
			var _p13 = t;
			if (_p13.ctor === 'Fun') {
				return A2(
					_elm_lang$core$Set$insert,
					_p13._0,
					A3(_elm_lang$core$List$foldl, functionsTA, fs, _p13._1));
			} else {
				return fs;
			}
		});
	var functionsA = F2(
		function (f, fs) {
			var _p14 = f;
			if (_p14.ctor === 'Atom') {
				return A3(_elm_lang$core$List$foldl, functionsTA, fs, _p14._1);
			} else {
				return A3(
					_elm_lang$core$List$foldl,
					functionsA,
					fs,
					_FMFI_UK_1_AIN_412$elm_formula$Formula$subformulas(f));
			}
		});
	return A2(functionsA, f, _elm_lang$core$Set$empty);
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$variables = function (f) {
	var variablesTA = F2(
		function (t, vs) {
			var _p15 = t;
			if (_p15.ctor === 'Fun') {
				return A3(_elm_lang$core$List$foldl, variablesTA, vs, _p15._1);
			} else {
				return A2(_elm_lang$core$Set$insert, _p15._0, vs);
			}
		});
	var variablesA = F2(
		function (f, vs) {
			var _p16 = f;
			if (_p16.ctor === 'Atom') {
				return A3(_elm_lang$core$List$foldl, variablesTA, vs, _p16._1);
			} else {
				return A3(
					_elm_lang$core$List$foldl,
					variablesA,
					vs,
					_FMFI_UK_1_AIN_412$elm_formula$Formula$subformulas(f));
			}
		});
	return A2(variablesA, f, _elm_lang$core$Set$empty);
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$Fun = F2(
	function (a, b) {
		return {ctor: 'Fun', _0: a, _1: b};
	});
var _FMFI_UK_1_AIN_412$elm_formula$Formula$substTerm = F2(
	function (sigma, t) {
		var _p17 = t;
		if (_p17.ctor === 'Var') {
			var _p18 = A2(_elm_lang$core$Dict$get, _p17._0, sigma);
			if (_p18.ctor === 'Just') {
				return _p18._0;
			} else {
				return t;
			}
		} else {
			return A2(
				_FMFI_UK_1_AIN_412$elm_formula$Formula$Fun,
				_p17._0,
				A2(
					_elm_lang$core$List$map,
					_FMFI_UK_1_AIN_412$elm_formula$Formula$substTerm(sigma),
					_p17._1));
		}
	});
var _FMFI_UK_1_AIN_412$elm_formula$Formula$Var = function (a) {
	return {ctor: 'Var', _0: a};
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$term = A2(
	_elm_tools$parser$Parser$andThen,
	function (name) {
		return _elm_tools$parser$Parser$oneOf(
			{
				ctor: '::',
				_0: A2(
					_elm_tools$parser$Parser_ops['|='],
					_elm_tools$parser$Parser$succeed(
						function (args) {
							return A2(_FMFI_UK_1_AIN_412$elm_formula$Formula$Fun, name, args);
						}),
					_elm_tools$parser$Parser$lazy(
						function (_p19) {
							return A2(_elm_tools$parser$Parser$inContext, 'function arguments', _FMFI_UK_1_AIN_412$elm_formula$Formula$args);
						})),
				_1: {
					ctor: '::',
					_0: _elm_tools$parser$Parser$succeed(
						_FMFI_UK_1_AIN_412$elm_formula$Formula$Var(name)),
					_1: {ctor: '[]'}
				}
			});
	},
	_FMFI_UK_1_AIN_412$elm_formula$Formula$identifier);
var _FMFI_UK_1_AIN_412$elm_formula$Formula$args = A2(
	_elm_tools$parser$Parser_ops['|.'],
	A2(
		_elm_tools$parser$Parser_ops['|='],
		A2(
			_elm_tools$parser$Parser_ops['|.'],
			A2(
				_elm_tools$parser$Parser_ops['|='],
				A2(
					_elm_tools$parser$Parser_ops['|.'],
					A2(
						_elm_tools$parser$Parser_ops['|.'],
						_elm_tools$parser$Parser$succeed(
							F2(
								function (x, y) {
									return {ctor: '::', _0: x, _1: y};
								})),
						_elm_tools$parser$Parser$symbol('(')),
					_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
				_elm_tools$parser$Parser$lazy(
					function (_p20) {
						return _FMFI_UK_1_AIN_412$elm_formula$Formula$term;
					})),
			_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
		_elm_tools$parser$Parser$lazy(
			function (_p21) {
				return A2(_elm_tools$parser$Parser$repeat, _elm_tools$parser$Parser$zeroOrMore, _FMFI_UK_1_AIN_412$elm_formula$Formula$nextArg);
			})),
	_elm_tools$parser$Parser$symbol(')'));
var _FMFI_UK_1_AIN_412$elm_formula$Formula$nextArg = A2(
	_elm_tools$parser$Parser_ops['|.'],
	A2(
		_elm_tools$parser$Parser_ops['|='],
		A2(
			_elm_tools$parser$Parser_ops['|.'],
			A2(
				_elm_tools$parser$Parser_ops['|.'],
				_elm_tools$parser$Parser$succeed(_elm_lang$core$Basics$identity),
				_elm_tools$parser$Parser$symbol(',')),
			_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
		_FMFI_UK_1_AIN_412$elm_formula$Formula$term),
	_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces);
var _FMFI_UK_1_AIN_412$elm_formula$Formula$parseTerm = _elm_tools$parser$Parser$run(
	A2(
		_elm_tools$parser$Parser_ops['|.'],
		A2(
			_elm_tools$parser$Parser_ops['|.'],
			A2(
				_elm_tools$parser$Parser_ops['|='],
				A2(
					_elm_tools$parser$Parser_ops['|.'],
					_elm_tools$parser$Parser$succeed(_elm_lang$core$Basics$identity),
					_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
				_FMFI_UK_1_AIN_412$elm_formula$Formula$term),
			_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
		_elm_tools$parser$Parser$end));
var _FMFI_UK_1_AIN_412$elm_formula$Formula$FT = {ctor: 'FT'};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$FF = {ctor: 'FF'};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$Exists = F2(
	function (a, b) {
		return {ctor: 'Exists', _0: a, _1: b};
	});
var _FMFI_UK_1_AIN_412$elm_formula$Formula$ForAll = F2(
	function (a, b) {
		return {ctor: 'ForAll', _0: a, _1: b};
	});
var _FMFI_UK_1_AIN_412$elm_formula$Formula$Impl = F2(
	function (a, b) {
		return {ctor: 'Impl', _0: a, _1: b};
	});
var _FMFI_UK_1_AIN_412$elm_formula$Formula$Conj = F2(
	function (a, b) {
		return {ctor: 'Conj', _0: a, _1: b};
	});
var _FMFI_UK_1_AIN_412$elm_formula$Formula$Disj = F2(
	function (a, b) {
		return {ctor: 'Disj', _0: a, _1: b};
	});
var _FMFI_UK_1_AIN_412$elm_formula$Formula$Neg = function (a) {
	return {ctor: 'Neg', _0: a};
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$Atom = F2(
	function (a, b) {
		return {ctor: 'Atom', _0: a, _1: b};
	});
var _FMFI_UK_1_AIN_412$elm_formula$Formula$substitute = F2(
	function (σ, f) {
		var canSubst = F3(
			function (x, t, bound) {
				var strVars = function (xs) {
					return A2(_elm_lang$core$String$join, ', ', xs);
				};
				var varsToBe = function (xs) {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						'variable',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Native_Utils.eq(
								_elm_lang$core$Set$size(xs),
								1) ? '' : 's',
							A2(
								_elm_lang$core$Basics_ops['++'],
								' ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									strVars(
										_elm_lang$core$Set$toList(xs)),
									_elm_lang$core$Native_Utils.eq(
										_elm_lang$core$Set$size(xs),
										1) ? ' is' : ' are'))));
				};
				var clashing = A2(
					_elm_lang$core$Set$intersect,
					bound,
					_FMFI_UK_1_AIN_412$elm_formula$Formula$freeTerm(t));
				return _elm_lang$core$Set$isEmpty(clashing) ? _elm_lang$core$Result$Ok(t) : _elm_lang$core$Result$Err(
					A2(
						_elm_lang$core$String$join,
						' ',
						{
							ctor: '::',
							_0: 'Cannot substitute',
							_1: {
								ctor: '::',
								_0: _FMFI_UK_1_AIN_412$elm_formula$Formula$strTerm(t),
								_1: {
									ctor: '::',
									_0: 'for',
									_1: {
										ctor: '::',
										_0: A2(_elm_lang$core$Basics_ops['++'], x, ';'),
										_1: {
											ctor: '::',
											_0: varsToBe(clashing),
											_1: {
												ctor: '::',
												_0: 'bound',
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						}));
			});
		var substT = F3(
			function (σ, bound, t) {
				var subst = function (t) {
					var _p22 = t;
					if (_p22.ctor === 'Var') {
						var _p24 = _p22._0;
						var _p23 = A2(_elm_lang$core$Dict$get, _p24, σ);
						if (_p23.ctor === 'Just') {
							return A3(canSubst, _p24, _p23._0, bound);
						} else {
							return _elm_lang$core$Result$Ok(t);
						}
					} else {
						return A2(
							_elm_lang$core$Result$map,
							_FMFI_UK_1_AIN_412$elm_formula$Formula$Fun(_p22._0),
							A3(substTs, σ, bound, _p22._1));
					}
				};
				return subst(t);
			});
		var substTs = F3(
			function (σ, bound, lst) {
				return A2(
					_FMFI_UK_1_AIN_412$elm_formula$Formula$mapResult,
					A2(substT, σ, bound),
					lst);
			});
		var substF = F3(
			function (σ, bound, f) {
				var subst = A2(substF, σ, bound);
				var _p25 = f;
				switch (_p25.ctor) {
					case 'Atom':
						return A2(
							_elm_lang$core$Result$map,
							_FMFI_UK_1_AIN_412$elm_formula$Formula$Atom(_p25._0),
							A3(substTs, σ, bound, _p25._1));
					case 'ForAll':
						var _p26 = _p25._0;
						return A2(
							_elm_lang$core$Result$map,
							_FMFI_UK_1_AIN_412$elm_formula$Formula$ForAll(_p26),
							A3(
								substF,
								A2(_elm_lang$core$Dict$remove, _p26, σ),
								A2(_elm_lang$core$Set$insert, _p26, bound),
								_p25._1));
					case 'Exists':
						var _p27 = _p25._0;
						return A2(
							_elm_lang$core$Result$map,
							_FMFI_UK_1_AIN_412$elm_formula$Formula$Exists(_p27),
							A3(
								substF,
								A2(_elm_lang$core$Dict$remove, _p27, σ),
								A2(_elm_lang$core$Set$insert, _p27, bound),
								_p25._1));
					case 'Disj':
						return A3(
							_elm_lang$core$Result$map2,
							_FMFI_UK_1_AIN_412$elm_formula$Formula$Disj,
							subst(_p25._0),
							subst(_p25._1));
					case 'Conj':
						return A3(
							_elm_lang$core$Result$map2,
							_FMFI_UK_1_AIN_412$elm_formula$Formula$Conj,
							subst(_p25._0),
							subst(_p25._1));
					case 'Impl':
						return A3(
							_elm_lang$core$Result$map2,
							_FMFI_UK_1_AIN_412$elm_formula$Formula$Impl,
							subst(_p25._0),
							subst(_p25._1));
					case 'Neg':
						return A2(
							_elm_lang$core$Result$map,
							_FMFI_UK_1_AIN_412$elm_formula$Formula$Neg,
							subst(_p25._0));
					default:
						return _elm_lang$core$Result$Ok(f);
				}
			});
		return A3(substF, σ, _elm_lang$core$Set$empty, f);
	});
var _FMFI_UK_1_AIN_412$elm_formula$Formula$removeQuantifierAndSubstitute = F2(
	function (substitution, original) {
		if (_elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$Dict$size(substitution),
			1) > 0) {
			return _elm_lang$core$Result$Err('there is more than one substitution pair');
		} else {
			var _p28 = original;
			switch (_p28.ctor) {
				case 'ForAll':
					return A2(
						_elm_lang$core$List$member,
						_p28._0,
						_elm_lang$core$Dict$keys(substitution)) ? A2(_FMFI_UK_1_AIN_412$elm_formula$Formula$substitute, substitution, _p28._1) : _elm_lang$core$Result$Err('substituted variable isn\'t in substitution');
				case 'Exists':
					return A2(
						_elm_lang$core$List$member,
						_p28._0,
						_elm_lang$core$Dict$keys(substitution)) ? A2(_FMFI_UK_1_AIN_412$elm_formula$Formula$substitute, substitution, _p28._1) : _elm_lang$core$Result$Err('substituted variable isn\'t in substitution');
				default:
					return _elm_lang$core$Result$Err('formula doesn\'t start with quantifier');
			}
		}
	});
var _FMFI_UK_1_AIN_412$elm_formula$Formula$formula = _elm_tools$parser$Parser$oneOf(
	{
		ctor: '::',
		_0: A2(
			_elm_tools$parser$Parser_ops['|='],
			A2(
				_elm_tools$parser$Parser_ops['|.'],
				A2(
					_elm_tools$parser$Parser_ops['|='],
					_elm_tools$parser$Parser$succeed(_FMFI_UK_1_AIN_412$elm_formula$Formula$Atom),
					_FMFI_UK_1_AIN_412$elm_formula$Formula$identifier),
				_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
			_elm_tools$parser$Parser$oneOf(
				{
					ctor: '::',
					_0: A2(_elm_tools$parser$Parser$inContext, 'predicate arguments', _FMFI_UK_1_AIN_412$elm_formula$Formula$args),
					_1: {
						ctor: '::',
						_0: _elm_tools$parser$Parser$succeed(
							{ctor: '[]'}),
						_1: {ctor: '[]'}
					}
				})),
		_1: {
			ctor: '::',
			_0: _elm_tools$parser$Parser$lazy(
				function (_p29) {
					return A2(
						_FMFI_UK_1_AIN_412$elm_formula$Formula$quantified,
						{
							ctor: '::',
							_0: '∀',
							_1: {
								ctor: '::',
								_0: '\\A',
								_1: {
									ctor: '::',
									_0: '\\forall',
									_1: {
										ctor: '::',
										_0: '\\a',
										_1: {ctor: '[]'}
									}
								}
							}
						},
						_FMFI_UK_1_AIN_412$elm_formula$Formula$ForAll);
				}),
			_1: {
				ctor: '::',
				_0: _elm_tools$parser$Parser$lazy(
					function (_p30) {
						return A2(
							_FMFI_UK_1_AIN_412$elm_formula$Formula$quantified,
							{
								ctor: '::',
								_0: '∃',
								_1: {
									ctor: '::',
									_0: '\\E',
									_1: {
										ctor: '::',
										_0: '\\exists',
										_1: {
											ctor: '::',
											_0: '\\e',
											_1: {ctor: '[]'}
										}
									}
								}
							},
							_FMFI_UK_1_AIN_412$elm_formula$Formula$Exists);
					}),
				_1: {
					ctor: '::',
					_0: A2(
						_elm_tools$parser$Parser_ops['|='],
						A2(
							_elm_tools$parser$Parser_ops['|.'],
							A2(
								_elm_tools$parser$Parser_ops['|.'],
								_elm_tools$parser$Parser$succeed(_FMFI_UK_1_AIN_412$elm_formula$Formula$Neg),
								_FMFI_UK_1_AIN_412$elm_formula$Formula$oneOfSymbols(
									{
										ctor: '::',
										_0: '-',
										_1: {
											ctor: '::',
											_0: '¬',
											_1: {
												ctor: '::',
												_0: '~',
												_1: {ctor: '[]'}
											}
										}
									})),
							_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
						_elm_tools$parser$Parser$lazy(
							function (_p31) {
								return _FMFI_UK_1_AIN_412$elm_formula$Formula$formula;
							})),
					_1: {
						ctor: '::',
						_0: _elm_tools$parser$Parser$lazy(
							function (_p32) {
								return A2(
									_FMFI_UK_1_AIN_412$elm_formula$Formula$binary,
									{
										ctor: '::',
										_0: '&',
										_1: {
											ctor: '::',
											_0: '∧',
											_1: {
												ctor: '::',
												_0: '/\\',
												_1: {ctor: '[]'}
											}
										}
									},
									_FMFI_UK_1_AIN_412$elm_formula$Formula$Conj);
							}),
						_1: {
							ctor: '::',
							_0: _elm_tools$parser$Parser$lazy(
								function (_p33) {
									return A2(
										_FMFI_UK_1_AIN_412$elm_formula$Formula$binary,
										{
											ctor: '::',
											_0: '|',
											_1: {
												ctor: '::',
												_0: '∨',
												_1: {
													ctor: '::',
													_0: '\\/',
													_1: {ctor: '[]'}
												}
											}
										},
										_FMFI_UK_1_AIN_412$elm_formula$Formula$Disj);
								}),
							_1: {
								ctor: '::',
								_0: _elm_tools$parser$Parser$lazy(
									function (_p34) {
										return A2(
											_FMFI_UK_1_AIN_412$elm_formula$Formula$binary,
											{
												ctor: '::',
												_0: '->',
												_1: {
													ctor: '::',
													_0: '→',
													_1: {ctor: '[]'}
												}
											},
											_FMFI_UK_1_AIN_412$elm_formula$Formula$Impl);
									}),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_tools$parser$Parser_ops['|.'],
										A2(
											_elm_tools$parser$Parser_ops['|.'],
											A2(
												_elm_tools$parser$Parser_ops['|='],
												A2(
													_elm_tools$parser$Parser_ops['|.'],
													A2(
														_elm_tools$parser$Parser_ops['|.'],
														_elm_tools$parser$Parser$succeed(_elm_lang$core$Basics$identity),
														_elm_tools$parser$Parser$symbol('(')),
													_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
												_elm_tools$parser$Parser$lazy(
													function (_p35) {
														return _FMFI_UK_1_AIN_412$elm_formula$Formula$formula;
													})),
											_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
										_elm_tools$parser$Parser$symbol(')')),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}
		}
	});
var _FMFI_UK_1_AIN_412$elm_formula$Formula$binary = F2(
	function (conn, constructor) {
		return A3(
			_elm_tools$parser$Parser$delayedCommitMap,
			constructor,
			A2(
				_elm_tools$parser$Parser_ops['|.'],
				A2(
					_elm_tools$parser$Parser_ops['|='],
					A2(
						_elm_tools$parser$Parser_ops['|.'],
						A2(
							_elm_tools$parser$Parser_ops['|.'],
							_elm_tools$parser$Parser$succeed(_elm_lang$core$Basics$identity),
							_elm_tools$parser$Parser$symbol('(')),
						_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
					_elm_tools$parser$Parser$lazy(
						function (_p36) {
							return _FMFI_UK_1_AIN_412$elm_formula$Formula$formula;
						})),
				_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
			A2(
				_elm_tools$parser$Parser_ops['|.'],
				A2(
					_elm_tools$parser$Parser_ops['|.'],
					A2(
						_elm_tools$parser$Parser_ops['|='],
						A2(
							_elm_tools$parser$Parser_ops['|.'],
							A2(
								_elm_tools$parser$Parser_ops['|.'],
								_elm_tools$parser$Parser$succeed(_elm_lang$core$Basics$identity),
								_FMFI_UK_1_AIN_412$elm_formula$Formula$oneOfSymbols(conn)),
							_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
						_elm_tools$parser$Parser$lazy(
							function (_p37) {
								return _FMFI_UK_1_AIN_412$elm_formula$Formula$formula;
							})),
					_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
				_elm_tools$parser$Parser$symbol(')')));
	});
var _FMFI_UK_1_AIN_412$elm_formula$Formula$quantified = F2(
	function (symbols, constructor) {
		return A2(
			_elm_tools$parser$Parser_ops['|='],
			A2(
				_elm_tools$parser$Parser_ops['|.'],
				A2(
					_elm_tools$parser$Parser_ops['|='],
					A2(
						_elm_tools$parser$Parser_ops['|.'],
						A2(
							_elm_tools$parser$Parser_ops['|.'],
							_elm_tools$parser$Parser$succeed(constructor),
							_FMFI_UK_1_AIN_412$elm_formula$Formula$oneOfSymbols(symbols)),
						_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
					_elm_tools$parser$Parser$lazy(
						function (_p38) {
							return _FMFI_UK_1_AIN_412$elm_formula$Formula$identifier;
						})),
				_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
			_elm_tools$parser$Parser$lazy(
				function (_p39) {
					return _FMFI_UK_1_AIN_412$elm_formula$Formula$formula;
				}));
	});
var _FMFI_UK_1_AIN_412$elm_formula$Formula$parse = _elm_tools$parser$Parser$run(
	A2(
		_elm_tools$parser$Parser_ops['|.'],
		A2(
			_elm_tools$parser$Parser_ops['|.'],
			A2(
				_elm_tools$parser$Parser_ops['|='],
				A2(
					_elm_tools$parser$Parser_ops['|.'],
					_elm_tools$parser$Parser$succeed(_elm_lang$core$Basics$identity),
					_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
				_FMFI_UK_1_AIN_412$elm_formula$Formula$formula),
			_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
		_elm_tools$parser$Parser$end));
var _FMFI_UK_1_AIN_412$elm_formula$Formula$f = function (_p40) {
	return A2(
		_elm_lang$core$Result$withDefault,
		_FMFI_UK_1_AIN_412$elm_formula$Formula$FF,
		_FMFI_UK_1_AIN_412$elm_formula$Formula$parse(_p40));
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$F = function (a) {
	return {ctor: 'F', _0: a};
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$T = function (a) {
	return {ctor: 'T', _0: a};
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$negSigned = function (sf) {
	var _p41 = sf;
	if (_p41.ctor === 'T') {
		return _FMFI_UK_1_AIN_412$elm_formula$Formula$F(_p41._0);
	} else {
		return _FMFI_UK_1_AIN_412$elm_formula$Formula$T(_p41._0);
	}
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$signedSubformulas = function (sf) {
	var _p42 = sf;
	if (_p42.ctor === 'T') {
		switch (_p42._0.ctor) {
			case 'Neg':
				return {
					ctor: '::',
					_0: _FMFI_UK_1_AIN_412$elm_formula$Formula$F(_p42._0._0),
					_1: {ctor: '[]'}
				};
			case 'Conj':
				return {
					ctor: '::',
					_0: _FMFI_UK_1_AIN_412$elm_formula$Formula$T(_p42._0._0),
					_1: {
						ctor: '::',
						_0: _FMFI_UK_1_AIN_412$elm_formula$Formula$T(_p42._0._1),
						_1: {ctor: '[]'}
					}
				};
			case 'Disj':
				return {
					ctor: '::',
					_0: _FMFI_UK_1_AIN_412$elm_formula$Formula$T(_p42._0._0),
					_1: {
						ctor: '::',
						_0: _FMFI_UK_1_AIN_412$elm_formula$Formula$T(_p42._0._1),
						_1: {ctor: '[]'}
					}
				};
			case 'Impl':
				return {
					ctor: '::',
					_0: _FMFI_UK_1_AIN_412$elm_formula$Formula$F(_p42._0._0),
					_1: {
						ctor: '::',
						_0: _FMFI_UK_1_AIN_412$elm_formula$Formula$T(_p42._0._1),
						_1: {ctor: '[]'}
					}
				};
			case 'ForAll':
				return {
					ctor: '::',
					_0: _FMFI_UK_1_AIN_412$elm_formula$Formula$T(_p42._0._1),
					_1: {ctor: '[]'}
				};
			case 'Exists':
				return {
					ctor: '::',
					_0: _FMFI_UK_1_AIN_412$elm_formula$Formula$T(_p42._0._1),
					_1: {ctor: '[]'}
				};
			default:
				return {ctor: '[]'};
		}
	} else {
		return A2(
			_elm_lang$core$List$map,
			_FMFI_UK_1_AIN_412$elm_formula$Formula$negSigned,
			_FMFI_UK_1_AIN_412$elm_formula$Formula$signedSubformulas(
				_FMFI_UK_1_AIN_412$elm_formula$Formula$T(_p42._0)));
	}
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$isSignedSubformulaOf = F2(
	function (a, b) {
		return A2(
			_elm_lang$core$List$member,
			a,
			_FMFI_UK_1_AIN_412$elm_formula$Formula$signedSubformulas(b));
	});
var _FMFI_UK_1_AIN_412$elm_formula$Formula$signedFormula = A2(
	_elm_tools$parser$Parser_ops['|='],
	A2(
		_elm_tools$parser$Parser_ops['|.'],
		_elm_tools$parser$Parser$succeed(_elm_lang$core$Basics$identity),
		_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
	_elm_tools$parser$Parser$oneOf(
		{
			ctor: '::',
			_0: A2(
				_elm_tools$parser$Parser_ops['|='],
				A2(
					_elm_tools$parser$Parser_ops['|.'],
					A2(
						_elm_tools$parser$Parser_ops['|.'],
						_elm_tools$parser$Parser$succeed(_FMFI_UK_1_AIN_412$elm_formula$Formula$T),
						_elm_tools$parser$Parser$keyword('T')),
					_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
				_FMFI_UK_1_AIN_412$elm_formula$Formula$formula),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_tools$parser$Parser_ops['|='],
					A2(
						_elm_tools$parser$Parser_ops['|.'],
						A2(
							_elm_tools$parser$Parser_ops['|.'],
							_elm_tools$parser$Parser$succeed(_FMFI_UK_1_AIN_412$elm_formula$Formula$F),
							_elm_tools$parser$Parser$keyword('F')),
						_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
					_FMFI_UK_1_AIN_412$elm_formula$Formula$formula),
				_1: {ctor: '[]'}
			}
		}));
var _FMFI_UK_1_AIN_412$elm_formula$Formula$parseSigned = _elm_tools$parser$Parser$run(
	A2(
		_elm_tools$parser$Parser_ops['|.'],
		A2(
			_elm_tools$parser$Parser_ops['|.'],
			A2(
				_elm_tools$parser$Parser_ops['|='],
				A2(
					_elm_tools$parser$Parser_ops['|.'],
					_elm_tools$parser$Parser$succeed(_elm_lang$core$Basics$identity),
					_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
				_FMFI_UK_1_AIN_412$elm_formula$Formula$signedFormula),
			_FMFI_UK_1_AIN_412$elm_formula$Formula$spaces),
		_elm_tools$parser$Parser$end));
var _FMFI_UK_1_AIN_412$elm_formula$Formula$sf = function (_p43) {
	return A2(
		_elm_lang$core$Result$withDefault,
		_FMFI_UK_1_AIN_412$elm_formula$Formula$T(_FMFI_UK_1_AIN_412$elm_formula$Formula$FF),
		_FMFI_UK_1_AIN_412$elm_formula$Formula$parseSigned(_p43));
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$Delta = {ctor: 'Delta'};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$Gamma = {ctor: 'Gamma'};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$Beta = {ctor: 'Beta'};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$Alpha = {ctor: 'Alpha'};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$negType = function (t) {
	var _p44 = t;
	switch (_p44.ctor) {
		case 'Alpha':
			return _FMFI_UK_1_AIN_412$elm_formula$Formula$Beta;
		case 'Beta':
			return _FMFI_UK_1_AIN_412$elm_formula$Formula$Alpha;
		case 'Gamma':
			return _FMFI_UK_1_AIN_412$elm_formula$Formula$Delta;
		default:
			return _FMFI_UK_1_AIN_412$elm_formula$Formula$Gamma;
	}
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$signedType = function (sf) {
	var _p45 = sf;
	if (_p45.ctor === 'T') {
		switch (_p45._0.ctor) {
			case 'FF':
				return _FMFI_UK_1_AIN_412$elm_formula$Formula$Alpha;
			case 'FT':
				return _FMFI_UK_1_AIN_412$elm_formula$Formula$Alpha;
			case 'Atom':
				return _FMFI_UK_1_AIN_412$elm_formula$Formula$Alpha;
			case 'Neg':
				return _FMFI_UK_1_AIN_412$elm_formula$Formula$Alpha;
			case 'Conj':
				return _FMFI_UK_1_AIN_412$elm_formula$Formula$Alpha;
			case 'Disj':
				return _FMFI_UK_1_AIN_412$elm_formula$Formula$Beta;
			case 'Impl':
				return _FMFI_UK_1_AIN_412$elm_formula$Formula$Beta;
			case 'ForAll':
				return _FMFI_UK_1_AIN_412$elm_formula$Formula$Gamma;
			default:
				return _FMFI_UK_1_AIN_412$elm_formula$Formula$Delta;
		}
	} else {
		switch (_p45._0.ctor) {
			case 'Atom':
				return _FMFI_UK_1_AIN_412$elm_formula$Formula$Alpha;
			case 'Neg':
				return _FMFI_UK_1_AIN_412$elm_formula$Formula$Alpha;
			default:
				return _FMFI_UK_1_AIN_412$elm_formula$Formula$negType(
					_FMFI_UK_1_AIN_412$elm_formula$Formula$signedType(
						_FMFI_UK_1_AIN_412$elm_formula$Formula$T(_p45._0)));
		}
	}
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$isBeta = function (x) {
	return _elm_lang$core$Native_Utils.eq(
		_FMFI_UK_1_AIN_412$elm_formula$Formula$Beta,
		_FMFI_UK_1_AIN_412$elm_formula$Formula$signedType(x));
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$isGamma = function (x) {
	return _elm_lang$core$Native_Utils.eq(
		_FMFI_UK_1_AIN_412$elm_formula$Formula$Gamma,
		_FMFI_UK_1_AIN_412$elm_formula$Formula$signedType(x));
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$isDelta = function (x) {
	return _elm_lang$core$Native_Utils.eq(
		_FMFI_UK_1_AIN_412$elm_formula$Formula$Delta,
		_FMFI_UK_1_AIN_412$elm_formula$Formula$signedType(x));
};
var _FMFI_UK_1_AIN_412$elm_formula$Formula$isAlpha = function (x) {
	return _elm_lang$core$Native_Utils.eq(
		_FMFI_UK_1_AIN_412$elm_formula$Formula$Alpha,
		_FMFI_UK_1_AIN_412$elm_formula$Formula$signedType(x));
};

var _ZoltanOnody$proof_assistant$Core_Matcher$matcherGrimaldiCases = F3(
	function (from1, from2, toProve) {
		var _p0 = {ctor: '_Tuple3', _0: from1, _1: from2, _2: toProve};
		if (((((_p0.ctor === '_Tuple3') && (_p0._0.ctor === 'Impl')) && (_p0._1.ctor === 'Impl')) && (_p0._2.ctor === 'Impl')) && (_p0._2._0.ctor === 'Disj')) {
			var _p7 = _p0._2._1;
			var _p6 = _p0._1._1;
			var _p5 = _p0._0._1;
			var _p4 = _p0._1._0;
			var _p3 = _p0._0._0;
			var _p2 = _p0._2._0._1;
			var _p1 = _p0._2._0._0;
			return (_elm_lang$core$Native_Utils.eq(_p5, _p6) && (_elm_lang$core$Native_Utils.eq(_p6, _p7) && (_elm_lang$core$Native_Utils.eq(_p3, _p1) && _elm_lang$core$Native_Utils.eq(_p4, _p2)))) || (_elm_lang$core$Native_Utils.eq(_p5, _p6) && (_elm_lang$core$Native_Utils.eq(_p6, _p7) && (_elm_lang$core$Native_Utils.eq(_p3, _p2) && _elm_lang$core$Native_Utils.eq(_p4, _p1))));
		} else {
			return false;
		}
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherGrimaldiContradiction = F3(
	function (from1, from2, toProve) {
		var _p8 = {ctor: '_Tuple2', _0: from1, _1: from2};
		if ((((((_p8.ctor === '_Tuple2') && (_p8._0.ctor === 'Impl')) && (_p8._0._0.ctor === 'Neg')) && (_p8._1.ctor === 'Impl')) && (_p8._1._0.ctor === 'Neg')) && (_p8._1._1.ctor === 'Neg')) {
			var _p9 = _p8._1._0._0;
			return _elm_lang$core$Native_Utils.eq(_p8._0._0._0, _p9) && (_elm_lang$core$Native_Utils.eq(_p9, toProve) && _elm_lang$core$Native_Utils.eq(_p8._0._1, _p8._1._1._0));
		} else {
			return false;
		}
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherDestructiveDilemma = F3(
	function (from1, from2, toProve) {
		var _p10 = {ctor: '_Tuple3', _0: from1, _1: from2, _2: toProve};
		if ((((((((((_p10.ctor === '_Tuple3') && (_p10._0.ctor === 'Conj')) && (_p10._0._0.ctor === 'Impl')) && (_p10._0._1.ctor === 'Impl')) && (_p10._1.ctor === 'Disj')) && (_p10._1._0.ctor === 'Neg')) && (_p10._1._1.ctor === 'Neg')) && (_p10._2.ctor === 'Disj')) && (_p10._2._0.ctor === 'Neg')) && (_p10._2._1.ctor === 'Neg')) {
			var _p18 = _p10._0._1._1;
			var _p17 = _p10._0._1._0;
			var _p16 = _p10._0._0._1;
			var _p15 = _p10._0._0._0;
			var _p14 = _p10._1._1._0;
			var _p13 = _p10._1._0._0;
			var _p12 = _p10._2._1._0;
			var _p11 = _p10._2._0._0;
			return (_elm_lang$core$Native_Utils.eq(_p16, _p13) && (_elm_lang$core$Native_Utils.eq(_p18, _p14) && (_elm_lang$core$Native_Utils.eq(_p15, _p11) && _elm_lang$core$Native_Utils.eq(_p17, _p12)))) || ((_elm_lang$core$Native_Utils.eq(_p16, _p13) && (_elm_lang$core$Native_Utils.eq(_p18, _p14) && (_elm_lang$core$Native_Utils.eq(_p15, _p12) && _elm_lang$core$Native_Utils.eq(_p17, _p11)))) || ((_elm_lang$core$Native_Utils.eq(_p16, _p14) && (_elm_lang$core$Native_Utils.eq(_p18, _p13) && (_elm_lang$core$Native_Utils.eq(_p15, _p11) && _elm_lang$core$Native_Utils.eq(_p17, _p12)))) || (_elm_lang$core$Native_Utils.eq(_p16, _p14) && (_elm_lang$core$Native_Utils.eq(_p18, _p13) && (_elm_lang$core$Native_Utils.eq(_p15, _p12) && _elm_lang$core$Native_Utils.eq(_p17, _p11))))));
		} else {
			return false;
		}
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherConstructiveDilemma = F3(
	function (from1, from2, toProve) {
		var _p19 = {ctor: '_Tuple3', _0: from1, _1: from2, _2: toProve};
		if ((((((_p19.ctor === '_Tuple3') && (_p19._0.ctor === 'Conj')) && (_p19._0._0.ctor === 'Impl')) && (_p19._0._1.ctor === 'Impl')) && (_p19._1.ctor === 'Disj')) && (_p19._2.ctor === 'Disj')) {
			var _p27 = _p19._0._1._1;
			var _p26 = _p19._0._1._0;
			var _p25 = _p19._0._0._1;
			var _p24 = _p19._0._0._0;
			var _p23 = _p19._1._1;
			var _p22 = _p19._1._0;
			var _p21 = _p19._2._1;
			var _p20 = _p19._2._0;
			return (_elm_lang$core$Native_Utils.eq(_p24, _p22) && (_elm_lang$core$Native_Utils.eq(_p26, _p23) && (_elm_lang$core$Native_Utils.eq(_p25, _p20) && _elm_lang$core$Native_Utils.eq(_p27, _p21)))) || ((_elm_lang$core$Native_Utils.eq(_p24, _p22) && (_elm_lang$core$Native_Utils.eq(_p26, _p23) && (_elm_lang$core$Native_Utils.eq(_p25, _p21) && _elm_lang$core$Native_Utils.eq(_p27, _p20)))) || ((_elm_lang$core$Native_Utils.eq(_p24, _p23) && (_elm_lang$core$Native_Utils.eq(_p26, _p22) && (_elm_lang$core$Native_Utils.eq(_p25, _p20) && _elm_lang$core$Native_Utils.eq(_p27, _p21)))) || (_elm_lang$core$Native_Utils.eq(_p24, _p22) && (_elm_lang$core$Native_Utils.eq(_p26, _p23) && (_elm_lang$core$Native_Utils.eq(_p25, _p21) && _elm_lang$core$Native_Utils.eq(_p27, _p20))))));
		} else {
			return false;
		}
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherDisjunctiveSyllogism = F3(
	function (from1, from2, toProve) {
		var _p28 = {ctor: '_Tuple3', _0: from1, _1: from2, _2: toProve};
		if (((_p28.ctor === '_Tuple3') && (_p28._0.ctor === 'Disj')) && (_p28._1.ctor === 'Neg')) {
			var _p32 = _p28._1._0;
			var _p31 = _p28._0._1;
			var _p30 = _p28._0._0;
			var _p29 = _p28._2;
			return (_elm_lang$core$Native_Utils.eq(_p30, _p32) && _elm_lang$core$Native_Utils.eq(_p31, _p29)) || (_elm_lang$core$Native_Utils.eq(_p31, _p32) && _elm_lang$core$Native_Utils.eq(_p30, _p29));
		} else {
			return false;
		}
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherHypotheticalSyllogism = F3(
	function (from1, from2, toProve) {
		var _p33 = {ctor: '_Tuple3', _0: from1, _1: from2, _2: toProve};
		if ((((_p33.ctor === '_Tuple3') && (_p33._0.ctor === 'Impl')) && (_p33._1.ctor === 'Impl')) && (_p33._2.ctor === 'Impl')) {
			return _elm_lang$core$Native_Utils.eq(_p33._0._0, _p33._2._0) && (_elm_lang$core$Native_Utils.eq(_p33._0._1, _p33._1._0) && _elm_lang$core$Native_Utils.eq(_p33._1._1, _p33._2._1));
		} else {
			return false;
		}
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherModusPonens = F3(
	function (from1, from2, toProve) {
		var _p34 = from1;
		if (_p34.ctor === 'Impl') {
			return _elm_lang$core$Native_Utils.eq(_p34._0, from2) && _elm_lang$core$Native_Utils.eq(_p34._1, toProve);
		} else {
			return false;
		}
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherModusTolens = F3(
	function (from1, from2, toProve) {
		var _p35 = {ctor: '_Tuple3', _0: from1, _1: from2, _2: toProve};
		if ((((_p35.ctor === '_Tuple3') && (_p35._0.ctor === 'Impl')) && (_p35._1.ctor === 'Neg')) && (_p35._2.ctor === 'Neg')) {
			return _elm_lang$core$Native_Utils.eq(_p35._0._1, _p35._1._0) && _elm_lang$core$Native_Utils.eq(_p35._0._0, _p35._2._0);
		} else {
			return false;
		}
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherConjunction = F3(
	function (from1, from2, toProve) {
		var _p36 = toProve;
		if (_p36.ctor === 'Conj') {
			return _elm_lang$core$Native_Utils.eq(from1, _p36._0) && _elm_lang$core$Native_Utils.eq(from2, _p36._1);
		} else {
			return false;
		}
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$getTerms = function (formula) {
	getTerms:
	while (true) {
		var _p37 = formula;
		switch (_p37.ctor) {
			case 'Atom':
				return _p37._1;
			case 'Neg':
				var _v10 = _p37._0;
				formula = _v10;
				continue getTerms;
			case 'Disj':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					_ZoltanOnody$proof_assistant$Core_Matcher$getTerms(_p37._0),
					_ZoltanOnody$proof_assistant$Core_Matcher$getTerms(_p37._1));
			case 'Conj':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					_ZoltanOnody$proof_assistant$Core_Matcher$getTerms(_p37._0),
					_ZoltanOnody$proof_assistant$Core_Matcher$getTerms(_p37._1));
			case 'Impl':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					_ZoltanOnody$proof_assistant$Core_Matcher$getTerms(_p37._0),
					_ZoltanOnody$proof_assistant$Core_Matcher$getTerms(_p37._1));
			case 'ForAll':
				var _v11 = _p37._1;
				formula = _v11;
				continue getTerms;
			case 'Exists':
				var _v12 = _p37._1;
				formula = _v12;
				continue getTerms;
			case 'FF':
				return {ctor: '[]'};
			default:
				return {ctor: '[]'};
		}
	}
};
var _ZoltanOnody$proof_assistant$Core_Matcher$firstOrderMatcherHelper = F3(
	function ($var, rest, toProve) {
		var equal = function (other) {
			var _p38 = other;
			if (_p38.ctor === 'Err') {
				return false;
			} else {
				return _elm_lang$core$Native_Utils.eq(_p38._0, toProve);
			}
		};
		var substitutions = A2(
			_elm_lang$core$List$map,
			function (elem) {
				return _elm_lang$core$Dict$fromList(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: $var, _1: elem},
						_1: {ctor: '[]'}
					});
			},
			_ZoltanOnody$proof_assistant$Core_Matcher$getTerms(toProve));
		var afterSubstitution = A2(
			_elm_lang$core$List$map,
			function (elem) {
				return A2(_FMFI_UK_1_AIN_412$elm_formula$Formula$substitute, elem, rest);
			},
			substitutions);
		return A2(_elm_lang$core$List$any, equal, afterSubstitution);
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherRemoveUniversalQuantifier = F2(
	function (from, toProve) {
		var _p39 = from;
		if (_p39.ctor === 'ForAll') {
			return A3(_ZoltanOnody$proof_assistant$Core_Matcher$firstOrderMatcherHelper, _p39._0, _p39._1, toProve);
		} else {
			return false;
		}
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherAddExistentialQuantifier = F2(
	function (from, toProve) {
		var _p40 = toProve;
		if (_p40.ctor === 'Exists') {
			return A3(_ZoltanOnody$proof_assistant$Core_Matcher$firstOrderMatcherHelper, _p40._0, _p40._1, from);
		} else {
			return false;
		}
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherRemoveExistentialQuantifier = F3(
	function (from, toProve, freeVariables) {
		var _p41 = from;
		if (_p41.ctor === 'Exists') {
			var equal = function (other) {
				var _p42 = other;
				if (_p42.ctor === 'Err') {
					return false;
				} else {
					return _elm_lang$core$Native_Utils.eq(_p42._0, toProve);
				}
			};
			var substitutions = A2(
				_elm_lang$core$List$map,
				function (term) {
					var _p43 = term;
					if (_p43.ctor === 'Var') {
						return (!A2(_elm_lang$core$List$member, _p43._0, freeVariables)) ? _elm_lang$core$Maybe$Just(
							_elm_lang$core$Dict$fromList(
								{
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: _p41._0, _1: term},
									_1: {ctor: '[]'}
								})) : _elm_lang$core$Maybe$Nothing;
					} else {
						return _elm_lang$core$Maybe$Nothing;
					}
				},
				_ZoltanOnody$proof_assistant$Core_Matcher$getTerms(toProve));
			var afterSubstitution = A2(
				_elm_lang$core$List$map,
				function (elem) {
					var _p44 = elem;
					if (_p44.ctor === 'Just') {
						return A2(_FMFI_UK_1_AIN_412$elm_formula$Formula$substitute, _p44._0, _p41._1);
					} else {
						return _elm_lang$core$Result$Err('');
					}
				},
				substitutions);
			return A2(_elm_lang$core$List$any, equal, afterSubstitution);
		} else {
			return false;
		}
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherSimplification = F2(
	function (from, toProve) {
		var _p45 = from;
		if (_p45.ctor === 'Conj') {
			return _elm_lang$core$Native_Utils.eq(toProve, _p45._0) || _elm_lang$core$Native_Utils.eq(toProve, _p45._1);
		} else {
			return false;
		}
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherDeMorganFirstOrder = F2(
	function (from, toProve) {
		var _p46 = {ctor: '_Tuple2', _0: from, _1: toProve};
		_v21_4:
		do {
			if (_p46.ctor === '_Tuple2') {
				switch (_p46._0.ctor) {
					case 'Neg':
						switch (_p46._0._0.ctor) {
							case 'ForAll':
								if ((_p46._1.ctor === 'Exists') && (_p46._1._1.ctor === 'Neg')) {
									return _elm_lang$core$Native_Utils.eq(_p46._0._0._1, _p46._1._1._0) && _elm_lang$core$Native_Utils.eq(_p46._0._0._0, _p46._1._0);
								} else {
									break _v21_4;
								}
							case 'Exists':
								if ((_p46._1.ctor === 'ForAll') && (_p46._1._1.ctor === 'Neg')) {
									return _elm_lang$core$Native_Utils.eq(_p46._0._0._1, _p46._1._1._0) && _elm_lang$core$Native_Utils.eq(_p46._0._0._0, _p46._1._0);
								} else {
									break _v21_4;
								}
							default:
								break _v21_4;
						}
					case 'Exists':
						if (((_p46._0._1.ctor === 'Neg') && (_p46._1.ctor === 'Neg')) && (_p46._1._0.ctor === 'ForAll')) {
							return _elm_lang$core$Native_Utils.eq(_p46._1._0._1, _p46._0._1._0) && _elm_lang$core$Native_Utils.eq(_p46._1._0._0, _p46._0._0);
						} else {
							break _v21_4;
						}
					case 'ForAll':
						if (((_p46._0._1.ctor === 'Neg') && (_p46._1.ctor === 'Neg')) && (_p46._1._0.ctor === 'Exists')) {
							return _elm_lang$core$Native_Utils.eq(_p46._1._0._1, _p46._0._1._0) && _elm_lang$core$Native_Utils.eq(_p46._1._0._0, _p46._0._0);
						} else {
							break _v21_4;
						}
					default:
						break _v21_4;
				}
			} else {
				break _v21_4;
			}
		} while(false);
		return false;
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherAddition = F2(
	function (from, toProve) {
		var _p47 = toProve;
		if (_p47.ctor === 'Disj') {
			return _elm_lang$core$Native_Utils.eq(from, _p47._0) || _elm_lang$core$Native_Utils.eq(from, _p47._1);
		} else {
			return false;
		}
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherImplicationIntroduction3 = F2(
	function (from, toProve) {
		var _p48 = {ctor: '_Tuple2', _0: from, _1: toProve};
		if (((_p48.ctor === '_Tuple2') && (_p48._0.ctor === 'Neg')) && (_p48._1.ctor === 'Impl')) {
			return _elm_lang$core$Native_Utils.eq(_p48._0._0, _p48._1._0);
		} else {
			return false;
		}
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherImplicationIntroduction2 = F2(
	function (from, toProve) {
		var _p49 = toProve;
		if (_p49.ctor === 'Impl') {
			return _elm_lang$core$Native_Utils.eq(from, _p49._1);
		} else {
			return false;
		}
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherIdentity = F2(
	function (from, toProve) {
		return _elm_lang$core$Native_Utils.eq(from, toProve);
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherAxiomQ6 = function (toProve) {
	var _p50 = toProve;
	if ((((((_p50.ctor === 'Impl') && (_p50._0.ctor === 'ForAll')) && (_p50._0._1.ctor === 'Impl')) && (_p50._1.ctor === 'Impl')) && (_p50._1._0.ctor === 'ForAll')) && (_p50._1._1.ctor === 'ForAll')) {
		var _p51 = _p50._1._0._0;
		return _elm_lang$core$Native_Utils.eq(_p50._0._1._0, _p50._1._0._1) && (_elm_lang$core$Native_Utils.eq(_p50._0._1._1, _p50._1._1._1) && (_elm_lang$core$Native_Utils.eq(_p50._0._0, _p51) && _elm_lang$core$Native_Utils.eq(_p51, _p50._1._1._0)));
	} else {
		return false;
	}
};
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherAxiomA7 = function (toProve) {
	var _p52 = toProve;
	if ((((((_p52.ctor === 'Impl') && (_p52._0.ctor === 'Impl')) && (_p52._1.ctor === 'Impl')) && (_p52._1._0.ctor === 'Impl')) && (_p52._1._1.ctor === 'Impl')) && (_p52._1._1._0.ctor === 'Disj')) {
		var _p53 = _p52._1._0._1;
		return _elm_lang$core$Native_Utils.eq(_p52._0._0, _p52._1._1._0._0) || (_elm_lang$core$Native_Utils.eq(_p52._1._0._0, _p52._1._1._0._1) || (_elm_lang$core$Native_Utils.eq(_p52._0._1, _p53) || _elm_lang$core$Native_Utils.eq(_p53, _p52._1._1._1)));
	} else {
		return false;
	}
};
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherAxiomA6 = function (toProve) {
	var _p54 = toProve;
	if ((_p54.ctor === 'Impl') && (_p54._1.ctor === 'Disj')) {
		var _p55 = _p54._0;
		return _elm_lang$core$Native_Utils.eq(_p55, _p54._1._0) || _elm_lang$core$Native_Utils.eq(_p55, _p54._1._1);
	} else {
		return false;
	}
};
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherAxiomA5 = function (toProve) {
	var _p56 = toProve;
	if (((_p56.ctor === 'Impl') && (_p56._1.ctor === 'Impl')) && (_p56._1._1.ctor === 'Conj')) {
		return _elm_lang$core$Native_Utils.eq(_p56._0, _p56._1._1._0) && _elm_lang$core$Native_Utils.eq(_p56._1._0, _p56._1._1._1);
	} else {
		return false;
	}
};
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherAxiomA4 = function (toProve) {
	var _p57 = toProve;
	if ((_p57.ctor === 'Impl') && (_p57._0.ctor === 'Conj')) {
		var _p58 = _p57._1;
		return _elm_lang$core$Native_Utils.eq(_p57._0._0, _p58) || _elm_lang$core$Native_Utils.eq(_p57._0._1, _p58);
	} else {
		return false;
	}
};
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherAxiomA3 = function (toProve) {
	var _p59 = toProve;
	if (((((((_p59.ctor === 'Impl') && (_p59._0.ctor === 'Impl')) && (_p59._0._0.ctor === 'Neg')) && (_p59._0._1.ctor === 'Neg')) && (_p59._1.ctor === 'Impl')) && (_p59._1._0.ctor === 'Impl')) && (_p59._1._0._0.ctor === 'Neg')) {
		var _p60 = _p59._1._0._0._0;
		return _elm_lang$core$Native_Utils.eq(_p59._0._0._0, _p60) && (_elm_lang$core$Native_Utils.eq(_p60, _p59._1._1) && _elm_lang$core$Native_Utils.eq(_p59._0._1._0, _p59._1._0._1));
	} else {
		return false;
	}
};
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherAxiomA2 = function (toProve) {
	var _p61 = toProve;
	if ((((((_p61.ctor === 'Impl') && (_p61._0.ctor === 'Impl')) && (_p61._0._1.ctor === 'Impl')) && (_p61._1.ctor === 'Impl')) && (_p61._1._0.ctor === 'Impl')) && (_p61._1._1.ctor === 'Impl')) {
		var _p62 = _p61._1._0._0;
		return _elm_lang$core$Native_Utils.eq(_p61._0._0, _p62) && (_elm_lang$core$Native_Utils.eq(_p62, _p61._1._1._0) && (_elm_lang$core$Native_Utils.eq(_p61._0._1._1, _p61._1._1._1) && _elm_lang$core$Native_Utils.eq(_p61._0._1._0, _p61._1._0._1)));
	} else {
		return false;
	}
};
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherAxiomA1 = function (toProve) {
	var _p63 = toProve;
	if ((_p63.ctor === 'Impl') && (_p63._1.ctor === 'Impl')) {
		return _elm_lang$core$Native_Utils.eq(_p63._0, _p63._1._1);
	} else {
		return false;
	}
};
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherOnlyTwoOptions = function (toProve) {
	var _p64 = toProve;
	_v33_2:
	do {
		if (_p64.ctor === 'Disj') {
			if (_p64._1.ctor === 'Neg') {
				return _elm_lang$core$Native_Utils.eq(_p64._0, _p64._1._0);
			} else {
				if (_p64._0.ctor === 'Neg') {
					return _elm_lang$core$Native_Utils.eq(_p64._0._0, _p64._1);
				} else {
					break _v33_2;
				}
			}
		} else {
			break _v33_2;
		}
	} while(false);
	return false;
};
var _ZoltanOnody$proof_assistant$Core_Matcher$Error = {ctor: 'Error'};
var _ZoltanOnody$proof_assistant$Core_Matcher$Identity = {ctor: 'Identity'};
var _ZoltanOnody$proof_assistant$Core_Matcher$Matched = {ctor: 'Matched'};
var _ZoltanOnody$proof_assistant$Core_Matcher$match = F4(
	function (alreadyMatched, $function, from, toProve) {
		var _p65 = A2($function, from, toProve);
		if (_p65.ctor === 'Nothing') {
			var match2 = F2(
				function (a, b) {
					return A4(_ZoltanOnody$proof_assistant$Core_Matcher$match, alreadyMatched, $function, a, b);
				});
			var match4 = F4(
				function (a, b, c, d) {
					var _p66 = {
						ctor: '_Tuple2',
						_0: A4(_ZoltanOnody$proof_assistant$Core_Matcher$match, alreadyMatched, $function, a, c),
						_1: A4(_ZoltanOnody$proof_assistant$Core_Matcher$match, alreadyMatched, $function, b, d)
					};
					_v35_4:
					do {
						if (_p66.ctor === '_Tuple2') {
							switch (_p66._0.ctor) {
								case 'Matched':
									switch (_p66._1.ctor) {
										case 'Matched':
											return _ZoltanOnody$proof_assistant$Core_Matcher$Matched;
										case 'Identity':
											return _ZoltanOnody$proof_assistant$Core_Matcher$Matched;
										default:
											break _v35_4;
									}
								case 'Identity':
									switch (_p66._1.ctor) {
										case 'Matched':
											return _ZoltanOnody$proof_assistant$Core_Matcher$Matched;
										case 'Identity':
											return _ZoltanOnody$proof_assistant$Core_Matcher$Identity;
										default:
											break _v35_4;
									}
								default:
									break _v35_4;
							}
						} else {
							break _v35_4;
						}
					} while(false);
					return _ZoltanOnody$proof_assistant$Core_Matcher$Error;
				});
			var _p67 = {ctor: '_Tuple2', _0: from, _1: toProve};
			_v36_7:
			do {
				if (_p67.ctor === '_Tuple2') {
					switch (_p67._0.ctor) {
						case 'Disj':
							if (_p67._1.ctor === 'Disj') {
								return A4(match4, _p67._0._0, _p67._0._1, _p67._1._0, _p67._1._1);
							} else {
								break _v36_7;
							}
						case 'Conj':
							if (_p67._1.ctor === 'Conj') {
								return A4(match4, _p67._0._0, _p67._0._1, _p67._1._0, _p67._1._1);
							} else {
								break _v36_7;
							}
						case 'Impl':
							if (_p67._1.ctor === 'Impl') {
								return A4(match4, _p67._0._0, _p67._0._1, _p67._1._0, _p67._1._1);
							} else {
								break _v36_7;
							}
						case 'Neg':
							if (_p67._1.ctor === 'Neg') {
								return A2(match2, _p67._0._0, _p67._1._0);
							} else {
								break _v36_7;
							}
						case 'ForAll':
							if (_p67._1.ctor === 'ForAll') {
								return _elm_lang$core$Native_Utils.eq(_p67._0._0, _p67._1._0) ? A2(match2, _p67._0._1, _p67._1._1) : _ZoltanOnody$proof_assistant$Core_Matcher$Error;
							} else {
								break _v36_7;
							}
						case 'Exists':
							if (_p67._1.ctor === 'Exists') {
								return _elm_lang$core$Native_Utils.eq(_p67._0._0, _p67._1._0) ? A2(match2, _p67._0._1, _p67._1._1) : _ZoltanOnody$proof_assistant$Core_Matcher$Error;
							} else {
								break _v36_7;
							}
						case 'Atom':
							if (_p67._1.ctor === 'Atom') {
								return (_elm_lang$core$Native_Utils.eq(_p67._0._0, _p67._1._0) && _elm_lang$core$Native_Utils.eq(_p67._0._1, _p67._1._1)) ? (alreadyMatched ? _ZoltanOnody$proof_assistant$Core_Matcher$Matched : _ZoltanOnody$proof_assistant$Core_Matcher$Identity) : _ZoltanOnody$proof_assistant$Core_Matcher$Error;
							} else {
								break _v36_7;
							}
						default:
							break _v36_7;
					}
				} else {
					break _v36_7;
				}
			} while(false);
			return _ZoltanOnody$proof_assistant$Core_Matcher$Error;
		} else {
			var checked = A2(
				_elm_lang$core$List$map,
				function (_p68) {
					var _p69 = _p68;
					return A4(_ZoltanOnody$proof_assistant$Core_Matcher$match, true, $function, _p69._0, _p69._1);
				},
				_p65._0);
			return A2(_elm_lang$core$List$member, _ZoltanOnody$proof_assistant$Core_Matcher$Error, checked) ? _ZoltanOnody$proof_assistant$Core_Matcher$Error : _ZoltanOnody$proof_assistant$Core_Matcher$Matched;
		}
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherWrapper = F3(
	function ($function, from, toProve) {
		var _p70 = A4(_ZoltanOnody$proof_assistant$Core_Matcher$match, false, $function, from, toProve);
		if (_p70.ctor === 'Matched') {
			return true;
		} else {
			return false;
		}
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherDoubleNegationRemoval = F2(
	function (a, b) {
		var $function = F2(
			function (from, toProve) {
				var _p71 = from;
				if ((_p71.ctor === 'Neg') && (_p71._0.ctor === 'Neg')) {
					return _elm_lang$core$Maybe$Just(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: _p71._0._0, _1: toProve},
							_1: {ctor: '[]'}
						});
				} else {
					return _elm_lang$core$Maybe$Nothing;
				}
			});
		return A3(_ZoltanOnody$proof_assistant$Core_Matcher$matcherWrapper, $function, a, b);
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherDoubleNegationIntroduction = F2(
	function (a, b) {
		return A2(_ZoltanOnody$proof_assistant$Core_Matcher$matcherDoubleNegationRemoval, b, a);
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherImplicationRemoval = F2(
	function (a, b) {
		var $function = F2(
			function (from, toProve) {
				var _p72 = {ctor: '_Tuple2', _0: from, _1: toProve};
				if ((((_p72.ctor === '_Tuple2') && (_p72._0.ctor === 'Impl')) && (_p72._1.ctor === 'Disj')) && (_p72._1._0.ctor === 'Neg')) {
					return _elm_lang$core$Maybe$Just(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: _p72._0._0, _1: _p72._1._0._0},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: _p72._0._1, _1: _p72._1._1},
								_1: {ctor: '[]'}
							}
						});
				} else {
					return _elm_lang$core$Maybe$Nothing;
				}
			});
		return A3(_ZoltanOnody$proof_assistant$Core_Matcher$matcherWrapper, $function, a, b);
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherImplicationIntroduction = F2(
	function (from, toProve) {
		return A2(_ZoltanOnody$proof_assistant$Core_Matcher$matcherImplicationRemoval, toProve, from);
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherAssociativity = F2(
	function (from, toProve) {
		var $function = F2(
			function (from, toProve) {
				var _p73 = {ctor: '_Tuple2', _0: from, _1: toProve};
				_v41_4:
				do {
					if (_p73.ctor === '_Tuple2') {
						switch (_p73._0.ctor) {
							case 'Disj':
								if (_p73._1.ctor === 'Disj') {
									if ((_p73._0._1.ctor === 'Disj') && (_p73._1._0.ctor === 'Disj')) {
										return _elm_lang$core$Maybe$Just(
											{
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: _p73._0._0, _1: _p73._1._0._0},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: _p73._0._1._0, _1: _p73._1._0._1},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: _p73._0._1._1, _1: _p73._1._1},
														_1: {ctor: '[]'}
													}
												}
											});
									} else {
										if ((_p73._0._0.ctor === 'Disj') && (_p73._1._1.ctor === 'Disj')) {
											return _elm_lang$core$Maybe$Just(
												{
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: _p73._1._0, _1: _p73._0._0._0},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: _p73._1._1._0, _1: _p73._0._0._1},
														_1: {
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: _p73._1._1._1, _1: _p73._0._1},
															_1: {ctor: '[]'}
														}
													}
												});
										} else {
											break _v41_4;
										}
									}
								} else {
									break _v41_4;
								}
							case 'Conj':
								if (_p73._1.ctor === 'Conj') {
									if ((_p73._0._1.ctor === 'Conj') && (_p73._1._0.ctor === 'Conj')) {
										return _elm_lang$core$Maybe$Just(
											{
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: _p73._0._0, _1: _p73._1._0._0},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: _p73._0._1._0, _1: _p73._1._0._1},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: _p73._0._1._1, _1: _p73._1._1},
														_1: {ctor: '[]'}
													}
												}
											});
									} else {
										if ((_p73._0._0.ctor === 'Conj') && (_p73._1._1.ctor === 'Conj')) {
											return _elm_lang$core$Maybe$Just(
												{
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: _p73._1._0, _1: _p73._0._0._0},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: _p73._1._1._0, _1: _p73._0._0._1},
														_1: {
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: _p73._1._1._1, _1: _p73._0._1},
															_1: {ctor: '[]'}
														}
													}
												});
										} else {
											break _v41_4;
										}
									}
								} else {
									break _v41_4;
								}
							default:
								break _v41_4;
						}
					} else {
						break _v41_4;
					}
				} while(false);
				return _elm_lang$core$Maybe$Nothing;
			});
		return A3(_ZoltanOnody$proof_assistant$Core_Matcher$matcherWrapper, $function, from, toProve);
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherDistributive = F2(
	function (from, toProve) {
		var $function = F2(
			function (from, toProve) {
				var _p74 = {ctor: '_Tuple2', _0: from, _1: toProve};
				_v42_8:
				do {
					if (_p74.ctor === '_Tuple2') {
						switch (_p74._0.ctor) {
							case 'Conj':
								if (_p74._1.ctor === 'Disj') {
									if (_p74._0._0.ctor === 'Disj') {
										if (_p74._0._1.ctor === 'Disj') {
											if (_p74._1._1.ctor === 'Conj') {
												var _p77 = _p74._0._0._0;
												return _elm_lang$core$Maybe$Just(
													{
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: _p74._1._0, _1: _p77},
														_1: {
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: _p77, _1: _p74._0._1._0},
															_1: {
																ctor: '::',
																_0: {ctor: '_Tuple2', _0: _p74._1._1._0, _1: _p74._0._0._1},
																_1: {
																	ctor: '::',
																	_0: {ctor: '_Tuple2', _0: _p74._1._1._1, _1: _p74._0._1._1},
																	_1: {ctor: '[]'}
																}
															}
														}
													});
											} else {
												if (_p74._1._0.ctor === 'Conj') {
													var _p78 = _p74._0._0._1;
													return _elm_lang$core$Maybe$Just(
														{
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: _p74._1._0._0, _1: _p74._0._0._0},
															_1: {
																ctor: '::',
																_0: {ctor: '_Tuple2', _0: _p74._1._0._1, _1: _p74._0._1._0},
																_1: {
																	ctor: '::',
																	_0: {ctor: '_Tuple2', _0: _p74._1._1, _1: _p78},
																	_1: {
																		ctor: '::',
																		_0: {ctor: '_Tuple2', _0: _p78, _1: _p74._0._1._1},
																		_1: {ctor: '[]'}
																	}
																}
															}
														});
												} else {
													break _v42_8;
												}
											}
										} else {
											if ((_p74._1._0.ctor === 'Conj') && (_p74._1._1.ctor === 'Conj')) {
												var _p80 = _p74._1._0._1;
												return _elm_lang$core$Maybe$Just(
													{
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: _p74._0._0._0, _1: _p74._1._0._0},
														_1: {
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: _p74._0._0._1, _1: _p74._1._1._0},
															_1: {
																ctor: '::',
																_0: {ctor: '_Tuple2', _0: _p74._0._1, _1: _p80},
																_1: {
																	ctor: '::',
																	_0: {ctor: '_Tuple2', _0: _p80, _1: _p74._1._1._1},
																	_1: {ctor: '[]'}
																}
															}
														}
													});
											} else {
												break _v42_8;
											}
										}
									} else {
										if (((_p74._0._1.ctor === 'Disj') && (_p74._1._0.ctor === 'Conj')) && (_p74._1._1.ctor === 'Conj')) {
											var _p79 = _p74._1._0._0;
											return _elm_lang$core$Maybe$Just(
												{
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: _p74._0._0, _1: _p79},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: _p79, _1: _p74._1._1._0},
														_1: {
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: _p74._0._1._0, _1: _p74._1._0._1},
															_1: {
																ctor: '::',
																_0: {ctor: '_Tuple2', _0: _p74._0._1._1, _1: _p74._1._1._1},
																_1: {ctor: '[]'}
															}
														}
													}
												});
										} else {
											break _v42_8;
										}
									}
								} else {
									break _v42_8;
								}
							case 'Disj':
								if (_p74._1.ctor === 'Conj') {
									if (_p74._0._1.ctor === 'Conj') {
										if (_p74._1._0.ctor === 'Disj') {
											if (_p74._1._1.ctor === 'Disj') {
												var _p75 = _p74._1._0._0;
												return _elm_lang$core$Maybe$Just(
													{
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: _p74._0._0, _1: _p75},
														_1: {
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: _p75, _1: _p74._1._1._0},
															_1: {
																ctor: '::',
																_0: {ctor: '_Tuple2', _0: _p74._0._1._0, _1: _p74._1._0._1},
																_1: {
																	ctor: '::',
																	_0: {ctor: '_Tuple2', _0: _p74._0._1._1, _1: _p74._1._1._1},
																	_1: {ctor: '[]'}
																}
															}
														}
													});
											} else {
												if (_p74._0._0.ctor === 'Conj') {
													var _p82 = _p74._0._0._1;
													return _elm_lang$core$Maybe$Just(
														{
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: _p74._1._0._0, _1: _p74._0._0._0},
															_1: {
																ctor: '::',
																_0: {ctor: '_Tuple2', _0: _p74._1._0._1, _1: _p74._0._1._0},
																_1: {
																	ctor: '::',
																	_0: {ctor: '_Tuple2', _0: _p74._1._1, _1: _p82},
																	_1: {
																		ctor: '::',
																		_0: {ctor: '_Tuple2', _0: _p82, _1: _p74._0._1._1},
																		_1: {ctor: '[]'}
																	}
																}
															}
														});
												} else {
													break _v42_8;
												}
											}
										} else {
											if ((_p74._0._0.ctor === 'Conj') && (_p74._1._1.ctor === 'Disj')) {
												var _p81 = _p74._0._0._0;
												return _elm_lang$core$Maybe$Just(
													{
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: _p74._1._0, _1: _p81},
														_1: {
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: _p81, _1: _p74._0._1._0},
															_1: {
																ctor: '::',
																_0: {ctor: '_Tuple2', _0: _p74._1._1._0, _1: _p74._0._0._1},
																_1: {
																	ctor: '::',
																	_0: {ctor: '_Tuple2', _0: _p74._1._1._1, _1: _p74._0._1._1},
																	_1: {ctor: '[]'}
																}
															}
														}
													});
											} else {
												break _v42_8;
											}
										}
									} else {
										if (((_p74._0._0.ctor === 'Conj') && (_p74._1._0.ctor === 'Disj')) && (_p74._1._1.ctor === 'Disj')) {
											var _p76 = _p74._1._0._1;
											return _elm_lang$core$Maybe$Just(
												{
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: _p74._0._0._0, _1: _p74._1._0._0},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: _p74._0._0._1, _1: _p74._1._1._0},
														_1: {
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: _p74._0._1, _1: _p76},
															_1: {
																ctor: '::',
																_0: {ctor: '_Tuple2', _0: _p76, _1: _p74._1._1._1},
																_1: {ctor: '[]'}
															}
														}
													}
												});
										} else {
											break _v42_8;
										}
									}
								} else {
									break _v42_8;
								}
							default:
								break _v42_8;
						}
					} else {
						break _v42_8;
					}
				} while(false);
				return _elm_lang$core$Maybe$Nothing;
			});
		return A3(_ZoltanOnody$proof_assistant$Core_Matcher$matcherWrapper, $function, from, toProve);
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherIdempotency = F2(
	function (a, b) {
		var $function = F2(
			function (from, toProve) {
				var _p83 = from;
				if (_p83.ctor === 'Disj') {
					var _p84 = _p83._1;
					return _elm_lang$core$Maybe$Just(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: _p83._0, _1: _p84},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: _p84, _1: toProve},
								_1: {ctor: '[]'}
							}
						});
				} else {
					return _elm_lang$core$Maybe$Nothing;
				}
			});
		return A3(_ZoltanOnody$proof_assistant$Core_Matcher$matcherWrapper, $function, a, b);
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherComutative = F2(
	function (a, b) {
		var $function = F2(
			function (from, toProve) {
				var _p85 = {ctor: '_Tuple2', _0: from, _1: toProve};
				_v44_2:
				do {
					if (_p85.ctor === '_Tuple2') {
						switch (_p85._0.ctor) {
							case 'Conj':
								if (_p85._1.ctor === 'Conj') {
									return _elm_lang$core$Maybe$Just(
										{
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: _p85._0._0, _1: _p85._1._1},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: _p85._0._1, _1: _p85._1._0},
												_1: {ctor: '[]'}
											}
										});
								} else {
									break _v44_2;
								}
							case 'Disj':
								if (_p85._1.ctor === 'Disj') {
									return _elm_lang$core$Maybe$Just(
										{
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: _p85._0._0, _1: _p85._1._1},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: _p85._0._1, _1: _p85._1._0},
												_1: {ctor: '[]'}
											}
										});
								} else {
									break _v44_2;
								}
							default:
								break _v44_2;
						}
					} else {
						break _v44_2;
					}
				} while(false);
				return _elm_lang$core$Maybe$Nothing;
			});
		return A3(_ZoltanOnody$proof_assistant$Core_Matcher$matcherWrapper, $function, a, b);
	});
var _ZoltanOnody$proof_assistant$Core_Matcher$matcherDeMorgan = F2(
	function (a, b) {
		var $function = F2(
			function (from, toProve) {
				var _p86 = {ctor: '_Tuple2', _0: from, _1: toProve};
				_v45_4:
				do {
					if (_p86.ctor === '_Tuple2') {
						switch (_p86._0.ctor) {
							case 'Neg':
								switch (_p86._0._0.ctor) {
									case 'Conj':
										if (((_p86._1.ctor === 'Disj') && (_p86._1._0.ctor === 'Neg')) && (_p86._1._1.ctor === 'Neg')) {
											return _elm_lang$core$Maybe$Just(
												{
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: _p86._0._0._0, _1: _p86._1._0._0},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: _p86._0._0._1, _1: _p86._1._1._0},
														_1: {ctor: '[]'}
													}
												});
										} else {
											break _v45_4;
										}
									case 'Disj':
										if (((_p86._1.ctor === 'Conj') && (_p86._1._0.ctor === 'Neg')) && (_p86._1._1.ctor === 'Neg')) {
											return _elm_lang$core$Maybe$Just(
												{
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: _p86._0._0._0, _1: _p86._1._0._0},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: _p86._0._0._1, _1: _p86._1._1._0},
														_1: {ctor: '[]'}
													}
												});
										} else {
											break _v45_4;
										}
									default:
										break _v45_4;
								}
							case 'Conj':
								if ((((_p86._0._0.ctor === 'Neg') && (_p86._0._1.ctor === 'Neg')) && (_p86._1.ctor === 'Neg')) && (_p86._1._0.ctor === 'Disj')) {
									return _elm_lang$core$Maybe$Just(
										{
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: _p86._0._0._0, _1: _p86._1._0._0},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: _p86._0._1._0, _1: _p86._1._0._1},
												_1: {ctor: '[]'}
											}
										});
								} else {
									break _v45_4;
								}
							case 'Disj':
								if ((((_p86._0._0.ctor === 'Neg') && (_p86._0._1.ctor === 'Neg')) && (_p86._1.ctor === 'Neg')) && (_p86._1._0.ctor === 'Conj')) {
									return _elm_lang$core$Maybe$Just(
										{
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: _p86._0._0._0, _1: _p86._1._0._0},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: _p86._0._1._0, _1: _p86._1._0._1},
												_1: {ctor: '[]'}
											}
										});
								} else {
									break _v45_4;
								}
							default:
								break _v45_4;
						}
					} else {
						break _v45_4;
					}
				} while(false);
				return _elm_lang$core$Maybe$Nothing;
			});
		return A3(_ZoltanOnody$proof_assistant$Core_Matcher$matcherWrapper, $function, a, b);
	});

var _elm_lang$animation_frame$Native_AnimationFrame = function()
{

function create()
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var id = requestAnimationFrame(function() {
			callback(_elm_lang$core$Native_Scheduler.succeed(Date.now()));
		});

		return function() {
			cancelAnimationFrame(id);
		};
	});
}

return {
	create: create
};

}();

var _elm_lang$core$Task$onError = _elm_lang$core$Native_Scheduler.onError;
var _elm_lang$core$Task$andThen = _elm_lang$core$Native_Scheduler.andThen;
var _elm_lang$core$Task$spawnCmd = F2(
	function (router, _p0) {
		var _p1 = _p0;
		return _elm_lang$core$Native_Scheduler.spawn(
			A2(
				_elm_lang$core$Task$andThen,
				_elm_lang$core$Platform$sendToApp(router),
				_p1._0));
	});
var _elm_lang$core$Task$fail = _elm_lang$core$Native_Scheduler.fail;
var _elm_lang$core$Task$mapError = F2(
	function (convert, task) {
		return A2(
			_elm_lang$core$Task$onError,
			function (_p2) {
				return _elm_lang$core$Task$fail(
					convert(_p2));
			},
			task);
	});
var _elm_lang$core$Task$succeed = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return _elm_lang$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var _elm_lang$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return _elm_lang$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map3 = F4(
	function (func, taskA, taskB, taskC) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return _elm_lang$core$Task$succeed(
									A3(func, a, b, c));
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map4 = F5(
	function (func, taskA, taskB, taskC, taskD) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return _elm_lang$core$Task$succeed(
											A4(func, a, b, c, d));
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$map5 = F6(
	function (func, taskA, taskB, taskC, taskD, taskE) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (a) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (b) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (c) {
								return A2(
									_elm_lang$core$Task$andThen,
									function (d) {
										return A2(
											_elm_lang$core$Task$andThen,
											function (e) {
												return _elm_lang$core$Task$succeed(
													A5(func, a, b, c, d, e));
											},
											taskE);
									},
									taskD);
							},
							taskC);
					},
					taskB);
			},
			taskA);
	});
var _elm_lang$core$Task$sequence = function (tasks) {
	var _p3 = tasks;
	if (_p3.ctor === '[]') {
		return _elm_lang$core$Task$succeed(
			{ctor: '[]'});
	} else {
		return A3(
			_elm_lang$core$Task$map2,
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			_p3._0,
			_elm_lang$core$Task$sequence(_p3._1));
	}
};
var _elm_lang$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			_elm_lang$core$Task$map,
			function (_p4) {
				return {ctor: '_Tuple0'};
			},
			_elm_lang$core$Task$sequence(
				A2(
					_elm_lang$core$List$map,
					_elm_lang$core$Task$spawnCmd(router),
					commands)));
	});
var _elm_lang$core$Task$init = _elm_lang$core$Task$succeed(
	{ctor: '_Tuple0'});
var _elm_lang$core$Task$onSelfMsg = F3(
	function (_p7, _p6, _p5) {
		return _elm_lang$core$Task$succeed(
			{ctor: '_Tuple0'});
	});
var _elm_lang$core$Task$command = _elm_lang$core$Native_Platform.leaf('Task');
var _elm_lang$core$Task$Perform = function (a) {
	return {ctor: 'Perform', _0: a};
};
var _elm_lang$core$Task$perform = F2(
	function (toMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(_elm_lang$core$Task$map, toMessage, task)));
	});
var _elm_lang$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return _elm_lang$core$Task$command(
			_elm_lang$core$Task$Perform(
				A2(
					_elm_lang$core$Task$onError,
					function (_p8) {
						return _elm_lang$core$Task$succeed(
							resultToMessage(
								_elm_lang$core$Result$Err(_p8)));
					},
					A2(
						_elm_lang$core$Task$andThen,
						function (_p9) {
							return _elm_lang$core$Task$succeed(
								resultToMessage(
									_elm_lang$core$Result$Ok(_p9)));
						},
						task))));
	});
var _elm_lang$core$Task$cmdMap = F2(
	function (tagger, _p10) {
		var _p11 = _p10;
		return _elm_lang$core$Task$Perform(
			A2(_elm_lang$core$Task$map, tagger, _p11._0));
	});
_elm_lang$core$Native_Platform.effectManagers['Task'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Task$init, onEffects: _elm_lang$core$Task$onEffects, onSelfMsg: _elm_lang$core$Task$onSelfMsg, tag: 'cmd', cmdMap: _elm_lang$core$Task$cmdMap};

//import Native.Scheduler //

var _elm_lang$core$Native_Time = function() {

var now = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
{
	callback(_elm_lang$core$Native_Scheduler.succeed(Date.now()));
});

function setInterval_(interval, task)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var id = setInterval(function() {
			_elm_lang$core$Native_Scheduler.rawSpawn(task);
		}, interval);

		return function() { clearInterval(id); };
	});
}

return {
	now: now,
	setInterval_: F2(setInterval_)
};

}();
var _elm_lang$core$Time$setInterval = _elm_lang$core$Native_Time.setInterval_;
var _elm_lang$core$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		var _p0 = intervals;
		if (_p0.ctor === '[]') {
			return _elm_lang$core$Task$succeed(processes);
		} else {
			var _p1 = _p0._0;
			var spawnRest = function (id) {
				return A3(
					_elm_lang$core$Time$spawnHelp,
					router,
					_p0._1,
					A3(_elm_lang$core$Dict$insert, _p1, id, processes));
			};
			var spawnTimer = _elm_lang$core$Native_Scheduler.spawn(
				A2(
					_elm_lang$core$Time$setInterval,
					_p1,
					A2(_elm_lang$core$Platform$sendToSelf, router, _p1)));
			return A2(_elm_lang$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var _elm_lang$core$Time$addMySub = F2(
	function (_p2, state) {
		var _p3 = _p2;
		var _p6 = _p3._1;
		var _p5 = _p3._0;
		var _p4 = A2(_elm_lang$core$Dict$get, _p5, state);
		if (_p4.ctor === 'Nothing') {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{
					ctor: '::',
					_0: _p6,
					_1: {ctor: '[]'}
				},
				state);
		} else {
			return A3(
				_elm_lang$core$Dict$insert,
				_p5,
				{ctor: '::', _0: _p6, _1: _p4._0},
				state);
		}
	});
var _elm_lang$core$Time$inMilliseconds = function (t) {
	return t;
};
var _elm_lang$core$Time$millisecond = 1;
var _elm_lang$core$Time$second = 1000 * _elm_lang$core$Time$millisecond;
var _elm_lang$core$Time$minute = 60 * _elm_lang$core$Time$second;
var _elm_lang$core$Time$hour = 60 * _elm_lang$core$Time$minute;
var _elm_lang$core$Time$inHours = function (t) {
	return t / _elm_lang$core$Time$hour;
};
var _elm_lang$core$Time$inMinutes = function (t) {
	return t / _elm_lang$core$Time$minute;
};
var _elm_lang$core$Time$inSeconds = function (t) {
	return t / _elm_lang$core$Time$second;
};
var _elm_lang$core$Time$now = _elm_lang$core$Native_Time.now;
var _elm_lang$core$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _p7 = A2(_elm_lang$core$Dict$get, interval, state.taggers);
		if (_p7.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var tellTaggers = function (time) {
				return _elm_lang$core$Task$sequence(
					A2(
						_elm_lang$core$List$map,
						function (tagger) {
							return A2(
								_elm_lang$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						_p7._0));
			};
			return A2(
				_elm_lang$core$Task$andThen,
				function (_p8) {
					return _elm_lang$core$Task$succeed(state);
				},
				A2(_elm_lang$core$Task$andThen, tellTaggers, _elm_lang$core$Time$now));
		}
	});
var _elm_lang$core$Time$subscription = _elm_lang$core$Native_Platform.leaf('Time');
var _elm_lang$core$Time$State = F2(
	function (a, b) {
		return {taggers: a, processes: b};
	});
var _elm_lang$core$Time$init = _elm_lang$core$Task$succeed(
	A2(_elm_lang$core$Time$State, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty));
var _elm_lang$core$Time$onEffects = F3(
	function (router, subs, _p9) {
		var _p10 = _p9;
		var rightStep = F3(
			function (_p12, id, _p11) {
				var _p13 = _p11;
				return {
					ctor: '_Tuple3',
					_0: _p13._0,
					_1: _p13._1,
					_2: A2(
						_elm_lang$core$Task$andThen,
						function (_p14) {
							return _p13._2;
						},
						_elm_lang$core$Native_Scheduler.kill(id))
				};
			});
		var bothStep = F4(
			function (interval, taggers, id, _p15) {
				var _p16 = _p15;
				return {
					ctor: '_Tuple3',
					_0: _p16._0,
					_1: A3(_elm_lang$core$Dict$insert, interval, id, _p16._1),
					_2: _p16._2
				};
			});
		var leftStep = F3(
			function (interval, taggers, _p17) {
				var _p18 = _p17;
				return {
					ctor: '_Tuple3',
					_0: {ctor: '::', _0: interval, _1: _p18._0},
					_1: _p18._1,
					_2: _p18._2
				};
			});
		var newTaggers = A3(_elm_lang$core$List$foldl, _elm_lang$core$Time$addMySub, _elm_lang$core$Dict$empty, subs);
		var _p19 = A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			_p10.processes,
			{
				ctor: '_Tuple3',
				_0: {ctor: '[]'},
				_1: _elm_lang$core$Dict$empty,
				_2: _elm_lang$core$Task$succeed(
					{ctor: '_Tuple0'})
			});
		var spawnList = _p19._0;
		var existingDict = _p19._1;
		var killTask = _p19._2;
		return A2(
			_elm_lang$core$Task$andThen,
			function (newProcesses) {
				return _elm_lang$core$Task$succeed(
					A2(_elm_lang$core$Time$State, newTaggers, newProcesses));
			},
			A2(
				_elm_lang$core$Task$andThen,
				function (_p20) {
					return A3(_elm_lang$core$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var _elm_lang$core$Time$Every = F2(
	function (a, b) {
		return {ctor: 'Every', _0: a, _1: b};
	});
var _elm_lang$core$Time$every = F2(
	function (interval, tagger) {
		return _elm_lang$core$Time$subscription(
			A2(_elm_lang$core$Time$Every, interval, tagger));
	});
var _elm_lang$core$Time$subMap = F2(
	function (f, _p21) {
		var _p22 = _p21;
		return A2(
			_elm_lang$core$Time$Every,
			_p22._0,
			function (_p23) {
				return f(
					_p22._1(_p23));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Time'] = {pkg: 'elm-lang/core', init: _elm_lang$core$Time$init, onEffects: _elm_lang$core$Time$onEffects, onSelfMsg: _elm_lang$core$Time$onSelfMsg, tag: 'sub', subMap: _elm_lang$core$Time$subMap};

var _elm_lang$core$Process$kill = _elm_lang$core$Native_Scheduler.kill;
var _elm_lang$core$Process$sleep = _elm_lang$core$Native_Scheduler.sleep;
var _elm_lang$core$Process$spawn = _elm_lang$core$Native_Scheduler.spawn;

var _elm_lang$animation_frame$AnimationFrame$rAF = _elm_lang$animation_frame$Native_AnimationFrame.create(
	{ctor: '_Tuple0'});
var _elm_lang$animation_frame$AnimationFrame$subscription = _elm_lang$core$Native_Platform.leaf('AnimationFrame');
var _elm_lang$animation_frame$AnimationFrame$State = F3(
	function (a, b, c) {
		return {subs: a, request: b, oldTime: c};
	});
var _elm_lang$animation_frame$AnimationFrame$init = _elm_lang$core$Task$succeed(
	A3(
		_elm_lang$animation_frame$AnimationFrame$State,
		{ctor: '[]'},
		_elm_lang$core$Maybe$Nothing,
		0));
var _elm_lang$animation_frame$AnimationFrame$onEffects = F3(
	function (router, subs, _p0) {
		var _p1 = _p0;
		var _p5 = _p1.request;
		var _p4 = _p1.oldTime;
		var _p2 = {ctor: '_Tuple2', _0: _p5, _1: subs};
		if (_p2._0.ctor === 'Nothing') {
			if (_p2._1.ctor === '[]') {
				return _elm_lang$core$Task$succeed(
					A3(
						_elm_lang$animation_frame$AnimationFrame$State,
						{ctor: '[]'},
						_elm_lang$core$Maybe$Nothing,
						_p4));
			} else {
				return A2(
					_elm_lang$core$Task$andThen,
					function (pid) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (time) {
								return _elm_lang$core$Task$succeed(
									A3(
										_elm_lang$animation_frame$AnimationFrame$State,
										subs,
										_elm_lang$core$Maybe$Just(pid),
										time));
							},
							_elm_lang$core$Time$now);
					},
					_elm_lang$core$Process$spawn(
						A2(
							_elm_lang$core$Task$andThen,
							_elm_lang$core$Platform$sendToSelf(router),
							_elm_lang$animation_frame$AnimationFrame$rAF)));
			}
		} else {
			if (_p2._1.ctor === '[]') {
				return A2(
					_elm_lang$core$Task$andThen,
					function (_p3) {
						return _elm_lang$core$Task$succeed(
							A3(
								_elm_lang$animation_frame$AnimationFrame$State,
								{ctor: '[]'},
								_elm_lang$core$Maybe$Nothing,
								_p4));
					},
					_elm_lang$core$Process$kill(_p2._0._0));
			} else {
				return _elm_lang$core$Task$succeed(
					A3(_elm_lang$animation_frame$AnimationFrame$State, subs, _p5, _p4));
			}
		}
	});
var _elm_lang$animation_frame$AnimationFrame$onSelfMsg = F3(
	function (router, newTime, _p6) {
		var _p7 = _p6;
		var _p10 = _p7.subs;
		var diff = newTime - _p7.oldTime;
		var send = function (sub) {
			var _p8 = sub;
			if (_p8.ctor === 'Time') {
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					_p8._0(newTime));
			} else {
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					_p8._0(diff));
			}
		};
		return A2(
			_elm_lang$core$Task$andThen,
			function (pid) {
				return A2(
					_elm_lang$core$Task$andThen,
					function (_p9) {
						return _elm_lang$core$Task$succeed(
							A3(
								_elm_lang$animation_frame$AnimationFrame$State,
								_p10,
								_elm_lang$core$Maybe$Just(pid),
								newTime));
					},
					_elm_lang$core$Task$sequence(
						A2(_elm_lang$core$List$map, send, _p10)));
			},
			_elm_lang$core$Process$spawn(
				A2(
					_elm_lang$core$Task$andThen,
					_elm_lang$core$Platform$sendToSelf(router),
					_elm_lang$animation_frame$AnimationFrame$rAF)));
	});
var _elm_lang$animation_frame$AnimationFrame$Diff = function (a) {
	return {ctor: 'Diff', _0: a};
};
var _elm_lang$animation_frame$AnimationFrame$diffs = function (tagger) {
	return _elm_lang$animation_frame$AnimationFrame$subscription(
		_elm_lang$animation_frame$AnimationFrame$Diff(tagger));
};
var _elm_lang$animation_frame$AnimationFrame$Time = function (a) {
	return {ctor: 'Time', _0: a};
};
var _elm_lang$animation_frame$AnimationFrame$times = function (tagger) {
	return _elm_lang$animation_frame$AnimationFrame$subscription(
		_elm_lang$animation_frame$AnimationFrame$Time(tagger));
};
var _elm_lang$animation_frame$AnimationFrame$subMap = F2(
	function (func, sub) {
		var _p11 = sub;
		if (_p11.ctor === 'Time') {
			return _elm_lang$animation_frame$AnimationFrame$Time(
				function (_p12) {
					return func(
						_p11._0(_p12));
				});
		} else {
			return _elm_lang$animation_frame$AnimationFrame$Diff(
				function (_p13) {
					return func(
						_p11._0(_p13));
				});
		}
	});
_elm_lang$core$Native_Platform.effectManagers['AnimationFrame'] = {pkg: 'elm-lang/animation-frame', init: _elm_lang$animation_frame$AnimationFrame$init, onEffects: _elm_lang$animation_frame$AnimationFrame$onEffects, onSelfMsg: _elm_lang$animation_frame$AnimationFrame$onSelfMsg, tag: 'sub', subMap: _elm_lang$animation_frame$AnimationFrame$subMap};

//import Native.List //

var _elm_lang$core$Native_Array = function() {

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(i, array)
{
	if (i < 0 || i >= length(array))
	{
		throw new Error(
			'Index ' + i + ' is out of range. Check the length of ' +
			'your array first or use getMaybe or getWithDefault.');
	}
	return unsafeGet(i, array);
}


function unsafeGet(i, array)
{
	for (var x = array.height; x > 0; x--)
	{
		var slot = i >> (x * 5);
		while (array.lengths[slot] <= i)
		{
			slot++;
		}
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array = array.table[slot];
	}
	return array.table[i];
}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(i, item, array)
{
	if (i < 0 || length(array) <= i)
	{
		return array;
	}
	return unsafeSet(i, item, array);
}


function unsafeSet(i, item, array)
{
	array = nodeCopy(array);

	if (array.height === 0)
	{
		array.table[i] = item;
	}
	else
	{
		var slot = getSlot(i, array);
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array.table[slot] = unsafeSet(i, item, array.table[slot]);
	}
	return array;
}


function initialize(len, f)
{
	if (len <= 0)
	{
		return empty;
	}
	var h = Math.floor( Math.log(len) / Math.log(M) );
	return initialize_(f, h, 0, len);
}

function initialize_(f, h, from, to)
{
	if (h === 0)
	{
		var table = new Array((to - from) % (M + 1));
		for (var i = 0; i < table.length; i++)
		{
		  table[i] = f(from + i);
		}
		return {
			ctor: '_Array',
			height: 0,
			table: table
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

function fromList(list)
{
	if (list.ctor === '[]')
	{
		return empty;
	}

	// Allocate M sized blocks (table) and write list elements to it.
	var table = new Array(M);
	var nodes = [];
	var i = 0;

	while (list.ctor !== '[]')
	{
		table[i] = list._0;
		list = list._1;
		i++;

		// table is full, so we can push a leaf containing it into the
		// next node.
		if (i === M)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table
			};
			fromListPush(leaf, nodes);
			table = new Array(M);
			i = 0;
		}
	}

	// Maybe there is something left on the table.
	if (i > 0)
	{
		var leaf = {
			ctor: '_Array',
			height: 0,
			table: table.splice(0, i)
		};
		fromListPush(leaf, nodes);
	}

	// Go through all of the nodes and eventually push them into higher nodes.
	for (var h = 0; h < nodes.length - 1; h++)
	{
		if (nodes[h].table.length > 0)
		{
			fromListPush(nodes[h], nodes);
		}
	}

	var head = nodes[nodes.length - 1];
	if (head.height > 0 && head.table.length === 1)
	{
		return head.table[0];
	}
	else
	{
		return head;
	}
}

// Push a node into a higher node as a child.
function fromListPush(toPush, nodes)
{
	var h = toPush.height;

	// Maybe the node on this height does not exist.
	if (nodes.length === h)
	{
		var node = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
		nodes.push(node);
	}

	nodes[h].table.push(toPush);
	var len = length(toPush);
	if (nodes[h].lengths.length > 0)
	{
		len += nodes[h].lengths[nodes[h].lengths.length - 1];
	}
	nodes[h].lengths.push(len);

	if (nodes[h].table.length === M)
	{
		fromListPush(nodes[h], nodes);
		nodes[h] = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
	}
}

// Pushes an item via push_ to the bottom right of a tree.
function push(item, a)
{
	var pushed = push_(item, a);
	if (pushed !== null)
	{
		return pushed;
	}

	var newTree = create(item, a.height);
	return siblise(a, newTree);
}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(item, a)
{
	// Handle resursion stop at leaf level.
	if (a.height === 0)
	{
		if (a.table.length < M)
		{
			var newA = {
				ctor: '_Array',
				height: 0,
				table: a.table.slice()
			};
			newA.table.push(item);
			return newA;
		}
		else
		{
		  return null;
		}
	}

	// Recursively push
	var pushed = push_(item, botRight(a));

	// There was space in the bottom right tree, so the slot will
	// be updated.
	if (pushed !== null)
	{
		var newA = nodeCopy(a);
		newA.table[newA.table.length - 1] = pushed;
		newA.lengths[newA.lengths.length - 1]++;
		return newA;
	}

	// When there was no space left, check if there is space left
	// for a new slot with a tree which contains only the item
	// at the bottom.
	if (a.table.length < M)
	{
		var newSlot = create(item, a.height - 1);
		var newA = nodeCopy(a);
		newA.table.push(newSlot);
		newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
		return newA;
	}
	else
	{
		return null;
	}
}

// Converts an array into a list of elements.
function toList(a)
{
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
				: toList_(list, a.table[i]);
	}
	return list;
}

// Maps a function over the elements of an array.
function map(f, a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? f(a.table[i])
				: map(f, a.table[i]);
	}
	return newA;
}

// Maps a function over the elements with their index as first argument.
function indexedMap(f, a)
{
	return indexedMap_(f, a, 0);
}

function indexedMap_(f, a, from)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? A2(f, from + i, a.table[i])
				: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
	}
	return newA;
}

function foldl(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = foldl(f, b, a.table[i]);
		}
	}
	return b;
}

function foldr(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = a.table.length; i--; )
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = a.table.length; i--; )
		{
			b = foldr(f, b, a.table[i]);
		}
	}
	return b;
}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(from, to, a)
{
	if (from < 0)
	{
		from += length(a);
	}
	if (to < 0)
	{
		to += length(a);
	}
	return sliceLeft(from, sliceRight(to, a));
}

function sliceRight(to, a)
{
	if (to === length(a))
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(0, to);
		return newA;
	}

	// Slice the right recursively.
	var right = getSlot(to, a);
	var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (right === 0)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(0, right),
		lengths: a.lengths.slice(0, right)
	};
	if (sliced.table.length > 0)
	{
		newA.table[right] = sliced;
		newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
	}
	return newA;
}

function sliceLeft(from, a)
{
	if (from === 0)
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(from, a.table.length + 1);
		return newA;
	}

	// Slice the left recursively.
	var left = getSlot(from, a);
	var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (left === a.table.length - 1)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(left, a.table.length + 1),
		lengths: new Array(a.table.length - left)
	};
	newA.table[0] = sliced;
	var len = 0;
	for (var i = 0; i < newA.table.length; i++)
	{
		len += length(newA.table[i]);
		newA.lengths[i] = len;
	}

	return newA;
}

// Appends two trees.
function append(a,b)
{
	if (a.table.length === 0)
	{
		return b;
	}
	if (b.table.length === 0)
	{
		return a;
	}

	var c = append_(a, b);

	// Check if both nodes can be crunshed together.
	if (c[0].table.length + c[1].table.length <= M)
	{
		if (c[0].table.length === 0)
		{
			return c[1];
		}
		if (c[1].table.length === 0)
		{
			return c[0];
		}

		// Adjust .table and .lengths
		c[0].table = c[0].table.concat(c[1].table);
		if (c[0].height > 0)
		{
			var len = length(c[0]);
			for (var i = 0; i < c[1].lengths.length; i++)
			{
				c[1].lengths[i] += len;
			}
			c[0].lengths = c[0].lengths.concat(c[1].lengths);
		}

		return c[0];
	}

	if (c[0].height > 0)
	{
		var toRemove = calcToRemove(a, b);
		if (toRemove > E)
		{
			c = shuffle(c[0], c[1], toRemove);
		}
	}

	return siblise(c[0], c[1]);
}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(a, b)
{
	if (a.height === 0 && b.height === 0)
	{
		return [a, b];
	}

	if (a.height !== 1 || b.height !== 1)
	{
		if (a.height === b.height)
		{
			a = nodeCopy(a);
			b = nodeCopy(b);
			var appended = append_(botRight(a), botLeft(b));

			insertRight(a, appended[1]);
			insertLeft(b, appended[0]);
		}
		else if (a.height > b.height)
		{
			a = nodeCopy(a);
			var appended = append_(botRight(a), b);

			insertRight(a, appended[0]);
			b = parentise(appended[1], appended[1].height + 1);
		}
		else
		{
			b = nodeCopy(b);
			var appended = append_(a, botLeft(b));

			var left = appended[0].table.length === 0 ? 0 : 1;
			var right = left === 0 ? 1 : 0;
			insertLeft(b, appended[left]);
			a = parentise(appended[right], appended[right].height + 1);
		}
	}

	// Check if balancing is needed and return based on that.
	if (a.table.length === 0 || b.table.length === 0)
	{
		return [a, b];
	}

	var toRemove = calcToRemove(a, b);
	if (toRemove <= E)
	{
		return [a, b];
	}
	return shuffle(a, b, toRemove);
}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(parent, node)
{
	var index = parent.table.length - 1;
	parent.table[index] = node;
	parent.lengths[index] = length(node);
	parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
}

function insertLeft(parent, node)
{
	if (node.table.length > 0)
	{
		parent.table[0] = node;
		parent.lengths[0] = length(node);

		var len = length(parent.table[0]);
		for (var i = 1; i < parent.lengths.length; i++)
		{
			len += length(parent.table[i]);
			parent.lengths[i] = len;
		}
	}
	else
	{
		parent.table.shift();
		for (var i = 1; i < parent.lengths.length; i++)
		{
			parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
		}
		parent.lengths.shift();
	}
}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(a, b)
{
	var subLengths = 0;
	for (var i = 0; i < a.table.length; i++)
	{
		subLengths += a.table[i].table.length;
	}
	for (var i = 0; i < b.table.length; i++)
	{
		subLengths += b.table[i].table.length;
	}

	var toRemove = a.table.length + b.table.length;
	return toRemove - (Math.floor((subLengths - 1) / M) + 1);
}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(a, b, index)
{
	return index < a.length
		? a[index]
		: b[index - a.length];
}

function set2(a, b, index, value)
{
	if (index < a.length)
	{
		a[index] = value;
	}
	else
	{
		b[index - a.length] = value;
	}
}

function saveSlot(a, b, index, slot)
{
	set2(a.table, b.table, index, slot);

	var l = (index === 0 || index === a.lengths.length)
		? 0
		: get2(a.lengths, a.lengths, index - 1);

	set2(a.lengths, b.lengths, index, l + length(slot));
}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(h, length)
{
	if (length < 0)
	{
		length = 0;
	}
	var a = {
		ctor: '_Array',
		height: h,
		table: new Array(length)
	};
	if (h > 0)
	{
		a.lengths = new Array(length);
	}
	return a;
}

// Returns an array of two balanced nodes.
function shuffle(a, b, toRemove)
{
	var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
	var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

	// Skip the slots with size M. More precise: copy the slot references
	// to the new node
	var read = 0;
	while (get2(a.table, b.table, read).table.length % M === 0)
	{
		set2(newA.table, newB.table, read, get2(a.table, b.table, read));
		set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
		read++;
	}

	// Pulling items from left to right, caching in a slot before writing
	// it into the new nodes.
	var write = read;
	var slot = new createNode(a.height - 1, 0);
	var from = 0;

	// If the current slot is still containing data, then there will be at
	// least one more write, so we do not break this loop yet.
	while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
	{
		// Find out the max possible items for copying.
		var source = get2(a.table, b.table, read);
		var to = Math.min(M - slot.table.length, source.table.length);

		// Copy and adjust size table.
		slot.table = slot.table.concat(source.table.slice(from, to));
		if (slot.height > 0)
		{
			var len = slot.lengths.length;
			for (var i = len; i < len + to - from; i++)
			{
				slot.lengths[i] = length(slot.table[i]);
				slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
			}
		}

		from += to;

		// Only proceed to next slots[i] if the current one was
		// fully copied.
		if (source.table.length <= to)
		{
			read++; from = 0;
		}

		// Only create a new slot if the current one is filled up.
		if (slot.table.length === M)
		{
			saveSlot(newA, newB, write, slot);
			slot = createNode(a.height - 1, 0);
			write++;
		}
	}

	// Cleanup after the loop. Copy the last slot into the new nodes.
	if (slot.table.length > 0)
	{
		saveSlot(newA, newB, write, slot);
		write++;
	}

	// Shift the untouched slots to the left
	while (read < a.table.length + b.table.length )
	{
		saveSlot(newA, newB, write, get2(a.table, b.table, read));
		read++;
		write++;
	}

	return [newA, newB];
}

// Navigation functions
function botRight(a)
{
	return a.table[a.table.length - 1];
}
function botLeft(a)
{
	return a.table[0];
}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice()
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths.slice();
	}
	return newA;
}

// Returns how many items are in the tree.
function length(array)
{
	if (array.height === 0)
	{
		return array.table.length;
	}
	else
	{
		return array.lengths[array.lengths.length - 1];
	}
}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(i, a)
{
	var slot = i >> (5 * a.height);
	while (a.lengths[slot] <= i)
	{
		slot++;
	}
	return slot;
}

// Recursively creates a tree with a given height containing
// only the given item.
function create(item, h)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: [item]
		};
	}
	return {
		ctor: '_Array',
		height: h,
		table: [create(item, h - 1)],
		lengths: [1]
	};
}

// Recursively creates a tree that contains the given tree.
function parentise(tree, h)
{
	if (h === tree.height)
	{
		return tree;
	}

	return {
		ctor: '_Array',
		height: h,
		table: [parentise(tree, h - 1)],
		lengths: [length(tree)]
	};
}

// Emphasizes blood brotherhood beneath two trees.
function siblise(a, b)
{
	return {
		ctor: '_Array',
		height: a.height + 1,
		table: [a, b],
		lengths: [length(a), length(a) + length(b)]
	};
}

function toJSArray(a)
{
	var jsArray = new Array(length(a));
	toJSArray_(jsArray, 0, a);
	return jsArray;
}

function toJSArray_(jsArray, i, a)
{
	for (var t = 0; t < a.table.length; t++)
	{
		if (a.height === 0)
		{
			jsArray[i + t] = a.table[t];
		}
		else
		{
			var inc = t === 0 ? 0 : a.lengths[t - 1];
			toJSArray_(jsArray, i + inc, a.table[t]);
		}
	}
}

function fromJSArray(jsArray)
{
	if (jsArray.length === 0)
	{
		return empty;
	}
	var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
	return fromJSArray_(jsArray, h, 0, jsArray.length);
}

function fromJSArray_(jsArray, h, from, to)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: jsArray.slice(from, to)
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(
			_elm_lang$core$List$range,
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeIndex(index, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'index',
		index: index,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function mapMany(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function andThen(callback, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function map1(f, d1)
{
	return mapMany(f, [d1]);
}

function map2(f, d1, d2)
{
	return mapMany(f, [d1, d2]);
}

function map3(f, d1, d2, d3)
{
	return mapMany(f, [d1, d2, d3]);
}

function map4(f, d1, d2, d3, d4)
{
	return mapMany(f, [d1, d2, d3, d4]);
}

function map5(f, d1, d2, d3, d4, d5)
{
	return mapMany(f, [d1, d2, d3, d4, d5]);
}

function map6(f, d1, d2, d3, d4, d5, d6)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6]);
}

function map7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok') ? result : badField(field, result);

		case 'index':
			var index = decoder.index;
			if (!(value instanceof Array))
			{
				return badPrimitive('an array', value);
			}
			if (index >= value.length)
			{
				return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
			}

			var result = runHelp(decoder.decoder, value[index]);
			return (result.tag === 'ok') ? result : badIndex(index, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'index':
			return a.index === b.index && equality(a.decoder, b.decoder);

		case 'map-many':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),
	decodeIndex: F2(decodeIndex),

	map1: F2(map1),
	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	map6: F7(map6),
	map7: F8(map7),
	map8: F9(map8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	andThen: F2(andThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$lazy = function (thunk) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		thunk,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
	});
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$nullable = function (decoder) {
	return _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
				_1: {ctor: '[]'}
			}
		});
};
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _elm_lang$virtual_dom$VirtualDom_Debug$wrap;
var _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags;

var _elm_lang$virtual_dom$Native_VirtualDom = function() {

var STYLE_KEY = 'STYLE';
var EVENT_KEY = 'EVENT';
var ATTR_KEY = 'ATTR';
var ATTR_NS_KEY = 'ATTR_NS';

var localDoc = typeof document !== 'undefined' ? document : {};


////////////  VIRTUAL DOM NODES  ////////////


function text(string)
{
	return {
		type: 'text',
		text: string
	};
}


function node(tag)
{
	return F2(function(factList, kidList) {
		return nodeHelp(tag, factList, kidList);
	});
}


function nodeHelp(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function keyedNode(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid._1.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'keyed-node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function custom(factList, model, impl)
{
	var facts = organizeFacts(factList).facts;

	return {
		type: 'custom',
		facts: facts,
		model: model,
		impl: impl
	};
}


function map(tagger, node)
{
	return {
		type: 'tagger',
		tagger: tagger,
		node: node,
		descendantsCount: 1 + (node.descendantsCount || 0)
	};
}


function thunk(func, args, thunk)
{
	return {
		type: 'thunk',
		func: func,
		args: args,
		thunk: thunk,
		node: undefined
	};
}

function lazy(fn, a)
{
	return thunk(fn, [a], function() {
		return fn(a);
	});
}

function lazy2(fn, a, b)
{
	return thunk(fn, [a,b], function() {
		return A2(fn, a, b);
	});
}

function lazy3(fn, a, b, c)
{
	return thunk(fn, [a,b,c], function() {
		return A3(fn, a, b, c);
	});
}



// FACTS


function organizeFacts(factList)
{
	var namespace, facts = {};

	while (factList.ctor !== '[]')
	{
		var entry = factList._0;
		var key = entry.key;

		if (key === ATTR_KEY || key === ATTR_NS_KEY || key === EVENT_KEY)
		{
			var subFacts = facts[key] || {};
			subFacts[entry.realKey] = entry.value;
			facts[key] = subFacts;
		}
		else if (key === STYLE_KEY)
		{
			var styles = facts[key] || {};
			var styleList = entry.value;
			while (styleList.ctor !== '[]')
			{
				var style = styleList._0;
				styles[style._0] = style._1;
				styleList = styleList._1;
			}
			facts[key] = styles;
		}
		else if (key === 'namespace')
		{
			namespace = entry.value;
		}
		else if (key === 'className')
		{
			var classes = facts[key];
			facts[key] = typeof classes === 'undefined'
				? entry.value
				: classes + ' ' + entry.value;
		}
 		else
		{
			facts[key] = entry.value;
		}
		factList = factList._1;
	}

	return {
		facts: facts,
		namespace: namespace
	};
}



////////////  PROPERTIES AND ATTRIBUTES  ////////////


function style(value)
{
	return {
		key: STYLE_KEY,
		value: value
	};
}


function property(key, value)
{
	return {
		key: key,
		value: value
	};
}


function attribute(key, value)
{
	return {
		key: ATTR_KEY,
		realKey: key,
		value: value
	};
}


function attributeNS(namespace, key, value)
{
	return {
		key: ATTR_NS_KEY,
		realKey: key,
		value: {
			value: value,
			namespace: namespace
		}
	};
}


function on(name, options, decoder)
{
	return {
		key: EVENT_KEY,
		realKey: name,
		value: {
			options: options,
			decoder: decoder
		}
	};
}


function equalEvents(a, b)
{
	if (a.options !== b.options)
	{
		if (a.options.stopPropagation !== b.options.stopPropagation || a.options.preventDefault !== b.options.preventDefault)
		{
			return false;
		}
	}
	return _elm_lang$core$Native_Json.equality(a.decoder, b.decoder);
}


function mapProperty(func, property)
{
	if (property.key !== EVENT_KEY)
	{
		return property;
	}
	return on(
		property.realKey,
		property.value.options,
		A2(_elm_lang$core$Json_Decode$map, func, property.value.decoder)
	);
}


////////////  RENDER  ////////////


function render(vNode, eventNode)
{
	switch (vNode.type)
	{
		case 'thunk':
			if (!vNode.node)
			{
				vNode.node = vNode.thunk();
			}
			return render(vNode.node, eventNode);

		case 'tagger':
			var subNode = vNode.node;
			var tagger = vNode.tagger;

			while (subNode.type === 'tagger')
			{
				typeof tagger !== 'object'
					? tagger = [tagger, subNode.tagger]
					: tagger.push(subNode.tagger);

				subNode = subNode.node;
			}

			var subEventRoot = { tagger: tagger, parent: eventNode };
			var domNode = render(subNode, subEventRoot);
			domNode.elm_event_node_ref = subEventRoot;
			return domNode;

		case 'text':
			return localDoc.createTextNode(vNode.text);

		case 'node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i], eventNode));
			}

			return domNode;

		case 'keyed-node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i]._1, eventNode));
			}

			return domNode;

		case 'custom':
			var domNode = vNode.impl.render(vNode.model);
			applyFacts(domNode, eventNode, vNode.facts);
			return domNode;
	}
}



////////////  APPLY FACTS  ////////////


function applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		switch (key)
		{
			case STYLE_KEY:
				applyStyles(domNode, value);
				break;

			case EVENT_KEY:
				applyEvents(domNode, eventNode, value);
				break;

			case ATTR_KEY:
				applyAttrs(domNode, value);
				break;

			case ATTR_NS_KEY:
				applyAttrsNS(domNode, value);
				break;

			case 'value':
				if (domNode[key] !== value)
				{
					domNode[key] = value;
				}
				break;

			default:
				domNode[key] = value;
				break;
		}
	}
}

function applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}

function applyEvents(domNode, eventNode, events)
{
	var allHandlers = domNode.elm_handlers || {};

	for (var key in events)
	{
		var handler = allHandlers[key];
		var value = events[key];

		if (typeof value === 'undefined')
		{
			domNode.removeEventListener(key, handler);
			allHandlers[key] = undefined;
		}
		else if (typeof handler === 'undefined')
		{
			var handler = makeEventHandler(eventNode, value);
			domNode.addEventListener(key, handler);
			allHandlers[key] = handler;
		}
		else
		{
			handler.info = value;
		}
	}

	domNode.elm_handlers = allHandlers;
}

function makeEventHandler(eventNode, info)
{
	function eventHandler(event)
	{
		var info = eventHandler.info;

		var value = A2(_elm_lang$core$Native_Json.run, info.decoder, event);

		if (value.ctor === 'Ok')
		{
			var options = info.options;
			if (options.stopPropagation)
			{
				event.stopPropagation();
			}
			if (options.preventDefault)
			{
				event.preventDefault();
			}

			var message = value._0;

			var currentEventNode = eventNode;
			while (currentEventNode)
			{
				var tagger = currentEventNode.tagger;
				if (typeof tagger === 'function')
				{
					message = tagger(message);
				}
				else
				{
					for (var i = tagger.length; i--; )
					{
						message = tagger[i](message);
					}
				}
				currentEventNode = currentEventNode.parent;
			}
		}
	};

	eventHandler.info = info;

	return eventHandler;
}

function applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		if (typeof value === 'undefined')
		{
			domNode.removeAttribute(key);
		}
		else
		{
			domNode.setAttribute(key, value);
		}
	}
}

function applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.namespace;
		var value = pair.value;

		if (typeof value === 'undefined')
		{
			domNode.removeAttributeNS(namespace, key);
		}
		else
		{
			domNode.setAttributeNS(namespace, key, value);
		}
	}
}



////////////  DIFF  ////////////


function diff(a, b)
{
	var patches = [];
	diffHelp(a, b, patches, 0);
	return patches;
}


function makePatch(type, index, data)
{
	return {
		index: index,
		type: type,
		data: data,
		domNode: undefined,
		eventNode: undefined
	};
}


function diffHelp(a, b, patches, index)
{
	if (a === b)
	{
		return;
	}

	var aType = a.type;
	var bType = b.type;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (aType !== bType)
	{
		patches.push(makePatch('p-redraw', index, b));
		return;
	}

	// Now we know that both nodes are the same type.
	switch (bType)
	{
		case 'thunk':
			var aArgs = a.args;
			var bArgs = b.args;
			var i = aArgs.length;
			var same = a.func === b.func && i === bArgs.length;
			while (same && i--)
			{
				same = aArgs[i] === bArgs[i];
			}
			if (same)
			{
				b.node = a.node;
				return;
			}
			b.node = b.thunk();
			var subPatches = [];
			diffHelp(a.node, b.node, subPatches, 0);
			if (subPatches.length > 0)
			{
				patches.push(makePatch('p-thunk', index, subPatches));
			}
			return;

		case 'tagger':
			// gather nested taggers
			var aTaggers = a.tagger;
			var bTaggers = b.tagger;
			var nesting = false;

			var aSubNode = a.node;
			while (aSubNode.type === 'tagger')
			{
				nesting = true;

				typeof aTaggers !== 'object'
					? aTaggers = [aTaggers, aSubNode.tagger]
					: aTaggers.push(aSubNode.tagger);

				aSubNode = aSubNode.node;
			}

			var bSubNode = b.node;
			while (bSubNode.type === 'tagger')
			{
				nesting = true;

				typeof bTaggers !== 'object'
					? bTaggers = [bTaggers, bSubNode.tagger]
					: bTaggers.push(bSubNode.tagger);

				bSubNode = bSubNode.node;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && aTaggers.length !== bTaggers.length)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !pairwiseRefEqual(aTaggers, bTaggers) : aTaggers !== bTaggers)
			{
				patches.push(makePatch('p-tagger', index, bTaggers));
			}

			// diff everything below the taggers
			diffHelp(aSubNode, bSubNode, patches, index + 1);
			return;

		case 'text':
			if (a.text !== b.text)
			{
				patches.push(makePatch('p-text', index, b.text));
				return;
			}

			return;

		case 'node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffChildren(a, b, patches, index);
			return;

		case 'keyed-node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffKeyedChildren(a, b, patches, index);
			return;

		case 'custom':
			if (a.impl !== b.impl)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);
			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			var patch = b.impl.diff(a,b);
			if (patch)
			{
				patches.push(makePatch('p-custom', index, patch));
				return;
			}

			return;
	}
}


// assumes the incoming arrays are the same length
function pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function diffFacts(a, b, category)
{
	var diff;

	// look for changes and removals
	for (var aKey in a)
	{
		if (aKey === STYLE_KEY || aKey === EVENT_KEY || aKey === ATTR_KEY || aKey === ATTR_NS_KEY)
		{
			var subDiff = diffFacts(a[aKey], b[aKey] || {}, aKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[aKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(aKey in b))
		{
			diff = diff || {};
			diff[aKey] =
				(typeof category === 'undefined')
					? (typeof a[aKey] === 'string' ? '' : null)
					:
				(category === STYLE_KEY)
					? ''
					:
				(category === EVENT_KEY || category === ATTR_KEY)
					? undefined
					:
				{ namespace: a[aKey].namespace, value: undefined };

			continue;
		}

		var aValue = a[aKey];
		var bValue = b[aKey];

		// reference equal, so don't worry about it
		if (aValue === bValue && aKey !== 'value'
			|| category === EVENT_KEY && equalEvents(aValue, bValue))
		{
			continue;
		}

		diff = diff || {};
		diff[aKey] = bValue;
	}

	// add new stuff
	for (var bKey in b)
	{
		if (!(bKey in a))
		{
			diff = diff || {};
			diff[bKey] = b[bKey];
		}
	}

	return diff;
}


function diffChildren(aParent, bParent, patches, rootIndex)
{
	var aChildren = aParent.children;
	var bChildren = bParent.children;

	var aLen = aChildren.length;
	var bLen = bChildren.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (aLen > bLen)
	{
		patches.push(makePatch('p-remove-last', rootIndex, aLen - bLen));
	}
	else if (aLen < bLen)
	{
		patches.push(makePatch('p-append', rootIndex, bChildren.slice(aLen)));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	var index = rootIndex;
	var minLen = aLen < bLen ? aLen : bLen;
	for (var i = 0; i < minLen; i++)
	{
		index++;
		var aChild = aChildren[i];
		diffHelp(aChild, bChildren[i], patches, index);
		index += aChild.descendantsCount || 0;
	}
}



////////////  KEYED DIFF  ////////////


function diffKeyedChildren(aParent, bParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var aChildren = aParent.children;
	var bChildren = bParent.children;
	var aLen = aChildren.length;
	var bLen = bChildren.length;
	var aIndex = 0;
	var bIndex = 0;

	var index = rootIndex;

	while (aIndex < aLen && bIndex < bLen)
	{
		var a = aChildren[aIndex];
		var b = bChildren[bIndex];

		var aKey = a._0;
		var bKey = b._0;
		var aNode = a._1;
		var bNode = b._1;

		// check if keys match

		if (aKey === bKey)
		{
			index++;
			diffHelp(aNode, bNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex++;
			bIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var aLookAhead = aIndex + 1 < aLen;
		var bLookAhead = bIndex + 1 < bLen;

		if (aLookAhead)
		{
			var aNext = aChildren[aIndex + 1];
			var aNextKey = aNext._0;
			var aNextNode = aNext._1;
			var oldMatch = bKey === aNextKey;
		}

		if (bLookAhead)
		{
			var bNext = bChildren[bIndex + 1];
			var bNextKey = bNext._0;
			var bNextNode = bNext._1;
			var newMatch = aKey === bNextKey;
		}


		// swap a and b
		if (aLookAhead && bLookAhead && newMatch && oldMatch)
		{
			index++;
			diffHelp(aNode, bNextNode, localPatches, index);
			insertNode(changes, localPatches, aKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			removeNode(changes, localPatches, aKey, aNextNode, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		// insert b
		if (bLookAhead && newMatch)
		{
			index++;
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			diffHelp(aNode, bNextNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex += 1;
			bIndex += 2;
			continue;
		}

		// remove a
		if (aLookAhead && oldMatch)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 1;
			continue;
		}

		// remove a, insert b
		if (aLookAhead && bLookAhead && aNextKey === bNextKey)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNextNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (aIndex < aLen)
	{
		index++;
		var a = aChildren[aIndex];
		var aNode = a._1;
		removeNode(changes, localPatches, a._0, aNode, index);
		index += aNode.descendantsCount || 0;
		aIndex++;
	}

	var endInserts;
	while (bIndex < bLen)
	{
		endInserts = endInserts || [];
		var b = bChildren[bIndex];
		insertNode(changes, localPatches, b._0, b._1, undefined, endInserts);
		bIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || typeof endInserts !== 'undefined')
	{
		patches.push(makePatch('p-reorder', rootIndex, {
			patches: localPatches,
			inserts: inserts,
			endInserts: endInserts
		}));
	}
}



////////////  CHANGES FROM KEYED DIFF  ////////////


var POSTFIX = '_elmW6BL';


function insertNode(changes, localPatches, key, vnode, bIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		entry = {
			tag: 'insert',
			vnode: vnode,
			index: bIndex,
			data: undefined
		};

		inserts.push({ index: bIndex, entry: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.tag === 'remove')
	{
		inserts.push({ index: bIndex, entry: entry });

		entry.tag = 'move';
		var subPatches = [];
		diffHelp(entry.vnode, vnode, subPatches, entry.index);
		entry.index = bIndex;
		entry.data.data = {
			patches: subPatches,
			entry: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	insertNode(changes, localPatches, key + POSTFIX, vnode, bIndex, inserts);
}


function removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		var patch = makePatch('p-remove', index, undefined);
		localPatches.push(patch);

		changes[key] = {
			tag: 'remove',
			vnode: vnode,
			index: index,
			data: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.tag === 'insert')
	{
		entry.tag = 'move';
		var subPatches = [];
		diffHelp(vnode, entry.vnode, subPatches, index);

		var patch = makePatch('p-remove', index, {
			patches: subPatches,
			entry: entry
		});
		localPatches.push(patch);

		return;
	}

	// this key has already been removed or moved, a duplicate!
	removeNode(changes, localPatches, key + POSTFIX, vnode, index);
}



////////////  ADD DOM NODES  ////////////
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function addDomNodes(domNode, vNode, patches, eventNode)
{
	addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.descendantsCount, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.index;

	while (index === low)
	{
		var patchType = patch.type;

		if (patchType === 'p-thunk')
		{
			addDomNodes(domNode, vNode.node, patch.data, eventNode);
		}
		else if (patchType === 'p-reorder')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var subPatches = patch.data.patches;
			if (subPatches.length > 0)
			{
				addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 'p-remove')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var data = patch.data;
			if (typeof data !== 'undefined')
			{
				data.entry.data = domNode;
				var subPatches = data.patches;
				if (subPatches.length > 0)
				{
					addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.index) > high)
		{
			return i;
		}
	}

	switch (vNode.type)
	{
		case 'tagger':
			var subNode = vNode.node;

			while (subNode.type === "tagger")
			{
				subNode = subNode.node;
			}

			return addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);

		case 'node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j];
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'keyed-node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j]._1;
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'text':
		case 'thunk':
			throw new Error('should never traverse `text` or `thunk` nodes like this');
	}
}



////////////  APPLY PATCHES  ////////////


function applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return applyPatchesHelp(rootDomNode, patches);
}

function applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.domNode
		var newNode = applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function applyPatch(domNode, patch)
{
	switch (patch.type)
	{
		case 'p-redraw':
			return applyPatchRedraw(domNode, patch.data, patch.eventNode);

		case 'p-facts':
			applyFacts(domNode, patch.eventNode, patch.data);
			return domNode;

		case 'p-text':
			domNode.replaceData(0, domNode.length, patch.data);
			return domNode;

		case 'p-thunk':
			return applyPatchesHelp(domNode, patch.data);

		case 'p-tagger':
			if (typeof domNode.elm_event_node_ref !== 'undefined')
			{
				domNode.elm_event_node_ref.tagger = patch.data;
			}
			else
			{
				domNode.elm_event_node_ref = { tagger: patch.data, parent: patch.eventNode };
			}
			return domNode;

		case 'p-remove-last':
			var i = patch.data;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 'p-append':
			var newNodes = patch.data;
			for (var i = 0; i < newNodes.length; i++)
			{
				domNode.appendChild(render(newNodes[i], patch.eventNode));
			}
			return domNode;

		case 'p-remove':
			var data = patch.data;
			if (typeof data === 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.entry;
			if (typeof entry.index !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.data = applyPatchesHelp(domNode, data.patches);
			return domNode;

		case 'p-reorder':
			return applyPatchReorder(domNode, patch);

		case 'p-custom':
			var impl = patch.data;
			return impl.applyPatch(domNode, impl.data);

		default:
			throw new Error('Ran into an unknown patch!');
	}
}


function applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = render(vNode, eventNode);

	if (typeof newNode.elm_event_node_ref === 'undefined')
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function applyPatchReorder(domNode, patch)
{
	var data = patch.data;

	// remove end inserts
	var frag = applyPatchReorderEndInsertsHelp(data.endInserts, patch);

	// removals
	domNode = applyPatchesHelp(domNode, data.patches);

	// inserts
	var inserts = data.inserts;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.entry;
		var node = entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode);
		domNode.insertBefore(node, domNode.childNodes[insert.index]);
	}

	// add end inserts
	if (typeof frag !== 'undefined')
	{
		domNode.appendChild(frag);
	}

	return domNode;
}


function applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (typeof endInserts === 'undefined')
	{
		return;
	}

	var frag = localDoc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.entry;
		frag.appendChild(entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode)
		);
	}
	return frag;
}


// PROGRAMS

var program = makeProgram(checkNoFlags);
var programWithFlags = makeProgram(checkYesFlags);

function makeProgram(flagChecker)
{
	return F2(function(debugWrap, impl)
	{
		return function(flagDecoder)
		{
			return function(object, moduleName, debugMetadata)
			{
				var checker = flagChecker(flagDecoder, moduleName);
				if (typeof debugMetadata === 'undefined')
				{
					normalSetup(impl, object, moduleName, checker);
				}
				else
				{
					debugSetup(A2(debugWrap, debugMetadata, impl), object, moduleName, checker);
				}
			};
		};
	});
}

function staticProgram(vNode)
{
	var nothing = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		_elm_lang$core$Platform_Cmd$none
	);
	return A2(program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, {
		init: nothing,
		view: function() { return vNode; },
		update: F2(function() { return nothing; }),
		subscriptions: function() { return _elm_lang$core$Platform_Sub$none; }
	})();
}


// FLAG CHECKERS

function checkNoFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flags === 'undefined')
		{
			return init;
		}

		var errorMessage =
			'The `' + moduleName + '` module does not need flags.\n'
			+ 'Initialize it with no arguments and you should be all set!';

		crash(errorMessage, domNode);
	};
}

function checkYesFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flagDecoder === 'undefined')
		{
			var errorMessage =
				'Are you trying to sneak a Never value into Elm? Trickster!\n'
				+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
				+ 'Use `program` instead if you do not want flags.'

			crash(errorMessage, domNode);
		}

		var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
		if (result.ctor === 'Ok')
		{
			return init(result._0);
		}

		var errorMessage =
			'Trying to initialize the `' + moduleName + '` module with an unexpected flag.\n'
			+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
			+ result._0;

		crash(errorMessage, domNode);
	};
}

function crash(errorMessage, domNode)
{
	if (domNode)
	{
		domNode.innerHTML =
			'<div style="padding-left:1em;">'
			+ '<h2 style="font-weight:normal;"><b>Oops!</b> Something went wrong when starting your Elm program.</h2>'
			+ '<pre style="padding-left:1em;">' + errorMessage + '</pre>'
			+ '</div>';
	}

	throw new Error(errorMessage);
}


//  NORMAL SETUP

function normalSetup(impl, object, moduleName, flagChecker)
{
	object['embed'] = function embed(node, flags)
	{
		while (node.lastChild)
		{
			node.removeChild(node.lastChild);
		}

		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update,
			impl.subscriptions,
			normalRenderer(node, impl.view)
		);
	};

	object['fullscreen'] = function fullscreen(flags)
	{
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update,
			impl.subscriptions,
			normalRenderer(document.body, impl.view)
		);
	};
}

function normalRenderer(parentNode, view)
{
	return function(tagger, initialModel)
	{
		var eventNode = { tagger: tagger, parent: undefined };
		var initialVirtualNode = view(initialModel);
		var domNode = render(initialVirtualNode, eventNode);
		parentNode.appendChild(domNode);
		return makeStepper(domNode, view, initialVirtualNode, eventNode);
	};
}


// STEPPER

var rAF =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };

function makeStepper(domNode, view, initialVirtualNode, eventNode)
{
	var state = 'NO_REQUEST';
	var currNode = initialVirtualNode;
	var nextModel;

	function updateIfNeeded()
	{
		switch (state)
		{
			case 'NO_REQUEST':
				throw new Error(
					'Unexpected draw callback.\n' +
					'Please report this to <https://github.com/elm-lang/virtual-dom/issues>.'
				);

			case 'PENDING_REQUEST':
				rAF(updateIfNeeded);
				state = 'EXTRA_REQUEST';

				var nextNode = view(nextModel);
				var patches = diff(currNode, nextNode);
				domNode = applyPatches(domNode, currNode, patches, eventNode);
				currNode = nextNode;

				return;

			case 'EXTRA_REQUEST':
				state = 'NO_REQUEST';
				return;
		}
	}

	return function stepper(model)
	{
		if (state === 'NO_REQUEST')
		{
			rAF(updateIfNeeded);
		}
		state = 'PENDING_REQUEST';
		nextModel = model;
	};
}


// DEBUG SETUP

function debugSetup(impl, object, moduleName, flagChecker)
{
	object['fullscreen'] = function fullscreen(flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, document.body, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};

	object['embed'] = function fullscreen(node, flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, node, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};
}

function scrollTask(popoutRef)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var doc = popoutRef.doc;
		if (doc)
		{
			var msgs = doc.getElementsByClassName('debugger-sidebar-messages')[0];
			if (msgs)
			{
				msgs.scrollTop = msgs.scrollHeight;
			}
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}


function debugRenderer(moduleName, parentNode, popoutRef, view, viewIn, viewOut)
{
	return function(tagger, initialModel)
	{
		var appEventNode = { tagger: tagger, parent: undefined };
		var eventNode = { tagger: tagger, parent: undefined };

		// make normal stepper
		var appVirtualNode = view(initialModel);
		var appNode = render(appVirtualNode, appEventNode);
		parentNode.appendChild(appNode);
		var appStepper = makeStepper(appNode, view, appVirtualNode, appEventNode);

		// make overlay stepper
		var overVirtualNode = viewIn(initialModel)._1;
		var overNode = render(overVirtualNode, eventNode);
		parentNode.appendChild(overNode);
		var wrappedViewIn = wrapViewIn(appEventNode, overNode, viewIn);
		var overStepper = makeStepper(overNode, wrappedViewIn, overVirtualNode, eventNode);

		// make debugger stepper
		var debugStepper = makeDebugStepper(initialModel, viewOut, eventNode, parentNode, moduleName, popoutRef);

		return function stepper(model)
		{
			appStepper(model);
			overStepper(model);
			debugStepper(model);
		}
	};
}

function makeDebugStepper(initialModel, view, eventNode, parentNode, moduleName, popoutRef)
{
	var curr;
	var domNode;

	return function stepper(model)
	{
		if (!model.isDebuggerOpen)
		{
			return;
		}

		if (!popoutRef.doc)
		{
			curr = view(model);
			domNode = openDebugWindow(moduleName, popoutRef, curr, eventNode);
			return;
		}

		// switch to document of popout
		localDoc = popoutRef.doc;

		var next = view(model);
		var patches = diff(curr, next);
		domNode = applyPatches(domNode, curr, patches, eventNode);
		curr = next;

		// switch back to normal document
		localDoc = document;
	};
}

function openDebugWindow(moduleName, popoutRef, virtualNode, eventNode)
{
	var w = 900;
	var h = 360;
	var x = screen.width - w;
	var y = screen.height - h;
	var debugWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);

	// switch to window document
	localDoc = debugWindow.document;

	popoutRef.doc = localDoc;
	localDoc.title = 'Debugger - ' + moduleName;
	localDoc.body.style.margin = '0';
	localDoc.body.style.padding = '0';
	var domNode = render(virtualNode, eventNode);
	localDoc.body.appendChild(domNode);

	localDoc.addEventListener('keydown', function(event) {
		if (event.metaKey && event.which === 82)
		{
			window.location.reload();
		}
		if (event.which === 38)
		{
			eventNode.tagger({ ctor: 'Up' });
			event.preventDefault();
		}
		if (event.which === 40)
		{
			eventNode.tagger({ ctor: 'Down' });
			event.preventDefault();
		}
	});

	function close()
	{
		popoutRef.doc = undefined;
		debugWindow.close();
	}
	window.addEventListener('unload', close);
	debugWindow.addEventListener('unload', function() {
		popoutRef.doc = undefined;
		window.removeEventListener('unload', close);
		eventNode.tagger({ ctor: 'Close' });
	});

	// switch back to the normal document
	localDoc = document;

	return domNode;
}


// BLOCK EVENTS

function wrapViewIn(appEventNode, overlayNode, viewIn)
{
	var ignorer = makeIgnorer(overlayNode);
	var blocking = 'Normal';
	var overflow;

	var normalTagger = appEventNode.tagger;
	var blockTagger = function() {};

	return function(model)
	{
		var tuple = viewIn(model);
		var newBlocking = tuple._0.ctor;
		appEventNode.tagger = newBlocking === 'Normal' ? normalTagger : blockTagger;
		if (blocking !== newBlocking)
		{
			traverse('removeEventListener', ignorer, blocking);
			traverse('addEventListener', ignorer, newBlocking);

			if (blocking === 'Normal')
			{
				overflow = document.body.style.overflow;
				document.body.style.overflow = 'hidden';
			}

			if (newBlocking === 'Normal')
			{
				document.body.style.overflow = overflow;
			}

			blocking = newBlocking;
		}
		return tuple._1;
	}
}

function traverse(verbEventListener, ignorer, blocking)
{
	switch(blocking)
	{
		case 'Normal':
			return;

		case 'Pause':
			return traverseHelp(verbEventListener, ignorer, mostEvents);

		case 'Message':
			return traverseHelp(verbEventListener, ignorer, allEvents);
	}
}

function traverseHelp(verbEventListener, handler, eventNames)
{
	for (var i = 0; i < eventNames.length; i++)
	{
		document.body[verbEventListener](eventNames[i], handler, true);
	}
}

function makeIgnorer(overlayNode)
{
	return function(event)
	{
		if (event.type === 'keydown' && event.metaKey && event.which === 82)
		{
			return;
		}

		var isScroll = event.type === 'scroll' || event.type === 'wheel';

		var node = event.target;
		while (node !== null)
		{
			if (node.className === 'elm-overlay-message-details' && isScroll)
			{
				return;
			}

			if (node === overlayNode && !isScroll)
			{
				return;
			}
			node = node.parentNode;
		}

		event.stopPropagation();
		event.preventDefault();
	}
}

var mostEvents = [
	'click', 'dblclick', 'mousemove',
	'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
	'touchstart', 'touchend', 'touchcancel', 'touchmove',
	'pointerdown', 'pointerup', 'pointerover', 'pointerout',
	'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
	'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
	'keyup', 'keydown', 'keypress',
	'input', 'change',
	'focus', 'blur'
];

var allEvents = mostEvents.concat('wheel', 'scroll');


return {
	node: node,
	text: text,
	custom: custom,
	map: F2(map),

	on: F3(on),
	style: style,
	property: F2(property),
	attribute: F2(attribute),
	attributeNS: F3(attributeNS),
	mapProperty: F2(mapProperty),

	lazy: F2(lazy),
	lazy2: F3(lazy2),
	lazy3: F4(lazy3),
	keyedNode: F3(keyedNode),

	program: program,
	programWithFlags: programWithFlags,
	staticProgram: staticProgram
};

}();

var _elm_lang$virtual_dom$VirtualDom$programWithFlags = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.programWithFlags, _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags, impl);
};
var _elm_lang$virtual_dom$VirtualDom$program = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, impl);
};
var _elm_lang$virtual_dom$VirtualDom$keyedNode = _elm_lang$virtual_dom$Native_VirtualDom.keyedNode;
var _elm_lang$virtual_dom$VirtualDom$lazy3 = _elm_lang$virtual_dom$Native_VirtualDom.lazy3;
var _elm_lang$virtual_dom$VirtualDom$lazy2 = _elm_lang$virtual_dom$Native_VirtualDom.lazy2;
var _elm_lang$virtual_dom$VirtualDom$lazy = _elm_lang$virtual_dom$Native_VirtualDom.lazy;
var _elm_lang$virtual_dom$VirtualDom$defaultOptions = {stopPropagation: false, preventDefault: false};
var _elm_lang$virtual_dom$VirtualDom$onWithOptions = _elm_lang$virtual_dom$Native_VirtualDom.on;
var _elm_lang$virtual_dom$VirtualDom$on = F2(
	function (eventName, decoder) {
		return A3(_elm_lang$virtual_dom$VirtualDom$onWithOptions, eventName, _elm_lang$virtual_dom$VirtualDom$defaultOptions, decoder);
	});
var _elm_lang$virtual_dom$VirtualDom$style = _elm_lang$virtual_dom$Native_VirtualDom.style;
var _elm_lang$virtual_dom$VirtualDom$mapProperty = _elm_lang$virtual_dom$Native_VirtualDom.mapProperty;
var _elm_lang$virtual_dom$VirtualDom$attributeNS = _elm_lang$virtual_dom$Native_VirtualDom.attributeNS;
var _elm_lang$virtual_dom$VirtualDom$attribute = _elm_lang$virtual_dom$Native_VirtualDom.attribute;
var _elm_lang$virtual_dom$VirtualDom$property = _elm_lang$virtual_dom$Native_VirtualDom.property;
var _elm_lang$virtual_dom$VirtualDom$map = _elm_lang$virtual_dom$Native_VirtualDom.map;
var _elm_lang$virtual_dom$VirtualDom$text = _elm_lang$virtual_dom$Native_VirtualDom.text;
var _elm_lang$virtual_dom$VirtualDom$node = _elm_lang$virtual_dom$Native_VirtualDom.node;
var _elm_lang$virtual_dom$VirtualDom$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});
var _elm_lang$virtual_dom$VirtualDom$Node = {ctor: 'Node'};
var _elm_lang$virtual_dom$VirtualDom$Property = {ctor: 'Property'};

var _elm_lang$html$Html$programWithFlags = _elm_lang$virtual_dom$VirtualDom$programWithFlags;
var _elm_lang$html$Html$program = _elm_lang$virtual_dom$VirtualDom$program;
var _elm_lang$html$Html$beginnerProgram = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$html$Html$program(
		{
			init: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_p1.model,
				{ctor: '[]'}),
			update: F2(
				function (msg, model) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						A2(_p1.update, msg, model),
						{ctor: '[]'});
				}),
			view: _p1.view,
			subscriptions: function (_p2) {
				return _elm_lang$core$Platform_Sub$none;
			}
		});
};
var _elm_lang$html$Html$map = _elm_lang$virtual_dom$VirtualDom$map;
var _elm_lang$html$Html$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$html$Html$node = _elm_lang$virtual_dom$VirtualDom$node;
var _elm_lang$html$Html$body = _elm_lang$html$Html$node('body');
var _elm_lang$html$Html$section = _elm_lang$html$Html$node('section');
var _elm_lang$html$Html$nav = _elm_lang$html$Html$node('nav');
var _elm_lang$html$Html$article = _elm_lang$html$Html$node('article');
var _elm_lang$html$Html$aside = _elm_lang$html$Html$node('aside');
var _elm_lang$html$Html$h1 = _elm_lang$html$Html$node('h1');
var _elm_lang$html$Html$h2 = _elm_lang$html$Html$node('h2');
var _elm_lang$html$Html$h3 = _elm_lang$html$Html$node('h3');
var _elm_lang$html$Html$h4 = _elm_lang$html$Html$node('h4');
var _elm_lang$html$Html$h5 = _elm_lang$html$Html$node('h5');
var _elm_lang$html$Html$h6 = _elm_lang$html$Html$node('h6');
var _elm_lang$html$Html$header = _elm_lang$html$Html$node('header');
var _elm_lang$html$Html$footer = _elm_lang$html$Html$node('footer');
var _elm_lang$html$Html$address = _elm_lang$html$Html$node('address');
var _elm_lang$html$Html$main_ = _elm_lang$html$Html$node('main');
var _elm_lang$html$Html$p = _elm_lang$html$Html$node('p');
var _elm_lang$html$Html$hr = _elm_lang$html$Html$node('hr');
var _elm_lang$html$Html$pre = _elm_lang$html$Html$node('pre');
var _elm_lang$html$Html$blockquote = _elm_lang$html$Html$node('blockquote');
var _elm_lang$html$Html$ol = _elm_lang$html$Html$node('ol');
var _elm_lang$html$Html$ul = _elm_lang$html$Html$node('ul');
var _elm_lang$html$Html$li = _elm_lang$html$Html$node('li');
var _elm_lang$html$Html$dl = _elm_lang$html$Html$node('dl');
var _elm_lang$html$Html$dt = _elm_lang$html$Html$node('dt');
var _elm_lang$html$Html$dd = _elm_lang$html$Html$node('dd');
var _elm_lang$html$Html$figure = _elm_lang$html$Html$node('figure');
var _elm_lang$html$Html$figcaption = _elm_lang$html$Html$node('figcaption');
var _elm_lang$html$Html$div = _elm_lang$html$Html$node('div');
var _elm_lang$html$Html$a = _elm_lang$html$Html$node('a');
var _elm_lang$html$Html$em = _elm_lang$html$Html$node('em');
var _elm_lang$html$Html$strong = _elm_lang$html$Html$node('strong');
var _elm_lang$html$Html$small = _elm_lang$html$Html$node('small');
var _elm_lang$html$Html$s = _elm_lang$html$Html$node('s');
var _elm_lang$html$Html$cite = _elm_lang$html$Html$node('cite');
var _elm_lang$html$Html$q = _elm_lang$html$Html$node('q');
var _elm_lang$html$Html$dfn = _elm_lang$html$Html$node('dfn');
var _elm_lang$html$Html$abbr = _elm_lang$html$Html$node('abbr');
var _elm_lang$html$Html$time = _elm_lang$html$Html$node('time');
var _elm_lang$html$Html$code = _elm_lang$html$Html$node('code');
var _elm_lang$html$Html$var = _elm_lang$html$Html$node('var');
var _elm_lang$html$Html$samp = _elm_lang$html$Html$node('samp');
var _elm_lang$html$Html$kbd = _elm_lang$html$Html$node('kbd');
var _elm_lang$html$Html$sub = _elm_lang$html$Html$node('sub');
var _elm_lang$html$Html$sup = _elm_lang$html$Html$node('sup');
var _elm_lang$html$Html$i = _elm_lang$html$Html$node('i');
var _elm_lang$html$Html$b = _elm_lang$html$Html$node('b');
var _elm_lang$html$Html$u = _elm_lang$html$Html$node('u');
var _elm_lang$html$Html$mark = _elm_lang$html$Html$node('mark');
var _elm_lang$html$Html$ruby = _elm_lang$html$Html$node('ruby');
var _elm_lang$html$Html$rt = _elm_lang$html$Html$node('rt');
var _elm_lang$html$Html$rp = _elm_lang$html$Html$node('rp');
var _elm_lang$html$Html$bdi = _elm_lang$html$Html$node('bdi');
var _elm_lang$html$Html$bdo = _elm_lang$html$Html$node('bdo');
var _elm_lang$html$Html$span = _elm_lang$html$Html$node('span');
var _elm_lang$html$Html$br = _elm_lang$html$Html$node('br');
var _elm_lang$html$Html$wbr = _elm_lang$html$Html$node('wbr');
var _elm_lang$html$Html$ins = _elm_lang$html$Html$node('ins');
var _elm_lang$html$Html$del = _elm_lang$html$Html$node('del');
var _elm_lang$html$Html$img = _elm_lang$html$Html$node('img');
var _elm_lang$html$Html$iframe = _elm_lang$html$Html$node('iframe');
var _elm_lang$html$Html$embed = _elm_lang$html$Html$node('embed');
var _elm_lang$html$Html$object = _elm_lang$html$Html$node('object');
var _elm_lang$html$Html$param = _elm_lang$html$Html$node('param');
var _elm_lang$html$Html$video = _elm_lang$html$Html$node('video');
var _elm_lang$html$Html$audio = _elm_lang$html$Html$node('audio');
var _elm_lang$html$Html$source = _elm_lang$html$Html$node('source');
var _elm_lang$html$Html$track = _elm_lang$html$Html$node('track');
var _elm_lang$html$Html$canvas = _elm_lang$html$Html$node('canvas');
var _elm_lang$html$Html$math = _elm_lang$html$Html$node('math');
var _elm_lang$html$Html$table = _elm_lang$html$Html$node('table');
var _elm_lang$html$Html$caption = _elm_lang$html$Html$node('caption');
var _elm_lang$html$Html$colgroup = _elm_lang$html$Html$node('colgroup');
var _elm_lang$html$Html$col = _elm_lang$html$Html$node('col');
var _elm_lang$html$Html$tbody = _elm_lang$html$Html$node('tbody');
var _elm_lang$html$Html$thead = _elm_lang$html$Html$node('thead');
var _elm_lang$html$Html$tfoot = _elm_lang$html$Html$node('tfoot');
var _elm_lang$html$Html$tr = _elm_lang$html$Html$node('tr');
var _elm_lang$html$Html$td = _elm_lang$html$Html$node('td');
var _elm_lang$html$Html$th = _elm_lang$html$Html$node('th');
var _elm_lang$html$Html$form = _elm_lang$html$Html$node('form');
var _elm_lang$html$Html$fieldset = _elm_lang$html$Html$node('fieldset');
var _elm_lang$html$Html$legend = _elm_lang$html$Html$node('legend');
var _elm_lang$html$Html$label = _elm_lang$html$Html$node('label');
var _elm_lang$html$Html$input = _elm_lang$html$Html$node('input');
var _elm_lang$html$Html$button = _elm_lang$html$Html$node('button');
var _elm_lang$html$Html$select = _elm_lang$html$Html$node('select');
var _elm_lang$html$Html$datalist = _elm_lang$html$Html$node('datalist');
var _elm_lang$html$Html$optgroup = _elm_lang$html$Html$node('optgroup');
var _elm_lang$html$Html$option = _elm_lang$html$Html$node('option');
var _elm_lang$html$Html$textarea = _elm_lang$html$Html$node('textarea');
var _elm_lang$html$Html$keygen = _elm_lang$html$Html$node('keygen');
var _elm_lang$html$Html$output = _elm_lang$html$Html$node('output');
var _elm_lang$html$Html$progress = _elm_lang$html$Html$node('progress');
var _elm_lang$html$Html$meter = _elm_lang$html$Html$node('meter');
var _elm_lang$html$Html$details = _elm_lang$html$Html$node('details');
var _elm_lang$html$Html$summary = _elm_lang$html$Html$node('summary');
var _elm_lang$html$Html$menuitem = _elm_lang$html$Html$node('menuitem');
var _elm_lang$html$Html$menu = _elm_lang$html$Html$node('menu');

var _elm_lang$html$Html_Attributes$map = _elm_lang$virtual_dom$VirtualDom$mapProperty;
var _elm_lang$html$Html_Attributes$attribute = _elm_lang$virtual_dom$VirtualDom$attribute;
var _elm_lang$html$Html_Attributes$contextmenu = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'contextmenu', value);
};
var _elm_lang$html$Html_Attributes$draggable = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'draggable', value);
};
var _elm_lang$html$Html_Attributes$itemprop = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'itemprop', value);
};
var _elm_lang$html$Html_Attributes$tabindex = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'tabIndex',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$charset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'charset', value);
};
var _elm_lang$html$Html_Attributes$height = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'height',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$width = function (value) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'width',
		_elm_lang$core$Basics$toString(value));
};
var _elm_lang$html$Html_Attributes$formaction = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'formAction', value);
};
var _elm_lang$html$Html_Attributes$list = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'list', value);
};
var _elm_lang$html$Html_Attributes$minlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'minLength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$maxlength = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'maxlength',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$size = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'size',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$form = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'form', value);
};
var _elm_lang$html$Html_Attributes$cols = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'cols',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rows = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rows',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$challenge = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'challenge', value);
};
var _elm_lang$html$Html_Attributes$media = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'media', value);
};
var _elm_lang$html$Html_Attributes$rel = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'rel', value);
};
var _elm_lang$html$Html_Attributes$datetime = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'datetime', value);
};
var _elm_lang$html$Html_Attributes$pubdate = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'pubdate', value);
};
var _elm_lang$html$Html_Attributes$colspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'colspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$rowspan = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$attribute,
		'rowspan',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$manifest = function (value) {
	return A2(_elm_lang$html$Html_Attributes$attribute, 'manifest', value);
};
var _elm_lang$html$Html_Attributes$property = _elm_lang$virtual_dom$VirtualDom$property;
var _elm_lang$html$Html_Attributes$stringProperty = F2(
	function (name, string) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$string(string));
	});
var _elm_lang$html$Html_Attributes$class = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'className', name);
};
var _elm_lang$html$Html_Attributes$id = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'id', name);
};
var _elm_lang$html$Html_Attributes$title = function (name) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'title', name);
};
var _elm_lang$html$Html_Attributes$accesskey = function ($char) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'accessKey',
		_elm_lang$core$String$fromChar($char));
};
var _elm_lang$html$Html_Attributes$dir = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dir', value);
};
var _elm_lang$html$Html_Attributes$dropzone = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'dropzone', value);
};
var _elm_lang$html$Html_Attributes$lang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'lang', value);
};
var _elm_lang$html$Html_Attributes$content = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'content', value);
};
var _elm_lang$html$Html_Attributes$httpEquiv = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'httpEquiv', value);
};
var _elm_lang$html$Html_Attributes$language = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'language', value);
};
var _elm_lang$html$Html_Attributes$src = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'src', value);
};
var _elm_lang$html$Html_Attributes$alt = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'alt', value);
};
var _elm_lang$html$Html_Attributes$preload = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'preload', value);
};
var _elm_lang$html$Html_Attributes$poster = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'poster', value);
};
var _elm_lang$html$Html_Attributes$kind = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'kind', value);
};
var _elm_lang$html$Html_Attributes$srclang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srclang', value);
};
var _elm_lang$html$Html_Attributes$sandbox = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'sandbox', value);
};
var _elm_lang$html$Html_Attributes$srcdoc = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'srcdoc', value);
};
var _elm_lang$html$Html_Attributes$type_ = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'type', value);
};
var _elm_lang$html$Html_Attributes$value = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'value', value);
};
var _elm_lang$html$Html_Attributes$defaultValue = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'defaultValue', value);
};
var _elm_lang$html$Html_Attributes$placeholder = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'placeholder', value);
};
var _elm_lang$html$Html_Attributes$accept = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'accept', value);
};
var _elm_lang$html$Html_Attributes$acceptCharset = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'acceptCharset', value);
};
var _elm_lang$html$Html_Attributes$action = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'action', value);
};
var _elm_lang$html$Html_Attributes$autocomplete = function (bool) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'autocomplete',
		bool ? 'on' : 'off');
};
var _elm_lang$html$Html_Attributes$enctype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'enctype', value);
};
var _elm_lang$html$Html_Attributes$method = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'method', value);
};
var _elm_lang$html$Html_Attributes$name = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'name', value);
};
var _elm_lang$html$Html_Attributes$pattern = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'pattern', value);
};
var _elm_lang$html$Html_Attributes$for = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'htmlFor', value);
};
var _elm_lang$html$Html_Attributes$max = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'max', value);
};
var _elm_lang$html$Html_Attributes$min = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'min', value);
};
var _elm_lang$html$Html_Attributes$step = function (n) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'step', n);
};
var _elm_lang$html$Html_Attributes$wrap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'wrap', value);
};
var _elm_lang$html$Html_Attributes$usemap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'useMap', value);
};
var _elm_lang$html$Html_Attributes$shape = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'shape', value);
};
var _elm_lang$html$Html_Attributes$coords = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'coords', value);
};
var _elm_lang$html$Html_Attributes$keytype = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'keytype', value);
};
var _elm_lang$html$Html_Attributes$align = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'align', value);
};
var _elm_lang$html$Html_Attributes$cite = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'cite', value);
};
var _elm_lang$html$Html_Attributes$href = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'href', value);
};
var _elm_lang$html$Html_Attributes$target = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'target', value);
};
var _elm_lang$html$Html_Attributes$downloadAs = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'download', value);
};
var _elm_lang$html$Html_Attributes$hreflang = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'hreflang', value);
};
var _elm_lang$html$Html_Attributes$ping = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'ping', value);
};
var _elm_lang$html$Html_Attributes$start = function (n) {
	return A2(
		_elm_lang$html$Html_Attributes$stringProperty,
		'start',
		_elm_lang$core$Basics$toString(n));
};
var _elm_lang$html$Html_Attributes$headers = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'headers', value);
};
var _elm_lang$html$Html_Attributes$scope = function (value) {
	return A2(_elm_lang$html$Html_Attributes$stringProperty, 'scope', value);
};
var _elm_lang$html$Html_Attributes$boolProperty = F2(
	function (name, bool) {
		return A2(
			_elm_lang$html$Html_Attributes$property,
			name,
			_elm_lang$core$Json_Encode$bool(bool));
	});
var _elm_lang$html$Html_Attributes$hidden = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'hidden', bool);
};
var _elm_lang$html$Html_Attributes$contenteditable = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'contentEditable', bool);
};
var _elm_lang$html$Html_Attributes$spellcheck = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'spellcheck', bool);
};
var _elm_lang$html$Html_Attributes$async = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'async', bool);
};
var _elm_lang$html$Html_Attributes$defer = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'defer', bool);
};
var _elm_lang$html$Html_Attributes$scoped = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'scoped', bool);
};
var _elm_lang$html$Html_Attributes$autoplay = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autoplay', bool);
};
var _elm_lang$html$Html_Attributes$controls = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'controls', bool);
};
var _elm_lang$html$Html_Attributes$loop = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'loop', bool);
};
var _elm_lang$html$Html_Attributes$default = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'default', bool);
};
var _elm_lang$html$Html_Attributes$seamless = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'seamless', bool);
};
var _elm_lang$html$Html_Attributes$checked = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'checked', bool);
};
var _elm_lang$html$Html_Attributes$selected = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'selected', bool);
};
var _elm_lang$html$Html_Attributes$autofocus = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'autofocus', bool);
};
var _elm_lang$html$Html_Attributes$disabled = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'disabled', bool);
};
var _elm_lang$html$Html_Attributes$multiple = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'multiple', bool);
};
var _elm_lang$html$Html_Attributes$novalidate = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'noValidate', bool);
};
var _elm_lang$html$Html_Attributes$readonly = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'readOnly', bool);
};
var _elm_lang$html$Html_Attributes$required = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'required', bool);
};
var _elm_lang$html$Html_Attributes$ismap = function (value) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'isMap', value);
};
var _elm_lang$html$Html_Attributes$download = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'download', bool);
};
var _elm_lang$html$Html_Attributes$reversed = function (bool) {
	return A2(_elm_lang$html$Html_Attributes$boolProperty, 'reversed', bool);
};
var _elm_lang$html$Html_Attributes$classList = function (list) {
	return _elm_lang$html$Html_Attributes$class(
		A2(
			_elm_lang$core$String$join,
			' ',
			A2(
				_elm_lang$core$List$map,
				_elm_lang$core$Tuple$first,
				A2(_elm_lang$core$List$filter, _elm_lang$core$Tuple$second, list))));
};
var _elm_lang$html$Html_Attributes$style = _elm_lang$virtual_dom$VirtualDom$style;

var _elm_lang$html$Html_Events$keyCode = A2(_elm_lang$core$Json_Decode$field, 'keyCode', _elm_lang$core$Json_Decode$int);
var _elm_lang$html$Html_Events$targetChecked = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'checked',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$bool);
var _elm_lang$html$Html_Events$targetValue = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'target',
		_1: {
			ctor: '::',
			_0: 'value',
			_1: {ctor: '[]'}
		}
	},
	_elm_lang$core$Json_Decode$string);
var _elm_lang$html$Html_Events$defaultOptions = _elm_lang$virtual_dom$VirtualDom$defaultOptions;
var _elm_lang$html$Html_Events$onWithOptions = _elm_lang$virtual_dom$VirtualDom$onWithOptions;
var _elm_lang$html$Html_Events$on = _elm_lang$virtual_dom$VirtualDom$on;
var _elm_lang$html$Html_Events$onFocus = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'focus',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onBlur = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'blur',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onSubmitOptions = _elm_lang$core$Native_Utils.update(
	_elm_lang$html$Html_Events$defaultOptions,
	{preventDefault: true});
var _elm_lang$html$Html_Events$onSubmit = function (msg) {
	return A3(
		_elm_lang$html$Html_Events$onWithOptions,
		'submit',
		_elm_lang$html$Html_Events$onSubmitOptions,
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onCheck = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'change',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetChecked));
};
var _elm_lang$html$Html_Events$onInput = function (tagger) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'input',
		A2(_elm_lang$core$Json_Decode$map, tagger, _elm_lang$html$Html_Events$targetValue));
};
var _elm_lang$html$Html_Events$onMouseOut = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseout',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseOver = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseover',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseLeave = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseleave',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseEnter = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseenter',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseUp = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mouseup',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onMouseDown = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'mousedown',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onDoubleClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'dblclick',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$onClick = function (msg) {
	return A2(
		_elm_lang$html$Html_Events$on,
		'click',
		_elm_lang$core$Json_Decode$succeed(msg));
};
var _elm_lang$html$Html_Events$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});

var _rundis$elm_bootstrap$Bootstrap_Internal_Role$toClass = F2(
	function (prefix, role) {
		return _elm_lang$html$Html_Attributes$class(
			A2(
				_elm_lang$core$Basics_ops['++'],
				prefix,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'-',
					function () {
						var _p0 = role;
						switch (_p0.ctor) {
							case 'Primary':
								return 'primary';
							case 'Secondary':
								return 'secondary';
							case 'Success':
								return 'success';
							case 'Info':
								return 'info';
							case 'Warning':
								return 'warning';
							case 'Danger':
								return 'danger';
							case 'Light':
								return 'light';
							default:
								return 'dark';
						}
					}())));
	});
var _rundis$elm_bootstrap$Bootstrap_Internal_Role$Dark = {ctor: 'Dark'};
var _rundis$elm_bootstrap$Bootstrap_Internal_Role$Light = {ctor: 'Light'};
var _rundis$elm_bootstrap$Bootstrap_Internal_Role$Danger = {ctor: 'Danger'};
var _rundis$elm_bootstrap$Bootstrap_Internal_Role$Warning = {ctor: 'Warning'};
var _rundis$elm_bootstrap$Bootstrap_Internal_Role$Info = {ctor: 'Info'};
var _rundis$elm_bootstrap$Bootstrap_Internal_Role$Success = {ctor: 'Success'};
var _rundis$elm_bootstrap$Bootstrap_Internal_Role$Secondary = {ctor: 'Secondary'};
var _rundis$elm_bootstrap$Bootstrap_Internal_Role$Primary = {ctor: 'Primary'};

var _rundis$elm_bootstrap$Bootstrap_Alert$headingPrivate = F3(
	function (elemFn, attributes, children) {
		return A2(
			elemFn,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('alert-header'),
				_1: attributes
			},
			children);
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$h6 = F2(
	function (attributes, children) {
		return A3(_rundis$elm_bootstrap$Bootstrap_Alert$headingPrivate, _elm_lang$html$Html$h6, attributes, children);
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$h5 = F2(
	function (attributes, children) {
		return A3(_rundis$elm_bootstrap$Bootstrap_Alert$headingPrivate, _elm_lang$html$Html$h5, attributes, children);
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$h4 = F2(
	function (attributes, children) {
		return A3(_rundis$elm_bootstrap$Bootstrap_Alert$headingPrivate, _elm_lang$html$Html$h4, attributes, children);
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$h3 = F2(
	function (attributes, children) {
		return A3(_rundis$elm_bootstrap$Bootstrap_Alert$headingPrivate, _elm_lang$html$Html$h3, attributes, children);
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$h2 = F2(
	function (attributes, children) {
		return A3(_rundis$elm_bootstrap$Bootstrap_Alert$headingPrivate, _elm_lang$html$Html$h2, attributes, children);
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$h1 = F2(
	function (attributes, children) {
		return A3(_rundis$elm_bootstrap$Bootstrap_Alert$headingPrivate, _elm_lang$html$Html$h1, attributes, children);
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$link = F2(
	function (attributes, children) {
		return A2(
			_elm_lang$html$Html$a,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('alert-link'),
				_1: attributes
			},
			children);
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$isDismissable = function (configRec) {
	var _p0 = configRec.dismissable;
	if (_p0.ctor === 'Just') {
		return true;
	} else {
		return false;
	}
};
var _rundis$elm_bootstrap$Bootstrap_Alert$injectButton = F2(
	function (btn, children) {
		var _p1 = children;
		if (_p1.ctor === '::') {
			return {
				ctor: '::',
				_0: _p1._0,
				_1: {ctor: '::', _0: btn, _1: _p1._1}
			};
		} else {
			return {
				ctor: '::',
				_0: btn,
				_1: {ctor: '[]'}
			};
		}
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$ConfigRec = F6(
	function (a, b, c, d, e, f) {
		return {visibility: a, dismissable: b, attributes: c, children: d, role: e, withAnimation: f};
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$Config = function (a) {
	return {ctor: 'Config', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Alert$role = F2(
	function (role, _p2) {
		var _p3 = _p2;
		return _rundis$elm_bootstrap$Bootstrap_Alert$Config(
			_elm_lang$core$Native_Utils.update(
				_p3._0,
				{role: role}));
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$primary = function (config) {
	return A2(_rundis$elm_bootstrap$Bootstrap_Alert$role, _rundis$elm_bootstrap$Bootstrap_Internal_Role$Primary, config);
};
var _rundis$elm_bootstrap$Bootstrap_Alert$secondary = function (config) {
	return A2(_rundis$elm_bootstrap$Bootstrap_Alert$role, _rundis$elm_bootstrap$Bootstrap_Internal_Role$Secondary, config);
};
var _rundis$elm_bootstrap$Bootstrap_Alert$success = function (config) {
	return A2(_rundis$elm_bootstrap$Bootstrap_Alert$role, _rundis$elm_bootstrap$Bootstrap_Internal_Role$Success, config);
};
var _rundis$elm_bootstrap$Bootstrap_Alert$info = function (config) {
	return A2(_rundis$elm_bootstrap$Bootstrap_Alert$role, _rundis$elm_bootstrap$Bootstrap_Internal_Role$Info, config);
};
var _rundis$elm_bootstrap$Bootstrap_Alert$warning = function (config) {
	return A2(_rundis$elm_bootstrap$Bootstrap_Alert$role, _rundis$elm_bootstrap$Bootstrap_Internal_Role$Warning, config);
};
var _rundis$elm_bootstrap$Bootstrap_Alert$danger = function (config) {
	return A2(_rundis$elm_bootstrap$Bootstrap_Alert$role, _rundis$elm_bootstrap$Bootstrap_Internal_Role$Danger, config);
};
var _rundis$elm_bootstrap$Bootstrap_Alert$dark = function (config) {
	return A2(_rundis$elm_bootstrap$Bootstrap_Alert$role, _rundis$elm_bootstrap$Bootstrap_Internal_Role$Dark, config);
};
var _rundis$elm_bootstrap$Bootstrap_Alert$light = function (config) {
	return A2(_rundis$elm_bootstrap$Bootstrap_Alert$role, _rundis$elm_bootstrap$Bootstrap_Internal_Role$Light, config);
};
var _rundis$elm_bootstrap$Bootstrap_Alert$attrs = F2(
	function (attributes, _p4) {
		var _p5 = _p4;
		return _rundis$elm_bootstrap$Bootstrap_Alert$Config(
			_elm_lang$core$Native_Utils.update(
				_p5._0,
				{attributes: attributes}));
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$dismissable = F2(
	function (dismissMsg, _p6) {
		var _p7 = _p6;
		return _rundis$elm_bootstrap$Bootstrap_Alert$Config(
			_elm_lang$core$Native_Utils.update(
				_p7._0,
				{
					dismissable: _elm_lang$core$Maybe$Just(dismissMsg)
				}));
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$dismissableWithAnimation = F2(
	function (dismissMsg, _p8) {
		var _p9 = _p8;
		return _rundis$elm_bootstrap$Bootstrap_Alert$Config(
			_elm_lang$core$Native_Utils.update(
				_p9._0,
				{
					dismissable: _elm_lang$core$Maybe$Just(dismissMsg),
					withAnimation: true
				}));
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$children = F2(
	function (children, _p10) {
		var _p11 = _p10;
		return _rundis$elm_bootstrap$Bootstrap_Alert$Config(
			_elm_lang$core$Native_Utils.update(
				_p11._0,
				{children: children}));
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$Closed = {ctor: 'Closed'};
var _rundis$elm_bootstrap$Bootstrap_Alert$closed = _rundis$elm_bootstrap$Bootstrap_Alert$Closed;
var _rundis$elm_bootstrap$Bootstrap_Alert$FadeClose = {ctor: 'FadeClose'};
var _rundis$elm_bootstrap$Bootstrap_Alert$subscriptions = F2(
	function (visibility, animateMsg) {
		var _p12 = visibility;
		if (_p12.ctor === 'StartClose') {
			return _elm_lang$animation_frame$AnimationFrame$times(
				function (_p13) {
					return animateMsg(_rundis$elm_bootstrap$Bootstrap_Alert$FadeClose);
				});
		} else {
			return _elm_lang$core$Platform_Sub$none;
		}
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$StartClose = {ctor: 'StartClose'};
var _rundis$elm_bootstrap$Bootstrap_Alert$clickHandler = F2(
	function (visibility, configRec) {
		var handleClick = F2(
			function (viz, toMsg) {
				return _elm_lang$html$Html_Events$onClick(
					toMsg(viz));
			});
		var _p14 = configRec.dismissable;
		if (_p14.ctor === 'Just') {
			var _p15 = _p14._0;
			return {
				ctor: '::',
				_0: configRec.withAnimation ? A2(handleClick, _rundis$elm_bootstrap$Bootstrap_Alert$StartClose, _p15) : A2(handleClick, _rundis$elm_bootstrap$Bootstrap_Alert$Closed, _p15),
				_1: {ctor: '[]'}
			};
		} else {
			return {ctor: '[]'};
		}
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$maybeAddDismissButton = F3(
	function (visibilty, configRec, children) {
		return _rundis$elm_bootstrap$Bootstrap_Alert$isDismissable(configRec) ? A2(
			_rundis$elm_bootstrap$Bootstrap_Alert$injectButton,
			A2(
				_elm_lang$html$Html$button,
				A2(
					_elm_lang$core$Basics_ops['++'],
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$type_('button'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('close'),
							_1: {
								ctor: '::',
								_0: A2(_elm_lang$html$Html_Attributes$attribute, 'aria-label', 'close'),
								_1: {ctor: '[]'}
							}
						}
					},
					A2(_rundis$elm_bootstrap$Bootstrap_Alert$clickHandler, visibilty, configRec)),
				{
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$span,
						{
							ctor: '::',
							_0: A2(_elm_lang$html$Html_Attributes$attribute, 'aria-hidden', 'true'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _elm_lang$html$Html$text('×'),
							_1: {ctor: '[]'}
						}),
					_1: {ctor: '[]'}
				}),
			children) : children;
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$Shown = {ctor: 'Shown'};
var _rundis$elm_bootstrap$Bootstrap_Alert$shown = _rundis$elm_bootstrap$Bootstrap_Alert$Shown;
var _rundis$elm_bootstrap$Bootstrap_Alert$config = _rundis$elm_bootstrap$Bootstrap_Alert$Config(
	{
		visibility: _rundis$elm_bootstrap$Bootstrap_Alert$Shown,
		dismissable: _elm_lang$core$Maybe$Nothing,
		attributes: {ctor: '[]'},
		children: {ctor: '[]'},
		role: _rundis$elm_bootstrap$Bootstrap_Internal_Role$Secondary,
		withAnimation: false
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$viewAttributes = F2(
	function (visibility, configRec) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: A2(_elm_lang$html$Html_Attributes$attribute, 'role', 'alert'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$classList(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'alert', _1: true},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'alert-dismissible',
									_1: _rundis$elm_bootstrap$Bootstrap_Alert$isDismissable(configRec)
								},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'fade', _1: configRec.withAnimation},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: 'show',
											_1: _elm_lang$core$Native_Utils.eq(visibility, _rundis$elm_bootstrap$Bootstrap_Alert$Shown)
										},
										_1: {ctor: '[]'}
									}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: A2(_rundis$elm_bootstrap$Bootstrap_Internal_Role$toClass, 'alert', configRec.role),
						_1: {ctor: '[]'}
					}
				}
			},
			_elm_lang$core$Native_Utils.eq(visibility, _rundis$elm_bootstrap$Bootstrap_Alert$Closed) ? {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$style(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'display', _1: 'none'},
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			} : A2(
				_elm_lang$core$Basics_ops['++'],
				{ctor: '[]'},
				function () {
					if (configRec.withAnimation) {
						var _p16 = configRec.dismissable;
						if (_p16.ctor === 'Just') {
							return {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html_Events$on,
									'transitionend',
									_elm_lang$core$Json_Decode$succeed(
										_p16._0(_rundis$elm_bootstrap$Bootstrap_Alert$Closed))),
								_1: {ctor: '[]'}
							};
						} else {
							return {ctor: '[]'};
						}
					} else {
						return {ctor: '[]'};
					}
				}()));
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$view = F2(
	function (visibility, _p17) {
		var _p18 = _p17;
		var _p19 = _p18._0;
		return A2(
			_elm_lang$html$Html$div,
			A2(_rundis$elm_bootstrap$Bootstrap_Alert$viewAttributes, visibility, _p19),
			A3(_rundis$elm_bootstrap$Bootstrap_Alert$maybeAddDismissButton, visibility, _p19, _p19.children));
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$simple = F3(
	function (role_, attributes, children_) {
		return A2(
			_rundis$elm_bootstrap$Bootstrap_Alert$view,
			_rundis$elm_bootstrap$Bootstrap_Alert$Shown,
			A2(
				_rundis$elm_bootstrap$Bootstrap_Alert$children,
				children_,
				A2(
					_rundis$elm_bootstrap$Bootstrap_Alert$attrs,
					attributes,
					A2(_rundis$elm_bootstrap$Bootstrap_Alert$role, role_, _rundis$elm_bootstrap$Bootstrap_Alert$config))));
	});
var _rundis$elm_bootstrap$Bootstrap_Alert$simplePrimary = _rundis$elm_bootstrap$Bootstrap_Alert$simple(_rundis$elm_bootstrap$Bootstrap_Internal_Role$Primary);
var _rundis$elm_bootstrap$Bootstrap_Alert$simpleSecondary = _rundis$elm_bootstrap$Bootstrap_Alert$simple(_rundis$elm_bootstrap$Bootstrap_Internal_Role$Secondary);
var _rundis$elm_bootstrap$Bootstrap_Alert$simpleSuccess = _rundis$elm_bootstrap$Bootstrap_Alert$simple(_rundis$elm_bootstrap$Bootstrap_Internal_Role$Success);
var _rundis$elm_bootstrap$Bootstrap_Alert$simpleInfo = _rundis$elm_bootstrap$Bootstrap_Alert$simple(_rundis$elm_bootstrap$Bootstrap_Internal_Role$Info);
var _rundis$elm_bootstrap$Bootstrap_Alert$simpleWarning = _rundis$elm_bootstrap$Bootstrap_Alert$simple(_rundis$elm_bootstrap$Bootstrap_Internal_Role$Warning);
var _rundis$elm_bootstrap$Bootstrap_Alert$simpleDanger = _rundis$elm_bootstrap$Bootstrap_Alert$simple(_rundis$elm_bootstrap$Bootstrap_Internal_Role$Danger);
var _rundis$elm_bootstrap$Bootstrap_Alert$simpleDark = _rundis$elm_bootstrap$Bootstrap_Alert$simple(_rundis$elm_bootstrap$Bootstrap_Internal_Role$Dark);
var _rundis$elm_bootstrap$Bootstrap_Alert$simpleLight = _rundis$elm_bootstrap$Bootstrap_Alert$simple(_rundis$elm_bootstrap$Bootstrap_Internal_Role$Light);

var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$horizontalAlignOption = function (align) {
	var _p0 = align;
	switch (_p0.ctor) {
		case 'Left':
			return 'start';
		case 'Center':
			return 'center';
		case 'Right':
			return 'end';
		case 'Around':
			return 'around';
		default:
			return 'between';
	}
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$verticalAlignOption = function (align) {
	var _p1 = align;
	switch (_p1.ctor) {
		case 'Top':
			return 'start';
		case 'Middle':
			return 'center';
		default:
			return 'end';
	}
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$moveCountOption = function (size) {
	var _p2 = size;
	switch (_p2.ctor) {
		case 'Move0':
			return '0';
		case 'Move1':
			return '1';
		case 'Move2':
			return '2';
		case 'Move3':
			return '3';
		case 'Move4':
			return '4';
		case 'Move5':
			return '5';
		case 'Move6':
			return '6';
		case 'Move7':
			return '7';
		case 'Move8':
			return '8';
		case 'Move9':
			return '9';
		case 'Move10':
			return '10';
		case 'Move11':
			return '11';
		default:
			return '12';
	}
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$offsetCountOption = function (size) {
	var _p3 = size;
	switch (_p3.ctor) {
		case 'Offset0':
			return '0';
		case 'Offset1':
			return '1';
		case 'Offset2':
			return '2';
		case 'Offset3':
			return '3';
		case 'Offset4':
			return '4';
		case 'Offset5':
			return '5';
		case 'Offset6':
			return '6';
		case 'Offset7':
			return '7';
		case 'Offset8':
			return '8';
		case 'Offset9':
			return '9';
		case 'Offset10':
			return '10';
		default:
			return '11';
	}
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$columnCountOption = function (size) {
	var _p4 = size;
	switch (_p4.ctor) {
		case 'Col':
			return _elm_lang$core$Maybe$Nothing;
		case 'Col1':
			return _elm_lang$core$Maybe$Just('1');
		case 'Col2':
			return _elm_lang$core$Maybe$Just('2');
		case 'Col3':
			return _elm_lang$core$Maybe$Just('3');
		case 'Col4':
			return _elm_lang$core$Maybe$Just('4');
		case 'Col5':
			return _elm_lang$core$Maybe$Just('5');
		case 'Col6':
			return _elm_lang$core$Maybe$Just('6');
		case 'Col7':
			return _elm_lang$core$Maybe$Just('7');
		case 'Col8':
			return _elm_lang$core$Maybe$Just('8');
		case 'Col9':
			return _elm_lang$core$Maybe$Just('9');
		case 'Col10':
			return _elm_lang$core$Maybe$Just('10');
		case 'Col11':
			return _elm_lang$core$Maybe$Just('11');
		case 'Col12':
			return _elm_lang$core$Maybe$Just('12');
		default:
			return _elm_lang$core$Maybe$Just('auto');
	}
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$screenSizeOption = function (size) {
	var _p5 = size;
	switch (_p5.ctor) {
		case 'XS':
			return _elm_lang$core$Maybe$Nothing;
		case 'SM':
			return _elm_lang$core$Maybe$Just('sm');
		case 'MD':
			return _elm_lang$core$Maybe$Just('md');
		case 'LG':
			return _elm_lang$core$Maybe$Just('lg');
		default:
			return _elm_lang$core$Maybe$Just('xl');
	}
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$screenSizeToPartialString = function (screenSize) {
	var _p6 = _rundis$elm_bootstrap$Bootstrap_Grid_Internal$screenSizeOption(screenSize);
	if (_p6.ctor === 'Just') {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'-',
			A2(_elm_lang$core$Basics_ops['++'], _p6._0, '-'));
	} else {
		return '-';
	}
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$hAlignClass = function (_p7) {
	var _p8 = _p7;
	return _elm_lang$html$Html_Attributes$class(
		A2(
			_elm_lang$core$Basics_ops['++'],
			'justify-content-',
			A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_elm_lang$core$Maybe$withDefault,
					'',
					A2(
						_elm_lang$core$Maybe$map,
						function (v) {
							return A2(_elm_lang$core$Basics_ops['++'], v, '-');
						},
						_rundis$elm_bootstrap$Bootstrap_Grid_Internal$screenSizeOption(_p8.screenSize))),
				_rundis$elm_bootstrap$Bootstrap_Grid_Internal$horizontalAlignOption(_p8.align))));
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$hAlignsToAttributes = function (aligns) {
	var align = function (a) {
		return A2(_elm_lang$core$Maybe$map, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$hAlignClass, a);
	};
	return A2(
		_elm_lang$core$List$filterMap,
		_elm_lang$core$Basics$identity,
		A2(_elm_lang$core$List$map, align, aligns));
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$vAlignClass = F2(
	function (prefix, _p9) {
		var _p10 = _p9;
		return _elm_lang$html$Html_Attributes$class(
			A2(
				_elm_lang$core$Basics_ops['++'],
				prefix,
				A2(
					_elm_lang$core$Basics_ops['++'],
					A2(
						_elm_lang$core$Maybe$withDefault,
						'',
						A2(
							_elm_lang$core$Maybe$map,
							function (v) {
								return A2(_elm_lang$core$Basics_ops['++'], v, '-');
							},
							_rundis$elm_bootstrap$Bootstrap_Grid_Internal$screenSizeOption(_p10.screenSize))),
					_rundis$elm_bootstrap$Bootstrap_Grid_Internal$verticalAlignOption(_p10.align))));
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$vAlignsToAttributes = F2(
	function (prefix, aligns) {
		var align = function (a) {
			return A2(
				_elm_lang$core$Maybe$map,
				_rundis$elm_bootstrap$Bootstrap_Grid_Internal$vAlignClass(prefix),
				a);
		};
		return A2(
			_elm_lang$core$List$filterMap,
			_elm_lang$core$Basics$identity,
			A2(_elm_lang$core$List$map, align, aligns));
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$pushesToAttributes = function (pushes) {
	var push = function (m) {
		var _p11 = m;
		if (_p11.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				_elm_lang$html$Html_Attributes$class(
					A2(
						_elm_lang$core$Basics_ops['++'],
						'push',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_rundis$elm_bootstrap$Bootstrap_Grid_Internal$screenSizeToPartialString(_p11._0.screenSize),
							_rundis$elm_bootstrap$Bootstrap_Grid_Internal$moveCountOption(_p11._0.moveCount)))));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	};
	return A2(
		_elm_lang$core$List$filterMap,
		_elm_lang$core$Basics$identity,
		A2(_elm_lang$core$List$map, push, pushes));
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$pullsToAttributes = function (pulls) {
	var pull = function (m) {
		var _p12 = m;
		if (_p12.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				_elm_lang$html$Html_Attributes$class(
					A2(
						_elm_lang$core$Basics_ops['++'],
						'pull',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_rundis$elm_bootstrap$Bootstrap_Grid_Internal$screenSizeToPartialString(_p12._0.screenSize),
							_rundis$elm_bootstrap$Bootstrap_Grid_Internal$moveCountOption(_p12._0.moveCount)))));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	};
	return A2(
		_elm_lang$core$List$filterMap,
		_elm_lang$core$Basics$identity,
		A2(_elm_lang$core$List$map, pull, pulls));
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$offsetClass = function (_p13) {
	var _p14 = _p13;
	return _elm_lang$html$Html_Attributes$class(
		A2(
			_elm_lang$core$Basics_ops['++'],
			'offset',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_rundis$elm_bootstrap$Bootstrap_Grid_Internal$screenSizeToPartialString(_p14.screenSize),
				_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offsetCountOption(_p14.offsetCount))));
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$offsetsToAttributes = function (offsets) {
	var offset = function (m) {
		return A2(_elm_lang$core$Maybe$map, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$offsetClass, m);
	};
	return A2(
		_elm_lang$core$List$filterMap,
		_elm_lang$core$Basics$identity,
		A2(_elm_lang$core$List$map, offset, offsets));
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$colWidthClass = function (_p15) {
	var _p16 = _p15;
	return _elm_lang$html$Html_Attributes$class(
		A2(
			_elm_lang$core$Basics_ops['++'],
			'col',
			A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_elm_lang$core$Maybe$withDefault,
					'',
					A2(
						_elm_lang$core$Maybe$map,
						function (v) {
							return A2(_elm_lang$core$Basics_ops['++'], '-', v);
						},
						_rundis$elm_bootstrap$Bootstrap_Grid_Internal$screenSizeOption(_p16.screenSize))),
				A2(
					_elm_lang$core$Maybe$withDefault,
					'',
					A2(
						_elm_lang$core$Maybe$map,
						function (v) {
							return A2(_elm_lang$core$Basics_ops['++'], '-', v);
						},
						_rundis$elm_bootstrap$Bootstrap_Grid_Internal$columnCountOption(_p16.columnCount))))));
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$colWidthsToAttributes = function (widths) {
	var width = function (w) {
		return A2(_elm_lang$core$Maybe$map, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$colWidthClass, w);
	};
	return A2(
		_elm_lang$core$List$filterMap,
		_elm_lang$core$Basics$identity,
		A2(_elm_lang$core$List$map, width, widths));
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$defaultRowOptions = {
	attributes: {ctor: '[]'},
	vAlignXs: _elm_lang$core$Maybe$Nothing,
	vAlignSm: _elm_lang$core$Maybe$Nothing,
	vAlignMd: _elm_lang$core$Maybe$Nothing,
	vAlignLg: _elm_lang$core$Maybe$Nothing,
	vAlignXl: _elm_lang$core$Maybe$Nothing,
	hAlignXs: _elm_lang$core$Maybe$Nothing,
	hAlignSm: _elm_lang$core$Maybe$Nothing,
	hAlignMd: _elm_lang$core$Maybe$Nothing,
	hAlignLg: _elm_lang$core$Maybe$Nothing,
	hAlignXl: _elm_lang$core$Maybe$Nothing
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$defaultColOptions = {
	attributes: {ctor: '[]'},
	widthXs: _elm_lang$core$Maybe$Nothing,
	widthSm: _elm_lang$core$Maybe$Nothing,
	widthMd: _elm_lang$core$Maybe$Nothing,
	widthLg: _elm_lang$core$Maybe$Nothing,
	widthXl: _elm_lang$core$Maybe$Nothing,
	offsetXs: _elm_lang$core$Maybe$Nothing,
	offsetSm: _elm_lang$core$Maybe$Nothing,
	offsetMd: _elm_lang$core$Maybe$Nothing,
	offsetLg: _elm_lang$core$Maybe$Nothing,
	offsetXl: _elm_lang$core$Maybe$Nothing,
	pullXs: _elm_lang$core$Maybe$Nothing,
	pullSm: _elm_lang$core$Maybe$Nothing,
	pullMd: _elm_lang$core$Maybe$Nothing,
	pullLg: _elm_lang$core$Maybe$Nothing,
	pullXl: _elm_lang$core$Maybe$Nothing,
	pushXs: _elm_lang$core$Maybe$Nothing,
	pushSm: _elm_lang$core$Maybe$Nothing,
	pushMd: _elm_lang$core$Maybe$Nothing,
	pushLg: _elm_lang$core$Maybe$Nothing,
	pushXl: _elm_lang$core$Maybe$Nothing,
	alignXs: _elm_lang$core$Maybe$Nothing,
	alignSm: _elm_lang$core$Maybe$Nothing,
	alignMd: _elm_lang$core$Maybe$Nothing,
	alignLg: _elm_lang$core$Maybe$Nothing,
	alignXl: _elm_lang$core$Maybe$Nothing
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$applyRowHAlign = F2(
	function (align, options) {
		var _p17 = align.screenSize;
		switch (_p17.ctor) {
			case 'XS':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						hAlignXs: _elm_lang$core$Maybe$Just(align)
					});
			case 'SM':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						hAlignSm: _elm_lang$core$Maybe$Just(align)
					});
			case 'MD':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						hAlignMd: _elm_lang$core$Maybe$Just(align)
					});
			case 'LG':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						hAlignLg: _elm_lang$core$Maybe$Just(align)
					});
			default:
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						hAlignXl: _elm_lang$core$Maybe$Just(align)
					});
		}
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$applyRowVAlign = F2(
	function (align, options) {
		var _p18 = align.screenSize;
		switch (_p18.ctor) {
			case 'XS':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						vAlignXs: _elm_lang$core$Maybe$Just(align)
					});
			case 'SM':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						vAlignSm: _elm_lang$core$Maybe$Just(align)
					});
			case 'MD':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						vAlignMd: _elm_lang$core$Maybe$Just(align)
					});
			case 'LG':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						vAlignLg: _elm_lang$core$Maybe$Just(align)
					});
			default:
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						vAlignXl: _elm_lang$core$Maybe$Just(align)
					});
		}
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$applyRowOption = F2(
	function (modifier, options) {
		var _p19 = modifier;
		switch (_p19.ctor) {
			case 'RowAttrs':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						attributes: A2(_elm_lang$core$Basics_ops['++'], options.attributes, _p19._0)
					});
			case 'RowVAlign':
				return A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$applyRowVAlign, _p19._0, options);
			default:
				return A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$applyRowHAlign, _p19._0, options);
		}
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$applyColAlign = F2(
	function (align, options) {
		var _p20 = align.screenSize;
		switch (_p20.ctor) {
			case 'XS':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						alignXs: _elm_lang$core$Maybe$Just(align)
					});
			case 'SM':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						alignSm: _elm_lang$core$Maybe$Just(align)
					});
			case 'MD':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						alignMd: _elm_lang$core$Maybe$Just(align)
					});
			case 'LG':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						alignLg: _elm_lang$core$Maybe$Just(align)
					});
			default:
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						alignXl: _elm_lang$core$Maybe$Just(align)
					});
		}
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$applyColPush = F2(
	function (push, options) {
		var _p21 = push.screenSize;
		switch (_p21.ctor) {
			case 'XS':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						pushXs: _elm_lang$core$Maybe$Just(push)
					});
			case 'SM':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						pushSm: _elm_lang$core$Maybe$Just(push)
					});
			case 'MD':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						pushMd: _elm_lang$core$Maybe$Just(push)
					});
			case 'LG':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						pushLg: _elm_lang$core$Maybe$Just(push)
					});
			default:
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						pushXl: _elm_lang$core$Maybe$Just(push)
					});
		}
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$applyColPull = F2(
	function (pull, options) {
		var _p22 = pull.screenSize;
		switch (_p22.ctor) {
			case 'XS':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						pullXs: _elm_lang$core$Maybe$Just(pull)
					});
			case 'SM':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						pullSm: _elm_lang$core$Maybe$Just(pull)
					});
			case 'MD':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						pullMd: _elm_lang$core$Maybe$Just(pull)
					});
			case 'LG':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						pullLg: _elm_lang$core$Maybe$Just(pull)
					});
			default:
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						pullXl: _elm_lang$core$Maybe$Just(pull)
					});
		}
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$applyColOffset = F2(
	function (offset, options) {
		var _p23 = offset.screenSize;
		switch (_p23.ctor) {
			case 'XS':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						offsetXs: _elm_lang$core$Maybe$Just(offset)
					});
			case 'SM':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						offsetSm: _elm_lang$core$Maybe$Just(offset)
					});
			case 'MD':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						offsetMd: _elm_lang$core$Maybe$Just(offset)
					});
			case 'LG':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						offsetLg: _elm_lang$core$Maybe$Just(offset)
					});
			default:
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						offsetXl: _elm_lang$core$Maybe$Just(offset)
					});
		}
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$applyColWidth = F2(
	function (width, options) {
		var _p24 = width.screenSize;
		switch (_p24.ctor) {
			case 'XS':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						widthXs: _elm_lang$core$Maybe$Just(width)
					});
			case 'SM':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						widthSm: _elm_lang$core$Maybe$Just(width)
					});
			case 'MD':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						widthMd: _elm_lang$core$Maybe$Just(width)
					});
			case 'LG':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						widthLg: _elm_lang$core$Maybe$Just(width)
					});
			default:
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						widthXl: _elm_lang$core$Maybe$Just(width)
					});
		}
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$applyColOption = F2(
	function (modifier, options) {
		var _p25 = modifier;
		switch (_p25.ctor) {
			case 'ColAttrs':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						attributes: A2(_elm_lang$core$Basics_ops['++'], options.attributes, _p25._0)
					});
			case 'ColWidth':
				return A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$applyColWidth, _p25._0, options);
			case 'ColOffset':
				return A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$applyColOffset, _p25._0, options);
			case 'ColPull':
				return A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$applyColPull, _p25._0, options);
			case 'ColPush':
				return A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$applyColPush, _p25._0, options);
			default:
				return A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$applyColAlign, _p25._0, options);
		}
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowAttributes = function (modifiers) {
	var options = A3(_elm_lang$core$List$foldl, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$applyRowOption, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$defaultRowOptions, modifiers);
	return A2(
		_elm_lang$core$Basics_ops['++'],
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('row'),
			_1: {ctor: '[]'}
		},
		A2(
			_elm_lang$core$Basics_ops['++'],
			A2(
				_rundis$elm_bootstrap$Bootstrap_Grid_Internal$vAlignsToAttributes,
				'align-items-',
				{
					ctor: '::',
					_0: options.vAlignXs,
					_1: {
						ctor: '::',
						_0: options.vAlignSm,
						_1: {
							ctor: '::',
							_0: options.vAlignMd,
							_1: {
								ctor: '::',
								_0: options.vAlignLg,
								_1: {
									ctor: '::',
									_0: options.vAlignXl,
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}),
			A2(
				_elm_lang$core$Basics_ops['++'],
				_rundis$elm_bootstrap$Bootstrap_Grid_Internal$hAlignsToAttributes(
					{
						ctor: '::',
						_0: options.hAlignXs,
						_1: {
							ctor: '::',
							_0: options.hAlignSm,
							_1: {
								ctor: '::',
								_0: options.hAlignMd,
								_1: {
									ctor: '::',
									_0: options.hAlignLg,
									_1: {
										ctor: '::',
										_0: options.hAlignXl,
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}),
				options.attributes)));
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Width = F2(
	function (a, b) {
		return {screenSize: a, columnCount: b};
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset = F2(
	function (a, b) {
		return {screenSize: a, offsetCount: b};
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Pull = F2(
	function (a, b) {
		return {screenSize: a, moveCount: b};
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Push = F2(
	function (a, b) {
		return {screenSize: a, moveCount: b};
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$VAlign = F2(
	function (a, b) {
		return {screenSize: a, align: b};
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$HAlign = F2(
	function (a, b) {
		return {screenSize: a, align: b};
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$ColOptions = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return function (l) {
												return function (m) {
													return function (n) {
														return function (o) {
															return function (p) {
																return function (q) {
																	return function (r) {
																		return function (s) {
																			return function (t) {
																				return function (u) {
																					return function (v) {
																						return function (w) {
																							return function (x) {
																								return function (y) {
																									return function (z) {
																										return {attributes: a, widthXs: b, widthSm: c, widthMd: d, widthLg: e, widthXl: f, offsetXs: g, offsetSm: h, offsetMd: i, offsetLg: j, offsetXl: k, pullXs: l, pullSm: m, pullMd: n, pullLg: o, pullXl: p, pushXs: q, pushSm: r, pushMd: s, pushLg: t, pushXl: u, alignXs: v, alignSm: w, alignMd: x, alignLg: y, alignXl: z};
																									};
																								};
																							};
																						};
																					};
																				};
																			};
																		};
																	};
																};
															};
														};
													};
												};
											};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$RowOptions = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return {attributes: a, vAlignXs: b, vAlignSm: c, vAlignMd: d, vAlignLg: e, vAlignXl: f, hAlignXs: g, hAlignSm: h, hAlignMd: i, hAlignLg: j, hAlignXl: k};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$ColAttrs = function (a) {
	return {ctor: 'ColAttrs', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$ColAlign = function (a) {
	return {ctor: 'ColAlign', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$colVAlign = F2(
	function (size, align) {
		return _rundis$elm_bootstrap$Bootstrap_Grid_Internal$ColAlign(
			A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$VAlign, size, align));
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$ColPush = function (a) {
	return {ctor: 'ColPush', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$push = F2(
	function (size, count) {
		return _rundis$elm_bootstrap$Bootstrap_Grid_Internal$ColPush(
			A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$Push, size, count));
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$ColPull = function (a) {
	return {ctor: 'ColPull', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull = F2(
	function (size, count) {
		return _rundis$elm_bootstrap$Bootstrap_Grid_Internal$ColPull(
			A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$Pull, size, count));
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$ColOffset = function (a) {
	return {ctor: 'ColOffset', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset = F2(
	function (size, count) {
		return _rundis$elm_bootstrap$Bootstrap_Grid_Internal$ColOffset(
			A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset, size, count));
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$ColWidth = function (a) {
	return {ctor: 'ColWidth', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$width = F2(
	function (size, count) {
		return _rundis$elm_bootstrap$Bootstrap_Grid_Internal$ColWidth(
			A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$Width, size, count));
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$RowAttrs = function (a) {
	return {ctor: 'RowAttrs', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$RowHAlign = function (a) {
	return {ctor: 'RowHAlign', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign = F2(
	function (size, align) {
		return _rundis$elm_bootstrap$Bootstrap_Grid_Internal$RowHAlign(
			A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$HAlign, size, align));
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$RowVAlign = function (a) {
	return {ctor: 'RowVAlign', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowVAlign = F2(
	function (size, align) {
		return _rundis$elm_bootstrap$Bootstrap_Grid_Internal$RowVAlign(
			A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$VAlign, size, align));
	});
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL = {ctor: 'XL'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG = {ctor: 'LG'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD = {ctor: 'MD'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM = {ctor: 'SM'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS = {ctor: 'XS'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$ColAuto = {ctor: 'ColAuto'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col12 = {ctor: 'Col12'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col11 = {ctor: 'Col11'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col10 = {ctor: 'Col10'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col9 = {ctor: 'Col9'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col8 = {ctor: 'Col8'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col7 = {ctor: 'Col7'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col6 = {ctor: 'Col6'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col5 = {ctor: 'Col5'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col4 = {ctor: 'Col4'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col3 = {ctor: 'Col3'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col2 = {ctor: 'Col2'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col1 = {ctor: 'Col1'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col = {ctor: 'Col'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$colAttributes = function (modifiers) {
	var options = A3(_elm_lang$core$List$foldl, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$applyColOption, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$defaultColOptions, modifiers);
	var shouldAddDefaultXs = _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$List$length(
			A2(
				_elm_lang$core$List$filterMap,
				_elm_lang$core$Basics$identity,
				{
					ctor: '::',
					_0: options.widthXs,
					_1: {
						ctor: '::',
						_0: options.widthSm,
						_1: {
							ctor: '::',
							_0: options.widthMd,
							_1: {
								ctor: '::',
								_0: options.widthLg,
								_1: {
									ctor: '::',
									_0: options.widthXl,
									_1: {ctor: '[]'}
								}
							}
						}
					}
				})),
		0);
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_rundis$elm_bootstrap$Bootstrap_Grid_Internal$colWidthsToAttributes(
			{
				ctor: '::',
				_0: shouldAddDefaultXs ? _elm_lang$core$Maybe$Just(
					A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$Width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col)) : options.widthXs,
				_1: {
					ctor: '::',
					_0: options.widthSm,
					_1: {
						ctor: '::',
						_0: options.widthMd,
						_1: {
							ctor: '::',
							_0: options.widthLg,
							_1: {
								ctor: '::',
								_0: options.widthXl,
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}),
		A2(
			_elm_lang$core$Basics_ops['++'],
			_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offsetsToAttributes(
				{
					ctor: '::',
					_0: options.offsetXs,
					_1: {
						ctor: '::',
						_0: options.offsetSm,
						_1: {
							ctor: '::',
							_0: options.offsetMd,
							_1: {
								ctor: '::',
								_0: options.offsetLg,
								_1: {
									ctor: '::',
									_0: options.offsetXl,
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}),
			A2(
				_elm_lang$core$Basics_ops['++'],
				_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pullsToAttributes(
					{
						ctor: '::',
						_0: options.pullXs,
						_1: {
							ctor: '::',
							_0: options.pullSm,
							_1: {
								ctor: '::',
								_0: options.pullMd,
								_1: {
									ctor: '::',
									_0: options.pullLg,
									_1: {
										ctor: '::',
										_0: options.pullXl,
										_1: {ctor: '[]'}
									}
								}
							}
						}
					}),
				A2(
					_elm_lang$core$Basics_ops['++'],
					_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pushesToAttributes(
						{
							ctor: '::',
							_0: options.pushXs,
							_1: {
								ctor: '::',
								_0: options.pushSm,
								_1: {
									ctor: '::',
									_0: options.pushMd,
									_1: {
										ctor: '::',
										_0: options.pushLg,
										_1: {
											ctor: '::',
											_0: options.pushXl,
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}),
					A2(
						_elm_lang$core$Basics_ops['++'],
						A2(
							_rundis$elm_bootstrap$Bootstrap_Grid_Internal$vAlignsToAttributes,
							'align-self-',
							{
								ctor: '::',
								_0: options.alignXs,
								_1: {
									ctor: '::',
									_0: options.alignSm,
									_1: {
										ctor: '::',
										_0: options.alignMd,
										_1: {
											ctor: '::',
											_0: options.alignLg,
											_1: {
												ctor: '::',
												_0: options.alignXl,
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}),
						options.attributes)))));
};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset11 = {ctor: 'Offset11'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset10 = {ctor: 'Offset10'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset9 = {ctor: 'Offset9'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset8 = {ctor: 'Offset8'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset7 = {ctor: 'Offset7'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset6 = {ctor: 'Offset6'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset5 = {ctor: 'Offset5'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset4 = {ctor: 'Offset4'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset3 = {ctor: 'Offset3'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset2 = {ctor: 'Offset2'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset1 = {ctor: 'Offset1'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset0 = {ctor: 'Offset0'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move12 = {ctor: 'Move12'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move11 = {ctor: 'Move11'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move10 = {ctor: 'Move10'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move9 = {ctor: 'Move9'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move8 = {ctor: 'Move8'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move7 = {ctor: 'Move7'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move6 = {ctor: 'Move6'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move5 = {ctor: 'Move5'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move4 = {ctor: 'Move4'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move3 = {ctor: 'Move3'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move2 = {ctor: 'Move2'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move1 = {ctor: 'Move1'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move0 = {ctor: 'Move0'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Bottom = {ctor: 'Bottom'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Middle = {ctor: 'Middle'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Top = {ctor: 'Top'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Between = {ctor: 'Between'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Around = {ctor: 'Around'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Right = {ctor: 'Right'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Center = {ctor: 'Center'};
var _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Left = {ctor: 'Left'};

var _rundis$elm_bootstrap$Bootstrap_Internal_Button$roleClass = function (role) {
	var _p0 = role;
	switch (_p0.ctor) {
		case 'Primary':
			return 'primary';
		case 'Secondary':
			return 'secondary';
		case 'Success':
			return 'success';
		case 'Info':
			return 'info';
		case 'Warning':
			return 'warning';
		case 'Danger':
			return 'danger';
		case 'Dark':
			return 'dark';
		case 'Light':
			return 'light';
		default:
			return 'link';
	}
};
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$applyModifier = F2(
	function (modifier, options) {
		var _p1 = modifier;
		switch (_p1.ctor) {
			case 'Size':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						size: _elm_lang$core$Maybe$Just(_p1._0)
					});
			case 'Coloring':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						coloring: _elm_lang$core$Maybe$Just(_p1._0)
					});
			case 'Block':
				return _elm_lang$core$Native_Utils.update(
					options,
					{block: true});
			case 'Disabled':
				return _elm_lang$core$Native_Utils.update(
					options,
					{disabled: _p1._0});
			default:
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						attributes: A2(_elm_lang$core$Basics_ops['++'], options.attributes, _p1._0)
					});
		}
	});
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$defaultOptions = {
	coloring: _elm_lang$core$Maybe$Nothing,
	block: false,
	disabled: false,
	size: _elm_lang$core$Maybe$Nothing,
	attributes: {ctor: '[]'}
};
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$buttonAttributes = function (modifiers) {
	var options = A3(_elm_lang$core$List$foldl, _rundis$elm_bootstrap$Bootstrap_Internal_Button$applyModifier, _rundis$elm_bootstrap$Bootstrap_Internal_Button$defaultOptions, modifiers);
	return A2(
		_elm_lang$core$Basics_ops['++'],
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$classList(
				{
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'btn', _1: true},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'btn-block', _1: options.block},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'disabled', _1: options.disabled},
							_1: {ctor: '[]'}
						}
					}
				}),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$disabled(options.disabled),
				_1: {ctor: '[]'}
			}
		},
		A2(
			_elm_lang$core$Basics_ops['++'],
			function () {
				var _p2 = A2(_elm_lang$core$Maybe$andThen, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$screenSizeOption, options.size);
				if (_p2.ctor === 'Just') {
					return {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class(
							A2(_elm_lang$core$Basics_ops['++'], 'btn-', _p2._0)),
						_1: {ctor: '[]'}
					};
				} else {
					return {ctor: '[]'};
				}
			}(),
			A2(
				_elm_lang$core$Basics_ops['++'],
				function () {
					var _p3 = options.coloring;
					if (_p3.ctor === 'Just') {
						if (_p3._0.ctor === 'Roled') {
							return {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class(
									A2(
										_elm_lang$core$Basics_ops['++'],
										'btn-',
										_rundis$elm_bootstrap$Bootstrap_Internal_Button$roleClass(_p3._0._0))),
								_1: {ctor: '[]'}
							};
						} else {
							return {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class(
									A2(
										_elm_lang$core$Basics_ops['++'],
										'btn-outline-',
										_rundis$elm_bootstrap$Bootstrap_Internal_Button$roleClass(_p3._0._0))),
								_1: {ctor: '[]'}
							};
						}
					} else {
						return {ctor: '[]'};
					}
				}(),
				options.attributes)));
};
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$Options = F5(
	function (a, b, c, d, e) {
		return {coloring: a, block: b, disabled: c, size: d, attributes: e};
	});
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$Attrs = function (a) {
	return {ctor: 'Attrs', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$Disabled = function (a) {
	return {ctor: 'Disabled', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$Block = {ctor: 'Block'};
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$Coloring = function (a) {
	return {ctor: 'Coloring', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$Size = function (a) {
	return {ctor: 'Size', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$Outlined = function (a) {
	return {ctor: 'Outlined', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$Roled = function (a) {
	return {ctor: 'Roled', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$Link = {ctor: 'Link'};
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$Light = {ctor: 'Light'};
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$Dark = {ctor: 'Dark'};
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$Danger = {ctor: 'Danger'};
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$Warning = {ctor: 'Warning'};
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$Info = {ctor: 'Info'};
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$Success = {ctor: 'Success'};
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$Secondary = {ctor: 'Secondary'};
var _rundis$elm_bootstrap$Bootstrap_Internal_Button$Primary = {ctor: 'Primary'};

var _rundis$elm_bootstrap$Bootstrap_Button$disabled = function (disabled) {
	return _rundis$elm_bootstrap$Bootstrap_Internal_Button$Disabled(disabled);
};
var _rundis$elm_bootstrap$Bootstrap_Button$block = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Block;
var _rundis$elm_bootstrap$Bootstrap_Button$outlineDark = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Coloring(
	_rundis$elm_bootstrap$Bootstrap_Internal_Button$Outlined(_rundis$elm_bootstrap$Bootstrap_Internal_Button$Dark));
var _rundis$elm_bootstrap$Bootstrap_Button$outlineLight = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Coloring(
	_rundis$elm_bootstrap$Bootstrap_Internal_Button$Outlined(_rundis$elm_bootstrap$Bootstrap_Internal_Button$Light));
var _rundis$elm_bootstrap$Bootstrap_Button$outlineDanger = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Coloring(
	_rundis$elm_bootstrap$Bootstrap_Internal_Button$Outlined(_rundis$elm_bootstrap$Bootstrap_Internal_Button$Danger));
var _rundis$elm_bootstrap$Bootstrap_Button$outlineWarning = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Coloring(
	_rundis$elm_bootstrap$Bootstrap_Internal_Button$Outlined(_rundis$elm_bootstrap$Bootstrap_Internal_Button$Warning));
var _rundis$elm_bootstrap$Bootstrap_Button$outlineInfo = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Coloring(
	_rundis$elm_bootstrap$Bootstrap_Internal_Button$Outlined(_rundis$elm_bootstrap$Bootstrap_Internal_Button$Info));
var _rundis$elm_bootstrap$Bootstrap_Button$outlineSuccess = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Coloring(
	_rundis$elm_bootstrap$Bootstrap_Internal_Button$Outlined(_rundis$elm_bootstrap$Bootstrap_Internal_Button$Success));
var _rundis$elm_bootstrap$Bootstrap_Button$outlineSecondary = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Coloring(
	_rundis$elm_bootstrap$Bootstrap_Internal_Button$Outlined(_rundis$elm_bootstrap$Bootstrap_Internal_Button$Secondary));
var _rundis$elm_bootstrap$Bootstrap_Button$outlinePrimary = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Coloring(
	_rundis$elm_bootstrap$Bootstrap_Internal_Button$Outlined(_rundis$elm_bootstrap$Bootstrap_Internal_Button$Primary));
var _rundis$elm_bootstrap$Bootstrap_Button$roleLink = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Coloring(
	_rundis$elm_bootstrap$Bootstrap_Internal_Button$Roled(_rundis$elm_bootstrap$Bootstrap_Internal_Button$Link));
var _rundis$elm_bootstrap$Bootstrap_Button$dark = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Coloring(
	_rundis$elm_bootstrap$Bootstrap_Internal_Button$Roled(_rundis$elm_bootstrap$Bootstrap_Internal_Button$Dark));
var _rundis$elm_bootstrap$Bootstrap_Button$light = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Coloring(
	_rundis$elm_bootstrap$Bootstrap_Internal_Button$Roled(_rundis$elm_bootstrap$Bootstrap_Internal_Button$Light));
var _rundis$elm_bootstrap$Bootstrap_Button$danger = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Coloring(
	_rundis$elm_bootstrap$Bootstrap_Internal_Button$Roled(_rundis$elm_bootstrap$Bootstrap_Internal_Button$Danger));
var _rundis$elm_bootstrap$Bootstrap_Button$warning = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Coloring(
	_rundis$elm_bootstrap$Bootstrap_Internal_Button$Roled(_rundis$elm_bootstrap$Bootstrap_Internal_Button$Warning));
var _rundis$elm_bootstrap$Bootstrap_Button$info = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Coloring(
	_rundis$elm_bootstrap$Bootstrap_Internal_Button$Roled(_rundis$elm_bootstrap$Bootstrap_Internal_Button$Info));
var _rundis$elm_bootstrap$Bootstrap_Button$success = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Coloring(
	_rundis$elm_bootstrap$Bootstrap_Internal_Button$Roled(_rundis$elm_bootstrap$Bootstrap_Internal_Button$Success));
var _rundis$elm_bootstrap$Bootstrap_Button$secondary = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Coloring(
	_rundis$elm_bootstrap$Bootstrap_Internal_Button$Roled(_rundis$elm_bootstrap$Bootstrap_Internal_Button$Secondary));
var _rundis$elm_bootstrap$Bootstrap_Button$primary = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Coloring(
	_rundis$elm_bootstrap$Bootstrap_Internal_Button$Roled(_rundis$elm_bootstrap$Bootstrap_Internal_Button$Primary));
var _rundis$elm_bootstrap$Bootstrap_Button$large = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Size(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG);
var _rundis$elm_bootstrap$Bootstrap_Button$small = _rundis$elm_bootstrap$Bootstrap_Internal_Button$Size(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM);
var _rundis$elm_bootstrap$Bootstrap_Button$attrs = function (attrs) {
	return _rundis$elm_bootstrap$Bootstrap_Internal_Button$Attrs(attrs);
};
var _rundis$elm_bootstrap$Bootstrap_Button$onClick = function (message) {
	var defaultOptions = _elm_lang$html$Html_Events$defaultOptions;
	return _rundis$elm_bootstrap$Bootstrap_Button$attrs(
		{
			ctor: '::',
			_0: A3(
				_elm_lang$html$Html_Events$onWithOptions,
				'click',
				_elm_lang$core$Native_Utils.update(
					defaultOptions,
					{preventDefault: true}),
				_elm_lang$core$Json_Decode$succeed(message)),
			_1: {ctor: '[]'}
		});
};
var _rundis$elm_bootstrap$Bootstrap_Button$checkboxButton = F3(
	function (checked, options, children) {
		return A2(
			_elm_lang$html$Html$label,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$classList(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'active', _1: checked},
						_1: {ctor: '[]'}
					}),
				_1: _rundis$elm_bootstrap$Bootstrap_Internal_Button$buttonAttributes(options)
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$input,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$type_('checkbox'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$checked(checked),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$autocomplete(false),
								_1: {ctor: '[]'}
							}
						}
					},
					{ctor: '[]'}),
				_1: children
			});
	});
var _rundis$elm_bootstrap$Bootstrap_Button$radioButton = F3(
	function (checked, options, children) {
		var hideRadio = A2(_elm_lang$html$Html_Attributes$attribute, 'data-toggle', 'button');
		return A2(
			_elm_lang$html$Html$label,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$classList(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'active', _1: checked},
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: hideRadio,
					_1: _rundis$elm_bootstrap$Bootstrap_Internal_Button$buttonAttributes(options)
				}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$input,
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$type_('radio'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$checked(checked),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$autocomplete(false),
								_1: {ctor: '[]'}
							}
						}
					},
					{ctor: '[]'}),
				_1: children
			});
	});
var _rundis$elm_bootstrap$Bootstrap_Button$linkButton = F2(
	function (options, children) {
		return A2(
			_elm_lang$html$Html$a,
			{
				ctor: '::',
				_0: A2(_elm_lang$html$Html_Attributes$attribute, 'role', 'button'),
				_1: _rundis$elm_bootstrap$Bootstrap_Internal_Button$buttonAttributes(options)
			},
			children);
	});
var _rundis$elm_bootstrap$Bootstrap_Button$button = F2(
	function (options, children) {
		return A2(
			_elm_lang$html$Html$button,
			_rundis$elm_bootstrap$Bootstrap_Internal_Button$buttonAttributes(options),
			children);
	});

var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$defaultOptions = {
	size: _elm_lang$core$Maybe$Nothing,
	vertical: false,
	attributes: {ctor: '[]'}
};
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$applyModifier = F2(
	function (modifier, options) {
		var _p0 = modifier;
		switch (_p0.ctor) {
			case 'Size':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						size: _elm_lang$core$Maybe$Just(_p0._0)
					});
			case 'Vertical':
				return _elm_lang$core$Native_Utils.update(
					options,
					{vertical: true});
			default:
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						attributes: A2(_elm_lang$core$Basics_ops['++'], options.attributes, _p0._0)
					});
		}
	});
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$groupAttributes = F2(
	function (toggle, modifiers) {
		var options = A3(_elm_lang$core$List$foldl, _rundis$elm_bootstrap$Bootstrap_ButtonGroup$applyModifier, _rundis$elm_bootstrap$Bootstrap_ButtonGroup$defaultOptions, modifiers);
		return A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: A2(_elm_lang$html$Html_Attributes$attribute, 'role', 'group'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$classList(
						{
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: 'btn-group', _1: true},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'btn-group-toggle', _1: toggle},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'btn-group-vertical', _1: options.vertical},
									_1: {ctor: '[]'}
								}
							}
						}),
					_1: {
						ctor: '::',
						_0: A2(_elm_lang$html$Html_Attributes$attribute, 'data-toggle', 'buttons'),
						_1: {ctor: '[]'}
					}
				}
			},
			A2(
				_elm_lang$core$Basics_ops['++'],
				function () {
					var _p1 = A2(_elm_lang$core$Maybe$andThen, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$screenSizeOption, options.size);
					if (_p1.ctor === 'Just') {
						return {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class(
								A2(_elm_lang$core$Basics_ops['++'], 'btn-group-', _p1._0)),
							_1: {ctor: '[]'}
						};
					} else {
						return {ctor: '[]'};
					}
				}(),
				options.attributes));
	});
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$renderGroup = function (_p2) {
	var _p3 = _p2;
	return _p3._0;
};
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$toolbar = F2(
	function (attributes, items) {
		return A2(
			_elm_lang$html$Html$div,
			A2(
				_elm_lang$core$Basics_ops['++'],
				{
					ctor: '::',
					_0: A2(_elm_lang$html$Html_Attributes$attribute, 'role', 'toolbar'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('btn-toolbar'),
						_1: {ctor: '[]'}
					}
				},
				attributes),
			A2(_elm_lang$core$List$map, _rundis$elm_bootstrap$Bootstrap_ButtonGroup$renderGroup, items));
	});
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$Options = F3(
	function (a, b, c) {
		return {size: a, vertical: b, attributes: c};
	});
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$Attrs = function (a) {
	return {ctor: 'Attrs', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$attrs = function (attrs) {
	return _rundis$elm_bootstrap$Bootstrap_ButtonGroup$Attrs(attrs);
};
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$Vertical = {ctor: 'Vertical'};
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$vertical = _rundis$elm_bootstrap$Bootstrap_ButtonGroup$Vertical;
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$Size = function (a) {
	return {ctor: 'Size', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$small = _rundis$elm_bootstrap$Bootstrap_ButtonGroup$Size(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM);
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$large = _rundis$elm_bootstrap$Bootstrap_ButtonGroup$Size(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG);
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$GroupItem = function (a) {
	return {ctor: 'GroupItem', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$buttonGroupItem = F2(
	function (options, items) {
		return _rundis$elm_bootstrap$Bootstrap_ButtonGroup$GroupItem(
			A2(
				_elm_lang$html$Html$div,
				A2(_rundis$elm_bootstrap$Bootstrap_ButtonGroup$groupAttributes, false, options),
				A2(
					_elm_lang$core$List$map,
					function (_p4) {
						var _p5 = _p4;
						return _p5._0;
					},
					items)));
	});
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$buttonGroup = F2(
	function (options, items) {
		return _rundis$elm_bootstrap$Bootstrap_ButtonGroup$renderGroup(
			A2(_rundis$elm_bootstrap$Bootstrap_ButtonGroup$buttonGroupItem, options, items));
	});
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$linkButtonGroupItem = F2(
	function (options, items) {
		return _rundis$elm_bootstrap$Bootstrap_ButtonGroup$GroupItem(
			A2(
				_elm_lang$html$Html$div,
				A2(_rundis$elm_bootstrap$Bootstrap_ButtonGroup$groupAttributes, false, options),
				A2(
					_elm_lang$core$List$map,
					function (_p6) {
						var _p7 = _p6;
						return _p7._0;
					},
					items)));
	});
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$linkButtonGroup = F2(
	function (options, items) {
		return _rundis$elm_bootstrap$Bootstrap_ButtonGroup$renderGroup(
			A2(_rundis$elm_bootstrap$Bootstrap_ButtonGroup$linkButtonGroupItem, options, items));
	});
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$radioButtonGroupItem = F2(
	function (options, items) {
		return _rundis$elm_bootstrap$Bootstrap_ButtonGroup$GroupItem(
			A2(
				_elm_lang$html$Html$div,
				A2(_rundis$elm_bootstrap$Bootstrap_ButtonGroup$groupAttributes, true, options),
				A2(
					_elm_lang$core$List$map,
					function (_p8) {
						var _p9 = _p8;
						return _p9._0;
					},
					items)));
	});
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$radioButtonGroup = F2(
	function (options, items) {
		return _rundis$elm_bootstrap$Bootstrap_ButtonGroup$renderGroup(
			A2(_rundis$elm_bootstrap$Bootstrap_ButtonGroup$radioButtonGroupItem, options, items));
	});
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$checkboxButtonGroupItem = F2(
	function (options, items) {
		return _rundis$elm_bootstrap$Bootstrap_ButtonGroup$GroupItem(
			A2(
				_elm_lang$html$Html$div,
				A2(_rundis$elm_bootstrap$Bootstrap_ButtonGroup$groupAttributes, true, options),
				A2(
					_elm_lang$core$List$map,
					function (_p10) {
						var _p11 = _p10;
						return _p11._0;
					},
					items)));
	});
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$checkboxButtonGroup = F2(
	function (options, items) {
		return _rundis$elm_bootstrap$Bootstrap_ButtonGroup$renderGroup(
			A2(_rundis$elm_bootstrap$Bootstrap_ButtonGroup$checkboxButtonGroupItem, options, items));
	});
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$ButtonItem = function (a) {
	return {ctor: 'ButtonItem', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$button = F2(
	function (options, children) {
		return _rundis$elm_bootstrap$Bootstrap_ButtonGroup$ButtonItem(
			A2(_rundis$elm_bootstrap$Bootstrap_Button$button, options, children));
	});
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$LinkButtonItem = function (a) {
	return {ctor: 'LinkButtonItem', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$linkButton = F2(
	function (options, children) {
		return _rundis$elm_bootstrap$Bootstrap_ButtonGroup$LinkButtonItem(
			A2(_rundis$elm_bootstrap$Bootstrap_Button$linkButton, options, children));
	});
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$RadioButtonItem = function (a) {
	return {ctor: 'RadioButtonItem', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$radioButton = F3(
	function (checked, options, children) {
		return _rundis$elm_bootstrap$Bootstrap_ButtonGroup$RadioButtonItem(
			A3(_rundis$elm_bootstrap$Bootstrap_Button$radioButton, checked, options, children));
	});
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$CheckboxButtonItem = function (a) {
	return {ctor: 'CheckboxButtonItem', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_ButtonGroup$checkboxButton = F3(
	function (checked, options, children) {
		return _rundis$elm_bootstrap$Bootstrap_ButtonGroup$CheckboxButtonItem(
			A3(_rundis$elm_bootstrap$Bootstrap_Button$checkboxButton, checked, options, children));
	});

var _rundis$elm_bootstrap$Bootstrap_Grid_Row$betweenXl = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Between);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$betweenLg = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Between);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$betweenMd = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Between);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$betweenSm = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Between);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$betweenXs = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Between);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$aroundXl = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Around);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$aroundLg = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Around);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$aroundMd = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Around);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$aroundSm = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Around);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$aroundXs = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Around);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$rightXl = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Right);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$rightLg = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Right);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$rightMd = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Right);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$rightSm = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Right);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$rightXs = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Right);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$centerXl = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Center);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$centerLg = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Center);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$centerMd = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Center);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$centerSm = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Center);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$centerXs = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Center);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$leftXl = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Left);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$leftLg = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Left);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$leftMd = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Left);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$leftSm = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Left);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$leftXs = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowHAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Left);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$bottomXl = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Bottom);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$bottomLg = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Bottom);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$bottomMd = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Bottom);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$bottomSm = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Bottom);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$bottomXs = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Bottom);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$middleXl = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Middle);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$middleLg = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Middle);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$middleMd = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Middle);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$middleSm = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Middle);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$middleXs = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Middle);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$topXl = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Top);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$topLg = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Top);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$topMd = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Top);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$topSm = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Top);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$topXs = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Top);
var _rundis$elm_bootstrap$Bootstrap_Grid_Row$attrs = function (attrs) {
	return _rundis$elm_bootstrap$Bootstrap_Grid_Internal$RowAttrs(attrs);
};

var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXl12 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move12);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXl11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXl10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXl9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXl8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXl7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXl6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXl5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXl4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXl3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXl2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXl1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXl0 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move0);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushLg12 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move12);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushLg11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushLg10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushLg9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushLg8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushLg7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushLg6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushLg5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushLg4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushLg3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushLg2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushLg1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushLg0 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move0);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushMd12 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move12);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushMd11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushMd10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushMd9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushMd8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushMd7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushMd6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushMd5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushMd4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushMd3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushMd2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushMd1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushMd0 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move0);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushSm12 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move12);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushSm11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushSm10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushSm9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushSm8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushSm7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushSm6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushSm5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushSm4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushSm3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushSm2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushSm1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushSm0 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move0);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXs12 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move12);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXs11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXs10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXs9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXs8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXs7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXs6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXs5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXs4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXs3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXs2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXs1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pushXs0 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$push, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move0);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXl12 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move12);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXl11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXl10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXl9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXl8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXl7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXl6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXl5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXl4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXl3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXl2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXl1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXl0 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move0);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullLg12 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move12);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullLg11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullLg10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullLg9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullLg8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullLg7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullLg6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullLg5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullLg4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullLg3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullLg2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullLg1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullLg0 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move0);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullMd12 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move12);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullMd11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullMd10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullMd9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullMd8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullMd7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullMd6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullMd5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullMd4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullMd3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullMd2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullMd1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullMd0 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move0);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullSm12 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move12);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullSm11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullSm10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullSm9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullSm8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullSm7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullSm6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullSm5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullSm4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullSm3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullSm2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullSm1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullSm0 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move0);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXs12 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move12);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXs11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXs10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXs9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXs8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXs7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXs6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXs5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXs4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXs3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXs2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXs1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$pullXs0 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$pull, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Move0);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXl11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXl10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXl9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXl8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXl7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXl6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXl5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXl4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXl3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXl2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXl1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXl0 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset0);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetLg11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetLg10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetLg9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetLg8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetLg7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetLg6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetLg5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetLg4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetLg3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetLg2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetLg1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetLg0 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset0);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetMd11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetMd10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetMd9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetMd8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetMd7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetMd6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetMd5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetMd4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetMd3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetMd2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetMd1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetMd0 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset0);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetSm11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetSm10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetSm9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetSm8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetSm7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetSm6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetSm5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetSm4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetSm3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetSm2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetSm1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetSm0 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset0);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXs11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXs10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXs9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXs8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXs7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXs6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXs5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXs4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXs3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXs2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$offsetXs1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$offset, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Offset1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xlAuto = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$ColAuto);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xl12 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col12);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xl11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xl10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xl9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xl8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xl7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xl6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xl5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xl4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xl3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xl2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xl1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xl = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$lgAuto = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$ColAuto);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$lg12 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col12);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$lg11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$lg10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$lg9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$lg8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$lg7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$lg6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$lg5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$lg4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$lg3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$lg2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$lg1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$lg = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$mdAuto = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$ColAuto);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$md12 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col12);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$md11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$md10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$md9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$md8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$md7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$md6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$md5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$md4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$md3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$md2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$md1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$md = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$smAuto = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$ColAuto);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$sm12 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col12);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$sm11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$sm10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$sm9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$sm8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$sm7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$sm6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$sm5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$sm4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$sm3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$sm2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$sm1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$sm = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xsAuto = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$ColAuto);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xs12 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col12);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xs11 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col11);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xs10 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col10);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xs9 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col9);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xs8 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col8);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xs7 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col7);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xs6 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col6);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xs5 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col5);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xs4 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col4);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xs3 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col3);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xs2 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col2);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xs1 = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col1);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$xs = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$width, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Col);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$bottomXl = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$colVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Bottom);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$bottomLg = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$colVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Bottom);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$bottomMd = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$colVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Bottom);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$bottomSm = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$colVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Bottom);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$bottomXs = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$colVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Bottom);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$middleXl = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$colVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Middle);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$middleLg = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$colVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Middle);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$middleMd = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$colVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Middle);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$middleSm = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$colVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Middle);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$middleXs = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$colVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Middle);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$topXl = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$colVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XL, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Top);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$topLg = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$colVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Top);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$topMd = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$colVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$MD, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Top);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$topSm = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$colVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Top);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$topXs = A2(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$colVAlign, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$XS, _rundis$elm_bootstrap$Bootstrap_Grid_Internal$Top);
var _rundis$elm_bootstrap$Bootstrap_Grid_Col$attrs = function (attrs) {
	return _rundis$elm_bootstrap$Bootstrap_Grid_Internal$ColAttrs(attrs);
};

var _rundis$elm_bootstrap$Bootstrap_Form$renderCol = function (_p0) {
	var _p1 = _p0;
	return A2(
		_p1._0.elemFn,
		_rundis$elm_bootstrap$Bootstrap_Grid_Internal$colAttributes(_p1._0.options),
		_p1._0.children);
};
var _rundis$elm_bootstrap$Bootstrap_Form$row = F2(
	function (options, cols) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('form-group'),
				_1: _rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowAttributes(options)
			},
			A2(_elm_lang$core$List$map, _rundis$elm_bootstrap$Bootstrap_Form$renderCol, cols));
	});
var _rundis$elm_bootstrap$Bootstrap_Form$applyModifier = F2(
	function (modifier, options) {
		var _p2 = modifier;
		return _elm_lang$core$Native_Utils.update(
			options,
			{
				attributes: A2(_elm_lang$core$Basics_ops['++'], options.attributes, _p2._0)
			});
	});
var _rundis$elm_bootstrap$Bootstrap_Form$defaultOptions = {
	attributes: {ctor: '[]'}
};
var _rundis$elm_bootstrap$Bootstrap_Form$toAttributes = function (modifiers) {
	var options = A3(_elm_lang$core$List$foldl, _rundis$elm_bootstrap$Bootstrap_Form$applyModifier, _rundis$elm_bootstrap$Bootstrap_Form$defaultOptions, modifiers);
	return A2(
		_elm_lang$core$Basics_ops['++'],
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('form-group'),
			_1: {ctor: '[]'}
		},
		options.attributes);
};
var _rundis$elm_bootstrap$Bootstrap_Form$invalidFeedback = F2(
	function (attributes, children) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('invalid-feedback'),
				_1: attributes
			},
			children);
	});
var _rundis$elm_bootstrap$Bootstrap_Form$validFeedback = F2(
	function (attributes, children) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('valid-feedback'),
				_1: attributes
			},
			children);
	});
var _rundis$elm_bootstrap$Bootstrap_Form$helpInline = F2(
	function (attributes, children) {
		return A2(
			_elm_lang$html$Html$small,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('text-muted'),
				_1: attributes
			},
			children);
	});
var _rundis$elm_bootstrap$Bootstrap_Form$help = F2(
	function (attributes, children) {
		return A2(
			_elm_lang$html$Html$small,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('form-text text-muted'),
				_1: attributes
			},
			children);
	});
var _rundis$elm_bootstrap$Bootstrap_Form$label = F2(
	function (attributes, children) {
		return A2(
			_elm_lang$html$Html$label,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('form-control-label'),
				_1: attributes
			},
			children);
	});
var _rundis$elm_bootstrap$Bootstrap_Form$group = F2(
	function (options, children) {
		return A2(
			_elm_lang$html$Html$div,
			_rundis$elm_bootstrap$Bootstrap_Form$toAttributes(options),
			children);
	});
var _rundis$elm_bootstrap$Bootstrap_Form$form = F2(
	function (attributes, children) {
		return A2(_elm_lang$html$Html$form, attributes, children);
	});
var _rundis$elm_bootstrap$Bootstrap_Form$formInline = function (attributes) {
	return _rundis$elm_bootstrap$Bootstrap_Form$form(
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('form-inline'),
			_1: attributes
		});
};
var _rundis$elm_bootstrap$Bootstrap_Form$Options = function (a) {
	return {attributes: a};
};
var _rundis$elm_bootstrap$Bootstrap_Form$Col = function (a) {
	return {ctor: 'Col', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Form$col = F2(
	function (options, children) {
		return _rundis$elm_bootstrap$Bootstrap_Form$Col(
			{elemFn: _elm_lang$html$Html$div, options: options, children: children});
	});
var _rundis$elm_bootstrap$Bootstrap_Form$colLabel = F2(
	function (options, children) {
		return _rundis$elm_bootstrap$Bootstrap_Form$Col(
			{
				elemFn: _elm_lang$html$Html$label,
				options: {
					ctor: '::',
					_0: _rundis$elm_bootstrap$Bootstrap_Grid_Col$attrs(
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('col-form-label'),
							_1: {ctor: '[]'}
						}),
					_1: options
				},
				children: children
			});
	});
var _rundis$elm_bootstrap$Bootstrap_Form$colLabelSm = function (options) {
	return _rundis$elm_bootstrap$Bootstrap_Form$colLabel(
		{
			ctor: '::',
			_0: _rundis$elm_bootstrap$Bootstrap_Grid_Col$attrs(
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('col-form-label-sm'),
					_1: {ctor: '[]'}
				}),
			_1: options
		});
};
var _rundis$elm_bootstrap$Bootstrap_Form$colLabelLg = function (options) {
	return _rundis$elm_bootstrap$Bootstrap_Form$colLabel(
		{
			ctor: '::',
			_0: _rundis$elm_bootstrap$Bootstrap_Grid_Col$attrs(
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('col-form-label-lg'),
					_1: {ctor: '[]'}
				}),
			_1: options
		});
};
var _rundis$elm_bootstrap$Bootstrap_Form$Attrs = function (a) {
	return {ctor: 'Attrs', _0: a};
};

var _rundis$elm_bootstrap$Bootstrap_Form_FormInternal$validationToString = function (validation) {
	var _p0 = validation;
	if (_p0.ctor === 'Success') {
		return 'is-valid';
	} else {
		return 'is-invalid';
	}
};
var _rundis$elm_bootstrap$Bootstrap_Form_FormInternal$validationWrapperAttribute = function (validation) {
	return _elm_lang$html$Html_Attributes$class(
		A2(
			_elm_lang$core$Basics_ops['++'],
			'has-',
			_rundis$elm_bootstrap$Bootstrap_Form_FormInternal$validationToString(validation)));
};
var _rundis$elm_bootstrap$Bootstrap_Form_FormInternal$Danger = {ctor: 'Danger'};
var _rundis$elm_bootstrap$Bootstrap_Form_FormInternal$Success = {ctor: 'Success'};

var _rundis$elm_bootstrap$Bootstrap_Form_Input$validationAttribute = function (validation) {
	return _elm_lang$html$Html_Attributes$class(
		_rundis$elm_bootstrap$Bootstrap_Form_FormInternal$validationToString(validation));
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$typeAttribute = function (inputType) {
	return _elm_lang$html$Html_Attributes$type_(
		function () {
			var _p0 = inputType;
			switch (_p0.ctor) {
				case 'Text':
					return 'text';
				case 'Password':
					return 'password';
				case 'DatetimeLocal':
					return 'datetime-local';
				case 'Date':
					return 'date';
				case 'Month':
					return 'month';
				case 'Time':
					return 'time';
				case 'Week':
					return 'week';
				case 'Number':
					return 'number';
				case 'Email':
					return 'email';
				case 'Url':
					return 'url';
				case 'Search':
					return 'search';
				case 'Tel':
					return 'tel';
				default:
					return 'color';
			}
		}());
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$sizeAttribute = function (size) {
	return A2(
		_elm_lang$core$Maybe$map,
		function (s) {
			return _elm_lang$html$Html_Attributes$class(
				A2(_elm_lang$core$Basics_ops['++'], 'form-control-', s));
		},
		_rundis$elm_bootstrap$Bootstrap_Grid_Internal$screenSizeOption(size));
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$applyModifier = F2(
	function (modifier, options) {
		var _p1 = modifier;
		switch (_p1.ctor) {
			case 'Size':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						size: _elm_lang$core$Maybe$Just(_p1._0)
					});
			case 'Id':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						id: _elm_lang$core$Maybe$Just(_p1._0)
					});
			case 'Type':
				return _elm_lang$core$Native_Utils.update(
					options,
					{tipe: _p1._0});
			case 'Disabled':
				return _elm_lang$core$Native_Utils.update(
					options,
					{disabled: _p1._0});
			case 'Value':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						value: _elm_lang$core$Maybe$Just(_p1._0)
					});
			case 'DefaultValue':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						defaultValue: _elm_lang$core$Maybe$Just(_p1._0)
					});
			case 'Placeholder':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						placeholder: _elm_lang$core$Maybe$Just(_p1._0)
					});
			case 'OnInput':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						onInput: _elm_lang$core$Maybe$Just(_p1._0)
					});
			case 'Validation':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						validation: _elm_lang$core$Maybe$Just(_p1._0)
					});
			case 'Readonly':
				return _elm_lang$core$Native_Utils.update(
					options,
					{readonly: _p1._0});
			default:
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						attributes: A2(_elm_lang$core$Basics_ops['++'], options.attributes, _p1._0)
					});
		}
	});
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Options = function (a) {
	return function (b) {
		return function (c) {
			return function (d) {
				return function (e) {
					return function (f) {
						return function (g) {
							return function (h) {
								return function (i) {
									return function (j) {
										return function (k) {
											return {tipe: a, id: b, size: c, disabled: d, value: e, defaultValue: f, placeholder: g, onInput: h, validation: i, readonly: j, attributes: k};
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Input = function (a) {
	return {ctor: 'Input', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Attrs = function (a) {
	return {ctor: 'Attrs', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$attrs = function (attrs) {
	return _rundis$elm_bootstrap$Bootstrap_Form_Input$Attrs(attrs);
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Readonly = function (a) {
	return {ctor: 'Readonly', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$readonly = function (readonly) {
	return _rundis$elm_bootstrap$Bootstrap_Form_Input$Readonly(readonly);
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Placeholder = function (a) {
	return {ctor: 'Placeholder', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$placeholder = function (value) {
	return _rundis$elm_bootstrap$Bootstrap_Form_Input$Placeholder(value);
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Validation = function (a) {
	return {ctor: 'Validation', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$success = _rundis$elm_bootstrap$Bootstrap_Form_Input$Validation(_rundis$elm_bootstrap$Bootstrap_Form_FormInternal$Success);
var _rundis$elm_bootstrap$Bootstrap_Form_Input$danger = _rundis$elm_bootstrap$Bootstrap_Form_Input$Validation(_rundis$elm_bootstrap$Bootstrap_Form_FormInternal$Danger);
var _rundis$elm_bootstrap$Bootstrap_Form_Input$OnInput = function (a) {
	return {ctor: 'OnInput', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$onInput = function (toMsg) {
	return _rundis$elm_bootstrap$Bootstrap_Form_Input$OnInput(toMsg);
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$DefaultValue = function (a) {
	return {ctor: 'DefaultValue', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$defaultValue = function (value) {
	return _rundis$elm_bootstrap$Bootstrap_Form_Input$DefaultValue(value);
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Value = function (a) {
	return {ctor: 'Value', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$value = function (value) {
	return _rundis$elm_bootstrap$Bootstrap_Form_Input$Value(value);
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Disabled = function (a) {
	return {ctor: 'Disabled', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$disabled = function (disabled) {
	return _rundis$elm_bootstrap$Bootstrap_Form_Input$Disabled(disabled);
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Type = function (a) {
	return {ctor: 'Type', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$create = F2(
	function (tipe, options) {
		return _rundis$elm_bootstrap$Bootstrap_Form_Input$Input(
			{
				options: {
					ctor: '::',
					_0: _rundis$elm_bootstrap$Bootstrap_Form_Input$Type(tipe),
					_1: options
				}
			});
	});
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Id = function (a) {
	return {ctor: 'Id', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$id = function (id) {
	return _rundis$elm_bootstrap$Bootstrap_Form_Input$Id(id);
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Size = function (a) {
	return {ctor: 'Size', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$small = _rundis$elm_bootstrap$Bootstrap_Form_Input$Size(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM);
var _rundis$elm_bootstrap$Bootstrap_Form_Input$large = _rundis$elm_bootstrap$Bootstrap_Form_Input$Size(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG);
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Color = {ctor: 'Color'};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Tel = {ctor: 'Tel'};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Search = {ctor: 'Search'};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Url = {ctor: 'Url'};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Email = {ctor: 'Email'};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Number = {ctor: 'Number'};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Week = {ctor: 'Week'};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Time = {ctor: 'Time'};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Month = {ctor: 'Month'};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Date = {ctor: 'Date'};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$DatetimeLocal = {ctor: 'DatetimeLocal'};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Password = {ctor: 'Password'};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$Text = {ctor: 'Text'};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$defaultOptions = {
	tipe: _rundis$elm_bootstrap$Bootstrap_Form_Input$Text,
	id: _elm_lang$core$Maybe$Nothing,
	size: _elm_lang$core$Maybe$Nothing,
	disabled: false,
	value: _elm_lang$core$Maybe$Nothing,
	defaultValue: _elm_lang$core$Maybe$Nothing,
	placeholder: _elm_lang$core$Maybe$Nothing,
	onInput: _elm_lang$core$Maybe$Nothing,
	validation: _elm_lang$core$Maybe$Nothing,
	readonly: false,
	attributes: {ctor: '[]'}
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$toAttributes = function (modifiers) {
	var options = A3(_elm_lang$core$List$foldl, _rundis$elm_bootstrap$Bootstrap_Form_Input$applyModifier, _rundis$elm_bootstrap$Bootstrap_Form_Input$defaultOptions, modifiers);
	return A2(
		_elm_lang$core$Basics_ops['++'],
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('form-control'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$disabled(options.disabled),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$readonly(options.readonly),
					_1: {
						ctor: '::',
						_0: _rundis$elm_bootstrap$Bootstrap_Form_Input$typeAttribute(options.tipe),
						_1: {ctor: '[]'}
					}
				}
			}
		},
		A2(
			_elm_lang$core$Basics_ops['++'],
			A2(
				_elm_lang$core$List$filterMap,
				_elm_lang$core$Basics$identity,
				{
					ctor: '::',
					_0: A2(_elm_lang$core$Maybe$map, _elm_lang$html$Html_Attributes$id, options.id),
					_1: {
						ctor: '::',
						_0: A2(_elm_lang$core$Maybe$andThen, _rundis$elm_bootstrap$Bootstrap_Form_Input$sizeAttribute, options.size),
						_1: {
							ctor: '::',
							_0: A2(_elm_lang$core$Maybe$map, _elm_lang$html$Html_Attributes$value, options.value),
							_1: {
								ctor: '::',
								_0: A2(_elm_lang$core$Maybe$map, _elm_lang$html$Html_Attributes$defaultValue, options.defaultValue),
								_1: {
									ctor: '::',
									_0: A2(_elm_lang$core$Maybe$map, _elm_lang$html$Html_Attributes$placeholder, options.placeholder),
									_1: {
										ctor: '::',
										_0: A2(_elm_lang$core$Maybe$map, _elm_lang$html$Html_Events$onInput, options.onInput),
										_1: {
											ctor: '::',
											_0: A2(_elm_lang$core$Maybe$map, _rundis$elm_bootstrap$Bootstrap_Form_Input$validationAttribute, options.validation),
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					}
				}),
			options.attributes));
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$view = function (_p2) {
	var _p3 = _p2;
	return A2(
		_elm_lang$html$Html$input,
		_rundis$elm_bootstrap$Bootstrap_Form_Input$toAttributes(_p3._0.options),
		{ctor: '[]'});
};
var _rundis$elm_bootstrap$Bootstrap_Form_Input$input = F2(
	function (tipe, options) {
		return _rundis$elm_bootstrap$Bootstrap_Form_Input$view(
			A2(_rundis$elm_bootstrap$Bootstrap_Form_Input$create, tipe, options));
	});
var _rundis$elm_bootstrap$Bootstrap_Form_Input$text = _rundis$elm_bootstrap$Bootstrap_Form_Input$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$Text);
var _rundis$elm_bootstrap$Bootstrap_Form_Input$password = _rundis$elm_bootstrap$Bootstrap_Form_Input$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$Password);
var _rundis$elm_bootstrap$Bootstrap_Form_Input$datetimeLocal = _rundis$elm_bootstrap$Bootstrap_Form_Input$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$DatetimeLocal);
var _rundis$elm_bootstrap$Bootstrap_Form_Input$date = _rundis$elm_bootstrap$Bootstrap_Form_Input$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$Date);
var _rundis$elm_bootstrap$Bootstrap_Form_Input$month = _rundis$elm_bootstrap$Bootstrap_Form_Input$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$Month);
var _rundis$elm_bootstrap$Bootstrap_Form_Input$time = _rundis$elm_bootstrap$Bootstrap_Form_Input$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$Time);
var _rundis$elm_bootstrap$Bootstrap_Form_Input$week = _rundis$elm_bootstrap$Bootstrap_Form_Input$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$Week);
var _rundis$elm_bootstrap$Bootstrap_Form_Input$number = _rundis$elm_bootstrap$Bootstrap_Form_Input$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$Number);
var _rundis$elm_bootstrap$Bootstrap_Form_Input$email = _rundis$elm_bootstrap$Bootstrap_Form_Input$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$Email);
var _rundis$elm_bootstrap$Bootstrap_Form_Input$url = _rundis$elm_bootstrap$Bootstrap_Form_Input$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$Url);
var _rundis$elm_bootstrap$Bootstrap_Form_Input$search = _rundis$elm_bootstrap$Bootstrap_Form_Input$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$Search);
var _rundis$elm_bootstrap$Bootstrap_Form_Input$tel = _rundis$elm_bootstrap$Bootstrap_Form_Input$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$Tel);
var _rundis$elm_bootstrap$Bootstrap_Form_Input$color = _rundis$elm_bootstrap$Bootstrap_Form_Input$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$Color);

var _elm_lang$dom$Native_Dom = function() {

var fakeNode = {
	addEventListener: function() {},
	removeEventListener: function() {}
};

var onDocument = on(typeof document !== 'undefined' ? document : fakeNode);
var onWindow = on(typeof window !== 'undefined' ? window : fakeNode);

function on(node)
{
	return function(eventName, decoder, toTask)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {

			function performTask(event)
			{
				var result = A2(_elm_lang$core$Json_Decode$decodeValue, decoder, event);
				if (result.ctor === 'Ok')
				{
					_elm_lang$core$Native_Scheduler.rawSpawn(toTask(result._0));
				}
			}

			node.addEventListener(eventName, performTask);

			return function()
			{
				node.removeEventListener(eventName, performTask);
			};
		});
	};
}

var rAF = typeof requestAnimationFrame !== 'undefined'
	? requestAnimationFrame
	: function(callback) { callback(); };

function withNode(id, doStuff)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		rAF(function()
		{
			var node = document.getElementById(id);
			if (node === null)
			{
				callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'NotFound', _0: id }));
				return;
			}
			callback(_elm_lang$core$Native_Scheduler.succeed(doStuff(node)));
		});
	});
}


// FOCUS

function focus(id)
{
	return withNode(id, function(node) {
		node.focus();
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function blur(id)
{
	return withNode(id, function(node) {
		node.blur();
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}


// SCROLLING

function getScrollTop(id)
{
	return withNode(id, function(node) {
		return node.scrollTop;
	});
}

function setScrollTop(id, desiredScrollTop)
{
	return withNode(id, function(node) {
		node.scrollTop = desiredScrollTop;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function toBottom(id)
{
	return withNode(id, function(node) {
		node.scrollTop = node.scrollHeight;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function getScrollLeft(id)
{
	return withNode(id, function(node) {
		return node.scrollLeft;
	});
}

function setScrollLeft(id, desiredScrollLeft)
{
	return withNode(id, function(node) {
		node.scrollLeft = desiredScrollLeft;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}

function toRight(id)
{
	return withNode(id, function(node) {
		node.scrollLeft = node.scrollWidth;
		return _elm_lang$core$Native_Utils.Tuple0;
	});
}


// SIZE

function width(options, id)
{
	return withNode(id, function(node) {
		switch (options.ctor)
		{
			case 'Content':
				return node.scrollWidth;
			case 'VisibleContent':
				return node.clientWidth;
			case 'VisibleContentWithBorders':
				return node.offsetWidth;
			case 'VisibleContentWithBordersAndMargins':
				var rect = node.getBoundingClientRect();
				return rect.right - rect.left;
		}
	});
}

function height(options, id)
{
	return withNode(id, function(node) {
		switch (options.ctor)
		{
			case 'Content':
				return node.scrollHeight;
			case 'VisibleContent':
				return node.clientHeight;
			case 'VisibleContentWithBorders':
				return node.offsetHeight;
			case 'VisibleContentWithBordersAndMargins':
				var rect = node.getBoundingClientRect();
				return rect.bottom - rect.top;
		}
	});
}

return {
	onDocument: F3(onDocument),
	onWindow: F3(onWindow),

	focus: focus,
	blur: blur,

	getScrollTop: getScrollTop,
	setScrollTop: F2(setScrollTop),
	getScrollLeft: getScrollLeft,
	setScrollLeft: F2(setScrollLeft),
	toBottom: toBottom,
	toRight: toRight,

	height: F2(height),
	width: F2(width)
};

}();

var _elm_lang$dom$Dom_LowLevel$onWindow = _elm_lang$dom$Native_Dom.onWindow;
var _elm_lang$dom$Dom_LowLevel$onDocument = _elm_lang$dom$Native_Dom.onDocument;

var _elm_lang$mouse$Mouse_ops = _elm_lang$mouse$Mouse_ops || {};
_elm_lang$mouse$Mouse_ops['&>'] = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Task$andThen,
			function (_p0) {
				return t2;
			},
			t1);
	});
var _elm_lang$mouse$Mouse$onSelfMsg = F3(
	function (router, _p1, state) {
		var _p2 = _p1;
		var _p3 = A2(_elm_lang$core$Dict$get, _p2.category, state);
		if (_p3.ctor === 'Nothing') {
			return _elm_lang$core$Task$succeed(state);
		} else {
			var send = function (tagger) {
				return A2(
					_elm_lang$core$Platform$sendToApp,
					router,
					tagger(_p2.position));
			};
			return A2(
				_elm_lang$mouse$Mouse_ops['&>'],
				_elm_lang$core$Task$sequence(
					A2(_elm_lang$core$List$map, send, _p3._0.taggers)),
				_elm_lang$core$Task$succeed(state));
		}
	});
var _elm_lang$mouse$Mouse$init = _elm_lang$core$Task$succeed(_elm_lang$core$Dict$empty);
var _elm_lang$mouse$Mouse$categorizeHelpHelp = F2(
	function (value, maybeValues) {
		var _p4 = maybeValues;
		if (_p4.ctor === 'Nothing') {
			return _elm_lang$core$Maybe$Just(
				{
					ctor: '::',
					_0: value,
					_1: {ctor: '[]'}
				});
		} else {
			return _elm_lang$core$Maybe$Just(
				{ctor: '::', _0: value, _1: _p4._0});
		}
	});
var _elm_lang$mouse$Mouse$categorizeHelp = F2(
	function (subs, subDict) {
		categorizeHelp:
		while (true) {
			var _p5 = subs;
			if (_p5.ctor === '[]') {
				return subDict;
			} else {
				var _v4 = _p5._1,
					_v5 = A3(
					_elm_lang$core$Dict$update,
					_p5._0._0,
					_elm_lang$mouse$Mouse$categorizeHelpHelp(_p5._0._1),
					subDict);
				subs = _v4;
				subDict = _v5;
				continue categorizeHelp;
			}
		}
	});
var _elm_lang$mouse$Mouse$categorize = function (subs) {
	return A2(_elm_lang$mouse$Mouse$categorizeHelp, subs, _elm_lang$core$Dict$empty);
};
var _elm_lang$mouse$Mouse$subscription = _elm_lang$core$Native_Platform.leaf('Mouse');
var _elm_lang$mouse$Mouse$Position = F2(
	function (a, b) {
		return {x: a, y: b};
	});
var _elm_lang$mouse$Mouse$position = A3(
	_elm_lang$core$Json_Decode$map2,
	_elm_lang$mouse$Mouse$Position,
	A2(_elm_lang$core$Json_Decode$field, 'pageX', _elm_lang$core$Json_Decode$int),
	A2(_elm_lang$core$Json_Decode$field, 'pageY', _elm_lang$core$Json_Decode$int));
var _elm_lang$mouse$Mouse$Watcher = F2(
	function (a, b) {
		return {taggers: a, pid: b};
	});
var _elm_lang$mouse$Mouse$Msg = F2(
	function (a, b) {
		return {category: a, position: b};
	});
var _elm_lang$mouse$Mouse$onEffects = F3(
	function (router, newSubs, oldState) {
		var rightStep = F3(
			function (category, taggers, task) {
				var tracker = A3(
					_elm_lang$dom$Dom_LowLevel$onDocument,
					category,
					_elm_lang$mouse$Mouse$position,
					function (_p6) {
						return A2(
							_elm_lang$core$Platform$sendToSelf,
							router,
							A2(_elm_lang$mouse$Mouse$Msg, category, _p6));
					});
				return A2(
					_elm_lang$core$Task$andThen,
					function (state) {
						return A2(
							_elm_lang$core$Task$andThen,
							function (pid) {
								return _elm_lang$core$Task$succeed(
									A3(
										_elm_lang$core$Dict$insert,
										category,
										A2(_elm_lang$mouse$Mouse$Watcher, taggers, pid),
										state));
							},
							_elm_lang$core$Process$spawn(tracker));
					},
					task);
			});
		var bothStep = F4(
			function (category, _p7, taggers, task) {
				var _p8 = _p7;
				return A2(
					_elm_lang$core$Task$andThen,
					function (state) {
						return _elm_lang$core$Task$succeed(
							A3(
								_elm_lang$core$Dict$insert,
								category,
								A2(_elm_lang$mouse$Mouse$Watcher, taggers, _p8.pid),
								state));
					},
					task);
			});
		var leftStep = F3(
			function (category, _p9, task) {
				var _p10 = _p9;
				return A2(
					_elm_lang$mouse$Mouse_ops['&>'],
					_elm_lang$core$Process$kill(_p10.pid),
					task);
			});
		return A6(
			_elm_lang$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			oldState,
			_elm_lang$mouse$Mouse$categorize(newSubs),
			_elm_lang$core$Task$succeed(_elm_lang$core$Dict$empty));
	});
var _elm_lang$mouse$Mouse$MySub = F2(
	function (a, b) {
		return {ctor: 'MySub', _0: a, _1: b};
	});
var _elm_lang$mouse$Mouse$clicks = function (tagger) {
	return _elm_lang$mouse$Mouse$subscription(
		A2(_elm_lang$mouse$Mouse$MySub, 'click', tagger));
};
var _elm_lang$mouse$Mouse$moves = function (tagger) {
	return _elm_lang$mouse$Mouse$subscription(
		A2(_elm_lang$mouse$Mouse$MySub, 'mousemove', tagger));
};
var _elm_lang$mouse$Mouse$downs = function (tagger) {
	return _elm_lang$mouse$Mouse$subscription(
		A2(_elm_lang$mouse$Mouse$MySub, 'mousedown', tagger));
};
var _elm_lang$mouse$Mouse$ups = function (tagger) {
	return _elm_lang$mouse$Mouse$subscription(
		A2(_elm_lang$mouse$Mouse$MySub, 'mouseup', tagger));
};
var _elm_lang$mouse$Mouse$subMap = F2(
	function (func, _p11) {
		var _p12 = _p11;
		return A2(
			_elm_lang$mouse$Mouse$MySub,
			_p12._0,
			function (_p13) {
				return func(
					_p12._1(_p13));
			});
	});
_elm_lang$core$Native_Platform.effectManagers['Mouse'] = {pkg: 'elm-lang/mouse', init: _elm_lang$mouse$Mouse$init, onEffects: _elm_lang$mouse$Mouse$onEffects, onSelfMsg: _elm_lang$mouse$Mouse$onSelfMsg, tag: 'sub', subMap: _elm_lang$mouse$Mouse$subMap};

var _debois$elm_dom$DOM$className = A2(
	_elm_lang$core$Json_Decode$at,
	{
		ctor: '::',
		_0: 'className',
		_1: {ctor: '[]'}
	},
	_elm_lang$core$Json_Decode$string);
var _debois$elm_dom$DOM$scrollTop = A2(_elm_lang$core$Json_Decode$field, 'scrollTop', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$scrollLeft = A2(_elm_lang$core$Json_Decode$field, 'scrollLeft', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$offsetTop = A2(_elm_lang$core$Json_Decode$field, 'offsetTop', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$offsetLeft = A2(_elm_lang$core$Json_Decode$field, 'offsetLeft', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$offsetHeight = A2(_elm_lang$core$Json_Decode$field, 'offsetHeight', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$offsetWidth = A2(_elm_lang$core$Json_Decode$field, 'offsetWidth', _elm_lang$core$Json_Decode$float);
var _debois$elm_dom$DOM$childNodes = function (decoder) {
	var loop = F2(
		function (idx, xs) {
			return A2(
				_elm_lang$core$Json_Decode$andThen,
				function (_p0) {
					return A2(
						_elm_lang$core$Maybe$withDefault,
						_elm_lang$core$Json_Decode$succeed(xs),
						A2(
							_elm_lang$core$Maybe$map,
							function (x) {
								return A2(
									loop,
									idx + 1,
									{ctor: '::', _0: x, _1: xs});
							},
							_p0));
				},
				_elm_lang$core$Json_Decode$maybe(
					A2(
						_elm_lang$core$Json_Decode$field,
						_elm_lang$core$Basics$toString(idx),
						decoder)));
		});
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$List$reverse,
		A2(
			_elm_lang$core$Json_Decode$field,
			'childNodes',
			A2(
				loop,
				0,
				{ctor: '[]'})));
};
var _debois$elm_dom$DOM$childNode = function (idx) {
	return _elm_lang$core$Json_Decode$at(
		{
			ctor: '::',
			_0: 'childNodes',
			_1: {
				ctor: '::',
				_0: _elm_lang$core$Basics$toString(idx),
				_1: {ctor: '[]'}
			}
		});
};
var _debois$elm_dom$DOM$parentElement = function (decoder) {
	return A2(_elm_lang$core$Json_Decode$field, 'parentElement', decoder);
};
var _debois$elm_dom$DOM$previousSibling = function (decoder) {
	return A2(_elm_lang$core$Json_Decode$field, 'previousSibling', decoder);
};
var _debois$elm_dom$DOM$nextSibling = function (decoder) {
	return A2(_elm_lang$core$Json_Decode$field, 'nextSibling', decoder);
};
var _debois$elm_dom$DOM$offsetParent = F2(
	function (x, decoder) {
		return _elm_lang$core$Json_Decode$oneOf(
			{
				ctor: '::',
				_0: A2(
					_elm_lang$core$Json_Decode$field,
					'offsetParent',
					_elm_lang$core$Json_Decode$null(x)),
				_1: {
					ctor: '::',
					_0: A2(_elm_lang$core$Json_Decode$field, 'offsetParent', decoder),
					_1: {ctor: '[]'}
				}
			});
	});
var _debois$elm_dom$DOM$position = F2(
	function (x, y) {
		return A2(
			_elm_lang$core$Json_Decode$andThen,
			function (_p1) {
				var _p2 = _p1;
				var _p4 = _p2._1;
				var _p3 = _p2._0;
				return A2(
					_debois$elm_dom$DOM$offsetParent,
					{ctor: '_Tuple2', _0: _p3, _1: _p4},
					A2(_debois$elm_dom$DOM$position, _p3, _p4));
			},
			A5(
				_elm_lang$core$Json_Decode$map4,
				F4(
					function (scrollLeft, scrollTop, offsetLeft, offsetTop) {
						return {ctor: '_Tuple2', _0: (x + offsetLeft) - scrollLeft, _1: (y + offsetTop) - scrollTop};
					}),
				_debois$elm_dom$DOM$scrollLeft,
				_debois$elm_dom$DOM$scrollTop,
				_debois$elm_dom$DOM$offsetLeft,
				_debois$elm_dom$DOM$offsetTop));
	});
var _debois$elm_dom$DOM$boundingClientRect = A4(
	_elm_lang$core$Json_Decode$map3,
	F3(
		function (_p5, width, height) {
			var _p6 = _p5;
			return {top: _p6._1, left: _p6._0, width: width, height: height};
		}),
	A2(_debois$elm_dom$DOM$position, 0, 0),
	_debois$elm_dom$DOM$offsetWidth,
	_debois$elm_dom$DOM$offsetHeight);
var _debois$elm_dom$DOM$target = function (decoder) {
	return A2(_elm_lang$core$Json_Decode$field, 'target', decoder);
};
var _debois$elm_dom$DOM$Rectangle = F4(
	function (a, b, c, d) {
		return {top: a, left: b, width: c, height: d};
	});

var _rundis$elm_bootstrap$Bootstrap_Dropdown$sizeDecoder = A3(
	_elm_lang$core$Json_Decode$map2,
	F2(
		function (v0, v1) {
			return {ctor: '_Tuple2', _0: v0, _1: v1};
		}),
	_debois$elm_dom$DOM$target(_debois$elm_dom$DOM$boundingClientRect),
	_debois$elm_dom$DOM$target(
		_debois$elm_dom$DOM$nextSibling(
			A2(_debois$elm_dom$DOM$childNode, 0, _debois$elm_dom$DOM$boundingClientRect))));
var _rundis$elm_bootstrap$Bootstrap_Dropdown$applyModifier = F2(
	function (option, options) {
		var _p0 = option;
		switch (_p0.ctor) {
			case 'AlignMenuRight':
				return _elm_lang$core$Native_Utils.update(
					options,
					{hasMenuRight: true});
			case 'Dropup':
				return _elm_lang$core$Native_Utils.update(
					options,
					{isDropUp: true});
			case 'Attrs':
				return _elm_lang$core$Native_Utils.update(
					options,
					{attributes: _p0._0});
			case 'DropToDir':
				return _elm_lang$core$Native_Utils.update(
					options,
					{
						dropDirection: _elm_lang$core$Maybe$Just(_p0._0)
					});
			default:
				return _elm_lang$core$Native_Utils.update(
					options,
					{menuAttrs: _p0._0});
		}
	});
var _rundis$elm_bootstrap$Bootstrap_Dropdown$defaultOptions = {
	hasMenuRight: false,
	isDropUp: false,
	attributes: {ctor: '[]'},
	dropDirection: _elm_lang$core$Maybe$Nothing,
	menuAttrs: {ctor: '[]'}
};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$toConfig = function (options) {
	return A3(_elm_lang$core$List$foldl, _rundis$elm_bootstrap$Bootstrap_Dropdown$applyModifier, _rundis$elm_bootstrap$Bootstrap_Dropdown$defaultOptions, options);
};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$menuStyle = F2(
	function (_p1, config) {
		var _p2 = _p1;
		var _p5 = _p2._0.toggleSize;
		var _p4 = _p2._0.menuSize;
		var px = function (n) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(n),
				'px');
		};
		var translate = F3(
			function (x, y, z) {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'translate3d(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						px(x),
						A2(
							_elm_lang$core$Basics_ops['++'],
							',',
							A2(
								_elm_lang$core$Basics_ops['++'],
								px(y),
								A2(
									_elm_lang$core$Basics_ops['++'],
									',',
									A2(
										_elm_lang$core$Basics_ops['++'],
										px(z),
										')'))))));
			});
		var $default = {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'top', _1: '0'},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'left', _1: '0'},
				_1: {ctor: '[]'}
			}
		};
		return _elm_lang$html$Html_Attributes$style(
			function () {
				var _p3 = {ctor: '_Tuple2', _0: config.isDropUp, _1: config.dropDirection};
				_v2_3:
				do {
					_v2_0:
					do {
						if (_p3.ctor === '_Tuple2') {
							if (_p3._1.ctor === 'Just') {
								if (_p3._1._0.ctor === 'Dropright') {
									if (_p3._0 === true) {
										break _v2_0;
									} else {
										return $default;
									}
								} else {
									if (_p3._0 === true) {
										break _v2_0;
									} else {
										return A2(
											_elm_lang$core$Basics_ops['++'],
											$default,
											{
												ctor: '::',
												_0: {
													ctor: '_Tuple2',
													_0: 'transform',
													_1: A3(translate, (0 - _p5.width) - _p4.width, 0, 0)
												},
												_1: {ctor: '[]'}
											});
									}
								}
							} else {
								if (_p3._0 === true) {
									break _v2_0;
								} else {
									break _v2_3;
								}
							}
						} else {
							break _v2_3;
						}
					} while(false);
					return A2(
						_elm_lang$core$Basics_ops['++'],
						$default,
						{
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'transform',
								_1: A3(translate, 0 - _p5.width, 0 - _p4.height, 0)
							},
							_1: {ctor: '[]'}
						});
				} while(false);
				return A2(
					_elm_lang$core$Basics_ops['++'],
					$default,
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'transform',
							_1: A3(translate, 0 - _p5.width, _p5.height, 0)
						},
						_1: {ctor: '[]'}
					});
			}());
	});
var _rundis$elm_bootstrap$Bootstrap_Dropdown$dropDir = function (maybeDir) {
	var toAttrs = function (dir) {
		return {
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'drop',
					function () {
						var _p6 = dir;
						if (_p6.ctor === 'Dropleft') {
							return 'left';
						} else {
							return 'right';
						}
					}())),
			_1: {ctor: '[]'}
		};
	};
	return A2(
		_elm_lang$core$Maybe$withDefault,
		{ctor: '[]'},
		A2(_elm_lang$core$Maybe$map, toAttrs, maybeDir));
};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$StateRec = F3(
	function (a, b, c) {
		return {status: a, toggleSize: b, menuSize: c};
	});
var _rundis$elm_bootstrap$Bootstrap_Dropdown$SplitToggleConfig = F3(
	function (a, b, c) {
		return {options: a, togglerOptions: b, children: c};
	});
var _rundis$elm_bootstrap$Bootstrap_Dropdown$Options = F5(
	function (a, b, c, d, e) {
		return {isDropUp: a, hasMenuRight: b, dropDirection: c, attributes: d, menuAttrs: e};
	});
var _rundis$elm_bootstrap$Bootstrap_Dropdown$State = function (a) {
	return {ctor: 'State', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$updateStatus = F2(
	function (status, _p7) {
		var _p8 = _p7;
		return _rundis$elm_bootstrap$Bootstrap_Dropdown$State(
			_elm_lang$core$Native_Utils.update(
				_p8._0,
				{status: status}));
	});
var _rundis$elm_bootstrap$Bootstrap_Dropdown$Closed = {ctor: 'Closed'};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$initialState = _rundis$elm_bootstrap$Bootstrap_Dropdown$State(
	{
		status: _rundis$elm_bootstrap$Bootstrap_Dropdown$Closed,
		toggleSize: A4(_debois$elm_dom$DOM$Rectangle, 0, 0, 0, 0),
		menuSize: A4(_debois$elm_dom$DOM$Rectangle, 0, 0, 0, 0)
	});
var _rundis$elm_bootstrap$Bootstrap_Dropdown$dropdownAttributes = F2(
	function (status, config) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$classList(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'btn-group', _1: true},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'show',
								_1: !_elm_lang$core$Native_Utils.eq(status, _rundis$elm_bootstrap$Bootstrap_Dropdown$Closed)
							},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: 'dropup', _1: config.isDropUp},
								_1: {ctor: '[]'}
							}
						}
					}),
				_1: {ctor: '[]'}
			},
			A2(
				_elm_lang$core$Basics_ops['++'],
				_rundis$elm_bootstrap$Bootstrap_Dropdown$dropDir(config.dropDirection),
				config.attributes));
	});
var _rundis$elm_bootstrap$Bootstrap_Dropdown$dropdownMenu = F3(
	function (_p9, config, items) {
		var _p10 = _p9;
		var wrapperStyle = _elm_lang$core$Native_Utils.eq(_p10._0.status, _rundis$elm_bootstrap$Bootstrap_Dropdown$Closed) ? {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'height', _1: '0'},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'overflow', _1: 'hidden'},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'position', _1: 'relative'},
					_1: {ctor: '[]'}
				}
			}
		} : {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'position', _1: 'relative'},
			_1: {ctor: '[]'}
		};
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$style(wrapperStyle),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$div,
					A2(
						_elm_lang$core$Basics_ops['++'],
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$classList(
								{
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: 'dropdown-menu', _1: true},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 'dropdown-menu-right', _1: config.hasMenuRight},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'show', _1: true},
											_1: {ctor: '[]'}
										}
									}
								}),
							_1: {
								ctor: '::',
								_0: A2(_rundis$elm_bootstrap$Bootstrap_Dropdown$menuStyle, _p10, config),
								_1: {ctor: '[]'}
							}
						},
						config.menuAttrs),
					A2(
						_elm_lang$core$List$map,
						function (_p11) {
							var _p12 = _p11;
							return _p12._0;
						},
						items)),
				_1: {ctor: '[]'}
			});
	});
var _rundis$elm_bootstrap$Bootstrap_Dropdown$dropdown = F2(
	function (_p14, _p13) {
		var _p15 = _p14;
		var _p18 = _p15;
		var _p16 = _p13;
		var config = _rundis$elm_bootstrap$Bootstrap_Dropdown$toConfig(_p16.options);
		var _p17 = _p16.toggleButton;
		var buttonFn = _p17._0;
		return A2(
			_elm_lang$html$Html$div,
			A2(_rundis$elm_bootstrap$Bootstrap_Dropdown$dropdownAttributes, _p15._0.status, config),
			{
				ctor: '::',
				_0: A2(buttonFn, _p16.toggleMsg, _p18),
				_1: {
					ctor: '::',
					_0: A3(_rundis$elm_bootstrap$Bootstrap_Dropdown$dropdownMenu, _p18, config, _p16.items),
					_1: {ctor: '[]'}
				}
			});
	});
var _rundis$elm_bootstrap$Bootstrap_Dropdown$splitDropdown = F2(
	function (_p20, _p19) {
		var _p21 = _p20;
		var _p24 = _p21;
		var _p22 = _p19;
		var config = _rundis$elm_bootstrap$Bootstrap_Dropdown$toConfig(_p22.options);
		var _p23 = _p22.toggleButton;
		var buttonsFn = _p23._0;
		return A2(
			_elm_lang$html$Html$div,
			A2(_rundis$elm_bootstrap$Bootstrap_Dropdown$dropdownAttributes, _p21._0.status, config),
			A2(
				_elm_lang$core$Basics_ops['++'],
				A2(buttonsFn, _p22.toggleMsg, _p24),
				{
					ctor: '::',
					_0: A3(_rundis$elm_bootstrap$Bootstrap_Dropdown$dropdownMenu, _p24, config, _p22.items),
					_1: {ctor: '[]'}
				}));
	});
var _rundis$elm_bootstrap$Bootstrap_Dropdown$ListenClicks = {ctor: 'ListenClicks'};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$subscriptions = F2(
	function (_p25, toMsg) {
		var _p26 = _p25;
		var _p30 = _p26;
		var _p27 = _p26._0.status;
		switch (_p27.ctor) {
			case 'Open':
				return _elm_lang$animation_frame$AnimationFrame$times(
					function (_p28) {
						return toMsg(
							A2(_rundis$elm_bootstrap$Bootstrap_Dropdown$updateStatus, _rundis$elm_bootstrap$Bootstrap_Dropdown$ListenClicks, _p30));
					});
			case 'ListenClicks':
				return _elm_lang$mouse$Mouse$clicks(
					function (_p29) {
						return toMsg(
							A2(_rundis$elm_bootstrap$Bootstrap_Dropdown$updateStatus, _rundis$elm_bootstrap$Bootstrap_Dropdown$Closed, _p30));
					});
			default:
				return _elm_lang$core$Platform_Sub$none;
		}
	});
var _rundis$elm_bootstrap$Bootstrap_Dropdown$Open = {ctor: 'Open'};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$nextStatus = function (status) {
	var _p31 = status;
	switch (_p31.ctor) {
		case 'Open':
			return _rundis$elm_bootstrap$Bootstrap_Dropdown$Closed;
		case 'ListenClicks':
			return _rundis$elm_bootstrap$Bootstrap_Dropdown$Closed;
		default:
			return _rundis$elm_bootstrap$Bootstrap_Dropdown$Open;
	}
};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$clickHandler = F2(
	function (toMsg, _p32) {
		var _p33 = _p32;
		return A2(
			_elm_lang$core$Json_Decode$andThen,
			function (_p34) {
				var _p35 = _p34;
				return _elm_lang$core$Json_Decode$succeed(
					toMsg(
						_rundis$elm_bootstrap$Bootstrap_Dropdown$State(
							{
								status: _rundis$elm_bootstrap$Bootstrap_Dropdown$nextStatus(_p33._0.status),
								toggleSize: _p35._0,
								menuSize: _p35._1
							})));
			},
			_rundis$elm_bootstrap$Bootstrap_Dropdown$sizeDecoder);
	});
var _rundis$elm_bootstrap$Bootstrap_Dropdown$togglePrivate = F4(
	function (buttonOptions, children, toggleMsg, state) {
		return A2(
			_elm_lang$html$Html$button,
			A2(
				_elm_lang$core$Basics_ops['++'],
				_rundis$elm_bootstrap$Bootstrap_Internal_Button$buttonAttributes(buttonOptions),
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('dropdown-toggle'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$type_('button'),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html_Events$on,
								'click',
								A2(_rundis$elm_bootstrap$Bootstrap_Dropdown$clickHandler, toggleMsg, state)),
							_1: {ctor: '[]'}
						}
					}
				}),
			children);
	});
var _rundis$elm_bootstrap$Bootstrap_Dropdown$splitToggleButtonPrivate = F3(
	function (_p36, toggleMsg, state) {
		var _p37 = _p36;
		return {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$button,
				_rundis$elm_bootstrap$Bootstrap_Internal_Button$buttonAttributes(_p37.options),
				_p37.children),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$button,
					A2(
						_elm_lang$core$Basics_ops['++'],
						_rundis$elm_bootstrap$Bootstrap_Internal_Button$buttonAttributes(_p37.togglerOptions),
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('dropdown-toggle'),
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('dropdown-toggle-split'),
								_1: {
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$type_('button'),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html_Events$on,
											'click',
											A2(_rundis$elm_bootstrap$Bootstrap_Dropdown$clickHandler, toggleMsg, state)),
										_1: {ctor: '[]'}
									}
								}
							}
						}),
					{ctor: '[]'}),
				_1: {ctor: '[]'}
			}
		};
	});
var _rundis$elm_bootstrap$Bootstrap_Dropdown$toggleOpen = F2(
	function (toMsg, _p38) {
		var _p39 = _p38;
		return toMsg(
			A2(
				_rundis$elm_bootstrap$Bootstrap_Dropdown$updateStatus,
				_rundis$elm_bootstrap$Bootstrap_Dropdown$nextStatus(_p39._0.status),
				_p39));
	});
var _rundis$elm_bootstrap$Bootstrap_Dropdown$Attrs = function (a) {
	return {ctor: 'Attrs', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$attrs = function (attrs) {
	return _rundis$elm_bootstrap$Bootstrap_Dropdown$Attrs(attrs);
};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$MenuAttrs = function (a) {
	return {ctor: 'MenuAttrs', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$menuAttrs = function (attrs) {
	return _rundis$elm_bootstrap$Bootstrap_Dropdown$MenuAttrs(attrs);
};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$DropToDir = function (a) {
	return {ctor: 'DropToDir', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$AlignMenuRight = {ctor: 'AlignMenuRight'};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$alignMenuRight = _rundis$elm_bootstrap$Bootstrap_Dropdown$AlignMenuRight;
var _rundis$elm_bootstrap$Bootstrap_Dropdown$Dropup = {ctor: 'Dropup'};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$dropUp = _rundis$elm_bootstrap$Bootstrap_Dropdown$Dropup;
var _rundis$elm_bootstrap$Bootstrap_Dropdown$Dropright = {ctor: 'Dropright'};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$dropRight = _rundis$elm_bootstrap$Bootstrap_Dropdown$DropToDir(_rundis$elm_bootstrap$Bootstrap_Dropdown$Dropright);
var _rundis$elm_bootstrap$Bootstrap_Dropdown$Dropleft = {ctor: 'Dropleft'};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$dropLeft = _rundis$elm_bootstrap$Bootstrap_Dropdown$DropToDir(_rundis$elm_bootstrap$Bootstrap_Dropdown$Dropleft);
var _rundis$elm_bootstrap$Bootstrap_Dropdown$DropdownItem = function (a) {
	return {ctor: 'DropdownItem', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$anchorItem = F2(
	function (attributes, children) {
		return _rundis$elm_bootstrap$Bootstrap_Dropdown$DropdownItem(
			A2(
				_elm_lang$html$Html$a,
				A2(
					_elm_lang$core$Basics_ops['++'],
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('dropdown-item'),
						_1: {ctor: '[]'}
					},
					attributes),
				children));
	});
var _rundis$elm_bootstrap$Bootstrap_Dropdown$buttonItem = F2(
	function (attributes, children) {
		return _rundis$elm_bootstrap$Bootstrap_Dropdown$DropdownItem(
			A2(
				_elm_lang$html$Html$button,
				A2(
					_elm_lang$core$Basics_ops['++'],
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$type_('button'),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('dropdown-item'),
							_1: {ctor: '[]'}
						}
					},
					attributes),
				children));
	});
var _rundis$elm_bootstrap$Bootstrap_Dropdown$divider = _rundis$elm_bootstrap$Bootstrap_Dropdown$DropdownItem(
	A2(
		_elm_lang$html$Html$div,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$class('dropdown-divider'),
			_1: {ctor: '[]'}
		},
		{ctor: '[]'}));
var _rundis$elm_bootstrap$Bootstrap_Dropdown$header = function (children) {
	return _rundis$elm_bootstrap$Bootstrap_Dropdown$DropdownItem(
		A2(
			_elm_lang$html$Html$h6,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('dropdown-header'),
				_1: {ctor: '[]'}
			},
			children));
};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$DropdownToggle = function (a) {
	return {ctor: 'DropdownToggle', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$toggle = F2(
	function (buttonOptions, children) {
		return _rundis$elm_bootstrap$Bootstrap_Dropdown$DropdownToggle(
			A2(_rundis$elm_bootstrap$Bootstrap_Dropdown$togglePrivate, buttonOptions, children));
	});
var _rundis$elm_bootstrap$Bootstrap_Dropdown$SplitDropdownToggle = function (a) {
	return {ctor: 'SplitDropdownToggle', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Dropdown$splitToggle = function (config) {
	return _rundis$elm_bootstrap$Bootstrap_Dropdown$SplitDropdownToggle(
		_rundis$elm_bootstrap$Bootstrap_Dropdown$splitToggleButtonPrivate(config));
};

var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$sizeAttribute = function (size) {
	return A2(
		_elm_lang$core$Maybe$map,
		function (s) {
			return _elm_lang$html$Html_Attributes$class(
				A2(_elm_lang$core$Basics_ops['++'], 'input-group-', s));
		},
		_rundis$elm_bootstrap$Bootstrap_Grid_Internal$screenSizeOption(size));
};
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$view = function (_p0) {
	var _p1 = _p0;
	var _p7 = _p1._0;
	var _p2 = _p7.input;
	var input = _p2._0;
	return A2(
		_elm_lang$html$Html$div,
		A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('input-group'),
				_1: {ctor: '[]'}
			},
			A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_elm_lang$core$List$filterMap,
					_elm_lang$core$Basics$identity,
					{
						ctor: '::',
						_0: A2(_elm_lang$core$Maybe$andThen, _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$sizeAttribute, _p7.size),
						_1: {ctor: '[]'}
					}),
				_p7.attributes)),
		A2(
			_elm_lang$core$Basics_ops['++'],
			A2(
				_elm_lang$core$List$map,
				function (_p3) {
					var _p4 = _p3;
					return A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('input-group-prepend'),
							_1: {ctor: '[]'}
						},
						{
							ctor: '::',
							_0: _p4._0,
							_1: {ctor: '[]'}
						});
				},
				_p7.predecessors),
			A2(
				_elm_lang$core$Basics_ops['++'],
				{
					ctor: '::',
					_0: input,
					_1: {ctor: '[]'}
				},
				A2(
					_elm_lang$core$List$map,
					function (_p5) {
						var _p6 = _p5;
						return A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('input-group-prepend'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _p6._0,
								_1: {ctor: '[]'}
							});
					},
					_p7.successors))));
};
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$Config = function (a) {
	return {ctor: 'Config', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$config = function (input) {
	return _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$Config(
		{
			input: input,
			predecessors: {ctor: '[]'},
			successors: {ctor: '[]'},
			size: _elm_lang$core$Maybe$Nothing,
			attributes: {ctor: '[]'}
		});
};
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$predecessors = F2(
	function (addons, _p8) {
		var _p9 = _p8;
		return _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$Config(
			_elm_lang$core$Native_Utils.update(
				_p9._0,
				{predecessors: addons}));
	});
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$successors = F2(
	function (addons, _p10) {
		var _p11 = _p10;
		return _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$Config(
			_elm_lang$core$Native_Utils.update(
				_p11._0,
				{successors: addons}));
	});
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$large = function (_p12) {
	var _p13 = _p12;
	return _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$Config(
		_elm_lang$core$Native_Utils.update(
			_p13._0,
			{
				size: _elm_lang$core$Maybe$Just(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$LG)
			}));
};
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$small = function (_p14) {
	var _p15 = _p14;
	return _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$Config(
		_elm_lang$core$Native_Utils.update(
			_p15._0,
			{
				size: _elm_lang$core$Maybe$Just(_rundis$elm_bootstrap$Bootstrap_Grid_Internal$SM)
			}));
};
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$attrs = F2(
	function (attributes, _p16) {
		var _p17 = _p16;
		return _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$Config(
			_elm_lang$core$Native_Utils.update(
				_p17._0,
				{attributes: attributes}));
	});
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$Input = function (a) {
	return {ctor: 'Input', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$input = F2(
	function (inputFn, options) {
		return _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$Input(
			inputFn(options));
	});
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$text = _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$text);
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$password = _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$password);
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$datetimeLocal = _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$datetimeLocal);
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$date = _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$date);
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$month = _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$month);
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$time = _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$time);
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$week = _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$week);
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$number = _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$number);
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$email = _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$email);
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$url = _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$url);
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$search = _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$search);
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$tel = _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$input(_rundis$elm_bootstrap$Bootstrap_Form_Input$tel);
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$Addon = function (a) {
	return {ctor: 'Addon', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$span = F2(
	function (attributes, children) {
		return _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$Addon(
			A2(
				_elm_lang$html$Html$span,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('input-group-text'),
					_1: attributes
				},
				children));
	});
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$button = F2(
	function (options, children) {
		return _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$Addon(
			A2(_rundis$elm_bootstrap$Bootstrap_Button$button, options, children));
	});
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$dropdown = F2(
	function (state, config) {
		return _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$Addon(
			A2(_rundis$elm_bootstrap$Bootstrap_Dropdown$dropdown, state, config));
	});
var _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$splitDropdown = F2(
	function (state, config) {
		return _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$Addon(
			A2(_rundis$elm_bootstrap$Bootstrap_Dropdown$splitDropdown, state, config));
	});

var _elm_community$list_extra$List_Extra$greedyGroupsOfWithStep = F3(
	function (size, step, xs) {
		var okayXs = _elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$List$length(xs),
			0) > 0;
		var okayArgs = (_elm_lang$core$Native_Utils.cmp(size, 0) > 0) && (_elm_lang$core$Native_Utils.cmp(step, 0) > 0);
		var xs_ = A2(_elm_lang$core$List$drop, step, xs);
		var group = A2(_elm_lang$core$List$take, size, xs);
		return (okayArgs && okayXs) ? {
			ctor: '::',
			_0: group,
			_1: A3(_elm_community$list_extra$List_Extra$greedyGroupsOfWithStep, size, step, xs_)
		} : {ctor: '[]'};
	});
var _elm_community$list_extra$List_Extra$greedyGroupsOf = F2(
	function (size, xs) {
		return A3(_elm_community$list_extra$List_Extra$greedyGroupsOfWithStep, size, size, xs);
	});
var _elm_community$list_extra$List_Extra$groupsOfWithStep = F3(
	function (size, step, xs) {
		var okayArgs = (_elm_lang$core$Native_Utils.cmp(size, 0) > 0) && (_elm_lang$core$Native_Utils.cmp(step, 0) > 0);
		var xs_ = A2(_elm_lang$core$List$drop, step, xs);
		var group = A2(_elm_lang$core$List$take, size, xs);
		var okayLength = _elm_lang$core$Native_Utils.eq(
			size,
			_elm_lang$core$List$length(group));
		return (okayArgs && okayLength) ? {
			ctor: '::',
			_0: group,
			_1: A3(_elm_community$list_extra$List_Extra$groupsOfWithStep, size, step, xs_)
		} : {ctor: '[]'};
	});
var _elm_community$list_extra$List_Extra$groupsOf = F2(
	function (size, xs) {
		return A3(_elm_community$list_extra$List_Extra$groupsOfWithStep, size, size, xs);
	});
var _elm_community$list_extra$List_Extra$zip5 = _elm_lang$core$List$map5(
	F5(
		function (v0, v1, v2, v3, v4) {
			return {ctor: '_Tuple5', _0: v0, _1: v1, _2: v2, _3: v3, _4: v4};
		}));
var _elm_community$list_extra$List_Extra$zip4 = _elm_lang$core$List$map4(
	F4(
		function (v0, v1, v2, v3) {
			return {ctor: '_Tuple4', _0: v0, _1: v1, _2: v2, _3: v3};
		}));
var _elm_community$list_extra$List_Extra$zip3 = _elm_lang$core$List$map3(
	F3(
		function (v0, v1, v2) {
			return {ctor: '_Tuple3', _0: v0, _1: v1, _2: v2};
		}));
var _elm_community$list_extra$List_Extra$zip = _elm_lang$core$List$map2(
	F2(
		function (v0, v1) {
			return {ctor: '_Tuple2', _0: v0, _1: v1};
		}));
var _elm_community$list_extra$List_Extra$isSubsequenceOf = F2(
	function (subseq, list) {
		isSubsequenceOf:
		while (true) {
			var _p0 = {ctor: '_Tuple2', _0: subseq, _1: list};
			if (_p0._0.ctor === '[]') {
				return true;
			} else {
				if (_p0._1.ctor === '[]') {
					return false;
				} else {
					var _p1 = _p0._1._1;
					if (_elm_lang$core$Native_Utils.eq(_p0._0._0, _p0._1._0)) {
						var _v1 = _p0._0._1,
							_v2 = _p1;
						subseq = _v1;
						list = _v2;
						continue isSubsequenceOf;
					} else {
						var _v3 = subseq,
							_v4 = _p1;
						subseq = _v3;
						list = _v4;
						continue isSubsequenceOf;
					}
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$isPrefixOf = F2(
	function (prefix, xs) {
		var _p2 = {ctor: '_Tuple2', _0: prefix, _1: xs};
		if (_p2._0.ctor === '[]') {
			return true;
		} else {
			if (_p2._1.ctor === '[]') {
				return false;
			} else {
				return _elm_lang$core$Native_Utils.eq(_p2._0._0, _p2._1._0) && A2(_elm_community$list_extra$List_Extra$isPrefixOf, _p2._0._1, _p2._1._1);
			}
		}
	});
var _elm_community$list_extra$List_Extra$isSuffixOf = F2(
	function (suffix, xs) {
		return A2(
			_elm_community$list_extra$List_Extra$isPrefixOf,
			_elm_lang$core$List$reverse(suffix),
			_elm_lang$core$List$reverse(xs));
	});
var _elm_community$list_extra$List_Extra$isInfixOfHelp = F3(
	function (infixHead, infixTail, list) {
		isInfixOfHelp:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return false;
			} else {
				var _p4 = _p3._1;
				if (_elm_lang$core$Native_Utils.eq(_p3._0, infixHead)) {
					return A2(_elm_community$list_extra$List_Extra$isPrefixOf, infixTail, _p4);
				} else {
					var _v7 = infixHead,
						_v8 = infixTail,
						_v9 = _p4;
					infixHead = _v7;
					infixTail = _v8;
					list = _v9;
					continue isInfixOfHelp;
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$isInfixOf = F2(
	function (infixList, list) {
		var _p5 = infixList;
		if (_p5.ctor === '[]') {
			return true;
		} else {
			return A3(_elm_community$list_extra$List_Extra$isInfixOfHelp, _p5._0, _p5._1, list);
		}
	});
var _elm_community$list_extra$List_Extra$selectSplit = function (xs) {
	var _p6 = xs;
	if (_p6.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p10 = _p6._1;
		var _p9 = _p6._0;
		return {
			ctor: '::',
			_0: {
				ctor: '_Tuple3',
				_0: {ctor: '[]'},
				_1: _p9,
				_2: _p10
			},
			_1: A2(
				_elm_lang$core$List$map,
				function (_p7) {
					var _p8 = _p7;
					return {
						ctor: '_Tuple3',
						_0: {ctor: '::', _0: _p9, _1: _p8._0},
						_1: _p8._1,
						_2: _p8._2
					};
				},
				_elm_community$list_extra$List_Extra$selectSplit(_p10))
		};
	}
};
var _elm_community$list_extra$List_Extra$select = function (xs) {
	var _p11 = xs;
	if (_p11.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p15 = _p11._1;
		var _p14 = _p11._0;
		return {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: _p14, _1: _p15},
			_1: A2(
				_elm_lang$core$List$map,
				function (_p12) {
					var _p13 = _p12;
					return {
						ctor: '_Tuple2',
						_0: _p13._0,
						_1: {ctor: '::', _0: _p14, _1: _p13._1}
					};
				},
				_elm_community$list_extra$List_Extra$select(_p15))
		};
	}
};
var _elm_community$list_extra$List_Extra$tailsHelp = F2(
	function (e, list) {
		var _p16 = list;
		if (_p16.ctor === '::') {
			var _p17 = _p16._0;
			return {
				ctor: '::',
				_0: {ctor: '::', _0: e, _1: _p17},
				_1: {ctor: '::', _0: _p17, _1: _p16._1}
			};
		} else {
			return {ctor: '[]'};
		}
	});
var _elm_community$list_extra$List_Extra$tails = A2(
	_elm_lang$core$List$foldr,
	_elm_community$list_extra$List_Extra$tailsHelp,
	{
		ctor: '::',
		_0: {ctor: '[]'},
		_1: {ctor: '[]'}
	});
var _elm_community$list_extra$List_Extra$inits = A2(
	_elm_lang$core$List$foldr,
	F2(
		function (e, acc) {
			return {
				ctor: '::',
				_0: {ctor: '[]'},
				_1: A2(
					_elm_lang$core$List$map,
					F2(
						function (x, y) {
							return {ctor: '::', _0: x, _1: y};
						})(e),
					acc)
			};
		}),
	{
		ctor: '::',
		_0: {ctor: '[]'},
		_1: {ctor: '[]'}
	});
var _elm_community$list_extra$List_Extra$groupWhileTransitivelyHelp = F4(
	function (result, currentGroup, compare, list) {
		groupWhileTransitivelyHelp:
		while (true) {
			var _p18 = list;
			if (_p18.ctor === '[]') {
				return _elm_lang$core$List$reverse(
					_elm_lang$core$List$isEmpty(currentGroup) ? result : _elm_lang$core$List$reverse(
						{ctor: '::', _0: currentGroup, _1: result}));
			} else {
				if (_p18._1.ctor === '[]') {
					return _elm_lang$core$List$reverse(
						{
							ctor: '::',
							_0: _elm_lang$core$List$reverse(
								{ctor: '::', _0: _p18._0, _1: currentGroup}),
							_1: result
						});
				} else {
					var _p20 = _p18._1;
					var _p19 = _p18._0;
					if (A2(compare, _p19, _p18._1._0)) {
						var _v17 = result,
							_v18 = {ctor: '::', _0: _p19, _1: currentGroup},
							_v19 = compare,
							_v20 = _p20;
						result = _v17;
						currentGroup = _v18;
						compare = _v19;
						list = _v20;
						continue groupWhileTransitivelyHelp;
					} else {
						var _v21 = {
							ctor: '::',
							_0: _elm_lang$core$List$reverse(
								{ctor: '::', _0: _p19, _1: currentGroup}),
							_1: result
						},
							_v22 = {ctor: '[]'},
							_v23 = compare,
							_v24 = _p20;
						result = _v21;
						currentGroup = _v22;
						compare = _v23;
						list = _v24;
						continue groupWhileTransitivelyHelp;
					}
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$groupWhileTransitively = F2(
	function (compare, list) {
		return A4(
			_elm_community$list_extra$List_Extra$groupWhileTransitivelyHelp,
			{ctor: '[]'},
			{ctor: '[]'},
			compare,
			list);
	});
var _elm_community$list_extra$List_Extra$stripPrefix = F2(
	function (prefix, xs) {
		var step = F2(
			function (e, m) {
				var _p21 = m;
				if (_p21.ctor === 'Nothing') {
					return _elm_lang$core$Maybe$Nothing;
				} else {
					if (_p21._0.ctor === '[]') {
						return _elm_lang$core$Maybe$Nothing;
					} else {
						return _elm_lang$core$Native_Utils.eq(e, _p21._0._0) ? _elm_lang$core$Maybe$Just(_p21._0._1) : _elm_lang$core$Maybe$Nothing;
					}
				}
			});
		return A3(
			_elm_lang$core$List$foldl,
			step,
			_elm_lang$core$Maybe$Just(xs),
			prefix);
	});
var _elm_community$list_extra$List_Extra$dropWhileRight = function (p) {
	return A2(
		_elm_lang$core$List$foldr,
		F2(
			function (x, xs) {
				return (p(x) && _elm_lang$core$List$isEmpty(xs)) ? {ctor: '[]'} : {ctor: '::', _0: x, _1: xs};
			}),
		{ctor: '[]'});
};
var _elm_community$list_extra$List_Extra$takeWhileRight = function (p) {
	var step = F2(
		function (x, _p22) {
			var _p23 = _p22;
			var _p24 = _p23._0;
			return (p(x) && _p23._1) ? {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: x, _1: _p24},
				_1: true
			} : {ctor: '_Tuple2', _0: _p24, _1: false};
		});
	return function (_p25) {
		return _elm_lang$core$Tuple$first(
			A3(
				_elm_lang$core$List$foldr,
				step,
				{
					ctor: '_Tuple2',
					_0: {ctor: '[]'},
					_1: true
				},
				_p25));
	};
};
var _elm_community$list_extra$List_Extra$splitAt = F2(
	function (n, xs) {
		return {
			ctor: '_Tuple2',
			_0: A2(_elm_lang$core$List$take, n, xs),
			_1: A2(_elm_lang$core$List$drop, n, xs)
		};
	});
var _elm_community$list_extra$List_Extra$groupsOfVarying_ = F3(
	function (listOflengths, list, accu) {
		groupsOfVarying_:
		while (true) {
			var _p26 = {ctor: '_Tuple2', _0: listOflengths, _1: list};
			if (((_p26.ctor === '_Tuple2') && (_p26._0.ctor === '::')) && (_p26._1.ctor === '::')) {
				var _p27 = A2(_elm_community$list_extra$List_Extra$splitAt, _p26._0._0, list);
				var head = _p27._0;
				var tail = _p27._1;
				var _v28 = _p26._0._1,
					_v29 = tail,
					_v30 = {ctor: '::', _0: head, _1: accu};
				listOflengths = _v28;
				list = _v29;
				accu = _v30;
				continue groupsOfVarying_;
			} else {
				return _elm_lang$core$List$reverse(accu);
			}
		}
	});
var _elm_community$list_extra$List_Extra$groupsOfVarying = F2(
	function (listOflengths, list) {
		return A3(
			_elm_community$list_extra$List_Extra$groupsOfVarying_,
			listOflengths,
			list,
			{ctor: '[]'});
	});
var _elm_community$list_extra$List_Extra$unfoldr = F2(
	function (f, seed) {
		var _p28 = f(seed);
		if (_p28.ctor === 'Nothing') {
			return {ctor: '[]'};
		} else {
			return {
				ctor: '::',
				_0: _p28._0._0,
				_1: A2(_elm_community$list_extra$List_Extra$unfoldr, f, _p28._0._1)
			};
		}
	});
var _elm_community$list_extra$List_Extra$mapAccumr = F3(
	function (f, acc0, list) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, _p29) {
					var _p30 = _p29;
					var _p31 = A2(f, _p30._0, x);
					var acc2 = _p31._0;
					var y = _p31._1;
					return {
						ctor: '_Tuple2',
						_0: acc2,
						_1: {ctor: '::', _0: y, _1: _p30._1}
					};
				}),
			{
				ctor: '_Tuple2',
				_0: acc0,
				_1: {ctor: '[]'}
			},
			list);
	});
var _elm_community$list_extra$List_Extra$mapAccuml = F3(
	function (f, acc0, list) {
		var _p32 = A3(
			_elm_lang$core$List$foldl,
			F2(
				function (x, _p33) {
					var _p34 = _p33;
					var _p35 = A2(f, _p34._0, x);
					var acc2 = _p35._0;
					var y = _p35._1;
					return {
						ctor: '_Tuple2',
						_0: acc2,
						_1: {ctor: '::', _0: y, _1: _p34._1}
					};
				}),
			{
				ctor: '_Tuple2',
				_0: acc0,
				_1: {ctor: '[]'}
			},
			list);
		var accFinal = _p32._0;
		var generatedList = _p32._1;
		return {
			ctor: '_Tuple2',
			_0: accFinal,
			_1: _elm_lang$core$List$reverse(generatedList)
		};
	});
var _elm_community$list_extra$List_Extra$scanr1 = F2(
	function (f, xs_) {
		var _p36 = xs_;
		if (_p36.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p36._1.ctor === '[]') {
				return {
					ctor: '::',
					_0: _p36._0,
					_1: {ctor: '[]'}
				};
			} else {
				var _p37 = A2(_elm_community$list_extra$List_Extra$scanr1, f, _p36._1);
				if (_p37.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, _p36._0, _p37._0),
						_1: _p37
					};
				} else {
					return {ctor: '[]'};
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$scanr = F3(
	function (f, acc, xs_) {
		var _p38 = xs_;
		if (_p38.ctor === '[]') {
			return {
				ctor: '::',
				_0: acc,
				_1: {ctor: '[]'}
			};
		} else {
			var _p39 = A3(_elm_community$list_extra$List_Extra$scanr, f, acc, _p38._1);
			if (_p39.ctor === '::') {
				return {
					ctor: '::',
					_0: A2(f, _p38._0, _p39._0),
					_1: _p39
				};
			} else {
				return {ctor: '[]'};
			}
		}
	});
var _elm_community$list_extra$List_Extra$scanl1 = F2(
	function (f, xs_) {
		var _p40 = xs_;
		if (_p40.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			return A3(_elm_lang$core$List$scanl, f, _p40._0, _p40._1);
		}
	});
var _elm_community$list_extra$List_Extra$indexedFoldr = F3(
	function (func, acc, list) {
		var step = F2(
			function (x, _p41) {
				var _p42 = _p41;
				var _p43 = _p42._0;
				return {
					ctor: '_Tuple2',
					_0: _p43 - 1,
					_1: A3(func, _p43, x, _p42._1)
				};
			});
		return _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$List$foldr,
				step,
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$List$length(list) - 1,
					_1: acc
				},
				list));
	});
var _elm_community$list_extra$List_Extra$indexedFoldl = F3(
	function (func, acc, list) {
		var step = F2(
			function (x, _p44) {
				var _p45 = _p44;
				var _p46 = _p45._0;
				return {
					ctor: '_Tuple2',
					_0: _p46 + 1,
					_1: A3(func, _p46, x, _p45._1)
				};
			});
		return _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$List$foldl,
				step,
				{ctor: '_Tuple2', _0: 0, _1: acc},
				list));
	});
var _elm_community$list_extra$List_Extra$foldr1 = F2(
	function (f, xs) {
		var mf = F2(
			function (x, m) {
				return _elm_lang$core$Maybe$Just(
					function () {
						var _p47 = m;
						if (_p47.ctor === 'Nothing') {
							return x;
						} else {
							return A2(f, x, _p47._0);
						}
					}());
			});
		return A3(_elm_lang$core$List$foldr, mf, _elm_lang$core$Maybe$Nothing, xs);
	});
var _elm_community$list_extra$List_Extra$foldl1 = F2(
	function (f, xs) {
		var mf = F2(
			function (x, m) {
				return _elm_lang$core$Maybe$Just(
					function () {
						var _p48 = m;
						if (_p48.ctor === 'Nothing') {
							return x;
						} else {
							return A2(f, _p48._0, x);
						}
					}());
			});
		return A3(_elm_lang$core$List$foldl, mf, _elm_lang$core$Maybe$Nothing, xs);
	});
var _elm_community$list_extra$List_Extra$reverseAppend = F2(
	function (list1, list2) {
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			list2,
			list1);
	});
var _elm_community$list_extra$List_Extra$interweaveHelp = F3(
	function (acc, list1, list2) {
		interweaveHelp:
		while (true) {
			var _p49 = {ctor: '_Tuple2', _0: list1, _1: list2};
			if (_p49._0.ctor === '::') {
				if (_p49._1.ctor === '::') {
					var _v44 = {
						ctor: '::',
						_0: _p49._1._0,
						_1: {ctor: '::', _0: _p49._0._0, _1: acc}
					},
						_v45 = _p49._0._1,
						_v46 = _p49._1._1;
					acc = _v44;
					list1 = _v45;
					list2 = _v46;
					continue interweaveHelp;
				} else {
					return A2(_elm_community$list_extra$List_Extra$reverseAppend, acc, list1);
				}
			} else {
				return A2(_elm_community$list_extra$List_Extra$reverseAppend, acc, list2);
			}
		}
	});
var _elm_community$list_extra$List_Extra$interweave = _elm_community$list_extra$List_Extra$interweaveHelp(
	{ctor: '[]'});
var _elm_community$list_extra$List_Extra$permutations = function (xs_) {
	var _p50 = xs_;
	if (_p50.ctor === '[]') {
		return {
			ctor: '::',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		};
	} else {
		var f = function (_p51) {
			var _p52 = _p51;
			return A2(
				_elm_lang$core$List$map,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(_p52._0),
				_elm_community$list_extra$List_Extra$permutations(_p52._1));
		};
		return A2(
			_elm_lang$core$List$concatMap,
			f,
			_elm_community$list_extra$List_Extra$select(_p50));
	}
};
var _elm_community$list_extra$List_Extra$isPermutationOf = F2(
	function (permut, xs) {
		return A2(
			_elm_lang$core$List$member,
			permut,
			_elm_community$list_extra$List_Extra$permutations(xs));
	});
var _elm_community$list_extra$List_Extra$subsequencesNonEmpty = function (xs) {
	var _p53 = xs;
	if (_p53.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p54 = _p53._0;
		var f = F2(
			function (ys, r) {
				return {
					ctor: '::',
					_0: ys,
					_1: {
						ctor: '::',
						_0: {ctor: '::', _0: _p54, _1: ys},
						_1: r
					}
				};
			});
		return {
			ctor: '::',
			_0: {
				ctor: '::',
				_0: _p54,
				_1: {ctor: '[]'}
			},
			_1: A3(
				_elm_lang$core$List$foldr,
				f,
				{ctor: '[]'},
				_elm_community$list_extra$List_Extra$subsequencesNonEmpty(_p53._1))
		};
	}
};
var _elm_community$list_extra$List_Extra$subsequences = function (xs) {
	return {
		ctor: '::',
		_0: {ctor: '[]'},
		_1: _elm_community$list_extra$List_Extra$subsequencesNonEmpty(xs)
	};
};
var _elm_community$list_extra$List_Extra$rowsLength = function (listOfLists) {
	var _p55 = listOfLists;
	if (_p55.ctor === '[]') {
		return 0;
	} else {
		return _elm_lang$core$List$length(_p55._0);
	}
};
var _elm_community$list_extra$List_Extra$transpose = function (listOfLists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$map2(
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				})),
		A2(
			_elm_lang$core$List$repeat,
			_elm_community$list_extra$List_Extra$rowsLength(listOfLists),
			{ctor: '[]'}),
		listOfLists);
};
var _elm_community$list_extra$List_Extra$intercalate = function (xs) {
	return function (_p56) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$intersperse, xs, _p56));
	};
};
var _elm_community$list_extra$List_Extra$filterNot = F2(
	function (pred, list) {
		return A2(
			_elm_lang$core$List$filter,
			function (_p57) {
				return !pred(_p57);
			},
			list);
	});
var _elm_community$list_extra$List_Extra$removeIfIndex = function (predicate) {
	return A2(
		_elm_community$list_extra$List_Extra$indexedFoldr,
		F3(
			function (index, item, acc) {
				return predicate(index) ? acc : {ctor: '::', _0: item, _1: acc};
			}),
		{ctor: '[]'});
};
var _elm_community$list_extra$List_Extra$removeAt = F2(
	function (index, l) {
		if (_elm_lang$core$Native_Utils.cmp(index, 0) < 0) {
			return l;
		} else {
			var tail = _elm_lang$core$List$tail(
				A2(_elm_lang$core$List$drop, index, l));
			var head = A2(_elm_lang$core$List$take, index, l);
			var _p58 = tail;
			if (_p58.ctor === 'Nothing') {
				return l;
			} else {
				return A2(_elm_lang$core$List$append, head, _p58._0);
			}
		}
	});
var _elm_community$list_extra$List_Extra$stableSortWith = F2(
	function (pred, list) {
		var predWithIndex = F2(
			function (_p60, _p59) {
				var _p61 = _p60;
				var _p62 = _p59;
				var result = A2(pred, _p61._0, _p62._0);
				var _p63 = result;
				if (_p63.ctor === 'EQ') {
					return A2(_elm_lang$core$Basics$compare, _p61._1, _p62._1);
				} else {
					return result;
				}
			});
		var listWithIndex = A2(
			_elm_lang$core$List$indexedMap,
			F2(
				function (i, a) {
					return {ctor: '_Tuple2', _0: a, _1: i};
				}),
			list);
		return A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Tuple$first,
			A2(_elm_lang$core$List$sortWith, predWithIndex, listWithIndex));
	});
var _elm_community$list_extra$List_Extra$remove = F2(
	function (x, xs) {
		var _p64 = xs;
		if (_p64.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var _p66 = _p64._1;
			var _p65 = _p64._0;
			return _elm_lang$core$Native_Utils.eq(x, _p65) ? _p66 : {
				ctor: '::',
				_0: _p65,
				_1: A2(_elm_community$list_extra$List_Extra$remove, x, _p66)
			};
		}
	});
var _elm_community$list_extra$List_Extra$updateIfIndex = F3(
	function (predicate, update, list) {
		return A2(
			_elm_lang$core$List$indexedMap,
			F2(
				function (i, x) {
					return predicate(i) ? update(x) : x;
				}),
			list);
	});
var _elm_community$list_extra$List_Extra$updateAt = F3(
	function (index, fn, list) {
		if (_elm_lang$core$Native_Utils.cmp(index, 0) < 0) {
			return list;
		} else {
			var tail = A2(_elm_lang$core$List$drop, index, list);
			var head = A2(_elm_lang$core$List$take, index, list);
			var _p67 = tail;
			if (_p67.ctor === '::') {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					head,
					{
						ctor: '::',
						_0: fn(_p67._0),
						_1: _p67._1
					});
			} else {
				return list;
			}
		}
	});
var _elm_community$list_extra$List_Extra$setAt = F2(
	function (index, value) {
		return A2(
			_elm_community$list_extra$List_Extra$updateAt,
			index,
			_elm_lang$core$Basics$always(value));
	});
var _elm_community$list_extra$List_Extra$updateIf = F3(
	function (predicate, update, list) {
		return A2(
			_elm_lang$core$List$map,
			function (item) {
				return predicate(item) ? update(item) : item;
			},
			list);
	});
var _elm_community$list_extra$List_Extra$replaceIf = F3(
	function (predicate, replacement, list) {
		return A3(
			_elm_community$list_extra$List_Extra$updateIf,
			predicate,
			_elm_lang$core$Basics$always(replacement),
			list);
	});
var _elm_community$list_extra$List_Extra$count = function (predicate) {
	return A2(
		_elm_lang$core$List$foldl,
		F2(
			function (x, acc) {
				return predicate(x) ? (acc + 1) : acc;
			}),
		0);
};
var _elm_community$list_extra$List_Extra$findIndices = function (predicate) {
	var consIndexIf = F3(
		function (index, x, acc) {
			return predicate(x) ? {ctor: '::', _0: index, _1: acc} : acc;
		});
	return A2(
		_elm_community$list_extra$List_Extra$indexedFoldr,
		consIndexIf,
		{ctor: '[]'});
};
var _elm_community$list_extra$List_Extra$findIndexHelp = F3(
	function (index, predicate, list) {
		findIndexHelp:
		while (true) {
			var _p68 = list;
			if (_p68.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				if (predicate(_p68._0)) {
					return _elm_lang$core$Maybe$Just(index);
				} else {
					var _v58 = index + 1,
						_v59 = predicate,
						_v60 = _p68._1;
					index = _v58;
					predicate = _v59;
					list = _v60;
					continue findIndexHelp;
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$findIndex = _elm_community$list_extra$List_Extra$findIndexHelp(0);
var _elm_community$list_extra$List_Extra$splitWhen = F2(
	function (predicate, list) {
		return A2(
			_elm_lang$core$Maybe$map,
			function (i) {
				return A2(_elm_community$list_extra$List_Extra$splitAt, i, list);
			},
			A2(_elm_community$list_extra$List_Extra$findIndex, predicate, list));
	});
var _elm_community$list_extra$List_Extra$elemIndices = function (x) {
	return _elm_community$list_extra$List_Extra$findIndices(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(x));
};
var _elm_community$list_extra$List_Extra$elemIndex = function (x) {
	return _elm_community$list_extra$List_Extra$findIndex(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(x));
};
var _elm_community$list_extra$List_Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			var _p69 = list;
			if (_p69.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p70 = _p69._0;
				if (predicate(_p70)) {
					return _elm_lang$core$Maybe$Just(_p70);
				} else {
					var _v62 = predicate,
						_v63 = _p69._1;
					predicate = _v62;
					list = _v63;
					continue find;
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$notMember = function (x) {
	return function (_p71) {
		return !A2(_elm_lang$core$List$member, x, _p71);
	};
};
var _elm_community$list_extra$List_Extra$reverseMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (x, acc) {
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_community$list_extra$List_Extra$andThen = _elm_lang$core$List$concatMap;
var _elm_community$list_extra$List_Extra$lift2 = F3(
	function (f, la, lb) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return {
							ctor: '::',
							_0: A2(f, a, b),
							_1: {ctor: '[]'}
						};
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$cartesianProduct = function (ll) {
	var _p72 = ll;
	if (_p72.ctor === '[]') {
		return {
			ctor: '::',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		};
	} else {
		return A3(
			_elm_community$list_extra$List_Extra$lift2,
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			_p72._0,
			_elm_community$list_extra$List_Extra$cartesianProduct(_p72._1));
	}
};
var _elm_community$list_extra$List_Extra$lift3 = F4(
	function (f, la, lb, lc) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return A2(
							_elm_community$list_extra$List_Extra$andThen,
							function (c) {
								return {
									ctor: '::',
									_0: A3(f, a, b, c),
									_1: {ctor: '[]'}
								};
							},
							lc);
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$lift4 = F5(
	function (f, la, lb, lc, ld) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return A2(
							_elm_community$list_extra$List_Extra$andThen,
							function (c) {
								return A2(
									_elm_community$list_extra$List_Extra$andThen,
									function (d) {
										return {
											ctor: '::',
											_0: A4(f, a, b, c, d),
											_1: {ctor: '[]'}
										};
									},
									ld);
							},
							lc);
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$andMap = F2(
	function (l, fl) {
		return A3(
			_elm_lang$core$List$map2,
			F2(
				function (x, y) {
					return x(y);
				}),
			fl,
			l);
	});
var _elm_community$list_extra$List_Extra$uniqueHelp = F4(
	function (f, existing, remaining, accumulator) {
		uniqueHelp:
		while (true) {
			var _p73 = remaining;
			if (_p73.ctor === '[]') {
				return _elm_lang$core$List$reverse(accumulator);
			} else {
				var _p75 = _p73._1;
				var _p74 = _p73._0;
				var computedFirst = f(_p74);
				if (A2(_elm_lang$core$Set$member, computedFirst, existing)) {
					var _v66 = f,
						_v67 = existing,
						_v68 = _p75,
						_v69 = accumulator;
					f = _v66;
					existing = _v67;
					remaining = _v68;
					accumulator = _v69;
					continue uniqueHelp;
				} else {
					var _v70 = f,
						_v71 = A2(_elm_lang$core$Set$insert, computedFirst, existing),
						_v72 = _p75,
						_v73 = {ctor: '::', _0: _p74, _1: accumulator};
					f = _v70;
					existing = _v71;
					remaining = _v72;
					accumulator = _v73;
					continue uniqueHelp;
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$uniqueBy = F2(
	function (f, list) {
		return A4(
			_elm_community$list_extra$List_Extra$uniqueHelp,
			f,
			_elm_lang$core$Set$empty,
			list,
			{ctor: '[]'});
	});
var _elm_community$list_extra$List_Extra$allDifferentBy = F2(
	function (f, list) {
		return _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$List$length(list),
			_elm_lang$core$List$length(
				A2(_elm_community$list_extra$List_Extra$uniqueBy, f, list)));
	});
var _elm_community$list_extra$List_Extra$allDifferent = function (list) {
	return A2(_elm_community$list_extra$List_Extra$allDifferentBy, _elm_lang$core$Basics$identity, list);
};
var _elm_community$list_extra$List_Extra$unique = function (list) {
	return A4(
		_elm_community$list_extra$List_Extra$uniqueHelp,
		_elm_lang$core$Basics$identity,
		_elm_lang$core$Set$empty,
		list,
		{ctor: '[]'});
};
var _elm_community$list_extra$List_Extra$dropWhile = F2(
	function (predicate, list) {
		dropWhile:
		while (true) {
			var _p76 = list;
			if (_p76.ctor === '[]') {
				return {ctor: '[]'};
			} else {
				if (predicate(_p76._0)) {
					var _v75 = predicate,
						_v76 = _p76._1;
					predicate = _v75;
					list = _v76;
					continue dropWhile;
				} else {
					return list;
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$takeWhile = function (predicate) {
	var takeWhileMemo = F2(
		function (memo, list) {
			takeWhileMemo:
			while (true) {
				var _p77 = list;
				if (_p77.ctor === '[]') {
					return _elm_lang$core$List$reverse(memo);
				} else {
					var _p78 = _p77._0;
					if (predicate(_p78)) {
						var _v78 = {ctor: '::', _0: _p78, _1: memo},
							_v79 = _p77._1;
						memo = _v78;
						list = _v79;
						continue takeWhileMemo;
					} else {
						return _elm_lang$core$List$reverse(memo);
					}
				}
			}
		});
	return takeWhileMemo(
		{ctor: '[]'});
};
var _elm_community$list_extra$List_Extra$span = F2(
	function (p, xs) {
		return {
			ctor: '_Tuple2',
			_0: A2(_elm_community$list_extra$List_Extra$takeWhile, p, xs),
			_1: A2(_elm_community$list_extra$List_Extra$dropWhile, p, xs)
		};
	});
var _elm_community$list_extra$List_Extra$break = function (p) {
	return _elm_community$list_extra$List_Extra$span(
		function (_p79) {
			return !p(_p79);
		});
};
var _elm_community$list_extra$List_Extra$groupWhile = F2(
	function (eq, xs_) {
		var _p80 = xs_;
		if (_p80.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var _p82 = _p80._0;
			var _p81 = A2(
				_elm_community$list_extra$List_Extra$span,
				eq(_p82),
				_p80._1);
			var ys = _p81._0;
			var zs = _p81._1;
			return {
				ctor: '::',
				_0: {ctor: '::', _0: _p82, _1: ys},
				_1: A2(_elm_community$list_extra$List_Extra$groupWhile, eq, zs)
			};
		}
	});
var _elm_community$list_extra$List_Extra$group = _elm_community$list_extra$List_Extra$groupWhile(
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.eq(x, y);
		}));
var _elm_community$list_extra$List_Extra$minimumBy = F2(
	function (f, ls) {
		var minBy = F2(
			function (x, _p83) {
				var _p84 = _p83;
				var _p85 = _p84._1;
				var fx = f(x);
				return (_elm_lang$core$Native_Utils.cmp(fx, _p85) < 0) ? {ctor: '_Tuple2', _0: x, _1: fx} : {ctor: '_Tuple2', _0: _p84._0, _1: _p85};
			});
		var _p86 = ls;
		if (_p86.ctor === '::') {
			if (_p86._1.ctor === '[]') {
				return _elm_lang$core$Maybe$Just(_p86._0);
			} else {
				var _p87 = _p86._0;
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Tuple$first(
						A3(
							_elm_lang$core$List$foldl,
							minBy,
							{
								ctor: '_Tuple2',
								_0: _p87,
								_1: f(_p87)
							},
							_p86._1)));
			}
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$list_extra$List_Extra$maximumBy = F2(
	function (f, ls) {
		var maxBy = F2(
			function (x, _p88) {
				var _p89 = _p88;
				var _p90 = _p89._1;
				var fx = f(x);
				return (_elm_lang$core$Native_Utils.cmp(fx, _p90) > 0) ? {ctor: '_Tuple2', _0: x, _1: fx} : {ctor: '_Tuple2', _0: _p89._0, _1: _p90};
			});
		var _p91 = ls;
		if (_p91.ctor === '::') {
			if (_p91._1.ctor === '[]') {
				return _elm_lang$core$Maybe$Just(_p91._0);
			} else {
				var _p92 = _p91._0;
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Tuple$first(
						A3(
							_elm_lang$core$List$foldl,
							maxBy,
							{
								ctor: '_Tuple2',
								_0: _p92,
								_1: f(_p92)
							},
							_p91._1)));
			}
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$list_extra$List_Extra$uncons = function (xs) {
	var _p93 = xs;
	if (_p93.ctor === '[]') {
		return _elm_lang$core$Maybe$Nothing;
	} else {
		return _elm_lang$core$Maybe$Just(
			{ctor: '_Tuple2', _0: _p93._0, _1: _p93._1});
	}
};
var _elm_community$list_extra$List_Extra$swapAt = F3(
	function (index1, index2, l) {
		swapAt:
		while (true) {
			if (_elm_lang$core$Native_Utils.eq(index1, index2) || (_elm_lang$core$Native_Utils.cmp(index1, 0) < 0)) {
				return l;
			} else {
				if (_elm_lang$core$Native_Utils.cmp(index1, index2) > 0) {
					var _v86 = index2,
						_v87 = index1,
						_v88 = l;
					index1 = _v86;
					index2 = _v87;
					l = _v88;
					continue swapAt;
				} else {
					var _p94 = A2(_elm_community$list_extra$List_Extra$splitAt, index1, l);
					var part1 = _p94._0;
					var tail1 = _p94._1;
					var _p95 = A2(_elm_community$list_extra$List_Extra$splitAt, index2 - index1, tail1);
					var head2 = _p95._0;
					var tail2 = _p95._1;
					var _p96 = {
						ctor: '_Tuple2',
						_0: _elm_community$list_extra$List_Extra$uncons(head2),
						_1: _elm_community$list_extra$List_Extra$uncons(tail2)
					};
					if (((((_p96.ctor === '_Tuple2') && (_p96._0.ctor === 'Just')) && (_p96._0._0.ctor === '_Tuple2')) && (_p96._1.ctor === 'Just')) && (_p96._1._0.ctor === '_Tuple2')) {
						return _elm_lang$core$List$concat(
							{
								ctor: '::',
								_0: part1,
								_1: {
									ctor: '::',
									_0: {ctor: '::', _0: _p96._1._0._0, _1: _p96._0._0._1},
									_1: {
										ctor: '::',
										_0: {ctor: '::', _0: _p96._0._0._0, _1: _p96._1._0._1},
										_1: {ctor: '[]'}
									}
								}
							});
					} else {
						return l;
					}
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$cycleHelp = F3(
	function (acc, n, list) {
		cycleHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) > 0) {
				var _v90 = A2(_elm_community$list_extra$List_Extra$reverseAppend, list, acc),
					_v91 = n - 1,
					_v92 = list;
				acc = _v90;
				n = _v91;
				list = _v92;
				continue cycleHelp;
			} else {
				return acc;
			}
		}
	});
var _elm_community$list_extra$List_Extra$cycle = F2(
	function (len, list) {
		var cycleLength = _elm_lang$core$List$length(list);
		return (_elm_lang$core$Native_Utils.eq(cycleLength, 0) || _elm_lang$core$Native_Utils.eq(cycleLength, len)) ? list : ((_elm_lang$core$Native_Utils.cmp(cycleLength, len) < 0) ? _elm_lang$core$List$reverse(
			A2(
				_elm_community$list_extra$List_Extra$reverseAppend,
				A2(
					_elm_lang$core$List$take,
					A2(_elm_lang$core$Basics$rem, len, cycleLength),
					list),
				A3(
					_elm_community$list_extra$List_Extra$cycleHelp,
					{ctor: '[]'},
					(len / cycleLength) | 0,
					list))) : A2(_elm_lang$core$List$take, len, list));
	});
var _elm_community$list_extra$List_Extra$initialize = F2(
	function (n, f) {
		var step = F2(
			function (i, acc) {
				step:
				while (true) {
					if (_elm_lang$core$Native_Utils.cmp(i, 0) < 0) {
						return acc;
					} else {
						var _v93 = i - 1,
							_v94 = {
							ctor: '::',
							_0: f(i),
							_1: acc
						};
						i = _v93;
						acc = _v94;
						continue step;
					}
				}
			});
		return A2(
			step,
			n - 1,
			{ctor: '[]'});
	});
var _elm_community$list_extra$List_Extra$iterate = F2(
	function (f, x) {
		var _p97 = f(x);
		if (_p97.ctor === 'Just') {
			return {
				ctor: '::',
				_0: x,
				_1: A2(_elm_community$list_extra$List_Extra$iterate, f, _p97._0)
			};
		} else {
			return {
				ctor: '::',
				_0: x,
				_1: {ctor: '[]'}
			};
		}
	});
var _elm_community$list_extra$List_Extra$getAt = F2(
	function (idx, xs) {
		return (_elm_lang$core$Native_Utils.cmp(idx, 0) < 0) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$List$head(
			A2(_elm_lang$core$List$drop, idx, xs));
	});
var _elm_community$list_extra$List_Extra_ops = _elm_community$list_extra$List_Extra_ops || {};
_elm_community$list_extra$List_Extra_ops['!!'] = _elm_lang$core$Basics$flip(_elm_community$list_extra$List_Extra$getAt);
var _elm_community$list_extra$List_Extra$init = function (items) {
	var _p98 = items;
	if (_p98.ctor === '[]') {
		return _elm_lang$core$Maybe$Nothing;
	} else {
		return A2(
			_elm_lang$core$Maybe$map,
			_elm_lang$core$List$reverse,
			_elm_lang$core$List$tail(
				_elm_lang$core$List$reverse(_p98)));
	}
};
var _elm_community$list_extra$List_Extra$last = function (items) {
	last:
	while (true) {
		var _p99 = items;
		if (_p99.ctor === '[]') {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			if (_p99._1.ctor === '[]') {
				return _elm_lang$core$Maybe$Just(_p99._0);
			} else {
				var _v98 = _p99._1;
				items = _v98;
				continue last;
			}
		}
	}
};

var _ZoltanOnody$proof_assistant$Types$GUI = F2(
	function (a, b) {
		return {showButtons: a, collapsed: b};
	});
var _ZoltanOnody$proof_assistant$Types$FormulaStep = F4(
	function (a, b, c, d) {
		return {text: a, formula: b, index: c, gui: d};
	});
var _ZoltanOnody$proof_assistant$Types$Generalization = F2(
	function (a, b) {
		return {ctor: 'Generalization', _0: a, _1: b};
	});
var _ZoltanOnody$proof_assistant$Types$Contradiction = function (a) {
	return {ctor: 'Contradiction', _0: a};
};
var _ZoltanOnody$proof_assistant$Types$Goal = function (a) {
	return {ctor: 'Goal', _0: a};
};
var _ZoltanOnody$proof_assistant$Types$Rule = function (a) {
	return {ctor: 'Rule', _0: a};
};
var _ZoltanOnody$proof_assistant$Types$Premise = {ctor: 'Premise'};
var _ZoltanOnody$proof_assistant$Types$CasesNode = F4(
	function (a, b, c, d) {
		return {ctor: 'CasesNode', _0: a, _1: b, _2: c, _3: d};
	});
var _ZoltanOnody$proof_assistant$Types$FormulaNode = F3(
	function (a, b, c) {
		return {ctor: 'FormulaNode', _0: a, _1: b, _2: c};
	});
var _ZoltanOnody$proof_assistant$Types$Justification2 = F3(
	function (a, b, c) {
		return {ctor: 'Justification2', _0: a, _1: b, _2: c};
	});
var _ZoltanOnody$proof_assistant$Types$Justification1 = F2(
	function (a, b) {
		return {ctor: 'Justification1', _0: a, _1: b};
	});
var _ZoltanOnody$proof_assistant$Types$Justification0 = function (a) {
	return {ctor: 'Justification0', _0: a};
};
var _ZoltanOnody$proof_assistant$Types$Axiom = function (a) {
	return {ctor: 'Axiom', _0: a};
};

var _elm_community$maybe_extra$Maybe_Extra$foldrValues = F2(
	function (item, list) {
		var _p0 = item;
		if (_p0.ctor === 'Nothing') {
			return list;
		} else {
			return {ctor: '::', _0: _p0._0, _1: list};
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$values = A2(
	_elm_lang$core$List$foldr,
	_elm_community$maybe_extra$Maybe_Extra$foldrValues,
	{ctor: '[]'});
var _elm_community$maybe_extra$Maybe_Extra$filter = F2(
	function (f, m) {
		var _p1 = A2(_elm_lang$core$Maybe$map, f, m);
		if ((_p1.ctor === 'Just') && (_p1._0 === true)) {
			return m;
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$traverseArray = function (f) {
	var step = F2(
		function (e, acc) {
			var _p2 = f(e);
			if (_p2.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return A2(
					_elm_lang$core$Maybe$map,
					_elm_lang$core$Array$push(_p2._0),
					acc);
			}
		});
	return A2(
		_elm_lang$core$Array$foldl,
		step,
		_elm_lang$core$Maybe$Just(_elm_lang$core$Array$empty));
};
var _elm_community$maybe_extra$Maybe_Extra$combineArray = _elm_community$maybe_extra$Maybe_Extra$traverseArray(_elm_lang$core$Basics$identity);
var _elm_community$maybe_extra$Maybe_Extra$traverse = function (f) {
	var step = F2(
		function (e, acc) {
			var _p3 = f(e);
			if (_p3.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return A2(
					_elm_lang$core$Maybe$map,
					F2(
						function (x, y) {
							return {ctor: '::', _0: x, _1: y};
						})(_p3._0),
					acc);
			}
		});
	return A2(
		_elm_lang$core$List$foldr,
		step,
		_elm_lang$core$Maybe$Just(
			{ctor: '[]'}));
};
var _elm_community$maybe_extra$Maybe_Extra$combine = _elm_community$maybe_extra$Maybe_Extra$traverse(_elm_lang$core$Basics$identity);
var _elm_community$maybe_extra$Maybe_Extra$toArray = function (m) {
	var _p4 = m;
	if (_p4.ctor === 'Nothing') {
		return _elm_lang$core$Array$empty;
	} else {
		return A2(_elm_lang$core$Array$repeat, 1, _p4._0);
	}
};
var _elm_community$maybe_extra$Maybe_Extra$toList = function (m) {
	var _p5 = m;
	if (_p5.ctor === 'Nothing') {
		return {ctor: '[]'};
	} else {
		return {
			ctor: '::',
			_0: _p5._0,
			_1: {ctor: '[]'}
		};
	}
};
var _elm_community$maybe_extra$Maybe_Extra$orElse = F2(
	function (ma, mb) {
		var _p6 = mb;
		if (_p6.ctor === 'Nothing') {
			return ma;
		} else {
			return mb;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$orElseLazy = F2(
	function (fma, mb) {
		var _p7 = mb;
		if (_p7.ctor === 'Nothing') {
			return fma(
				{ctor: '_Tuple0'});
		} else {
			return mb;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$orLazy = F2(
	function (ma, fmb) {
		var _p8 = ma;
		if (_p8.ctor === 'Nothing') {
			return fmb(
				{ctor: '_Tuple0'});
		} else {
			return ma;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$or = F2(
	function (ma, mb) {
		var _p9 = ma;
		if (_p9.ctor === 'Nothing') {
			return mb;
		} else {
			return ma;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$prev = _elm_lang$core$Maybe$map2(_elm_lang$core$Basics$always);
var _elm_community$maybe_extra$Maybe_Extra$next = _elm_lang$core$Maybe$map2(
	_elm_lang$core$Basics$flip(_elm_lang$core$Basics$always));
var _elm_community$maybe_extra$Maybe_Extra$andMap = _elm_lang$core$Maybe$map2(
	F2(
		function (x, y) {
			return y(x);
		}));
var _elm_community$maybe_extra$Maybe_Extra$unpack = F3(
	function (d, f, m) {
		var _p10 = m;
		if (_p10.ctor === 'Nothing') {
			return d(
				{ctor: '_Tuple0'});
		} else {
			return f(_p10._0);
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$unwrap = F3(
	function (d, f, m) {
		var _p11 = m;
		if (_p11.ctor === 'Nothing') {
			return d;
		} else {
			return f(_p11._0);
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$isJust = function (m) {
	var _p12 = m;
	if (_p12.ctor === 'Nothing') {
		return false;
	} else {
		return true;
	}
};
var _elm_community$maybe_extra$Maybe_Extra$isNothing = function (m) {
	var _p13 = m;
	if (_p13.ctor === 'Nothing') {
		return true;
	} else {
		return false;
	}
};
var _elm_community$maybe_extra$Maybe_Extra$join = function (mx) {
	var _p14 = mx;
	if (_p14.ctor === 'Just') {
		return _p14._0;
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_community$maybe_extra$Maybe_Extra_ops = _elm_community$maybe_extra$Maybe_Extra_ops || {};
_elm_community$maybe_extra$Maybe_Extra_ops['?'] = F2(
	function (mx, x) {
		return A2(_elm_lang$core$Maybe$withDefault, x, mx);
	});

var _ZoltanOnody$proof_assistant$Validator$helper2 = F5(
	function (func, from1, from2, toProve, answer) {
		var _p0 = {ctor: '_Tuple3', _0: from1.formula, _1: from2.formula, _2: toProve.formula};
		if ((((_p0.ctor === '_Tuple3') && (_p0._0.ctor === 'Ok')) && (_p0._1.ctor === 'Ok')) && (_p0._2.ctor === 'Ok')) {
			return A3(func, _p0._0._0, _p0._1._0, _p0._2._0) ? _elm_lang$core$Maybe$Just(answer) : _elm_lang$core$Maybe$Nothing;
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _ZoltanOnody$proof_assistant$Validator$helper1 = F4(
	function (func, from, toProve, answer) {
		var _p1 = {ctor: '_Tuple2', _0: from.formula, _1: toProve.formula};
		if (((_p1.ctor === '_Tuple2') && (_p1._0.ctor === 'Ok')) && (_p1._1.ctor === 'Ok')) {
			return A2(func, _p1._0._0, _p1._1._0) ? _elm_lang$core$Maybe$Just(answer) : _elm_lang$core$Maybe$Nothing;
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _ZoltanOnody$proof_assistant$Validator$helper0 = F3(
	function (func, toProve, answer) {
		var _p2 = toProve.formula;
		if (_p2.ctor === 'Ok') {
			return func(_p2._0) ? _elm_lang$core$Maybe$Just(answer) : _elm_lang$core$Maybe$Nothing;
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _ZoltanOnody$proof_assistant$Validator$matchFirst2 = F3(
	function (step, branch, $function) {
		matchFirst2:
		while (true) {
			var _p3 = branch;
			if (_p3.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p5 = _p3._0;
				var _p4 = A3(
					$function,
					_elm_lang$core$Tuple$first(_p5),
					_elm_lang$core$Tuple$second(_p5),
					step);
				if (_p4.ctor === 'Nothing') {
					var _v5 = step,
						_v6 = _p3._1,
						_v7 = $function;
					step = _v5;
					branch = _v6;
					$function = _v7;
					continue matchFirst2;
				} else {
					return _elm_lang$core$Maybe$Just(_p4._0);
				}
			}
		}
	});
var _ZoltanOnody$proof_assistant$Validator$matchFirst1 = F3(
	function (step, branch, $function) {
		matchFirst1:
		while (true) {
			var _p6 = branch;
			if (_p6.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p7 = A2($function, _p6._0, step);
				if (_p7.ctor === 'Nothing') {
					var _v10 = step,
						_v11 = _p6._1,
						_v12 = $function;
					step = _v10;
					branch = _v11;
					$function = _v12;
					continue matchFirst1;
				} else {
					return _elm_lang$core$Maybe$Just(_p7._0);
				}
			}
		}
	});
var _ZoltanOnody$proof_assistant$Validator$matchFirst0 = F2(
	function (step, $function) {
		return $function(step);
	});
var _ZoltanOnody$proof_assistant$Validator$matchAnyFunctions2 = F3(
	function (toProve, allCombinations, functions) {
		matchAnyFunctions2:
		while (true) {
			var _p8 = functions;
			if (_p8.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p9 = A3(_ZoltanOnody$proof_assistant$Validator$matchFirst2, toProve, allCombinations, _p8._0);
				if (_p9.ctor === 'Just') {
					return _elm_lang$core$Maybe$Just(_p9._0);
				} else {
					var _v15 = toProve,
						_v16 = allCombinations,
						_v17 = _p8._1;
					toProve = _v15;
					allCombinations = _v16;
					functions = _v17;
					continue matchAnyFunctions2;
				}
			}
		}
	});
var _ZoltanOnody$proof_assistant$Validator$matchAnyFunctions1 = F3(
	function (toProve, allCombinations, functions) {
		matchAnyFunctions1:
		while (true) {
			var _p10 = functions;
			if (_p10.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p11 = A3(_ZoltanOnody$proof_assistant$Validator$matchFirst1, toProve, allCombinations, _p10._0);
				if (_p11.ctor === 'Just') {
					return _elm_lang$core$Maybe$Just(_p11._0);
				} else {
					var _v20 = toProve,
						_v21 = allCombinations,
						_v22 = _p10._1;
					toProve = _v20;
					allCombinations = _v21;
					functions = _v22;
					continue matchAnyFunctions1;
				}
			}
		}
	});
var _ZoltanOnody$proof_assistant$Validator$matchAnyFunctions0 = F2(
	function (toProve, functions) {
		matchAnyFunctions0:
		while (true) {
			var _p12 = functions;
			if (_p12.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p13 = A2(_ZoltanOnody$proof_assistant$Validator$matchFirst0, toProve, _p12._0);
				if (_p13.ctor === 'Just') {
					return _elm_lang$core$Maybe$Just(_p13._0);
				} else {
					var _v25 = toProve,
						_v26 = _p12._1;
					toProve = _v25;
					functions = _v26;
					continue matchAnyFunctions0;
				}
			}
		}
	});
var _ZoltanOnody$proof_assistant$Validator$runValidator2 = F5(
	function (matcherFunction, answerFunction, from1, from2, toProve) {
		return A5(
			_ZoltanOnody$proof_assistant$Validator$helper2,
			matcherFunction,
			from1,
			from2,
			toProve,
			A2(answerFunction, from1.index, from2.index));
	});
var _ZoltanOnody$proof_assistant$Validator$runValidator1 = F4(
	function (matcherFunction, answerFunction, from, toProve) {
		return A4(
			_ZoltanOnody$proof_assistant$Validator$helper1,
			matcherFunction,
			from,
			toProve,
			answerFunction(from.index));
	});
var _ZoltanOnody$proof_assistant$Validator$runValidator0 = F3(
	function (matcherFunction, answerFunction, toProve) {
		return A3(_ZoltanOnody$proof_assistant$Validator$helper0, matcherFunction, toProve, answerFunction);
	});
var _ZoltanOnody$proof_assistant$Validator$matcherToStr = function (matched) {
	var _p14 = matched;
	switch (_p14.ctor) {
		case 'Axiom':
			return A2(_elm_lang$core$Basics_ops['++'], 'Created by substitution to axiom ', _p14._0);
		case 'Justification0':
			return A2(_elm_lang$core$Basics_ops['++'], 'This is a ', _p14._0);
		case 'Justification1':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_p14._0,
				A2(
					_elm_lang$core$Basics_ops['++'],
					' from formula ',
					_elm_lang$core$Basics$toString(_p14._1)));
		default:
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_p14._0,
				A2(
					_elm_lang$core$Basics_ops['++'],
					' from formulas ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p14._1),
						A2(
							_elm_lang$core$Basics_ops['++'],
							' and ',
							_elm_lang$core$Basics$toString(_p14._2)))));
	}
};
var _ZoltanOnody$proof_assistant$Validator$validatorCases = F3(
	function (formula1, formula2, branch) {
		validatorCases:
		while (true) {
			var _p15 = branch;
			if (_p15.ctor === '[]') {
				return _elm_lang$core$Result$Err('Invalid cases! This is not valid from any formula above, cases node must match formula (A|B)');
			} else {
				var _p20 = _p15._0;
				var _p19 = _p15._1;
				var _p16 = _p20.formula;
				if ((_p16.ctor === 'Ok') && (_p16._0.ctor === 'Disj')) {
					var _p18 = _p16._0._1;
					var _p17 = _p16._0._0;
					if ((_elm_lang$core$Native_Utils.eq(formula1, _p17) && _elm_lang$core$Native_Utils.eq(formula2, _p18)) || (_elm_lang$core$Native_Utils.eq(formula1, _p18) && _elm_lang$core$Native_Utils.eq(formula2, _p17))) {
						return _elm_lang$core$Result$Ok(
							A2(
								_elm_lang$core$Basics_ops['++'],
								'This is derived from formula ',
								_elm_lang$core$Basics$toString(_p20.index)));
					} else {
						var _v30 = formula1,
							_v31 = formula2,
							_v32 = _p19;
						formula1 = _v30;
						formula2 = _v31;
						branch = _v32;
						continue validatorCases;
					}
				} else {
					var _v33 = formula1,
						_v34 = formula2,
						_v35 = _p19;
					formula1 = _v33;
					formula2 = _v34;
					branch = _v35;
					continue validatorCases;
				}
			}
		}
	});
var _ZoltanOnody$proof_assistant$Validator$cartesian = F2(
	function (xs, ys) {
		return A2(
			_elm_lang$core$List$concatMap,
			function (x) {
				return A2(
					_elm_lang$core$List$map,
					function (y) {
						return {ctor: '_Tuple2', _0: x, _1: y};
					},
					ys);
			},
			xs);
	});
var _ZoltanOnody$proof_assistant$Validator$matcherRemoveExistentialQuantifier = F3(
	function (toProve, allCombinations, functions) {
		var _p21 = functions;
		if (_p21.ctor === '[]') {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			var _p22 = A3(_ZoltanOnody$proof_assistant$Validator$matchFirst1, toProve, allCombinations, _p21._0);
			if (_p22.ctor === 'Just') {
				return _elm_lang$core$Maybe$Just(_p22._0);
			} else {
				return A3(_ZoltanOnody$proof_assistant$Validator$matchAnyFunctions1, toProve, allCombinations, _p21._1);
			}
		}
	});
var _ZoltanOnody$proof_assistant$Validator$getFreeVariables = function (branch) {
	var $function = function (data) {
		var _p23 = data.formula;
		if (_p23.ctor === 'Ok') {
			return _FMFI_UK_1_AIN_412$elm_formula$Formula$freeFormula(_p23._0);
		} else {
			return _elm_lang$core$Set$empty;
		}
	};
	var freeVariablesInFormulas = A2(_elm_lang$core$List$map, $function, branch);
	return _elm_lang$core$Set$toList(
		A3(_elm_lang$core$List$foldr, _elm_lang$core$Set$union, _elm_lang$core$Set$empty, freeVariablesInFormulas));
};
var _ZoltanOnody$proof_assistant$Validator$speciallFirstOrderLogicValidator = F2(
	function (step, branch) {
		var freeVariables = _ZoltanOnody$proof_assistant$Validator$getFreeVariables(branch);
		var $function = F2(
			function (formula, others) {
				$function:
				while (true) {
					var _p24 = others;
					if (_p24.ctor === '[]') {
						return _elm_lang$core$Maybe$Nothing;
					} else {
						var _p27 = _p24._1;
						var _p26 = _p24._0;
						var _p25 = _p26.formula;
						if (_p25.ctor === 'Ok') {
							if (A3(_ZoltanOnody$proof_assistant$Core_Matcher$matcherRemoveExistentialQuantifier, _p25._0, formula, freeVariables)) {
								return _elm_lang$core$Maybe$Just(
									A2(_ZoltanOnody$proof_assistant$Types$Justification1, 'Existential quantifier removed', _p26.index));
							} else {
								var _v41 = formula,
									_v42 = _p27;
								formula = _v41;
								others = _v42;
								continue $function;
							}
						} else {
							var _v43 = formula,
								_v44 = _p27;
							formula = _v43;
							others = _v44;
							continue $function;
						}
					}
				}
			});
		var _p28 = step.formula;
		if (_p28.ctor === 'Ok') {
			return A2($function, _p28._0, branch);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _ZoltanOnody$proof_assistant$Validator$generateNewFreeVariable = function (freeVariables) {
	var newName = function (num) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'x',
			_elm_lang$core$Basics$toString(num));
	};
	var getNewFree = function (last) {
		getNewFree:
		while (true) {
			if (A2(
				_elm_lang$core$List$member,
				newName(last),
				freeVariables)) {
				var _v46 = last + 1;
				last = _v46;
				continue getNewFree;
			} else {
				return newName(last);
			}
		}
	};
	return getNewFree(0);
};
var _ZoltanOnody$proof_assistant$Validator$binaryValidator = F2(
	function (step, branch) {
		return A3(
			_ZoltanOnody$proof_assistant$Validator$matchAnyFunctions2,
			step,
			A2(_ZoltanOnody$proof_assistant$Validator$cartesian, branch, branch),
			{
				ctor: '::',
				_0: A2(
					_ZoltanOnody$proof_assistant$Validator$runValidator2,
					_ZoltanOnody$proof_assistant$Core_Matcher$matcherModusPonens,
					_ZoltanOnody$proof_assistant$Types$Justification2('Modus Ponens')),
				_1: {
					ctor: '::',
					_0: A2(
						_ZoltanOnody$proof_assistant$Validator$runValidator2,
						_ZoltanOnody$proof_assistant$Core_Matcher$matcherModusTolens,
						_ZoltanOnody$proof_assistant$Types$Justification2('Modus Tolens')),
					_1: {
						ctor: '::',
						_0: A2(
							_ZoltanOnody$proof_assistant$Validator$runValidator2,
							_ZoltanOnody$proof_assistant$Core_Matcher$matcherHypotheticalSyllogism,
							_ZoltanOnody$proof_assistant$Types$Justification2('Hypothetical Syllogism')),
						_1: {
							ctor: '::',
							_0: A2(
								_ZoltanOnody$proof_assistant$Validator$runValidator2,
								_ZoltanOnody$proof_assistant$Core_Matcher$matcherConjunction,
								_ZoltanOnody$proof_assistant$Types$Justification2('Conjuction')),
							_1: {
								ctor: '::',
								_0: A2(
									_ZoltanOnody$proof_assistant$Validator$runValidator2,
									_ZoltanOnody$proof_assistant$Core_Matcher$matcherDisjunctiveSyllogism,
									_ZoltanOnody$proof_assistant$Types$Justification2('Disjunctive Syllogism')),
								_1: {
									ctor: '::',
									_0: A2(
										_ZoltanOnody$proof_assistant$Validator$runValidator2,
										_ZoltanOnody$proof_assistant$Core_Matcher$matcherConstructiveDilemma,
										_ZoltanOnody$proof_assistant$Types$Justification2('Constructive Dilemma')),
									_1: {
										ctor: '::',
										_0: A2(
											_ZoltanOnody$proof_assistant$Validator$runValidator2,
											_ZoltanOnody$proof_assistant$Core_Matcher$matcherDestructiveDilemma,
											_ZoltanOnody$proof_assistant$Types$Justification2('Destructive Dilemma')),
										_1: {
											ctor: '::',
											_0: A2(
												_ZoltanOnody$proof_assistant$Validator$runValidator2,
												_ZoltanOnody$proof_assistant$Core_Matcher$matcherGrimaldiContradiction,
												_ZoltanOnody$proof_assistant$Types$Justification2('Contradiction')),
											_1: {
												ctor: '::',
												_0: A2(
													_ZoltanOnody$proof_assistant$Validator$runValidator2,
													_ZoltanOnody$proof_assistant$Core_Matcher$matcherGrimaldiCases,
													_ZoltanOnody$proof_assistant$Types$Justification2('Cases')),
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						}
					}
				}
			});
	});
var _ZoltanOnody$proof_assistant$Validator$unaryValidator = F2(
	function (step, branch) {
		return A3(
			_ZoltanOnody$proof_assistant$Validator$matchAnyFunctions1,
			step,
			branch,
			{
				ctor: '::',
				_0: A2(
					_ZoltanOnody$proof_assistant$Validator$runValidator1,
					_ZoltanOnody$proof_assistant$Core_Matcher$matcherAddition,
					_ZoltanOnody$proof_assistant$Types$Justification1('Addition')),
				_1: {
					ctor: '::',
					_0: A2(
						_ZoltanOnody$proof_assistant$Validator$runValidator1,
						_ZoltanOnody$proof_assistant$Core_Matcher$matcherSimplification,
						_ZoltanOnody$proof_assistant$Types$Justification1('Simplification')),
					_1: {
						ctor: '::',
						_0: A2(
							_ZoltanOnody$proof_assistant$Validator$runValidator1,
							_ZoltanOnody$proof_assistant$Core_Matcher$matcherIdentity,
							_ZoltanOnody$proof_assistant$Types$Justification1('Identity')),
						_1: {
							ctor: '::',
							_0: A2(
								_ZoltanOnody$proof_assistant$Validator$runValidator1,
								_ZoltanOnody$proof_assistant$Core_Matcher$matcherImplicationRemoval,
								_ZoltanOnody$proof_assistant$Types$Justification1('Implication removed')),
							_1: {
								ctor: '::',
								_0: A2(
									_ZoltanOnody$proof_assistant$Validator$runValidator1,
									_ZoltanOnody$proof_assistant$Core_Matcher$matcherImplicationIntroduction,
									_ZoltanOnody$proof_assistant$Types$Justification1('Implication introduction (1)')),
								_1: {
									ctor: '::',
									_0: A2(
										_ZoltanOnody$proof_assistant$Validator$runValidator1,
										_ZoltanOnody$proof_assistant$Core_Matcher$matcherImplicationIntroduction2,
										_ZoltanOnody$proof_assistant$Types$Justification1('Implication introduction (2)')),
									_1: {
										ctor: '::',
										_0: A2(
											_ZoltanOnody$proof_assistant$Validator$runValidator1,
											_ZoltanOnody$proof_assistant$Core_Matcher$matcherImplicationIntroduction3,
											_ZoltanOnody$proof_assistant$Types$Justification1('Implication introduction (3)')),
										_1: {
											ctor: '::',
											_0: A2(
												_ZoltanOnody$proof_assistant$Validator$runValidator1,
												_ZoltanOnody$proof_assistant$Core_Matcher$matcherDoubleNegationRemoval,
												_ZoltanOnody$proof_assistant$Types$Justification1('Double negation removed')),
											_1: {
												ctor: '::',
												_0: A2(
													_ZoltanOnody$proof_assistant$Validator$runValidator1,
													_ZoltanOnody$proof_assistant$Core_Matcher$matcherDoubleNegationIntroduction,
													_ZoltanOnody$proof_assistant$Types$Justification1('Double negation introduction')),
												_1: {
													ctor: '::',
													_0: A2(
														_ZoltanOnody$proof_assistant$Validator$runValidator1,
														_ZoltanOnody$proof_assistant$Core_Matcher$matcherAddExistentialQuantifier,
														_ZoltanOnody$proof_assistant$Types$Justification1('Existential quantifier added')),
													_1: {
														ctor: '::',
														_0: A2(
															_ZoltanOnody$proof_assistant$Validator$runValidator1,
															_ZoltanOnody$proof_assistant$Core_Matcher$matcherRemoveUniversalQuantifier,
															_ZoltanOnody$proof_assistant$Types$Justification1('Universal quantifier removed')),
														_1: {
															ctor: '::',
															_0: A2(
																_ZoltanOnody$proof_assistant$Validator$runValidator1,
																_ZoltanOnody$proof_assistant$Core_Matcher$matcherComutative,
																_ZoltanOnody$proof_assistant$Types$Justification1('Commutative')),
															_1: {
																ctor: '::',
																_0: A2(
																	_ZoltanOnody$proof_assistant$Validator$runValidator1,
																	_ZoltanOnody$proof_assistant$Core_Matcher$matcherIdempotency,
																	_ZoltanOnody$proof_assistant$Types$Justification1('Idempotency')),
																_1: {
																	ctor: '::',
																	_0: A2(
																		_ZoltanOnody$proof_assistant$Validator$runValidator1,
																		_ZoltanOnody$proof_assistant$Core_Matcher$matcherDeMorgan,
																		_ZoltanOnody$proof_assistant$Types$Justification1('De Morgan rule')),
																	_1: {
																		ctor: '::',
																		_0: A2(
																			_ZoltanOnody$proof_assistant$Validator$runValidator1,
																			_ZoltanOnody$proof_assistant$Core_Matcher$matcherDeMorganFirstOrder,
																			_ZoltanOnody$proof_assistant$Types$Justification1('De Morgan rule')),
																		_1: {
																			ctor: '::',
																			_0: A2(
																				_ZoltanOnody$proof_assistant$Validator$runValidator1,
																				_ZoltanOnody$proof_assistant$Core_Matcher$matcherAssociativity,
																				_ZoltanOnody$proof_assistant$Types$Justification1('Associativity')),
																			_1: {
																				ctor: '::',
																				_0: A2(
																					_ZoltanOnody$proof_assistant$Validator$runValidator1,
																					_ZoltanOnody$proof_assistant$Core_Matcher$matcherDistributive,
																					_ZoltanOnody$proof_assistant$Types$Justification1('Distributivity')),
																				_1: {ctor: '[]'}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			});
	});
var _ZoltanOnody$proof_assistant$Validator$nullaryValidator = F2(
	function (step, branch) {
		return A2(
			_ZoltanOnody$proof_assistant$Validator$matchAnyFunctions0,
			step,
			{
				ctor: '::',
				_0: A2(
					_ZoltanOnody$proof_assistant$Validator$runValidator0,
					_ZoltanOnody$proof_assistant$Core_Matcher$matcherAxiomA1,
					_ZoltanOnody$proof_assistant$Types$Axiom('φ → (ψ → φ)')),
				_1: {
					ctor: '::',
					_0: A2(
						_ZoltanOnody$proof_assistant$Validator$runValidator0,
						_ZoltanOnody$proof_assistant$Core_Matcher$matcherAxiomA2,
						_ZoltanOnody$proof_assistant$Types$Axiom('(φ → (ψ → ξ)) → ((φ → ψ) → (φ → ξ))')),
					_1: {
						ctor: '::',
						_0: A2(
							_ZoltanOnody$proof_assistant$Validator$runValidator0,
							_ZoltanOnody$proof_assistant$Core_Matcher$matcherAxiomA3,
							_ZoltanOnody$proof_assistant$Types$Axiom('(¬φ → ¬ψ) → ((¬φ → ψ) → φ))')),
						_1: {
							ctor: '::',
							_0: A2(
								_ZoltanOnody$proof_assistant$Validator$runValidator0,
								_ZoltanOnody$proof_assistant$Core_Matcher$matcherAxiomA4,
								_ZoltanOnody$proof_assistant$Types$Axiom('(ϕ ∧ ψ) → ϕ')),
							_1: {
								ctor: '::',
								_0: A2(
									_ZoltanOnody$proof_assistant$Validator$runValidator0,
									_ZoltanOnody$proof_assistant$Core_Matcher$matcherAxiomA5,
									_ZoltanOnody$proof_assistant$Types$Axiom('ϕ → (ψ → (ϕ ∧ ψ))')),
								_1: {
									ctor: '::',
									_0: A2(
										_ZoltanOnody$proof_assistant$Validator$runValidator0,
										_ZoltanOnody$proof_assistant$Core_Matcher$matcherAxiomA6,
										_ZoltanOnody$proof_assistant$Types$Axiom('ϕ → (ϕ ∨ ψ)')),
									_1: {
										ctor: '::',
										_0: A2(
											_ZoltanOnody$proof_assistant$Validator$runValidator0,
											_ZoltanOnody$proof_assistant$Core_Matcher$matcherAxiomA7,
											_ZoltanOnody$proof_assistant$Types$Axiom(' (ϕ → ξ) → ((ψ → ξ) → ((ϕ ∨ ψ) → ξ))')),
										_1: {
											ctor: '::',
											_0: A2(
												_ZoltanOnody$proof_assistant$Validator$runValidator0,
												_ZoltanOnody$proof_assistant$Core_Matcher$matcherAxiomQ6,
												_ZoltanOnody$proof_assistant$Types$Axiom('∀x(φ → ψ) → (∀x(φ) → ∀x(ψ))')),
											_1: {
												ctor: '::',
												_0: A2(
													_ZoltanOnody$proof_assistant$Validator$runValidator0,
													_ZoltanOnody$proof_assistant$Core_Matcher$matcherOnlyTwoOptions,
													_ZoltanOnody$proof_assistant$Types$Justification0('Tautology')),
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						}
					}
				}
			});
	});
var _ZoltanOnody$proof_assistant$Validator$validator = F2(
	function (step, branch) {
		return A2(
			_elm_community$maybe_extra$Maybe_Extra$orElseLazy,
			function (_p29) {
				var _p30 = _p29;
				return A2(_ZoltanOnody$proof_assistant$Validator$speciallFirstOrderLogicValidator, step, branch);
			},
			A2(
				_elm_community$maybe_extra$Maybe_Extra$orElseLazy,
				function (_p31) {
					var _p32 = _p31;
					return A2(_ZoltanOnody$proof_assistant$Validator$nullaryValidator, step, branch);
				},
				A2(
					_elm_community$maybe_extra$Maybe_Extra$orElseLazy,
					function (_p33) {
						var _p34 = _p33;
						return A2(_ZoltanOnody$proof_assistant$Validator$unaryValidator, step, branch);
					},
					A2(_ZoltanOnody$proof_assistant$Validator$binaryValidator, step, branch))));
	});

var _ZoltanOnody$proof_assistant$Proof$printBranch = function (branch) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'[',
		A2(
			_elm_lang$core$Basics_ops['++'],
			A2(
				_elm_lang$core$String$join,
				', ',
				A2(
					_elm_lang$core$List$map,
					function (_) {
						return _.text;
					},
					branch)),
			']'));
};
var _ZoltanOnody$proof_assistant$Proof$printBranches = function (branches) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'[',
		A2(
			_elm_lang$core$Basics_ops['++'],
			A2(
				_elm_lang$core$String$join,
				', ',
				A2(_elm_lang$core$List$map, _ZoltanOnody$proof_assistant$Proof$printBranch, branches)),
			']'));
};
var _ZoltanOnody$proof_assistant$Proof$getAllBranches = function (proof) {
	var _p0 = proof;
	if (_p0.ctor === 'FormulaNode') {
		var _p2 = _p0._1;
		var _p1 = _p0._2;
		if (_p1.ctor === 'Nothing') {
			return {
				ctor: '::',
				_0: {
					ctor: '::',
					_0: _p2,
					_1: {ctor: '[]'}
				},
				_1: {ctor: '[]'}
			};
		} else {
			return A2(
				_elm_lang$core$List$map,
				function (lst) {
					return {ctor: '::', _0: _p2, _1: lst};
				},
				_ZoltanOnody$proof_assistant$Proof$getAllBranches(_p1._0));
		}
	} else {
		var _p5 = _p0._2;
		var _p4 = _p0._0;
		var _p3 = {ctor: '_Tuple2', _0: _p0._1, _1: _p0._3};
		if (_p3._0.ctor === 'Nothing') {
			if (_p3._1.ctor === 'Nothing') {
				return {
					ctor: '::',
					_0: {
						ctor: '::',
						_0: _p4,
						_1: {ctor: '[]'}
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '::',
							_0: _p5,
							_1: {ctor: '[]'}
						},
						_1: {ctor: '[]'}
					}
				};
			} else {
				return {
					ctor: '::',
					_0: {
						ctor: '::',
						_0: _p4,
						_1: {ctor: '[]'}
					},
					_1: A2(
						_elm_lang$core$List$map,
						function (lst) {
							return {ctor: '::', _0: _p4, _1: lst};
						},
						_ZoltanOnody$proof_assistant$Proof$getAllBranches(_p3._1._0))
				};
			}
		} else {
			if (_p3._1.ctor === 'Nothing') {
				return {
					ctor: '::',
					_0: {
						ctor: '::',
						_0: _p5,
						_1: {ctor: '[]'}
					},
					_1: A2(
						_elm_lang$core$List$map,
						function (lst) {
							return {ctor: '::', _0: _p4, _1: lst};
						},
						_ZoltanOnody$proof_assistant$Proof$getAllBranches(_p3._0._0))
				};
			} else {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					A2(
						_elm_lang$core$List$map,
						function (lst) {
							return {ctor: '::', _0: _p4, _1: lst};
						},
						_ZoltanOnody$proof_assistant$Proof$getAllBranches(_p3._0._0)),
					A2(
						_elm_lang$core$List$map,
						function (lst) {
							return {ctor: '::', _0: _p5, _1: lst};
						},
						_ZoltanOnody$proof_assistant$Proof$getAllBranches(_p3._1._0)));
			}
		}
	}
};
var _ZoltanOnody$proof_assistant$Proof$getStatusGC = F3(
	function (branchAbove, formula, proof) {
		var isNegation = F2(
			function (first, second) {
				return _elm_lang$core$Native_Utils.eq(
					_FMFI_UK_1_AIN_412$elm_formula$Formula$Neg(first),
					second) || _elm_lang$core$Native_Utils.eq(
					first,
					_FMFI_UK_1_AIN_412$elm_formula$Formula$Neg(second));
			});
		var isFormulaInContradiction = F2(
			function (elem, branch) {
				return A2(
					_elm_lang$core$List$any,
					_elm_lang$core$Basics$identity,
					A2(
						_elm_lang$core$List$map,
						isNegation(elem),
						branch));
			});
		var isDirectProof = function (branch) {
			return A2(
				_elm_lang$core$List$any,
				_elm_lang$core$Basics$identity,
				A2(
					_elm_lang$core$List$map,
					F2(
						function (x, y) {
							return _elm_lang$core$Native_Utils.eq(x, y);
						})(formula),
					branch));
		};
		var parsedBranchAbove = A2(
			_elm_lang$core$List$filterMap,
			function (_p6) {
				return _elm_lang$core$Result$toMaybe(
					function (_) {
						return _.formula;
					}(_p6));
			},
			branchAbove);
		var branchForContradiction = function (branch) {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				parsedBranchAbove,
				A2(
					_elm_lang$core$Basics_ops['++'],
					{
						ctor: '::',
						_0: _FMFI_UK_1_AIN_412$elm_formula$Formula$Neg(formula),
						_1: {ctor: '[]'}
					},
					branch));
		};
		var isContradictionProof = function (branch) {
			return A2(
				_elm_lang$core$List$any,
				function (_p7) {
					var _p8 = _p7;
					return A2(isFormulaInContradiction, _p8._0, _p8._1);
				},
				_elm_community$list_extra$List_Extra$select(
					branchForContradiction(branch)));
		};
		var isValidOnBranch = function (branch) {
			var parsedFormulas = A2(
				_elm_lang$core$List$filterMap,
				function (_p9) {
					return _elm_lang$core$Result$toMaybe(
						function (_) {
							return _.formula;
						}(_p9));
				},
				branch);
			return isDirectProof(parsedFormulas) || isContradictionProof(parsedFormulas);
		};
		return A2(
			_elm_lang$core$List$map,
			isValidOnBranch,
			_ZoltanOnody$proof_assistant$Proof$getAllBranches(proof));
	});
var _ZoltanOnody$proof_assistant$Proof$getStatusRule = function (maybeJustification) {
	var _p10 = maybeJustification;
	if (_p10.ctor === 'Nothing') {
		return _elm_lang$core$Result$Err('Could not match any rule');
	} else {
		return _elm_lang$core$Result$Ok(
			_ZoltanOnody$proof_assistant$Validator$matcherToStr(_p10._0));
	}
};
var _ZoltanOnody$proof_assistant$Proof$getHelpTextAddUniversal = F2(
	function (maybeFormula, $const) {
		var _p11 = maybeFormula;
		if ((_p11.ctor === 'Ok') && (_p11._0.ctor === 'ForAll')) {
			var _p12 = A2(
				_FMFI_UK_1_AIN_412$elm_formula$Formula$substitute,
				_elm_lang$core$Dict$fromList(
					{
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: _p11._0._0,
							_1: _FMFI_UK_1_AIN_412$elm_formula$Formula$Var($const)
						},
						_1: {ctor: '[]'}
					}),
				_p11._0._1);
			if (_p12.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					_FMFI_UK_1_AIN_412$elm_formula$Formula$strFormula(_p12._0));
			} else {
				return _elm_lang$core$Result$Err('');
			}
		} else {
			return _elm_lang$core$Result$Err('');
		}
	});
var _ZoltanOnody$proof_assistant$Proof$provenText = F2(
	function (str, list) {
		return A2(_elm_lang$core$List$all, _elm_lang$core$Basics$identity, list) ? _elm_lang$core$Result$Ok(
			A2(_elm_lang$core$Basics_ops['++'], str, ' is proven')) : ((!A2(_elm_lang$core$List$any, _elm_lang$core$Basics$identity, list)) ? _elm_lang$core$Result$Err(
			A2(_elm_lang$core$Basics_ops['++'], str, ' is not proven yet')) : _elm_lang$core$Result$Err(
			A2(
				_elm_lang$core$Basics_ops['++'],
				str,
				A2(
					_elm_lang$core$Basics_ops['++'],
					' is only proven in ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(
							_elm_lang$core$List$length(
								A2(_elm_lang$core$List$filter, _elm_lang$core$Basics$identity, list))),
						A2(
							_elm_lang$core$Basics_ops['++'],
							' out of ',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(
									_elm_lang$core$List$length(list)),
								' branches')))))));
	});
var _ZoltanOnody$proof_assistant$Proof$getStatusAddUniversal = F3(
	function (formula, maybeProof, newVariable) {
		var _p13 = formula;
		if (_p13.ctor === 'ForAll') {
			var _p14 = maybeProof;
			if (_p14.ctor === 'Nothing') {
				return _elm_lang$core$Result$Err('Prove the generalization in the sub-proof');
			} else {
				var allBranches = _ZoltanOnody$proof_assistant$Proof$getAllBranches(_p14._0);
				var toBeMatched = function () {
					var _p15 = formula;
					if (_p15.ctor === 'ForAll') {
						var sub = _elm_lang$core$Dict$fromList(
							{
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: _p15._0,
									_1: _FMFI_UK_1_AIN_412$elm_formula$Formula$Var(newVariable)
								},
								_1: {ctor: '[]'}
							});
						var _p16 = A2(_FMFI_UK_1_AIN_412$elm_formula$Formula$substitute, sub, _p15._1);
						if (_p16.ctor === 'Ok') {
							return _elm_lang$core$Maybe$Just(_p16._0);
						} else {
							return _elm_lang$core$Maybe$Nothing;
						}
					} else {
						return _elm_lang$core$Maybe$Nothing;
					}
				}();
				var equal = function ($this) {
					var _p17 = $this.formula;
					if (_p17.ctor === 'Ok') {
						return _elm_lang$core$Native_Utils.eq(
							toBeMatched,
							_elm_lang$core$Maybe$Just(_p17._0));
					} else {
						return false;
					}
				};
				var $function = function (branch) {
					return A2(
						_elm_lang$core$List$any,
						_elm_lang$core$Basics$identity,
						A2(_elm_lang$core$List$map, equal, branch));
				};
				return A2(
					_ZoltanOnody$proof_assistant$Proof$provenText,
					'Generalization',
					A2(_elm_lang$core$List$map, $function, allBranches));
			}
		} else {
			return _elm_lang$core$Result$Err('Generalization must have the ∀x(φ) format');
		}
	});
var _ZoltanOnody$proof_assistant$Proof$getStatusGoal = F3(
	function (branchAbove, formula, maybeProof) {
		var _p18 = maybeProof;
		if (_p18.ctor === 'Nothing') {
			return _elm_lang$core$Result$Err('Prove the goal in the sub-proof');
		} else {
			return A2(
				_ZoltanOnody$proof_assistant$Proof$provenText,
				'The goal',
				A3(_ZoltanOnody$proof_assistant$Proof$getStatusGC, branchAbove, formula, _p18._0));
		}
	});
var _ZoltanOnody$proof_assistant$Proof$getStatusContradiction = F3(
	function (branchAbove, formula, maybeProof) {
		var _p19 = maybeProof;
		if (_p19.ctor === 'Nothing') {
			return _elm_lang$core$Result$Err('Contradiction not found');
		} else {
			return A2(
				_ZoltanOnody$proof_assistant$Proof$provenText,
				'Contradiction',
				A3(_ZoltanOnody$proof_assistant$Proof$getStatusGC, branchAbove, formula, _p19._0));
		}
	});
var _ZoltanOnody$proof_assistant$Proof$getErrorOrFormula = function (formulaStep) {
	if (_elm_lang$core$Native_Utils.eq(formulaStep.text, '')) {
		return _elm_lang$core$Result$Err('Formula should not be empty');
	} else {
		var _p20 = formulaStep.formula;
		if (_p20.ctor === 'Err') {
			return _elm_lang$core$Result$Err(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'Could not parse: ',
					_elm_lang$core$Basics$toString(_p20._0)));
		} else {
			return _elm_lang$core$Result$Ok(_p20._0);
		}
	}
};
var _ZoltanOnody$proof_assistant$Proof$tryParseFormula = function (data) {
	var _p21 = _ZoltanOnody$proof_assistant$Proof$getErrorOrFormula(data);
	if (_p21.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Nothing;
	} else {
		return _elm_lang$core$Maybe$Just(_p21._0);
	}
};
var _ZoltanOnody$proof_assistant$Proof$getStatus = F3(
	function (explanation, data, branchAbove) {
		var _p22 = _ZoltanOnody$proof_assistant$Proof$getErrorOrFormula(data);
		if (_p22.ctor === 'Err') {
			return _elm_lang$core$Result$Err(_p22._0);
		} else {
			var _p24 = _p22._0;
			var _p23 = explanation;
			switch (_p23.ctor) {
				case 'Premise':
					return _elm_lang$core$Result$Ok('');
				case 'Rule':
					return _ZoltanOnody$proof_assistant$Proof$getStatusRule(_p23._0);
				case 'Goal':
					return A3(_ZoltanOnody$proof_assistant$Proof$getStatusGoal, branchAbove, _p24, _p23._0);
				case 'Contradiction':
					return A3(_ZoltanOnody$proof_assistant$Proof$getStatusContradiction, branchAbove, _p24, _p23._0);
				default:
					return A3(_ZoltanOnody$proof_assistant$Proof$getStatusAddUniversal, _p24, _p23._1, _p23._0);
			}
		}
	});
var _ZoltanOnody$proof_assistant$Proof$setNextProof = F3(
	function (whr, $function, proof) {
		var _p25 = proof;
		if (_p25.ctor === 'CasesNode') {
			var _p30 = _p25._3;
			var _p29 = _p25._1;
			var _p28 = _p25._2;
			var _p27 = _p25._0;
			var _p26 = whr;
			switch (_p26.ctor) {
				case 'OnNode':
					return A2(
						_elm_lang$core$Native_Utils.crash(
							'Proof',
							{
								start: {line: 111, column: 21},
								end: {line: 111, column: 32}
							}),
						'This was not supposed to be called!',
						proof);
				case 'OnCase1':
					return A4(
						_ZoltanOnody$proof_assistant$Types$CasesNode,
						_p27,
						$function(_p29),
						_p28,
						_p30);
				default:
					return A4(
						_ZoltanOnody$proof_assistant$Types$CasesNode,
						_p27,
						_p29,
						_p28,
						$function(_p30));
			}
		} else {
			var _p31 = whr;
			switch (_p31.ctor) {
				case 'OnNode':
					return A3(
						_ZoltanOnody$proof_assistant$Types$FormulaNode,
						_p25._0,
						_p25._1,
						$function(_p25._2));
				case 'OnCase1':
					return A2(
						_elm_lang$core$Native_Utils.crash(
							'Proof',
							{
								start: {line: 125, column: 21},
								end: {line: 125, column: 32}
							}),
						'This was not supposed to be called!',
						proof);
				default:
					return A2(
						_elm_lang$core$Native_Utils.crash(
							'Proof',
							{
								start: {line: 128, column: 21},
								end: {line: 128, column: 32}
							}),
						'This was not supposed to be called!',
						proof);
			}
		}
	});
var _ZoltanOnody$proof_assistant$Proof$addFormulaStep = F3(
	function (whr, toAdd, proof) {
		var $function = function (next) {
			var _p32 = next;
			if (_p32.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Just(
					A3(
						_ZoltanOnody$proof_assistant$Types$FormulaNode,
						_ZoltanOnody$proof_assistant$Types$Rule(_elm_lang$core$Maybe$Nothing),
						toAdd,
						_elm_lang$core$Maybe$Nothing));
			} else {
				return _elm_lang$core$Maybe$Just(
					A3(
						_ZoltanOnody$proof_assistant$Types$FormulaNode,
						_ZoltanOnody$proof_assistant$Types$Rule(_elm_lang$core$Maybe$Nothing),
						toAdd,
						_elm_lang$core$Maybe$Just(_p32._0)));
			}
		};
		return A3(_ZoltanOnody$proof_assistant$Proof$setNextProof, whr, $function, proof);
	});
var _ZoltanOnody$proof_assistant$Proof$applyFunction = F3(
	function (whr, $function, proof) {
		var _p33 = proof;
		if (_p33.ctor === 'CasesNode') {
			var _p38 = _p33._3;
			var _p37 = _p33._1;
			var _p36 = _p33._2;
			var _p35 = _p33._0;
			var _p34 = whr;
			switch (_p34.ctor) {
				case 'OnNode':
					return A2(
						_elm_lang$core$Native_Utils.crash(
							'Proof',
							{
								start: {line: 85, column: 21},
								end: {line: 85, column: 32}
							}),
						'This was not supposed to be called!',
						proof);
				case 'OnCase1':
					return A4(
						_ZoltanOnody$proof_assistant$Types$CasesNode,
						$function(_p35),
						_p37,
						_p36,
						_p38);
				default:
					return A4(
						_ZoltanOnody$proof_assistant$Types$CasesNode,
						_p35,
						_p37,
						$function(_p36),
						_p38);
			}
		} else {
			var _p39 = whr;
			switch (_p39.ctor) {
				case 'OnNode':
					return A3(
						_ZoltanOnody$proof_assistant$Types$FormulaNode,
						_p33._0,
						$function(_p33._1),
						_p33._2);
				case 'OnCase1':
					return A2(
						_elm_lang$core$Native_Utils.crash(
							'Proof',
							{
								start: {line: 99, column: 21},
								end: {line: 99, column: 32}
							}),
						'This was not supposed to be called!',
						proof);
				default:
					return A2(
						_elm_lang$core$Native_Utils.crash(
							'Proof',
							{
								start: {line: 102, column: 21},
								end: {line: 102, column: 32}
							}),
						'This was not supposed to be called!',
						proof);
			}
		}
	});
var _ZoltanOnody$proof_assistant$Proof$setCollapsed = F2(
	function (bool, formulaStep) {
		var gui = formulaStep.gui;
		var newGui = _elm_lang$core$Native_Utils.update(
			gui,
			{collapsed: bool});
		return _elm_lang$core$Native_Utils.update(
			formulaStep,
			{gui: newGui});
	});
var _ZoltanOnody$proof_assistant$Proof$setShowButtons = F2(
	function (bool, formulaStep) {
		var gui = formulaStep.gui;
		var newGui = _elm_lang$core$Native_Utils.update(
			gui,
			{showButtons: bool});
		return _elm_lang$core$Native_Utils.update(
			formulaStep,
			{gui: newGui});
	});
var _ZoltanOnody$proof_assistant$Proof$changeFormulaStepText = F2(
	function (text, formulaStep) {
		return _elm_lang$core$Native_Utils.update(
			formulaStep,
			{
				text: text,
				formula: _FMFI_UK_1_AIN_412$elm_formula$Formula$parse(text)
			});
	});
var _ZoltanOnody$proof_assistant$Proof$createFormulaStep = function (text) {
	return {
		text: text,
		formula: _FMFI_UK_1_AIN_412$elm_formula$Formula$parse(text),
		index: 0,
		gui: {showButtons: true, collapsed: false}
	};
};
var _ZoltanOnody$proof_assistant$Proof$addCases = F2(
	function (whr, proof) {
		var $function = function (next) {
			var _p40 = next;
			if (_p40.ctor === 'Just') {
				return _elm_lang$core$Maybe$Just(_p40._0);
			} else {
				return _elm_lang$core$Maybe$Just(
					A4(
						_ZoltanOnody$proof_assistant$Types$CasesNode,
						_ZoltanOnody$proof_assistant$Proof$createFormulaStep(''),
						_elm_lang$core$Maybe$Nothing,
						_ZoltanOnody$proof_assistant$Proof$createFormulaStep(''),
						_elm_lang$core$Maybe$Nothing));
			}
		};
		return A3(_ZoltanOnody$proof_assistant$Proof$setNextProof, whr, $function, proof);
	});
var _ZoltanOnody$proof_assistant$Proof$getImplicationAntecedent = function (data) {
	var _p41 = data.formula;
	if ((_p41.ctor === 'Ok') && (_p41._0.ctor === 'Impl')) {
		var newData = _ZoltanOnody$proof_assistant$Proof$createFormulaStep(
			_FMFI_UK_1_AIN_412$elm_formula$Formula$strFormula(_p41._0._0));
		return _elm_lang$core$Maybe$Just(
			_elm_lang$core$Native_Utils.update(
				newData,
				{index: data.index}));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _ZoltanOnody$proof_assistant$Proof$OnCase2 = {ctor: 'OnCase2'};
var _ZoltanOnody$proof_assistant$Proof$OnCase1 = {ctor: 'OnCase1'};
var _ZoltanOnody$proof_assistant$Proof$OnNode = {ctor: 'OnNode'};

var _ZoltanOnody$proof_assistant$Exporting_Json_Decode$createFormulaStepForDecoder = function (text) {
	var data = _ZoltanOnody$proof_assistant$Proof$createFormulaStep(text);
	return _elm_lang$core$Native_Utils.update(
		data,
		{
			gui: {showButtons: false, collapsed: false}
		});
};
var _ZoltanOnody$proof_assistant$Exporting_Json_Decode$formulaStepDecoder = A2(
	_elm_lang$core$Json_Decode$map,
	_ZoltanOnody$proof_assistant$Exporting_Json_Decode$createFormulaStepForDecoder,
	A2(_elm_lang$core$Json_Decode$field, 'text', _elm_lang$core$Json_Decode$string));
var _ZoltanOnody$proof_assistant$Exporting_Json_Decode$casesNodeDecoder = A5(
	_elm_lang$core$Json_Decode$map4,
	_ZoltanOnody$proof_assistant$Types$CasesNode,
	A2(_elm_lang$core$Json_Decode$field, 'case1', _ZoltanOnody$proof_assistant$Exporting_Json_Decode$formulaStepDecoder),
	_elm_lang$core$Json_Decode$maybe(
		A2(
			_elm_lang$core$Json_Decode$field,
			'next1',
			_elm_lang$core$Json_Decode$lazy(
				function (_p0) {
					return _ZoltanOnody$proof_assistant$Exporting_Json_Decode$proofDecoder;
				}))),
	A2(_elm_lang$core$Json_Decode$field, 'case2', _ZoltanOnody$proof_assistant$Exporting_Json_Decode$formulaStepDecoder),
	_elm_lang$core$Json_Decode$maybe(
		A2(
			_elm_lang$core$Json_Decode$field,
			'next2',
			_elm_lang$core$Json_Decode$lazy(
				function (_p1) {
					return _ZoltanOnody$proof_assistant$Exporting_Json_Decode$proofDecoder;
				}))));
var _ZoltanOnody$proof_assistant$Exporting_Json_Decode$proofDecoder = _elm_lang$core$Json_Decode$lazy(
	function (_p2) {
		return A2(
			_elm_lang$core$Json_Decode$andThen,
			_ZoltanOnody$proof_assistant$Exporting_Json_Decode$proofTypeDecoder,
			A2(_elm_lang$core$Json_Decode$field, 'type', _elm_lang$core$Json_Decode$string));
	});
var _ZoltanOnody$proof_assistant$Exporting_Json_Decode$proofTypeDecoder = function (type_) {
	var _p3 = type_;
	switch (_p3) {
		case 'formulaNode':
			return _ZoltanOnody$proof_assistant$Exporting_Json_Decode$formulaNodeDecoder;
		case 'casesNode':
			return _ZoltanOnody$proof_assistant$Exporting_Json_Decode$casesNodeDecoder;
		default:
			return _elm_lang$core$Json_Decode$fail(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'\'',
					A2(_elm_lang$core$Basics_ops['++'], type_, '\' is not a correct node type')));
	}
};
var _ZoltanOnody$proof_assistant$Exporting_Json_Decode$formulaNodeDecoder = A4(
	_elm_lang$core$Json_Decode$map3,
	_ZoltanOnody$proof_assistant$Types$FormulaNode,
	A2(
		_elm_lang$core$Json_Decode$field,
		'expl',
		_elm_lang$core$Json_Decode$lazy(
			function (_p4) {
				return _ZoltanOnody$proof_assistant$Exporting_Json_Decode$explDecoder;
			})),
	A2(
		_elm_lang$core$Json_Decode$field,
		'data',
		_elm_lang$core$Json_Decode$lazy(
			function (_p5) {
				return _ZoltanOnody$proof_assistant$Exporting_Json_Decode$formulaStepDecoder;
			})),
	_elm_lang$core$Json_Decode$maybe(
		A2(
			_elm_lang$core$Json_Decode$field,
			'next',
			_elm_lang$core$Json_Decode$lazy(
				function (_p6) {
					return _ZoltanOnody$proof_assistant$Exporting_Json_Decode$proofDecoder;
				}))));
var _ZoltanOnody$proof_assistant$Exporting_Json_Decode$explDecoder = _elm_lang$core$Json_Decode$lazy(
	function (_p7) {
		return A2(
			_elm_lang$core$Json_Decode$andThen,
			_ZoltanOnody$proof_assistant$Exporting_Json_Decode$explanationTypeDecoder,
			A2(_elm_lang$core$Json_Decode$field, 'type', _elm_lang$core$Json_Decode$string));
	});
var _ZoltanOnody$proof_assistant$Exporting_Json_Decode$explanationTypeDecoder = function (type_) {
	var _p8 = type_;
	switch (_p8) {
		case 'premise':
			return _elm_lang$core$Json_Decode$succeed(_ZoltanOnody$proof_assistant$Types$Premise);
		case 'rule':
			return _elm_lang$core$Json_Decode$succeed(
				_ZoltanOnody$proof_assistant$Types$Rule(_elm_lang$core$Maybe$Nothing));
		case 'goal':
			return A2(
				_elm_lang$core$Json_Decode$map,
				_ZoltanOnody$proof_assistant$Types$Goal,
				A2(
					_elm_lang$core$Json_Decode$field,
					'proof',
					_elm_lang$core$Json_Decode$maybe(
						_elm_lang$core$Json_Decode$lazy(
							function (_p9) {
								return _ZoltanOnody$proof_assistant$Exporting_Json_Decode$proofDecoder;
							}))));
		case 'contradiction':
			return A2(
				_elm_lang$core$Json_Decode$map,
				_ZoltanOnody$proof_assistant$Types$Contradiction,
				A2(
					_elm_lang$core$Json_Decode$field,
					'proof',
					_elm_lang$core$Json_Decode$maybe(
						_elm_lang$core$Json_Decode$lazy(
							function (_p10) {
								return _ZoltanOnody$proof_assistant$Exporting_Json_Decode$proofDecoder;
							}))));
		case 'generalization':
			return A3(
				_elm_lang$core$Json_Decode$map2,
				_ZoltanOnody$proof_assistant$Types$Generalization,
				A2(_elm_lang$core$Json_Decode$field, 'freeVariableName', _elm_lang$core$Json_Decode$string),
				A2(
					_elm_lang$core$Json_Decode$field,
					'proof',
					_elm_lang$core$Json_Decode$maybe(
						_elm_lang$core$Json_Decode$lazy(
							function (_p11) {
								return _ZoltanOnody$proof_assistant$Exporting_Json_Decode$proofDecoder;
							}))));
		default:
			return _elm_lang$core$Json_Decode$fail(
				A2(
					_elm_lang$core$Basics_ops['++'],
					'\'',
					A2(_elm_lang$core$Basics_ops['++'], type_, '\' is not a correct node type')));
	}
};
var _ZoltanOnody$proof_assistant$Exporting_Json_Decode$decode = function (data) {
	return A2(_elm_lang$core$Json_Decode$decodeString, _ZoltanOnody$proof_assistant$Exporting_Json_Decode$proofDecoder, data);
};

var _elm_lang$http$Native_Http = function() {


// ENCODING AND DECODING

function encodeUri(string)
{
	return encodeURIComponent(string);
}

function decodeUri(string)
{
	try
	{
		return _elm_lang$core$Maybe$Just(decodeURIComponent(string));
	}
	catch(e)
	{
		return _elm_lang$core$Maybe$Nothing;
	}
}


// SEND REQUEST

function toTask(request, maybeProgress)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var xhr = new XMLHttpRequest();

		configureProgress(xhr, maybeProgress);

		xhr.addEventListener('error', function() {
			callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'NetworkError' }));
		});
		xhr.addEventListener('timeout', function() {
			callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'Timeout' }));
		});
		xhr.addEventListener('load', function() {
			callback(handleResponse(xhr, request.expect.responseToResult));
		});

		try
		{
			xhr.open(request.method, request.url, true);
		}
		catch (e)
		{
			return callback(_elm_lang$core$Native_Scheduler.fail({ ctor: 'BadUrl', _0: request.url }));
		}

		configureRequest(xhr, request);
		send(xhr, request.body);

		return function() { xhr.abort(); };
	});
}

function configureProgress(xhr, maybeProgress)
{
	if (maybeProgress.ctor === 'Nothing')
	{
		return;
	}

	xhr.addEventListener('progress', function(event) {
		if (!event.lengthComputable)
		{
			return;
		}
		_elm_lang$core$Native_Scheduler.rawSpawn(maybeProgress._0({
			bytes: event.loaded,
			bytesExpected: event.total
		}));
	});
}

function configureRequest(xhr, request)
{
	function setHeader(pair)
	{
		xhr.setRequestHeader(pair._0, pair._1);
	}

	A2(_elm_lang$core$List$map, setHeader, request.headers);
	xhr.responseType = request.expect.responseType;
	xhr.withCredentials = request.withCredentials;

	if (request.timeout.ctor === 'Just')
	{
		xhr.timeout = request.timeout._0;
	}
}

function send(xhr, body)
{
	switch (body.ctor)
	{
		case 'EmptyBody':
			xhr.send();
			return;

		case 'StringBody':
			xhr.setRequestHeader('Content-Type', body._0);
			xhr.send(body._1);
			return;

		case 'FormDataBody':
			xhr.send(body._0);
			return;
	}
}


// RESPONSES

function handleResponse(xhr, responseToResult)
{
	var response = toResponse(xhr);

	if (xhr.status < 200 || 300 <= xhr.status)
	{
		response.body = xhr.responseText;
		return _elm_lang$core$Native_Scheduler.fail({
			ctor: 'BadStatus',
			_0: response
		});
	}

	var result = responseToResult(response);

	if (result.ctor === 'Ok')
	{
		return _elm_lang$core$Native_Scheduler.succeed(result._0);
	}
	else
	{
		response.body = xhr.responseText;
		return _elm_lang$core$Native_Scheduler.fail({
			ctor: 'BadPayload',
			_0: result._0,
			_1: response
		});
	}
}

function toResponse(xhr)
{
	return {
		status: { code: xhr.status, message: xhr.statusText },
		headers: parseHeaders(xhr.getAllResponseHeaders()),
		url: xhr.responseURL,
		body: xhr.response
	};
}

function parseHeaders(rawHeaders)
{
	var headers = _elm_lang$core$Dict$empty;

	if (!rawHeaders)
	{
		return headers;
	}

	var headerPairs = rawHeaders.split('\u000d\u000a');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf('\u003a\u0020');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3(_elm_lang$core$Dict$update, key, function(oldValue) {
				if (oldValue.ctor === 'Just')
				{
					return _elm_lang$core$Maybe$Just(value + ', ' + oldValue._0);
				}
				return _elm_lang$core$Maybe$Just(value);
			}, headers);
		}
	}

	return headers;
}


// EXPECTORS

function expectStringResponse(responseToResult)
{
	return {
		responseType: 'text',
		responseToResult: responseToResult
	};
}

function mapExpect(func, expect)
{
	return {
		responseType: expect.responseType,
		responseToResult: function(response) {
			var convertedResponse = expect.responseToResult(response);
			return A2(_elm_lang$core$Result$map, func, convertedResponse);
		}
	};
}


// BODY

function multipart(parts)
{
	var formData = new FormData();

	while (parts.ctor !== '[]')
	{
		var part = parts._0;
		formData.append(part._0, part._1);
		parts = parts._1;
	}

	return { ctor: 'FormDataBody', _0: formData };
}

return {
	toTask: F2(toTask),
	expectStringResponse: expectStringResponse,
	mapExpect: F2(mapExpect),
	multipart: multipart,
	encodeUri: encodeUri,
	decodeUri: decodeUri
};

}();

var _elm_lang$http$Http_Internal$map = F2(
	function (func, request) {
		return _elm_lang$core$Native_Utils.update(
			request,
			{
				expect: A2(_elm_lang$http$Native_Http.mapExpect, func, request.expect)
			});
	});
var _elm_lang$http$Http_Internal$RawRequest = F7(
	function (a, b, c, d, e, f, g) {
		return {method: a, headers: b, url: c, body: d, expect: e, timeout: f, withCredentials: g};
	});
var _elm_lang$http$Http_Internal$Request = function (a) {
	return {ctor: 'Request', _0: a};
};
var _elm_lang$http$Http_Internal$Expect = {ctor: 'Expect'};
var _elm_lang$http$Http_Internal$FormDataBody = {ctor: 'FormDataBody'};
var _elm_lang$http$Http_Internal$StringBody = F2(
	function (a, b) {
		return {ctor: 'StringBody', _0: a, _1: b};
	});
var _elm_lang$http$Http_Internal$EmptyBody = {ctor: 'EmptyBody'};
var _elm_lang$http$Http_Internal$Header = F2(
	function (a, b) {
		return {ctor: 'Header', _0: a, _1: b};
	});

var _elm_lang$http$Http$decodeUri = _elm_lang$http$Native_Http.decodeUri;
var _elm_lang$http$Http$encodeUri = _elm_lang$http$Native_Http.encodeUri;
var _elm_lang$http$Http$expectStringResponse = _elm_lang$http$Native_Http.expectStringResponse;
var _elm_lang$http$Http$expectJson = function (decoder) {
	return _elm_lang$http$Http$expectStringResponse(
		function (response) {
			return A2(_elm_lang$core$Json_Decode$decodeString, decoder, response.body);
		});
};
var _elm_lang$http$Http$expectString = _elm_lang$http$Http$expectStringResponse(
	function (response) {
		return _elm_lang$core$Result$Ok(response.body);
	});
var _elm_lang$http$Http$multipartBody = _elm_lang$http$Native_Http.multipart;
var _elm_lang$http$Http$stringBody = _elm_lang$http$Http_Internal$StringBody;
var _elm_lang$http$Http$jsonBody = function (value) {
	return A2(
		_elm_lang$http$Http_Internal$StringBody,
		'application/json',
		A2(_elm_lang$core$Json_Encode$encode, 0, value));
};
var _elm_lang$http$Http$emptyBody = _elm_lang$http$Http_Internal$EmptyBody;
var _elm_lang$http$Http$header = _elm_lang$http$Http_Internal$Header;
var _elm_lang$http$Http$request = _elm_lang$http$Http_Internal$Request;
var _elm_lang$http$Http$post = F3(
	function (url, body, decoder) {
		return _elm_lang$http$Http$request(
			{
				method: 'POST',
				headers: {ctor: '[]'},
				url: url,
				body: body,
				expect: _elm_lang$http$Http$expectJson(decoder),
				timeout: _elm_lang$core$Maybe$Nothing,
				withCredentials: false
			});
	});
var _elm_lang$http$Http$get = F2(
	function (url, decoder) {
		return _elm_lang$http$Http$request(
			{
				method: 'GET',
				headers: {ctor: '[]'},
				url: url,
				body: _elm_lang$http$Http$emptyBody,
				expect: _elm_lang$http$Http$expectJson(decoder),
				timeout: _elm_lang$core$Maybe$Nothing,
				withCredentials: false
			});
	});
var _elm_lang$http$Http$getString = function (url) {
	return _elm_lang$http$Http$request(
		{
			method: 'GET',
			headers: {ctor: '[]'},
			url: url,
			body: _elm_lang$http$Http$emptyBody,
			expect: _elm_lang$http$Http$expectString,
			timeout: _elm_lang$core$Maybe$Nothing,
			withCredentials: false
		});
};
var _elm_lang$http$Http$toTask = function (_p0) {
	var _p1 = _p0;
	return A2(_elm_lang$http$Native_Http.toTask, _p1._0, _elm_lang$core$Maybe$Nothing);
};
var _elm_lang$http$Http$send = F2(
	function (resultToMessage, request) {
		return A2(
			_elm_lang$core$Task$attempt,
			resultToMessage,
			_elm_lang$http$Http$toTask(request));
	});
var _elm_lang$http$Http$Response = F4(
	function (a, b, c, d) {
		return {url: a, status: b, headers: c, body: d};
	});
var _elm_lang$http$Http$BadPayload = F2(
	function (a, b) {
		return {ctor: 'BadPayload', _0: a, _1: b};
	});
var _elm_lang$http$Http$BadStatus = function (a) {
	return {ctor: 'BadStatus', _0: a};
};
var _elm_lang$http$Http$NetworkError = {ctor: 'NetworkError'};
var _elm_lang$http$Http$Timeout = {ctor: 'Timeout'};
var _elm_lang$http$Http$BadUrl = function (a) {
	return {ctor: 'BadUrl', _0: a};
};
var _elm_lang$http$Http$StringPart = F2(
	function (a, b) {
		return {ctor: 'StringPart', _0: a, _1: b};
	});
var _elm_lang$http$Http$stringPart = _elm_lang$http$Http$StringPart;

var _ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonFormulaStep = function (data) {
	return {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'text',
			_1: _elm_lang$core$Json_Encode$string(data.text)
		},
		_1: {ctor: '[]'}
	};
};
var _ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonProofList = function (proof) {
	var _p0 = function () {
		var _p1 = proof;
		if (_p1.ctor === 'FormulaNode') {
			return {
				ctor: '_Tuple2',
				_0: 'formulaNode',
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'expl',
						_1: _elm_lang$core$Json_Encode$object(
							_ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonExpl(_p1._0))
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'data',
							_1: _elm_lang$core$Json_Encode$object(
								_ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonFormulaStep(_p1._1))
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'next',
								_1: _ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonMaybeProof(_p1._2)
							},
							_1: {ctor: '[]'}
						}
					}
				}
			};
		} else {
			return {
				ctor: '_Tuple2',
				_0: 'casesNode',
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'case1',
						_1: _elm_lang$core$Json_Encode$object(
							_ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonFormulaStep(_p1._0))
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'next1',
							_1: _ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonMaybeProof(_p1._1)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'case2',
								_1: _elm_lang$core$Json_Encode$object(
									_ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonFormulaStep(_p1._2))
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: 'next2',
									_1: _ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonMaybeProof(_p1._3)
								},
								_1: {ctor: '[]'}
							}
						}
					}
				}
			};
		}
	}();
	var type_ = _p0._0;
	var children = _p0._1;
	return {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'type',
			_1: _elm_lang$core$Json_Encode$string(type_)
		},
		_1: children
	};
};
var _ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonExpl = function (explanation) {
	var _p2 = function () {
		var _p3 = explanation;
		switch (_p3.ctor) {
			case 'Premise':
				return {
					ctor: '_Tuple2',
					_0: 'premise',
					_1: {ctor: '[]'}
				};
			case 'Rule':
				return {
					ctor: '_Tuple2',
					_0: 'rule',
					_1: {ctor: '[]'}
				};
			case 'Goal':
				return {
					ctor: '_Tuple2',
					_0: 'goal',
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'proof',
							_1: _ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonMaybeProof(_p3._0)
						},
						_1: {ctor: '[]'}
					}
				};
			case 'Contradiction':
				return {
					ctor: '_Tuple2',
					_0: 'contradiction',
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'proof',
							_1: _ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonMaybeProof(_p3._0)
						},
						_1: {ctor: '[]'}
					}
				};
			default:
				return {
					ctor: '_Tuple2',
					_0: 'generalization',
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'freeVariableName',
							_1: _elm_lang$core$Json_Encode$string(_p3._0)
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'proof',
								_1: _ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonMaybeProof(_p3._1)
							},
							_1: {ctor: '[]'}
						}
					}
				};
		}
	}();
	var type_ = _p2._0;
	var children = _p2._1;
	return {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'type',
			_1: _elm_lang$core$Json_Encode$string(type_)
		},
		_1: children
	};
};
var _ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonMaybeProof = function (maybeProof) {
	var _p4 = maybeProof;
	if (_p4.ctor === 'Just') {
		return _elm_lang$core$Json_Encode$object(
			_ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonProofList(_p4._0));
	} else {
		return _elm_lang$core$Json_Encode$null;
	}
};
var _ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonProof = function (proof) {
	return _elm_lang$core$Json_Encode$object(
		_ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonProofList(proof));
};
var _ZoltanOnody$proof_assistant$Exporting_Json_Encode$encode = F2(
	function (indentation, proof) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			A2(
				_elm_lang$core$Json_Encode$encode,
				indentation,
				_ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonProof(proof)),
			'\n');
	});
var _ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonDataUri = function (data) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'data:application/json;charset=utf-8,',
		_elm_lang$http$Http$encodeUri(data));
};

var _ZoltanOnody$proof_assistant$Exporting_Ports$fileSelected = _elm_lang$core$Native_Platform.outgoingPort(
	'fileSelected',
	function (v) {
		return v;
	});
var _ZoltanOnody$proof_assistant$Exporting_Ports$fileContentRead = _elm_lang$core$Native_Platform.incomingPort('fileContentRead', _elm_lang$core$Json_Decode$string);

var _ZoltanOnody$proof_assistant$Zipper$editGeneralizationText = F2(
	function (str, zipper) {
		var _p0 = zipper.proof;
		if ((_p0.ctor === 'FormulaNode') && (_p0._0.ctor === 'Generalization')) {
			return _elm_lang$core$Native_Utils.update(
				zipper,
				{
					proof: A3(
						_ZoltanOnody$proof_assistant$Types$FormulaNode,
						A2(_ZoltanOnody$proof_assistant$Types$Generalization, str, _p0._0._1),
						_p0._1,
						_p0._2)
				});
		} else {
			return zipper;
		}
	});
var _ZoltanOnody$proof_assistant$Zipper$getBranchAbove = function (breadcrumbs) {
	var $function = function (breadcrumb) {
		var _p1 = breadcrumb;
		switch (_p1.ctor) {
			case 'GoDown':
				return _elm_lang$core$Maybe$Just(_p1._1);
			case 'GoCase1':
				return _elm_lang$core$Maybe$Just(_p1._0);
			case 'GoCase2':
				return _elm_lang$core$Maybe$Just(_p1._2);
			case 'GoContradiction':
				var _p2 = _p1._0;
				return _elm_lang$core$Maybe$Just(
					A2(
						_ZoltanOnody$proof_assistant$Proof$changeFormulaStepText,
						A2(_elm_lang$core$Basics_ops['++'], '-', _p2.text),
						_p2));
			case 'GoGoalProof':
				return _ZoltanOnody$proof_assistant$Proof$getImplicationAntecedent(_p1._0);
			default:
				return _elm_lang$core$Maybe$Nothing;
		}
	};
	return A2(
		_elm_lang$core$List$filterMap,
		_elm_lang$core$Basics$identity,
		A2(_elm_lang$core$List$map, $function, breadcrumbs));
};
var _ZoltanOnody$proof_assistant$Zipper$validateCases = F3(
	function (case1, case2, zipper) {
		var _p3 = {ctor: '_Tuple2', _0: case1.formula, _1: case2.formula};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Ok')) && (_p3._1.ctor === 'Ok')) {
			return A3(
				_ZoltanOnody$proof_assistant$Validator$validatorCases,
				_p3._0._0,
				_p3._1._0,
				_ZoltanOnody$proof_assistant$Zipper$getBranchAbove(zipper.breadcrumbs));
		} else {
			return _elm_lang$core$Result$Err('Invalid cases! Could not parse at least one formula.');
		}
	});
var _ZoltanOnody$proof_assistant$Zipper$match = function (zipper) {
	var _p4 = zipper.proof;
	if (_p4.ctor === 'FormulaNode') {
		var _p7 = _p4._1;
		var _p6 = _p4._0;
		var maybeMatched = A2(
			_ZoltanOnody$proof_assistant$Validator$validator,
			_p7,
			_ZoltanOnody$proof_assistant$Zipper$getBranchAbove(zipper.breadcrumbs));
		var newExpl = function () {
			var _p5 = _p6;
			switch (_p5.ctor) {
				case 'Rule':
					return _ZoltanOnody$proof_assistant$Types$Rule(maybeMatched);
				case 'Premise':
					return _p6;
				case 'Contradiction':
					return _p6;
				case 'Goal':
					return _p6;
				default:
					return _p6;
			}
		}();
		var newProof = A3(_ZoltanOnody$proof_assistant$Types$FormulaNode, newExpl, _p7, _p4._2);
		return _elm_lang$core$Native_Utils.update(
			zipper,
			{proof: newProof});
	} else {
		return zipper;
	}
};
var _ZoltanOnody$proof_assistant$Zipper$setCollapsed = F3(
	function (whr, value, zipper) {
		return _elm_lang$core$Native_Utils.update(
			zipper,
			{
				proof: A3(
					_ZoltanOnody$proof_assistant$Proof$applyFunction,
					whr,
					_ZoltanOnody$proof_assistant$Proof$setCollapsed(value),
					zipper.proof)
			});
	});
var _ZoltanOnody$proof_assistant$Zipper$setButtonsAppearance = F3(
	function (whr, value, zipper) {
		return _elm_lang$core$Native_Utils.update(
			zipper,
			{
				proof: A3(
					_ZoltanOnody$proof_assistant$Proof$applyFunction,
					whr,
					_ZoltanOnody$proof_assistant$Proof$setShowButtons(value),
					zipper.proof)
			});
	});
var _ZoltanOnody$proof_assistant$Zipper$add = F3(
	function (whr, formulaStep, zipper) {
		return A3(
			_ZoltanOnody$proof_assistant$Zipper$setButtonsAppearance,
			whr,
			false,
			_elm_lang$core$Native_Utils.update(
				zipper,
				{
					proof: A3(_ZoltanOnody$proof_assistant$Proof$addFormulaStep, whr, formulaStep, zipper.proof)
				}));
	});
var _ZoltanOnody$proof_assistant$Zipper$addCases = F2(
	function (whr, zipper) {
		return A3(
			_ZoltanOnody$proof_assistant$Zipper$setButtonsAppearance,
			whr,
			false,
			_elm_lang$core$Native_Utils.update(
				zipper,
				{
					proof: A2(_ZoltanOnody$proof_assistant$Proof$addCases, whr, zipper.proof)
				}));
	});
var _ZoltanOnody$proof_assistant$Zipper$editValue = F3(
	function (whr, value, zipper) {
		return _elm_lang$core$Native_Utils.update(
			zipper,
			{
				proof: A3(
					_ZoltanOnody$proof_assistant$Proof$applyFunction,
					whr,
					_ZoltanOnody$proof_assistant$Proof$changeFormulaStepText(value),
					zipper.proof)
			});
	});
var _ZoltanOnody$proof_assistant$Zipper$changeExplanation = F2(
	function (explanation, zipper) {
		return _elm_lang$core$Native_Utils.update(
			zipper,
			{
				proof: function () {
					var _p8 = zipper.proof;
					if (_p8.ctor === 'FormulaNode') {
						return A3(_ZoltanOnody$proof_assistant$Types$FormulaNode, explanation, _p8._1, _p8._2);
					} else {
						return zipper.proof;
					}
				}()
			});
	});
var _ZoltanOnody$proof_assistant$Zipper$create = function (formulaStep) {
	return {
		proof: A3(
			_ZoltanOnody$proof_assistant$Types$FormulaNode,
			_ZoltanOnody$proof_assistant$Types$Rule(_elm_lang$core$Maybe$Nothing),
			formulaStep,
			_elm_lang$core$Maybe$Nothing),
		breadcrumbs: {ctor: '[]'}
	};
};
var _ZoltanOnody$proof_assistant$Zipper$upOrNothing = function (zipper) {
	var _p9 = zipper.breadcrumbs;
	if (_p9.ctor === '::') {
		var _p11 = _p9._1;
		var _p10 = _p9._0;
		switch (_p10.ctor) {
			case 'GoDown':
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Native_Utils.update(
						zipper,
						{
							proof: A3(
								_ZoltanOnody$proof_assistant$Types$FormulaNode,
								_p10._0,
								_p10._1,
								_elm_lang$core$Maybe$Just(zipper.proof)),
							breadcrumbs: _p11
						}));
			case 'GoCase1':
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Native_Utils.update(
						zipper,
						{
							proof: A4(
								_ZoltanOnody$proof_assistant$Types$CasesNode,
								_p10._0,
								_elm_lang$core$Maybe$Just(zipper.proof),
								_p10._1,
								_p10._2),
							breadcrumbs: _p11
						}));
			case 'GoCase2':
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Native_Utils.update(
						zipper,
						{
							proof: A4(
								_ZoltanOnody$proof_assistant$Types$CasesNode,
								_p10._0,
								_p10._1,
								_p10._2,
								_elm_lang$core$Maybe$Just(zipper.proof)),
							breadcrumbs: _p11
						}));
			case 'GoContradiction':
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Native_Utils.update(
						zipper,
						{
							proof: A3(
								_ZoltanOnody$proof_assistant$Types$FormulaNode,
								_ZoltanOnody$proof_assistant$Types$Contradiction(
									_elm_lang$core$Maybe$Just(zipper.proof)),
								_p10._0,
								_p10._1),
							breadcrumbs: _p11
						}));
			case 'GoGoalProof':
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Native_Utils.update(
						zipper,
						{
							proof: A3(
								_ZoltanOnody$proof_assistant$Types$FormulaNode,
								_ZoltanOnody$proof_assistant$Types$Goal(
									_elm_lang$core$Maybe$Just(zipper.proof)),
								_p10._0,
								_p10._1),
							breadcrumbs: _p11
						}));
			default:
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Native_Utils.update(
						zipper,
						{
							proof: A3(
								_ZoltanOnody$proof_assistant$Types$FormulaNode,
								A2(
									_ZoltanOnody$proof_assistant$Types$Generalization,
									_p10._1,
									_elm_lang$core$Maybe$Just(zipper.proof)),
								_p10._0,
								_p10._2),
							breadcrumbs: _p11
						}));
		}
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _ZoltanOnody$proof_assistant$Zipper$up = function (zipper) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		zipper,
		_ZoltanOnody$proof_assistant$Zipper$upOrNothing(zipper));
};
var _ZoltanOnody$proof_assistant$Zipper$getGeneratedVariablesAbove = function (zipper) {
	getGeneratedVariablesAbove:
	while (true) {
		var _p12 = _elm_lang$core$List$head(zipper.breadcrumbs);
		if (_p12.ctor === 'Nothing') {
			return {ctor: '[]'};
		} else {
			var _p13 = _p12._0;
			if ((_p13.ctor === 'GoDown') && (_p13._0.ctor === 'Generalization')) {
				return {
					ctor: '::',
					_0: _p13._0._0,
					_1: _ZoltanOnody$proof_assistant$Zipper$getGeneratedVariablesAbove(
						_ZoltanOnody$proof_assistant$Zipper$up(zipper))
				};
			} else {
				var _v10 = _ZoltanOnody$proof_assistant$Zipper$up(zipper);
				zipper = _v10;
				continue getGeneratedVariablesAbove;
			}
		}
	}
};
var _ZoltanOnody$proof_assistant$Zipper$getFreeVariables = function (zipper) {
	var generatedAbove = _ZoltanOnody$proof_assistant$Zipper$getGeneratedVariablesAbove(zipper);
	var branchBellow = A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return A2(_elm_lang$core$Basics_ops['++'], x, y);
			}),
		{ctor: '[]'},
		_ZoltanOnody$proof_assistant$Proof$getAllBranches(zipper.proof));
	var branchAbove = _ZoltanOnody$proof_assistant$Zipper$getBranchAbove(zipper.breadcrumbs);
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_ZoltanOnody$proof_assistant$Validator$getFreeVariables(
			A2(_elm_lang$core$Basics_ops['++'], branchAbove, branchBellow)),
		generatedAbove);
};
var _ZoltanOnody$proof_assistant$Zipper$validateNewFreeVariable = F2(
	function ($var, zipper) {
		return _elm_lang$core$Native_Utils.eq($var, '') ? _elm_lang$core$Result$Err('Variable cannot be empty') : (A2(
			_elm_lang$core$List$member,
			$var,
			_ZoltanOnody$proof_assistant$Zipper$getFreeVariables(zipper)) ? _elm_lang$core$Result$Err('This is not a free variable') : _elm_lang$core$Result$Ok(''));
	});
var _ZoltanOnody$proof_assistant$Zipper$generateNewFreeVariable = function (zipper) {
	return _ZoltanOnody$proof_assistant$Validator$generateNewFreeVariable(
		_ZoltanOnody$proof_assistant$Zipper$getFreeVariables(zipper));
};
var _ZoltanOnody$proof_assistant$Zipper$root = function (zipper) {
	root:
	while (true) {
		var _p14 = _ZoltanOnody$proof_assistant$Zipper$upOrNothing(zipper);
		if (_p14.ctor === 'Just') {
			var _v12 = _p14._0;
			zipper = _v12;
			continue root;
		} else {
			return zipper;
		}
	}
};
var _ZoltanOnody$proof_assistant$Zipper$createSubNodeHelper = F2(
	function (node, zipper) {
		var _p15 = zipper.proof;
		if (_p15.ctor === 'CasesNode') {
			return zipper;
		} else {
			var _p21 = _p15._2;
			var _p20 = _p15._1;
			var _p16 = _p15._0;
			switch (_p16.ctor) {
				case 'Premise':
					return zipper;
				case 'Rule':
					return zipper;
				case 'Goal':
					var _p17 = _p16._0;
					if (_p17.ctor === 'Just') {
						return zipper;
					} else {
						return _elm_lang$core$Native_Utils.update(
							zipper,
							{
								proof: A3(
									_ZoltanOnody$proof_assistant$Types$FormulaNode,
									_ZoltanOnody$proof_assistant$Types$Goal(
										_elm_lang$core$Maybe$Just(node)),
									_p20,
									_p21)
							});
					}
				case 'Contradiction':
					var _p18 = _p16._0;
					if (_p18.ctor === 'Just') {
						return zipper;
					} else {
						return _elm_lang$core$Native_Utils.update(
							zipper,
							{
								proof: A3(
									_ZoltanOnody$proof_assistant$Types$FormulaNode,
									_ZoltanOnody$proof_assistant$Types$Contradiction(
										_elm_lang$core$Maybe$Just(node)),
									_p20,
									_p21)
							});
					}
				default:
					var _p19 = _p16._1;
					if (_p19.ctor === 'Just') {
						return zipper;
					} else {
						return _elm_lang$core$Native_Utils.update(
							zipper,
							{
								proof: A3(
									_ZoltanOnody$proof_assistant$Types$FormulaNode,
									A2(
										_ZoltanOnody$proof_assistant$Types$Generalization,
										_p16._0,
										_elm_lang$core$Maybe$Just(node)),
									_p20,
									_p21)
							});
					}
			}
		}
	});
var _ZoltanOnody$proof_assistant$Zipper$createSubFormulaNode = function (zipper) {
	return A2(
		_ZoltanOnody$proof_assistant$Zipper$createSubNodeHelper,
		A3(
			_ZoltanOnody$proof_assistant$Types$FormulaNode,
			_ZoltanOnody$proof_assistant$Types$Rule(_elm_lang$core$Maybe$Nothing),
			_ZoltanOnody$proof_assistant$Proof$createFormulaStep(''),
			_elm_lang$core$Maybe$Nothing),
		zipper);
};
var _ZoltanOnody$proof_assistant$Zipper$createSubCasesNode = function (zipper) {
	return A2(
		_ZoltanOnody$proof_assistant$Zipper$createSubNodeHelper,
		A4(
			_ZoltanOnody$proof_assistant$Types$CasesNode,
			_ZoltanOnody$proof_assistant$Proof$createFormulaStep(''),
			_elm_lang$core$Maybe$Nothing,
			_ZoltanOnody$proof_assistant$Proof$createFormulaStep(''),
			_elm_lang$core$Maybe$Nothing),
		zipper);
};
var _ZoltanOnody$proof_assistant$Zipper$Zipper = F2(
	function (a, b) {
		return {proof: a, breadcrumbs: b};
	});
var _ZoltanOnody$proof_assistant$Zipper$GoAddUniversal = F3(
	function (a, b, c) {
		return {ctor: 'GoAddUniversal', _0: a, _1: b, _2: c};
	});
var _ZoltanOnody$proof_assistant$Zipper$GoGoalProof = F2(
	function (a, b) {
		return {ctor: 'GoGoalProof', _0: a, _1: b};
	});
var _ZoltanOnody$proof_assistant$Zipper$GoContradiction = F2(
	function (a, b) {
		return {ctor: 'GoContradiction', _0: a, _1: b};
	});
var _ZoltanOnody$proof_assistant$Zipper$enterSubOrNothing = function (zipper) {
	var _p22 = zipper.proof;
	if (_p22.ctor === 'CasesNode') {
		return _elm_lang$core$Maybe$Nothing;
	} else {
		var _p25 = _p22._2;
		var _p24 = _p22._1;
		var _p23 = _p22._0;
		switch (_p23.ctor) {
			case 'Premise':
				return _elm_lang$core$Maybe$Nothing;
			case 'Rule':
				return _elm_lang$core$Maybe$Nothing;
			case 'Goal':
				return A2(
					_elm_lang$core$Maybe$map,
					function (nextProof) {
						var breadcrumb = A2(_ZoltanOnody$proof_assistant$Zipper$GoGoalProof, _p24, _p25);
						return _elm_lang$core$Native_Utils.update(
							zipper,
							{
								proof: nextProof,
								breadcrumbs: {ctor: '::', _0: breadcrumb, _1: zipper.breadcrumbs}
							});
					},
					_p23._0);
			case 'Contradiction':
				return A2(
					_elm_lang$core$Maybe$map,
					function (nextProof) {
						var breadcrumb = A2(_ZoltanOnody$proof_assistant$Zipper$GoContradiction, _p24, _p25);
						return _elm_lang$core$Native_Utils.update(
							zipper,
							{
								proof: nextProof,
								breadcrumbs: {ctor: '::', _0: breadcrumb, _1: zipper.breadcrumbs}
							});
					},
					_p23._0);
			default:
				return A2(
					_elm_lang$core$Maybe$map,
					function (nextProof) {
						var breadcrumb = A3(_ZoltanOnody$proof_assistant$Zipper$GoAddUniversal, _p24, _p23._0, _p25);
						return _elm_lang$core$Native_Utils.update(
							zipper,
							{
								proof: nextProof,
								breadcrumbs: {ctor: '::', _0: breadcrumb, _1: zipper.breadcrumbs}
							});
					},
					_p23._1);
		}
	}
};
var _ZoltanOnody$proof_assistant$Zipper$enterSub = function (zipper) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		zipper,
		_ZoltanOnody$proof_assistant$Zipper$enterSubOrNothing(zipper));
};
var _ZoltanOnody$proof_assistant$Zipper$GoCase2 = F3(
	function (a, b, c) {
		return {ctor: 'GoCase2', _0: a, _1: b, _2: c};
	});
var _ZoltanOnody$proof_assistant$Zipper$enterCase2OrNothing = function (zipper) {
	var _p26 = zipper.proof;
	if (_p26.ctor === 'CasesNode') {
		return A2(
			_elm_lang$core$Maybe$map,
			function (newProof) {
				return _elm_lang$core$Native_Utils.update(
					zipper,
					{
						proof: newProof,
						breadcrumbs: {
							ctor: '::',
							_0: A3(_ZoltanOnody$proof_assistant$Zipper$GoCase2, _p26._0, _p26._1, _p26._2),
							_1: zipper.breadcrumbs
						}
					});
			},
			_p26._3);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _ZoltanOnody$proof_assistant$Zipper$enterCase2 = function (zipper) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		zipper,
		_ZoltanOnody$proof_assistant$Zipper$enterCase2OrNothing(zipper));
};
var _ZoltanOnody$proof_assistant$Zipper$GoCase1 = F3(
	function (a, b, c) {
		return {ctor: 'GoCase1', _0: a, _1: b, _2: c};
	});
var _ZoltanOnody$proof_assistant$Zipper$enterCase1OrNothing = function (zipper) {
	var _p27 = zipper.proof;
	if (_p27.ctor === 'CasesNode') {
		return A2(
			_elm_lang$core$Maybe$map,
			function (newProof) {
				return _elm_lang$core$Native_Utils.update(
					zipper,
					{
						proof: newProof,
						breadcrumbs: {
							ctor: '::',
							_0: A3(_ZoltanOnody$proof_assistant$Zipper$GoCase1, _p27._0, _p27._2, _p27._3),
							_1: zipper.breadcrumbs
						}
					});
			},
			_p27._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _ZoltanOnody$proof_assistant$Zipper$enterCase1 = function (zipper) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		zipper,
		_ZoltanOnody$proof_assistant$Zipper$enterCase1OrNothing(zipper));
};
var _ZoltanOnody$proof_assistant$Zipper$GoDown = F2(
	function (a, b) {
		return {ctor: 'GoDown', _0: a, _1: b};
	});
var _ZoltanOnody$proof_assistant$Zipper$downOrNothing = function (zipper) {
	var _p28 = zipper.proof;
	if (_p28.ctor === 'FormulaNode') {
		return A2(
			_elm_lang$core$Maybe$map,
			function (nextProof) {
				return _elm_lang$core$Native_Utils.update(
					zipper,
					{
						proof: nextProof,
						breadcrumbs: {
							ctor: '::',
							_0: A2(_ZoltanOnody$proof_assistant$Zipper$GoDown, _p28._0, _p28._1),
							_1: zipper.breadcrumbs
						}
					});
			},
			_p28._2);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _ZoltanOnody$proof_assistant$Zipper$down = function (zipper) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		zipper,
		_ZoltanOnody$proof_assistant$Zipper$downOrNothing(zipper));
};
var _ZoltanOnody$proof_assistant$Zipper$delete = function (zipper) {
	var _p29 = zipper.breadcrumbs;
	if (_p29.ctor === '[]') {
		var _p30 = _ZoltanOnody$proof_assistant$Zipper$downOrNothing(zipper);
		if (_p30.ctor === 'Nothing') {
			return _ZoltanOnody$proof_assistant$Zipper$create(
				_ZoltanOnody$proof_assistant$Proof$createFormulaStep(''));
		} else {
			return _elm_lang$core$Native_Utils.update(
				_p30._0,
				{
					breadcrumbs: {ctor: '[]'}
				});
		}
	} else {
		var newProof = function () {
			var _p31 = _p29._0;
			switch (_p31.ctor) {
				case 'GoDown':
					var _p34 = _p31._1;
					var _p33 = _p31._0;
					var _p32 = zipper.proof;
					if (_p32.ctor === 'FormulaNode') {
						return A3(_ZoltanOnody$proof_assistant$Types$FormulaNode, _p33, _p34, _p32._2);
					} else {
						return A3(_ZoltanOnody$proof_assistant$Types$FormulaNode, _p33, _p34, _elm_lang$core$Maybe$Nothing);
					}
				case 'GoCase1':
					var _p38 = _p31._2;
					var _p37 = _p31._1;
					var _p36 = _p31._0;
					var _p35 = zipper.proof;
					if (_p35.ctor === 'FormulaNode') {
						return A4(_ZoltanOnody$proof_assistant$Types$CasesNode, _p36, _p35._2, _p37, _p38);
					} else {
						return A4(_ZoltanOnody$proof_assistant$Types$CasesNode, _p36, _elm_lang$core$Maybe$Nothing, _p37, _p38);
					}
				case 'GoCase2':
					var _p42 = _p31._1;
					var _p41 = _p31._2;
					var _p40 = _p31._0;
					var _p39 = zipper.proof;
					if (_p39.ctor === 'FormulaNode') {
						return A4(_ZoltanOnody$proof_assistant$Types$CasesNode, _p40, _p42, _p41, _p39._2);
					} else {
						return A4(_ZoltanOnody$proof_assistant$Types$CasesNode, _p40, _p42, _p41, _elm_lang$core$Maybe$Nothing);
					}
				case 'GoContradiction':
					var _p45 = _p31._0;
					var _p44 = _p31._1;
					var _p43 = zipper.proof;
					if (_p43.ctor === 'FormulaNode') {
						return A3(
							_ZoltanOnody$proof_assistant$Types$FormulaNode,
							_ZoltanOnody$proof_assistant$Types$Contradiction(_p43._2),
							_p45,
							_p44);
					} else {
						return A3(
							_ZoltanOnody$proof_assistant$Types$FormulaNode,
							_ZoltanOnody$proof_assistant$Types$Contradiction(_elm_lang$core$Maybe$Nothing),
							_p45,
							_p44);
					}
				case 'GoGoalProof':
					var _p48 = _p31._0;
					var _p47 = _p31._1;
					var _p46 = zipper.proof;
					if (_p46.ctor === 'FormulaNode') {
						return A3(
							_ZoltanOnody$proof_assistant$Types$FormulaNode,
							_ZoltanOnody$proof_assistant$Types$Goal(_p46._2),
							_p48,
							_p47);
					} else {
						return A3(
							_ZoltanOnody$proof_assistant$Types$FormulaNode,
							_ZoltanOnody$proof_assistant$Types$Goal(_elm_lang$core$Maybe$Nothing),
							_p48,
							_p47);
					}
				default:
					var _p52 = _p31._1;
					var _p51 = _p31._0;
					var _p50 = _p31._2;
					var _p49 = zipper.proof;
					if (_p49.ctor === 'FormulaNode') {
						return A3(
							_ZoltanOnody$proof_assistant$Types$FormulaNode,
							A2(_ZoltanOnody$proof_assistant$Types$Generalization, _p52, _p49._2),
							_p51,
							_p50);
					} else {
						return A3(
							_ZoltanOnody$proof_assistant$Types$FormulaNode,
							A2(_ZoltanOnody$proof_assistant$Types$Generalization, _p52, _elm_lang$core$Maybe$Nothing),
							_p51,
							_p50);
					}
			}
		}();
		return {proof: newProof, breadcrumbs: _p29._1};
	}
};
var _ZoltanOnody$proof_assistant$Zipper$applyAll = F2(
	function ($function, zipper) {
		var newZipper1 = $function(zipper);
		var newZipper2 = function () {
			var _p53 = _ZoltanOnody$proof_assistant$Zipper$enterSubOrNothing(newZipper1);
			if (_p53.ctor === 'Nothing') {
				return newZipper1;
			} else {
				return _ZoltanOnody$proof_assistant$Zipper$up(
					A2(_ZoltanOnody$proof_assistant$Zipper$applyAll, $function, _p53._0));
			}
		}();
		var newZipper3 = function () {
			var _p54 = _ZoltanOnody$proof_assistant$Zipper$downOrNothing(newZipper2);
			if (_p54.ctor === 'Nothing') {
				return newZipper2;
			} else {
				return _ZoltanOnody$proof_assistant$Zipper$up(
					A2(_ZoltanOnody$proof_assistant$Zipper$applyAll, $function, _p54._0));
			}
		}();
		var newZipper4 = function () {
			var _p55 = _ZoltanOnody$proof_assistant$Zipper$enterCase1OrNothing(newZipper3);
			if (_p55.ctor === 'Nothing') {
				return newZipper3;
			} else {
				return _ZoltanOnody$proof_assistant$Zipper$up(
					A2(_ZoltanOnody$proof_assistant$Zipper$applyAll, $function, _p55._0));
			}
		}();
		var newZipper5 = function () {
			var _p56 = _ZoltanOnody$proof_assistant$Zipper$enterCase2OrNothing(newZipper4);
			if (_p56.ctor === 'Nothing') {
				return newZipper4;
			} else {
				return _ZoltanOnody$proof_assistant$Zipper$up(
					A2(_ZoltanOnody$proof_assistant$Zipper$applyAll, $function, _p56._0));
			}
		}();
		return newZipper5;
	});
var _ZoltanOnody$proof_assistant$Zipper$matchAll = function (zipper) {
	return A2(_ZoltanOnody$proof_assistant$Zipper$applyAll, _ZoltanOnody$proof_assistant$Zipper$match, zipper);
};
var _ZoltanOnody$proof_assistant$Zipper$getMaxValue = F2(
	function ($default, maybeZipper) {
		var _p57 = maybeZipper;
		if (_p57.ctor === 'Nothing') {
			return $default;
		} else {
			var _p59 = _p57._0;
			var val1 = A2(
				_elm_lang$core$Basics$max,
				$default,
				function () {
					var _p58 = _p59.proof;
					if (_p58.ctor === 'FormulaNode') {
						return _p58._1.index;
					} else {
						return A2(_elm_lang$core$Basics$max, _p58._0.index, _p58._2.index);
					}
				}());
			var val2 = A2(
				_ZoltanOnody$proof_assistant$Zipper$getMaxValue,
				val1,
				_ZoltanOnody$proof_assistant$Zipper$downOrNothing(_p59));
			var val3 = A2(
				_ZoltanOnody$proof_assistant$Zipper$getMaxValue,
				val2,
				_ZoltanOnody$proof_assistant$Zipper$enterCase1OrNothing(_p59));
			var val4 = A2(
				_ZoltanOnody$proof_assistant$Zipper$getMaxValue,
				val3,
				_ZoltanOnody$proof_assistant$Zipper$enterCase2OrNothing(_p59));
			var val5 = A2(
				_ZoltanOnody$proof_assistant$Zipper$getMaxValue,
				val4,
				_ZoltanOnody$proof_assistant$Zipper$enterSubOrNothing(_p59));
			return val5;
		}
	});
var _ZoltanOnody$proof_assistant$Zipper$reindex = function (zipper) {
	var _p60 = _elm_lang$core$List$head(zipper.breadcrumbs);
	if (_p60.ctor === 'Nothing') {
		var _p61 = zipper.proof;
		if (_p61.ctor === 'FormulaNode') {
			return _elm_lang$core$Native_Utils.update(
				zipper,
				{
					proof: A3(
						_ZoltanOnody$proof_assistant$Types$FormulaNode,
						_p61._0,
						_elm_lang$core$Native_Utils.update(
							_p61._1,
							{index: 1}),
						_p61._2)
				});
		} else {
			return _elm_lang$core$Native_Utils.update(
				zipper,
				{
					proof: A4(
						_ZoltanOnody$proof_assistant$Types$CasesNode,
						_elm_lang$core$Native_Utils.update(
							_p61._0,
							{index: 1}),
						_p61._1,
						_elm_lang$core$Native_Utils.update(
							_p61._2,
							{index: 2}),
						_p61._3)
				});
		}
	} else {
		var getNewZipper = function (newIndex1) {
			var _p62 = zipper.proof;
			if (_p62.ctor === 'FormulaNode') {
				return _elm_lang$core$Native_Utils.update(
					zipper,
					{
						proof: A3(
							_ZoltanOnody$proof_assistant$Types$FormulaNode,
							_p62._0,
							_elm_lang$core$Native_Utils.update(
								_p62._1,
								{index: newIndex1}),
							_p62._2)
					});
			} else {
				var newIndex2 = A2(
					_ZoltanOnody$proof_assistant$Zipper$getMaxValue,
					newIndex1,
					_ZoltanOnody$proof_assistant$Zipper$enterCase1OrNothing(zipper)) + 1;
				return _elm_lang$core$Native_Utils.update(
					zipper,
					{
						proof: A4(
							_ZoltanOnody$proof_assistant$Types$CasesNode,
							_elm_lang$core$Native_Utils.update(
								_p62._0,
								{index: newIndex1}),
							_p62._1,
							_elm_lang$core$Native_Utils.update(
								_p62._2,
								{index: newIndex2}),
							_p62._3)
					});
			}
		};
		var _p63 = _p60._0;
		switch (_p63.ctor) {
			case 'GoContradiction':
				return getNewZipper(_p63._0.index + 1);
			case 'GoGoalProof':
				return getNewZipper(_p63._0.index + 1);
			case 'GoAddUniversal':
				return getNewZipper(_p63._0.index + 1);
			case 'GoDown':
				return getNewZipper(
					A2(
						_ZoltanOnody$proof_assistant$Zipper$getMaxValue,
						_p63._1.index,
						_ZoltanOnody$proof_assistant$Zipper$enterSubOrNothing(
							_ZoltanOnody$proof_assistant$Zipper$up(zipper))) + 1);
			case 'GoCase1':
				return getNewZipper(_p63._0.index + 1);
			default:
				return getNewZipper(
					A2(
						_ZoltanOnody$proof_assistant$Zipper$getMaxValue,
						_p63._2.index,
						_ZoltanOnody$proof_assistant$Zipper$enterCase1OrNothing(
							_ZoltanOnody$proof_assistant$Zipper$up(zipper))) + 1);
		}
	}
};
var _ZoltanOnody$proof_assistant$Zipper$reindexAll = function (zipper) {
	return A2(_ZoltanOnody$proof_assistant$Zipper$applyAll, _ZoltanOnody$proof_assistant$Zipper$reindex, zipper);
};
var _ZoltanOnody$proof_assistant$Zipper$isEverythingProven = function (zipper) {
	var chck = function (func) {
		var _p64 = func(zipper);
		if (_p64.ctor === 'Nothing') {
			return true;
		} else {
			return _ZoltanOnody$proof_assistant$Zipper$isEverythingProven(_p64._0);
		}
	};
	var children = A2(
		_elm_lang$core$List$map,
		chck,
		{
			ctor: '::',
			_0: _ZoltanOnody$proof_assistant$Zipper$enterSubOrNothing,
			_1: {
				ctor: '::',
				_0: _ZoltanOnody$proof_assistant$Zipper$downOrNothing,
				_1: {
					ctor: '::',
					_0: _ZoltanOnody$proof_assistant$Zipper$enterCase1OrNothing,
					_1: {
						ctor: '::',
						_0: _ZoltanOnody$proof_assistant$Zipper$enterCase2OrNothing,
						_1: {ctor: '[]'}
					}
				}
			}
		});
	var $this = function () {
		var _p65 = zipper.proof;
		if (_p65.ctor === 'FormulaNode') {
			var _p69 = _p65._0;
			var _p66 = A3(
				_ZoltanOnody$proof_assistant$Proof$getStatus,
				_p69,
				_p65._1,
				_ZoltanOnody$proof_assistant$Zipper$getBranchAbove(zipper.breadcrumbs));
			if (_p66.ctor === 'Ok') {
				var _p67 = _p69;
				if (_p67.ctor === 'Generalization') {
					var _p68 = A2(_ZoltanOnody$proof_assistant$Zipper$validateNewFreeVariable, _p67._0, zipper);
					if (_p68.ctor === 'Ok') {
						return true;
					} else {
						return false;
					}
				} else {
					return true;
				}
			} else {
				return false;
			}
		} else {
			var _p70 = A3(_ZoltanOnody$proof_assistant$Zipper$validateCases, _p65._0, _p65._2, zipper);
			if (_p70.ctor === 'Ok') {
				return true;
			} else {
				return false;
			}
		}
	}();
	return A2(
		_elm_lang$core$List$all,
		_elm_lang$core$Basics$identity,
		{ctor: '::', _0: $this, _1: children});
};

var _ZoltanOnody$proof_assistant$History$prev = function (history) {
	var _p0 = history.prev;
	if (_p0.ctor === '[]') {
		return history;
	} else {
		return _elm_lang$core$Native_Utils.update(
			history,
			{
				prev: _p0._1,
				current: _p0._0,
				next: {ctor: '::', _0: history.current, _1: history.next}
			});
	}
};
var _ZoltanOnody$proof_assistant$History$next = function (history) {
	var _p1 = history.next;
	if (_p1.ctor === '[]') {
		return history;
	} else {
		return _elm_lang$core$Native_Utils.update(
			history,
			{
				prev: {ctor: '::', _0: history.current, _1: history.prev},
				current: _p1._0,
				next: _p1._1
			});
	}
};
var _ZoltanOnody$proof_assistant$History$get = function (history) {
	return history.current;
};
var _ZoltanOnody$proof_assistant$History$save = F2(
	function (model, history) {
		return _elm_lang$core$Native_Utils.update(
			history,
			{
				prev: {ctor: '::', _0: history.current, _1: history.prev},
				current: model,
				next: {ctor: '[]'}
			});
	});
var _ZoltanOnody$proof_assistant$History$replace = F2(
	function (model, history) {
		return _elm_lang$core$Native_Utils.update(
			history,
			{current: model});
	});
var _ZoltanOnody$proof_assistant$History$hasPrev = function (history) {
	return !_elm_lang$core$List$isEmpty(history.prev);
};
var _ZoltanOnody$proof_assistant$History$hasNext = function (history) {
	return !_elm_lang$core$List$isEmpty(history.next);
};
var _ZoltanOnody$proof_assistant$History$new = function (model) {
	return {
		current: model,
		prev: {ctor: '[]'},
		next: {ctor: '[]'}
	};
};
var _ZoltanOnody$proof_assistant$History$History = F3(
	function (a, b, c) {
		return {current: a, prev: b, next: c};
	});

var _ZoltanOnody$proof_assistant$Editor$subscriptions = function (model) {
	return _elm_lang$core$Platform_Sub$none;
};
var _ZoltanOnody$proof_assistant$Editor$inptGrp = F4(
	function (maybeValidationStatus, predecessors, data, editCallback) {
		return A2(
			_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$successors,
			{
				ctor: '::',
				_0: A2(
					_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$span,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(
							A2(
								_elm_lang$core$Basics_ops['++'],
								'(',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_elm_lang$core$Basics$toString(data.index),
									')'))),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			},
			A2(
				_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$predecessors,
				predecessors,
				_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$config(
					_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$text(
						A2(
							_elm_lang$core$Basics_ops['++'],
							{
								ctor: '::',
								_0: _rundis$elm_bootstrap$Bootstrap_Form_Input$placeholder('Formula'),
								_1: {
									ctor: '::',
									_0: _rundis$elm_bootstrap$Bootstrap_Form_Input$value(data.text),
									_1: {
										ctor: '::',
										_0: _rundis$elm_bootstrap$Bootstrap_Form_Input$onInput(editCallback),
										_1: {ctor: '[]'}
									}
								}
							},
							function () {
								var _p0 = maybeValidationStatus;
								if (_p0.ctor === 'Just') {
									return {
										ctor: '::',
										_0: _p0._0,
										_1: {ctor: '[]'}
									};
								} else {
									return {ctor: '[]'};
								}
							}())))));
	});
var _ZoltanOnody$proof_assistant$Editor$renderEverythingProven = function (zipper) {
	return _ZoltanOnody$proof_assistant$Zipper$isEverythingProven(zipper) ? A2(
		_rundis$elm_bootstrap$Bootstrap_Alert$simpleSuccess,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('Everything is proven.'),
			_1: {ctor: '[]'}
		}) : A2(
		_rundis$elm_bootstrap$Bootstrap_Alert$simpleDanger,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('Something is not correct yet.'),
			_1: {ctor: '[]'}
		});
};
var _ZoltanOnody$proof_assistant$Editor$setProof = F2(
	function (proof, model) {
		var zipper = {
			proof: proof,
			breadcrumbs: {ctor: '[]'}
		};
		var history = A2(
			_ZoltanOnody$proof_assistant$History$save,
			{zipper: zipper},
			model.history);
		return _elm_lang$core$Native_Utils.update(
			model,
			{history: history});
	});
var _ZoltanOnody$proof_assistant$Editor$getZipper = function (model) {
	return _ZoltanOnody$proof_assistant$Zipper$matchAll(
		_ZoltanOnody$proof_assistant$Zipper$reindexAll(
			_ZoltanOnody$proof_assistant$Zipper$matchAll(
				_ZoltanOnody$proof_assistant$Zipper$reindexAll(
					_ZoltanOnody$proof_assistant$Zipper$root(
						_ZoltanOnody$proof_assistant$History$get(model.history).zipper)))));
};
var _ZoltanOnody$proof_assistant$Editor$getProof = function (model) {
	return _ZoltanOnody$proof_assistant$Editor$getZipper(model).proof;
};
var _ZoltanOnody$proof_assistant$Editor$validationNode = F2(
	function (text, $class) {
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$classList(
					{
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: 'block', _1: true},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: $class, _1: true},
							_1: {ctor: '[]'}
						}
					}),
				_1: {ctor: '[]'}
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(text),
				_1: {ctor: '[]'}
			});
	});
var _ZoltanOnody$proof_assistant$Editor$validNode = function (text) {
	return {
		ctor: '_Tuple2',
		_0: _rundis$elm_bootstrap$Bootstrap_Form_Input$success,
		_1: A2(_ZoltanOnody$proof_assistant$Editor$validationNode, text, 'valid-feedback')
	};
};
var _ZoltanOnody$proof_assistant$Editor$invalidNode = function (text) {
	return {
		ctor: '_Tuple2',
		_0: _rundis$elm_bootstrap$Bootstrap_Form_Input$danger,
		_1: A2(_ZoltanOnody$proof_assistant$Editor$validationNode, text, 'invalid-feedback')
	};
};
var _ZoltanOnody$proof_assistant$Editor$buttonDown = F2(
	function (buttonType, callback) {
		return A2(
			_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$button,
			{
				ctor: '::',
				_0: buttonType,
				_1: {
					ctor: '::',
					_0: _rundis$elm_bootstrap$Bootstrap_Button$onClick(callback),
					_1: {ctor: '[]'}
				}
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text('▼'),
				_1: {ctor: '[]'}
			});
	});
var _ZoltanOnody$proof_assistant$Editor$myButton = F3(
	function (onClick, buttonStyle, text) {
		return A2(
			_rundis$elm_bootstrap$Bootstrap_Button$button,
			{
				ctor: '::',
				_0: _rundis$elm_bootstrap$Bootstrap_Button$attrs(
					{
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('mr-2'),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: _rundis$elm_bootstrap$Bootstrap_Button$onClick(onClick),
					_1: {
						ctor: '::',
						_0: buttonStyle,
						_1: {ctor: '[]'}
					}
				}
			},
			{
				ctor: '::',
				_0: _elm_lang$html$Html$text(text),
				_1: {ctor: '[]'}
			});
	});
var _ZoltanOnody$proof_assistant$Editor$buttonAddHelper = function ($function) {
	return A3(_ZoltanOnody$proof_assistant$Editor$myButton, $function, _rundis$elm_bootstrap$Bootstrap_Button$outlineSuccess, '+ Single');
};
var _ZoltanOnody$proof_assistant$Editor$buttonAddCasesHelper = function ($function) {
	return A3(_ZoltanOnody$proof_assistant$Editor$myButton, $function, _rundis$elm_bootstrap$Bootstrap_Button$outlineInfo, '+ Cases');
};
var _ZoltanOnody$proof_assistant$Editor$emptyNode = _elm_lang$html$Html$text('');
var _ZoltanOnody$proof_assistant$Editor$hr = A2(
	_elm_lang$html$Html$hr,
	{ctor: '[]'},
	{ctor: '[]'});
var _ZoltanOnody$proof_assistant$Editor$update = F2(
	function (msg, model) {
		var changeZipper = F2(
			function (needSave, newZipper) {
				return needSave ? {
					ctor: '_Tuple2',
					_0: A2(
						_ZoltanOnody$proof_assistant$History$save,
						{zipper: newZipper},
						model.history),
					_1: _elm_lang$core$Platform_Cmd$none
				} : {
					ctor: '_Tuple2',
					_0: A2(
						_ZoltanOnody$proof_assistant$History$replace,
						{zipper: newZipper},
						model.history),
					_1: _elm_lang$core$Platform_Cmd$none
				};
			});
		var _p1 = function () {
			var _p2 = msg;
			switch (_p2.ctor) {
				case 'ZipperEdit':
					return A2(
						changeZipper,
						false,
						A3(_ZoltanOnody$proof_assistant$Zipper$editValue, _p2._0, _p2._2, _p2._1));
				case 'ZipperAdd':
					return A2(
						changeZipper,
						true,
						A3(
							_ZoltanOnody$proof_assistant$Zipper$add,
							_p2._0,
							_ZoltanOnody$proof_assistant$Proof$createFormulaStep(''),
							_p2._1));
				case 'ZipperAddCases':
					return A2(
						changeZipper,
						true,
						A2(_ZoltanOnody$proof_assistant$Zipper$addCases, _p2._0, _p2._1));
				case 'ZipperExplanation':
					return A2(
						changeZipper,
						true,
						A2(_ZoltanOnody$proof_assistant$Zipper$changeExplanation, _p2._1, _p2._0));
				case 'ZipperDelete':
					return A2(
						changeZipper,
						true,
						_ZoltanOnody$proof_assistant$Zipper$delete(_p2._0));
				case 'ZipperSetButtonsAppearance':
					return A2(
						changeZipper,
						false,
						A3(_ZoltanOnody$proof_assistant$Zipper$setButtonsAppearance, _p2._0, _p2._2, _p2._1));
				case 'ZipperSetCollpased':
					return A2(
						changeZipper,
						false,
						A3(_ZoltanOnody$proof_assistant$Zipper$setCollapsed, _p2._0, _p2._2, _p2._1));
				case 'ZipperCreateSubFormulaNode':
					return A2(
						changeZipper,
						true,
						_ZoltanOnody$proof_assistant$Zipper$createSubFormulaNode(_p2._0));
				case 'ZipperCreateSubCasesNode':
					return A2(
						changeZipper,
						true,
						_ZoltanOnody$proof_assistant$Zipper$createSubCasesNode(_p2._0));
				case 'ZipperEditGeneralization':
					return A2(
						changeZipper,
						false,
						A2(_ZoltanOnody$proof_assistant$Zipper$editGeneralizationText, _p2._1, _p2._0));
				case 'HistoryBack':
					return {
						ctor: '_Tuple2',
						_0: _ZoltanOnody$proof_assistant$History$prev(model.history),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				default:
					return {
						ctor: '_Tuple2',
						_0: _ZoltanOnody$proof_assistant$History$next(model.history),
						_1: _elm_lang$core$Platform_Cmd$none
					};
			}
		}();
		var newHistory = _p1._0;
		var command = _p1._1;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Native_Utils.update(
				model,
				{history: newHistory}),
			_1: command
		};
	});
var _ZoltanOnody$proof_assistant$Editor$initialModel = {
	history: _ZoltanOnody$proof_assistant$History$new(
		{
			zipper: _ZoltanOnody$proof_assistant$Zipper$create(
				_ZoltanOnody$proof_assistant$Proof$createFormulaStep(''))
		})
};
var _ZoltanOnody$proof_assistant$Editor$OldModel = function (a) {
	return {zipper: a};
};
var _ZoltanOnody$proof_assistant$Editor$Model = function (a) {
	return {history: a};
};
var _ZoltanOnody$proof_assistant$Editor$HistoryForward = {ctor: 'HistoryForward'};
var _ZoltanOnody$proof_assistant$Editor$HistoryBack = {ctor: 'HistoryBack'};
var _ZoltanOnody$proof_assistant$Editor$renderHistoryButtons = function (model) {
	return A2(
		_rundis$elm_bootstrap$Bootstrap_ButtonGroup$buttonGroup,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_rundis$elm_bootstrap$Bootstrap_ButtonGroup$button,
				{
					ctor: '::',
					_0: _rundis$elm_bootstrap$Bootstrap_Button$secondary,
					_1: {
						ctor: '::',
						_0: _rundis$elm_bootstrap$Bootstrap_Button$onClick(_ZoltanOnody$proof_assistant$Editor$HistoryBack),
						_1: {
							ctor: '::',
							_0: _rundis$elm_bootstrap$Bootstrap_Button$disabled(
								!_ZoltanOnody$proof_assistant$History$hasPrev(model.history)),
							_1: {ctor: '[]'}
						}
					}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('⇦ Undo'),
					_1: {ctor: '[]'}
				}),
			_1: {
				ctor: '::',
				_0: A2(
					_rundis$elm_bootstrap$Bootstrap_ButtonGroup$button,
					{
						ctor: '::',
						_0: _rundis$elm_bootstrap$Bootstrap_Button$secondary,
						_1: {
							ctor: '::',
							_0: _rundis$elm_bootstrap$Bootstrap_Button$onClick(_ZoltanOnody$proof_assistant$Editor$HistoryForward),
							_1: {
								ctor: '::',
								_0: _rundis$elm_bootstrap$Bootstrap_Button$disabled(
									!_ZoltanOnody$proof_assistant$History$hasNext(model.history)),
								_1: {ctor: '[]'}
							}
						}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text('Redo ⇨'),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		});
};
var _ZoltanOnody$proof_assistant$Editor$ZipperEditGeneralization = F2(
	function (a, b) {
		return {ctor: 'ZipperEditGeneralization', _0: a, _1: b};
	});
var _ZoltanOnody$proof_assistant$Editor$ZipperCreateSubCasesNode = function (a) {
	return {ctor: 'ZipperCreateSubCasesNode', _0: a};
};
var _ZoltanOnody$proof_assistant$Editor$ZipperCreateSubFormulaNode = function (a) {
	return {ctor: 'ZipperCreateSubFormulaNode', _0: a};
};
var _ZoltanOnody$proof_assistant$Editor$ZipperSetCollpased = F3(
	function (a, b, c) {
		return {ctor: 'ZipperSetCollpased', _0: a, _1: b, _2: c};
	});
var _ZoltanOnody$proof_assistant$Editor$collapseButton = F3(
	function (value, whr, zipper) {
		return value ? A3(
			_ZoltanOnody$proof_assistant$Editor$myButton,
			A3(_ZoltanOnody$proof_assistant$Editor$ZipperSetCollpased, whr, zipper, value),
			_rundis$elm_bootstrap$Bootstrap_Button$outlineInfo,
			'▽') : A3(
			_ZoltanOnody$proof_assistant$Editor$myButton,
			A3(_ZoltanOnody$proof_assistant$Editor$ZipperSetCollpased, whr, zipper, value),
			_rundis$elm_bootstrap$Bootstrap_Button$info,
			'▷');
	});
var _ZoltanOnody$proof_assistant$Editor$ZipperSetButtonsAppearance = F3(
	function (a, b, c) {
		return {ctor: 'ZipperSetButtonsAppearance', _0: a, _1: b, _2: c};
	});
var _ZoltanOnody$proof_assistant$Editor$ZipperDelete = function (a) {
	return {ctor: 'ZipperDelete', _0: a};
};
var _ZoltanOnody$proof_assistant$Editor$buttonDelete = function (zipper) {
	return A3(
		_ZoltanOnody$proof_assistant$Editor$myButton,
		_ZoltanOnody$proof_assistant$Editor$ZipperDelete(zipper),
		_rundis$elm_bootstrap$Bootstrap_Button$outlineDanger,
		'x Delete');
};
var _ZoltanOnody$proof_assistant$Editor$ZipperExplanation = F2(
	function (a, b) {
		return {ctor: 'ZipperExplanation', _0: a, _1: b};
	});
var _ZoltanOnody$proof_assistant$Editor$ZipperAddCases = F2(
	function (a, b) {
		return {ctor: 'ZipperAddCases', _0: a, _1: b};
	});
var _ZoltanOnody$proof_assistant$Editor$ZipperAdd = F2(
	function (a, b) {
		return {ctor: 'ZipperAdd', _0: a, _1: b};
	});
var _ZoltanOnody$proof_assistant$Editor$buttonAdd = function (zipper) {
	return _ZoltanOnody$proof_assistant$Editor$buttonAddHelper(
		A2(_ZoltanOnody$proof_assistant$Editor$ZipperAdd, _ZoltanOnody$proof_assistant$Proof$OnNode, zipper));
};
var _ZoltanOnody$proof_assistant$Editor$buttonsList = F3(
	function (zipper, explanation, includeCasesButton) {
		var casesButton = includeCasesButton ? _ZoltanOnody$proof_assistant$Editor$buttonAddCasesHelper(
			A2(_ZoltanOnody$proof_assistant$Editor$ZipperAddCases, _ZoltanOnody$proof_assistant$Proof$OnNode, zipper)) : _ZoltanOnody$proof_assistant$Editor$emptyNode;
		var radioButton = F3(
			function (isActive, text, explanationType) {
				return A3(
					_rundis$elm_bootstrap$Bootstrap_ButtonGroup$radioButton,
					isActive,
					{
						ctor: '::',
						_0: _rundis$elm_bootstrap$Bootstrap_Button$info,
						_1: {
							ctor: '::',
							_0: _rundis$elm_bootstrap$Bootstrap_Button$onClick(
								A2(_ZoltanOnody$proof_assistant$Editor$ZipperExplanation, zipper, explanationType)),
							_1: {ctor: '[]'}
						}
					},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text(text),
						_1: {ctor: '[]'}
					});
			});
		var _p3 = function () {
			var _p4 = explanation;
			switch (_p4.ctor) {
				case 'Premise':
					return {ctor: '_Tuple5', _0: true, _1: false, _2: false, _3: false, _4: false};
				case 'Goal':
					return {ctor: '_Tuple5', _0: false, _1: true, _2: false, _3: false, _4: false};
				case 'Rule':
					return {ctor: '_Tuple5', _0: false, _1: false, _2: true, _3: false, _4: false};
				case 'Contradiction':
					return {ctor: '_Tuple5', _0: false, _1: false, _2: false, _3: true, _4: false};
				default:
					return {ctor: '_Tuple5', _0: false, _1: false, _2: false, _3: false, _4: true};
			}
		}();
		var isPremise = _p3._0;
		var isGoal = _p3._1;
		var isRule = _p3._2;
		var isContradiction = _p3._3;
		var isAddUniversal = _p3._4;
		var explanationButtons = {
			ctor: '::',
			_0: A2(
				_rundis$elm_bootstrap$Bootstrap_ButtonGroup$radioButtonGroup,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A3(radioButton, isPremise, 'Premise', _ZoltanOnody$proof_assistant$Types$Premise),
					_1: {
						ctor: '::',
						_0: A3(
							radioButton,
							isGoal,
							'Goal',
							_ZoltanOnody$proof_assistant$Types$Goal(_elm_lang$core$Maybe$Nothing)),
						_1: {
							ctor: '::',
							_0: A3(
								radioButton,
								isRule,
								'Consequence',
								_ZoltanOnody$proof_assistant$Types$Rule(_elm_lang$core$Maybe$Nothing)),
							_1: {
								ctor: '::',
								_0: A3(
									radioButton,
									isContradiction,
									'Contradiction',
									_ZoltanOnody$proof_assistant$Types$Contradiction(_elm_lang$core$Maybe$Nothing)),
								_1: {
									ctor: '::',
									_0: A3(
										radioButton,
										isAddUniversal,
										'Generalization',
										A2(
											_ZoltanOnody$proof_assistant$Types$Generalization,
											_ZoltanOnody$proof_assistant$Zipper$generateNewFreeVariable(zipper),
											_elm_lang$core$Maybe$Nothing)),
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}),
			_1: {ctor: '[]'}
		};
		var buttons = A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: _ZoltanOnody$proof_assistant$Editor$buttonAdd(zipper),
				_1: {
					ctor: '::',
					_0: casesButton,
					_1: {
						ctor: '::',
						_0: _ZoltanOnody$proof_assistant$Editor$buttonDelete(zipper),
						_1: {ctor: '[]'}
					}
				}
			},
			explanationButtons);
		return A2(
			_elm_lang$html$Html$div,
			{
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('button-list'),
				_1: {ctor: '[]'}
			},
			buttons);
	});
var _ZoltanOnody$proof_assistant$Editor$ZipperEdit = F3(
	function (a, b, c) {
		return {ctor: 'ZipperEdit', _0: a, _1: b, _2: c};
	});
var _ZoltanOnody$proof_assistant$Editor$renderFormulaNode = F3(
	function (zipper, explanation, formulaStep) {
		var _p5 = function () {
			var _p6 = _ZoltanOnody$proof_assistant$Zipper$downOrNothing(zipper);
			if (_p6.ctor === 'Just') {
				return {
					ctor: '_Tuple2',
					_0: _ZoltanOnody$proof_assistant$Editor$renderStep(_p6._0),
					_1: false
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: {ctor: '[]'},
					_1: true
				};
			}
		}();
		var nextNodes = _p5._0;
		var isLast = _p5._1;
		var _p7 = formulaStep.gui.showButtons ? {
			ctor: '_Tuple2',
			_0: A3(_ZoltanOnody$proof_assistant$Editor$buttonsList, zipper, explanation, isLast),
			_1: _rundis$elm_bootstrap$Bootstrap_Button$info
		} : {ctor: '_Tuple2', _0: _ZoltanOnody$proof_assistant$Editor$emptyNode, _1: _rundis$elm_bootstrap$Bootstrap_Button$outlineInfo};
		var buttons = _p7._0;
		var inputButtonDesign = _p7._1;
		var localCollapseButton = A3(_ZoltanOnody$proof_assistant$Editor$collapseButton, !formulaStep.gui.collapsed, _ZoltanOnody$proof_assistant$Proof$OnNode, zipper);
		var subElements = function (proof) {
			if (!formulaStep.gui.collapsed) {
				var _p8 = proof;
				if (_p8.ctor === 'Just') {
					return _ZoltanOnody$proof_assistant$Editor$renderStep(
						_ZoltanOnody$proof_assistant$Zipper$enterSub(zipper));
				} else {
					return {
						ctor: '::',
						_0: _ZoltanOnody$proof_assistant$Editor$buttonAddHelper(
							_ZoltanOnody$proof_assistant$Editor$ZipperCreateSubFormulaNode(zipper)),
						_1: {
							ctor: '::',
							_0: _ZoltanOnody$proof_assistant$Editor$buttonAddCasesHelper(
								_ZoltanOnody$proof_assistant$Editor$ZipperCreateSubCasesNode(zipper)),
							_1: {ctor: '[]'}
						}
					};
				}
			} else {
				return {ctor: '[]'};
			}
		};
		var editCallback = A2(_ZoltanOnody$proof_assistant$Editor$ZipperEdit, _ZoltanOnody$proof_assistant$Proof$OnNode, zipper);
		var buttonDownLocal = A2(
			_ZoltanOnody$proof_assistant$Editor$buttonDown,
			inputButtonDesign,
			A3(_ZoltanOnody$proof_assistant$Editor$ZipperSetButtonsAppearance, _ZoltanOnody$proof_assistant$Proof$OnNode, zipper, !formulaStep.gui.showButtons));
		var _p9 = function () {
			var _p10 = A3(
				_ZoltanOnody$proof_assistant$Proof$getStatus,
				explanation,
				formulaStep,
				_ZoltanOnody$proof_assistant$Zipper$getBranchAbove(zipper.breadcrumbs));
			if (_p10.ctor === 'Err') {
				return _ZoltanOnody$proof_assistant$Editor$invalidNode(_p10._0);
			} else {
				return _ZoltanOnody$proof_assistant$Editor$validNode(_p10._0);
			}
		}();
		var validationStatus = _p9._0;
		var validationNode = _p9._1;
		var _p11 = function () {
			var _p12 = explanation;
			switch (_p12.ctor) {
				case 'Rule':
					return {
						ctor: '_Tuple2',
						_0: A4(
							_ZoltanOnody$proof_assistant$Editor$inptGrp,
							_elm_lang$core$Maybe$Just(validationStatus),
							{
								ctor: '::',
								_0: buttonDownLocal,
								_1: {ctor: '[]'}
							},
							formulaStep,
							editCallback),
						_1: {ctor: '[]'}
					};
				case 'Premise':
					return {
						ctor: '_Tuple2',
						_0: A4(
							_ZoltanOnody$proof_assistant$Editor$inptGrp,
							_elm_lang$core$Maybe$Just(validationStatus),
							{
								ctor: '::',
								_0: buttonDownLocal,
								_1: {
									ctor: '::',
									_0: A2(
										_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$span,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('Premise:'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							},
							formulaStep,
							editCallback),
						_1: {ctor: '[]'}
					};
				case 'Goal':
					var assumptions = function () {
						var _p13 = _ZoltanOnody$proof_assistant$Proof$getImplicationAntecedent(formulaStep);
						if (_p13.ctor === 'Nothing') {
							return {ctor: '[]'};
						} else {
							return {
								ctor: '::',
								_0: _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$view(
									A2(
										_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$predecessors,
										{
											ctor: '::',
											_0: A2(
												_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$span,
												{ctor: '[]'},
												{
													ctor: '::',
													_0: _elm_lang$html$Html$text('Assumption:'),
													_1: {ctor: '[]'}
												}),
											_1: {ctor: '[]'}
										},
										_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$config(
											_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$text(
												{
													ctor: '::',
													_0: _rundis$elm_bootstrap$Bootstrap_Form_Input$disabled(true),
													_1: {
														ctor: '::',
														_0: _rundis$elm_bootstrap$Bootstrap_Form_Input$value(_p13._0.text),
														_1: {ctor: '[]'}
													}
												})))),
								_1: {
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$hr,
										{ctor: '[]'},
										{ctor: '[]'}),
									_1: {ctor: '[]'}
								}
							};
						}
					}();
					return {
						ctor: '_Tuple2',
						_0: A4(
							_ZoltanOnody$proof_assistant$Editor$inptGrp,
							_elm_lang$core$Maybe$Just(validationStatus),
							{
								ctor: '::',
								_0: buttonDownLocal,
								_1: {
									ctor: '::',
									_0: A2(
										_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$span,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('Goal:'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							},
							formulaStep,
							editCallback),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('inner-style'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$p,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: localCollapseButton,
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('Proof'),
												_1: {ctor: '[]'}
											}
										}),
									_1: A2(
										_elm_lang$core$Basics_ops['++'],
										assumptions,
										subElements(_p12._0))
								}),
							_1: {ctor: '[]'}
						}
					};
				case 'Contradiction':
					var assumptions = {
						ctor: '::',
						_0: _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$view(
							A2(
								_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$predecessors,
								{
									ctor: '::',
									_0: A2(
										_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$span,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('Assumption:'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								},
								_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$config(
									_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$text(
										{
											ctor: '::',
											_0: _rundis$elm_bootstrap$Bootstrap_Form_Input$disabled(true),
											_1: {
												ctor: '::',
												_0: _rundis$elm_bootstrap$Bootstrap_Form_Input$value(
													A2(_elm_lang$core$Basics_ops['++'], '-', formulaStep.text)),
												_1: {ctor: '[]'}
											}
										})))),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$hr,
								{ctor: '[]'},
								{ctor: '[]'}),
							_1: {ctor: '[]'}
						}
					};
					return {
						ctor: '_Tuple2',
						_0: A4(
							_ZoltanOnody$proof_assistant$Editor$inptGrp,
							_elm_lang$core$Maybe$Just(validationStatus),
							{
								ctor: '::',
								_0: buttonDownLocal,
								_1: {ctor: '[]'}
							},
							formulaStep,
							editCallback),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('inner-style'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$p,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: localCollapseButton,
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('Proof'),
												_1: {ctor: '[]'}
											}
										}),
									_1: A2(
										_elm_lang$core$Basics_ops['++'],
										assumptions,
										subElements(_p12._0))
								}),
							_1: {ctor: '[]'}
						}
					};
				default:
					var _p17 = _p12._0;
					var goals = function () {
						var _p14 = A2(_ZoltanOnody$proof_assistant$Proof$getHelpTextAddUniversal, formulaStep.formula, _p17);
						if (_p14.ctor === 'Err') {
							return {ctor: '[]'};
						} else {
							var _p15 = function () {
								var _p16 = A2(_ZoltanOnody$proof_assistant$Zipper$validateNewFreeVariable, _p17, zipper);
								if (_p16.ctor === 'Ok') {
									return {ctor: '_Tuple2', _0: _rundis$elm_bootstrap$Bootstrap_Form_Input$success, _1: _ZoltanOnody$proof_assistant$Editor$emptyNode};
								} else {
									return _ZoltanOnody$proof_assistant$Editor$invalidNode(_p16._0);
								}
							}();
							var validationStatusFree = _p15._0;
							var validationStatusNode = _p15._1;
							return {
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$p,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Take any/arbitrary '),
										_1: {
											ctor: '::',
											_0: _rundis$elm_bootstrap$Bootstrap_Form_Input$text(
												{
													ctor: '::',
													_0: _rundis$elm_bootstrap$Bootstrap_Form_Input$value(_p17),
													_1: {
														ctor: '::',
														_0: validationStatusFree,
														_1: {
															ctor: '::',
															_0: _rundis$elm_bootstrap$Bootstrap_Form_Input$attrs(
																{
																	ctor: '::',
																	_0: _elm_lang$html$Html_Attributes$class('new-free-variable'),
																	_1: {ctor: '[]'}
																}),
															_1: {
																ctor: '::',
																_0: _rundis$elm_bootstrap$Bootstrap_Form_Input$onInput(
																	_ZoltanOnody$proof_assistant$Editor$ZipperEditGeneralization(zipper)),
																_1: {ctor: '[]'}
															}
														}
													}
												}),
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text(' and prove: '),
												_1: {
													ctor: '::',
													_0: validationStatusNode,
													_1: {ctor: '[]'}
												}
											}
										}
									}),
								_1: {
									ctor: '::',
									_0: _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$view(
										A2(
											_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$predecessors,
											{
												ctor: '::',
												_0: A2(
													_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$span,
													{ctor: '[]'},
													{
														ctor: '::',
														_0: _elm_lang$html$Html$text('Goal:'),
														_1: {ctor: '[]'}
													}),
												_1: {ctor: '[]'}
											},
											_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$config(
												_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$text(
													{
														ctor: '::',
														_0: _rundis$elm_bootstrap$Bootstrap_Form_Input$disabled(true),
														_1: {
															ctor: '::',
															_0: _rundis$elm_bootstrap$Bootstrap_Form_Input$value(_p14._0),
															_1: {ctor: '[]'}
														}
													})))),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$hr,
											{ctor: '[]'},
											{ctor: '[]'}),
										_1: {ctor: '[]'}
									}
								}
							};
						}
					}();
					return {
						ctor: '_Tuple2',
						_0: A4(
							_ZoltanOnody$proof_assistant$Editor$inptGrp,
							_elm_lang$core$Maybe$Just(validationStatus),
							{
								ctor: '::',
								_0: buttonDownLocal,
								_1: {
									ctor: '::',
									_0: A2(
										_rundis$elm_bootstrap$Bootstrap_Form_InputGroup$span,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: _elm_lang$html$Html$text('Generalization:'),
											_1: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							},
							formulaStep,
							editCallback),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html$div,
								{
									ctor: '::',
									_0: _elm_lang$html$Html_Attributes$class('inner-style'),
									_1: {ctor: '[]'}
								},
								{
									ctor: '::',
									_0: A2(
										_elm_lang$html$Html$p,
										{ctor: '[]'},
										{
											ctor: '::',
											_0: localCollapseButton,
											_1: {
												ctor: '::',
												_0: _elm_lang$html$Html$text('Proof'),
												_1: {ctor: '[]'}
											}
										}),
									_1: A2(
										_elm_lang$core$Basics_ops['++'],
										goals,
										subElements(_p12._1))
								}),
							_1: {ctor: '[]'}
						}
					};
			}
		}();
		var inputGroup = _p11._0;
		var subProof = _p11._1;
		return {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				{
					ctor: '::',
					_0: A2(
						_rundis$elm_bootstrap$Bootstrap_Form$group,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$view(inputGroup),
							_1: {
								ctor: '::',
								_0: validationNode,
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '::', _0: buttons, _1: subProof}
				}),
			_1: nextNodes
		};
	});
var _ZoltanOnody$proof_assistant$Editor$renderStep = function (zipper) {
	var _p18 = zipper.proof;
	if (_p18.ctor === 'FormulaNode') {
		return A3(_ZoltanOnody$proof_assistant$Editor$renderFormulaNode, zipper, _p18._0, _p18._1);
	} else {
		return A5(_ZoltanOnody$proof_assistant$Editor$renderCases, zipper, _p18._0, _p18._1, _p18._2, _p18._3);
	}
};
var _ZoltanOnody$proof_assistant$Editor$renderCases = F5(
	function (zipper, case1, next1, case2, next2) {
		var _p19 = function () {
			var _p20 = A3(_ZoltanOnody$proof_assistant$Zipper$validateCases, case1, case2, zipper);
			if (_p20.ctor === 'Ok') {
				return _ZoltanOnody$proof_assistant$Editor$validNode(_p20._0);
			} else {
				return _ZoltanOnody$proof_assistant$Editor$invalidNode(_p20._0);
			}
		}();
		var validationNode = _p19._1;
		var renderCase = F6(
			function (selectedCase, next, text, enterCaseFunction, whr, zipper) {
				var localCollapseButton = A3(_ZoltanOnody$proof_assistant$Editor$collapseButton, !selectedCase.gui.collapsed, whr, zipper);
				var editCallback = A2(_ZoltanOnody$proof_assistant$Editor$ZipperEdit, whr, zipper);
				var _p21 = function () {
					var _p22 = _ZoltanOnody$proof_assistant$Proof$tryParseFormula(selectedCase);
					if (_p22.ctor === 'Just') {
						return _ZoltanOnody$proof_assistant$Editor$invalidNode(_p22._0);
					} else {
						return _ZoltanOnody$proof_assistant$Editor$validNode('');
					}
				}();
				var inputType = _p21._0;
				var validationNode = _p21._1;
				var _p23 = function () {
					var _p24 = next;
					if (_p24.ctor === 'Just') {
						return {
							ctor: '_Tuple2',
							_0: _ZoltanOnody$proof_assistant$Editor$emptyNode,
							_1: _ZoltanOnody$proof_assistant$Editor$renderStep(
								enterCaseFunction(zipper))
						};
					} else {
						return {
							ctor: '_Tuple2',
							_0: _ZoltanOnody$proof_assistant$Editor$buttonAddCasesHelper(
								A2(_ZoltanOnody$proof_assistant$Editor$ZipperAddCases, whr, zipper)),
							_1: {ctor: '[]'}
						};
					}
				}();
				var casesButton = _p23._0;
				var subProof = _p23._1;
				var _p25 = selectedCase.gui.showButtons ? {
					ctor: '_Tuple2',
					_0: A2(
						_elm_lang$html$Html$div,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: _ZoltanOnody$proof_assistant$Editor$buttonAddHelper(
								A2(_ZoltanOnody$proof_assistant$Editor$ZipperAdd, whr, zipper)),
							_1: {
								ctor: '::',
								_0: casesButton,
								_1: {ctor: '[]'}
							}
						}),
					_1: _rundis$elm_bootstrap$Bootstrap_Button$info
				} : {ctor: '_Tuple2', _0: _ZoltanOnody$proof_assistant$Editor$emptyNode, _1: _rundis$elm_bootstrap$Bootstrap_Button$outlineInfo};
				var buttons = _p25._0;
				var inputButtonDesign = _p25._1;
				var downButton = A2(
					_ZoltanOnody$proof_assistant$Editor$buttonDown,
					inputButtonDesign,
					A3(_ZoltanOnody$proof_assistant$Editor$ZipperSetButtonsAppearance, whr, zipper, !selectedCase.gui.showButtons));
				return selectedCase.gui.collapsed ? {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$p,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: localCollapseButton,
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text(text),
								_1: {ctor: '[]'}
							}
						}),
					_1: {ctor: '[]'}
				} : {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$p,
						{ctor: '[]'},
						{
							ctor: '::',
							_0: localCollapseButton,
							_1: {
								ctor: '::',
								_0: _elm_lang$html$Html$text(text),
								_1: {ctor: '[]'}
							}
						}),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: A2(
									_rundis$elm_bootstrap$Bootstrap_Form$group,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: _rundis$elm_bootstrap$Bootstrap_Form_InputGroup$view(
											A4(
												_ZoltanOnody$proof_assistant$Editor$inptGrp,
												_elm_lang$core$Maybe$Just(inputType),
												{
													ctor: '::',
													_0: downButton,
													_1: {ctor: '[]'}
												},
												selectedCase,
												editCallback)),
										_1: {
											ctor: '::',
											_0: validationNode,
											_1: {
												ctor: '::',
												_0: buttons,
												_1: {ctor: '[]'}
											}
										}
									}),
								_1: {ctor: '[]'}
							}),
						_1: subProof
					}
				};
			});
		return {
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$p,
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('text-right'),
					_1: {ctor: '[]'}
				},
				{
					ctor: '::',
					_0: _elm_lang$html$Html$text('Delete the 2 cases bellow'),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$span,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('ml-2'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _ZoltanOnody$proof_assistant$Editor$buttonDelete(zipper),
								_1: {ctor: '[]'}
							}),
						_1: {ctor: '[]'}
					}
				}),
			_1: {
				ctor: '::',
				_0: validationNode,
				_1: {
					ctor: '::',
					_0: A2(
						_elm_lang$html$Html$div,
						{
							ctor: '::',
							_0: _elm_lang$html$Html_Attributes$class('inner-style'),
							_1: {ctor: '[]'}
						},
						A6(renderCase, case1, next1, 'Case 1', _ZoltanOnody$proof_assistant$Zipper$enterCase1, _ZoltanOnody$proof_assistant$Proof$OnCase1, zipper)),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$div,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$class('inner-style'),
								_1: {ctor: '[]'}
							},
							A6(renderCase, case2, next2, 'Case 2', _ZoltanOnody$proof_assistant$Zipper$enterCase2, _ZoltanOnody$proof_assistant$Proof$OnCase2, zipper)),
						_1: {ctor: '[]'}
					}
				}
			}
		};
	});
var _ZoltanOnody$proof_assistant$Editor$renderProof = function (zipper) {
	return A2(
		_rundis$elm_bootstrap$Bootstrap_Form$form,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: A2(
				_elm_lang$html$Html$div,
				{ctor: '[]'},
				_ZoltanOnody$proof_assistant$Editor$renderStep(zipper)),
			_1: {ctor: '[]'}
		});
};
var _ZoltanOnody$proof_assistant$Editor$render = function (model) {
	var zipper = _ZoltanOnody$proof_assistant$Editor$getZipper(model);
	var _p26 = A2(_elm_lang$core$Debug$log, 'MODEL:', zipper);
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _ZoltanOnody$proof_assistant$Editor$renderEverythingProven(zipper),
			_1: {
				ctor: '::',
				_0: A2(
					_elm_lang$html$Html$hr,
					{ctor: '[]'},
					{ctor: '[]'}),
				_1: {
					ctor: '::',
					_0: _ZoltanOnody$proof_assistant$Editor$renderProof(zipper),
					_1: {ctor: '[]'}
				}
			}
		});
};

var _rundis$elm_bootstrap$Bootstrap_CDN$fontAwesome = A3(
	_elm_lang$html$Html$node,
	'link',
	{
		ctor: '::',
		_0: _elm_lang$html$Html_Attributes$rel('stylesheet'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$href('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'),
			_1: {ctor: '[]'}
		}
	},
	{ctor: '[]'});
var _rundis$elm_bootstrap$Bootstrap_CDN$stylesheet = A3(
	_elm_lang$html$Html$node,
	'link',
	{
		ctor: '::',
		_0: _elm_lang$html$Html_Attributes$rel('stylesheet'),
		_1: {
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$href('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'),
			_1: {ctor: '[]'}
		}
	},
	{ctor: '[]'});

var _elm_lang$html$Html_Keyed$node = _elm_lang$virtual_dom$VirtualDom$keyedNode;
var _elm_lang$html$Html_Keyed$ol = _elm_lang$html$Html_Keyed$node('ol');
var _elm_lang$html$Html_Keyed$ul = _elm_lang$html$Html_Keyed$node('ul');

var _rundis$elm_bootstrap$Bootstrap_Grid$renderCol = function (column) {
	var _p0 = column;
	switch (_p0.ctor) {
		case 'Column':
			return A2(
				_elm_lang$html$Html$div,
				_rundis$elm_bootstrap$Bootstrap_Grid_Internal$colAttributes(_p0._0.options),
				_p0._0.children);
		case 'ColBreak':
			return _p0._0;
		default:
			return A3(
				_elm_lang$html$Html_Keyed$node,
				'div',
				_rundis$elm_bootstrap$Bootstrap_Grid_Internal$colAttributes(_p0._0.options),
				_p0._0.children);
	}
};
var _rundis$elm_bootstrap$Bootstrap_Grid$keyedRow = F2(
	function (options, keyedCols) {
		return A3(
			_elm_lang$html$Html_Keyed$node,
			'div',
			_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowAttributes(options),
			A2(
				_elm_lang$core$List$map,
				function (_p1) {
					var _p2 = _p1;
					return {
						ctor: '_Tuple2',
						_0: _p2._0,
						_1: _rundis$elm_bootstrap$Bootstrap_Grid$renderCol(_p2._1)
					};
				},
				keyedCols));
	});
var _rundis$elm_bootstrap$Bootstrap_Grid$row = F2(
	function (options, cols) {
		return A2(
			_elm_lang$html$Html$div,
			_rundis$elm_bootstrap$Bootstrap_Grid_Internal$rowAttributes(options),
			A2(_elm_lang$core$List$map, _rundis$elm_bootstrap$Bootstrap_Grid$renderCol, cols));
	});
var _rundis$elm_bootstrap$Bootstrap_Grid$simpleRow = function (cols) {
	return A2(
		_rundis$elm_bootstrap$Bootstrap_Grid$row,
		{ctor: '[]'},
		cols);
};
var _rundis$elm_bootstrap$Bootstrap_Grid$containerFluid = F2(
	function (attributes, children) {
		return A2(
			_elm_lang$html$Html$div,
			A2(
				_elm_lang$core$Basics_ops['++'],
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('container-fluid'),
					_1: {ctor: '[]'}
				},
				attributes),
			children);
	});
var _rundis$elm_bootstrap$Bootstrap_Grid$container = F2(
	function (attributes, children) {
		return A2(
			_elm_lang$html$Html$div,
			A2(
				_elm_lang$core$Basics_ops['++'],
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('container'),
					_1: {ctor: '[]'}
				},
				attributes),
			children);
	});
var _rundis$elm_bootstrap$Bootstrap_Grid$KeyedColumn = function (a) {
	return {ctor: 'KeyedColumn', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Grid$keyedCol = F2(
	function (options, children) {
		return _rundis$elm_bootstrap$Bootstrap_Grid$KeyedColumn(
			{options: options, children: children});
	});
var _rundis$elm_bootstrap$Bootstrap_Grid$ColBreak = function (a) {
	return {ctor: 'ColBreak', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Grid$colBreak = function (attributes) {
	return _rundis$elm_bootstrap$Bootstrap_Grid$ColBreak(
		A2(
			_elm_lang$html$Html$div,
			A2(
				_elm_lang$core$Basics_ops['++'],
				{
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('w-100'),
					_1: {ctor: '[]'}
				},
				attributes),
			{ctor: '[]'}));
};
var _rundis$elm_bootstrap$Bootstrap_Grid$Column = function (a) {
	return {ctor: 'Column', _0: a};
};
var _rundis$elm_bootstrap$Bootstrap_Grid$col = F2(
	function (options, children) {
		return _rundis$elm_bootstrap$Bootstrap_Grid$Column(
			{options: options, children: children});
	});

var _ZoltanOnody$proof_assistant$Main$loadButtonId = 'HEEY-ZOLI';
var _ZoltanOnody$proof_assistant$Main$initialModel = {editor: _ZoltanOnody$proof_assistant$Editor$initialModel, userGuide: _rundis$elm_bootstrap$Bootstrap_Alert$shown};
var _ZoltanOnody$proof_assistant$Main$Model = F2(
	function (a, b) {
		return {editor: a, userGuide: b};
	});
var _ZoltanOnody$proof_assistant$Main$UserGuideVisibility = function (a) {
	return {ctor: 'UserGuideVisibility', _0: a};
};
var _ZoltanOnody$proof_assistant$Main$userGuide = function (visibility) {
	return A2(
		_rundis$elm_bootstrap$Bootstrap_Alert$view,
		visibility,
		A2(
			_rundis$elm_bootstrap$Bootstrap_Alert$children,
			{
				ctor: '::',
				_0: A2(
					_rundis$elm_bootstrap$Bootstrap_Alert$h4,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: _elm_lang$html$Html$text('User guide'),
						_1: {ctor: '[]'}
					}),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html$text('An introductory user guide with examples is available at '),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_lang$html$Html$a,
							{
								ctor: '::',
								_0: _elm_lang$html$Html_Attributes$href('https://github.com/FMFI-UK-1-AIN-412/proof-assistant/blob/master/docs/USER_GUIDE.md'),
								_1: {ctor: '[]'}
							},
							{
								ctor: '::',
								_0: _elm_lang$html$Html$text('GitHub'),
								_1: {ctor: '[]'}
							}),
						_1: {
							ctor: '::',
							_0: _elm_lang$html$Html$text('.'),
							_1: {ctor: '[]'}
						}
					}
				}
			},
			A2(
				_rundis$elm_bootstrap$Bootstrap_Alert$dismissable,
				_ZoltanOnody$proof_assistant$Main$UserGuideVisibility,
				_rundis$elm_bootstrap$Bootstrap_Alert$info(_rundis$elm_bootstrap$Bootstrap_Alert$config))));
};
var _ZoltanOnody$proof_assistant$Main$LoadFromJson = function (a) {
	return {ctor: 'LoadFromJson', _0: a};
};
var _ZoltanOnody$proof_assistant$Main$JsonSelected = {ctor: 'JsonSelected'};
var _ZoltanOnody$proof_assistant$Main$saveLoadButtons = function (model) {
	var loadStateButton = A2(
		_elm_lang$html$Html$input,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$type_('file'),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$id(_ZoltanOnody$proof_assistant$Main$loadButtonId),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$accept('application/json'),
					_1: {
						ctor: '::',
						_0: _elm_lang$html$Html_Attributes$class('inputfile'),
						_1: {
							ctor: '::',
							_0: A2(
								_elm_lang$html$Html_Events$on,
								'change',
								_elm_lang$core$Json_Decode$succeed(_ZoltanOnody$proof_assistant$Main$JsonSelected)),
							_1: {ctor: '[]'}
						}
					}
				}
			}
		},
		{ctor: '[]'});
	var loadStateLabel = A2(
		_elm_lang$html$Html$label,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$for(_ZoltanOnody$proof_assistant$Main$loadButtonId),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$class('btn btn-primary'),
				_1: {ctor: '[]'}
			}
		},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('Import'),
			_1: {ctor: '[]'}
		});
	var proof = _ZoltanOnody$proof_assistant$Editor$getProof(model);
	var saveStateButton = A2(
		_elm_lang$html$Html$a,
		{
			ctor: '::',
			_0: _elm_lang$html$Html_Attributes$href(
				_ZoltanOnody$proof_assistant$Exporting_Json_Encode$jsonDataUri(
					A2(_ZoltanOnody$proof_assistant$Exporting_Json_Encode$encode, 4, proof))),
			_1: {
				ctor: '::',
				_0: _elm_lang$html$Html_Attributes$downloadAs('data.json'),
				_1: {
					ctor: '::',
					_0: _elm_lang$html$Html_Attributes$class('btn btn-primary'),
					_1: {ctor: '[]'}
				}
			}
		},
		{
			ctor: '::',
			_0: _elm_lang$html$Html$text('Save'),
			_1: {ctor: '[]'}
		});
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: saveStateButton,
			_1: {
				ctor: '::',
				_0: loadStateButton,
				_1: {
					ctor: '::',
					_0: loadStateLabel,
					_1: {ctor: '[]'}
				}
			}
		});
};
var _ZoltanOnody$proof_assistant$Main$EditorMsg = function (a) {
	return {ctor: 'EditorMsg', _0: a};
};
var _ZoltanOnody$proof_assistant$Main$view = function (model) {
	return A2(
		_rundis$elm_bootstrap$Bootstrap_Grid$container,
		{ctor: '[]'},
		{
			ctor: '::',
			_0: _rundis$elm_bootstrap$Bootstrap_CDN$stylesheet,
			_1: {
				ctor: '::',
				_0: A2(
					_rundis$elm_bootstrap$Bootstrap_Grid$row,
					{ctor: '[]'},
					{
						ctor: '::',
						_0: A2(
							_rundis$elm_bootstrap$Bootstrap_Grid$col,
							{ctor: '[]'},
							{
								ctor: '::',
								_0: A2(
									_elm_lang$html$Html$h1,
									{ctor: '[]'},
									{
										ctor: '::',
										_0: _elm_lang$html$Html$text('Proof assistant'),
										_1: {ctor: '[]'}
									}),
								_1: {
									ctor: '::',
									_0: _ZoltanOnody$proof_assistant$Main$userGuide(model.userGuide),
									_1: {
										ctor: '::',
										_0: A2(
											_elm_lang$html$Html$hr,
											{ctor: '[]'},
											{ctor: '[]'}),
										_1: {
											ctor: '::',
											_0: A2(
												_rundis$elm_bootstrap$Bootstrap_Grid$row,
												{ctor: '[]'},
												{
													ctor: '::',
													_0: A2(
														_rundis$elm_bootstrap$Bootstrap_Grid$col,
														{
															ctor: '::',
															_0: _rundis$elm_bootstrap$Bootstrap_Grid_Col$sm6,
															_1: {ctor: '[]'}
														},
														{
															ctor: '::',
															_0: _ZoltanOnody$proof_assistant$Main$saveLoadButtons(model.editor),
															_1: {ctor: '[]'}
														}),
													_1: {
														ctor: '::',
														_0: A2(
															_rundis$elm_bootstrap$Bootstrap_Grid$col,
															{
																ctor: '::',
																_0: _rundis$elm_bootstrap$Bootstrap_Grid_Col$sm6,
																_1: {ctor: '[]'}
															},
															{
																ctor: '::',
																_0: A2(
																	_elm_lang$html$Html$div,
																	{
																		ctor: '::',
																		_0: _elm_lang$html$Html_Attributes$class('float-right'),
																		_1: {ctor: '[]'}
																	},
																	{
																		ctor: '::',
																		_0: A2(
																			_elm_lang$html$Html$map,
																			_ZoltanOnody$proof_assistant$Main$EditorMsg,
																			_ZoltanOnody$proof_assistant$Editor$renderHistoryButtons(model.editor)),
																		_1: {ctor: '[]'}
																	}),
																_1: {ctor: '[]'}
															}),
														_1: {ctor: '[]'}
													}
												}),
											_1: {
												ctor: '::',
												_0: A2(
													_elm_lang$html$Html$hr,
													{ctor: '[]'},
													{ctor: '[]'}),
												_1: {
													ctor: '::',
													_0: A2(
														_elm_lang$html$Html$map,
														_ZoltanOnody$proof_assistant$Main$EditorMsg,
														_ZoltanOnody$proof_assistant$Editor$render(model.editor)),
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}),
						_1: {ctor: '[]'}
					}),
				_1: {ctor: '[]'}
			}
		});
};
var _ZoltanOnody$proof_assistant$Main$update = F2(
	function (msg, model) {
		var _p0 = msg;
		switch (_p0.ctor) {
			case 'EditorMsg':
				var _p1 = A2(_ZoltanOnody$proof_assistant$Editor$update, _p0._0, model.editor);
				var editor = _p1._0;
				var command = _p1._1;
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{editor: editor}),
					_1: A2(_elm_lang$core$Platform_Cmd$map, _ZoltanOnody$proof_assistant$Main$EditorMsg, command)
				};
			case 'JsonSelected':
				return {
					ctor: '_Tuple2',
					_0: model,
					_1: _ZoltanOnody$proof_assistant$Exporting_Ports$fileSelected(_ZoltanOnody$proof_assistant$Main$loadButtonId)
				};
			case 'LoadFromJson':
				var _p2 = _ZoltanOnody$proof_assistant$Exporting_Json_Decode$decode(_p0._0);
				if (_p2.ctor === 'Ok') {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Native_Utils.update(
							model,
							{
								editor: A2(_ZoltanOnody$proof_assistant$Editor$setProof, _p2._0, model.editor)
							}),
						_1: _elm_lang$core$Platform_Cmd$none
					};
				} else {
					return A2(
						_elm_lang$core$Debug$log,
						_elm_lang$core$Basics$toString(_p2._0),
						{ctor: '_Tuple2', _0: model, _1: _elm_lang$core$Platform_Cmd$none});
				}
			default:
				return {
					ctor: '_Tuple2',
					_0: _elm_lang$core$Native_Utils.update(
						model,
						{userGuide: _p0._0}),
					_1: _elm_lang$core$Platform_Cmd$none
				};
		}
	});
var _ZoltanOnody$proof_assistant$Main$subscriptions = function (model) {
	return _elm_lang$core$Platform_Sub$batch(
		{
			ctor: '::',
			_0: A2(
				_elm_lang$core$Platform_Sub$map,
				_ZoltanOnody$proof_assistant$Main$EditorMsg,
				_ZoltanOnody$proof_assistant$Editor$subscriptions(model.editor)),
			_1: {
				ctor: '::',
				_0: _ZoltanOnody$proof_assistant$Exporting_Ports$fileContentRead(_ZoltanOnody$proof_assistant$Main$LoadFromJson),
				_1: {ctor: '[]'}
			}
		});
};
var _ZoltanOnody$proof_assistant$Main$main = _elm_lang$html$Html$program(
	{
		view: _ZoltanOnody$proof_assistant$Main$view,
		update: _ZoltanOnody$proof_assistant$Main$update,
		init: {ctor: '_Tuple2', _0: _ZoltanOnody$proof_assistant$Main$initialModel, _1: _elm_lang$core$Platform_Cmd$none},
		subscriptions: _ZoltanOnody$proof_assistant$Main$subscriptions
	})();

var Elm = {};
Elm['Core'] = Elm['Core'] || {};
Elm['Core']['Matcher'] = Elm['Core']['Matcher'] || {};
if (typeof _ZoltanOnody$proof_assistant$Core_Matcher$main !== 'undefined') {
    _ZoltanOnody$proof_assistant$Core_Matcher$main(Elm['Core']['Matcher'], 'Core.Matcher', undefined);
}
Elm['Editor'] = Elm['Editor'] || {};
if (typeof _ZoltanOnody$proof_assistant$Editor$main !== 'undefined') {
    _ZoltanOnody$proof_assistant$Editor$main(Elm['Editor'], 'Editor', undefined);
}
Elm['Exporting'] = Elm['Exporting'] || {};
Elm['Exporting']['Json'] = Elm['Exporting']['Json'] || {};
Elm['Exporting']['Json']['Decode'] = Elm['Exporting']['Json']['Decode'] || {};
if (typeof _ZoltanOnody$proof_assistant$Exporting_Json_Decode$main !== 'undefined') {
    _ZoltanOnody$proof_assistant$Exporting_Json_Decode$main(Elm['Exporting']['Json']['Decode'], 'Exporting.Json.Decode', undefined);
}
Elm['Exporting'] = Elm['Exporting'] || {};
Elm['Exporting']['Json'] = Elm['Exporting']['Json'] || {};
Elm['Exporting']['Json']['Encode'] = Elm['Exporting']['Json']['Encode'] || {};
if (typeof _ZoltanOnody$proof_assistant$Exporting_Json_Encode$main !== 'undefined') {
    _ZoltanOnody$proof_assistant$Exporting_Json_Encode$main(Elm['Exporting']['Json']['Encode'], 'Exporting.Json.Encode', undefined);
}
Elm['Exporting'] = Elm['Exporting'] || {};
Elm['Exporting']['Ports'] = Elm['Exporting']['Ports'] || {};
if (typeof _ZoltanOnody$proof_assistant$Exporting_Ports$main !== 'undefined') {
    _ZoltanOnody$proof_assistant$Exporting_Ports$main(Elm['Exporting']['Ports'], 'Exporting.Ports', undefined);
}
Elm['History'] = Elm['History'] || {};
if (typeof _ZoltanOnody$proof_assistant$History$main !== 'undefined') {
    _ZoltanOnody$proof_assistant$History$main(Elm['History'], 'History', undefined);
}
Elm['Main'] = Elm['Main'] || {};
if (typeof _ZoltanOnody$proof_assistant$Main$main !== 'undefined') {
    _ZoltanOnody$proof_assistant$Main$main(Elm['Main'], 'Main', undefined);
}
Elm['Proof'] = Elm['Proof'] || {};
if (typeof _ZoltanOnody$proof_assistant$Proof$main !== 'undefined') {
    _ZoltanOnody$proof_assistant$Proof$main(Elm['Proof'], 'Proof', undefined);
}
Elm['Types'] = Elm['Types'] || {};
if (typeof _ZoltanOnody$proof_assistant$Types$main !== 'undefined') {
    _ZoltanOnody$proof_assistant$Types$main(Elm['Types'], 'Types', undefined);
}
Elm['Validator'] = Elm['Validator'] || {};
if (typeof _ZoltanOnody$proof_assistant$Validator$main !== 'undefined') {
    _ZoltanOnody$proof_assistant$Validator$main(Elm['Validator'], 'Validator', undefined);
}
Elm['Zipper'] = Elm['Zipper'] || {};
if (typeof _ZoltanOnody$proof_assistant$Zipper$main !== 'undefined') {
    _ZoltanOnody$proof_assistant$Zipper$main(Elm['Zipper'], 'Zipper', undefined);
}

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

