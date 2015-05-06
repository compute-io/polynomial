'use strict';

// MODULES //

var isNumber = require( 'validate.io-number-primitive' ),
	isArray = require( 'validate.io-array' ),
	isNumberArray = require( 'validate.io-number-primitive-array' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' );


// POLYVAL //

/**
* FUNCTION: polyval( coef, x )
*	Evaluates a polynomial.
*
* @private
* @param {Number[]} coef - array of coefficients sorted in descending degree
* @param {Number} x - value at which to evaluate the polynomial
* @return {Number} evaluated polynomial
*/
function polyval( c, x ) {
	var len = c.length,
		p = 0,
		i = 0;
	for ( ; i < len; i++ ) {
		p = p*x + c[ i ];
	}
	return p;
} // end FUNCTION polyval()


// EVALUATE //

/**
* FUNCTION: evaluate( coef, x[, options] )
*	Evaluates a polynomial.
*
* @param {Number[]} coef - array of coefficients sorted in descending degree
* @param {Array|Number[]|Number} x - value(s) at which to evaluate the polynomial
* @param {Object} [options] - function options
* @param {Boolean} [options.copy=true] - boolean indicating whether to return a new array
* @param {Function} [options.accessor] - accessor function for accessing array values
* @returns {Number|Number[]} evaluated polynomial
*/
function evaluate( c, x, opts ) {
	var copy = true,
		clbk,
		len,
		arr,
		v, i;
	if ( !isNumberArray( c ) ) {
		throw new TypeError( 'polynomial()::invalid input argument. Coefficients must be provided as an array of number primitives. Value: `' + c + '`.' );
	}
	if ( isNumber( x ) ) {
		return polyval( c, x );
	}
	if ( !isArray( x ) ) {
		throw new TypeError( 'polynomial()::invalid input argument. Second argument must be either a single number primitive or an array of values. Value: `' + x + '`.' );
	}
	if ( arguments.length > 2 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'polynomial()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'copy' ) ) {
			copy = opts.copy;
			if ( !isBoolean( copy ) ) {
				throw new TypeError( 'polynomial()::invalid option. Copy option must be a boolean primitive. Option: `' + copy + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'accessor' ) ) {
			clbk = opts.accessor;
			if ( !isFunction( clbk ) ) {
				throw new TypeError( 'polynomial()::invalid option. Accessor must be a function. Option: `' + clbk + '`.' );
			}
		}
	}
	len = x.length;
	if ( copy ) {
		arr = new Array( len );
	} else {
		arr = x;
	}
	if ( clbk ) {
		for ( i = 0; i < len; i++ ) {
			v = clbk( x[ i ], i );
			if ( !isNumber( v ) ) {
				throw new TypeError( 'polynomial()::invalid input argument. Accessed array values must be number primitives. Value: `' + v + '`.' );
			}
			arr[ i ] = polyval( c, v );
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			v = x[ i ];
			if ( !isNumber( v ) ) {
				throw new TypeError( 'polynomial()::invalid input argument. Array values must be number primitives. Value: `' + v + '`.' );
			}
			arr[ i ] = polyval( c, v );
		}
	}
	return arr;
} // end FUNCTION evaluate()


// EXPORTS //

module.exports = evaluate;
