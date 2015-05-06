polynomial
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Evaluates a polynomial.


## Installation

``` bash
$ npm install compute-polynomial
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var polyval = require( 'compute-polynomial' );
```


#### polyval( coef, x[, options] )

Evaluates a polynomial whose coefficients are defined by `coef`. `x` may be either a single `numeric` value or an `array` of values at which to evaluate to the polynomial.

The coefficients should be ordered in __descending__ degree. For example, for a polynomial

```
a_nx^n + a_(n-1)x^(n-1) + ... + a_1x^1 + a_0x^0
```

the coefficients would be

```
[a_n, a_(n-1),..., a_1, a_0]
```

Consider the polynomial `4x^3 + 2x^2 + 6x - 17`. To evaluate the polynomial at a single value,

``` javascript
var val = polyval( [ 4, 2, 6, -17 ], 10 );
// returns 4243
```

To evaluate the polynomial at multiple values,

``` javascript
var vals = polyval( [ 4, 2, 6, -17 ], [ 10, -3 ] );
// returns [ 4243, -125 ]
```

When provided an input `array`, the function accepts the following `options`:

*	__copy__: `boolean` indicating whether to return a new `array`. Default: `true`.
*	__accessor__: accessor `function` for accessing numeric values in object `arrays`.

To mutate the input `array` (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var coefs = [ 4, 2, 6, -17 ],
	x = [ 10, -3 ];

var vals = polyval( coefs, x, {
	'copy': false
});
// returns [ 4243, -125 ]

console.log( x === vals );
// returns true
```

For object `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var coefs = [ 4, 2, 6, -17 ];

var data = [
	['beep', 10],
	['boop', -3]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var vals = polyval( coefs, data, {
	'accessor': getValue
});
// returns [ 4243, -125 ]
```



## Examples

``` javascript
var polyval = require( 'compute-polynomial' );

var coef = new Array( 25 ),
	sign;

for ( var i = 0; i < coef.length; i++ ) {
	sign = 1;
	if ( Math.random()-0.5 < 0 ) {
		sign = -1;
	}
	coef[ i ] = sign * Math.round( Math.random()*i );
}

// Evaluate the polynomial at a single value:
console.log( polyval( coef, 10 ) );

// Evaluate the polynomial at multiple values:
console.log( polyval( coef, [ 10, -10 ] ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

This method implements [Horner's rule](http://en.wikipedia.org/wiki/Horner's_method) to achieve efficient computation.


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2014-2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-polynomial.svg
[npm-url]: https://npmjs.org/package/compute-polynomial

[travis-image]: http://img.shields.io/travis/compute-io/polynomial/master.svg
[travis-url]: https://travis-ci.org/compute-io/polynomial

[coveralls-image]: https://img.shields.io/coveralls/compute-io/polynomial/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/polynomial?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/polynomial.svg
[dependencies-url]: https://david-dm.org/compute-io/polynomial

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/polynomial.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/polynomial

[github-issues-image]: http://img.shields.io/github/issues/compute-io/polynomial.svg
[github-issues-url]: https://github.com/compute-io/polynomial/issues
