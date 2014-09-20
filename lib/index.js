/**
*
*	COMPUTE: polynomial
*
*
*	DESCRIPTION:
*		- Evaluates a polynomial.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	/**
	* FUNCTION: polyval( coef, x )
	*	Evaluates a polynomial.
	*
	* @private
	* @param {Array} coef - array of coefficients sorted in descending degree
	* @param {Number} x - value at which to evaluate the polynomial
	* @return {Number} evaluated polynomial
	*/
	function polyval( c, x ) {
		var len = c.length,
			p = 0;

		// NaN check:
		if ( x !== x ) {
			throw new TypeError( 'polynomial()::invalid input argument. Value must be numeric.' );
		}

		for ( var i = 0; i < len; i++ ) {
			p = p*x + c[ i ];
		}
		return p;
	} // end FUNCTION polyval()


	// EXPORTS //

	/**
	* FUNCTION: polyval( coef, x )
	*	Evaluates a polynomial.
	*
	* @param {Array} coef - array of coefficients sorted in descending degree
	* @param {Array|Number} x - value(s) at which to evaluate the polynomial
	* @returns {Number|Array} evaluated polynomial
	*/
	module.exports = function( c, x ) {
		if ( !Array.isArray( c ) ) {
			throw new TypeError( 'polynomial()::invalid input argument. Coefficients must be an array.' );
		}
		if ( typeof x === 'number' ) {
			return polyval( c, x );
		}
		if ( !Array.isArray( x ) ) {
			throw new TypeError( 'polynomial()::invalid input argument. Second argument must be either an array of numeric values or a single numeric value.' );
		}
		var len = x.length,
			arr = new Array( len );

		for ( var i = 0; i < len; i++ ) {
			arr[ i ] = polyval( c, x[ i ] );
		}
		return arr;
	};

})();