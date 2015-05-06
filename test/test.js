/* global require, describe, it */
'use strict';

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

	it( 'should export a function', function test() {
		expect( polyval ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a numeric array of coefficients', function test() {
		var values = [
			5,
			'5',
			true,
			NaN,
			null,
			undefined,
			{},
			function(){},
			[1,'2',3],
			[1,NaN,3],
			[1,null,3]
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

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				polyval( [1,2,3], [10], value );
			};
		}
	});

	it( 'should throw an error if provided a copy option which is not a boolean primitive', function test() {
		var values = [
			'5',
			5,
			new Boolean( true ),
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				polyval( [1,2,3], [10], {
					'copy': value
				});
			};
		}
	});

	it( 'should throw an error if provided an accessor option which is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				polyval( [1,2,3], [10], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if an input array contains non-numeric values (if not provided an accessor)', function test() {
		var values = [
			'5',
			new Number( 5 ),
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( [ values[i] ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				polyval( [1,2,3], value );
			};
		}
	});

	it( 'should throw an error if not provided an array when provided an accessor', function test() {
		var values = [
			'5',
			new Number( 5 ),
			NaN,
			true,
			undefined,
			null,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				polyval( [1,2,3], value, {
					'accessor': getValue
				});
			};
		}
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should throw an error if an accessed array value is not numeric', function test() {
		var values = [
			'5',
			new Number( 5 ),
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( [ values[i] ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				var arr = [
					{'x': value}
				];
				polyval( [1,2,3], arr, {
					'accessor': getValue
				});
			};
		}
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should evaluate a polynomial for a single value', function test() {
		var coef = [ 6, -4, 7, -19 ];
		assert.strictEqual( polyval( coef, 3 ), 128 );
	});

	it( 'should evaluate a polynomial for an array of values and return a new array', function test() {
		var coef = [ 6, -4, 7, -19 ],
			x = [ 3, 3 ],
			actual,
			expected;

		actual = polyval( coef, x );
		expected = [ 128, 128 ];

		assert.deepEqual( actual, expected );
		assert.ok( x !== actual );
	});

	it( 'should mutate an input array if the `copy` option is `false`', function test() {
		var coef = [ 6, -4, 7, -19 ],
			x = [ 3, 3 ],
			actual,
			expected;

		actual = polyval( coef, x, {
			'copy': false
		});
		expected = [ 128, 128 ];

		assert.deepEqual( actual, expected );
		assert.ok( x === actual );
	});

	it( 'should evaluate a polynomial using an accessor', function test() {
		var coef,
			x,
			actual,
			expected;

		coef = [ 6, -4, 7, -19 ];
		x = [
			{'x':3},
			{'x':3}
		];
		actual = polyval( coef, x, {
			'accessor': getValue
		});
		expected = [ 128, 128 ];

		assert.deepEqual( actual, expected );
		assert.ok( x !== actual );

		function getValue( d ) {
			return d.x;
		}
	});

});
