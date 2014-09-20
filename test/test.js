
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	polyval = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-polynomial', function tests() {
	'use strict';

	it( 'should export a function', function test() {
		expect( polyval ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an array of coefficients', function test() {
		var values = [
				5,
				'5',
				true,
				NaN,
				null,
				undefined,
				{},
				function(){}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				polyval( value, 10 );
			};
		}
	});

	it( 'should throw an error if not provided a numeric value or array of numeric values', function test() {
		var values = [
				[ 5, NaN ],
				'5',
				true,
				NaN,
				null,
				undefined,
				{},
				function(){}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				polyval( [ 2, 4 ], value );
			};
		}
	});

	it( 'should evaluate a polynomial for a single value', function test() {
		var coef = [ 6, -4, 7, -19 ];
		assert.strictEqual( polyval( coef, 3 ), 128 );
	});



	it( 'should evaluate a polynomial for an array of values', function test() {
		var coef = [ 6, -4, 7, -19 ];
		assert.deepEqual( polyval( coef, [ 3, 3 ] ), [ 128, 128 ] );
	});

});